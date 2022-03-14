import DataLoader from "dataloader";
import {Offer, ProfileOrOrganisation} from "../../types";
import {ProfileLoader} from "../../querySources/profileLoader";
import {Environment} from "../../environment";

export const organisationOffersDataLoader = new DataLoader<string, Offer[]>(async (organisationAddresses) => {
  const offers = (await Environment.readonlyApiDb.offer.findMany({
    where: {
      createdBy: {
        circlesAddress: {
          in: organisationAddresses.map(o => o)
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
    if (!c.createdBy?.circlesAddress) {
      return p;
    }

    const currentOffer = <Offer>{
      ...c,
      createdByAddress: c.createdBy.circlesAddress,
      createdAt: c.createdAt.toJSON(),
      pictureUrl: c.pictureUrl ?? ""
    };

    if (!p[c.createdBy.circlesAddress]) {
      p[c.createdBy.circlesAddress] = [currentOffer];
    } else {
      p[c.createdBy.circlesAddress].push(currentOffer);
    }
    return p;
  }, <{[createdByCirclesAddress:string]: Offer[]}>{});

  return Object.values(_offers);
}, {
  cache: false
});