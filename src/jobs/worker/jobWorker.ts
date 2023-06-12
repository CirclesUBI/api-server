import {JobDescription} from "../descriptions/jobDescription";
import {Environment} from "../../environment";
import {JobResult} from "../jobQueue";

export type ErrorStrategy =
  "throw" |
  "logAndDrop" |
  "logAndDropAfterThreshold" |
  "logAndThrowAfterThreshold"

export type JobWorkerConfiguration = {
  errorStrategy: ErrorStrategy
  dropThreshold?: number
}

export abstract class JobWorker<TJob extends JobDescription> {
  readonly configuration: JobWorkerConfiguration;

  protected constructor(configuration?:JobWorkerConfiguration) {
    this.configuration = configuration ? configuration : { errorStrategy: "throw" };
  }

  abstract name() : string;

  private _errorStats: {[jobId:number]:number} = {};
  private _jobCounter: number = 0;
  private _statsCleanupInterval = 200;

  async run(jobId: number, jobDescription: TJob) : Promise<JobResult|undefined> {
    this.cleanStatsIfNecessary();

    this._errorStats[jobId] = 0;

    const me = this;
    function log(prefix:string, message:string) {
      console.log(`${prefix}[${new Date().toJSON()}] [${Environment.instanceId}] [${jobDescription._topic}] [jobId:${jobId}] [${me.name()}.run]: ${message}`);
    }

    log(" *-> ", jobDescription.getPayload());

    try {
      const result = await this.doWork(jobDescription, log);
      delete this._errorStats[jobId];

      return result;
    } catch (e) {
      const error = <any>e;
      if (this.configuration.errorStrategy == "throw") {
        delete this._errorStats[jobId];

        throw e;
      }
      if (this.configuration.errorStrategy == "logAndDrop") {
        log("     ", "A job ran into an error and the error strategy is 'logAndDrop'.")
        log("ERR  ", error.message + "\n" + error.stack)

        delete this._errorStats[jobId];

        return {
          error: `${error.message + "\n" + error.stack}`
        };
      }
      if (this.configuration.errorStrategy == "logAndDropAfterThreshold") {
        log("     ", `A job ran into an error and the error strategy is 'logAndDropAfterThreshold'.`)

        this._errorStats[jobId]++;

        if (this._errorStats[jobId] > (this.configuration.dropThreshold ?? 0)) {
          delete this._errorStats[jobId];
          log("ERR  ", `The job reached the error threshold of ${this.configuration.dropThreshold ?? 0} and will be dropped.`);
        }
      }
      if (this.configuration.errorStrategy == "logAndThrowAfterThreshold") {
        log("     ", "A job ran into an error and the error strategy is 'logAndThrowAfterThreshold'.");

        this._errorStats[jobId]++;

        if (this._errorStats[jobId] > (this.configuration.dropThreshold ?? 0)) {
          delete this._errorStats[jobId];
          log("ERR  ",
            `The job reached the error threshold of ${this.configuration.dropThreshold ?? 0} and will throw.`);

          throw e;
        }
      }
      return {
        error: `${error.message + "\n" + error.stack}`
      };
    }
    return undefined;
  }

  abstract doWork(job: TJob, log:(prefix:string, message:string) => void) : Promise<JobResult|undefined>;

  private cleanStatsIfNecessary() {
    this._jobCounter++;

    if (this._jobCounter % this._statsCleanupInterval != 0)
      return;

    const erroredJobs = Object.keys(this._errorStats);

    Object.keys(erroredJobs)
      .map(o => parseInt(o))
      .sort((a, b) => a > b ? 1 : a < b ? -1 : 0)
      .forEach((jobId, i) => {
        if (i > erroredJobs.length * 0.33) {
          return;
        }

        delete this._errorStats[jobId];
      });
  }
}