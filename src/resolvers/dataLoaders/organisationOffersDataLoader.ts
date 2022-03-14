import DataLoader from "dataloader";
import {Offer, ProfileOrOrganisation} from "../../types";
import {ProfileLoader} from "../../querySources/profileLoader";
import {Environment} from "../../environment";

export const organisationOffersDataLoader = new DataLoader<number, Offer[]>(async (organisationIds) => {
  const offers = (await Environment.readonlyApiDb.offer.findMany({
    where: {
      createdBy: {
        id: {
          in: organisationIds.map(o => o)
        }
      }
    },
    include: {
      createdBy: {
        select: {
          circlesAddress: true
        }
      }
    }
  }));

  const _offers = offers.reduce((p,c) => {
    const currentOffer = <Offer>{
      ...c,
      createdByAddress: c.createdBy.circlesAddress,
      createdAt: c.createdAt.toJSON()
    };
    if (!p[c.id]) {
      p[c.id] = [currentOffer];
    } else {
      p[c.id].push(currentOffer);
    }
    return p;
  }, <{[offerId:number]: Offer[]}>{});

  return Object.values(_offers);
}, {
  cache: false
});