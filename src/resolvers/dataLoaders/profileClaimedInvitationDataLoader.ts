import DataLoader from "dataloader";
import {Environment} from "../../environment";
import {ClaimedInvitation} from "../../types";

export const profileClaimedInvitationDataLoader = new DataLoader<number, ClaimedInvitation>(async (keys: readonly any[]) => {
  const invitations = await Environment.readWriteApiDb.invitation.findMany({
    where: {
      claimedByProfileId: {
        in: keys.map(o => o)
      }
    }
  });

  const invitationsByProfileId = invitations.map(o => <ClaimedInvitation>{
    createdByProfileId: o.createdByProfileId,
    claimedByProfileId: o.claimedByProfileId,
    claimedAt: o.claimedAt?.toJSON(),
    createdAt: o.createdAt.toJSON()
  }).reduce((p,c) => {
    if (!p[c.claimedByProfileId]) {
      p[c.claimedByProfileId] = c;
    }
    return p;
  }, <{[x:number]:ClaimedInvitation}>{});

  return keys.map(o => invitationsByProfileId[o]);
}, {
  cache: false
});