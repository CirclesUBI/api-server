import {Context} from "../../context";
import {CapabilityType, SessionInfo} from "../../types";
import {Profile} from "../../api-db/client";
import {ProfileLoader} from "../../querySources/profileLoader";
import {isBILMember} from "../../utils/canAccess";
import {Environment} from "../../environment";
import {claimInviteCodeFromCookie} from "../mutations/upsertProfile";

export const init = async (parent:any, args:any, context:Context) : Promise<SessionInfo> => {
    try {
        const callerInfo = await context.callerInfo;
        const capabilities = [];

        const isBilMember = await isBILMember(callerInfo?.profile?.circlesAddress);
        if (isBilMember) {
            capabilities.push({
                type: CapabilityType.Verify
            });
        }

        capabilities.push({
            type: CapabilityType.Invite
        });

        await claimInviteCodeFromCookie(context);

        return {
            isLoggedOn: true,
            hasProfile: !!callerInfo?.profile,
            profileId: callerInfo?.profile?.id,
            profile: callerInfo?.profile ? ProfileLoader.withDisplayCurrency(callerInfo.profile) : null,
            // lastAcknowledgedAt: callerInfo?.profile?.lastAcknowledged?.toJSON(),
            capabilities: capabilities
        }
    } catch(e) {
        context.log(JSON.stringify(e));

        // When the session is invalid, make sure that the user doesn't keep the cookie
        const expires = new Date();
        /// See https://www.npmjs.com/package/apollo-server-plugin-http-headers for the magic that happens below ;)
        context.setCookies.push({
            name: `session_${Environment.appId.replace(/\./g, "_")}`,
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