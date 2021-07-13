import {Session} from "./session";
import {Logger, newLogger} from "./logger";
import {prisma_rw} from "./prismaClient";
import {IndexTransactionRequest, Tag} from "@prisma/client";
import {RpcGateway} from "./rpcGateway";
import type {TransactionReceipt} from "web3-core";

export class TransactionIndexWorker
{
    private intervalHandle:any;

    private lastRound: "none"|"mark"|"process" = "none";
    private state:"ready"|"marking"|"processing" = "ready";

    readonly workerId: string;
    readonly logger: Logger;

    constructor() {
        this.workerId = Session.generateRandomBase64String(16);
        const defaultTags = [{
            key: `workerId`,
            value: this.workerId
        }];
        this.logger = newLogger(defaultTags);
    }

    start() {
        this.logger.info([], `Starting TransactionIndexWorker ${this.workerId} ..`);

        if (this.intervalHandle) {
            throw new Error(`Already running.`)
        }
        this.intervalHandle = setInterval(() => {
            if (this.state !== "ready") {
                this.logger.warning([], `TransactionIndexWorker ${this.workerId} is still busy..`);
                return;
            }

            switch(this.lastRound) {
                case "none":
                case "process":
                    this.mark();
                    break;
                case "mark":
                    this.state = "processing";
                    this.process();
                    break;
            }

        }, 5000);
    }

    stop() {
        if (this.intervalHandle) {
            clearInterval(this.intervalHandle);
            this.intervalHandle = undefined;
        }
    }

    async mark() {
        this.logger.debug([], `Start marking ..`);
        this.state = "marking";

        const result = await prisma_rw.indexTransactionRequest.updateMany({
            where: {
                workerProcess: null
            },
            data: {
                workerProcess: this.workerId,
                pickedAt: new Date()
            }
        });

        if (result.count > 0) {
            this.logger.info([], `Picked ${result.count} index requests to process them in the next round ..`);
        }

        this.roundFinished();
    }

    async process() {
        this.logger.debug([], `Start processing ..`);
        this.state = "processing";

        const requestsToProcess = await prisma_rw.indexTransactionRequest.findMany({
            where: {
                workerProcess: this.workerId,
                indexedTransaction: null
            },
            orderBy: {
                blockNumber: "asc"
            },
            include: {
                tags: true
            },
            take: 100
        });

        if (requestsToProcess.length == 0) {
            this.logger.debug([], `Empty processing round.`);
            this.roundFinished();
            return;
        }

        this.logger.info([], `Indexing ${requestsToProcess.length} transactions in this round ..`);

        const web3 = RpcGateway.get();
        for (let request of requestsToProcess) {
            this.logger.debug([], `Processing transaction ${request.transactionHash} ..`);

            let receipt:TransactionReceipt|undefined;
            try {
                receipt = await web3.eth.getTransactionReceipt(request.transactionHash);
            } catch (e) {
                this.logger.error([], `Processing of transaction ${request.transactionHash} failed: `, e);
            }

            if (!receipt) {
                await this.releaseIndexRequest(request);
            } else {
                await this.writeReceipt(request, receipt);
            }
        }

        this.roundFinished();
    }

    async releaseIndexRequest(request:IndexTransactionRequest) {
        this.logger.info([], `Transaction ${request.transactionHash} has no receipt yet. Releasing it so that it can be picked by another worker.`);

        await prisma_rw.indexTransactionRequest.update({
            where: {
                id: request.id
            },
            data: {
                workerProcess: null,
                pickedAt: null
            }
        });
    }

    async writeReceipt(request:IndexTransactionRequest & {tags: Tag[]}, receipt:TransactionReceipt) {
        this.logger.debug([], `Writing receipt of ${request.transactionHash} to db ..`);

        const now = new Date();
        const indexedTransaction = await prisma_rw.indexedTransaction.create({
            data: {
                transactionHash: request.transactionHash,
                from: receipt.from,
                createdAt: now,
                createdByProfileId: request.createdByProfileId,
                contractAddress: receipt.contractAddress,
                transactionIndex: receipt.transactionIndex,
                to: receipt.to,
                blockNumber: receipt.blockNumber,
                blockHash: receipt.blockHash,
                gasUsed: receipt.gasUsed.toString(),
                cumulativeGasUsed: receipt.cumulativeGasUsed.toString(),
                logsBloom: receipt.logsBloom,
                root: null,
                status: "true",
                fromRequestId: request.id,
                logs: {
                    createMany: {
                        data: receipt.logs?.map(log => {
                            return {
                                data: log.data,
                                transactionIndex: log.transactionIndex,
                                blockHash: log.blockHash,
                                transactionHash: log.transactionHash,
                                blockNumber: log.blockNumber,
                                logIndex: log.logIndex,
                                address: log.address,
                                removed: null,
                                topics: log.topics
                            }
                        }) ?? []
                    }
                },
                tags: {
                    createMany: {
                        data: request.tags?.map(tag => {
                            return {
                                createdByProfileId: tag.createdByProfileId,
                                createdAt: now,
                                value: tag.value,
                                typeId: tag.typeId,
                                isPrivate: false
                            };
                        }) ?? []
                    }
                }
            }
        });

        this.logger.info([], `Wrote receipt of ${request.transactionHash} to db. IndexedTransaction ID is: ${indexedTransaction.id}`);
    }

    roundFinished() {
        this.logger.debug([], `Round finished.`);

        if (this.state === "processing") {
            this.lastRound = "process";
        } else if (this.state === "marking") {
            this.lastRound = "mark";
        }

        this.state = "ready";
    }
}