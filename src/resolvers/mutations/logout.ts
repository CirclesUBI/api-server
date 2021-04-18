import { PrismaClient } from "@prisma/client";
import {Context} from "../../context";
import {Session} from "../../session";

export function logout(prisma_rw:PrismaClient) {
    return async (parent: any, args: any, context: Context) => {
        try {
            const session = await context.verifySession();
            const loggedOutSession = await Session.logoout(prisma_rw, session.sessionId);
            /// See https://www.npmjs.com/package/apollo-server-plugin-http-headers for the magic that happens below ;)
            context.setCookies.push({
                name: "session",
                value: session.sessionId,
                options: {
                    domain: process.env.EXTERNAL_DOMAIN,
                    httpOnly: true,
                    path: "/",
                    sameSite: false,
                    secure: !process.env.DEBUG,
                    expires: loggedOutSession.endedAt
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