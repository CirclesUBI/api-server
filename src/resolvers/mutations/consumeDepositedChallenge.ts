import { PrismaClient } from "@prisma/client";
import {Context} from "../../context";
import {Client} from "../../auth-client/client";

export function consumeDepositedChallengeResolver(prisma:PrismaClient) {
    return async (parent: any, args:{delegateAuthCode:string}, context: Context) => {
        const session = await context.verifySession();

        const depositedChallenge = await prisma.delegatedChallenges.findUnique({
            where: {
                delegateAuthCode: args.delegateAuthCode
            }
        });

        const now = new Date();

        if (!depositedChallenge) {
            throw new Error(`Couldn't find a deposited challenge with delegateAuthCode '${args.delegateAuthCode}'.`);
        }
        if (!depositedChallenge.challengeValidTo || depositedChallenge.challengeValidTo <= now || depositedChallenge.challengedReadAt) {
            throw new Error(`The deposited challenge for delegateAuthCode '${args.delegateAuthCode}' isn't valid anymore.`);
        }
        if (depositedChallenge.sessionId != session.sessionId) {
            throw new Error(`Deposited challenges must be read from the same session from which they've been requested.`);
        }

        const consumedChallenge = await prisma.delegatedChallenges.update({
            where: {
                delegateAuthCode: args.delegateAuthCode
            },
            data: {
                challengedReadAt: now
            }
        })

        return {
            success: true,
            challenge: consumedChallenge.challenge
        }
    }
}