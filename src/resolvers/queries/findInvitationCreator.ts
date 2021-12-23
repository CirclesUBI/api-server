import {Environment} from "../../environment";
import {ProfileLoader} from "../../profileLoader";
import {QueryFindInvitationCreatorArgs} from "../../types";
import {Context} from "../../context";

export async function findInvitationCreator (parent:any, args:QueryFindInvitationCreatorArgs, context:Context) {
  const invitation = await Environment.readonlyApiDb.invitation.findFirst({
    where: {
      code: args.code,
      redeemedAt: null
    },
    select: {
      createdBy: {
        select: {
          circlesAddress: true
        }
      }
    }
  });

  if (!invitation?.createdBy?.circlesAddress) {
    return null;
  }

  const invitationCreator = invitation.createdBy.circlesAddress;
  const invitationCreatorProfile = await new ProfileLoader().profilesBySafeAddress(Environment.readonlyApiDb, [invitationCreator]);

  if (Object.keys(invitationCreatorProfile).length == 0) {
    return null;
  }

  return Object.entries(invitationCreatorProfile)[0][1];
}