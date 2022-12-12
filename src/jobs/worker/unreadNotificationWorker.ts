import {JobWorker, JobWorkerConfiguration} from "./jobWorker";
import {UnreadNotification} from "../descriptions/unreadNotification";
import {Environment} from "../../environment";

export class UnreadNotificationWorker extends JobWorker<UnreadNotification> {
  name(): string {
    return "UnreadNotificationWorker";
  }

  constructor(configuration?:JobWorkerConfiguration) {
    super(configuration);
  }

  private getUTCTime(dateTimeString: string): Date {
    const dateTime = new Date(dateTimeString);
    const dateTimeNumber = dateTime.getTime();
    const dateTimeOffset = dateTime.getTimezoneOffset() * 60000;
    const dateTimeUTC = new Date();
    dateTimeUTC.setTime(dateTimeNumber - dateTimeOffset);

    return dateTimeUTC;
  }

  async doWork(job: UnreadNotification) {
    console.log(`Unread notification: ${JSON.stringify(job, null, 2)}`);

    const unreadEvent = await Environment.readWriteApiDb.unreadEvent.create({
      data: {
        timestamp: this.getUTCTime(job.timestamp),
        type: job.type,
        transaction_hash: job.transactionHash,
        safe_address: job.circlesAddress,
        contact_address: job.contactAddress,
        readAt: undefined,
        direction: job.direction
      }
    });

    return {
      data: unreadEvent
    };
  }
}