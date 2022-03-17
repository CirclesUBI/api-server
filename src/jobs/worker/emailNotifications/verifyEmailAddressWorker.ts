import {JobWorker, JobWorkerConfiguration} from "../jobWorker";
import {Environment} from "../../../environment";
import {VerifyEmailAddress} from "../../descriptions/emailNotifications/verifyEmailAddress";
import {JobQueue} from "../../jobQueue";
import {SendWelcomeEmail} from "../../descriptions/emailNotifications/sendWelcomeEmail";

export class VerifyEmailAddressWorker extends JobWorker<VerifyEmailAddress> {
  name(): string {
    return "VerifyEmailAddressWorker";
  }

  constructor(configuration?:JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: VerifyEmailAddress) {
    const currentProfile = await Environment.readWriteApiDb.profile.findUnique({where:{id: job.profileId}});

    if (job.emailAddress != currentProfile?.emailAddress) {
      const redirectUrl = Environment.appUrl + "#/passport/verifyEmail/verify/failed";
      return {
        data: {
          statusCode: 302,
          message: `Go to: ${redirectUrl}`,
          headers: {
            location: redirectUrl
          }
        }
      };
    }

    const updatedProfile = await Environment.readWriteApiDb.profile.update({
      where: {id: job.profileId},
      data: {
        emailAddressVerified: true
      }
    });

    if (!updatedProfile) {
      throw new Error(`Couldn't find a profile with id '${job.profileId}' to set it's 'emailAddressVerified' field.`);
    }

    const redirectUrl = Environment.appUrl + "#/passport/verifyEmail/verify/success";

    await JobQueue.produce([new SendWelcomeEmail(currentProfile?.emailAddress)]);

    return {
      data: {
        statusCode: 302,
        message: `Go to: ${redirectUrl}`,
        headers: {
          location: redirectUrl
        }
      }
    };
  }
}