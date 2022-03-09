import DataLoader from "dataloader";
import {Invoice, InvoiceLine, PurchaseLine} from "../../types";
import {Environment} from "../../environment";

export const purchaseLinesDataLoader = new DataLoader<number, PurchaseLine[]>(async (keys) => {
    const invoiceLines = await Environment.readWriteApiDb.purchaseLine.findMany({
      where: {
        purchaseId: {
          in: keys.map(o => o)
        }
      }
    });

    const invoiceLinesByInvoice = invoiceLines.reduce((p,c) => {
      if (!p[c.purchaseId]) {
        p[c.purchaseId] = [];
      }
      p[c.purchaseId].push(c);
      return p;
    }, <{[key:number]:PurchaseLine[]}>{})

    return keys.map(o => invoiceLinesByInvoice[o]);
  }, {
    cache: false
  });