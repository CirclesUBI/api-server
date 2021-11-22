import {
  AggregateType,
  Contacts,
  CrcBalances, Erc20Balances,
  IAggregatePayload,
  Members,
  Memberships, Offers, ProfileAggregate, Purchases, Sales
} from "../types";
import {ProfilesBySafeAddressLookup} from "../resolvers/queries/profiles";
import {ProfileLoader} from "../profileLoader";
import {prisma_api_ro} from "../apiDbClient";

export class AggregateAugmenter
{
  private _profiles: ProfilesBySafeAddressLookup = {};
  private _aggregates: ProfileAggregate[] = [];
  private _extractors: AggregateAugmentation<any>[] = [
    new CrcBalancesAugmentation(),
    new ContactsAugmentation(),
    new MembersAugmentation(),
    new MembershipsAugmentation(),
    new OffersAugmentation(),
    new PurchasesAugmentation(),
    new SalesAugmentation(),
    new Erc20BalancesAugmentation()
  ];

  add(profileAggregate: ProfileAggregate) {
    // Extract all eth addresses from the event
    const addresses = this._extractors
      .filter(e => e.matches(profileAggregate))
      .flatMap(e => e.extractAddresses(profileAggregate.payload)
                             .filter(a => typeof a == "string" && a !== ""));

    addresses.push(profileAggregate.safe_address);

    // Add new addresses as key of the _profiles-map
    addresses
      .filter(a => !this._profiles[a])
      .forEach(a => this._profiles[a] = null);

    this._aggregates.push(profileAggregate);
  }

  async augment() : Promise<ProfileAggregate[]> {
    // Find the profiles for the collected addresses
    this._profiles = await new ProfileLoader()
      .profilesBySafeAddress(prisma_api_ro, Object.keys(this._profiles))

    // Apply the profiles
    this._aggregates.forEach(ev => {
      this._extractors
        .filter(ex => ex.matches(ev))
        .forEach(ex => ex.augmentPayload(ev.payload, this._profiles))
    });

    return this._aggregates;
  }
}

export type TokenInfoByAddress = {
  [safeAddress: string]: {
    symbol: string,
    name: string,
    deployedInBlockHash: string,
    deployedInBlockNo: string,
    deployedAt: string
  } | null;
};

export interface AggregateAugmentation<TAggregatePayload extends IAggregatePayload> {
  matches(profileAggregate:ProfileAggregate) : boolean;
  extractAddresses(payload: TAggregatePayload): string[];
  extractTokenAddresses?(payload: TAggregatePayload): string[];
  augmentPayload(payload: TAggregatePayload, profiles: ProfilesBySafeAddressLookup, tokens?: TokenInfoByAddress) : void;
}

export class Erc20BalancesAugmentation implements AggregateAugmentation<Erc20Balances> {
  matches(profileAggregate: ProfileAggregate) {
    return profileAggregate.type == AggregateType.Erc20Balances;
  }

  augmentPayload(payload: Erc20Balances, profiles: ProfilesBySafeAddressLookup, tokens?: TokenInfoByAddress): void {
  }

  extractTokenAddresses(payload: Erc20Balances): string[] {
    return payload.balances.map(o => o.token_address);
  }

  extractAddresses(payload: Erc20Balances): string[] {
    return [];
  }
}

export class CrcBalancesAugmentation implements AggregateAugmentation<CrcBalances> {
  matches(profileAggregate: ProfileAggregate) {
    return profileAggregate.type == AggregateType.CrcBalances;
  }

  augmentPayload(payload: CrcBalances, profiles: ProfilesBySafeAddressLookup): void {
    payload.balances.forEach(b => b.token_owner_profile = profiles[b.token_owner_address]);
  }

  extractAddresses(payload: CrcBalances): string[] {
    return payload.balances.map(o => o.token_owner_address);
  }
}

export class ContactsAugmentation implements AggregateAugmentation<Contacts> {
  matches(profileAggregate: ProfileAggregate) {
    return profileAggregate.type == AggregateType.Contacts;
  }

  augmentPayload(payload: Contacts, profiles: ProfilesBySafeAddressLookup): void {
    payload.contacts.forEach(c => c.contactAddress_Profile = profiles[c.contactAddress]);
  }

  extractAddresses(payload: Contacts): string[] {
    return payload.contacts.map(o => o.contactAddress);
  }
}

export class MembersAugmentation implements AggregateAugmentation<Members> {
  matches(profileAggregate: ProfileAggregate) {
    return profileAggregate.type == AggregateType.Members;
  }

  augmentPayload(payload: Members, profiles: ProfilesBySafeAddressLookup): void {
    // TODO: Fix Orga/Profile union type handling
    payload.members = <any>payload.members.map(o => {
      return {
        ...o,
        ...profiles[o.circlesAddress ?? -1]
      };
    });
  }

  extractAddresses(payload: Members): string[] {
    return <string[]>payload.members.map(o => o.circlesAddress).filter(o => !!o);
  }
}

export class MembershipsAugmentation implements AggregateAugmentation<Memberships> {
  matches(profileAggregate: ProfileAggregate) {
    return profileAggregate.type == AggregateType.Memberships;
  }

  augmentPayload(payload: Memberships, profiles: ProfilesBySafeAddressLookup): void {
    payload.organisations = <any>payload.organisations.map(o => {
      return {
        ...o,
        ...profiles[o.circlesAddress ?? -1],
        ...{
          name: profiles[o.circlesAddress ?? -1]?.firstName,
          description: profiles[o.circlesAddress ?? -1]?.dream,
        }
      };
    });
  }

  extractAddresses(payload: Memberships): string[] {
    return <string[]>payload.organisations.map(o => o.circlesAddress).filter(o => !!o);
  }
}

export class OffersAugmentation implements AggregateAugmentation<Offers> {
  matches(profileAggregate: ProfileAggregate) {
    return profileAggregate.type == AggregateType.Offers;
  }

  augmentPayload(payload: Offers, profiles: ProfilesBySafeAddressLookup): void {
    payload.offers = <any>payload.offers.map(o => {
      o.createdByProfile = profiles[o.createdByAddress];
      return o;
    });
  }

  extractAddresses(payload: Offers): string[] {
    return payload.offers.map(o => o.createdByAddress);
  }
}

export class PurchasesAugmentation implements AggregateAugmentation<Purchases> {
  matches(profileAggregate: ProfileAggregate) {
    return profileAggregate.type == AggregateType.Purchases;
  }

  augmentPayload(payload: Purchases, profiles: ProfilesBySafeAddressLookup): void {
    payload.purchases = payload.purchases.map(o => {
      o.createdByProfile = profiles[o.createdByAddress];
      return o;
    });
  }

  extractAddresses(payload: Purchases): string[] {
    return payload.purchases.map(o => o.createdByAddress);
  }
}

export class SalesAugmentation implements AggregateAugmentation<Sales> {
  matches(profileAggregate: ProfileAggregate) {
    return profileAggregate.type == AggregateType.Sales;
  }

  augmentPayload(payload: Sales, profiles: ProfilesBySafeAddressLookup): void {
    payload.sales = payload.sales.map(o => {
      o.sellerProfile = profiles[o.sellerAddress];
      o.buyerProfile = profiles[o.buyerAddress];
      return o;
    });
  }

  extractAddresses(payload: Sales): string[] {
    return payload.sales.flatMap(o => [o.sellerAddress, o.buyerAddress]);
  }
}