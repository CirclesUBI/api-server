import DataLoader from "dataloader";
import {ProfileLoader} from "../../querySources/profileLoader";
import {Environment} from "../../environment";
import {Tag} from "../../types";

export const offerTagsLoader = new DataLoader(async (keys: readonly number[]) => {
  const tags = await Environment.readWriteApiDb.tag.findMany({
    where: {
      offerId: {
        in: keys.map(o => <number>o)
      },
      isPrivate: false
    }
  });

  const tagsByOffer = tags.reduce((p,c) => {
    if (!c.offerId)
      return p;

    if(!p[c.offerId]) {
      p[c.offerId] = [c];
    } else {
      p[c.offerId].push(c);
    }
    return p;
  }, <{[offerId:number]: Tag[]}>{});

  return keys.map(o => tagsByOffer[o] ?? [] );
}, {
  cache: false
});