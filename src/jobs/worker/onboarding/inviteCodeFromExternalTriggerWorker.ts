import { InviteCodeFromExternalTrigger } from "../../descriptions/onboarding/inviteCodeFromExternalTrigger";
import { JobWorker, JobWorkerConfiguration } from "../jobWorker";
import { createInvitations } from "../../../utils/invitationHelper";
import { Environment } from "../../../environment";

export class InviteCodeFromExternalTriggerWorker extends JobWorker<InviteCodeFromExternalTrigger> {
  name(): string {
    return "InviteCodeFromExternalTriggerWorker";
  }

  constructor(configuration?: JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: InviteCodeFromExternalTrigger) {
    const verifiedSafe = await Environment.readWriteApiDb.verifiedSafe.findUnique({
      where: { safeAddress: job.inviterSafeAddress },
    });

    if (!verifiedSafe) {
      throw new Error(`The inviter safe address (${job.inviterSafeAddress}) doesn't belong to a verified safe.`);
    }

    const createdInvitations = await createInvitations(verifiedSafe.safeAddress, 1);
    const createdInvitation = createdInvitations[0];

    return {
      data: {
        statusCode: 302,
        message: `Go to: ${job.redirectUrl}`,
        headers: {
          "Set-Cookie": `invitationCode=${createdInvitation.code}; Domain=${
            Environment.externalDomains[0]
          }; Path=/; SameSite=${Environment.cookieSameSitePolicy}; Max-Age=${60 * 24}; ${
            Environment.cookieSecurePolicy ? "Secure" : ""
          }`.trim(),
          location: job.redirectUrl,
        },
      },
    };
  }
}
