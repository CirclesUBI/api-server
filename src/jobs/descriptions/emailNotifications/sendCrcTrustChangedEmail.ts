import {JobDescription} from "../jobDescription";

export class SendCrcTrustChangedEmail extends JobDescription {
  getPayload(): string {
    return JSON.stringify(this);
  }

  readonly hash:string;
  readonly user:string;
  readonly canSendTo: string;
  readonly limit: number;

  constructor(hash:string, user:string, canSendTo: string, limit: number) {
    super("atMostOnceJob", "sendCrcTrustChangedEmail", hash);
    this.hash = hash;
    this.user = user;
    this.canSendTo = canSendTo;
    this.limit = limit;
  }

  static parse(payload: string) {
    const obj = JSON.parse(payload);
    return new SendCrcTrustChangedEmail(obj.hash, obj.user, obj.canSendTo, obj.limit);
  }
}