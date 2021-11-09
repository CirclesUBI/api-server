import {
  AggregateType,
  Contacts,
  CrcBalances,
  IAggregatePayload,
  Members,
  Memberships, Offers,
  ProfileAggregate, Purchases
} from "../types";
import {ProfilesBySafeAddressLookup} from "../resolvers/queries/profiles";
import {ProfileLoader} from "../profileLoader";
import {prisma_api_ro} from "../apiDbClient";

export class AggregateAugmenter
{
  private _profiles: ProfilesBySafeAddressLookup = {};
  private _aggregates: ProfileAggregate[] = [];
  private _extractors: AggregateAugmentation<any>[] = [
    new CrcBalanceAugmentation(),
    new ContactsAugmentation(),
    new MembersAugmentation(),
    new MembershipsAugmentation(),
    new OffersAugmentation(),
    new PurchasesAugmentation()
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
        .forEach(ex => ex.augmentProfiles(ev.payload, this._profiles))
    });

    return this._aggregates;
  }
}

export interface AggregateAugmentation<TAggregatePayload extends IAggregatePayload> {
  matches(profileAggregate:ProfileAggregate) : boolean;
  extractAddresses(payload: TAggregatePayload): string[];
  augmentProfiles(payload: TAggregatePayload, profiles: ProfilesBySafeAddressLookup) : void;
}

export class CrcBalanceAugmentation implements AggregateAugmentation<CrcBalances> {
  matches(profileAggregate: ProfileAggregate) {
    return profileAggregate.type == AggregateType.CrcBalances;
  }

  augmentProfiles(payload: CrcBalances, profiles: ProfilesBySafeAddressLookup): void {
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

  augmentProfiles(payload: Contacts, profiles: ProfilesBySafeAddressLookup): void {
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

  augmentProfiles(payload: Members, profiles: ProfilesBySafeAddressLookup): void {
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

  augmentProfiles(payload: Memberships, profiles: ProfilesBySafeAddressLookup): void {
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

  augmentProfiles(payload: Offers, profiles: ProfilesBySafeAddressLookup): void {
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

  augmentProfiles(payload: Purchases, profiles: ProfilesBySafeAddressLookup): void {
    payload.purchases = payload.purchases.map(o => {
      o.createdByProfile = profiles[o.createdByAddress];
      return o;
    });
  }

  extractAddresses(payload: Purchases): string[] {
    return payload.purchases.map(o => o.createdByAddress);
  }
}