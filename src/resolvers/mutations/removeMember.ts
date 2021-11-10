import { prisma_api_rw } from "../../apiDbClient";
import {MutationRemoveMemberArgs} from "../../types";
import {Context} from "../../context";
import {findGroup} from "./addMember";

export const removeMemberResolver =async (parent:any, args:MutationRemoveMemberArgs, context:Context) => {
  const callerProfile = await context.callerProfile;
  if (!callerProfile) {
    throw new Error(`!callerProfile`);
  }
  const groupProfile = await findGroup(args.groupId, callerProfile);

  if (groupProfile?.members.length != 1) {
    throw new Error(`You are not an admin of this group.`);
  }

  await prisma_api_rw.membership.deleteMany({
    where: {
      memberAddress: args.memberAddress,
      memberAtId: groupProfile.id,
    }
  });
  return {
    success: true
  }
}
