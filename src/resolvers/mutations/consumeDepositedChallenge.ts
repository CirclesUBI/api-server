import { PrismaClient } from "@prisma/client";
import {Context} from "../../context";
import {Client} from "../../auth-client/client";
import {newLogger} from "../../logger";

const logger = newLogger("/resolvers/mutations/consumeDepositChallenge.ts");

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
            const msg =`Couldn't find a deposited challenge with delegateAuthCode '${args.delegateAuthCode}'.`;
            logger.log(msg);
            throw new Error(msg)
        }
        if (!depositedChallenge.challengeValidTo || depositedChallenge.challengeValidTo <= now || depositedChallenge.challengedReadAt) {
            const msg =`The deposited challenge for delegateAuthCode '${args.delegateAuthCode}' isn't valid anymore.`;
            logger.log(msg);
            throw new Error(msg)
        }
        if (depositedChallenge.sessionId != session.sessionId) {
            const msg =`Deposited challenges must be read from the same session from which they've been requested.`;
            logger.log(msg);
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

        return {
            success: true,
            challenge: consumedChallenge.challenge
        }
    }
}