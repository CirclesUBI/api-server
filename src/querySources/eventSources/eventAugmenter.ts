import {
  CrcHubTransfer,
  CrcMinting,
  Erc20Transfer,
  CrcSignup,
  CrcTokenTransfer,
  CrcTrust,
  EthTransfer, EventType, GnosisSafeEthTransfer,
  IEventPayload, InvitationRedeemed,
  MembershipAccepted,
  MembershipOffer,
  MembershipRejected, ProfileEvent, WelcomeMessage
} from "../../types";
import {ProfilesBySafeAddressLookup} from "../../resolvers/queries/profiles";
import {ProfileLoader, SafeProfileMap} from "../profileLoader";
import {TagLoader, TagsByTxHashLookup} from "../tagLoader";
import {Environment} from "../../environment";

export class EventAugmenter
{
  private _profiles: ProfilesBySafeAddressLookup = {};
  private _tags: TagsByTxHashLookup = {};

  private _events: ProfileEvent[] = [];
  private _extractors: ProfileEventAugmentation<any>[] = [
    new CrcSignupAugmentation(),
    new CrcTrustAugmentation(),
    new CrcTokenTransferAugmentation(),
    new CrcHubTransferAugmentation(),
    new CrcMintingAugmentation(),
    new EthTransferAugmentation(),
    new GnosisSafeEthTransferAugmentation(),
    new MembershipOfferAugmentation(),
    new MembershipAcceptedAugmentation(),
    new MembershipRejectedAugmentation(),
    new WelcomeMessageAugmentation(),
    new InvitationRedeemedAugmentation(),
    new Erc20TransferAugmentation()
  ];

  add(profileEvent: ProfileEvent) {
    // Extract all eth addresses from the event
    const addresses = this._extractors
      .filter(e => e.matches(profileEvent))
      .flatMap(e => e.extractAddresses(profileEvent.payload)
                             .filter(a => typeof a == "string" && a !== ""));

    addresses.push(profileEvent.safe_address);
    if (profileEvent.contact_address) {
      addresses.push(profileEvent.contact_address);
    }

    // Add new addresses as key of the _profiles-map
    addresses
      .filter(a => !this._profiles[a])
      .forEach(a => this._profiles[a] = null);

    const hashes = this._extractors
      .filter(e => e.matches(profileEvent))
      .flatMap(e => e.extractTransactionHashes ? e.extractTransactionHashes(profileEvent.payload) : []);

    hashes.forEach(e => this._tags[e] = null);

    this._events.push(profileEvent);
  }

  async augment() : Promise<ProfileEvent[]> {
    // Find the profiles for the collected addresses

    const requests: Promise<any>[] = [
      new ProfileLoader().profilesBySafeAddress(Environment.readonlyApiDb, Object.keys(this._profiles)),
      new TagLoader().tagsByTransactionHash(Environment.readonlyApiDb, Object.keys(this._tags))
    ]

    const results = await Promise.all(requests);

    this._profiles = <SafeProfileMap>results[0];
    this._tags = <TagsByTxHashLookup>results[1];

    // Apply the profiles
    this._events.forEach(ev => {
      this._extractors
        .filter(ex => ex.matches(ev))
        .forEach(ex => {
          if (ev.contact_address) {
            ev.contact_address_profile = this._profiles[ev.contact_address]
          }
          ev.safe_address_profile = this._profiles[ev.safe_address];

          ex.augment(ev.payload, this._profiles, this._tags)
        })
    });

    return this._events;
  }
}


export interface ProfileEventAugmentation<TEventPayload extends IEventPayload> {
  matches(profileEvent:ProfileEvent) : boolean;
  extractAddresses(payload: TEventPayload): string[];
  extractTransactionHashes?(payload: TEventPayload): string[];
  augment(payload: TEventPayload, profiles: ProfilesBySafeAddressLookup, tags: TagsByTxHashLookup) : void;
}

