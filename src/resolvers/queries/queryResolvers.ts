import { myProfile, profilesBySafeAddress } from "./profiles";
import { sessionInfo } from "./sessionInfo";
import { search } from "./search";
import { version } from "./version";
import { tags } from "./tags";
import { tagById } from "./tagById";
import { claimedInvitation } from "./claimedInvitation";
import { trustRelations } from "./trustRelations";
import { commonTrust } from "./commonTrust";
import { organisations } from "./organisations";
import { safeInfo } from "./safeInfo";
import { hubSignupTransactionResolver } from "./hubSignupTransactionResolver";
import { invitationTransaction } from "./invitationTransaction";
import { myInvitations } from "./myInvitations";
import { organisationsByAddress } from "./organisationsByAddress";
import { regionsResolver } from "./regions";
import { findSafesByOwner } from "./findSafesByOwner";
import { profilesById } from "./profilesById";
import { aggregates } from "./aggregates";
import { events } from "./events";
import { directPath } from "./directPath";
import { verifications } from "./verifications";
import { findInvitationCreator } from "./findInvitationCreator";
import { recentProfiles } from "./recentProfiles";
import { stats } from "./stats";
import { init } from "./init";
import { Environment } from "../../environment";
import {
  ExportProfile,
  ExportTrustRelation,
  Favorite,
  QueryResolvers,
  TrustComparison,
  TrustDifference
} from "../../types";
import { Context } from "../../context";
import { clientAssertionJwt } from "./clientAssertionJwt";
import { lastAcknowledgedAt } from "./lastAcknowledgedAt";
import { getStringByMaxVersion } from "./getStringByMaxVersion";
import { getAvailableLanguages } from "./getAvailableLanguages";
import { getAllStringsByMaxVersion } from "./getAllStringsByMaxVersion";
import { getAllStringsByMaxVersionAndLang } from "./getAllStringsByMaxVersionAndLang";
import { getOlderVersionsByKeyAndLang } from "./getOlderVersionsByKeyAndLang";
import { RpcGateway } from "../../circles/rpcGateway";
import { getStringsToBeUpdatedAmount } from "./getStringsToBeUpdatedAmount";
import { getPaginatedStrings } from "./getstPaginatedStrings";
import { getPaginatedStringsToUpdate } from "./getPaginatedStringsToUpdate";
import { allBusinesses } from "./allBusinesses";
import { getDisplayName } from "../../utils/getDisplayName";

const packageJson = require("../../../package.json");

