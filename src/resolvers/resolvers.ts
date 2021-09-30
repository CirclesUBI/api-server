import {myProfile, profilesById, profilesBySafeAddress} from "./queries/profiles";
import {upsertProfileResolver} from "./mutations/upsertProfile";
import {prisma_api_ro, prisma_api_rw} from "../apiDbClient";
import {CreatedInvitation, CreateInvitationResult, ProfileEvent, Resolvers} from "../types";
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
import {Pool, PoolConfig} from "pg";
import {contact} from "./queries/contact";
import {commonTrust} from "./queries/commonTrust";
import {balancesByAsset} from "./queries/balancesByAsset";
import {sendMessage} from "./mutations/sendMessage";
import {tagTransaction} from "./mutations/tagTransaction";
import {acknowledge} from "./mutations/acknowledge";
import {inbox} from "./queries/inbox";
import {claimInvitation} from "./mutations/claimInvitation";
import {RpcGateway} from "../rpcGateway";
import {Session} from "../session";
import {createInvitations} from "./mutations/createInvitations";
import {redeemClaimedInvitation} from "./mutations/redeemClaimedInvitation";
import {invitationTransaction} from "./queries/invitationTransaction";
import {doesNotThrow} from "assert";

let cert:string;

export function getPool() {
  /*
  if (!cert) {
    const fs = require('fs');
    cert = fs.readFileSync("/home/daniel/src/circles-world/api-server/ca-certificate.crt", "ascii");
  }
   */
  return new Pool(<PoolConfig>{
    connectionString: process.env.BLOCKCHAIN_INDEX_DB_CONNECTION_STRING,
    ssl: {
      rejectUnauthorized: false,
      // ca: cert
    }
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
    findSafeAddressByOwner: async (parent, args, context) => {
      const pool = getPool();
      try {
        const query = "select safe_address from crc_safe_owners where \"owner\" = $1";
        const result = await pool.query(query);
        return result.rows.map(o => o.safe_address);
      } finally {
        await pool.end();
      }
    },
    invitationTransaction: invitationTransaction(prisma_api_ro),
    safeFundingTransaction: (async (parent, args, context) => {
      const session = await context.verifySession();
      const profile = await prisma_api_ro.profile.findFirst({
        where:{
          OR:[{
            emailAddress: null,
            circlesSafeOwner: session.ethAddress
          }, {
            emailAddress: session.emailAddress
          }]
        }
      });
      if (!profile?.circlesAddress || !profile?.circlesSafeOwner) {
        return null;
      }
      const pool = getPool();
      try {
        const safeFundingTransactionQuery = `
            select *
            from transaction
            where "from" = $1
              and "to" = $2`;

        const safeFundingTransactionQueryParams = [
          profile.circlesSafeOwner,
          profile.circlesAddress
        ];
        const safeFundingTransactionResult = await pool.query(
          safeFundingTransactionQuery,
          safeFundingTransactionQueryParams);

        if (safeFundingTransactionResult.rows.length == 0) {
          return null;
        }

        const safeFundingTransaction = safeFundingTransactionResult.rows[0];

        return <ProfileEvent>{
          id: safeFundingTransaction.id,
          safe_address: profile.circlesSafeOwner,
          transaction_index: safeFundingTransaction.index,
          value: safeFundingTransaction.value,
          direction: "in",
          transaction_hash: safeFundingTransaction.redeemTxHash,
          type: "EthTransfer",
          block_number: safeFundingTransaction.block_number,
          timestamp: safeFundingTransaction.timestamp.toJSON(),
          safe_address_profile: profile,
          payload: {
            __typename: "EthTransfer",
            transaction_hash: safeFundingTransaction.hash,
            from: safeFundingTransaction.from,
            from_profile: profile,
            to: safeFundingTransaction.to,
            to_profile: profile,
            value: safeFundingTransaction.value,
          }
        };
      } finally {
        await pool.end();
      }
    }),
    myProfile: myProfile(prisma_api_rw),
    myInvitations: (async (parent, args, context) => {
      const session = await context.verifySession();
      const invitations = await prisma_api_ro.invitation.findMany({
        where: {
          createdByProfileId:session.profileId
        },
        include: {
          claimedBy: true
        }
      });

      return invitations.map(o => <CreatedInvitation>{
        name: o.name,
        address: o.address,
        balance: "0",
        code: o.code,
        createdAt: o.createdAt.toJSON(),
        createdByProfileId: session.profileId,
        claimedBy: o.claimedBy,
        claimedByProfileId: o.claimedByProfileId
      });
    }),
    profilesById: profilesById(prisma_api_ro),
    profilesBySafeAddress: profilesBySafeAddress(prisma_api_ro, true),
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
    contacts: contacts(prisma_api_ro, true),
    contact: contact(prisma_api_ro),
    chatHistory: chatHistory(prisma_api_ro),
    commonTrust: commonTrust(prisma_api_ro),
    inbox: inbox(prisma_api_ro)

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
    tagTransaction: tagTransaction(prisma_api_rw),
    sendMessage: sendMessage(prisma_api_rw),
    acknowledge: acknowledge(prisma_api_rw),
    createInvitations: createInvitations(prisma_api_rw),
    claimInvitation: claimInvitation(prisma_api_rw),
    redeemClaimedInvitation: redeemClaimedInvitation(prisma_api_ro, prisma_api_rw),
    requestSessionChallenge: (parent, args, context) => {
      return ""
    },
    verifySessionChallenge: (parent, args, context) => {
      return {
        success: false
      }
    },
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
