import {myProfile, profilesBySafeAddress} from "./queries/profiles";
import {upsertProfileResolver} from "./mutations/upsertProfile";
import {prisma_api_ro, prisma_api_rw} from "../apiDbClient";
import {
  AggregateType, Contacts, EventType, Invoice, InvoiceLine, Profile,
  ProfileEvent,
  ProfileOrOrganisation, Purchase, Resolvers,
  SortOrder, TransitivePath, TransitiveTransfer
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
import {PurchasesSource} from "../aggregateSources/api/purchasesSource";
import {canAccess} from "../canAccess";
import {purchaseResolver} from "./mutations/purchase";
import BN from "bn.js";
import {Erc20BalancesSource} from "../aggregateSources/blockchain-indexer/erc20BalancesSource";
import {SalesSource} from "../aggregateSources/api/salesSource";

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

  const safeFundingTransactionQuery = `
      select *
      from transaction_2
      where "from" = $1
        and "to" = $2`;

  const safeFundingTransactionQueryParams = [
    profile.circlesSafeOwner.toLowerCase(),
    profile.circlesAddress.toLowerCase()
  ];
  const safeFundingTransactionResult = await getPool().query(
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

});


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
  Purchase: {
    invoices: async (parent: Purchase, args: any, context: Context) => {
      const caller = await context.callerProfile;
      if (!caller)
        return [];

      const invoices = await prisma_api_rw.invoice.findMany({
        where: {
          purchase: {
            id: parent.id,
            createdBy: {
              circlesAddress: caller.circlesAddress
            }
          }
        },
        include: {
          customerProfile: true,
          sellerProfile: true,
          lines: {
            include: {
              product: {
                include: {
                  createdBy: true
                }
              }
            }
          }
        }
      });
      return invoices.map(o => {
        return <Invoice>{
          ...o,
          buyerAddress: o.customerProfile.circlesAddress,
          sellerAddress: o.sellerProfile.circlesAddress,
          lines: o.lines.map(l => {
            return <InvoiceLine>{
              ...l,
              offer: {
                ...l.product,
                createdByAddress: l.product.createdBy.circlesAddress,
                createdAt: l.product.createdAt.toJSON()
              }
            }
          })
        }
      });
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
      if (!parent.createdByAddress) {
        return null;
      }

      const profilesResult = await new ProfileLoader().profilesBySafeAddress(prisma_api_ro, [parent.createdByAddress]);
      const profiles = Object.values(profilesResult);
      if (profiles.length != 1) {
        return null;
      }

      return profiles[0];
    }
  },
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
    ubiInfo: ubiInfo(),
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
      if (types[AggregateType.Erc20Balances]) {
        aggregateSources.push(new Erc20BalancesSource());
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

      if (context.sessionId) {
        let canAccessPrivateDetails = await canAccess(context, args.safeAddress);
        if (canAccessPrivateDetails) {
          if (types[AggregateType.Purchases]) {
            aggregateSources.push(new PurchasesSource());
          }
          if (types[AggregateType.Sales]) {
            aggregateSources.push(new SalesSource());
          }
        }
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

      const contacts = aggregates.find(o => o.type === AggregateType.Contacts);
      if (contacts) {
        (<Contacts>contacts.payload).contacts = (<Contacts>contacts.payload).contacts.filter(o => o.contactAddress_Profile?.firstName);
      }

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
      const blockChainEventTypes:BlockchainEventType[] = [];
      if (types[EventType.CrcSignup]) {
        delete types[EventType.CrcSignup];
        blockChainEventTypes.push(BlockchainEventType.CrcSignup);
      }
      if (types[EventType.CrcTrust]) {
        delete types[EventType.CrcTrust];
        blockChainEventTypes.push(BlockchainEventType.CrcTrust);
      }
      if (types[EventType.CrcHubTransfer]) {
        delete types[EventType.CrcHubTransfer];
        blockChainEventTypes.push(BlockchainEventType.CrcHubTransfer);
      }
      if (types[EventType.Erc20Transfer]) {
        delete types[EventType.Erc20Transfer];
        blockChainEventTypes.push(BlockchainEventType.Erc20Transfer);
      }
      if (types[EventType.CrcMinting]) {
        delete types[EventType.CrcMinting];
        blockChainEventTypes.push(BlockchainEventType.CrcMinting);
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
        blockChainEventTypes.push(BlockchainEventType.EthTransfer);
      }
      if (types[EventType.GnosisSafeEthTransfer]) {
        delete types[EventType.GnosisSafeEthTransfer];
      }

      eventSources.push(new BlockchainIndexerEventSource(blockChainEventTypes));

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
    },
    directPath: async (parent, args, context) => {
      const from = args.from.toLowerCase();
      const to = args.to.toLowerCase();

      const sql = `
        with my_tokens as (
          select token
          from crc_balances_by_safe_and_token_2
          where safe_address = $1
      ),
      accepted_tokens as (
           select user_token as token
           from crc_current_trust_2
           where can_send_to = $2
      ),
      intersection as (
           select *
           from my_tokens
           intersect
           select *
           from accepted_tokens
      ),
      relevant_balances as (
           select b.token, b.token_owner, b.balance as balance
           from intersection i
           join crc_balances_by_safe_and_token_2 b on i.token = b.token
           where safe_address = $1
             and balance > 0
           order by b.balance desc
           limit 30
      ),
      total as (
           select sum(balance) as total
           from relevant_balances
      ),
      distribution as (
           select *, ((1 / (select total from total)) * balance) as weight
           from relevant_balances
      ),
      price as (
           select $3::numeric as price
      ),
      weighted_price_parts as (
           select *
                , (select * from price) as price
                , (select * from price) * weight as weighted_price_part
                , trunc((select * from price) * weight, 0) as weighted_price_part_int
           from distribution
      ),
      weighted_price_parts_sum as (
           select sum(weighted_price_part_int) as weighted_price_part_sum_int
                , sum(weighted_price_part) as weighted_price_part_sum
                , max(price) - sum(weighted_price_part_int) as weighted_price_error
                , max(balance) as max_balance
           from weighted_price_parts
      ),
      result as (
           select token
                , token_owner
                , balance
                , case
                    when (balance = (select max_balance from weighted_price_parts_sum))
                        -- The token with the maximum balance must pay for previous rounding errors
                        then weighted_price_part_int + (select weighted_price_error from weighted_price_parts_sum)
                        -- all others use the calculated int part
                        else weighted_price_part_int
                  end as weighted_price_part
           from weighted_price_parts
           order by weight asc
      )
      select token
           , token_owner
           , balance
           , weighted_price_part as amount
      from result;`;

      let requestedAmount = new BN(args.amount);

      const result = await getPool().query(sql, [from, to, requestedAmount.toString()]);
      const transfers: { token: string, tokenOwner: string, balance: BN, weighted_price_part: BN  }[] = [];

      result.rows.forEach(o => {
        const item = {
          token: o.token,
          tokenOwner: o.token_owner,
          balance: new BN(o.balance),
          weighted_price_part: new BN(o.amount),
        };
        transfers.push(item);
      });

      const totalBalance = transfers.reduce((p,c) => p.add(c.balance), new BN("0"));
      if (requestedAmount.gt(totalBalance)) {
        // Not enough balance to perform the transaction
        return <TransitivePath>{
          requestedAmount: args.amount,
          flow: totalBalance.toString(),
          transfers: []
        };
      }

      const flow = transfers.reduce((p,c) => p.add(c.balance), new BN("0"));
      return <TransitivePath>{
        requestedAmount: requestedAmount.toString(),
        flow: flow.toString(),
        transfers: transfers.map(o => {
          return <TransitiveTransfer> {
            token: o.token,
            from: args.from,
            to: args.to,
            tokenOwner: o.tokenOwner,
            value: o.weighted_price_part.toString()
          }
        })
      };
    },
    mostRecentUbiSafeOfAccount: async (parent, args, context) => {
      const findSafeOfOwnerSql = `select "user"
                                  from crc_signup_2
                                  where "owners" @> $1::text[];`;

      const safesResult = await getPool().query(findSafeOfOwnerSql, [[args.account]]);
      if (safesResult.rows.length == 0){
        return null;
      }
      const safeAddresses = safesResult.rows.map(o => o.user);

      const lastActiveSafeSql = `
          select st.safe_address, max(st.timestamp)
          from crc_safe_timeline_2 st
          where st.safe_address = ANY($1::text[])
            and st.type = 'CrcMinting'
          group by st.safe_address
          order by max(st.timestamp) desc
          limit 1;`;

      const activeSafeResult = await getPool().query(lastActiveSafeSql, [safeAddresses]);
      if (activeSafeResult.rows.length == 0){
        return null;
      }

      return activeSafeResult.rows[0].safe_address;
    }
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
        try {
          const session = await context.verifySession();
          const callerProfile = await context.callerProfile;
          if (!callerProfile && !session.ethAddress)
            throw new Error(`You need a registration to subscribe`);

          if (!callerProfile?.circlesAddress && session.ethAddress) {
            return ApiPubSub.instance.pubSub.asyncIterator([`events_${session.ethAddress.toLowerCase()}`]);
          } else if (callerProfile?.circlesAddress) {
            return ApiPubSub.instance.pubSub.asyncIterator([`events_${callerProfile.circlesAddress.toLowerCase()}`]);
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
