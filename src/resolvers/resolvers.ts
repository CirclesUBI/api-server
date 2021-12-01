import {myProfile, profilesBySafeAddress} from "./queries/profiles";
import {upsertProfileResolver} from "./mutations/upsertProfile";
import {prisma_api_ro, prisma_api_rw} from "../apiDbClient";
import {
  Profile,
  Purchase, Resolvers,
} from "../types";
import {exchangeTokenResolver} from "./mutations/exchangeToken";
import {logout} from "./mutations/logout";
import {sessionInfo} from "./queries/sessionInfo";
import {depositChallengeResolver} from "./mutations/depositChallenge";
import {authenticateAtResolver} from "./mutations/authenticateAt";
import {consumeDepositedChallengeResolver} from "./mutations/consumeDepositedChallenge";
import {search} from "./queries/search";
import {requestUpdateSafe} from "./mutations/requestUpdateSafe";
import {updateSafe} from "./mutations/updateSafe";
import {whoami} from "./queries/whoami";
import {cities} from "./queries/citites";
import {version} from "./queries/version";
import {tags} from "./queries/tags";
import {tagById} from "./queries/tagById";
import {upsertTag} from "./mutations/upsertTag";
import {claimedInvitation} from "./queries/claimedInvitation";
import {Context} from "../context";
import {ApiPubSub} from "../pubsub";
import {trustRelations} from "./queries/trustRelations";
import {Pool, PoolConfig} from "pg";
import {commonTrust} from "./queries/commonTrust";
import {sendMessage} from "./mutations/sendMessage";
import {tagTransaction} from "./mutations/tagTransaction";
import {acknowledge} from "./mutations/acknowledge";
import {claimInvitation} from "./mutations/claimInvitation";
import {createInvitations} from "./mutations/createInvitations";
import {redeemClaimedInvitation} from "./mutations/redeemClaimedInvitation";
import {invitationTransaction} from "./queries/invitationTransaction";
import {verifySessionChallengeResolver} from "./mutations/verifySessionChallengeResolver";
import {organisations} from "./queries/organisations";
import {ubiInfo} from "./queries/ubiInfo";
import {initAggregateState} from "./queries/initAggregateState";
import {hubSignupTransactionResolver} from "./queries/hubSignupTransactionResolver";
import {upsertOrganisation} from "./mutations/upsertOrganisation";
import {myInvitations} from "./queries/myInvitations";
import {organisationsByAddress} from "./queries/organisationsByAddress";
import {createTestInvitation} from "./mutations/createTestInvitation";
import {addMemberResolver} from "./mutations/addMember";
import {removeMemberResolver} from "./mutations/removeMember";
import {regionsResolver} from "./queries/regions";
import {findSafeAddressByOwnerResolver} from "./queries/findSafeAddressByOwner";
import {purchaseResolver} from "./mutations/purchase";
import {profileCityDataLoader} from "./data-loaders/profileCityDataLoader";
import {profileMembershipsDataLoader} from "./data-loaders/profileMembershipsDataLoader";
import {getPurchaseInvoicesDataLoader} from "./data-loaders/purchaseInvoicesDataLoader";
import {organisationMembersDataLoader} from "./data-loaders/organisationMembersDataLoader";
import {profilesById} from "./queries/profilesById";
import {aggregates} from "./queries/aggregates";
import {events} from "./queries/events";
import {directPath} from "./queries/directPath";
import {mostRecentUbiSafeOfAccount} from "./queries/mostRecentUbiSafeOfAccount";
import {invoice} from "./queries/invoice";
import {offerCreatedByLoader} from "./data-loaders/offerCreatedByLoader";
import {requestSessionChallenge} from "./mutations/requestSessionChallenge";
import {importOrganisationsOfAccount} from "./mutations/importOrganisationsOfAccount";
import {completePurchase} from "./mutations/completePurchase";
import {completeSale} from "./mutations/completeSale";

export const HUB_ADDRESS = "0x29b9a7fBb8995b2423a71cC17cf9810798F6C543";

const pool = new Pool(<PoolConfig>{
  connectionString: process.env.BLOCKCHAIN_INDEX_DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
    // ca: cert
  }
});

export function getPool() {
  return pool;
}

const packageJson = require("../../package.json");

