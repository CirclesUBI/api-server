import {Environment} from "./environment";
import {PoolClient} from "pg";
import {log} from "./log";
import {JobDescription, JobType} from "./jobs/descriptions/jobDescription";

export type Job = {
    id: number,
    hash: string,
    createdAt: Date,
    topic: JobType,
    payload: string
}

export class JobQueue {
    readonly name:string;

    constructor(name:string) {
        this.name = name;
    }

    public async consume(
      topics: JobType[],
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
            let topicMap = topics.reduce((p,c) => {p[c.toLowerCase()]=true;return p;}, <{ [x: string]: any }>{});

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
                        if (!topicMap[msg.channel.toLowerCase()]) {
                            return;
                        }

                        try {
                            if (msg.payload && msg.payload?.trim() != "") {
                                // Everything with a non-empty payload is considered a 'broadcast message'.
                                // Broadcast messages are executed right away whenever an instance receives them.
                                await worker([{
                                    id: -1,
                                    hash: "",
                                    createdAt: new Date(),
                                    topic: <JobType>msg.channel.toLowerCase(),
                                    payload: msg.payload ?? "",
                                }]);
                            } else {
                                // Everything else is a regular job queue entry and is only processed once
                                let processedJobs = 1;
                                while (processedJobs > 0) {
                                    processedJobs = await JobQueue.consume(msg.channel.toLowerCase(), maxBatchSize, worker);
                                }
                            }
                        } catch (e) {
                            reject(e);
                        }
                    });

                    if (isRunning) {
                        for (let topic of topics) {
                            log(" ->] ",
                              `[${self.name}] [${topic}] [JobQueue.consume]`,
                              `Subscribing to '${topic}' events ..`);

                            await listenerConnection.query(`LISTEN ${topic.toLowerCase()}`);

                            log(" ->] ",
                              `[${self.name}] [${topic}] [JobQueue.consume]`,
                              `Processing initial '${topic}' events ..`);

                            let processedJobs = 1;
                            while (processedJobs > 0) {
                                processedJobs = await JobQueue.consume(topic.toLowerCase(), maxBatchSize, worker);
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

    public static async broadcast(jobDescription: JobDescription) : Promise<void> {
        await Environment.pgReadWriteApiDb.query(`call publish_event($1, $2);`,
          [jobDescription.topic.toLowerCase(), jobDescription.payload()]);
    }

    public static async produce(jobs:JobDescription[]) : Promise<void> {
        const client = await Environment.pgReadWriteApiDb.connect();
        try {
            await client.query('BEGIN');

            const insertSql = "INSERT INTO \"Job\" (hash, topic, payload) VALUES (sha256($1 || $2), $1, $2) ON CONFLICT DO NOTHING;";
            const topics:{[x:string]:any} = {};

            for(let job of jobs) {
                await client.query(insertSql, [
                    job.topic.toLowerCase(),
                    job.payload()
                ]);
                topics[job.topic.toLowerCase()] = null;
            }

            await client.query('COMMIT');

            for(let topic of Object.keys(topics)) {
                await client.query(`call publish_event($1, $2);`, [topic.toLowerCase(), ""]);
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

            const queryResult = await client.query(getJobsSql, [topic.toLowerCase()]);
            const jobs = queryResult.rows.map(o => {
                return <Job> {
                    id: o.id,
                    hash: o.hash,
                    createdAt: o.createdAt,
                    topic: o.topic.toLowerCase(),
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