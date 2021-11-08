import {Context} from "../../context";
import {SessionInfo} from "../../types";
import {prisma_api_rw} from "../../apiDbClient";
import {Profile} from "../../api-db/client";

export const sessionInfo = async (parent:any, args:any, context:Context) : Promise<SessionInfo> => {
    try {
        const session = await context.verifySession();
        let profile: Profile|null = null;
        if (session.profileId) {
            profile = await prisma_api_rw.profile.findUnique({where:{id: session.profileId}});
        }

        context.logger?.info([{
            key: `call`,
            value: `/resolvers/queries/sessionInfo.ts/async (parent:any, args:any, context:Context)`
        }], `Session valid until ${new Date(new Date(session.createdAt).getTime() + session.maxLifetime).toJSON()}`);

        return {
            isLoggedOn: true,
            hasProfile: !!session.profileId,
            profileId: session.profileId,
            profile: profile,
            lastAcknowledgedAt: profile?.lastAcknowledged?.toJSON()
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