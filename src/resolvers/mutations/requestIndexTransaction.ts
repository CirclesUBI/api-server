import {PrismaClient} from "@prisma/client";
import {IndexTransactionRequest, MutationRequestIndexTransactionArgs} from "../../types";
import {Context} from "../../context";

export function requestIndexTransaction(prisma_rw:PrismaClient) {
    return async (parent:any, args:MutationRequestIndexTransactionArgs, context:Context) => {
        context.logger?.debug([{
            key: `call`,
            value: `/resolvers/mutation/indexTransaction.ts/requestIndexTransaction(prisma_ro:PrismaClient, prisma_rw:PrismaClient)/async (parent:any, args:MutationIndexTransactionArgs, context:Context)`
        }]);
        const session = await context.verifySession();
        const now = new Date();
        const indexTransactionRequest = await prisma_rw.indexTransactionRequest.create({
            data: {
                createdAt: now,
                createdByProfileId: session.profileId ?? -1,
                transactionIndex: args.data.transactionIndex,
                transactionHash: args.data.transactionHash,
                blockNumber: args.data.blockNumber,
                tags:{
                    createMany: {
                        data: args.data.tags?.map(tag => {
                            return {
                                createdByProfileId: session.profileId ?? -1,
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
        return <IndexTransactionRequest>{
            ...indexTransactionRequest,
            createdAt: indexTransactionRequest.createdAt.toJSON()
        };
    }
    /*
    return async (parent:any, args:MutationIndexTransactionArgs, context:Context) => {
        context.logger?.debug([{
            key: `call`,
            value: `/resolvers/mutation/indexTransaction.ts/indexTransaction(prisma_ro:PrismaClient, prisma_rw:PrismaClient)/async (parent:any, args:MutationIndexTransactionArgs, context:Context)`
        }]);
        const session = await context.verifySession();
        const now = new Date();
        const data ={
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
        };
        const indexedTransaction = await prisma_rw.indexedTransaction.create(data);
        context.logger?.debug([{
            key: `call`,
            value: `/resolvers/mutation/indexTransaction.ts/indexTransaction(prisma_ro:PrismaClient, prisma_rw:PrismaClient)/async (parent:any, args:MutationIndexTransactionArgs, context:Context)`
        }], `Created new indexed transaction ${indexedTransaction.id} for txHash ${indexedTransaction.transactionHash}`);

        return indexedTransaction;
        return <any>{};
    }
 */
}