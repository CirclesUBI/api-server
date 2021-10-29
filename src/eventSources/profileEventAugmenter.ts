import {
  ChatMessage,
  CrcHubTransfer,
  CrcMinting,
  CrcSignup,
  CrcTokenTransfer,
  CrcTrust,
  EthTransfer, GnosisSafeEthTransfer,
  IEventPayload,
  MembershipAccepted,
  MembershipOffer,
  MembershipRejected,
  ProfileEvent,
  WelcomeMessage
} from "../types";
import {ProfilesBySafeAddressLookup} from "../resolvers/queries/profiles";
import {ProfileLoader} from "../profileLoader";
import {prisma_api_ro} from "../apiDbClient";

export class ProfileEventAugmenter
{
  private _profiles: ProfilesBySafeAddressLookup = {};
  private _events: ProfileEvent[] = [];
  private _extractors: ProfileEventAugmentation<any>[] = [
    new CrcSignupAugmentation(),
    new CrcTrustAugmentation(),
    new CrcTokenTransferAugmentation(),
    new CrcHubTransferAugmentation(),
    new CrcMintingAugmentation(),
    new EthTransferAugmentation(),
    new GnosisSafeEthTransferAugmentation(),
    new ChatMessageAugmentation(),
    new MembershipOfferAugmentation(),
    new MembershipAcceptedAugmentation(),
    new MembershipRejectedAugmentation(),
    new WelcomeMessageAugmentation()
  ];

  add(profileEvent: ProfileEvent) {
    // Extract all eth addresses from the event
    const addresses = this._extractors
      .filter(e => e.matches(profileEvent))
      .flatMap(e => e.extractAddresses(profileEvent.payload)
                             .filter(a => typeof a == "string" && a !== ""));

    addresses.push(profileEvent.safe_address);

    // Add new addresses as key of the _profiles-map
    addresses
      .filter(a => !this._profiles[a])
      .forEach(a => this._profiles[a] = null);

    this._events.push(profileEvent);
  }

  async augment() : Promise<ProfileEvent[]> {
    // Find the profiles for the collected addresses
    this._profiles = await new ProfileLoader()
      .profilesBySafeAddress(prisma_api_ro, Object.keys(this._profiles))

    // Apply the profiles
    this._events.forEach(ev => {
      this._extractors
        .filter(ex => ex.matches(ev))
        .forEach(ex => ex.augmentProfiles(ev.payload, this._profiles))
    });

    return this._events;
  }
}

export interface ProfileEventAugmentation<TEventPayload extends IEventPayload> {
  matches(profileEvent:ProfileEvent) : boolean;
  extractAddresses(payload: TEventPayload): string[];
  augmentProfiles(payload: TEventPayload, profiles: ProfilesBySafeAddressLookup) : void;
}

export class CrcSignupAugmentation implements ProfileEventAugmentation<CrcSignup> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === "CrcSignup";
  }
  extractAddresses(payload: CrcSignup): string[] {
    return [payload.user];
  }
  augmentProfiles(payload: CrcSignup, profiles: ProfilesBySafeAddressLookup): void {
    payload.user_profile = profiles[payload.user];
  }
}

export class CrcTrustAugmentation implements ProfileEventAugmentation<CrcTrust> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === "CrcTrust";
  }
  extractAddresses(payload: CrcTrust): string[] {
    return [payload.address, payload.can_send_to];
  }
  augmentProfiles(payload: CrcTrust, profiles: ProfilesBySafeAddressLookup): void {
    payload.address_profile = profiles[payload.address];
    payload.can_send_to_profile = profiles[payload.can_send_to];
  }
}

export class CrcTokenTransferAugmentation implements ProfileEventAugmentation<CrcTokenTransfer> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === "CrcTokenTransfer";
  }
  extractAddresses(payload: CrcTokenTransfer): string[] {
    return [payload.from, payload.to];
  }
  augmentProfiles(payload: CrcTokenTransfer, profiles: ProfilesBySafeAddressLookup): void {
    payload.from_profile = profiles[payload.from];
    payload.to_profile = profiles[payload.to];
  }
}

