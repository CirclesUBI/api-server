import {JobDescription, JobType} from "../jobDescription";

export class SendCrcTrustChangedEmail implements JobDescription {
  readonly _topic: JobType = "sendCrcTrustChangedEmail";
  readonly _kind = "atMostOnceJob";
  readonly _identity: string;
  readonly _timeoutAt: undefined;

  getPayload(): string {
    return JSON.stringify(this);
  }

  readonly hash:string;
  readonly user:string;
  readonly canSendTo: string;
  readonly limit: number;

  constructor(hash:string, user:string, canSendTo: string, limit: number) {
    this.hash = hash;
    this.user = user;
    this.canSendTo = canSendTo;
    this.limit = limit;
    this._identity = this._topic + this.hash;
  }

  static parse(payload: string) {
    const obj = JSON.parse(payload);
    return new SendCrcTrustChangedEmail(obj.hash, obj.user, obj.canSendTo, obj.limit);
  }
}