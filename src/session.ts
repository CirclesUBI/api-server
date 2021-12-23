import {Client} from "./auth-client/client";
import crypto from "crypto";
import {Context} from "./context";
import {Session as PrismaSession, PrismaClient} from "./api-db/client";
import {RpcGateway} from "./rpcGateway";
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
        const result = await prisma.session.update({
            where: {
                sessionToken: sessionToken
            },
            data: {
                endedAt: new Date(),
                endReason: "logout"
            }
        });

        return result;
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
                challengeHash: ch
            }
        });
        if (!session?.challengeHash) {
            throw new Error(`Couldn't find the challenge.`);
        }

        const address = RpcGateway.get().eth.accounts.recover(challenge, signature);

        if (!this.verifySignature(session.ethAddress ?? "", challenge, signature)) {
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

    static async createSessionFromJWT(prisma:PrismaClient, context: Context)
    {
        if (!context.jwt || context.jwt.trim() == "") {
            throw new Error("No jwt was supplied");
        }

        const authClient = new Client(Environment.appId, Environment.acceptedIssuer);
        const tokenPayload = await authClient.verify(context.jwt);
        if (!tokenPayload)
        {
            throw new Error("Couldn't decode the supplied JWT.")
        }

        // Find an agent that matches the subject
        const profile = await prisma.profile.findFirst({where: { emailAddress: tokenPayload.sub}});

        const session = await prisma.session.create({
            data: {
                id: Session.generateRandomBase64String(8),
                profileId: profile?.id,
                issuedBy: tokenPayload.iss,
                createdAt: new Date(),
                validFrom: new Date(),
                maxLifetime: Environment.sessionLifetimeInSeconds,
                sessionToken: Session.generateRandomBase64String(64),
                emailAddress: tokenPayload.sub,
                jti: tokenPayload.jti
            }
        });

        return session;
    }

    static async assignProfile(sessionToken: string, profileId: number, context:Context) {
        await Environment.readWriteApiDb.session.update({
            where: {sessionToken: sessionToken},
            data: {profileId: profileId}
        });
    }
}
