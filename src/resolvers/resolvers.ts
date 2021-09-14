import {myProfile, profilesById, profilesBySafeAddress} from "./queries/profiles";
import {upsertProfileResolver} from "./mutations/upsertProfile";
import {prisma_api_ro, prisma_api_rw} from "../apiDbClient";
import {MutationTagTransactionArgs, ProfileEvent, RequireFields, Resolvers} from "../types";
import {exchangeTokenResolver} from "./mutations/exchangeToken";
import {logout} from "./mutations/logout";
import {sessionInfo} from "./queries/sessionInfo";
import {depositChallengeResolver} from "./mutations/depositChallenge";
import {authenticateAtResolver} from "./mutations/authenticateAt";
import {consumeDepositedChallengeResolver} from "./mutations/consumeDepositedChallenge";
import {search} from "./queries/search";
import {upsertOfferResolver} from "./mutations/upsertOffer";
import {requestUpdateSafe} from "./mutations/requestUpdateSafe";
import {updateSafe} from "./mutations/updateSafe";
import {profileOffers} from "./profile/offers";
import {profileCity} from "./profile/city";
import {offerCreatedBy} from "./offer/createdBy";
import {offerCity} from "./offer/city";
import {whoami} from "./queries/whoami";
import {cities} from "./queries/citites";
import {version} from "./queries/version";
import {offers} from "./queries/offers";
import {offerCategoryTag} from "./offer/offerCategoryTag";
import {offerDeliveryTermsTag} from "./offer/offerDeliveryTermsTag";
import {offerUnitTag} from "./offer/offerUnitTag";
import {tags} from "./queries/tags";
import {stats} from "./queries/stats";
import {tagById} from "./queries/tagById";
import {upsertTag} from "./mutations/upsertTag";
import {claimedInvitation} from "./queries/claimedInvitation";
import {Context} from "../context";
import {ApiPubSub} from "../pubsub";
import {events} from "./queries/queryEvents";
import {balance} from "./queries/balance";
import {trustRelations} from "./queries/trustRelations";
import {contacts} from "./queries/contacts";
import {chatHistory} from "./queries/chatHistory";
import {InitDb} from "../initDb";
import {Pool, PoolConfig} from "pg";
import {contact} from "./queries/contact";
import {commonTrust} from "./queries/commonTrust";
import {balancesByAsset} from "./queries/balancesByAsset";

export function getPool() {
  return new Pool(<PoolConfig>{
    connectionString: process.env.BLOCKCHAIN_INDEX_DB_CONNECTION_STRING
  });
}

const packageJson = require("../../package.json");

