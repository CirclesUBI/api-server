import {Context} from "./context";
import {prisma_api_ro, prisma_api_rw} from "./apiDbClient";
import {Session, Profile} from "./api-db/client";

export const BIL_ORGA = "0xc5a786eafefcf703c114558c443e4f17969d9573";

export async function isBILMember(sessionInfo: {session: Session, profile: Profile | null}|null) {
  if (!sessionInfo)
    return false;
  if (!sessionInfo.profile?.circlesAddress)
    return false;

  const orga = await prisma_api_ro.profile.findFirst({
    where: {
      circlesAddress: BIL_ORGA,
      members: {
        some: {
          memberAddress: sessionInfo.profile.circlesAddress
        }
      }
    }
  });

  return !!orga;
}

/**
 *
 * @param context
 * @param accessedSafeAddress
 */
export async function canAccess(context:Context, accessedSafeAddress:string) {
  const callerInfo = await context.callerInfo;
  if (callerInfo?.profile?.circlesAddress == accessedSafeAddress) {
    return true;
  }

  // Could be that a user requests the data of an organisation
  // Check if the user is either admin or owner and grant access
  // if that's the case.
  const requestedProfile = await prisma_api_rw.profile.findMany({
    where: {
      circlesAddress: accessedSafeAddress,
      type: "ORGANISATION"
    },
    orderBy: {
      id: "desc"
    },
    include: {
      members: true /* {
        where: {
          isAdmin: true
        }
      }*/
    }
  });

  const orgaProfile = requestedProfile.length > 0 ? requestedProfile[0] : undefined;
  if (orgaProfile) {
    // Find out if the current user is an admin or owner ..
    if (orgaProfile.members.find(o => o.memberAddress == callerInfo?.profile?.circlesAddress)) {
      return true;
    }

    // TODO: Check ownership too
  }

  return false;
}