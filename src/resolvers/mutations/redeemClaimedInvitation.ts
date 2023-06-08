import {Context} from "../../context";
import {RedeemClaimedInvitationResult} from "../../types";
import {JobQueue} from "../../jobs/jobQueue";
import {RedeemClaimedInvitation} from "../../jobs/descriptions/onboarding/redeemClaimedInvitation";
import {Environment} from "../../environment";

export function redeemClaimedInvitation() {
  return async (parent: any, args: any, context: Context) => {
    if (!context?.session?.profileId) {
      throw new Error(`You need a profile and EOA to redeem a claimed invitation.`);
    }

    const claimedInvitation = await Environment.readonlyApiDb.invitation.findFirst({
        where: {
          claimedByProfileId: context.session.profileId,
          redeemedAt: null
        }
    });

    if (!claimedInvitation) {
      throw new Error(`You don't have a claimed invitation.`);
    }

    const jobs = await JobQueue.produce([new RedeemClaimedInvitation(claimedInvitation.id)]);

    try {
      return <RedeemClaimedInvitationResult> {
        success: true,
        jobHash: jobs[0].hash
      }
    } catch (e) {
      console.error(e);
      return <RedeemClaimedInvitationResult>{
        success: false,
        error: `Couldn't redeem the invitation.`
      }
    }
  }
}
