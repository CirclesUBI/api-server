import {MutationAddMemberArgs, Profile} from "../../types";
import {Context} from "../../context";
import {prisma_api_rw} from "../../apiDbClient";

export async function findGroup(groupId: number|string, callerInfo: Profile) {
  const where = Number.isInteger(groupId)
    ? {
      id: groupId
    }
    : {
      circlesAddress: groupId
    };

  const groupProfiles = await prisma_api_rw.profile.findMany({
    where: {
      ...<any>where
    },
    include: {
      members: {
        where: {
          memberAddress: callerInfo.circlesAddress ?? "not",
          isAdmin: true
        }
      }
    }
  });

  if (groupProfiles.length != 1) {
    throw new Error(`Couldn't find a group with id or address ${groupId}.`);
  }

  return groupProfiles[0];
}

export const addMemberResolver = async (parent:any, args:MutationAddMemberArgs, context:Context) => {
  const callerInfo = await context.callerInfo;
  if (!callerInfo?.profile) {
    throw new Error(`!callerInfo?.profile`);
  }
  const groupProfile = await findGroup(args.groupId, callerInfo.profile);

  if (groupProfile?.members.length != 1) {
    throw new Error(`You are not an admin of this group.`);
  }

  // Create a membership that must be accepted by the member.
  await prisma_api_rw.membership.create({
    data: {
      createdAt: new Date(),
      createdByProfileId: callerInfo.profile.id,
      memberAtId: groupProfile.id,
      memberAddress: args.memberAddress
    }
  });

  return {
    success: true
  }
}