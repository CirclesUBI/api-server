export const empty = true;
/*
import {QueryTransactionsArgs} from "../../types";
import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";

export function transactions(prisma:PrismaClient) {
    return async (parent: any, args: QueryTransactionsArgs, context:Context) => {
        


        const session = await context.verifySession();
        const profile = await prisma.profile.findUnique({where:{ emailAddress: session.emailAddress }});

        if (!profile || !profile?.circlesAddress){
            return [];
        }

        // Find all transaction which concern "me" in the specified blocks ..
        const foundTransactions = await prisma.indexedTransaction.findMany({
            where: {
                blockNumber: {
                    lte: args.query?.toBlockNo ?? undefined,
                    gte: args.query?.fromBlockNo ?? undefined
                },
                OR:[{
                    logicalFrom: profile.circlesAddress
                }, {
                    logicalTo: profile.circlesAddress
                }]
            },
            include: {
                tags: true,
                logs: true
            }
        });

        return foundTransactions.map(o => {
            return {
                ...o,
            }
        });
    }
}*/