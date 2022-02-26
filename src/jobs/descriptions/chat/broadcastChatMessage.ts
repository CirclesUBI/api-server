import {JobDescription, JobType} from "../jobDescription";

export class BroadcastChatMessage implements JobDescription {
  readonly topic: JobType = "broadcastChatMessage";
  readonly to: string;

  constructor(to:string) {
    this.to = to.toLowerCase();
  }

  payload(): string {
    return JSON.stringify({
      to: this.to
    });
  }

  public static parse(payload:string) : BroadcastChatMessage {
    const obj = JSON.parse(payload);
    return new BroadcastChatMessage(obj.to);
  }
}