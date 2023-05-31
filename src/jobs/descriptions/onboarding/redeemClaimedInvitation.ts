import {JobDescription} from "../jobDescription";

export class RedeemClaimedInvitation extends JobDescription {
  getPayload(): string {
    return JSON.stringify(this);
  }

  readonly id:string;
  readonly claimedInvitationId:number;

  constructor(id:string, claimedInvitationId:number) {
    super("atMostOnceJob", "redeemClaimedInvitation", id);
    this.id = id;
    this.claimedInvitationId = claimedInvitationId;
  }

  static parse(payload: string) {
    const obj:RedeemClaimedInvitation = JSON.parse(payload);
    return new RedeemClaimedInvitation(obj.id, obj.claimedInvitationId);
  }
}
