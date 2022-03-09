import DataLoader from "dataloader";
import {Invoice, InvoiceLine} from "../../types";
import {Environment} from "../../environment";

export const invoiceLinesDataLoader = new DataLoader<number, InvoiceLine[]>(async (keys) => {
    const invoiceLines = await Environment.readWriteApiDb.invoiceLine.findMany({
      where: {
        invoiceId: {
          in: keys.map(o => o)
        }
      }
    });

    const invoiceLinesByInvoice = invoiceLines.reduce((p,c) => {
      if (!p[c.invoiceId]) {
        p[c.invoiceId] = [];
      }
      p[c.invoiceId].push(c);
      return p;
    }, <{[key:number]:InvoiceLine[]}>{})

    return keys.map(o => invoiceLinesByInvoice[o]);
  }, {
    cache: false
  });