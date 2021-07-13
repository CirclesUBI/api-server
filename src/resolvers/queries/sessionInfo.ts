import {Context} from "../../context";
import {SessionInfo} from "../../types";

export const sessionInfo = async (parent:any, args:any, context:Context) : Promise<SessionInfo> => {
    try {
        const session = await context.verifySession();

        context.logger?.info([{
            key: `call`,
            value: `/resolvers/queries/sessionInfo.ts/async (parent:any, args:any, context:Context)`
        }], `Session valid until ${new Date(new Date(session.createdAt).getTime() + session.maxLifetime).toJSON()}`);

        return {
            isLoggedOn: true,
            hasProfile: !!session.profileId,
            profileId: session.profileId
        }
    } catch(e) {
        context.logger?.error([{
            key: `call`,
            value: `/resolvers/queries/sessionInfo.ts/async (parent:any, args:any, context:Context)`
        }], `No valid session.`, e);

        // When the session is invalid, make sure that the user doesn't keep the cookie
        const expires = new Date();
        /// See https://www.npmjs.com/package/apollo-server-plugin-http-headers for the magic that happens below ;)
        context.setCookies.push({
            name: "session",
            value: "no-session",
            options: {
                domain: process.env.EXTERNAL_DOMAIN,
                httpOnly: true,
                path: "/",
                sameSite: process.env.DEBUG ? "Strict" : "None",
                secure: !process.env.DEBUG,
                expires: expires
            }
        });

        return {
            isLoggedOn: false
        }
    }
}