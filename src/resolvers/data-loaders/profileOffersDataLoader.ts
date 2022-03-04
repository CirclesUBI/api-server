import DataLoader from "dataloader";
import {Membership, Offer} from "../../types";
import {ProfileLoader} from "../../querySources/profileLoader";
import {Environment} from "../../environment";

export const profileOffersDataLoader = new DataLoader<number, Offer[]>(async (keys) => {
  const offers = await Environment.readonlyApiDb.offer.findMany({
    where: {
      createdByProfileId: {
        in: keys.map(o => o)
      }
    },
    include: {
      createdBy: {
        select: {
          circlesAddress: true
        }
      }
    }
  });

  const offersByProfileId = offers.reduce((p,c) => {
    if (!p[c.createdByProfileId]) {
      p[c.createdByProfileId] = [];
    }
    p[c.createdByProfileId].push({
      ...c,
      createdByAddress: c.createdBy.circlesAddress ?? "",
      createdAt: c.createdAt.toJSON(),
      pictureMimeType: c.pictureMimeType ?? "",
      pictureUrl: c.pictureUrl ?? ""
    });
    return p;
  }, <{[x:string]:Offer[]}>{});

  const latestVersions = Object.entries(offersByProfileId).reduce((p,c) => {
    const offers:Offer[] = c[1];
    const distinctOffers = offers.reduce((p,c) => {
      let existingEntry = p[c.id];
      if (!existingEntry || c.version > existingEntry.version) {
        existingEntry = {
          offer: c,
          version: c.version
        };
        p[c.id] = existingEntry;
      }
      return p;
    }, <{[id:number]:{version: number, offer: Offer}}>{});
    p[c[0]] = Object.values(distinctOffers).map(o => o.offer);
    return p;
  }, <{[x:string]:Offer[]}>{});

  return keys.map(o => latestVersions[o]);
});