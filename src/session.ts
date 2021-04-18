import {Client} from "./auth-client/client";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

export class Session
{
    static generateRandomBase64String(length:number)
    {
        return crypto.randomBytes(length).toString('base64').substr(0, length);
    }

    static async logoout(prisma:PrismaClient, sessionIs:string)
    {
        return await prisma.session.update({
            where: {
                sessionId: sessionIs
            },
            data: {
                endedAt: new Date(),
                endReason: "logout"
            }
        });
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

    static async createSessionFromJWT(prisma:PrismaClient, jwt: string)
    {
        if (!jwt || jwt.trim() == "") {
            throw new Error("No jwt was supplied");
        }

        if (!process.env.APP_ID) {
            throw new Error('process.env.APP_ID is not set')
        }

        if (!process.env.ACCEPTED_ISSUER) {
            throw new Error('process.env.ACCEPTED_ISSUER is not set')
        }
        const authority = {
            appId: process.env.APP_ID,
            issuer:  process.env.ACCEPTED_ISSUER,
        };

        const authClient = new Client(authority.appId, authority.issuer);
        const tokenPayload = await authClient.verify(jwt);
        if (!tokenPayload)
        {
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
                emailAddress: tokenPayload.sub
            }
        });

        return session;
    }
}
