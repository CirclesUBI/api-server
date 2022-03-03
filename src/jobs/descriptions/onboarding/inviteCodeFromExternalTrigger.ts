import {JobDescription, JobType} from "../jobDescription";

export class InviteCodeFromExternalTrigger implements JobDescription {
  readonly _topic: JobType = "inviteCodeFromExternalTrigger";
  readonly _kind = "perpetualTrigger";
  readonly _identity: string;
  readonly _timeoutAt: undefined;

  getPayload(): string {
    return JSON.stringify(this);
  }

  readonly id:string;
  readonly inviterSafeAddress:string;
  readonly redirectUrl:string;

  constructor(id:string, redirectUrl:string, inviterSafeAddress:string) {
    this.id = id;
    this.redirectUrl = redirectUrl;
    this.inviterSafeAddress = inviterSafeAddress;
    this._identity = this._topic + id;
  }

  static parse(payload: string) {
    const obj:InviteCodeFromExternalTrigger = JSON.parse(payload);
    return new InviteCodeFromExternalTrigger(obj.id, obj.redirectUrl, obj.inviterSafeAddress);
  }
}