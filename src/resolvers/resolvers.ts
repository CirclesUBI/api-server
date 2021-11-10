import {myProfile, profilesBySafeAddress} from "./queries/profiles";
import {upsertProfileResolver} from "./mutations/upsertProfile";
import {prisma_api_ro, prisma_api_rw} from "../apiDbClient";
import {
  AggregateType, EventType, Profile,
  ProfileEvent,
  ProfileOrOrganisation, Resolvers,
  SortOrder
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
import {profileCity} from "./profile/city";
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
import {AcceptedMembershipOfferEventSource} from "../eventSources/api/acceptedMembershipOfferEventSource";
import {ChatMessageEventSource} from "../eventSources/api/chatMessageEventSource";
import {MembershipOfferEventSource} from "../eventSources/api/membershipOfferEventSource";
import {RejectedMembershipOfferEventSource} from "../eventSources/api/rejectedMembershipOfferEventSource";
import {CreatedInvitationsEventSource} from "../eventSources/api/createdInvitationsEventSource";
import {RedeemedInvitationsEventSource} from "../eventSources/api/redeemedInvitationsEventSource";
import {
  BlockchainEventType,
  BlockchainIndexerEventSource
} from "../eventSources/blockchain-indexer/blockchainIndexerEventSource";
import {EventSource} from "../eventSources/eventSource";
import {EventAugmenter} from "../eventSources/eventAugmenter";
import {CombinedEventSource} from "../eventSources/combinedEventSource";
import {ContactPoints, ContactsSource} from "../aggregateSources/api/contactsSource";
import {CombinedAggregateSource} from "../aggregateSources/combinedAggregateSource";
import {AggregateSource} from "../aggregateSources/aggregateSource";
import {CrcBalanceSource} from "../aggregateSources/blockchain-indexer/crcBalanceSource";
import {MembershipsSource} from "../aggregateSources/api/membershipsSource";
import {MembersSource} from "../aggregateSources/api/membersSource";
import {AggregateAugmenter} from "../aggregateSources/aggregateAugmenter";
import {ProfileLoader} from "../profileLoader";
import {OffersSource} from "../aggregateSources/api/offersSource";
import {WelcomeMessageEventSource} from "../eventSources/api/welcomeMessageEventSource";
import {PurchaseLine} from "../api-db/client";
import {PurchasesSource} from "../aggregateSources/api/purchasesSource";
import {canAccess} from "../canAccess";

export const safeFundingTransactionResolver = (async (parent: any, args: any, context: Context) => {
  const session = await context.verifySession();

  const now = new Date();
  const profile = await prisma_api_ro.profile.findFirst({
    where: {
      circlesSafeOwner: session.ethAddress?.toLowerCase()
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
        tags: []
      }
    };
  } finally {
    await pool.end();
  }
});


export function getPool() {
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
    city: profileCity,
    memberships: async (parent: Profile, args, context: Context) => {
      const memberships = await prisma_api_ro.membership.findMany({
        where: {
          memberAddress: parent.circlesAddress ?? "not"
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
          createdByProfileId: o.createdByProfileId,
          createdAt: o.createdAt.toJSON(),
          acceptedAt: o.acceptedAt?.toJSON(),
          rejectedAt: o.rejectedAt?.toJSON(),
          validTo: o.validTo?.toJSON(),
          isAdmin: o.isAdmin ?? false
        }
      })
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
  Organisation: {
    members: async (parent, args, context) => {
      const memberships = (await prisma_api_ro.membership.findMany({
        where: {
          memberAtId: parent.id
        }
      }));

      const members = await new ProfileLoader().profilesBySafeAddress(prisma_api_ro, memberships.map(o => o.memberAddress));
      return Object.values(members).map(o => {
        return <ProfileOrOrganisation>{
          __typename: "Profile",
          ...o
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
    profilesBySafeAddress: profilesBySafeAddress(prisma_api_ro),
    search: search(prisma_api_ro),
    version: version(packageJson),
    tags: tags(prisma_api_ro),
    tagById: tagById(prisma_api_ro),
    trustRelations: trustRelations(prisma_api_ro),
    commonTrust: commonTrust(prisma_api_ro),
    lastUBITransaction: lastUbiTransaction(),
    initAggregateState: initAggregateState(),
    profilesById: async (parent, args, context: Context) => {
      const profiles = await new ProfileLoader().queryCirclesLandById(prisma_api_rw, args.ids);
      return <Profile[]>Object.values(profiles.idProfileMap).map(o => {
        // @ts-ignore
        delete o.newsletter;
        // @ts-ignore
        o.memberships = [];
        return o;
      });
    },
    aggregates: async (parent, args, context: Context) => {
      const aggregateSources: AggregateSource[] = [];
      const types = args.types?.reduce((p, c) => {
        if (!c) return p;
        p[c] = true;
        return p;
      }, <{ [x: string]: any }>{}) ?? {};

      if (types[AggregateType.CrcBalances]) {
        aggregateSources.push(new CrcBalanceSource());
      }
      if (types[AggregateType.Purchases]) {
        aggregateSources.push(new PurchasesSource());
      }
      if (types[AggregateType.Contacts]) {
        const contactPoints = [
          ContactPoints.CrcHubTransfer,
          ContactPoints.CrcTrust
        ];
        if (context.sessionId) {
          let canAccessPrivateDetails = await canAccess(context, args.safeAddress);
          if (canAccessPrivateDetails) {
            contactPoints.push(ContactPoints.Invitation);
            contactPoints.push(ContactPoints.MembershipOffer);
            contactPoints.push(ContactPoints.ChatMessage);
          }
        }
        aggregateSources.push(new ContactsSource(contactPoints));
      }
      if (types[AggregateType.Memberships]) {
        aggregateSources.push(new MembershipsSource());
      }
      if (types[AggregateType.Members]) {
        aggregateSources.push(new MembersSource());
      }
      if (types[AggregateType.Offers]) {
        aggregateSources.push(new OffersSource());
      }

      const source = new CombinedAggregateSource(aggregateSources);
      let aggregates = await source.getAggregate(args.safeAddress, args.filter);

      const augmentation = new AggregateAugmenter();
      aggregates.forEach(e => augmentation.add(e));
      aggregates = await augmentation.augment();

      return aggregates;
    },
    events: async (parent, args, context: Context) => {
      const eventSources: EventSource[] = [];
      const types = args.types?.reduce((p, c) => {
        if (!c) return p;
        p[c] = true;
        return p;
      }, <{ [x: string]: any }>{}) ?? {};

      //
      // public
      //
      if (types[EventType.CrcSignup]) {
        delete types[EventType.CrcSignup];
        eventSources.push(new BlockchainIndexerEventSource([BlockchainEventType.CrcSignup]));
      }
      if (types[EventType.CrcTrust]) {
        delete types[EventType.CrcTrust];
        eventSources.push(new BlockchainIndexerEventSource([BlockchainEventType.CrcTrust]));
      }
      if (types[EventType.CrcHubTransfer]) {
        delete types[EventType.CrcHubTransfer];
        eventSources.push(new BlockchainIndexerEventSource([BlockchainEventType.CrcHubTransfer]));
      }
      if (types[EventType.CrcMinting]) {
        delete types[EventType.CrcMinting];
        eventSources.push(new BlockchainIndexerEventSource([BlockchainEventType.CrcMinting]));
      }
      if (types[EventType.CrcTokenTransfer]) {
        delete types[EventType.CrcTokenTransfer];
      }
      if (types[EventType.OrganisationCreated]) {
        delete types[EventType.OrganisationCreated];
        throw new Error(`Not implemented: OrganisationCreated`);
      }
      if (types[EventType.MemberAdded]) {
        delete types[EventType.MemberAdded];
        throw new Error(`Not implemented: MemberAdded`);
      }
      /*
      if (types[EventType.MemberRemoved]) {
        delete types[EventType.MemberRemoved];
        throw new Error(`Not implemented: MemberRemoved`);
      }
       */
      if (types[EventType.EthTransfer]) {
        delete types[EventType.EthTransfer];
        eventSources.push(new BlockchainIndexerEventSource([BlockchainEventType.EthTransfer]));
      }
      if (types[EventType.GnosisSafeEthTransfer]) {
        delete types[EventType.GnosisSafeEthTransfer];
        eventSources.push(new BlockchainIndexerEventSource([BlockchainEventType.GnosisSafeEthTransfer]));
      }

      //
      // private
      //
      if (Object.keys(types).length > 0 && context.sessionId) {
        let canAccessPrivateDetails = await canAccess(context, args.safeAddress);

        if (canAccessPrivateDetails && types[EventType.ChatMessage]) {
          eventSources.push(new ChatMessageEventSource());
        }
        if (canAccessPrivateDetails && types[EventType.MembershipOffer]) {
          eventSources.push(new MembershipOfferEventSource());
        }
        if (canAccessPrivateDetails && types[EventType.MembershipAccepted]) {
          eventSources.push(new AcceptedMembershipOfferEventSource());
        }
        if (canAccessPrivateDetails && types[EventType.MembershipRejected]) {
          eventSources.push(new RejectedMembershipOfferEventSource());
        }
        if (canAccessPrivateDetails && types[EventType.WelcomeMessage]) {
          eventSources.push(new WelcomeMessageEventSource());
        }
        if (canAccessPrivateDetails && types[EventType.InvitationCreated]) {
          eventSources.push(new CreatedInvitationsEventSource());
        }
        if (canAccessPrivateDetails && types[EventType.InvitationRedeemed]) {
          eventSources.push(new RedeemedInvitationsEventSource());
        }
      }

      const aggregateEventSource = new CombinedEventSource(eventSources);

      /*let callerProfile: Profile | null = null;
      if (context.sessionId && !callerProfile) {
        // Necessary to cache private items?!
        callerProfile = await context.callerProfile;
      }*/

      let events: ProfileEvent[] = [];

      // TODO: Check if there are cached events in the queried range ...
      /*events = (await Promise.all(args.types.flatMap(async t => {
        let cachedEvents = await eventCache2.read(
          context,
          args.safeAddress.toLowerCase(),
          t,
          new Date(args.pagination.continueAt).getTime(),
          args.pagination.order == SortOrder.Asc ? "asc" : "desc",
          args.pagination.limit);

        return cachedEvents;
      }))).flatMap(o => o);
      */

      if (events.length == 0) {
        events = await aggregateEventSource.getEvents(
          args.safeAddress,
          args.pagination,
          args.filter ?? null);

        events = events.sort((a, b) => {
          const aTime = new Date(a.timestamp).getTime();
          const bTime = new Date(b.timestamp).getTime();
          return (
            //args.pagination.order == SortOrder.Asc
            /*?*/ aTime < bTime
            //: aTime > bTime
          )
            ? -1
            : aTime < bTime
              ? 1
              : 0;
        });

        // TODO: Cache all new events
        /*
        events.forEach(e => {
          const eTime = new Date(e.timestamp).getTime();
          eventCache2.store(context, e);
        });
         */
      }

      const augmentation = new EventAugmenter();
      events.forEach(e => {
        augmentation.add(e);
      });
      events = await augmentation.augment();

      events = events.sort((a, b) => {
        const aTime = new Date(a.timestamp).getTime();
        const bTime = new Date(b.timestamp).getTime();
        return (
          args.pagination.order == SortOrder.Asc
            ? aTime < bTime
            : aTime > bTime
        )
          ? -1
          : aTime < bTime
            ? 1
            : 0;
      });
      events = events.slice(0, Math.min(events.length, args.pagination.limit));

      return events;
    }
  },
  Mutation: {
    purchase: async (parent, args, context: Context) => {
      const callerProfile = await context.callerProfile;
      if (!callerProfile) {
        throw new Error(`You need a profile to purchase.`);
      }
      if (!callerProfile.circlesAddress) {
        throw new Error(`You need a safe to purchase.`)
      }



      // Group the single product lines by seller and then sum


      const purchaseLines = await Promise.all(args.lines.map(async o => {
        const maxVersion = await prisma_api_ro.$queryRaw(`
            select id
                 , max(o.version) as version
            from "Offer" o
            where id = $1
            group by id`, o.offerId);

        if (maxVersion.length == 0) {
          throw new Error(`Couldn't find a offer with the id ${o.offerId}.`);
        }

        const offer = await prisma_api_ro.offer.findUnique({
          where: {
            id_version: {
              id: o.offerId,
              version: maxVersion[0].version
            }
          }
        });

        if (!offer) {
          throw new Error(`Couldn't find a offer with the id ${o.offerId}.`);
        }

        return <PurchaseLine>{
          amount: o.amount,
          productId: offer.id,
          productVersion: offer.version
        }
      }));

      const purchase = await prisma_api_rw.purchase.create({
        data: {
          createdByProfileId: callerProfile.id,
          createdAt: new Date(),
          lines: {
            createMany: {
              data: purchaseLines
            }
          }
        }
      });

      const returnPurchase = await prisma_api_rw.purchase.findUnique({
        where: {
          id: purchase.id
        },
        include: {
          createdBy: true,
          lines: {
            include: {
              product: true
            }
          }
        }
      });

      if (!returnPurchase)
        throw new Error("Couldn't create the purchase.");

      returnPurchase.lines = returnPurchase.lines.map(o => {
        return {
          ...o,
          offer: o.product
        }
      });

      return <any>{
        ...returnPurchase,
        createdByAddress: callerProfile.circlesAddress
      };
    },
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
    requestSessionChallenge: async (parent, args, context: Context) => {
      return await Session.requestSessionFromSignature(prisma_api_rw, args.address);
    },
    verifySessionChallenge: verifySessionChallengeResolver(prisma_api_rw),
    createTestInvitation: createTestInvitation(prisma_api_rw),
    addMember: addMemberResolver,
    removeMember: removeMemberResolver,
  },
  Subscription: {
    events: {
      subscribe: async (parent, args, context: Context) => {
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
