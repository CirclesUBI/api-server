import {Context} from "../../context";
import {Session} from "../../session";
import {Environment} from "../../environment";

export function logout() {
    return async (parent: any, args: any, context: Context) => {
        const session = await context.verifySession();
        const loggedOutSession = await Session.logout(context, Environment.readWriteApiDb, session.sessionToken);
        context.setCookies.push({
            name: `session_${Environment.appId.replace(/\./g, "_")}`,
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