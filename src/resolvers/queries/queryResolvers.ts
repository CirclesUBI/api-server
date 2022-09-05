import { deliveryMethods } from "./deliveryMethods";
import { myProfile, profilesBySafeAddress } from "./profiles";
import { sessionInfo } from "./sessionInfo";
import { search } from "./search";
import { cities } from "./citites";
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
import { invoice } from "./invoice";
import { verifications } from "./verifications";
import { findInvitationCreator } from "./findInvitationCreator";
import { recentProfiles } from "./recentProfiles";
import { stats } from "./stats";
import { init } from "./init";
import { Environment } from "../../environment";
import {
  ExportProfile, ExportTrustRelation,
  QueryCountStringsArgs,
  QueryGetFirst20StringsByMaxVersionKeyArgs,
  QueryGetPaginatedStringsArgs,
  QueryGetStringsByMaxVersionKeyAndValueArgs,
  QueryGetStringsFromLatestValuesByValueArgs,
  QueryResolvers
} from "../../types";
import { Context } from "../../context";
import { shop } from "./shop";
import { clientAssertionJwt } from "./clientAssertionJwt";
import { shops, shopsById } from "./shops";
import { lastAcknowledgedAt } from "./lastAcknowledgedAt";
import {paymentPath} from "./paymentPath";
import {offersByIdAndVersion} from "./offersByIdAndVersion";
import {getAllStrings} from "./getAllStrings";
import {getAllStringsByLanguage} from "./getAllStringsByLanguage";
import {getStringByMaxVersion} from "./getStringByMaxVersion";
import {getStringByLanguage} from "./getStringByLanguage";
import {getAvailableLanguages} from "./getAvailableLanguages";
import {getAllStringsByMaxVersion} from "./getAllStringsByMaxVersion";
import {getAllStringsByMaxVersionAndLang} from "./getAllStringsByMaxVersionAndLang";
import {getOlderVersionsByKeyAndLang} from "./getOlderVersionsByKeyAndLang";

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
  cities: cities,
  deliveryMethods: deliveryMethods(),
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
  paymentPath: paymentPath,
  invoice: invoice,
  verifications: verifications,
  findInvitationCreator: findInvitationCreator,
  lastAcknowledgedAt: lastAcknowledgedAt,
  shops: shops,
  shopsById: shopsById,
  shop: shop,
  clientAssertionJwt: clientAssertionJwt,
  offersByIdAndVersion: offersByIdAndVersion,
  getAllStrings: getAllStrings,
  getAllStringsByLanguage: getAllStringsByLanguage,
  getStringByMaxVersion: getStringByMaxVersion,
  getStringByLanguage: getStringByLanguage,
  getAvailableLanguages: getAvailableLanguages,
  getAllStringsByMaxVersion: getAllStringsByMaxVersion,
  getAllStringsByMaxVersionAndLang: getAllStringsByMaxVersionAndLang,
  getOlderVersionsByKeyAndLang: getOlderVersionsByKeyAndLang,


  getStringsFromLatestValuesByValue: async (parent, args: QueryGetStringsFromLatestValuesByValueArgs, context) => {
    const queryResult = await Environment.pgReadWriteApiDb.query(`
    select *
      from "latestValues"
        where value like $1;
    `,
      [args.value]);
    return queryResult.rows
  },

  getStringsByMaxVersionKeyAndValue: async (parent, args: QueryGetStringsByMaxVersionKeyAndValueArgs, context) => {
    const queryResult = await Environment.pgReadWriteApiDb.query(`
    select * 
      from "latestValues"
        where key ^@ $1
        and value ilike $2;
    `,
      [args.key, args.value]);
    return queryResult.rows
  },

  getFirst20StringsByMaxVersionKey: async (parent, args: QueryGetFirst20StringsByMaxVersionKeyArgs, context) => {
    const queryResult = await Environment.pgReadWriteApiDb.query(`
    select * 
      from "latestValues"
        where key ^@ $1
        order by key
        limit 20;
    `,
      [args.key]);
    return queryResult.rows
  },

  getPaginatedStrings: async (parent, args: QueryGetPaginatedStringsArgs, context) => {
    const queryResult = await Environment.pgReadWriteApiDb.query(`
    select key || lang as pagination_key, lang, key, version, value 
    from "latestValues" 
    where (key || lang) > $1 and key ^@ $2 and lang ^@ $3 and value ^@ $4
    order by key || lang limit 20; 
    `,
      [args.pagination_key, args.key, args.lang, args.value]);
    return queryResult.rows
  },

  countStrings: async (parent, args: QueryCountStringsArgs, context) => {
    const queryResult = await Environment.pgReadWriteApiDb.query(`
    select *
      from "latestValues"
        where key ^@ $1;
    `,
      [args.key]);
    return queryResult.rowCount
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

    function getDisplayName(row: any): string {
      let displayName = row.firstName;
      if (row.lastName && row.lastName.trim() != "") {
        displayName += ` ${row.lastName}`;
      }
      return displayName;
    }

    const profilesRows = await Environment.pgReadWriteApiDb.query(
        profilesSql,
        args.sinceLastChange ? [args.sinceLastChange] : []);

    return profilesRows.rows.map(o => {
      return <ExportProfile>{
        avatarUrl: o.avatarUrl,
        displayName: getDisplayName(o),
        circlesAddress: o.circlesAddress,
        lastChange: o.lastUpdateAt
      }
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

    const trustRelationRows = await Environment.indexDb.query(trustRelationsSql,
        args.sinceLastChange ? [args.sinceLastChange] : []);

    return trustRelationRows.rows.map(o => {
      return <ExportTrustRelation>{
        trusterAddress: o.trusterAddress,
        trusteeAddress: o.trusteeAddress,
        trustLimit: o.trustLimit,
        lastChange: o.lastChange
      }
    });
  }
}