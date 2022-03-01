import {JobDescription, JobType} from "../jobDescription";

export class SendCrcReceivedEmail implements JobDescription {
  readonly topic: JobType = "sendCrcReceivedEmail";

  payload(): string {
    return JSON.stringify(this);
  }

  readonly hash: string;
  readonly from: string;
  readonly to: string;

  constructor(hash: string, from: string, to: string) {
    this.hash  = hash;
    this.from  = from;
    this.to  = to;
  }

  static parse(payload: string) {
    const obj = JSON.parse(payload);
    return new SendCrcReceivedEmail(obj.hash, obj.from, obj.to);
  }
}