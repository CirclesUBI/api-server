import { myProfile, profilesBySafeAddress } from "./queries/profiles";
import { upsertProfileResolver } from "./mutations/upsertProfile";
import { Profile, Purchase, Resolvers } from "../types";
import { exchangeTokenResolver } from "./mutations/exchangeToken";
import { logout } from "./mutations/logout";
import { sessionInfo } from "./queries/sessionInfo";
import { depositChallengeResolver } from "./mutations/depositChallenge";
import { authenticateAtResolver } from "./mutations/authenticateAt";
import { consumeDepositedChallengeResolver } from "./mutations/consumeDepositedChallenge";
import { search } from "./queries/search";
import { profilesCount } from "./queries/profilesCount";
import { requestUpdateSafe } from "./mutations/requestUpdateSafe";
import { updateSafe } from "./mutations/updateSafe";
import { whoami } from "./queries/whoami";
import { cities } from "./queries/citites";
import { version } from "./queries/version";
import { tags } from "./queries/tags";
import { tagById } from "./queries/tagById";
import { upsertTag } from "./mutations/upsertTag";
import { claimedInvitation } from "./queries/claimedInvitation";
import { Context } from "../context";
import { ApiPubSub } from "../pubsub";
import { trustRelations } from "./queries/trustRelations";
import { commonTrust } from "./queries/commonTrust";
import { sendMessage } from "./mutations/sendMessage";
import { tagTransaction } from "./mutations/tagTransaction";
import { acknowledge } from "./mutations/acknowledge";
import { claimInvitation } from "./mutations/claimInvitation";
import { createInvitations } from "./mutations/createInvitations";
import { redeemClaimedInvitation } from "./mutations/redeemClaimedInvitation";
import { invitationTransaction } from "./queries/invitationTransaction";
import { verifySessionChallengeResolver } from "./mutations/verifySessionChallengeResolver";
import { organisations } from "./queries/organisations";
import { safeInfo } from "./queries/safeInfo";
import { hubSignupTransactionResolver } from "./queries/hubSignupTransactionResolver";
import { upsertOrganisation } from "./mutations/upsertOrganisation";
import { myInvitations } from "./queries/myInvitations";
import { organisationsByAddress } from "./queries/organisationsByAddress";
import { createTestInvitation } from "./mutations/createTestInvitation";
import { addMemberResolver } from "./mutations/addMember";
import { removeMemberResolver } from "./mutations/removeMember";
import { regionsResolver } from "./queries/regions";
import { findSafesByOwner } from "./queries/findSafesByOwner";
import { purchaseResolver } from "./mutations/purchase";
import { profileCityDataLoader } from "./data-loaders/profileCityDataLoader";
import { profileMembershipsDataLoader } from "./data-loaders/profileMembershipsDataLoader";
import { getPurchaseInvoicesDataLoader } from "./data-loaders/purchaseInvoicesDataLoader";
import { organisationMembersDataLoader } from "./data-loaders/organisationMembersDataLoader";
import { profilesById } from "./queries/profilesById";
import { aggregates } from "./queries/aggregates";
import { events } from "./queries/events";
import { directPath } from "./queries/directPath";
import { invoice } from "./queries/invoice";
import { offerCreatedByLoader } from "./data-loaders/offerCreatedByLoader";
import { requestSessionChallenge } from "./mutations/requestSessionChallenge";
import { importOrganisationsOfAccount } from "./mutations/importOrganisationsOfAccount";
import { completePurchase } from "./mutations/completePurchase";
import { completeSale } from "./mutations/completeSale";
import { verifySafe, revokeSafeVerification } from "./mutations/verifySafe";
import { verifications, verificationsCount } from "./queries/verifications";
import { Environment } from "../environment";

const packageJson = require("../../package.json");

