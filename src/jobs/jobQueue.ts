import {Environment} from "../environment";
import {PoolClient} from "pg";
import {log} from "../utils/log";
import {JobDescription, JobKind, JobType} from "./descriptions/jobDescription";
import {jobSink} from "./jobSink";

export type Job = {
  id: number,
  hash: string,
  createdAt: Date,
  topic: JobType,
  payload: string
}

export type JobResult = {
  error?: string,
  warning?: string,
  info?: string,
  data?: any
}

export class JobQueue {
  readonly name: string | undefined;

  constructor(name?: string) {
    this.name = name;
  }

  stop() {
    this._isRunning = false;
    if (this._stop) {
      this._stop();
    }
  }

  private _stop: (() => void) | undefined = undefined;

  get isRunning(): boolean {
    return this._isRunning;
  }

  private _isRunning: boolean = false;
  private _listenerConnection: PoolClient | undefined = undefined;

  get topics(): string[] {
    return Object.keys(this._topics);
  }

  private _topics: { [x: string]: boolean } = {};

  public static async broadcast(jobDescription: JobDescription): Promise<void> {
    await Environment.pgReadWriteApiDb.query(`call publish_event($1, $2);`,
      [jobDescription._topic.toLowerCase(), jobDescription.getPayload()]);
  }

  public static async produce(jobs: JobDescription[]): Promise<Job[]> {
    const client = await Environment.pgReadWriteApiDb.connect();
    const notifyTopics: { [x: string]: boolean } = {};
    try {
      await client.query('BEGIN');

      const insertSql = `INSERT INTO \"Job\" ("timeoutAt", hash, kind, topic, payload) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING RETURNING id;`;

      const results: Job[] = [];
      for (let job of jobs) {
        const result = await client.query(insertSql, [
          job._timeoutAt,
          job._identity,
          job._kind,
          job._topic.toLowerCase(),
          job.getPayload()
        ]);

        // only notify about successful inserts
        notifyTopics[job._topic.toLowerCase()] = result.rowCount > 0;

        if (result.rowCount > 0) {
          results.push({
            id: result.rows[0].id,
            hash: job._identity,
            topic: job._topic,
            payload: job.getPayload(),
            createdAt: new Date()
          });
        }
      }

      await client.query('COMMIT');

      for (let topic of Object.entries(notifyTopics)) {
        if (!topic[1]) { // only notify about successful inserts
          continue;
        }
        await client.query(`call publish_event($1, $2);`, [topic[0].toLowerCase(), ""]);
      }

      return results;
    } finally {
      client.release();
    }
  }

  public async consume(
    topics: JobType[],
    jobSink: (job: Job) => Promise<JobResult | undefined>,
    throwOnError: boolean = false) {

    if (this._isRunning) {
      throw new Error(`The consumer is already running.`);
    }

    this._isRunning = true;

    while (this._isRunning) {
      console.log();

      log("RUN  ",
        `[${this.name ?? ""}] [] [JobQueue.consume]`,
        `Starting job worker for topics: '${topics.join(', ')}'`);

      let error: Error | null = null;
      this._topics = topics.reduce((p, c) => {
        p[c.toLowerCase()] = true;
        return p;
      }, <{ [x: string]: any }>{});

      try {
        this._listenerConnection = await Environment.pgReadWriteApiDb.connect();

        // This promise never resolves and ends only if the connection experiences an error or if
        // the stop callback (the return value of this function) is called.
        const consumer = await this.consumer(this);
        await new Promise(consumer);
      } catch (e) {
        console.error(`The job listener for topics '${topics.join(', ')}' experienced an error: `, e);
        error = <any>e;
      } finally {
        try {
          this._listenerConnection?.release();
        } catch (e) {
          console.error(`Couldn't release the job listener for topics '${topics.join(', ')}' on error:`, e);
        }
      }

      if (error && throwOnError) {
        throw error;
      }

      if (!this._isRunning) {
        console.log(`Job listener for topics '${topics.join(', ')}' stopped.`);
      } else {
        console.log(`Retrying to connect the job listener for topics '${topics.join(', ')}' in 10 sec. ..`);

        await new Promise((resolve) => {
          setTimeout(resolve, 10000);
        });
      }
    }
  }

