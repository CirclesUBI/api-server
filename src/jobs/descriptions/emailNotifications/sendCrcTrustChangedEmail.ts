import {JobDescription, JobType} from "../jobDescription";

export class SendCrcTrustChangedEmail implements JobDescription {
  readonly topic: JobType = "sendCrcTrustChangedEmail";

  payload(): string {
    return JSON.stringify(this);
  }

  readonly hash:string;
  readonly user:string;
  readonly canSendTo: string;

  constructor(hash:string, user:string, canSendTo: string) {
    this.hash = hash;
    this.user = user;
    this.canSendTo = canSendTo;
  }

  static parse(payload: string) {
    const obj = JSON.parse(payload);
    return new SendCrcTrustChangedEmail(obj.hash, obj.user, obj.canSendTo);
  }
}