export const resolvers: Resolvers = {
  Profile: {
    offers: profileOffers(prisma_api_ro),
    city: profileCity
  },
  Offer: {
    createdBy: offerCreatedBy(prisma_api_ro),
    categoryTag: offerCategoryTag(prisma_api_ro),
    deliveryTermsTag: offerDeliveryTermsTag(prisma_api_ro),
    unitTag: offerUnitTag(prisma_api_ro),
    city: offerCity
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
  Query: {
    sessionInfo: sessionInfo,
    whoami: whoami,
    cities: cities,
    claimedInvitation: claimedInvitation,
    myProfile: myProfile(prisma_api_rw),
    profilesById: profilesById(prisma_api_ro),
    profilesBySafeAddress: profilesBySafeAddress(prisma_api_ro),
    search: search(prisma_api_ro),
    version: version(packageJson),
    offers: offers(prisma_api_ro),
    tags: tags(prisma_api_ro),
    tagById: tagById(prisma_api_ro),
    stats: stats(prisma_api_ro),
    events: events(prisma_api_ro),
    eventByTransactionHash: events(prisma_api_ro),
    balance: balance(),
    balancesByAsset: balancesByAsset(prisma_api_ro),
    trustRelations: trustRelations(prisma_api_ro),
    contacts: contacts(prisma_api_ro),
    contact: contact(prisma_api_ro),
    chatHistory: chatHistory(prisma_api_ro),
    commonTrust: commonTrust(prisma_api_ro)

    // transactions: transactions(prisma_api_ro),
    // events: events(prisma_api_ro),
    /*
    invitationTransaction: async (parent: any, args: any, context:Context) => {
        // TODO: Find the transaction from the "invitation EOA" to the user's EOA (must be the only outgoing transaction from the invite-eoa)
        const session = await context.verifySession()
        if (!session.profileId) {
            throw new Error(`The session has not profile associated.`);
        }
        const profile = await prisma_api_ro.profile.findUnique({
            where: {id: session.profileId},
            include: {
                claimedInvitations: {
                    include: {
                        indexedTransactions: {
                            include: {
                                inviteTransaction: true
                            }
                        }
                    }
                }
            }
        });
        if (!profile) {
            throw new Error(`Couldn't find a profile with id ${session.profileId}`);
        }
        if (!profile.circlesSafeOwner) {
            throw new Error(`The profile with the id ${session.profileId} has no EOA.`)
        }
        if (!profile.claimedInvitations.length) {
            throw new Error(`Profile ${session.profileId} has no claimed invitation so there can be no invitation transactions`);
        }
        const claimedInvitation = profile.claimedInvitations[0];
        if (!claimedInvitation.indexedTransactions.length) {

            return null;
        }

        const inviteTransactionRequest = claimedInvitation.indexedTransactions[0];
        if (!inviteTransactionRequest.inviteTransaction) {
            return null;
        }

        return inviteTransactionRequest.inviteTransaction;
    },
    safeFundingTransaction: async (parent: any, args: any, context:any) => {
        return null;
    }*/
  },
  Mutation: {
    upsertOffer: upsertOfferResolver(prisma_api_rw),
    exchangeToken: exchangeTokenResolver(prisma_api_rw),
    logout: logout(prisma_api_rw),
    upsertProfile: upsertProfileResolver(prisma_api_rw),
    authenticateAt: authenticateAtResolver(prisma_api_rw),
    depositChallenge: depositChallengeResolver(prisma_api_rw),
    consumeDepositedChallenge: consumeDepositedChallengeResolver(prisma_api_rw),
    requestUpdateSafe: requestUpdateSafe(prisma_api_rw),
    updateSafe: updateSafe(prisma_api_rw),
    upsertTag: upsertTag(prisma_api_ro, prisma_api_rw),
    tagTransaction: async (parent:any, args: MutationTagTransactionArgs, context:Context) => {
      const prisma = prisma_api_rw;

      const session = await context.verifySession();
      if (!session.profileId) {
        return {
          success: false,
          errorMessage: "Create a profile first."
        }
      }
      const profile = await prisma.profile.findUnique({
        where: {
          id: session.profileId
        }
      });
      if (!profile)
      {
        throw new Error(`Couldn't find a profile with id ${session.profileId}`);
      }

      // 1. Check if the transaction anchor entry already exists
      let transaction = await prisma.transaction.findUnique({where: {transactionHash: args.transactionHash}});
      if (!transaction?.transactionHash) {
        // 1.1 If not create it
        await prisma.transaction.create({data: {transactionHash: args.transactionHash}});
      }

      // 2. Create the tag
      const tag = await prisma.tag.create({
        data: {
          createdByProfileId: profile.id,
          transactionHash: args.transactionHash,
          typeId: args.tag.typeId,
          value: args.tag.value,
          createdAt: new Date(),
          isPrivate: false
        }
      });

      return {
        success: true,
        tag: tag
      }
    },
    sendMessage: async (parent, args, context) => {
      const session = await context.verifySession();
      const typeTag = await prisma_api_ro.tag.findMany({
        where: {
          typeId: InitDb.Type_Tag,
          value: args.type
        }
      });
      if (typeTag.length != 1) {
        return {
          success: false,
          error: `Couldn't find a type tag (${InitDb.Type_Tag}) with value '${args.type}'`
        };
      }
      const message = await prisma_api_rw.message.create({
        data: {
          createdByProfileId: session.profileId,
          typeTagId: typeTag[0].id,
          createdAt: new Date(),
          lastUpdateAt: new Date(),
          toSafeAddress: args.toSafeAddress,
          content: args.content
        }
      });
      return {
        success: true
      };
    }

    // requestIndexTransaction: requestIndexTransaction(prisma_api_rw),
    // acknowledge: acknowledge(prisma_api_rw),
    /*
    claimInvitation: claimInvitation(prisma_api_rw),
    redeemClaimedInvitation: async (parent, args, context) => {
        const session = await context.verifySession();
        const claimedInvitation = await prisma_api_ro.invitation.findFirst({
            where: {
                claimedByProfileId: session.profileId
            }
        });

        if (!claimedInvitation) {
            throw new Error(`No claimed invitation for profile ${session.profileId}`);
        }

        throw new Error(`Not implemented`);
    }
     */
  },
  Subscription: {
    events: {
      resolve: async (parent: ProfileEvent[], args: any, context: Context) => {
        //const session = await context.verifySession();
        /*if (!session.profileId) {
          throw new Error(`You must have a profile before you can use the stream.`)
        }
        const profile = await prisma_api_ro.profile.findUnique({
          where: {
            id: session.profileId
          }
        });
        if (!profile) {
          throw new Error(`You must have a profile before you can use the stream.`)
        }*/

        const profile = {
          circlesAddress: "0xde374ece6fa50e781e81aac78e811b33d16912c7"
        }

        const eventsByAddress: { [x: string]: ProfileEvent[] } = {};
        parent.forEach(event => {
          // Filter all events that do not concern this client
          if (profile.circlesAddress != event.safe_address)
            return;
          if (!eventsByAddress[event.safe_address])
            eventsByAddress[event.safe_address] = [];
          eventsByAddress[event.safe_address].push(event);
        });

        const involvedAddresses:{[x:string]:unknown} = {};
        Object.values(eventsByAddress)
          .flatMap(o => o)
          .forEach(event => {
            if (!event.payload) {
              return;
            }
            if (event.payload.__typename === "CrcHubTransfer") {
              involvedAddresses[event.payload.from] = null;
              involvedAddresses[event.payload.to] = null;
            } else if (event.payload.__typename === "CrcMinting") {
              involvedAddresses[event.payload.to] = null;
            } else if (event.payload.__typename === "CrcSignup") {
              involvedAddresses[event.payload.user] = null;
            } else if (event.payload.__typename === "CrcTokenTransfer") {
              involvedAddresses[event.payload.from] = null;
              involvedAddresses[event.payload.to] = null;
            } else if (event.payload.__typename === "CrcTrust") {
              involvedAddresses[event.payload.address] = null;
              involvedAddresses[event.payload.can_send_to] = null;
            } else if (event.payload.__typename === "EthTransfer") {
              involvedAddresses[event.payload.from] = null;
              involvedAddresses[event.payload.to] = null;
            } else if (event.payload.__typename === "GnosisSafeEthTransfer") {
              involvedAddresses[event.payload.from] = null;
              involvedAddresses[event.payload.to] = null;
            }
          });

        const safeAddresses = Object.keys(involvedAddresses);
        console.log(`Got events for ${safeAddresses.length} safes`);

        try {
          return parent;
        } catch (e) {
          console.warn(e);
          return [];
        }
      },
      subscribe: () => ApiPubSub.instance.pubSub.asyncIterator(["event"])
    }
  }
};
