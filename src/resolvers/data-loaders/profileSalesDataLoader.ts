import DataLoader from "dataloader";
import {Membership, Offer, Purchase, PurchaseLine, Sale} from "../../types";
import {ProfileLoader} from "../../querySources/profileLoader";
import {Environment} from "../../environment";

export const profileSalesDataLoader = new DataLoader<number, Sale[]>(async (keys) => {
  const sales = await Environment.readonlyApiDb.invoice.findMany({
    where: {
      sellerProfileId: {
        in: keys.map(o => o)
      }
    },
    include: {
      customerProfile: true,
      sellerProfile: true,
      lines: {
        include: {
          product: true
        }
      }
    }
  });

  const purchasesByProfileId = sales.reduce((p,c) => {
    if (!p[c.sellerProfileId]) {
      p[c.sellerProfileId] = <any>[];
    }

    const total = c.lines
      .reduce((p, c) => p + c.amount * parseFloat(c.product.pricePerUnit), 0)
      .toString();

    p[c.sellerProfileId].push({
      id: c.id,
      createdAt: c.createdAt.toJSON(),
      total: total,
      buyerAddress: c.customerProfile.circlesAddress ?? "",
      sellerAddress: c.sellerProfile.circlesAddress ?? ""
    });
    return p;
  }, <{[x:string]:Sale[]}>{});

  return keys.map(o => purchasesByProfileId[o]);
});