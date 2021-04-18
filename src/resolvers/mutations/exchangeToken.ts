import {Session} from "../../session";
import { PrismaClient } from "@prisma/client";
import {Context} from "../../context";

export function exchangeTokenResolver(prisma:PrismaClient) {
    return async (parent: any, args: any, context: Context) => {
        if (!context.jwt) {
            throw new Error("No authorization header");
        }
        try {
            const session = await Session.createSessionFromJWT(prisma, context.jwt);

            /// See https://www.npmjs.com/package/apollo-server-plugin-http-headers for the magic that happens below ;)
            context.setCookies.push({
                name: "session",
                value: session.sessionId,
                options: {
                    domain: process.env.EXTERNAL_DOMAIN,
                    httpOnly: true,
                    path: "/",
                    sameSite: "None",
                    secure: !process.env.DEBUG,
                    expires: new Date(Date.now() + session.maxLifetime * 1000)
                }
            });

            return {
                success: true
            }
        } catch (e) {
            console.error(e);
            return {
                success: false,
                errorMessage: "Couldn't create the session cookie from the supplied JWT. Please try again with a new JWT."
            }
        }
    }
}