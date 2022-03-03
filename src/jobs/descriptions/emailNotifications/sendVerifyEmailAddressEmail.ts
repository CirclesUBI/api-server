import {JobDescription, JobType} from "../jobDescription";

export class SendVerifyEmailAddressEmail implements JobDescription {
  readonly _topic: JobType = "sendVerifyEmailAddressEmail";
  readonly _kind = "atMostOnceJob";
  readonly _identity: string;
  readonly _timeoutAt: undefined;

  getPayload(): string {
    return JSON.stringify(this);
  }

  readonly triggerCode: string;
  readonly emailAddress:string;
  readonly topic:JobType = "sendVerifyEmailAddressEmail";

  constructor(triggerCode: string, emailAddress:string) {
    this.triggerCode = triggerCode;
    this.emailAddress = emailAddress;
    this._identity = this.topic + triggerCode;
  }

  static parse(payload: string) {
    const obj = JSON.parse(payload);
    return new SendVerifyEmailAddressEmail(obj.triggerCode, obj.emailAddress);
  }
}