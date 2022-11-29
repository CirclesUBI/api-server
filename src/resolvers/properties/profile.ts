import {AssetBalance, Profile, ProfileOrigin, ProfileResolvers} from "../../types";
import { Context } from "../../context";
import { Environment } from "../../environment";
import { getDateWithOffset } from "../../utils/getDateWithOffset";
import BN from "bn.js";
import { profileMembershipsDataLoader } from "../dataLoaders/profileMembershipsDataLoader";
import { profileVerificationsDataLoader } from "../dataLoaders/profileVerificationsDataLoader";
import { profilePublicContactsDataLoader } from "../dataLoaders/profilePublicContactsDataLoader";
import { profileAllContactsDataLoader } from "../dataLoaders/profileAllContactsDataLoader";
import { profileClaimedInvitationDataLoader } from "../dataLoaders/profileClaimedInvitationDataLoader";
import { profileInvitationTransactionDataLoader } from "../dataLoaders/profileInvitationTransactionDataLoader";
import { profileCirclesTokenAddressDataLoader } from "../dataLoaders/profileCirclesTokenAddressDataLoader";
import { profileMembersDataLoader } from "../dataLoaders/profileMembersDataLoader";
import { provenUniquenessDataLoader } from "../dataLoaders/provenUniquenessDataLoader";

export function isOwnProfile(profileId: number, context: Context): boolean {
  return !!context.session?.profileId && context.session.profileId == profileId;
}

