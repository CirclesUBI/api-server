import {JobDescription} from "../jobDescription";
import {Generate} from "../../../utils/generate";

export class BroadcastPurchased extends JobDescription {
  readonly from: string;
  readonly to: string;
  readonly purchaseId: number;

  constructor(from:string, to:string, purchaseId: number) {
    super(
      "broadcast",
      "broadcastPurchased",
      Generate.randomHexString(8));

    this.from = from.toLowerCase();
    this.to = to.toLowerCase();
    this.purchaseId = purchaseId;
  }

  public static parse(payload:string) : BroadcastPurchased {
    const obj = JSON.parse(payload);
    return new BroadcastPurchased(obj.from, obj.to, obj.purchaseId);
  }
}
