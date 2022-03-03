import {JobDescription, JobType} from "../jobDescription";

export class SendCrcReceivedEmail implements JobDescription {
  readonly _topic: JobType = "sendCrcReceivedEmail";
  readonly _kind = "atMostOnceJob";
  readonly _identity: string;
  readonly _timeoutAt: undefined;

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
    this.timestamp = timestamp;
    this.hash  = hash;
    this.from  = from;
    this.to  = to;
    this.amount = amount;
    this._identity = this._topic + this.hash;
  }

  static parse(payload: string) {
    const obj = JSON.parse(payload);
    return new SendCrcReceivedEmail(new Date(obj.timestamp), obj.hash, obj.from, obj.to, obj.amount);
  }
}