export const empty = true;
/*import {IndexTransactionRequest, MutationRequestIndexTransactionArgs} from "../../types";
import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";

export function requestIndexTransaction(prisma_api_rw:PrismaClient) {
    return async (parent:any, args:MutationRequestIndexTransactionArgs, context:Context) => {
        context.logger?.info([{
            key: `call`,
            value: `/resolvers/mutation/indexTransaction.ts/requestIndexTransaction(prisma_api_ro:PrismaClient, prisma_api_rw:PrismaClient)/async (parent:any, args:MutationIndexTransactionArgs, context:Context)`
        }]);
        const session = await context.verifySession();
        const now = new Date();
        const indexTransactionRequest = await prisma_api_rw.indexTransactionRequest.create({
            data: {
                createdAt: now,
                createdByProfileId: session.profileId ?? -1,
                transactionHash: args.data.transactionHash,
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
}**/