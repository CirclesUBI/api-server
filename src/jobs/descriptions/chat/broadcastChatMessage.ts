import {JobDescription} from "../jobDescription";
import {Generate} from "../../../utils/generate";

export class BroadcastChatMessage extends JobDescription {
  readonly to: string;

  constructor(to:string) {
    super(
      "broadcast",
      "broadcastChatMessage",
      Generate.randomHexString(8));

    this.to = to.toLowerCase();
  }

  public static parse(payload:string) : BroadcastChatMessage {
    const obj = JSON.parse(payload);
    return new BroadcastChatMessage(obj.to);
  }
}