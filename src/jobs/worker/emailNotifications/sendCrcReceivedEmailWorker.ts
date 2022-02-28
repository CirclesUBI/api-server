import {JobWorker, JobWorkerConfiguration} from "../jobWorker";
import {SendCrcReceivedEmail} from "../../descriptions/emailNotifications/sendCrcReceivedEmail";

export class SendCrcReceivedEmailWorker extends JobWorker<SendCrcReceivedEmail> {
  name(): string {
    return "SendCrcReceivedEmailWorker";
  }

  constructor(configuration?:JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: SendCrcReceivedEmail): Promise<void> {

  }
}