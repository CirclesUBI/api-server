import DataLoader from "dataloader";
import {Invoice, InvoiceLine, Offer} from "../../types";
import {Environment} from "../../environment";

export const purchaseLineOfferDataLoader = new DataLoader<number, Offer>(async (keys) => {
    const purchaseLines = await Environment.readWriteApiDb.purchaseLine.findMany({
      where: {
        id: {
          in: keys.map(o => o)
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
      }
    });

    const offersByPurchaseLineId = purchaseLines.reduce((p,c) => {
      p[c.id] = {
        ...c.product,
        createdAt: c.product.createdAt.toJSON(),
        pictureMimeType: c.product.pictureMimeType ?? "",
        pictureUrl: c.product.pictureUrl ?? "",
        createdByAddress: c.product.createdBy.circlesAddress ?? ""
      };
      return p;
    }, <{[key:number]:Offer}>{})

    return keys.map(o => offersByPurchaseLineId[o]);
  }, {
    cache: false
  });