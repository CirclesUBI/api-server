import {Context} from "../../context";
import {Session} from "../../session";
import {PrismaClient} from "../../api-db/client";
import {Environment} from "../../environment";

export function logout(prisma_api_rw:PrismaClient) {
    return async (parent: any, args: any, context: Context) => {
        const session = await context.verifySession();
        const loggedOutSession = await Session.logout(context, prisma_api_rw, session.sessionToken);
        context.setCookies.push({
            name: "session",
            value: session.sessionToken,
            options: {
                domain: Environment.externalDomain,
                httpOnly: true,
                path: "/",
                sameSite: Environment.isLocalDebugEnvironment ? "Strict" : "None",
                secure: !Environment.isLocalDebugEnvironment,
                maxAge: 0,
                expires: loggedOutSession.endedAt
            }
        });

        return {
            success: true
        }
    }
}