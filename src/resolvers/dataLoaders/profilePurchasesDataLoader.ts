import DataLoader from "dataloader";
import {Membership, Offer, Purchase, PurchaseLine} from "../../types";
import {ProfileLoader} from "../../querySources/profileLoader";
import {Environment} from "../../environment";

export const profilePurchasesDataLoader = new DataLoader<number, Purchase[]>(async (keys) => {
  const purchases = await Environment.readonlyApiDb.purchase.findMany({
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
      },
      lines: {
        include: {
          product: true
        }
      }
    }
  });

  const purchasesByProfileId = purchases.reduce((p,c) => {
    if (!p[c.createdByProfileId]) {
      p[c.createdByProfileId] = <any>[];
    }

    const total = c.lines
      .reduce((p, c) => p + c.amount * parseFloat(c.product.pricePerUnit), 0)
      .toString();

    p[c.createdByProfileId].push({
      ...c,
      createdAt: c.createdAt.toJSON(),
      createdByAddress: c.createdBy.circlesAddress ?? "",
      total: total,
      lines: undefined
    });
    return p;
  }, <{[x:string]:Purchase[]}>{});

  return keys.map(o => purchasesByProfileId[o]);
}, {
  cache: false
});