export class CrcSignupAugmentation implements ProfileEventAugmentation<CrcSignup> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === EventType.CrcSignup;
  }
  extractAddresses(payload: CrcSignup): string[] {
    return [payload.user];
  }
  extractTransactionHashes(payload: CrcSignup) {
    return [payload.transaction_hash];
  }
  augment(payload: CrcSignup, profiles: ProfilesBySafeAddressLookup): void {
    payload.user_profile = profiles[payload.user];
  }
}

export class CrcTrustAugmentation implements ProfileEventAugmentation<CrcTrust> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === EventType.CrcTrust;
  }
  extractAddresses(payload: CrcTrust): string[] {
    return [payload.address, payload.can_send_to];
  }
  extractTransactionHashes(payload: CrcTrust) {
    return [payload.transaction_hash];
  }
  augment(payload: CrcTrust, profiles: ProfilesBySafeAddressLookup): void {
    payload.address_profile = profiles[payload.address];
    payload.can_send_to_profile = profiles[payload.can_send_to];
  }
}

export class Erc20TransferAugmentation implements ProfileEventAugmentation<Erc20Transfer> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === EventType.Erc20Transfer;
  }
  extractAddresses(payload: Erc20Transfer): string[] {
    return [payload.from, payload.to];
  }
  extractTransactionHashes(payload: Erc20Transfer) {
    return [payload.transaction_hash];
  }
  augment(payload: Erc20Transfer, profiles: ProfilesBySafeAddressLookup): void {
    payload.from_profile = profiles[payload.from];
    payload.to_profile = profiles[payload.to];
  }
}

export class CrcTokenTransferAugmentation implements ProfileEventAugmentation<CrcTokenTransfer> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === EventType.CrcTokenTransfer;
  }
  extractAddresses(payload: CrcTokenTransfer): string[] {
    return [payload.from, payload.to];
  }
  extractTransactionHashes(payload: CrcTokenTransfer) {
    return [payload.transaction_hash];
  }
  augment(payload: CrcTokenTransfer, profiles: ProfilesBySafeAddressLookup): void {
    payload.from_profile = profiles[payload.from];
    payload.to_profile = profiles[payload.to];
  }
}

export class CrcHubTransferAugmentation implements ProfileEventAugmentation<CrcHubTransfer> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === EventType.CrcHubTransfer;
  }
  extractAddresses(payload: CrcHubTransfer): string[] {
    const transferAddresses = payload.transfers.reduce((p,c) => {
        p.push(c.from);
        p.push(c.to);
        return p;
      }, <string[]>[]);

    return [payload.from, payload.to].concat(transferAddresses);
  }
  extractTransactionHashes(payload: CrcHubTransfer) {
    return [payload.transaction_hash];
  }
  augment(payload: CrcHubTransfer, profiles: ProfilesBySafeAddressLookup, tags: TagsByTxHashLookup): void {
    payload.to_profile = profiles[payload.to];
    payload.from_profile = profiles[payload.from];
    payload.transfers.forEach(t => {
      t.from_profile = profiles[t.from];
      t.to_profile = profiles[t.to];
    });
    payload.tags = tags[payload.transaction_hash] ?? [];
  }
}

export class CrcMintingAugmentation implements ProfileEventAugmentation<CrcMinting> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === EventType.CrcMinting;
  }
  extractAddresses(payload: CrcMinting): string[] {
    return [payload.from, payload.to];
  }
  extractTransactionHashes(payload: CrcMinting) {
    return [payload.transaction_hash];
  }
  augment(payload: CrcMinting, profiles: ProfilesBySafeAddressLookup): void {
    payload.from_profile = profiles[payload.from];
    payload.to_profile = profiles[payload.to];
  }
}

export class EthTransferAugmentation implements ProfileEventAugmentation<EthTransfer> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === EventType.EthTransfer;
  }
  extractAddresses(payload: EthTransfer): string[] {
    return [payload.from, payload.to];
  }
  extractTransactionHashes(payload: EthTransfer) {
    return [payload.transaction_hash];
  }
  augment(payload: EthTransfer, profiles: ProfilesBySafeAddressLookup): void {
    payload.from_profile = profiles[payload.from];
    payload.to_profile = profiles[payload.to];
  }
}