export const profilePropertyResolvers: ProfileResolvers = {
  origin: (parent: Profile) => {
    return !parent.origin ? ProfileOrigin.Unknown : parent.origin;
  },
  gender: (parent: Profile, args: any, context: Context) => {
    return isOwnProfile(parent.id, context) ? parent.gender ?? null : null;
  },
  age: (parent: Profile, args: any, context: Context) => {
    return isOwnProfile(parent.id, context) ? parent.age ?? null : null;
  },
  emailAddress: async (parent: Profile, args: any, context: Context) =>
    isOwnProfile(parent.id, context) && parent.emailAddress ? parent.emailAddress : null,

  invitationLink: async (parent: Profile, args: any, context: Context) => {
    if (!isOwnProfile(parent.id, context)) {
      return null;
    }

    const inviteTrigger = await Environment.readWriteApiDb.job.findFirst({
      where: {
        inviteTriggerOfProfile: {
          id: parent.id,
        },
      },
    });

    if (!inviteTrigger) return null;

    return `https://${Environment.externalDomain}/trigger?hash=${inviteTrigger.hash}`;
  },
  lat: async (parent: Profile, args: any, context: Context) => isOwnProfile(parent.id, context) && parent.lat !== undefined ? parent.lat : null,
  lon: async (parent: Profile, args: any, context: Context) => isOwnProfile(parent.id, context) && parent.lon !== undefined ? parent.lon : null,
  location: async (parent: Profile, args: any, context: Context) => isOwnProfile(parent.id, context) && parent.location !== undefined ? parent.location : null,
  askedForEmailAddress: async (parent: Profile, args: any, context: Context) =>
    isOwnProfile(parent.id, context) && parent.askedForEmailAddress ? parent.askedForEmailAddress : false,
  newsletter: async (parent: Profile, args: any, context: Context) =>
    isOwnProfile(parent.id, context) && parent.newsletter !== undefined ? parent.newsletter : null,
  memberships: async (parent: Profile, args: any, context: Context) => {
    if (!parent.circlesAddress) {
      return [];
    }
    return await profileMembershipsDataLoader.load(parent.circlesAddress);
  },
  members: async (parent: Profile, args: any, context: Context) => {
    if (!parent.circlesAddress) {
      return [];
    }
    return await profileMembersDataLoader.load(parent.circlesAddress);
  },
  verifications: async (parent: Profile, args: any, context: Context) => {
    if (!parent.circlesAddress) {
      return [];
    }
    return await profileVerificationsDataLoader.load(parent.circlesAddress);
  },
  balances: async (parent: Profile, args, context: Context) => {
    if (!parent.circlesAddress) {
      return null;
    }

    const crcBalancesPromise = Environment.indexDb.query(
      `
        select last_change_at, token, token_owner, balance
        from cache_crc_balances_by_safe_and_token
        where safe_address = $1
          and ($2 = '' or balance > ($2)::numeric) 
          and ($3 = '' or balance < ($3)::numeric)
        order by balance desc;`,
      [parent.circlesAddress.toLowerCase(), args?.filter?.gt ?? '', args?.filter?.lt ?? '']
    );

    const erc20BalancesPromise = Environment.indexDb.query(
      `
       select safe_address
            , token
            , balance
            , last_changed_at
       from erc20_balances_by_safe_and_token
       where safe_address = $1
        and ($2 = '' or balance > ($2)::numeric) 
        and ($3 = '' or balance < ($3)::numeric);`,
      [parent.circlesAddress.toLowerCase(), args?.filter?.gt ?? '', args?.filter?.lt ?? '']
    );

    const queryResults = await Promise.all([crcBalancesPromise, erc20BalancesPromise]);
    const crcBalancesResult = queryResults[0];
    const erc20BalancesResult = queryResults[1];

    const crcLastChangeAt = crcBalancesResult.rows.reduce(
      (p, c) => Math.max(new Date(c.last_change_at).getTime(), p),
      0
    );
    const crcLastChangeAtTs = getDateWithOffset(crcLastChangeAt);

    const ercLastChangeAt = crcBalancesResult.rows.reduce(
      (p, c) => Math.max(new Date(c.last_change_at).getTime(), p),
      0
    );
    const ercLastChangeAtTs = getDateWithOffset(ercLastChangeAt);

    return {
      crcBalances: {
        __typename: "CrcBalances",
        lastUpdatedAt: crcLastChangeAtTs.toJSON(),
        total: crcBalancesResult.rows.reduce((p, c) => p.add(new BN(c.balance)), new BN("0")).toString(),
        balances: crcBalancesResult.rows.map((o: any) => {
          return <AssetBalance>{
            token_owner_profile: null,
            token_symbol: "CRC",
            token_address: o.token,
            token_owner_address: o.token_owner,
            token_balance: o.balance,
          };
        }),
      },
      erc20Balances: {
        __typename: "Erc20Balances",
        lastUpdatedAt: ercLastChangeAtTs.toJSON(),
        balances: erc20BalancesResult.rows.map((o: any) => {
          return <AssetBalance>{
            token_address: o.token,
            token_owner_address: "0x0000000000000000000000000000000000000000",
            token_symbol: "erc20",
            token_balance: o.balance,
          };
        }),
      },
    };
  },
  contacts: async (parent: Profile, args, context: Context) => {
    if (!parent.circlesAddress) {
      return [];
    }
    if (!isOwnProfile(parent.id, context)) {
      return await profilePublicContactsDataLoader(args.filter).load(parent.circlesAddress);
    } else {
      return await profileAllContactsDataLoader(args.filter).load(parent.circlesAddress);
    }
  },
  claimedInvitation: async (parent: Profile, args: any, context: Context) => {
    if (!parent.circlesAddress || !isOwnProfile(parent.id, context)) {
      return null;
    }
    return await profileClaimedInvitationDataLoader.load(parent.id);
  },
  invitationTransaction: async (parent: Profile, args: any, context: Context) => {
    if (!parent.circlesSafeOwner || !isOwnProfile(parent.id, context)) {
      return null;
    }
    return await profileInvitationTransactionDataLoader.load(parent.circlesSafeOwner);
  },
  circlesTokenAddress: async (parent: Profile, args: any, context: Context) => {
    if (!parent.circlesAddress) {
      return null;
    }
    return await profileCirclesTokenAddressDataLoader.load(parent.circlesAddress);
  },
  displayName: (parent: Profile, args: any, context: Context) => {
    return parent.firstName.trim() == ""
      ? parent.circlesAddress ?? ""
      : `${parent.firstName}${parent.lastName ? " " + parent.lastName : ""}`;
  },
  provenUniqueness: async (parent: Profile, args: any, context: Context) => {
    if (!parent.circlesAddress) {
      return null;
    }
    return await provenUniquenessDataLoader.load(parent.circlesAddress);
  }
};
