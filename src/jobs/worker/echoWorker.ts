import {Echo} from "../descriptions/echo";
import {JobWorker, JobWorkerConfiguration} from "./jobWorker";

export class EchoWorker extends JobWorker<Echo> {
  name(): string {
    return "EchoWorker";
  }

  constructor(configuration?:JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: Echo) {
    return {
      data: {
        statusCode: 200,
        message: `${job.text}`
      }
    };
  }
}