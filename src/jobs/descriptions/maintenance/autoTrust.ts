import {JobDescription} from "../jobDescription";

export class AutoTrust extends JobDescription {
  getPayload(): string {
    return JSON.stringify(this);
  }

  readonly inviterAddress: string;
  readonly newUserAddress: string;

  constructor(inviterAddress: string, newUserAddress: string) {
    const identity = `${inviterAddress}${newUserAddress}`;
    super("atMostOnceJob", "autoTrust", identity);
    this.inviterAddress = inviterAddress;
    this.newUserAddress = newUserAddress;
  }

  static parse(payload: string) {
    const obj:AutoTrust = JSON.parse(payload);
    return new AutoTrust(obj.inviterAddress, obj.newUserAddress);
  }
}