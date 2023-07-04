import {
  AggregateType,
  Contacts,
  CrcBalances,
  Erc20Balances,
  IAggregatePayload,
  Members,
  Memberships,
  ProfileAggregate,
} from "../../types";
import { ProfilesBySafeAddressLookup } from "../../resolvers/queries/profiles";
import { ProfileLoader } from "../profileLoader";
import { Environment } from "../../environment";

export class AggregateAugmenter {
  private _profiles: ProfilesBySafeAddressLookup = {};
  private _aggregates: ProfileAggregate[] = [];
  private _extractors: AggregateAugmentation<any>[] = [
    new CrcBalancesAugmentation(),
    new ContactsAugmentation(),
    new MembersAugmentation(),
    new MembershipsAugmentation(),
    new Erc20BalancesAugmentation(),
  ];

  add(profileAggregate: ProfileAggregate) {
    // Extract all eth addresses from the event
    const addresses = this._extractors
      .filter((e) => e.matches(profileAggregate))
      .flatMap((e) => e.extractAddresses(profileAggregate.payload).filter((a) => typeof a == "string" && a !== ""));

    addresses.push(profileAggregate.safe_address);

    // Add new addresses as key of the _profiles-map
    addresses.filter((a) => !this._profiles[a]).forEach((a) => (this._profiles[a] = null));

    this._aggregates.push(profileAggregate);
  }

  async augment(): Promise<ProfileAggregate[]> {
    // Find the profiles for the collected addresses
    this._profiles = await new ProfileLoader().profilesBySafeAddress(
      Environment.readonlyApiDb,
      Object.keys(this._profiles)
    );

    // Apply the profiles
    this._aggregates.forEach((ev) => {
      this._extractors.filter((ex) => ex.matches(ev)).forEach((ex) => ex.augmentPayload(ev.payload, this._profiles));
    });

    return this._aggregates;
  }
}

export type TokenInfoByAddress = {
  [safeAddress: string]: {
    symbol: string;
    name: string;
    deployedInBlockHash: string;
    deployedInBlockNo: string;
    deployedAt: string;
  } | null;
};

export interface AggregateAugmentation<TAggregatePayload extends IAggregatePayload> {
  matches(profileAggregate: ProfileAggregate): boolean;
  extractAddresses(payload: TAggregatePayload): string[];
  extractTokenAddresses?(payload: TAggregatePayload): string[];
  augmentPayload(payload: TAggregatePayload, profiles: ProfilesBySafeAddressLookup, tokens?: TokenInfoByAddress): void;
}

export class Erc20BalancesAugmentation implements AggregateAugmentation<Erc20Balances> {
  matches(profileAggregate: ProfileAggregate) {
    return profileAggregate.type == AggregateType.Erc20Balances;
  }

  augmentPayload(payload: Erc20Balances, profiles: ProfilesBySafeAddressLookup, tokens?: TokenInfoByAddress): void {}

  extractTokenAddresses(payload: Erc20Balances): string[] {
    return payload.balances.map((o) => o.token_address);
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
    payload.balances.forEach((b) => (b.token_owner_profile = profiles[b.token_owner_address]));
  }

  extractAddresses(payload: CrcBalances): string[] {
    return payload.balances.map((o) => o.token_owner_address);
  }
}

export class ContactsAugmentation implements AggregateAugmentation<Contacts> {
  matches(profileAggregate: ProfileAggregate) {
    return profileAggregate.type == AggregateType.Contacts;
  }

  augmentPayload(payload: Contacts, profiles: ProfilesBySafeAddressLookup): void {
    payload.contacts.forEach((c) => (c.contactAddress_Profile = profiles[c.contactAddress]));
  }

  extractAddresses(payload: Contacts): string[] {
    return payload.contacts.map((o) => o.contactAddress);
  }
}

export class MembersAugmentation implements AggregateAugmentation<Members> {
  matches(profileAggregate: ProfileAggregate) {
    return profileAggregate.type == AggregateType.Members;
  }

  augmentPayload(payload: Members, profiles: ProfilesBySafeAddressLookup): void {
    // TODO: Fix Orga/Profile union type handling
    payload.members = <any>payload.members.map((o) => {
      return {
        ...o,
        ...profiles[o.circlesAddress ?? -1],
      };
    });
  }

  extractAddresses(payload: Members): string[] {
    return <string[]>payload.members.map((o) => o.circlesAddress).filter((o) => !!o);
  }
}

export class MembershipsAugmentation implements AggregateAugmentation<Memberships> {
  matches(profileAggregate: ProfileAggregate) {
    return profileAggregate.type == AggregateType.Memberships;
  }

  augmentPayload(payload: Memberships, profiles: ProfilesBySafeAddressLookup): void {
    payload.organisations = <any>payload.organisations.map((o) => {
      return {
        ...o,
        ...profiles[o.circlesAddress ?? -1],
        ...{
          name: profiles[o.circlesAddress ?? -1]?.firstName,
          description: profiles[o.circlesAddress ?? -1]?.dream,
          isShopDisabled: profiles[o.circlesAddress ?? -1]?.isShopDisabled,
        },
      };
    });
  }

  extractAddresses(payload: Memberships): string[] {
    return <string[]>payload.organisations.map((o) => o.circlesAddress).filter((o) => !!o);
  }
}