export class GnosisSafeEthTransferAugmentation implements ProfileEventAugmentation<GnosisSafeEthTransfer> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === EventType.GnosisSafeEthTransfer;
  }
  extractAddresses(payload: GnosisSafeEthTransfer): string[] {
    return [payload.from, payload.to];
  }
  extractTransactionHashes(payload: GnosisSafeEthTransfer) {
    return [payload.transaction_hash];
  }
  augment(payload: GnosisSafeEthTransfer, profiles: ProfilesBySafeAddressLookup): void {
    payload.from_profile = profiles[payload.from];
    payload.to_profile = profiles[payload.to];
  }
}

export class MembershipOfferAugmentation implements ProfileEventAugmentation<MembershipOffer> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === EventType.MembershipOffer;
  }
  extractAddresses(payload: MembershipOffer): string[] {
    return [payload.createdBy, payload.organisation];
  }
  augment(payload: MembershipOffer, profiles: ProfilesBySafeAddressLookup): void {
    payload.createdBy_profile = profiles[payload.createdBy];
    const org = profiles[payload.organisation];
    if (org) {
      payload.organisation_profile = <any>{
        __typename: "Organisation",
        ...org,
        name: org.firstName,
        description: org.dream,
        createdAt: new Date().toJSON() // TODO: Find the correct creation date
      };
    }
  }
}

export class MembershipAcceptedAugmentation implements ProfileEventAugmentation<MembershipAccepted> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === EventType.MembershipAccepted;
  }
  extractAddresses(payload: MembershipAccepted): string[] {
    return [payload.member, payload.organisation];
  }
  augment(payload: MembershipAccepted, profiles: ProfilesBySafeAddressLookup): void {
    payload.member_profile = profiles[payload.member];
    const org = profiles[payload.organisation];
    if (org) {
      payload.organisation_profile = <any>{
        __typename: "Organisation",
        ...org,
        name: org.firstName,
        description: org.dream,
        createdAt: new Date().toJSON() // TODO: Find the correct creation date
      };
    }
  }
}

export class MembershipRejectedAugmentation implements ProfileEventAugmentation<MembershipRejected> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === EventType.MembershipRejected;
  }
  extractAddresses(payload: MembershipRejected): string[] {
    return [payload.member, payload.organisation];
  }
  augment(payload: MembershipRejected, profiles: ProfilesBySafeAddressLookup): void {
    payload.member_profile = profiles[payload.member];
    const org = profiles[payload.organisation];
    if (org) {
      payload.organisation_profile = <any>{
        __typename: "Organisation",
        ...org,
        name: org.firstName,
        description: org.dream,
        createdAt: new Date().toJSON() // TODO: Find the correct creation date
      };
    }
  }
}

export class WelcomeMessageAugmentation implements ProfileEventAugmentation<WelcomeMessage> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === EventType.WelcomeMessage;
  }
  extractAddresses(payload: WelcomeMessage): string[] {
    return [payload.invitedBy];
  }
  augment(payload: WelcomeMessage, profiles: ProfilesBySafeAddressLookup): void {
    payload.invitedBy_profile = profiles[payload.invitedBy];
  }
}

export class InvitationRedeemedAugmentation implements ProfileEventAugmentation<InvitationRedeemed> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === EventType.InvitationRedeemed;
  }
  extractAddresses(payload: InvitationRedeemed): string[] {
    return payload.redeemedBy ? [payload.redeemedBy] : [];
  }
  augment(payload: InvitationRedeemed, profiles: ProfilesBySafeAddressLookup): void {
    if (payload.redeemedBy) {
      payload.redeemedBy_profile = profiles[payload.redeemedBy];
    }
  }
}