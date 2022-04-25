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
import { QueryGetStringByMaxVersionArgs, QueryResolvers, QueryGetStringByLanguageArgs, QueryGetAllStringsByLanguageArgs, QueryGetOlderVersionsByKeyAndLangArgs} from "../../types";
import {Organisation, QueryLastAcknowledgedAtArgs, QueryShopArgs, Shop} from "../../types";
import {Context} from "../../context";
import {canAccess} from "../../utils/canAccess";
import { patterns } from "pdfkit/js/page";
const packageJson = require("../../../package.json");

export const queryResolvers : QueryResolvers = {
  sessionInfo: sessionInfo,
  init: init,
  stats: async (parent:any, args:any, context:Context) => {
    const caller = await context.callerInfo;
    if (!caller?.profile?.circlesAddress) {
      throw new Error(`You must have a safe to execute this query.`);
    }
    return stats(caller.profile.circlesAddress);
  },
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
  lastAcknowledgedAt: async (parent:any, args:QueryLastAcknowledgedAtArgs, context:Context) => {
    if (!(await canAccess(context, args.safeAddress))) {
      throw new Error(`You cannot access the specified safe address.`);
    }
    const lastAcknowledgedDate = await Environment.readWriteApiDb.profile.findFirst({
      where: {
        circlesAddress: args.safeAddress
      },
      select: {
        lastAcknowledged: true
      }
    });
    return lastAcknowledgedDate?.lastAcknowledged;
  },
  shops: async (parent:any, args:any, context:Context) => {
    const shops = await Environment.readWriteApiDb.shop.findMany({
      where: {
        enabled: true,
        owner: {
          type: "ORGANISATION"
        }
      },
      include: {
        owner: true
      },
      orderBy: {
        sortOrder: "asc"
      }
    });
    return shops.map(o => {
      return <Shop>{
        ...o,
        owner: <Organisation>{
          ...o.owner,
          createdAt: o.createdAt.toJSON(),
          name: o.owner.firstName
        }
      }
    });
  },
  shop: async (parent:any, args:QueryShopArgs, context:Context) => {
    const shops = await Environment.readWriteApiDb.shop.findMany({
      where: {
        id: args.id,
        enabled: true
      },
      include: {
        owner: true
      },
      orderBy: {
        sortOrder: "asc"
      }
    });
    const shop = shops.map(o => {
      return <Shop>{
        ...o,
        owner: <Organisation>{
          ...o.owner,
          createdAt: o.createdAt.toJSON(),
          name: o.owner.firstName
        }
      }
    });
    return shop.length > 0 ? shop[0] : null;
  },
  getAllStrings: async (parent: any, args: any, context: Context) => {
    const queryResult = await Environment.pgReadWriteApiDb.query(`
    select * 
    from i18n
    `)
    return queryResult.rows
  },
  getAllStringsByLanguage: async (parent: any, args: QueryGetAllStringsByLanguageArgs, context: Context) => {
    const queryResult = await Environment.pgReadWriteApiDb.query(`
    select * 
    from i18n
    where lang = $1
    `,
      [args.lang]);
    return queryResult.rows;
  },
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
  getAvailableLanguages: async (parent: any, args: any, context: Context) => {
    const queryResult = await Environment.pgReadWriteApiDb.query(`
    select lang
      from i18n
        group by lang;
    `);
    return queryResult.rows;
  },
  getAllStringsByMaxVersion: async (parent: any, args: any, context: Context) => {
    const queryResult = await Environment.pgReadWriteApiDb.query(`
    select * 
      from "latestValues";
    `,);
    return queryResult.rows;
  },
  getOlderVersionsByKeyAndLang: async (parent: any, args: QueryGetOlderVersionsByKeyAndLangArgs, context: Context) => {
    const queryResult = await Environment.pgReadWriteApiDb.query(`
    select * 
      from i18n
        where lang = $1
        and key = $2
      order by key;
    `,
      [args.lang, args.key]);
    return queryResult.rows;
  }
}