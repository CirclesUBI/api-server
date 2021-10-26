import {myProfile, profilesById, profilesBySafeAddress} from "./queries/profiles";
import {upsertProfileResolver} from "./mutations/upsertProfile";
import {prisma_api_ro, prisma_api_rw} from "../apiDbClient";
import {
  MutationRequestInvitationOfferArgs,
  Profile,
  ProfileEvent,
  ProfileOrOrganisation,
  Resolvers
} from "../types";
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
import {Session} from "../session";
import {createInvitations} from "./mutations/createInvitations";
import {redeemClaimedInvitation} from "./mutations/redeemClaimedInvitation";
import {invitationTransaction} from "./queries/invitationTransaction";
import {verifySessionChallengeResolver} from "./mutations/verifySessionChallengeResolver";
import {organisations} from "./queries/organisations";
import {lastUbiTransaction} from "./queries/lastUbiTransaction";
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
import {Generate} from "../generate";
import {RpcGateway} from "../rpcGateway";
import BN from "bn.js";

export const safeFundingTransactionResolver = (async (parent:any, args:any, context:Context) => {
  const session = await context.verifySession();

  const now = new Date();
  const profile = await prisma_api_ro.profile.findFirst({
    where:{
//          OR:[{
//            emailAddress: null,
      circlesSafeOwner: session.ethAddress?.toLowerCase()
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

    console.log(`Searching for the safe funding transaction from ${profile.circlesSafeOwner.toLowerCase()} to ${profile.circlesAddress.toLowerCase()} took ${new Date().getTime() - now.getTime()} ms.`)

    if (safeFundingTransactionResult.rows.length == 0) {
      return null;
    }

    const safeFundingTransaction = safeFundingTransactionResult.rows[0];

    return <ProfileEvent>{
      id: safeFundingTransaction.id,
      safe_address: profile.circlesSafeOwner?.toLowerCase(),
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
});



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
    city: profileCity,
    memberships: async (parent:Profile, args, context:Context) => {
      const memberships = await prisma_api_ro.membership.findMany({
        where: {
          memberId: parent.id
        },
        include: {
          memberAt: true
        }
      });

      return memberships.map(o => {
        return {
          organisation: {
            id: o.memberAt.id,
            name: o.memberAt.firstName,
            cityGeonameid: o.memberAt.cityGeonameid,
            avatarUrl: o.memberAt.avatarUrl,
            avatarMimeType: o.memberAt.avatarMimeType,
            circlesSafeOwner: o.memberAt.circlesSafeOwner?.toLowerCase(),
            description: o.memberAt.dream,
            createdAt: o.createdAt.toJSON(), // TODO: This is the creation date of the membership, not the one of the organisation
            circlesAddress: o.memberAt.circlesAddress
          },
          isAdmin: o.isAdmin ?? false
        }
      })
    }
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
  Organisation: {
    members: async (parent, args, context) => {
      return (await prisma_api_ro.membership.findMany({
        where: {
          memberAtId: parent.id
        },
        include: {
          member: true
        }
      }))
      .map(o => {
        return <ProfileOrOrganisation>{
          __typename: "Profile",
          ...o.member
        };
      });
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
    safeFundingTransaction: safeFundingTransactionResolver,
    myProfile: myProfile(prisma_api_rw),
    myInvitations: myInvitations(),
    organisations: organisations(prisma_api_ro),
    regions: regionsResolver,
    organisationsByAddress: organisationsByAddress(),
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
    lastUBITransaction: lastUbiTransaction(),
    initAggregateState: initAggregateState()
  },
  Mutation: {
    upsertOrganisation: upsertOrganisation(prisma_api_rw, false),
    upsertRegion: upsertOrganisation(prisma_api_rw, true),
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
    requestSessionChallenge: async (parent, args, context:Context) => {
      return await Session.requestSessionFromSignature(prisma_api_rw, args.address);
    },
    verifySessionChallenge: verifySessionChallengeResolver(prisma_api_rw),
    createTestInvitation: createTestInvitation(prisma_api_rw),
    addMember: addMemberResolver,
    removeMember: removeMemberResolver,
    requestInvitationOffer: async (parent:any, args: MutationRequestInvitationOfferArgs, context:Context) => {

      // TODO: while(foundRegion || end) {
      //       }

      // 1. Find the region of the currently logged on user:
      //    TODO: First try the cityId of the user, then use coarser fallbacks.
      const region = await prisma_api_ro.profile.findMany({
        where: {
          type: "REGION"
        },
        include: {
          invitationFunds: true
        },
        take: 1
      });

      if (!region.length)
        throw new Error(`Couldn't find a regional assembly that can provide you with new invites to the system.`);

      const myRegion = region[0];
      if (!myRegion.invitationFunds)
        throw new Error(`Your region doesn't provide a pool to fund new invitations.`);

      const account = RpcGateway.get().eth.accounts.privateKeyToAccount(myRegion.invitationFunds.privateKey);
      const balance = new BN(await RpcGateway.get().eth.getBalance(account.address));

      // TODO: Make configurable per Region:
      const price = new BN(RpcGateway.get().utils.toWei("10", "ether"));
      const maxAvailable = balance.div(price);
      const effectiveBalance = balance.sub(maxAvailable.mul(new BN("21000")));
      const effectiveMaxAvailable = effectiveBalance.div(price).toNumber();

      // TODO: Why absoluteMax? Can be used to:
      //       * Hide the EOA that's used to fund the invites (if balance always > 25 invites)
      //       * Max. amount per user
      //       * Guaranteed available amount (together with a 'validTo' date on the offer)
      const absoluteMax = effectiveMaxAvailable > 25 ? 25 : effectiveMaxAvailable;

      const offer = await prisma_api_rw.offer.create({
        data: {
          id: Generate.randomHexString(16),
          isPrivate: true,
          publishedAt: new Date().toJSON(),
          createdByProfileId: 0,
          geonameid: 0,
          title: `1 Invite`,
          description: `One invitation voucher`,
          pictureUrl: `https://dev.circles.land/logos/circles.png`,
          pictureMimeType: `image/png`,
          categoryTagId: 2,
          pricePerUnit: price.toString(),
          unitTagId: 3,
          maxUnits: Number.parseInt(absoluteMax.toFixed()),
          deliveryTermsTagId: 4
        }
      });

      return {
        ...offer,
        pictureUrl: offer.pictureUrl ?? "",
        pictureMimeType: offer.pictureMimeType ?? "",
        publishedAt: offer.publishedAt.toJSON(),
        unlistedAt: offer.unlistedAt?.toJSON() ?? undefined
      };
    }
  },
  Subscription: {
    events: {
      subscribe: async (parent, args, context:Context) => {
        const profile = await context.callerProfile;
        if (!profile)
          throw new Error(`You need a profile to subscribe`);

        if (!profile.circlesAddress && profile.circlesSafeOwner) {
          return ApiPubSub.instance.pubSub.asyncIterator([`events_${profile.circlesSafeOwner.toLowerCase()}`]);
        } else if (profile.circlesAddress) {
          return ApiPubSub.instance.pubSub.asyncIterator([`events_${profile.circlesAddress.toLowerCase()}`]);
        } else {
          throw new Error(`Cannot subscribe without an eoa- or safe-address.`)
        }
      }
    }
  }
};
