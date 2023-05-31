import {JobWorker, JobWorkerConfiguration} from "../jobWorker";
import {RedeemClaimedInvitation} from "../../descriptions/onboarding/redeemClaimedInvitation";

export class RedeemClaimedInvitationWorker extends JobWorker<RedeemClaimedInvitation> {
  name(): string {
    return "RedeemClaimedInvitationWorker";
  }

  constructor(configuration?:JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: RedeemClaimedInvitation) {
    return undefined;
  }
}
