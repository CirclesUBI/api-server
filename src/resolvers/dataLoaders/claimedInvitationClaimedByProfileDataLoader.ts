import DataLoader from "dataloader";
import {Environment} from "../../environment";
import {Profile} from "../../types";

export const claimedInvitationClaimedByProfileDataLoader = new DataLoader<number, Profile>(async (keys: readonly any[]) => {
  const invitations = await Environment.readWriteApiDb.invitation.findMany({
    where: {
      claimedByProfileId: {
        in: keys.map(o => o)
      }
    },
    include: {
      claimedBy: true
    }
  })
  const claimedByProfiles = invitations.toLookup(c => c.claimedByProfileId, c => <Profile>c.claimedBy);
  return keys.map(o => claimedByProfiles[o]);
}, {
  cache: false
});