import {JobDescription, JobType} from "../jobDescription";
import {Generate} from "../../../generate";

export class BroadcastChatMessage implements JobDescription {
  readonly _topic: JobType = "broadcastChatMessage";
  readonly to: string;
  readonly _kind = "broadcast";
  readonly _identity: string;

  constructor(to:string) {
    this.to = to.toLowerCase();
    this._identity = this._topic + Generate.randomHexString(8);
  }

  getPayload(): string {
    return JSON.stringify({
      to: this.to
    });
  }

  public static parse(payload:string) : BroadcastChatMessage {
    const obj = JSON.parse(payload);
    return new BroadcastChatMessage(obj.to);
  }
}