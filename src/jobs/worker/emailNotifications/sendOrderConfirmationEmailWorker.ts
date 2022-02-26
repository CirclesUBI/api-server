import {JobWorker, JobWorkerConfiguration} from "../jobWorker";
import {SendOrderConfirmationEmail} from "../../descriptions/emailNotifications/sendOrderConfirmationEmail";

export class SendOrderConfirmationEmailWorker extends JobWorker<SendOrderConfirmationEmail> {
  name(): string {
    return "SendCrcTrustChangedEmailWorker";
  }

  constructor(configuration?:JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: SendOrderConfirmationEmail): Promise<void> {
  }
}