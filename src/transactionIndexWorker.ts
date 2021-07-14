import {Session} from "./session";
import {Logger, newLogger} from "./logger";
import {prisma_ro, prisma_rw} from "./prismaClient";
import {IndexTransactionRequest, IndexedTransaction, EventType, Tag} from "@prisma/client";
import {RpcGateway} from "./rpcGateway";
import type {TransactionReceipt} from "web3-core";
import {CreateTagInput} from "./types";
import {InitDb, Type_Banking_Transfer_Data, Type_Banking_Trust_Data} from "./initDb";
import {BN} from "ethereumjs-util";

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
                await this.persist(request, receipt);
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

    classify(receipt:TransactionReceipt) : {typeTag:CreateTagInput, logicalFrom?: string, logicalTo?: string}|undefined {
        const hubTransferEvent = "0x8451019aab65b4193860ef723cb0d56b475a26a72b7bfc55c1dbd6121015285a";
        const trustEvent = "0xe60c754dd8ab0b1b5fccba257d6ebcd7d09e360ab7dd7a6e58198ca1f57cdcec";
        //const signup = "0x8451019aab65b4193860ef723cb0d56b475a26a72b7bfc55c1dbd6121015285a";
        //const orgaSignup = "0x8451019aab65b4193860ef723cb0d56b475a26a72b7bfc55c1dbd6121015285a";
        const l = "0x000000000000000000000000".length;

        const hubTransfer = {
            logs: receipt.logs.filter(p => p.topics.indexOf(hubTransferEvent) > -1),
            receipt
        };

        if (hubTransfer.logs.length > 0) {
            const value = new BN(<any>RpcGateway.get().eth.abi.decodeParameter("uint256", hubTransfer.logs[0].data));
            const metadata:Type_Banking_Transfer_Data = {
                type: InitDb.Type_Banking_Transfer,
                symbol: "crc",
                from: "0x" + hubTransfer.logs[0].topics[1].substr(l),
                to: "0x" + hubTransfer.logs[0].topics[2].substr(l),
                value
            }

            return {
                typeTag: <CreateTagInput>{
                    typeId: metadata.type,
                    value: JSON.stringify(metadata)
                },
                logicalFrom: metadata.from,
                logicalTo: metadata.to
            };
        }

        const trust = {
            logs: receipt.logs.filter(p => p.topics.indexOf(trustEvent) > -1),
            receipt
        };

        if (trust.logs.length > 0) {
            const metadata: Type_Banking_Trust_Data = {
                type: InitDb.Type_Banking_Trust,
                canSendTo: "0x" + trust.logs[0].topics[1].substr(l),
                user: "0x" + trust.logs[0].topics[2].substr(l),
                limit: new BN(<any>RpcGateway.get().eth.abi.decodeParameter("uint256", trust.logs[0].data))
            }

            return {
                typeTag: <CreateTagInput>{
                    typeId: metadata.type,
                    value: JSON.stringify(metadata)
                },
                logicalFrom: metadata.user,
                logicalTo: metadata.canSendTo
            };
        }

        return undefined;
    }

    async createEvents(typeTag:CreateTagInput, indexedTransaction:IndexedTransaction) {
        if (!typeTag.value) {
            this.logger.warning([], `Cannot create events from valueless Tags (typeId: ${typeTag.typeId}).`);
            return;
        }

        const involvedAddresses:string[] = [];
        switch (typeTag.typeId) {
            case InitDb.Type_Banking_Transfer:
                const transferMetadata:Type_Banking_Transfer_Data = JSON.parse(typeTag.value);
                involvedAddresses.push(transferMetadata.from);
                involvedAddresses.push(transferMetadata.to);
                break;
            case InitDb.Type_Banking_Trust:
                const trustMetadata:Type_Banking_Trust_Data = JSON.parse(typeTag.value);
                involvedAddresses.push(trustMetadata.user);
                involvedAddresses.push(trustMetadata.canSendTo);
                break;
        }

        const profiles = await prisma_ro.profile.findMany({
            where: {
                circlesAddress: {
                    in: involvedAddresses
                }
            }
        });

        const events: {
            type: EventType
            profileId: number
            createdAt: Date
            data: string
        }[] = [];

        profiles.forEach(o => {
            let eventType:EventType|undefined;
            switch (typeTag.typeId) {
                case InitDb.Type_Banking_Transfer:
                    const transferMetadata:Type_Banking_Transfer_Data = JSON.parse(typeTag.value ?? "{}");
                    eventType = o.circlesAddress?.toLowerCase() === transferMetadata.from.toLowerCase()
                        ? "PROFILE_OUTGOING_CIRCLES_TRANSACTION"
                        : "PROFILE_INCOMING_CIRCLES_TRANSACTION";

                    eventType = eventType === "PROFILE_INCOMING_CIRCLES_TRANSACTION"
                             && transferMetadata.from === "0x0000000000000000000000000000000000000000"
                        ? "PROFILE_INCOMING_UBI"
                        : eventType;

                    events.push({
                        type: eventType,
                        data: typeTag.value ?? "",
                        profileId: o.id,
                        createdAt: indexedTransaction.createdAt
                    });
                    break;
                case InitDb.Type_Banking_Trust:
                    const trustMetadata:Type_Banking_Trust_Data = JSON.parse(typeTag.value ?? "{}");
                    eventType = undefined;
                    if (trustMetadata.user === o.circlesAddress && trustMetadata.limit.gt(new BN("0"))) {
                        eventType = "PROFILE_INCOMING_TRUST";
                    }
                    if (trustMetadata.user === o.circlesAddress && trustMetadata.limit.eq(new BN("0"))) {
                        eventType = "PROFILE_INCOMING_TRUST_REVOKED";
                    }
                    if (trustMetadata.canSendTo === o.circlesAddress && trustMetadata.limit.gt(new BN("0"))) {
                        eventType = "PROFILE_OUTGOING_TRUST";
                    }
                    if (trustMetadata.canSendTo === o.circlesAddress && trustMetadata.limit.eq(new BN("0"))) {
                        eventType = "PROFILE_OUTGOING_TRUST_REVOKED";
                    }
                    if (!eventType) {
                        throw new Error(`Invalid state during creation of a 'trust' event.`);
                    }
                    events.push({
                        type: eventType,
                        data: typeTag.value ?? "",
                        profileId: o.id,
                        createdAt: indexedTransaction.createdAt
                    });
                    break;
            }
        });

        this.logger.info([], `Writing ${events.length} events to ${profiles.length} profiles ..`);

        await prisma_rw.event.createMany({
            data: events
        });

        this.logger.info([], `Wrote all events.`);
    }

    async persist(request:IndexTransactionRequest & {tags: Tag[]}, receipt:TransactionReceipt) {
        this.logger.debug([], `Writing receipt of ${request.transactionHash} to db ..`);

        const typeTag = this.classify(receipt);

        const now = new Date();
        const indexedTransaction = await prisma_rw.indexedTransaction.create({
            data: {
                transactionHash: request.transactionHash,
                from: receipt.from,
                to: receipt.to,
                logicalFrom: typeTag?.logicalFrom,
                logicalTo: typeTag?.logicalTo,
                createdAt: now,
                createdBy: {
                    connect: {
                        id: request.createdByProfileId
                    }
                },
                fromRequest: {
                    connect: {
                        id: request.id
                    }
                },
                contractAddress: receipt.contractAddress,
                transactionIndex: receipt.transactionIndex,
                blockNumber: receipt.blockNumber,
                blockHash: receipt.blockHash,
                gasUsed: receipt.gasUsed.toString(),
                cumulativeGasUsed: receipt.cumulativeGasUsed.toString(),
                logsBloom: receipt.logsBloom,
                root: null,
                status: "true",
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
                },
                typeTag: typeTag ? {
                    create: {
                        createdByProfileId: request.createdByProfileId,
                        createdAt: now,
                        typeId: typeTag.typeTag.typeId,
                        value: typeTag.typeTag.value,
                        isPrivate: false
                    }
                } : undefined,
            }
        });

        if (typeTag) {
            await this.createEvents(typeTag.typeTag, indexedTransaction);
        }

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