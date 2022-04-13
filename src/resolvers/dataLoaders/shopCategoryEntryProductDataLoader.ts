import DataLoader from "dataloader";
import {Offer} from "../../types";
import {Environment} from "../../environment";

export const shopCategoryEntryProductDataLoader = new DataLoader<number, Offer>(async (entryIds) => {
  const offers = (await Environment.readonlyApiDb.shopCategoryEntry.findMany({
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

  return offers.map(c => <Offer>{
    ...c.product,
    createdByAddress: c.product.createdBy.circlesAddress,
    createdAt: c.product.createdAt.toJSON(),
    pictureUrl: c.product.pictureUrl ?? ""
  });
}, {
  cache: false
});