export const queryResolvers: QueryResolvers = {
  sessionInfo: sessionInfo,
  init: init,
  stats: async (parent: any, args: any, context: Context) => {
    const caller = await context.callerInfo;
    if (!caller?.profile?.circlesAddress) {
      throw new Error(`You must have a safe to execute this query.`);
    }
    return stats(caller.profile.circlesAddress);
  },
  claimedInvitation: claimedInvitation,
  findSafesByOwner: findSafesByOwner,
  invitationTransaction: invitationTransaction(),
  hubSignupTransaction: hubSignupTransactionResolver,
  myProfile: myProfile(Environment.readWriteApiDb),
  myInvitations: myInvitations(),
  organisations: organisations(Environment.readonlyApiDb),
  regions: regionsResolver,
  organisationsByAddress: organisationsByAddress(),
  profilesBySafeAddress: profilesBySafeAddress(Environment.readonlyApiDb),
  search: search(Environment.readonlyApiDb),
  version: version(packageJson),
  tags: tags(Environment.readonlyApiDb),
  tagById: tagById(Environment.readonlyApiDb),
  trustRelations: trustRelations(Environment.readonlyApiDb),
  commonTrust: commonTrust(Environment.readonlyApiDb),
  safeInfo: safeInfo(),
  profilesById: profilesById,
  recentProfiles: recentProfiles,
  aggregates: aggregates,
  events: events,
  directPath: directPath,
  verifications: verifications,
  findInvitationCreator: findInvitationCreator,
  lastAcknowledgedAt: lastAcknowledgedAt,
  clientAssertionJwt: clientAssertionJwt,
  getStringByMaxVersion: getStringByMaxVersion,
  getAvailableLanguages: getAvailableLanguages,
  getAllStringsByMaxVersion: getAllStringsByMaxVersion,
  getAllStringsByMaxVersionAndLang: getAllStringsByMaxVersionAndLang,
  getOlderVersionsByKeyAndLang: getOlderVersionsByKeyAndLang,
  getStringsToBeUpdatedAmount: getStringsToBeUpdatedAmount,
  getPaginatedStrings: getPaginatedStrings,
  getPaginatedStringsToUpdate: getPaginatedStringsToUpdate,
  allBusinesses: allBusinesses,
  allBusinessCategories: async (parent: any, args: { categoryId?: number | null }, context: Context) => {
    return Environment.readonlyApiDb.businessCategory.findMany();
  },
  allBaliVillages: async (parent: any, args: { id?: number | null }, context: Context) => {
    return Environment.readonlyApiDb.baliVillage.findMany({
      orderBy: {
        desa: "asc",
      },
    });
  },
  myFavorites: async (parent: any, args: any, context: Context) => {
    const caller = await context.callerInfo;
    return (
      await Environment.readonlyApiDb.favorites.findMany({
        where: {
          createdByCirclesAddress: caller?.profile?.circlesAddress ?? "",
        },
      })
    ).map((o) => {
      return <Favorite>{
        createdAt: o.createdAt.toJSON(),
        createdByAddress: o.createdByCirclesAddress,
        favoriteAddress: o.favoriteCirclesAddress,
        comment: o.comment,
      };
    });
  },
  allProfiles: async (parent, args, context) => {
    let profilesSql = `
      select "circlesAddress", "circlesTokenAddress", "firstName", "lastName", "avatarUrl", "lastUpdateAt"
      from "Profile"
      where "circlesAddress" is not null`;

    if (args.sinceLastChange) {
      profilesSql += `
        and "lastUpdateAt" >= $1;`;
    }

    const profilesRows = await Environment.pgReadWriteApiDb.query(
      profilesSql,
      args.sinceLastChange ? [args.sinceLastChange] : []
    );

    return profilesRows.rows.map((o) => {
      return <ExportProfile>{
        avatarUrl: o.avatarUrl,
        displayName: getDisplayName(o),
        circlesAddress: o.circlesAddress,
        lastChange: o.lastUpdateAt,
      };
    });
  },
  allTrusts: async (parent, args, context) => {
    let trustRelationsSql = `select "can_send_to" as "trusterAddress",
                                      "user"        as "trusteeAddress",
                                      "limit"       as "trustLimit",
                                      last_change   as "lastChange"
                               from crc_current_trust_2`;

    if (args.sinceLastChange) {
      trustRelationsSql += `
        where last_change >= $1`;
    }

    const trustRelationRows = await Environment.indexDb.query(
      trustRelationsSql,
      args.sinceLastChange ? [args.sinceLastChange] : []
    );

    return trustRelationRows.rows.map((o) => {
      return <ExportTrustRelation>{
        trusterAddress: o.trusterAddress,
        trusteeAddress: o.trusteeAddress,
        trustLimit: o.trustLimit,
        lastChange: o.lastChange,
      };
    });
  },
  getRandomAccount: async () => {
    if (!Environment.isLocalDebugEnvironment) throw new Error("Only available in local debug environments.");

    const acc = RpcGateway.get().eth.accounts.create();
    return {
      privateKey: acc.privateKey,
      address: acc.address,
    };
  },
  signMessage: async (parent, { message, key }, context) => {
    if (!Environment.isLocalDebugEnvironment) throw new Error("Only available in local debug environments.");

    const acc = RpcGateway.get().eth.accounts.privateKeyToAccount(key);
    const signature = acc.sign(message);
    return signature.signature;
  },
  compareTrustRelations: async (parent, args, context) => {
    if (args.data.compareWith.length > 10) {
      throw new Error("Too many addresses to compare with.");
    }

    const query = `
      select 'add' as operation, "user"
        from cache_crc_current_trust main
        where can_send_to = $1
          and "limit" > 0
        except
        select 'add' as operation, "user"
        from cache_crc_current_trust
        where can_send_to = $2
          and "limit" > 0
      union all
      select 'remove' as operation, follower."user"
        from cache_crc_current_trust follower
        left join cache_crc_current_trust main
             on main."user" = follower."user"
            and main.can_send_to = $1
        where follower.can_send_to = $2
          and follower."limit" > 0
          and (main is null or main."limit" = 0)
      union all
      select 'keep' as operation, follower."user"
        from cache_crc_current_trust follower
        join cache_crc_current_trust main on main."user" = follower."user" and main."limit" > 0 and follower."limit" > 0
        where follower.can_send_to = $2
          and main.can_send_to = $1;`;

    const results = await Promise.all(
        args.data.compareWith.map(async compareTarget => await Environment.indexDb.query(query, [args.data.canSendTo, compareTarget])));

    const diffs = results
        .flatMap((result, index) => {
          console.log(result.rows);
          return <TrustComparison>{
            canSendTo: args.data.compareWith[index],
            differences: result.rows.map(row => {
              return <TrustDifference>{
                operation: row.operation,
                user: row.user
              }
            })
          }
        });

    return {
      canSendTo: args.data.canSendTo,
      diffs: diffs
    }
  }
};
