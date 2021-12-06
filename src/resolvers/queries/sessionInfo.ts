import {Context} from "../../context";
import {CapabilityType, SessionInfo} from "../../types";
import {prisma_api_rw} from "../../apiDbClient";
import {Profile} from "../../api-db/client";
import {ProfileLoader} from "../../profileLoader";
import {isBILMember} from "../../canAccess";
import {Environment} from "../../environment";

export const sessionInfo = async (parent:any, args:any, context:Context) : Promise<SessionInfo> => {
    try {
        const callerInfo = await context.callerInfo;
        //const session = await context.verifySession();
        let profile: Profile|null = null;
        if (callerInfo?.session.profileId) {
            profile = await prisma_api_rw.profile.findUnique({
                where:{
                    id: callerInfo.session.profileId
                }
            });
        }

        const capabilities = [];

        const isBilMember = await isBILMember(callerInfo);
        if (isBilMember) {
            capabilities.push({
                type: CapabilityType.Invite
            }, {
                type: CapabilityType.Verify
            });
        }

        return {
            isLoggedOn: true,
            hasProfile: !!callerInfo?.profile,
            profileId: callerInfo?.profile?.id,
            profile: profile ? ProfileLoader.withDisplayCurrency(profile) : null,
            lastAcknowledgedAt: profile?.lastAcknowledged?.toJSON(),
            capabilities: capabilities
        }
    } catch(e) {
        context.log(JSON.stringify(e));

        // When the session is invalid, make sure that the user doesn't keep the cookie
        const expires = new Date();
        /// See https://www.npmjs.com/package/apollo-server-plugin-http-headers for the magic that happens below ;)
        context.setCookies.push({
            name: "session",
            value: "no-session",
            options: {
                domain: Environment.externalDomain,
                httpOnly: true,
                path: "/",
                sameSite: Environment.isLocalDebugEnvironment ? "Strict" : "None",
                secure: !Environment.isLocalDebugEnvironment,
                expires: expires
            }
        });

        return {
            isLoggedOn: false,
            capabilities: []
        }
    }
}