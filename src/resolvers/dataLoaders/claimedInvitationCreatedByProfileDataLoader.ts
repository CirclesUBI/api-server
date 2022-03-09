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
  const createdByProfile = invitations.reduce((p,c) => {
    if (!c.createdByProfileId)
      return p;

    p[c.createdByProfileId] = <Profile>{
      ...c.createdBy
    };
    return p;
  },<{[x:number]:Profile}>{});

  return keys.map(o => createdByProfile[o]);
}, {
  cache: false
});