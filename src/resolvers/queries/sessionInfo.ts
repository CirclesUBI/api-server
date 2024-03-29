import { Context } from "../../context";
import { CapabilityType, SessionInfo } from "../../types";
import { ProfileLoader } from "../../querySources/profileLoader";
import { isTranslator, isBALIMember, isBILMember, isHumanodeVerified, isOrgaOwner } from "../../utils/canAccess";
import { Environment } from "../../environment";

export async function getCapabilities(callerInfo: any) {
  const capabilities = [];

  const checkPromises = await Promise.all([
    await isBILMember(callerInfo?.profile?.circlesAddress),
    await isBALIMember(callerInfo?.profile?.circlesAddress),
    await isHumanodeVerified(callerInfo?.profile?.circlesAddress),
    await isOrgaOwner(callerInfo?.profile?.circlesAddress),
    await isTranslator(callerInfo?.profile?.circlesAddress),
  ]);

  const isBilMember = checkPromises[0];
  const isBaliMember = checkPromises[1];
  const humanodeVerified = checkPromises[2];
  const isOrgaAdmin = checkPromises[3];
  const canTranslate = checkPromises[4];

  if (isBilMember) {
    capabilities.push({
      type: CapabilityType.Verify,
    });
  }

  if (canTranslate) {
    capabilities.push({
      type: CapabilityType.Translate,
    });
  }

  capabilities.push({
    type: CapabilityType.PreviewFeatures,
  });

  if (humanodeVerified) {
    capabilities.push({
      type: CapabilityType.VerifiedByHumanode,
    });
  }

  if (isOrgaAdmin) {
    capabilities.push({
      type: CapabilityType.Invite,
    });
  }

  return capabilities;
}

export const sessionInfo = async (parent: any, args: any, context: Context): Promise<SessionInfo> => {
  try {
    const callerInfo = await context.callerInfo;
    const capabilities = await getCapabilities(callerInfo);

    const invitation = await Environment.readWriteApiDb.invitation.findFirst({
      where: {
        redeemedByProfileId: callerInfo?.profile?.id,
      },
      include: {
        createdBy: true,
      },
    });

    const useShortSignup: boolean | undefined =
      !!invitation && invitation.createdBy.circlesAddress == Environment.gorilloOrgaSafeAddress;
    return {
      isLoggedOn: true,
      hasProfile: !!callerInfo?.profile,
      profileId: callerInfo?.profile?.id,
      profile: callerInfo?.profile ? ProfileLoader.withDisplayCurrency(callerInfo.profile) : null,
      sessionId: callerInfo?.session.id,
      capabilities: capabilities,
      useShortSignup: useShortSignup,
    };
  } catch (e) {
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
          expires: expires,
        },
      });
    });

    return {
      isLoggedOn: false,
      capabilities: [],
    };
  }
};
