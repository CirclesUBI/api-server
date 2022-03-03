import {JobDescription} from "../jobDescription";

export class SendCrcReceivedEmail extends JobDescription {
  getPayload(): string {
    return JSON.stringify({
      ...this,
      timestamp: this.timestamp.toJSON()
    });
  }

  readonly timestamp: Date;
  readonly hash: string;
  readonly from: string;
  readonly to: string;
  readonly amount: string;

  constructor(timestamp: Date, hash: string, from: string, to: string, amount: string) {
    super("atMostOnceJob", "sendCrcReceivedEmail", hash);
    this.timestamp = timestamp;
    this.hash  = hash;
    this.from  = from;
    this.to  = to;
    this.amount = amount;
  }

  static parse(payload: string) {
    const obj = JSON.parse(payload);
    return new SendCrcReceivedEmail(new Date(obj.timestamp), obj.hash, obj.from, obj.to, obj.amount);
  }
}