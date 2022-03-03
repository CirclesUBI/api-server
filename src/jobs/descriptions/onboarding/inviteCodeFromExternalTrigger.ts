import {JobDescription} from "../jobDescription";

export class InviteCodeFromExternalTrigger extends JobDescription {
  getPayload(): string {
    return JSON.stringify(this);
  }

  readonly id:string;
  readonly inviterSafeAddress:string;
  readonly redirectUrl:string;

  constructor(id:string, redirectUrl:string, inviterSafeAddress:string) {
    super("perpetualTrigger", "inviteCodeFromExternalTrigger", id);
    this.id = id;
    this.redirectUrl = redirectUrl;
    this.inviterSafeAddress = inviterSafeAddress;
  }

  static parse(payload: string) {
    const obj:InviteCodeFromExternalTrigger = JSON.parse(payload);
    return new InviteCodeFromExternalTrigger(obj.id, obj.redirectUrl, obj.inviterSafeAddress);
  }
}