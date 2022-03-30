import {Context} from "../../context";
import {Environment} from "../../environment";
import {Session as DBSession} from "../../api-db/client";
import {Session} from "../../session";

export function logout() {
    return async (parent: any, args: any, context: Context) => {
        let session:DBSession|null = null;
        try {
            session = await context.verifySession();
        } catch (e) {
        }
        if (session) {
            await Session.logout(context, Environment.readWriteApiDb, session.sessionToken);
        }
        context.setCookies.push({
            name: `session_${Environment.appId.replace(/\./g, "_")}`,
            value: "",
            options: {
                domain: Environment.externalDomain,
                httpOnly: true,
                path: "/",
                sameSite: Environment.isLocalDebugEnvironment ? "Strict" : "None",
                secure: !Environment.isLocalDebugEnvironment,
                maxAge: 0
            }
        });

        return {
            success: true
        }
    }
}