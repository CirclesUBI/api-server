import {JobWorker, JobWorkerConfiguration} from "../jobWorker";
import {SendCrcReceivedEmail} from "../../descriptions/emailNotifications/sendCrcReceivedEmail";
import {Mailer} from "../../../mailer/mailer";
import {ProfileLoader} from "../../../querySources/profileLoader";
import {Environment} from "../../../environment";
import {crcReceivedEmailTemplate} from "./templates/crcReceivedEmailTemplate";
import {RpcGateway} from "../../../circles/rpcGateway";
import {convertCirclesToTimeCircles} from "../../../utils/timeCircles";

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

    if (!recipient?.emailAddress || !recipient?.emailVerified) {
      return {
        info: `Couldn't send a notification email to profile ${recipient?.id} because it has no verified email address.`
      };
    }

    if (!sender?.circlesAddress) {
      return {
        warning: `Couldn't send a notification email for transaction ${job.hash} because no sender profile could be loaded.`
      };
    }

    const amount = (convertCirclesToTimeCircles(
      parseFloat(RpcGateway.get().utils.fromWei(job.amount, "ether")),
      job.timestamp.toJSON()) / 10).toFixed(2);

    await Mailer.send(crcReceivedEmailTemplate, {
      sender: `${ProfileLoader.displayName(sender)}`,
      recipient: `${ProfileLoader.displayName(recipient)}`,
      amount: amount,
      currency: "€",
      transactionDetailUrl: `${Environment.appUrl}#/banking/transactions/${job.hash}`
    }, recipient.emailAddress);

    return undefined;
  }
}