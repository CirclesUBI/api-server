import DataLoader from "dataloader";
import {Membership, Profile, Shop} from "../../types";
import {ProfileLoader} from "../../querySources/profileLoader";
import {Environment} from "../../environment";

export const profileShopsDataLoader = new DataLoader<number, Shop[]>(async (keys) => {
  const ownedShops = await Environment.readonlyApiDb.shop.findMany({
    where: {
      ownerId: {
        in: keys.map(o => o)
      }
    },
    include: {
      owner: true
    }
  });

  const ownedShopsByOwner = ownedShops.groupBy(o => o.ownerId);
  return <any>keys.map(o => ownedShopsByOwner[o.toString()]);
}, {
  cache: false
});