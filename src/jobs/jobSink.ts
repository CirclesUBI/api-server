import { Job } from "./jobQueue";
import { Echo } from "./descriptions/echo";
import { EchoWorker } from "./worker/echoWorker";
import { InviteCodeFromExternalTriggerWorker } from "./worker/onboarding/inviteCodeFromExternalTriggerWorker";
import { InviteCodeFromExternalTrigger } from "./descriptions/onboarding/inviteCodeFromExternalTrigger";

import { RequestUbiForInactiveAccountsWorker } from "./worker/maintenance/requestUbiForInactiveAccountsWorker";
import { RequestUbiForInactiveAccounts } from "./descriptions/maintenance/requestUbiForInactiveAccounts";
import { RotateJwksWorker } from "./worker/maintenance/rotateJwksWorker";
import { RotateJwks } from "./descriptions/maintenance/rotateJwks";
import { UnreadNotificationWorker } from "./worker/unreadNotificationWorker";
import { UnreadNotification } from "./descriptions/unreadNotification";
import {RedeemClaimedInvitationWorker} from "./worker/onboarding/redeemClaimedInvitationWorker";
import {RedeemClaimedInvitation} from "./descriptions/onboarding/redeemClaimedInvitation";

export const jobSink = async (job: Job) => {
  switch (job.topic) {
    case "echo".toLowerCase():
      return await new EchoWorker({
        errorStrategy: "logAndDrop",
      }).run(job.id, Echo.parse(job.payload));
    case "rotateJwks".toLowerCase():
      return await new RotateJwksWorker({
        errorStrategy: "logAndDropAfterThreshold",
        dropThreshold: 3,
      }).run(job.id, RotateJwks.parse(job.payload));
    case "inviteCodeFromExternalTrigger".toLowerCase():
      return await new InviteCodeFromExternalTriggerWorker({
        errorStrategy: "logAndDrop",
      }).run(job.id, InviteCodeFromExternalTrigger.parse(job.payload));
    case "requestUbiForInactiveAccounts".toLowerCase():
      return new RequestUbiForInactiveAccountsWorker({
        errorStrategy: "logAndDrop",
      }).run(job.id, RequestUbiForInactiveAccounts.parse(job.payload));
    case "unreadNotification".toLowerCase():
      return new UnreadNotificationWorker({
        errorStrategy: "logAndDrop",
      }).run(job.id, UnreadNotification.parse(job.payload));
    case "redeemClaimedInvitation".toLowerCase():
      return new RedeemClaimedInvitationWorker({
        errorStrategy: "logAndDrop",
      }).run(job.id, RedeemClaimedInvitation.parse(job.payload));
    default:
      return undefined;
  }
};
