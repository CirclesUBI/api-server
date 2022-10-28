import { Context } from "../../context";
import { EventSource } from "../../querySources/eventSources/eventSource";
import {
  BlockchainEventType,
  BlockchainIndexerEventSource,
} from "../../querySources/eventSources/blockchain-indexer/blockchainIndexerEventSource";
import {
  EventType,
  ProfileEvent,
  QueryEventsArgs,
  SortOrder,
} from "../../types";
import { canAccess } from "../../utils/canAccess";
import { MembershipOfferEventSource } from "../../querySources/eventSources/api/membershipOfferEventSource";
import { AcceptedMembershipOfferEventSource } from "../../querySources/eventSources/api/acceptedMembershipOfferEventSource";
import { RejectedMembershipOfferEventSource } from "../../querySources/eventSources/api/rejectedMembershipOfferEventSource";
import { WelcomeMessageEventSource } from "../../querySources/eventSources/api/welcomeMessageEventSource";
import { CreatedInvitationsEventSource } from "../../querySources/eventSources/api/createdInvitationsEventSource";
import { RedeemedInvitationsEventSource } from "../../querySources/eventSources/api/redeemedInvitationsEventSource";
import { CombinedEventSource } from "../../querySources/eventSources/combinedEventSource";
import { EventAugmenter } from "../../querySources/eventSources/eventAugmenter";
import { SafeVerifiedEventSource } from "../../querySources/eventSources/api/safeVerifiedEventSource";
import {NewUserEventSource} from "../../querySources/eventSources/api/newUserEventSource";

export const events = async (
  parent: any,
  args: QueryEventsArgs,
  context: Context
) => {
  const eventSources: EventSource[] = [];
  const types = args.types?.toLookup(c => c) ?? {};

  if (args.pagination.limit > 250) {
    throw new Error(`You cannot query more than 250 events in one request.`);
  }

  //
  // public
  //
  const blockChainEventTypes: BlockchainEventType[] = [];
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
  if (types[EventType.NewUser]) {
    delete types[EventType.NewUser];
    eventSources.push(new NewUserEventSource());
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
  if (Object.keys(types).length > 0 && context.session) {
    let canAccessPrivateDetails = await canAccess(context, args.safeAddress);

    if (canAccessPrivateDetails && types[EventType.SafeVerified]) {
      eventSources.push(new SafeVerifiedEventSource());
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

  /*let callerInfo: Profile | null = null;
  if (context.sessionToken && !callerInfo) {
    // Necessary to cache private items?!
    callerInfo = await context.callerInfo;
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
      args.filter ?? null
    );

    events = events.sort((a, b) => {
      const aTime = new Date(a.timestamp).getTime();
      const bTime = new Date(b.timestamp).getTime();
      return (
        //args.pagination.order == SortOrder.Asc
        /*?*/ aTime < bTime
          ? //: aTime > bTime
            -1
          : aTime < bTime
          ? 1
          : 0
      );
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
  events.forEach((e) => {
    augmentation.add(e);
  });
  events = await augmentation.augment();

  events = events.sort((a, b) => {
    const aTime = new Date(a.timestamp).getTime();
    const bTime = new Date(b.timestamp).getTime();
    return (
      args.pagination.order == SortOrder.Asc ? aTime < bTime : aTime > bTime
    )
      ? -1
      : aTime < bTime
      ? 1
      : 0;
  });
  events = events.slice(0, Math.min(events.length, args.pagination.limit));

  return events;
};
