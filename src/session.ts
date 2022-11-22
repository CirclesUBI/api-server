import crypto from "crypto";
import {Context} from "./context";
import {PrismaClient, Session as PrismaSession} from "./api-db/client";
import {RpcGateway} from "./circles/rpcGateway";
import {Environment} from "./environment";

export class Session
{
    public static generateRandomBase64String(length:number)
    {
        return crypto.randomBytes(length).toString('base64').substr(0, length);
    }
    public static generateRandomHexString(length:number)
    {
        return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').substr(0, length);
    }

    static async logout(context:Context, prisma:PrismaClient, sessionToken:string)
    {
        return await prisma.session.update({
            where: {
                sessionToken: sessionToken
            },
            data: {
                endedAt: new Date(),
                endReason: "logout"
            }
        });
    }

    static async findSessionBysessionToken(prisma:PrismaClient, sessionToken: string)
    {
        const session = await prisma.session.findUnique({
            where: {
                sessionToken
            }
        });

        if (!session || session.endedAt)
        {
            return null;
        }

        const now = new Date();
        const expires = new Date(session.createdAt.getTime() + session.maxLifetime * 1000);

        if (expires.getTime() < now.getTime() || !session.validFrom || session.validFrom.getTime() > now.getTime())
        {
            return null;
        }

        return session;
    }

    static async extendSession(prisma:PrismaClient, session: PrismaSession) {

        const endsAt = session.createdAt.getTime() + session.maxLifetime;
        if (endsAt > Date.now() + 604800) {
            // Over one week left
            return;
        }

        //
        await prisma.session.update({
            where: {
                sessionToken: session.sessionToken
            },
            data: {
                ...session,
                maxLifetime: session.maxLifetime + 10080
            }
        });
    }
    static async requestSessionFromSignature(prisma:PrismaClient, address:string) {
        if (!RpcGateway.get().utils.isAddress(address)) {
            throw new Error(`The given value is not an address`);
        }

        const challenge = Session.generateRandomBase64String(64);
        const ch = RpcGateway.get().utils.sha3(challenge);

        await prisma.session.create({
            data: {
                id: Session.generateRandomBase64String(8),
                ethAddress: address.toLowerCase(),
                createdAt: new Date(),
                issuedBy: Environment.appId,
                maxLifetime: Environment.sessionLifetimeInSeconds,
                sessionToken: Session.generateRandomBase64String(64),
                challengeHash: ch
            }
        });

        return challenge;
    }

    public static verifySignature(senderAddress:string, data:string, signature:string) {
        const address = RpcGateway.get().eth.accounts.recover(data, signature);
        return address.toLowerCase() == senderAddress.toLowerCase();
    }

    static async createSessionFromSignature(prisma:PrismaClient, challenge:string, signature:string)
    {
        const ch = RpcGateway.get().utils.sha3(challenge);
        if (!ch)
            throw new Error(`Couldn't hash the challenge.`);

        const session = await prisma.session.findFirst({
            where: {
                challengeHash: ch,
                validFrom: null
            }
        });
        if (!session?.challengeHash) {
            throw new Error(`Couldn't find the challenge.`);
        }

        if (!this.verifySignature(session.ethAddress ?? "", ch, signature)) {
            await prisma.session.updateMany({
                where: {
                    challengeHash: ch
                },
                data: {
                    endedAt: new Date()
                }
            });

            throw new Error(`The signature doesn't belong to the given address`);
        }

        const profile = await prisma.profile.findFirst({
            where: {
                circlesSafeOwner: session.ethAddress?.toLowerCase()
            },
            orderBy: {
                id: "desc"
            }
        });

        await prisma.session.updateMany({
            where: {
                challengeHash: ch
            },
            data: {
                validFrom: new Date(),
                profileId: profile?.id
            }
        });

        return session;
    }

    static async assignProfile(sessionToken: string, profileId: number) {
        await Environment.readWriteApiDb.session.update({
            where: {sessionToken: sessionToken},
            data: {profileId: profileId}
        });
    }
}
