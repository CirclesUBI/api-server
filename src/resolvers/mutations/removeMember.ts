import { prisma_api_rw } from "../../apiDbClient";
import {MutationRemoveMemberArgs} from "../../types";
import {Context} from "../../context";
import {findGroup} from "./addMember";

export const removeMemberResolver =async (parent:any, args:MutationRemoveMemberArgs, context:Context) => {
  const callerInfo = await context.callerInfo;
  if (!callerInfo?.profile) {
    throw new Error(`!callerInfo?.profile`);
  }
  const groupProfile = await findGroup(args.groupId, callerInfo.profile);

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
