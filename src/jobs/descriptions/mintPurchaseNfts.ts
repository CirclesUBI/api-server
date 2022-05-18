import {JobDescription} from "./jobDescription";

export class MintPurchaseNfts extends JobDescription {
  getPayload(): string {
    return JSON.stringify(this);
  }

  readonly purchaseId: number;

  constructor(purchaseId: number) {
    const identity = `${purchaseId}`;
    super("atMostOnceJob", "mintPurchaseNfts", identity);

    this.purchaseId = purchaseId;
  }

  static parse(payload: string) {
    const obj = JSON.parse(payload);
    return new MintPurchaseNfts(obj.purchaseId);
  }
}
