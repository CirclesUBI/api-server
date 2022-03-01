import {JobDescription, JobType} from "../jobDescription";

export class SendCrcReceivedEmail implements JobDescription {
  readonly _topic: JobType = "sendCrcReceivedEmail";
  readonly _kind = "atMostOnce";
  readonly _identity: string;

  getPayload(): string {
    return JSON.stringify(this);
  }

  readonly hash: string;
  readonly from: string;
  readonly to: string;
  readonly amount: string;

  constructor(hash: string, from: string, to: string, amount: string) {
    this.hash  = hash;
    this.from  = from;
    this.to  = to;
    this.amount = amount;
    this._identity = this._topic + this.hash;
  }

  static parse(payload: string) {
    const obj = JSON.parse(payload);
    return new SendCrcReceivedEmail(obj.hash, obj.from, obj.to, obj.amount);
  }
}