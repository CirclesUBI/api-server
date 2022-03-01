import {JobWorker, JobWorkerConfiguration} from "../jobWorker";
import {SendCrcTrustChangedEmail} from "../../descriptions/emailNotifications/sendCrcTrustChangedEmail";

export class SendCrcTrustChangedEmailWorker extends JobWorker<SendCrcTrustChangedEmail> {
  name(): string {
    return "SendCrcTrustChangedEmailWorker";
  }

  constructor(configuration?:JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: SendCrcTrustChangedEmail): Promise<void> {

  }
}