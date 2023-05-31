import {Context} from "../../context";
import {SessionInfo} from "../../types";
import {ProfileLoader} from "../../querySources/profileLoader";
import {Environment} from "../../environment";
import {claimInviteCodeFromCookie} from "../mutations/upsertProfile";
import {getCapabilities} from "./sessionInfo";

export const init = async (parent:any, args:any, context:Context) : Promise<SessionInfo> => {
    try {
        const callerInfo = await context.callerInfo;
        const capabilities = await getCapabilities(callerInfo);

        await claimInviteCodeFromCookie(context);

        let useShortSignup: boolean|undefined = undefined;

        //if (!callerInfo?.profile?.firstName && callerInfo?.profile?.id) {
        // Profile not completed
            const invitation = await Environment.readWriteApiDb.invitation.findFirst({
                where: {
                    redeemedByProfileId: callerInfo?.profile?.id
                },
                include: {
                    createdBy: true
                }
            });

            // TODO: Don't hardcode orga-addresses
            useShortSignup = !!invitation && invitation.createdBy.circlesAddress == "0xf9342ea6f2585d8c2c1e5e78b247ba17c32af46a";
        //}

        return {
            isLoggedOn: true,
            hasProfile: !!callerInfo?.profile,
            profileId: callerInfo?.profile?.id,
            profile: callerInfo?.profile ? ProfileLoader.withDisplayCurrency(callerInfo.profile) : null,
            // lastAcknowledgedAt: callerInfo?.profile?.lastAcknowledged?.toJSON(),
            capabilities: capabilities,
            useShortSignup: useShortSignup
        }
    } catch(e) {
        context.log(JSON.stringify(e));

        // When the session is invalid, make sure that the user doesn't keep the cookie
        const expires = new Date();
        /// See https://www.npmjs.com/package/apollo-server-plugin-http-headers for the magic that happens below ;)

        Environment.externalDomains.forEach((externalDomain) => {
            context.setCookies.push({
                name: `session_${externalDomain.replace(/\./g, "_")}`,
                value: "no-session",
                options: {
                    domain: externalDomain,
                    httpOnly: true,
                    path: "/",
                    sameSite: Environment.isLocalDebugEnvironment ? "Strict" : "None",
                    secure: !Environment.isLocalDebugEnvironment,
                    expires: expires
                }
            });
        });

        return {
            isLoggedOn: false,
            capabilities: []
        }
    }
}
