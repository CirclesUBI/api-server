import {JobWorker, JobWorkerConfiguration} from "../jobWorker";
import {Environment} from "../../../environment";
import {VerifyEmailAddress} from "../../descriptions/emailNotifications/verifyEmailAddress";

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
      return {
        data: {
          statusCode: 404,
          message: `Your code is invalid.`
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

    const redirectUrl = Environment.appUrl + "#/home";

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