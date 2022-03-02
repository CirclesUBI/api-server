import {JobWorker, JobWorkerConfiguration} from "../jobWorker";
import {SendCrcReceivedEmail} from "../../descriptions/emailNotifications/sendCrcReceivedEmail";
import {Mailer} from "../../../mailer/mailer";
import {ProfileLoader} from "../../../profileLoader";
import {Environment} from "../../../environment";
import {crcReceivedEmailTemplate} from "../../../mailer/templates/crcReceivedEmailTemplate";
import {convertCirclesToTimeCircles} from "../../../../dist/timeCircles";
import {RpcGateway} from "../../../rpcGateway";

export class SendCrcReceivedEmailWorker extends JobWorker<SendCrcReceivedEmail> {
  name(): string {
    return "SendCrcReceivedEmailWorker";
  }

  constructor(configuration?:JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: SendCrcReceivedEmail) {
    const profiles = await (new ProfileLoader()
      .profilesBySafeAddress(Environment.readonlyApiDb, [job.from, job.to]));

    const sender = profiles[job.from];
    const recipient = profiles[job.to];

    if (!recipient?.emailAddress) {
      return {
        info: `Couldn't send a notification email to profile ${profiles[job.to]?.id} because it has no email address.`
      };
    }

    if (!sender?.circlesAddress) {
      return {
        warning: `Couldn't send a notification email for transaction ${job.hash} because no sender profile could be loaded.`
      };
    }

    await Mailer.send(crcReceivedEmailTemplate, {
      sender: `${ProfileLoader.displayName(sender)}`,
      recipient: `${ProfileLoader.displayName(recipient)}`,
      amount: convertCirclesToTimeCircles(
        parseFloat(RpcGateway.get().utils.fromWei(job.amount, "ether")),
        job.timestamp.toJSON()),
      currency: "Time Circles",
      transactionDetailUrl: `${Environment.appUrl}#/banking/transactions/${job.hash}`
    }, recipient.emailAddress);

    return undefined;
  }
}