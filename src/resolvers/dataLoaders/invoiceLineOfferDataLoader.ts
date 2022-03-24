import DataLoader from "dataloader";
import {Offer} from "../../types";
import {Environment} from "../../environment";

export const invoiceLineOfferDataLoader = new DataLoader<number, Offer>(async (keys) => {
    const invoiceLines = await Environment.readWriteApiDb.invoiceLine.findMany({
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

    const invoiceLinesByInvoice = invoiceLines.reduce((p,c) => {
      p[c.id] = {
        ...c.product,
        createdAt: c.product.createdAt.toJSON(),
        pictureMimeType: c.product.pictureMimeType ?? "",
        pictureUrl: c.product.pictureUrl ?? "",
        createdByAddress: c.product.createdBy.circlesAddress ?? ""
      };
      return p;
    }, <{[key:number]:Offer}>{})

    return keys.map(o => invoiceLinesByInvoice[o]);
  }, {
    cache: false
  });