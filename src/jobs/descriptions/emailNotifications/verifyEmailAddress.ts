import {JobDescription, JobType} from "../jobDescription";

export class VerifyEmailAddress implements JobDescription {
  readonly _topic: JobType = "verifyEmailAddress";
  readonly _kind = "externalTrigger";
  readonly _identity: string;
  readonly _timeoutAt;

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
    this.timestamp = timestamp;
    this.profileId = profileId;
    this.lifetimeInMs = lifetimeInMs;
    this.emailAddress = emailAddress;
    this._identity = this._topic + triggerCode;
    this._timeoutAt = new Date(timestamp.getTime() + lifetimeInMs);
  }

  static parse(payload: string) {
    const obj = JSON.parse(payload);
    return new VerifyEmailAddress(new Date(obj.timestamp), obj.lifetime, obj.triggerCode, obj.profileId, obj.emailAddress);
  }
}