export const resolvers: Resolvers = {
  Profile: {
    city: async (parent: Profile) => {
      if (!parent.cityGeonameid) return null;
      return await profileCityDataLoader.load(parent.cityGeonameid);
    },
    memberships: async (parent: Profile, args, context: Context) => {
      if (!parent.circlesAddress) {
        return [];
      }
      return await profileMembershipsDataLoader.load(parent.circlesAddress);
    },
  },
  Purchase: {
    invoices: async (parent: Purchase, args: any, context: Context) => {
      const caller = await context.callerInfo;
      if (!caller?.profile?.circlesAddress)
        throw new Error(`You need a safe to perform this query.`);

      return await getPurchaseInvoicesDataLoader(
        caller.profile.circlesAddress
      ).load(parent.id);
    },
  },
  ClaimedInvitation: {
    createdBy: (parent, args, context) => {
      throw new Error(`Not implemented`);
    },
    claimedBy: (parent, args, context) => {
      throw new Error(`Not implemented`);
    },
  },
  ProfileEvent: {},
  Offer: {
    createdByProfile: async (parent, args, context) => {
      return offerCreatedByLoader.load(parent.createdByAddress);
    },
  },
  Organisation: {
    members: async (parent, args, context) => {
      return organisationMembersDataLoader.load(parent.id);
    },
  },
  Query: {
    sessionInfo: sessionInfo,
    whoami: whoami,
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
    profilesCount: profilesCount(Environment.readonlyApiDb),
    verificationsCount: verificationsCount(Environment.readWriteApiDb),
    version: version(packageJson),
    tags: tags(Environment.readonlyApiDb),
    tagById: tagById(Environment.readonlyApiDb),
    trustRelations: trustRelations(Environment.readonlyApiDb),
    commonTrust: commonTrust(Environment.readonlyApiDb),
    safeInfo: safeInfo(),
    profilesById: profilesById,
    aggregates: aggregates,
    events: events,
    directPath: directPath,
    invoice: invoice,
    verifications: verifications,
  },
  Mutation: {
    purchase: purchaseResolver,
    upsertOrganisation: upsertOrganisation(false),
    upsertRegion: upsertOrganisation(true),
    exchangeToken: exchangeTokenResolver(Environment.readWriteApiDb),
    logout: logout(),
    upsertProfile: upsertProfileResolver(),
    authenticateAt: authenticateAtResolver(),
    depositChallenge: depositChallengeResolver(Environment.readWriteApiDb),
    consumeDepositedChallenge: consumeDepositedChallengeResolver(
      Environment.readWriteApiDb
    ),
    requestUpdateSafe: requestUpdateSafe(Environment.readWriteApiDb),
    updateSafe: updateSafe(Environment.readWriteApiDb),
    upsertTag: upsertTag(),
    tagTransaction: tagTransaction(),
    sendMessage: sendMessage(Environment.readWriteApiDb),
    acknowledge: acknowledge(),
    createInvitations: createInvitations(),
    claimInvitation: claimInvitation(),
    redeemClaimedInvitation: redeemClaimedInvitation(),
    requestSessionChallenge: requestSessionChallenge,
    verifySessionChallenge: verifySessionChallengeResolver(
      Environment.readWriteApiDb
    ),
    createTestInvitation: createTestInvitation(),
    addMember: addMemberResolver,
    removeMember: removeMemberResolver,
    importOrganisationsOfAccount: importOrganisationsOfAccount,
    completePurchase: completePurchase,
    completeSale: completeSale,
    verifySafe: verifySafe,
    revokeSafeVerification: revokeSafeVerification,
  },
  Subscription: {
    events: {
      subscribe: async function subscribe(parent, args, context: Context) {
        const callerInfo = await context.callerInfo;
        if (!callerInfo?.profile && !callerInfo?.session.ethAddress)
          throw new Error(`You need a registration to subscribe`);

        const subscriberInfo = callerInfo.profile?.circlesAddress
          ? "subscriber circlesAddress: " + callerInfo.profile?.circlesAddress
          : "subscriber ethAddress: " + callerInfo.session.ethAddress;

        console.log(
          `-->: [${new Date().toJSON()}] [${context.session?.id}] [${
            context.id
          }] [${
            context.ipAddress
          }] [Subscription.events.subscribe]: ${subscriberInfo}`
        );

        if (
          !callerInfo.profile?.circlesAddress &&
          callerInfo.session.ethAddress
        ) {
          return ApiPubSub.instance.pubSub.asyncIterator([
            `events_${callerInfo.session.ethAddress.toLowerCase()}`,
          ]);
          // return logSubscriptionEvents(context, subscriberInfo, ai);
          /*
          let n:any;
          while (n = await ai.next()) {
            console.log(` <-* [${new Date().toJSON()}] [${context.id}] [${context.ipAddress}] [Subscription.events]: Sending event to '${subscriberInfo}': ${JSON.stringify(n)}`);
            yield n;
          }
/*
          for await (let item of ai) {
            console.log(` <-* [${new Date().toJSON()}] [${context.id}] [${context.ipAddress}] [Subscription.events]: Sending event to '${subscriberInfo}': ${JSON.stringify(item)}`);
            yield item;
          }
 */
        } else if (callerInfo.profile?.circlesAddress) {
          return ApiPubSub.instance.pubSub.asyncIterator([
            `events_${callerInfo.profile?.circlesAddress.toLowerCase()}`,
          ]);
          /*
          let n:any;
          while (n = await ai.next()) {
            console.log(` <-* [${new Date().toJSON()}] [${context.id}] [${context.ipAddress}] [Subscription.events]: Sending event to '${subscriberInfo}': ${JSON.stringify(n)}`);
            yield n;
          }
          // return logSubscriptionEvents(context, subscriberInfo, ai);
/*
          for await (let item of ai) {
            console.log(` <-* [${new Date().toJSON()}] [${context.id}] [${context.ipAddress}] [Subscription.events]: Sending event to '${subscriberInfo}': ${JSON.stringify(item)}`);
            yield item;
          }
 */
        }

        console.error(
          `Err: [${new Date().toJSON()}] [${context.id}] [${
            context.ipAddress
          }] [Subscription.events]: Cannot subscribe without an eoa- or safe-address`
        );
        throw new Error(`Cannot subscribe without an eoa- or safe-address.`);
      },
    },
  },
};
