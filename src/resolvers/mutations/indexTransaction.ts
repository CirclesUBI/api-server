import {PrismaClient} from "@prisma/client";
import {MutationIndexTransactionArgs} from "../../types";
import {Context} from "../../context";

export function indexTransaction(prisma_rw:PrismaClient) {
    return async (parent:any, args:MutationIndexTransactionArgs, context:Context) => {
        context.logger?.debug([{
            key: `call`,
            value: `/resolvers/mutation/indexTransaction.ts/indexTransaction(prisma_ro:PrismaClient, prisma_rw:PrismaClient)/async (parent:any, args:MutationIndexTransactionArgs, context:Context)`
        }]);
        const session = await context.verifySession();


        const now = new Date();
        const indexedTransaction = await prisma_rw.indexedTransaction.create({
            data: {
                transactionHash: args.data.transactionHash,
                from: args.data.from,
                createdAt: now,
                createdByProfileId: session.profileId ?? 0,
                contractAddress: args.data.contractAddress,
                transactionIndex: args.data.transactionIndex,
                to: args.data.to,
                blockNumber: args.data.blockNumber,
                blockHash: args.data.blockHash,
                gasUsed: args.data.gasUsed,
                confirmations: args.data.confirmations,
                cumulativeGasUsed: args.data.cumulativeGasUsed,
                logsBloom: args.data.logsBloom,
                root: args.data.root,
                status: args.data.status,
                logs: {
                    createMany: {
                        data: args.data.logs?.map(log => {
                            return {
                                data: log.data,
                                transactionIndex: log.transactionIndex,
                                blockHash: log.blockHash,
                                transactionHash: log.transactionHash,
                                blockNumber: log.blockNumber,
                                logIndex: log.logIndex,
                                address: log.address,
                                removed: log.removed,
                                topics: log.topics
                            }
                        }) ?? []
                    }
                },
                tags: {
                    createMany: {
                        data: args.data.tags?.map(tag => {
                            return {
                                createdByProfileId: session.profileId ?? 0,
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
        context.logger?.debug([{
            key: `call`,
            value: `/resolvers/mutation/indexTransaction.ts/indexTransaction(prisma_ro:PrismaClient, prisma_rw:PrismaClient)/async (parent:any, args:MutationIndexTransactionArgs, context:Context)`
        }], `Created new indexed transaction ${indexedTransaction.id}`);

        return indexedTransaction;
    }
}