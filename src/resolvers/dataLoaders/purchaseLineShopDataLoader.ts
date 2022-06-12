import DataLoader from "dataloader";
import {Shop} from "../../types";
import {Environment} from "../../environment";
import {ProfileLoader} from "../../querySources/profileLoader";

export const purchaseLineShopDataLoader = new DataLoader<number, Shop|null>(async (keys) => {
  const purchaseLines = await Environment.readWriteApiDb.purchaseLine.findMany({
    where: {
      id: {
        in: keys.map(o => o)
      }
    },
    include: {
      shop: true
    }
  });

  const shopOwnerIds = purchaseLines.filter(o => !!o.shop).map(o => {
    return {
      ownerId: <number>(<Shop><unknown>o.shop).ownerId,
      shopId: o.shopId
    }
  }).filter(o => !!o);

  const shopOwnerProfiles = await new ProfileLoader().queryCirclesLandById(Environment.readonlyApiDb, shopOwnerIds.map(o => o.ownerId))

  const shopsByPurchaseLineId = purchaseLines.reduce((p, c) => {
    if (!c.shop) {
      return p;
    }
    p[c.id] = <any>{
      ...c.shop,
      owner: c.shop.ownerId ? shopOwnerProfiles.idProfileMap[c.shop.ownerId] : null
    };
    return p;
  }, <{ [key: number]: Shop | null }>{})

  return keys.map(o => shopsByPurchaseLineId[o]);
}, {
  cache: false
});