export class CrcHubTransferAugmentation implements ProfileEventAugmentation<CrcHubTransfer> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === "CrcHubTransfer";
  }
  extractAddresses(payload: CrcHubTransfer): string[] {
    const transferAddresses = payload.transfers.reduce((p,c) => {
        p.push(c.from);
        p.push(c.to);
        return p;
      }, <string[]>[]);

    return [payload.from, payload.to].concat(transferAddresses);
  }
  augmentProfiles(payload: CrcHubTransfer, profiles: ProfilesBySafeAddressLookup): void {
    payload.to_profile = profiles[payload.to];
    payload.from_profile = profiles[payload.from];
    payload.transfers.forEach(t => {
      t.from_profile = profiles[t.from];
      t.to_profile = profiles[t.to];
    })
  }
}

export class CrcMintingAugmentation implements ProfileEventAugmentation<CrcMinting> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === "CrcMinting";
  }
  extractAddresses(payload: CrcMinting): string[] {
    return [payload.from, payload.to];
  }
  augmentProfiles(payload: CrcMinting, profiles: ProfilesBySafeAddressLookup): void {
    payload.from_profile = profiles[payload.from];
    payload.to_profile = profiles[payload.to];
  }
}

export class EthTransferAugmentation implements ProfileEventAugmentation<EthTransfer> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === "EthTransfer";
  }
  extractAddresses(payload: EthTransfer): string[] {
    return [payload.from, payload.to];
  }
  augmentProfiles(payload: EthTransfer, profiles: ProfilesBySafeAddressLookup): void {
    payload.from_profile = profiles[payload.from];
    payload.to_profile = profiles[payload.to];
  }
}

export class GnosisSafeEthTransferAugmentation implements ProfileEventAugmentation<GnosisSafeEthTransfer> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === "GnosisSafeEthTransfer";
  }
  extractAddresses(payload: GnosisSafeEthTransfer): string[] {
    return [payload.from, payload.to];
  }
  augmentProfiles(payload: GnosisSafeEthTransfer, profiles: ProfilesBySafeAddressLookup): void {
    payload.from_profile = profiles[payload.from];
    payload.to_profile = profiles[payload.to];
  }
}

export class MembershipOfferAugmentation implements ProfileEventAugmentation<MembershipOffer> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === "MembershipOffer";
  }
  extractAddresses(payload: MembershipOffer): string[] {
    return [payload.createdBy, payload.organisation];
  }
  augmentProfiles(payload: MembershipOffer, profiles: ProfilesBySafeAddressLookup): void {
    payload.createdBy_profile = profiles[payload.createdBy];
    // TODO: payload.organisation_profile = profiles[payload.organisation];
  }
}

export class MembershipAcceptedAugmentation implements ProfileEventAugmentation<MembershipAccepted> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === "MembershipAccepted";
  }
  extractAddresses(payload: MembershipAccepted): string[] {
    return [payload.member, payload.organisation];
  }
  augmentProfiles(payload: MembershipAccepted, profiles: ProfilesBySafeAddressLookup): void {
    payload.member_profile = profiles[payload.member];
    // TODO: payload.organisation_profile = profiles[payload.organisation];
  }
}

export class MembershipRejectedAugmentation implements ProfileEventAugmentation<MembershipRejected> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === "MembershipRejected";
  }
  extractAddresses(payload: MembershipRejected): string[] {
    return [payload.member, payload.organisation];
  }
  augmentProfiles(payload: MembershipRejected, profiles: ProfilesBySafeAddressLookup): void {
    payload.member_profile = profiles[payload.member];
    // TODO: payload.organisation_profile = profiles[payload.organisation];
  }
}

export class ChatMessageAugmentation implements ProfileEventAugmentation<ChatMessage> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === "ChatMessage";
  }
  extractAddresses(payload: ChatMessage): string[] {
    return [payload.from, payload.to];
  }
  augmentProfiles(payload: ChatMessage, profiles: ProfilesBySafeAddressLookup): void {
    payload.from_profile = profiles[payload.from];
    payload.to_profile = profiles[payload.to];
  }
}

export class WelcomeMessageAugmentation implements ProfileEventAugmentation<WelcomeMessage> {
  matches(profileEvent: ProfileEvent): boolean {
    return profileEvent.payload?.__typename === "WelcomeMessage";
  }
  extractAddresses(payload: WelcomeMessage): string[] {
    return [payload.member];
  }
  augmentProfiles(payload: WelcomeMessage, profiles: ProfilesBySafeAddressLookup): void {
    payload.member_profile = profiles[payload.member];
    // TODO: payload.organisation_profile = profiles[payload.organisation];
  }
}