import {JobDescription, JobType} from "../jobDescription";
import {ProfileEvent} from "../../../types";

export class SendCrcTrustChangedEmail implements JobDescription {
  readonly topic: JobType = "sendCrcTrustChangedEmail";

  payload(): string {
    return JSON.stringify(this.trustChangedEvent);
  }

  readonly trustChangedEvent: ProfileEvent;

  constructor(hubTransfer:ProfileEvent) {
    this.trustChangedEvent = hubTransfer;
  }

  static parse(payload: string) {
    const obj = JSON.parse(payload);
    return new SendCrcTrustChangedEmail(obj.to);
  }
}