export const resolvers: Resolvers = {
  Profile: {
    city: async (parent: Profile) => {
      if (!parent.cityGeonameid)
        return null;
      return await profileCityDataLoader.load(parent.cityGeonameid);
    },
    memberships: async (parent: Profile, args, context: Context) => {
      if (!parent.circlesAddress) {
        return [];
      }
      return await profileMembershipsDataLoader.load(parent.circlesAddress);
    }
  },
  Purchase: {
    invoices: async (parent: Purchase, args: any, context: Context) => {
      const caller = await context.callerInfo;
      if (!caller?.profile?.circlesAddress)
        throw new Error(`You need a safe to perform this query.`)

      return await getPurchaseInvoicesDataLoader(caller.profile.circlesAddress).load(parent.id);
    }
  },
  ClaimedInvitation: {
    createdBy: (parent, args, context) => {
      throw new Error(`Not implemented`);
    },
    claimedBy: (parent, args, context) => {
      throw new Error(`Not implemented`);
    }
  },
  ProfileEvent: {},
  Offer: {
    createdByProfile: async (parent, args, context) => {
      return offerCreatedByLoader.load(parent.createdByAddress);
    }
  },
  Organisation: {
    members: async (parent, args, context) => {
      return organisationMembersDataLoader.load(parent.id);
    }
  },
  Query: {
    sessionInfo: sessionInfo,
    whoami: whoami,
    cities: cities,
    claimedInvitation: claimedInvitation,
    findSafeAddressByOwner: findSafeAddressByOwnerResolver,
    invitationTransaction: invitationTransaction(prisma_api_ro),
    hubSignupTransaction: hubSignupTransactionResolver,
    myProfile: myProfile(prisma_api_rw),
    myInvitations: myInvitations(),
    organisations: organisations(prisma_api_ro),
    regions: regionsResolver,
    organisationsByAddress: organisationsByAddress(),
    profilesBySafeAddress: profilesBySafeAddress(prisma_api_ro),
    search: search(prisma_api_ro),
    version: version(packageJson),
    tags: tags(prisma_api_ro),
    tagById: tagById(prisma_api_ro),
    trustRelations: trustRelations(prisma_api_ro),
    commonTrust: commonTrust(prisma_api_ro),
    ubiInfo: ubiInfo(),
    initAggregateState: initAggregateState(),
    profilesById: profilesById,
    aggregates: aggregates,
    events: events,
    directPath: directPath,
    mostRecentUbiSafeOfAccount: mostRecentUbiSafeOfAccount,
    invoice: invoice
  },
  Mutation: {
    purchase: purchaseResolver,
    upsertOrganisation: upsertOrganisation(prisma_api_rw, false),
    upsertRegion: upsertOrganisation(prisma_api_rw, true),
    exchangeToken: exchangeTokenResolver(prisma_api_rw),
    logout: logout(prisma_api_rw),
    upsertProfile: upsertProfileResolver(prisma_api_rw),
    authenticateAt: authenticateAtResolver(prisma_api_rw),
    depositChallenge: depositChallengeResolver(prisma_api_rw),
    consumeDepositedChallenge: consumeDepositedChallengeResolver(prisma_api_rw),
    requestUpdateSafe: requestUpdateSafe(prisma_api_rw),
    updateSafe: updateSafe(prisma_api_rw),
    upsertTag: upsertTag(prisma_api_ro, prisma_api_rw),
    tagTransaction: tagTransaction(prisma_api_rw),
    sendMessage: sendMessage(prisma_api_rw),
    acknowledge: acknowledge(prisma_api_rw),
    createInvitations: createInvitations(prisma_api_rw),
    claimInvitation: claimInvitation(prisma_api_rw),
    redeemClaimedInvitation: redeemClaimedInvitation(prisma_api_ro, prisma_api_rw),
    requestSessionChallenge: requestSessionChallenge,
    verifySessionChallenge: verifySessionChallengeResolver(prisma_api_rw),
    createTestInvitation: createTestInvitation(prisma_api_rw),
    addMember: addMemberResolver,
    removeMember: removeMemberResolver,
    importOrganisationsOfAccount: importOrganisationsOfAccount,
    completePurchase: completePurchase,
    completeSale: completeSale
  },
  Subscription: {
    events: {
      subscribe: async (parent, args, context: Context) => {
        try {
          const callerInfo = await context.callerInfo;
          if (!callerInfo?.profile && !callerInfo?.session.ethAddress)
            throw new Error(`You need a registration to subscribe`);

          if (!callerInfo.profile?.circlesAddress && callerInfo.session.ethAddress) {
            return ApiPubSub.instance.pubSub.asyncIterator([`events_${callerInfo.session.ethAddress.toLowerCase()}`]);
          } else if (callerInfo.profile?.circlesAddress) {
            return ApiPubSub.instance.pubSub.asyncIterator([`events_${callerInfo.profile?.circlesAddress.toLowerCase()}`]);
          } else {
            throw new Error(`Cannot subscribe without an eoa- or safe-address.`)
          }
        } catch (e) {
          console.error(e);
        }
        return ApiPubSub.instance.pubSub.asyncIterator([`~~~NEVER~~~`]);
      }
    }
  }
};
