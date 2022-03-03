import {JobDescription, JobType} from "../jobDescription";

export class VerifyEmailAddress extends JobDescription {
  getPayload(): string {
    return JSON.stringify({
      ...this,
      timestamp: this.timestamp.toJSON()
    });
  }

  readonly timestamp: Date;
  readonly profileId:number;
  readonly lifetimeInMs:number;
  readonly emailAddress:string;

  constructor(timestamp: Date, lifetimeInMs: number, triggerCode: string, profileId:number, emailAddress:string) {
    super("atMostOnceTrigger", "verifyEmailAddress", triggerCode, new Date(timestamp.getTime() + lifetimeInMs));
    this.timestamp = timestamp;
    this.profileId = profileId;
    this.lifetimeInMs = lifetimeInMs;
    this.emailAddress = emailAddress;
  }

  static parse(payload: string) {
    const obj = JSON.parse(payload);
    return new VerifyEmailAddress(new Date(obj.timestamp), obj.lifetime, obj.triggerCode, obj.profileId, obj.emailAddress);
  }
}