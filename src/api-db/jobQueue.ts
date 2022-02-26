import {Environment} from "../environment";
import {PoolClient} from "pg";
import {log} from "../log";

export type JobQueueTopics =
  "QUEUE_email_crc_trust_changed" |
  "QUEUE_email_crc_received" |
  "QUEUE_email_order_confirmation" |
  "new_message"

export type JobData = {
    topic: JobQueueTopics,
    payload: string
}

export type Job = {
    id: number,
    createdAt: Date,
    topic: string,
    payload: string
}

export class JobQueue {
    readonly name:string;

    constructor(name:string) {
        this.name = name;
    }

    public async consume(
      topics: JobQueueTopics[],
      worker: (jobs:Job[]) => Promise<void>,
      maxBatchSize: number = 1,
      throwOnError: boolean = false)
      : Promise<() => void> {

        const self = this;
        let isRunning = true;
        let stop: ((val:unknown) => void)|null = null;

        while (isRunning) {
            console.log();

            log("RUN  ",
              `[${this.name}] [] [JobQueue.consume]`,
              `Starting job worker for topics: '${topics.join(', ')}'`);

            let error:Error|null = null;
            let listenerConnection:PoolClient|undefined = undefined;
            let topicMap = topics.reduce((p,c) => {p[c]=true;return p;}, <{ [x: string]: any }>{});

            try {
                listenerConnection = await Environment.pgReadWriteApiDb.connect();

                // This promise never resolves and ends only if the connection experiences an error or if
                // the stop callback (the return value of this function) is called.
                await new Promise(async (resolve, reject) => {
                    stop = resolve;

                    if (!listenerConnection) {
                        reject(new Error(`Couldn't create the the job listener for topics: ${topics.join(', ')}`));
                        return;
                    }
                    listenerConnection.on("error", async function (err) {
                        reject(err);
                    });
                    listenerConnection.on("notification", async function (msg) {
                        if (!topicMap[msg.channel]) {
                            return;
                        }

                        try {
                            if (msg.channel.startsWith("BROADCAST_")) {
                                await worker([{
                                    id: -1,
                                    createdAt: new Date(),
                                    topic: msg.channel,
                                    payload: msg.payload ?? "",
                                }])
                            } else {
                                let processedJobs = 1;
                                while (processedJobs > 0) {
                                    processedJobs = await JobQueue.consume(msg.channel, maxBatchSize, worker);
                                }
                            }
                        } catch (e) {
                            console.error("Ola!")
                            reject(e);
                        }
                    });

                    if (isRunning) {
                        for (let topic of topics) {
                            log(" ->] ",
                              `[${self.name}] [${topic}] [JobQueue.consume]`,
                              `Subscribing to '${topic}' events ..`);

                            await listenerConnection.query(`LISTEN ${topic}`);

                            let processedJobs = 1;
                            while (processedJobs > 0) {
                                processedJobs = await JobQueue.consume(topic, maxBatchSize, worker);
                            }
                        }

                        log("     ",
                          `[${self.name}] [] [JobQueue.consume]`,
                          `JobQueue is ready.`);
                    }
                });
            } catch (e) {
                console.error(`The job listener for topics '${topics.join(', ')}' experienced an error: `, e);
                error = e;
            } finally {
                try {
                    listenerConnection?.release();
                } catch (e) {
                    console.error(`Couldn't release the job listener for topics '${topics.join(', ')}' on error:`, e);
                }
            }

            if (error && throwOnError) {
                throw error;
            }

            if(!isRunning) {
                console.log(`Job listener for topics '${topics.join(', ')}' stopped.`);
            } else {
                console.log(`Retrying to connect the job listener for topics '${topics.join(', ')}' in 10 sec. ..`);

                await new Promise((resolve) => {
                    setTimeout(resolve, 10000);
                });
            }
        }

        return () => {
            isRunning = false;
            if (stop)
                stop(undefined);
        };
    }

    public static async broadcast(topic: JobQueueTopics, payload: string) : Promise<void> {
        await Environment.pgReadWriteApiDb.query(`call publish_event($1, $2);`, [topic, payload]);
    }

    public static async produce(jobs:JobData[]) : Promise<void> {
        const client = await Environment.pgReadWriteApiDb.connect();
        try {
            await client.query('BEGIN');

            const insertSql = "INSERT INTO \"Job\" (topic, payload) VALUES ($1, $2) RETURNING id;";
            const topics:{[x:string]:any} = {};

            for(let job of jobs) {
                await client.query(insertSql, [
                    job.topic,
                    job.payload
                ]);
                topics[job.topic] = null;
            }

            await client.query('COMMIT');

            for(let topic of Object.keys(topics)) {
                await client.query(`call publish_event($1, $2);`, [topic, ""]);
            }
        } finally {
            client.release();
        }
    }

    private static async consume(topic:string, count:number, worker:(jobs:Job[]) => Promise<void>) {
        const client = await Environment.pgReadWriteApiDb.connect()
        try {
            await client.query('BEGIN');

            const getJobsSql = `
                DELETE FROM "Job"
                    USING (
                        SELECT * 
                        FROM "Job" 
                        WHERE topic = $1
                        LIMIT ${parseInt(count.toString())} FOR UPDATE SKIP LOCKED
                    ) q
                WHERE q.id = "Job".id
                  AND q.topic = "Job".topic
                RETURNING "Job".*;`;

            const queryResult = await client.query(getJobsSql, [topic]);
            const jobs = queryResult.rows.map(o => {
                return <Job> {
                    id: o.id,
                    createdAt: o.createdAt,
                    topic: o.topic,
                    payload: o.payload
                };
            });

            await worker(jobs);

            await client.query('COMMIT');

            return jobs.length;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e
        } finally {
            client.release();
        }
    }
}