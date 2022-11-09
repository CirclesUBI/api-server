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
  ExportProfile, ExportTrustRelation,
  QueryResolvers, Businesses
} from "../../types";
import { Context } from "../../context";
import { clientAssertionJwt } from "./clientAssertionJwt";
import { lastAcknowledgedAt } from "./lastAcknowledgedAt";
import { paymentPath } from "./paymentPath";
import { getStringByMaxVersion } from "./getStringByMaxVersion";
import { getAvailableLanguages } from "./getAvailableLanguages";
import { getAllStringsByMaxVersion } from "./getAllStringsByMaxVersion";
import { getAllStringsByMaxVersionAndLang } from "./getAllStringsByMaxVersionAndLang";
import { getOlderVersionsByKeyAndLang } from "./getOlderVersionsByKeyAndLang";
import { RpcGateway } from "../../circles/rpcGateway";
import { getEnvironmentData } from "worker_threads";
import { getStringsToBeUpdatedAmount } from "./getStringsToBeUpdatedAmount";
import { getPaginatedStrings } from "./getstPaginatedStrings";
import { getPaginatedStringsToUpdate } from "./getPaginatedStringsToUpdate";
import { content } from "pdfkit/js/page";

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
  paymentPath: paymentPath,
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
  getPaginatedStringsToUpdate:getPaginatedStringsToUpdate,

  allBusinessCategories: async(parent: any, args: {categoryId?: number|null}, context: Context) => {
    let queryResult = await Environment.readonlyApiDb.businessCategory.findMany();
    return queryResult;
  },

  allBusinesses: async(parent: any, args: {categoryId?: number|null, id?: number|null}, context: Context) => {
    let queryResult = await Environment.readonlyApiDb.profile.findMany({
      where: {
        type: "ORGANISATION",
        businessCategoryId: args.categoryId,
        ... args.id ? {id: args.id} : {}
      },
      select: {
        id: true,
        firstName: true,
        dream: true,
        location: true,
        businessCategory: {
          select: {
            name: true
          }
        },
        avatarUrl: true,
        businessHoursMonday: true,
        businessHoursTuesday: true,
        businessHoursWednesday: true,
        businessHoursThursday: true,
        businessHoursFriday: true,
        businessHoursSaturday: true,
        businessHoursSunday: true,
        businessCategoryId: true
      }
    })

    return queryResult.map(o => {
      return <Businesses>{
        ...o,
        name: o.firstName,
        description: o.dream,
        picture: o.avatarUrl,
        businessCategory: o.businessCategory?.name
      }
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

    function getDisplayName(row: any): string {
      let displayName = row.firstName;
      if (row.lastName && row.lastName.trim() != "") {
        displayName += ` ${row.lastName}`;
      }
      return displayName;
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
};
