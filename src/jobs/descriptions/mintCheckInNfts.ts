import {JobDescription} from "./jobDescription";

export class MintCheckInNfts extends JobDescription {
  getPayload(): string {
    return JSON.stringify(this);
  }

  readonly hostAddress: string;
  readonly guestAddress: string;

  constructor(hostAddress: string, guestAddress: string) {
    const identity = `${hostAddress}${guestAddress}`;
    super("atMostOnceJob", "mintCheckInNfts", identity);

    this.hostAddress = hostAddress;
    this.guestAddress = guestAddress;
  }

  static parse(payload: string) {
    const obj = JSON.parse(payload);
    return new MintCheckInNfts(obj.shopOwnerAddress, obj.guestAddress);
  }
}
