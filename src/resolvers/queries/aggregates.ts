import {Context} from "../../context";
import {AggregateSource} from "../../aggregateSources/aggregateSource";
import {AggregateType, Contacts, QueryAggregatesArgs } from "../../types";
import {CrcBalanceSource} from "../../aggregateSources/blockchain-indexer/crcBalanceSource";
import {Erc20BalancesSource} from "../../aggregateSources/blockchain-indexer/erc20BalancesSource";
import {ContactPoints, ContactsSource} from "../../aggregateSources/api/contactsSource";
import {canAccess} from "../../canAccess";
import {PurchasesSource} from "../../aggregateSources/api/purchasesSource";
import {SalesSource} from "../../aggregateSources/api/salesSource";
import {MembershipsSource} from "../../aggregateSources/api/membershipsSource";
import {MembersSource} from "../../aggregateSources/api/membersSource";
import {OffersSource} from "../../aggregateSources/api/offersSource";
import {CombinedAggregateSource} from "../../aggregateSources/combinedAggregateSource";
import {AggregateAugmenter} from "../../aggregateSources/aggregateAugmenter";

export const aggregates = async (parent:any, args:QueryAggregatesArgs, context: Context) => {
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
        ContactPoints.CrcTrust,
        ContactPoints.Erc20Transfers
      ];
      if (context.sessionToken) {
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

    if (context.sessionToken) {
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
  };