  private async consumer(self: JobQueue): Promise<(resolve: (value: void | PromiseLike<void>) => void, reject: (reason?: any) => void) => void> {
    const s = self;
    return async (resolve: (value: void | PromiseLike<void>) => void, reject: (reason?: any) => void) => {
      s._stop = resolve;

      if (!s._listenerConnection) {
        reject(new Error(`Couldn't create the the job listener for topics: ${Object.keys(this._topics).join(', ')}`));
        return;
      }
      s._listenerConnection.on("error", async function (err) {
        reject(err);
      });
      s._listenerConnection.on("notification", async function (msg) {
        if (!s._topics[msg.channel.toLowerCase()]) {
          return;
        }

        try {
          if (msg.payload && msg.payload?.trim() != "") {
            // Everything with a non-empty payload is considered a 'broadcast message'.
            // Broadcast messages are executed right away whenever an instance receives them.
            const payloadObj = JSON.parse(msg.payload);
            if (payloadObj._kind != "broadcast") {
              console.error(`Encountered an invalid payload in a 'broadcast' job (wrong _kind): `, msg.payload);
              return;
            }
            await jobSink({
              id: -1,
              hash: payloadObj._identity,
              createdAt: new Date(),
              topic: <JobType>msg.channel.toLowerCase(),
              payload: msg.payload ?? "",
            });
          } else {
            // Everything else is a regular job queue entry and is only processed once
            let lastResult: JobResult | "end" | undefined = undefined;
            while (lastResult != "end") {
              const query = JobQueue.processJobsSql(msg.channel.toLowerCase());
              lastResult = await JobQueue.processNextJob(query, jobSink);
            }
          }
        } catch (e) {
          reject(e);
        }
      });

      if (s._isRunning) {
        for (let topic of Object.keys(s._topics)) {
          log(" ->] ",
            `[${s.name ?? ""}] [${topic}] [JobQueue.consume]`,
            `Subscribing to '${topic}' events ..`);

          await s._listenerConnection.query(`LISTEN ${topic.toLowerCase()}`);

          log(" ->] ",
            `[${s.name ?? ""}] [${topic}] [JobQueue.consume]`,
            `Processing initial '${topic}' events ..`);

          let lastResult: JobResult | "end" | undefined = undefined;
          while (lastResult != "end") {
            const query = JobQueue.processJobsSql(topic.toLowerCase());
            lastResult = await JobQueue.processNextJob(query, jobSink);
          }
        }

        log("     ",
          `[${s.name ?? ""}] [] [JobQueue.consume]`,
          `JobQueue is ready.`);
      }
    }
  }

  static async trigger(topic: JobType, hash: string): Promise<JobResult | "end" | undefined> {
    const query = this.processTriggersSql(topic, hash);
    return await this.processNextJob(query, jobSink);
  }

  private static processTriggersSql(topic: string, hash: string): {
    sql: string,
    params: any[]
  } {
    const getJobsSql = `
        UPDATE "Job"
        SET "finishedAt" = now()
        FROM (
                 SELECT *
                 FROM "Job"
                 WHERE topic = $1
                   AND "finishedAt" is null
                   AND "kind" = 'externalTrigger'
                   AND "hash" = $2
                   AND ("timeoutAt" is null OR "timeoutAt" > now())
                 LIMIT 1 FOR UPDATE SKIP LOCKED
             ) j
        WHERE j.id = "Job".id
        RETURNING j.*;`;

    return {
      sql: getJobsSql,
      params: [topic, hash]
    };
  }

  private static processJobsSql(topic: string): {
    sql: string,
    params: any[]
  } {
    const getJobsSql = `
        UPDATE "Job"
        SET "finishedAt" = now()
        FROM (
                 SELECT *
                 FROM "Job"
                 WHERE topic = $1
                   AND "finishedAt" is null
                   AND "kind" != 'externalTrigger'
                   AND ("timeoutAt" is null OR "timeoutAt" > now())
                 LIMIT 1 FOR UPDATE SKIP LOCKED
             ) j
        WHERE j.id = "Job".id
        RETURNING j.*;`;

    return {
      sql: getJobsSql,
      params: [topic]
    };
  }

  private static async processNextJob(query: {
    sql: string,
    params: any[]
  }, worker: (job: Job) => Promise<JobResult | undefined>): Promise<JobResult | undefined | "end"> {
    const client = await Environment.pgReadWriteApiDb.connect();
    let jobId: number | undefined;
    let jobResult: JobResult | undefined;

    try {
      await client.query('BEGIN');

      const queryResult = await client.query(query.sql, query.params);
      const jobs = queryResult.rows.map(o => {
        return <Job>{
          id: o.id,
          hash: o.hash,
          createdAt: o.createdAt,
          topic: o.topic.toLowerCase(),
          payload: o.payload
        };
      });

      if (jobs.length > 0) {
        const job = jobs[0];

        jobId = job.id;
        jobResult = await worker(job);
      }

      await client.query('COMMIT');

      if (jobResult?.info || jobResult?.warning || jobResult?.error) {
        await client.query(`update "Job"
                            set info    = $1,
                                warning = $2,
                                error   = $3
                            where id = $4`, [
          jobResult.info,
          jobResult.warning,
          jobResult.error,
          jobId
        ]);
      }

      if (jobs.length > 0) {
        return jobResult;
      } else {
        return "end";
      }
    } catch (e) {
      await client.query('ROLLBACK');
      if (jobId) {
        const error = <any>e;
        await client.query(`update "Job"
                            set error = $1
                            where id = $2`, [
          `${error.message}\n${error.stack}`,
          jobId
        ]);
      }
      throw e
    } finally {
      client.release();
    }
  }
}