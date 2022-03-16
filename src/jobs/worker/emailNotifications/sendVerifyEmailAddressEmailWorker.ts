import {JobWorker, JobWorkerConfiguration} from "../jobWorker";
import {Environment} from "../../../environment";
import {Mailer} from "../../../mailer/mailer";
import {SendVerifyEmailAddressEmail} from "../../descriptions/emailNotifications/sendVerifyEmailAddressEmail";
import {verifyEmailAddressEmailTemplate} from "./templates/verifyEmailAddressEmailTemplate";

export class SendVerifyEmailAddressEmailWorker extends JobWorker<SendVerifyEmailAddressEmail> {
  name(): string {
    return "SendVerifyEmailAddressEmailWorker";
  }

  constructor(configuration?:JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: SendVerifyEmailAddressEmail) {
    const confirmUrl = `https://${Environment.externalDomain}${Environment.externalDomain == "localhost" ? ":8989" : ""}/#/passport/verifyEmail/${job.triggerCode}`;
    await Mailer.send(verifyEmailAddressEmailTemplate, {
      confirmUrl: confirmUrl
    }, job.emailAddress);

    return undefined;
  }
}