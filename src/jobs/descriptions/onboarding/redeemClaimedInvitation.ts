import {JobDescription} from "../jobDescription";

export class RedeemClaimedInvitation extends JobDescription {
  getPayload(): string {
    return JSON.stringify(this);
  }

  readonly claimedInvitationId:number;

  constructor(claimedInvitationId:number) {
    // TODO: Using the claimedInvitationId as the identity is not ideal, because failed redemptions cannot be retried.
    //       Users won't be able to get a new invitation either because they already claimed one.
    //       Most likely retry up to 3 times and then just un-claim the invitation is a way to go.
    const identity = claimedInvitationId.toString();
    super("atMostOnceJob", "redeemClaimedInvitation", identity);
    this.claimedInvitationId = claimedInvitationId;
  }

  static parse(payload: string) {
    const obj:RedeemClaimedInvitation = JSON.parse(payload);
    return new RedeemClaimedInvitation(obj.claimedInvitationId);
  }
}
