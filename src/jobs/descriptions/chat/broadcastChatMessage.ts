import {JobDescription} from "../jobDescription";
import {Generate} from "../../../utils/generate";

export class BroadcastChatMessage extends JobDescription {
  readonly from: string;
  readonly to: string;
  readonly messageId: number;

  constructor(from:string, to:string, messageId: number) {
    super(
      "broadcast",
      "broadcastChatMessage",
      Generate.randomHexString(8));

    this.from = from.toLowerCase();
    this.to = to.toLowerCase();
    this.messageId = messageId;
  }

  public static parse(payload:string) : BroadcastChatMessage {
    const obj = JSON.parse(payload);
    return new BroadcastChatMessage(obj.from, obj.to, obj.messageId);
  }
}