import {MutationRemoveMemberArgs} from "../../types";
import {Context} from "../../context";
import {findGroup} from "./addMember";
import {ProfileLoader} from "../../querySources/profileLoader";
import {Environment} from "../../environment";

export const removeMemberResolver =async (parent:any, args:MutationRemoveMemberArgs, context:Context) => {
  const callerInfo = await context.callerInfo;
  if (!callerInfo?.profile) {
    throw new Error(`!callerInfo?.profile`);
  }
  const groupProfile = await findGroup(args.groupId, ProfileLoader.withDisplayCurrency(callerInfo.profile));

  if (groupProfile?.members.length != 1) {
    throw new Error(`You are not an admin of this group.`);
  }

  await Environment.readWriteApiDb.membership.deleteMany({
    where: {
      memberAddress: args.memberAddress,
      memberAtId: groupProfile.id,
    }
  });
  return {
    success: true
  }
}
