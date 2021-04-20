import { PrismaClient } from "@prisma/client";
import {Context} from "../../context";
import {Client} from "../../auth-client/client";

export function depositChallengeResolver(prisma:PrismaClient) {
    return async (parent: any, args:{jwt:string}, context: Context) => {
        if (!process.env.APP_ID) {
            throw new Error('process.env.APP_ID is not set')
        }
        if (!process.env.ACCEPTED_ISSUER) {
            throw new Error('process.env.ACCEPTED_ISSUER is not set')
        }

        const now = new Date();

        const authClient = new Client(process.env.APP_ID, process.env.ACCEPTED_ISSUER);
        const tokenPayload = await authClient.verify(args.jwt);
        if (!tokenPayload)
        {
            throw new Error("Couldn't decode the supplied JWT.")
        }

        if (!tokenPayload.challenge || !tokenPayload.challengeValidTo) {
            throw new Error(`The supplied jwt is not a valid delegated challenge.`)
        }

        const delegatedChallengeRequest = await prisma.delegatedChallenges.findUnique({where: {delegateAuthCode: tokenPayload.sub}});
        if (!delegatedChallengeRequest) {
            throw new Error(`Couldn't find a delegated challenge request with code '${tokenPayload.sub}'.`)
        }
        if (delegatedChallengeRequest.requestValidTo < now) {
            throw new Error(`The delegated challenge request with the id ${delegatedChallengeRequest.id} already timed out when the auth-service wanted to deposit the challenge.`);
        }

        await prisma.delegatedChallenges.update({
            where: {
                delegateAuthCode: tokenPayload.sub
            },
            data: {
                challengeDepositedAt: now,
                challenge: tokenPayload.challenge,
                challengeValidTo: new Date(tokenPayload.challengeValidTo)
            }
        });

        return {
            success: true
        }
    }
}