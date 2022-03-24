import DataLoader from "dataloader";
import {Environment} from "../../environment";
import {Profile} from "../../types";

export const claimedInvitationCreatedByProfileDataLoader = new DataLoader<number, Profile>(async (keys: readonly any[]) => {
  const invitations = await Environment.readWriteApiDb.invitation.findMany({
    where: {
      createdByProfileId: {
        in: keys.map(o => o)
      }
    },
    include: {
      createdBy: true
    }
  })
  const createdByProfile = invitations.toLookup(c => c.createdByProfileId, c => <Profile>c.createdBy);
  return keys.map(o => createdByProfile[o]);
}, {
  cache: false
});