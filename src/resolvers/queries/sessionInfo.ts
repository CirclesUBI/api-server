import {Context} from "../../context";
import {CapabilityType, SessionInfo} from "../../types";
import {ProfileLoader} from "../../querySources/profileLoader";
import {isBALIMember, isBILMember} from "../../utils/canAccess";
import {Environment} from "../../environment";
import {Erc721BalancesSource} from "../../querySources/aggregateSources/blockchain/erc721BalancesSource";

export async function getCapabilities(callerInfo:any) {
    const capabilities = [];
    const isBilMember = await isBILMember(callerInfo?.profile?.circlesAddress);
    if (isBilMember) {
        capabilities.push({
            type: CapabilityType.Verify
        });
        capabilities.push({
            type: CapabilityType.Translate
        });
        capabilities.push({
            type: CapabilityType.PreviewFeatures
        });
    }

    if (callerInfo?.profile?.circlesAddress) {
        const acidPunks = await Erc721BalancesSource.getHoldingsOfSafe(
          Environment.acidPunksNft.address,
          callerInfo?.profile?.circlesAddress, true);

        const tickets = await Environment.readonlyApiDb.invoice.findFirst({
            where: {
                customerProfileId: callerInfo.profile.id,
                deliveryMethodId: 3
            }
        });

        if (acidPunks.length > 0 || tickets) {
            capabilities.push({
                type: CapabilityType.Tickets
            });
        }
    }

    const isBaliMember = await isBALIMember(callerInfo?.profile?.circlesAddress);
    if (isBaliMember) {
        capabilities.push({
            type: CapabilityType.PreviewFeatures
        });
    }

    capabilities.push({
        type: CapabilityType.Invite
    });

    return capabilities;
}

export const sessionInfo = async (parent:any, args:any, context:Context) : Promise<SessionInfo> => {
    try {
        const callerInfo = await context.callerInfo;
        const capabilities = await getCapabilities(callerInfo);

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
            capabilities: capabilities,
            useShortSignup: useShortSignup
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
