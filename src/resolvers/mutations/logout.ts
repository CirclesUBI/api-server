import {Context} from "../../context";
import {Session} from "../../session";
import {PrismaClient} from "../../api-db/client";

export function logout(prisma_api_rw:PrismaClient) {
    return async (parent: any, args: any, context: Context) => {
        try {
            context.logger?.info([{
                key: `call`,
                value: `/resolvers/mutation/logout.ts/logout(prisma:PrismaClient)/async (parent: any, args: any, context: Context)`
            }]);
            const session = await context.verifySession();
            const loggedOutSession = await Session.logout(context, prisma_api_rw, session.sessionId);
            context.setCookies.push({
                name: "session",
                value: session.sessionId,
                options: {
                    domain: process.env.EXTERNAL_DOMAIN,
                    httpOnly: true,
                    path: "/",
                    sameSite: process.env.DEBUG ? "Strict" : "None",
                    secure: !process.env.DEBUG,
                    maxAge: 0,
                    expires: loggedOutSession.endedAt
                }
            });

            return {
                success: true
            }
        } catch (e) {
            context.logger?.error([{
                key: `call`,
                value: `/resolvers/mutation/logout.ts/logout(prisma:PrismaClient)/async (parent: any, args: any, context: Context)`
            }], e);

            return {
                success: false,
                errorMessage: "Couldn't create the session cookie from the supplied JWT. Please try again with a new JWT."
            }
        }
    }
}