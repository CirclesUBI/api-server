import {JobWorker, JobWorkerConfiguration} from "../jobWorker";
import {Environment} from "../../../environment";
import {Mailer} from "../../../mailer/mailer";
import {welcomeEmailTemplate} from "./templates/welcomeEmailTemplate";
import {SendWelcomeEmail} from "../../descriptions/emailNotifications/sendWelcomeEmail";

export class SendWelcomeEmailWorker extends JobWorker<SendWelcomeEmail> {
  name(): string {
    return "SendWelcomeEmailWorker";
  }

  constructor(configuration?:JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: SendWelcomeEmail) {
    await Mailer.send(welcomeEmailTemplate, {
      loginUrl: `${Environment.appUrl}`
    }, job.to);

    return undefined;
  }
}