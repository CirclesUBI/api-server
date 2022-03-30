import DataLoader from "dataloader";
import {Membership, Offer, Verification} from "../../types";
import {ProfileLoader} from "../../querySources/profileLoader";
import {Environment} from "../../environment";

export const profileVerificationsDataLoader = new DataLoader<string, Verification[]>(async (keys) => {
  const verifications = await Environment.readonlyApiDb.verifiedSafe.findMany({
    where: {
      safeAddress: {
        in: keys.map(o => o)
      }
    },
    include: {
      createdByOrganisation: {
        select: {
          circlesAddress: true
        }
      }
    }
  });

  const verificationsBySafeAddress = verifications.reduce((p,c) => {
    if (!p[c.safeAddress]) {
      p[c.safeAddress] = [];
    }
    p[c.safeAddress].push({
      ...c,
      verificationRewardTransactionHash: "",
      verifiedSafeAddress: c.safeAddress,
      verifierSafeAddress: c.createdByOrganisation.circlesAddress ?? "",
      createdAt: c.createdAt.toJSON(),
      revokedAt: c.revokedAt?.toJSON(),
    });
    return p;
  }, <{[x:string]:Verification[]}>{});


  return keys.map(o => verificationsBySafeAddress[o]);
}, {
  cache: false
});