import {JobWorker, JobWorkerConfiguration} from "../jobWorker";
import {Environment} from "../../../environment";
import {VerifyEmailAddress} from "../../descriptions/emailNotifications/verifyEmailAddress";
import {Mailer} from "../../../mailer/mailer";
import {crcReceivedEmailTemplate} from "./templates/crcReceivedEmailTemplate";
import {ProfileLoader} from "../../../querySources/profileLoader";
import {SendVerifyEmailAddressEmail} from "../../descriptions/emailNotifications/sendVerifyEmailAddressEmail";
import {JobCreationTime} from "aws-sdk/clients/s3control";
import {JobType} from "../../descriptions/jobDescription";

export class SendVerifyEmailAddressEmailWorker extends JobWorker<SendVerifyEmailAddressEmail> {
  name(): string {
    return "SendVerifyEmailAddressEmailWorker";
  }

  constructor(configuration?:JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: SendVerifyEmailAddressEmail) {
    await Mailer.send({
      subject: `Circles.land: Please verify your email address`,
      bodyHtml: `Go to ${Environment.externalDomain}:8989/trigger?topic=${<JobType>"verifyEmailAddress".toLowerCase()}&code=${job.triggerCode} to verify your email address.`
    }, {
    }, job.emailAddress);

    return undefined;
  }
}