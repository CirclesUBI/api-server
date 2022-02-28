import {JobDescription, JobType} from "../jobDescription";
import {ProfileEvent} from "../../../types";

export class SendCrcReceivedEmail implements JobDescription {
  readonly topic: JobType = "sendCrcReceivedEmail";

  payload(): string {
    return JSON.stringify(this.hubTransferEvent);
  }

  readonly hubTransferEvent: ProfileEvent;

  constructor(hubTransfer:ProfileEvent) {
    this.hubTransferEvent = hubTransfer;
  }

  static parse(payload: string) {
    const obj = JSON.parse(payload);
    return new SendCrcReceivedEmail(obj.to);
  }
}