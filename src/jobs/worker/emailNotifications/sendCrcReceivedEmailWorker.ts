import {JobWorker, JobWorkerConfiguration} from "../jobWorker";
import {SendCrcReceivedEmail} from "../../descriptions/emailNotifications/sendCrcReceivedEmail";
import {Mailer} from "../../../mailer/mailer";
import {ProfileLoader} from "../../../profileLoader";
import {Environment} from "../../../environment";
import {crcReceivedEmailTemplate} from "../../../mailer/templates/crcReceivedEmailTemplate";

export class SendCrcReceivedEmailWorker extends JobWorker<SendCrcReceivedEmail> {
  name(): string {
    return "SendCrcReceivedEmailWorker";
  }

  constructor(configuration?:JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: SendCrcReceivedEmail): Promise<void> {
    const profiles = await (new ProfileLoader()
      .profilesBySafeAddress(Environment.readonlyApiDb, [job.from, job.to]));

    const sender = profiles[job.from];
    const recipient = profiles[job.to];

    if (!recipient?.emailAddress) {
      console.warn(`Couldn't send a notification email to profile ${profiles[job.to]?.id} because it has no email address.`);
      return;
    }

    if (!sender?.circlesAddress) {
      console.warn(`Couldn't send a notification email for transaction ${job.hash} because no sender profile could be loaded.`);
      return;
    }

    await Mailer.send(crcReceivedEmailTemplate, {
      sender: `${sender.firstName} ${sender.lastName}`,
      recipient: `${recipient.firstName} ${recipient.lastName}`,
      amount: job.amount,
      currency: "Time Circles",
      bankingUrl: `${Environment.appUrl}#/banking/transactions/${job.hash}`
    }, recipient.emailAddress);
  }
}