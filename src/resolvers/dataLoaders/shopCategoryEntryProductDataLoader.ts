import DataLoader from "dataloader";
import {Offer} from "../../types";
import {Environment} from "../../environment";

export const shopCategoryEntryProductDataLoader = new DataLoader<number, Offer>(async (entryIds) => {
  const shopCategoryEntriesWithProducts = (await Environment.readonlyApiDb.shopCategoryEntry.findMany({
    where: {
      id: {
        in: entryIds.map(o => o)
      }
    },
    include: {
      product: {
        include: {
          createdBy: {
            select: {
              circlesAddress: true
            }
          }
        }
      }
    },
    orderBy: {
      sortOrder: "asc"
    }
  }));

  const g = shopCategoryEntriesWithProducts.toLookup(o => o.id, o => o);
  return entryIds.map(id => <Offer>{
    ...g[id].product,
    createdByAddress: g[id].product.createdBy.circlesAddress,
    createdAt: g[id].product.createdAt.toJSON(),
    pictureUrl: g[id].product.pictureUrl ?? ""
  });
}, {
  cache: false
});