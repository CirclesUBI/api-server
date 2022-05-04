import {AssetBalance, PostAddress, Profile, ProfileOrigin, ProfileResolvers} from "../../types";
import {Context} from "../../context";
import {Environment} from "../../environment";
import {getDateWithOffset} from "../../utils/getDateWithOffset";
import BN from "bn.js";
import {profileCityDataLoader} from "../dataLoaders/profileCityDataLoader";
import {profileMembershipsDataLoader} from "../dataLoaders/profileMembershipsDataLoader";
import {profileOffersDataLoader} from "../dataLoaders/profileOffersDataLoader";
import {profileVerificationsDataLoader} from "../dataLoaders/profileVerificationsDataLoader";
import {profilePurchasesDataLoader} from "../dataLoaders/profilePurchasesDataLoader";
import {profileSalesDataLoader} from "../dataLoaders/profileSalesDataLoader";
import {profilePublicContactsDataLoader} from "../dataLoaders/profilePublicContactsDataLoader";
import {profileAllContactsDataLoader} from "../dataLoaders/profileAllContactsDataLoader";
import {profileClaimedInvitationDataLoader} from "../dataLoaders/profileClaimedInvitationDataLoader";
import {profileInvitationTransactionDataLoader} from "../dataLoaders/profileInvitationTransactionDataLoader";
import {profileCirclesTokenAddressDataLoader} from "../dataLoaders/profileCirclesTokenAddressDataLoader";
import {profileMembersDataLoader} from "../dataLoaders/profileMembersDataLoader";
import {profileShopsDataLoader} from "../dataLoaders/profileShopsDataLoader";
import {UtilityDbQueries} from "../../querySources/utilityDbQueries";


function isOwnProfile(profileId:number, context:Context) : boolean {
  return !!context.session?.profileId && context.session.profileId == profileId;
}

