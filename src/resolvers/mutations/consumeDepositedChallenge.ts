import { PrismaClient } from "@prisma/client";
import {Context} from "../../context";

export function consumeDepositedChallengeResolver(prisma:PrismaClient) {
    return async (parent: any, args:{delegateAuthCode:string}, context: Context) => {
        context.logger?.info([{
            key: `call`,
            value: `/resolvers/mutation/consumeDepositedChallenge.ts/consumeDepositedChallengeResolver(prisma:PrismaClient)/async (parent: any, args: {delegateAuthCode:string}, context: Context)`
        }]);
        const session = await context.verifySession();

        const depositedChallenge = await prisma.delegatedChallenges.findUnique({
            where: {
                delegateAuthCode: args.delegateAuthCode
            }
        });

        const now = new Date();

        if (!depositedChallenge) {
            const msg =`Couldn't find a deposited challenge with delegateAuthCode '${args.delegateAuthCode}'.`;
            context.logger?.error([{
                key: `call`,
                value: `/resolvers/mutation/consumeDepositedChallenge.ts/consumeDepositedChallengeResolver(prisma:PrismaClient)/async (parent: any, args: any, context: Context)`
            }], msg);
            throw new Error(msg)
        }
        if (!depositedChallenge.challengeValidTo || depositedChallenge.challengeValidTo <= now || depositedChallenge.challengedReadAt) {
            const msg =`The deposited challenge for delegateAuthCode '${args.delegateAuthCode}' isn't valid anymore.`;
            context.logger?.error([{
                key: `call`,
                value: `/resolvers/mutation/consumeDepositedChallenge.ts/consumeDepositedChallengeResolver(prisma:PrismaClient)/async (parent: any, args: any, context: Context)`
            }], msg);
            throw new Error(msg)
        }
        if (depositedChallenge.sessionId != session.sessionId) {
            const msg =`Deposited challenges must be read from the same session from which they've been requested.`;
            context.logger?.error([{
                key: `call`,
                value: `/resolvers/mutation/consumeDepositedChallenge.ts/consumeDepositedChallengeResolver(prisma:PrismaClient)/async (parent: any, args: any, context: Context)`
            }], msg);
            throw new Error(msg)
        }

        const consumedChallenge = await prisma.delegatedChallenges.update({
            where: {
                delegateAuthCode: args.delegateAuthCode
            },
            data: {
                challengedReadAt: now
            }
        })

        context.logger?.debug([{
            key: `call`,
            value: `/resolvers/mutation/consumeDepositedChallenge.ts/consumeDepositedChallengeResolver(prisma:PrismaClient)/async (parent: any, args: any, context: Context)`
        }], `consumed challenge`);

        return {
            success: true,
            challenge: consumedChallenge.challenge
        }
    }
}