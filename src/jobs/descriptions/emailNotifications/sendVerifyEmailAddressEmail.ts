import {JobDescription, JobType} from "../jobDescription";

export class SendVerifyEmailAddressEmail extends JobDescription {
  getPayload(): string {
    return JSON.stringify(this);
  }

  readonly triggerCode: string;
  readonly emailAddress:string;
  readonly topic:JobType = "sendVerifyEmailAddressEmail";

  constructor(triggerCode: string, emailAddress:string) {
    super("atMostOnceJob", "sendVerifyEmailAddressEmail", triggerCode);
    this.triggerCode = triggerCode;
    this.emailAddress = emailAddress;
  }

  static parse(payload: string) {
    const obj = JSON.parse(payload);
    return new SendVerifyEmailAddressEmail(obj.triggerCode, obj.emailAddress);
  }
}