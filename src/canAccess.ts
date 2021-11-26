import {Context} from "./context";
import {prisma_api_rw} from "./apiDbClient";

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