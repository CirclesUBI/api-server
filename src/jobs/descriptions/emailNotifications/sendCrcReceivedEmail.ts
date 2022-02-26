import {JobDescription, JobType} from "../jobDescription";

export class SendCrcReceivedEmail implements JobDescription {
  readonly topic: JobType = "sendCrcReceivedEmail";

  payload(): string {
    return this._payload;
  }
  private readonly _payload: string;

  constructor(payload:string) {
    this._payload = payload;
  }

  static parse(payload: string) {
    const obj = JSON.parse(payload);
    return new SendCrcReceivedEmail(obj.to);
  }
}