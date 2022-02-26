import {JobDescription, JobType} from "../jobDescription";

export class SendCrcTrustChangedEmail implements JobDescription {
  readonly topic: JobType = "sendCrcTrustChangedEmail";

  payload(): string {
    return this._payload;
  }
  private readonly _payload: string;

  constructor(payload:string) {
    this._payload = payload;
  }

  static parse(payload: string) {
    const obj = JSON.parse(payload);
    return new SendCrcTrustChangedEmail(obj.to);
  }
}