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
  getOlderVersionsByKeyAndLang: getOlderVersionsByKeyAndLang
};
