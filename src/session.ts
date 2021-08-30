import {Client} from "./auth-client/client";
import crypto from "crypto";
import {Context} from "./context";
import {Session as PrismaSession, PrismaClient} from "./api-db/client";

export class Session
{
    public static generateRandomBase64String(length:number)
    {
        return crypto.randomBytes(length).toString('base64').substr(0, length);
    }

    static async logout(context:Context, prisma:PrismaClient, sessionId:string)
    {
        const result = await prisma.session.update({
            where: {
                sessionId: sessionId
            },
            data: {
                endedAt: new Date(),
                endReason: "logout"
            }
        });

        context.logger?.debug([{
            key: "sessionId",
            value: sessionId
        },{
            key: `call`,
            value: `/session.ts/logout(sessionId:string)`
        }], "Logged out");

        return result;
    }

    static async findSessionBySessionId(prisma:PrismaClient, sessionId: string)
    {
        const session = await prisma.session.findUnique({
            where: {
                sessionId
            }
        });

        if (!session || session.endedAt)
        {
            return null;
        }

        const now = new Date();
        const expires = new Date(session.createdAt.getTime() + session.maxLifetime * 1000);

        if (expires.getTime() < now.getTime())
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
                sessionId: session.sessionId
            },
            data: {
                ...session,
                maxLifetime: session.maxLifetime + 10080
            }
        });
    }

    static async createSessionFromJWT(prisma:PrismaClient, context: Context)
    {
        if (!context.jwt || context.jwt.trim() == "") {
            context.logger?.error([{
                key: `call`,
                value: `/session.ts/createSessionFromJWT(prisma:PrismaClient, context: Context)`
            }], "No jwt was supplied");

            throw new Error("No jwt was supplied");
        }

        if (!process.env.APP_ID) {
            throw new Error('process.env.APP_ID is not set')
        }
        if (!process.env.ACCEPTED_ISSUER) {
            throw new Error('process.env.ACCEPTED_ISSUER is not set')
        }

        const authClient = new Client(process.env.APP_ID, process.env.ACCEPTED_ISSUER);
        const tokenPayload = await authClient.verify(context.jwt);
        if (!tokenPayload)
        {
            context.logger?.error([{
                key: `call`,
                value: `/session.ts/createSessionFromJWT(prisma:PrismaClient, context: Context)`
            }, {
                key: `jwt`,
                value: context.jwt
            }], "Couldn't decode the supplied JWT.");

            throw new Error("Couldn't decode the supplied JWT.")
        }

        // Find an agent that matches the subject
        const profile = await prisma.profile.findUnique({where: {emailAddress: tokenPayload.sub}});

        const session = await prisma.session.create({
            data: {
                profileId: profile?.id,
                issuedBy: tokenPayload.iss,
                createdAt: new Date(),
                maxLifetime: process.env.SESSION_LIIFETIME ? parseInt(process.env.SESSION_LIIFETIME) : 60 * 60 * 24 * 30,
                sessionId: Session.generateRandomBase64String(64),
                emailAddress: tokenPayload.sub,
                jti: tokenPayload.jti
            }
        });

        context.logger?.debug([{
            key: `call`,
            value: `/session.ts/createSessionFromJWT(prisma:PrismaClient, context: Context)`
        }], "New session", {
            createdAt: session.createdAt,
            profileId: session.profileId,
            issuedBy: session.issuedBy,
            maxLifetime: session.maxLifetime,
            jti: session.jti
        });

        return session;
    }

    static async assignProfile(prisma_api_rw:PrismaClient, sessionId: string, profileId: number, context:Context) {
        context.logger?.debug([{
            key: `call`,
            value: `/session.ts/assignProfile(prisma_api_rw:PrismaClient, sessionId: string, profileId: number, context:Context)`
        }]);
        await prisma_api_rw.session.update({
            where: {sessionId: sessionId},
            data: {profileId: profileId}
        });
    }
}