export const profilePropertyResolvers : ProfileResolvers = {
  origin: (parent: Profile) => {
    return !parent.origin ? ProfileOrigin.Unknown : parent.origin;
  },
  emailAddress: async (parent: Profile, args:any, context:Context) =>
    isOwnProfile(parent.id, context)
    && parent.emailAddress
      ? parent.emailAddress
      : null,
  invitationLink: async (parent: Profile, args:any, context:Context) => {
    if (!isOwnProfile(parent.id, context)) {
      return null;
    }

    const inviteTrigger = await Environment.readWriteApiDb.job.findFirst({
      where: {
        inviteTriggerOfProfile: {
          id: parent.id
        }
      }
    });

    if (!inviteTrigger)
      return null;

    return `https://${Environment.externalDomain}/trigger?hash=${inviteTrigger.hash}`;
  },
  askedForEmailAddress: async (parent: Profile, args:any, context:Context) =>
    isOwnProfile(parent.id, context)
    && parent.askedForEmailAddress
      ? parent.askedForEmailAddress
      : false,
  newsletter: async (parent: Profile, args:any, context:Context) =>
    isOwnProfile(parent.id, context)
    && parent.newsletter !== undefined
      ? parent.newsletter
      : null,
  city: async (parent: Profile) => {
    if (!parent.cityGeonameid) return null;
    return await profileCityDataLoader.load(parent.cityGeonameid);
  },
  memberships: async (parent: Profile, args:any, context: Context) => {
    if (!parent.circlesAddress) {
      return [];
    }
    return await profileMembershipsDataLoader.load(parent.circlesAddress);
  },
  shops: async (parent: Profile, args:any, context: Context) => {
    if (!parent.circlesAddress) {
      return [];
    }
    return await profileShopsDataLoader.load(parent.id);
  },
  members: async (parent: Profile, args:any, context: Context) => {
    if (!parent.circlesAddress) {
      return [];
    }
    return await profileMembersDataLoader.load(parent.circlesAddress);
  },
  offers: async (parent: Profile, args:any, context: Context) => {
    if (!parent.circlesAddress) {
      return [];
    }
    return await profileOffersDataLoader.load(parent.id);
  },
  verifications: async (parent: Profile, args:any, context: Context) => {
    if (!parent.circlesAddress) {
      return [];
    }
    return await profileVerificationsDataLoader.load(parent.circlesAddress);
  },
  purchases: async (parent: Profile, args:any, context: Context) => {
    if (!parent.circlesAddress || !isOwnProfile(parent.id, context)) {
      return [];
    }
    return await profilePurchasesDataLoader.load(parent.id);
  },
  sales: async (parent: Profile, args:any, context: Context) => {
    if (!parent.circlesAddress || !isOwnProfile(parent.id, context)) {
      return [];
    }
    return await profileSalesDataLoader.load(parent.id);
  },
  balances: async (parent: Profile, args:any, context: Context) => {
    if (!parent.circlesAddress) {
      return null;
    }

    const crcBalancesPromise = Environment.indexDb.query(`
        select last_change_at, token, token_owner, balance
        from crc_balances_by_safe_and_token_2
        where safe_address = $1
        order by balance desc;`,
      [parent.circlesAddress.toLowerCase()]);

    const erc20BalancesPromise = Environment.indexDb.query(`
       select safe_address
            , token
            , balance
            , last_changed_at
       from erc20_balances_by_safe_and_token
       where safe_address = $1;`,
      [parent.circlesAddress.toLowerCase()]);

    const queryResults = await Promise.all([crcBalancesPromise, erc20BalancesPromise]);
    const crcBalancesResult = queryResults[0];
    const erc20BalancesResult = queryResults[1];

    const crcLastChangeAt = crcBalancesResult.rows.reduce((p,c) => Math.max(new Date(c.last_change_at).getTime(), p) ,0);
    const crcLastChangeAtTs = getDateWithOffset(crcLastChangeAt);

    const ercLastChangeAt = crcBalancesResult.rows.reduce((p,c) => Math.max(new Date(c.last_change_at).getTime(), p) ,0);
    const ercLastChangeAtTs = getDateWithOffset(ercLastChangeAt);

    return {
      crcBalances: {
        __typename: "CrcBalances",
        lastUpdatedAt: crcLastChangeAtTs.toJSON(),
        total: crcBalancesResult.rows.reduce((p,c) => p.add(new BN(c.balance)), new BN("0")).toString(),
        balances: crcBalancesResult.rows.map((o: any) => {
          return <AssetBalance> {
            token_owner_profile: null,
            token_symbol: "CRC",
            token_address: o.token,
            token_owner_address: o.token_owner,
            token_balance: o.balance
          }
        })
      },
      erc20Balances:{
        __typename: "Erc20Balances",
        lastUpdatedAt: ercLastChangeAtTs.toJSON(),
        balances: erc20BalancesResult.rows.map((o: any) => {
          return <AssetBalance> {
            token_address: o.token,
            token_owner_address: "0x0000000000000000000000000000000000000000",
            token_symbol: "erc20",
            token_balance: o.balance
          }
        })
      }
    }
  },
  contacts: async (parent: Profile, args:any, context: Context) => {
    if (!parent.circlesAddress) {
      return [];
    }
    if (!isOwnProfile(parent.id, context)) {
      return await profilePublicContactsDataLoader.load(parent.circlesAddress);
    } else {
      return await profileAllContactsDataLoader.load(parent.circlesAddress);
    }
  },
  claimedInvitation: async (parent: Profile, args:any, context: Context) => {
    if (!parent.circlesAddress || !isOwnProfile(parent.id, context)) {
      return null;
    }
    return await profileClaimedInvitationDataLoader.load(parent.id);
  },
  invitationTransaction: async (parent: Profile, args:any, context: Context) => {
    if (!parent.circlesSafeOwner || !isOwnProfile(parent.id, context)) {
      return null;
    }
    return await profileInvitationTransactionDataLoader.load(parent.circlesSafeOwner);
  },
  circlesTokenAddress: async (parent:Profile, args:any, context: Context) => {
    if (!parent.circlesAddress) {
      return null;
    }
    return await profileCirclesTokenAddressDataLoader.load(parent.circlesAddress);
  },
  displayName: (parent:Profile, args:any, context: Context) => {
    return parent.firstName.trim() == ""
      ? parent.circlesAddress ?? ""
      : `${parent.firstName}${parent.lastName ? " " + parent.lastName : ""}`;
  },
  shippingAddresses: async (parent:Profile, args:any, context: Context) => {
    if (!parent.circlesAddress) {
      return null;
    }
    if (!isOwnProfile(parent.id, context)){
      return null;
    }

    const shippingAddresses = await Environment.readWriteApiDb.postAddress.findMany({
      where: {
        shippingAddressOfProfileId: parent.id
      }
    });

    return await Promise.all(shippingAddresses.filter(o => o.cityGeonameid).map(async o => {
      const place = await UtilityDbQueries.placesById([o.cityGeonameid ?? 0]);
      return <PostAddress>{
        id: o.id,
        name: o.name,
        city: place[0].name,
        cityGeonameid: o.cityGeonameid,
        country: place[0].country,
        zip: o.zip,
        house: o.house,
        state: o.state,
        street: o.street
      }
    }));
  }
}