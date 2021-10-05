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
import {verifySessionChallengeResolver} from "./mutations/verifySessionChallengeResolver";
import {BN} from "ethereumjs-util";

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
        const result = await pool.query(query, [args.owner]);
        return result.rows.map(o => o.safe_address);
      } finally {
        await pool.end();
      }
    },
    invitationTransaction: invitationTransaction(prisma_api_ro),
    hubSignupTransaction: async (parent, args, context) =>  {
      const session = await context.verifySession();
      const profile = await prisma_api_ro.profile.findFirst({
        where:{
          //OR:[{
//            emailAddress: null,
            circlesSafeOwner: session.ethAddress
//          }, {
//            emailAddress: session.emailAddress
//          }]
        }
      });
      if (!profile?.circlesAddress || !profile?.circlesSafeOwner) {
        return null;
      }
      const pool = getPool();
      try {
        const hubSignupTransactionQuery = `
            select * from crc_signup_2 where "user" = $1`;

        const hubSignupTransactionQueryParams = [
          profile.circlesAddress.toLowerCase()
        ];
        const hubSignupTransactionResult = await pool.query(
          hubSignupTransactionQuery,
          hubSignupTransactionQueryParams);

        if (hubSignupTransactionResult.rows.length == 0) {
          return null;
        }

        const hubSignupTransaction = hubSignupTransactionResult.rows[0];

        return <ProfileEvent>{
          id: hubSignupTransaction.id,
          safe_address: profile.circlesAddress.toLowerCase(),
          transaction_index: hubSignupTransaction.index,
          value: hubSignupTransaction.value,
          direction: "out",
          transaction_hash: hubSignupTransaction.hash,
          type: "CrcSignup",
          block_number: hubSignupTransaction.block_number,
          timestamp: hubSignupTransaction.timestamp.toJSON(),
          safe_address_profile: profile,
          payload: {
            __typename: "CrcSignup",
            user: hubSignupTransaction.user,
            token: hubSignupTransaction.token,
            transaction_hash: hubSignupTransaction.hash,
            user_profile: profile
          }
        };
      } finally {
        await pool.end();
      }
    },
    safeFundingTransaction: (async (parent, args, context) => {
      const session = await context.verifySession();
      const profile = await prisma_api_ro.profile.findFirst({
        where:{
//          OR:[{
//            emailAddress: null,
            circlesSafeOwner: session.ethAddress
//          }, {
//            emailAddress: session.emailAddress
//          }]
        }
      });
      if (!profile?.circlesAddress || !profile?.circlesSafeOwner) {
        return null;
      }
      const pool = getPool();
      try {
        const safeFundingTransactionQuery = `
            select *
            from transaction_2
            where "from" = $1
              and "to" = $2`;

        const safeFundingTransactionQueryParams = [
          profile.circlesSafeOwner.toLowerCase(),
          profile.circlesAddress.toLowerCase()
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
          transaction_hash: safeFundingTransaction.hash,
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
    inbox: inbox(prisma_api_ro),
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
    requestSessionChallenge: async (parent, args, context) => {
      return await Session.requestSessionFromSignature(prisma_api_rw, args.address);
    },
    verifySessionChallenge: verifySessionChallengeResolver(prisma_api_rw),
    createTestInvitation: async (parent, args, context) => {
      const web3 = RpcGateway.get();
      const invitationEoa = web3.eth.accounts.create();
      const invitation = await prisma_api_rw.invitation.create({
        data: {
          name: Session.generateRandomBase64String(3),
          createdAt: new Date(),
          createdByProfileId: 1,
          address: invitationEoa.address,
          key: invitationEoa.privateKey,
          code: Session.generateRandomBase64String(16)
        },
        include: {
          createdBy: true
        }
      });

      const invitationFundsEoa = web3.eth.accounts.privateKeyToAccount(process.env.INVITE_EOA_KEY ?? "");

      const gas = 41000;
      const gasPrice = new BN(await web3.eth.getGasPrice());
      const nonce = await web3.eth.getTransactionCount(invitationFundsEoa.address);

      const signedTx = await invitationFundsEoa.signTransaction({
        from: invitationFundsEoa.address,
        to: invitation.address,
        value: new BN(web3.utils.toWei("0.2", "ether")),
        gasPrice: gasPrice,
        gas: gas,
        nonce: nonce
      });

      if (!signedTx?.rawTransaction) {
        throw new Error(`Couldn't send the invitation transaction`);
      }

      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log("Transferred invite xdai: ", receipt);

      return <CreateInvitationResult>{
        success: true,
        createdInviteEoas: [{
          createdBy: invitation.createdBy,
          createdByProfileId: invitation.createdByProfileId,
          createdAt: invitation.createdAt.toJSON(),
          name: invitation.name,
          address: invitation.address,
          balance: "0",
          code: invitation.code,
        }]
      };
    }
  },
  Subscription: {
    events: {
      subscribe:async (parent, args, context:Context) => {
        const session = await context.verifySession();
        if (!session.profileId) {
          throw new Error(`You need a profile to subscribe.`)
        }
        const profile = await prisma_api_rw.profile.findUnique({
          where: {
            id: session.profileId
          }
        });
        if (!profile || !profile.circlesAddress)
          throw new Error(`You need a safe to subscribe`);

        return ApiPubSub.instance.pubSub.asyncIterator([`events_${profile.circlesAddress.toLowerCase()}`]);
      }
    }
  }
};
