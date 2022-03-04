import DataLoader from "dataloader";
import {Environment} from "../../environment";
import {ClaimedInvitation, Profile} from "../../types";

export const claimedInvitationCreatedByProfileDataLoader = new DataLoader<number, Profile>(async (keys: readonly any[]) => {
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
  const claimedByProfiles = invitations.reduce((p,c) => {
    if (!c.claimedByProfileId)
      return p;

    p[c.claimedByProfileId] = <Profile>{
      ...c.claimedBy
    };
    return p;
  },<{[x:number]:Profile}>{});

  return keys.map(o => claimedByProfiles[o]);
}, {
  cache: false
});