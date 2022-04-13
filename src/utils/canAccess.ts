import {Context} from "../context";
import {Session, Profile} from "../api-db/client";
import {Environment} from "../environment";

export async function isBILMember(circlesAddress?:string|null) {
  if (!circlesAddress)
    return false;

  const orga = await Environment.readonlyApiDb.profile.findFirst({
    where: {
      circlesAddress: Environment.operatorOrganisationAddress,
      members: {
        some: {
          memberAddress: circlesAddress
        }
      }
    }
  });

  return !!orga;
}

export async function isBALIMember(circlesAddress?:string|null) {
  if (!circlesAddress)
    return false;

  const orga = await Environment.readonlyApiDb.profile.findFirst({
    where: {
      circlesAddress: "0xdf5b1ea0aa4117770779fd46a7aa237c4dc0bdbd",
      members: {
        some: {
          memberAddress: circlesAddress
        }
      }
    }
  });

  return !!orga;
}

export async function canAccess(context:Context, accessedSafeAddress:string) {
  const callerInfo = await context.callerInfo;
  if (callerInfo?.profile?.circlesAddress == accessedSafeAddress) {
    return true;
  }

  const requestedProfile = await Environment.readWriteApiDb.profile.findMany({
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
    if (orgaProfile.members.find(o => o.memberAddress == callerInfo?.profile?.circlesAddress)) {
      return true;
    }

    // TODO: Check ownership too
  }

  return false;
}