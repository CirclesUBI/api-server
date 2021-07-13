import {PrismaClient} from "@prisma/client";
import {QueryTransactionsArgs} from "../../types";
import {Context} from "../../context";

export function transactions(prisma:PrismaClient) {
    return async (parent: any, args: QueryTransactionsArgs, context:Context) => {
        context.logger?.info([{
            key: `call`,
            value: `/resolvers/queries/transactions.ts/transactions(prisma:PrismaClient)/async (parent: any, args: QueryTransactionsArgs, context:Context)`
        }]);

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
                    from: profile.circlesAddress
                }, {
                    to: profile.circlesAddress
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
}