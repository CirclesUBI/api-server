import { JobWorker, JobWorkerConfiguration } from "../jobWorker";
import { SendCrcTrustChangedEmail } from "../../descriptions/emailNotifications/sendCrcTrustChangedEmail";
import { Mailer } from "../../../mailer/mailer";
import { ProfileLoader } from "../../../querySources/profileLoader";
import { Environment } from "../../../environment";
import { crcTrustChangedEmailTemplate } from "./templates/crcTrustChangedEmailTemplate";

export class SendCrcTrustChangedEmailWorker extends JobWorker<SendCrcTrustChangedEmail> {
  name(): string {
    return "SendCrcTrustChangedEmailWorker";
  }

  constructor(configuration?: JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: SendCrcTrustChangedEmail) {
    // TODO: Use a different template when an organization trusts you
    if (job.limit == 0) {
      return {
        info: `Doesn't send a notification for removed trust at the moment.`,
      };
    }

    const profiles = await new ProfileLoader().profilesBySafeAddress(
      Environment.readonlyApiDb,
      [job.user, job.canSendTo]
    );

    const user = profiles[job.user];
    const canSendTo = profiles[job.canSendTo];

    if (!user?.emailAddress || !user?.emailAddressVerified) {
      return {
        info: `Couldn't send a notification email to profile ${
          profiles[job.user]?.id
        } because it has no verified email address.`,
      };
    }
    if (!canSendTo?.circlesAddress) {
      return {
        warning: `Couldn't send a notification email for transaction ${job.hash} because no 'canSendTo' profile could be loaded.`,
      };
    }

    await Mailer.send(
      crcTrustChangedEmailTemplate,
      {
        user: `${user.firstName}`,
        canSendTo: `${ProfileLoader.displayName(canSendTo)}`,
        canSendToProfileUrl: `${Environment.appUrl}#/contacts/profile/${canSendTo.circlesAddress}`,
      },
      user.emailAddress
    );

    return undefined;
  }
}
