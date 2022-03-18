import {myProfile, profilesBySafeAddress} from "./profiles";
import {sessionInfo} from "./sessionInfo";
import {search} from "./search";
import {cities} from "./citites";
import {version} from "./version";
import {tags} from "./tags";
import {tagById} from "./tagById";
import {claimedInvitation} from "./claimedInvitation";
import {trustRelations} from "./trustRelations";
import {commonTrust} from "./commonTrust";
import {organisations} from "./organisations";
import {safeInfo} from "./safeInfo";
import {hubSignupTransactionResolver} from "./hubSignupTransactionResolver";
import {invitationTransaction} from "./invitationTransaction";
import {myInvitations} from "./myInvitations";
import {organisationsByAddress} from "./organisationsByAddress";
import {regionsResolver} from "./regions";
import {findSafesByOwner} from "./findSafesByOwner";
import {profilesById} from "./profilesById";
import {aggregates} from "./aggregates";
import {events} from "./events";
import {directPath} from "./directPath";
import {invoice} from "./invoice";
import {verifications} from "./verifications";
import {findInvitationCreator} from "./findInvitationCreator";
import {recentProfiles} from "./recentProfiles";
import {stats} from "./stats";
import {init} from "./init";
import {Environment} from "../../environment";
import {QueryGetStringsByLanguageArgs, QueryGetStringByMaxVersionArgs, QueryResolvers} from "../../types";
import {Context} from "../../context";
import {ProfileLoader} from "../../querySources/profileLoader";
const packageJson = require("../../../package.json");

export const queryResolvers : QueryResolvers = {
  sessionInfo: sessionInfo,
  init: init,
  stats: stats,
  cities: cities,
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
  invoice: invoice,
  verifications: verifications,
  findInvitationCreator: findInvitationCreator,
  getStringByMaxVersion: async (parent: any, args: QueryGetStringByMaxVersionArgs, context: Context) => {
    const queryResult = await Environment.pgReadWriteApiDb.query(`
    select * 
    from i18n 
    where lang = $1 
        and key = $2 
        and version = (
            select max(version) 
            from i18n
            where lang = $1 
                and key = $2);
    `,
    [args.lang, args.key]);
    if (queryResult.rows?.length > 0) {
      return queryResult.rows[0];
    } else {
      return null;
    }
  },
  getStringByLanguage: async (parent: any, args: QueryGetStringByLanguageArgs, context: Context) => {
    const queryResult = await Environment.pgReadWriteApiDb.query(`
    select * 
        from i18n 
        where lang=$1
            and version = (
                select max(version) 
                from i18n
                where lang = $1
            );
    `,
    [args.lang]);
    return queryResult.rows;
  },
  organisationsWithOffers: async (parent:any, args:any, context:Context) => {
    const orgasWithOffers = await Environment.readWriteApiDb.profile.findMany({
      where: {
        type: "ORGANISATION",
        offers: {
          some: {
            id: {
              gt: 0
            }
          }
        }
      }
    });
    return orgasWithOffers.map(o => {
      return {
        ...ProfileLoader.withDisplayCurrency(o),
        __typename: "Organisation",
        name: o.firstName,
        createdAt: o.createdAt.toJSON()
      }
    });
  }
}