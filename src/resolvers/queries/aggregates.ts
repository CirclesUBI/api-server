import {Context} from "../../context";
import {AggregateSource} from "../../querySources/aggregateSources/aggregateSource";
import {AggregateType, Contacts, QueryAggregatesArgs } from "../../types";
import {CrcBalanceSource} from "../../querySources/aggregateSources/blockchain-indexer/crcBalanceSource";
import {Erc20BalancesSource} from "../../querySources/aggregateSources/blockchain-indexer/erc20BalancesSource";
import {ContactPoints, ContactsSource} from "../../querySources/aggregateSources/api/contactsSource";
import {canAccess} from "../../utils/canAccess";
import {MembershipsSource} from "../../querySources/aggregateSources/api/membershipsSource";
import {MembersSource} from "../../querySources/aggregateSources/api/membersSource";
import {CombinedAggregateSource} from "../../querySources/aggregateSources/combinedAggregateSource";
import {AggregateAugmenter} from "../../querySources/aggregateSources/aggregateAugmenter";

export const aggregates = async (parent:any, args:QueryAggregatesArgs, context: Context) => {
    const aggregateSources: AggregateSource[] = [];
    const types = args.types?.toLookup(c => c) ?? {};

    if (types[AggregateType.CrcBalances]) {
      aggregateSources.push(new CrcBalanceSource());
    }
    if (types[AggregateType.Erc20Balances]) {
      aggregateSources.push(new Erc20BalancesSource());
    }
    if (types[AggregateType.Contacts]) {
      const contactPoints = [
        ContactPoints.CrcHubTransfer,
        ContactPoints.CrcTrust,
        ContactPoints.Erc20Transfers
      ];
      if (context.session) {
        let canAccessPrivateDetails = await canAccess(context, args.safeAddress);
        if (canAccessPrivateDetails) {
          contactPoints.push(ContactPoints.Invitation);
          contactPoints.push(ContactPoints.InvitationRedeemed);
          contactPoints.push(ContactPoints.MembershipOffer);
          contactPoints.push(ContactPoints.ChatMessage);
        }
      }
      aggregateSources.push(new ContactsSource(contactPoints));
    }

    if (context.session) {
      let canAccessPrivateDetails = await canAccess(context, args.safeAddress);
    }

    if (types[AggregateType.Memberships]) {
      aggregateSources.push(new MembershipsSource());
    }
    if (types[AggregateType.Members]) {
      aggregateSources.push(new MembersSource());
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
  };
