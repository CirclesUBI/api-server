import DataLoader from "dataloader";
import {Invoice, InvoiceLine} from "../../types";
import {prisma_api_rw} from "../../apiDbClient";

const purchaseInvoicesDataLoaders: {
  [callerSafeAddress: string]: {
    timestamp: Date,
    dataLoader: DataLoader<number, Invoice[]>
  }
} = {};

setInterval(() => {
  const now = new Date();
  Object.keys(purchaseInvoicesDataLoaders)
    .filter(key => purchaseInvoicesDataLoaders[key].timestamp.getTime() < now.getTime() - 1000)
    .forEach(key => delete purchaseInvoicesDataLoaders[key]);
}, 1000);

export function getPurchaseInvoicesDataLoader(forCaller: string): DataLoader<number, Invoice[]> {
  let cachedEntry = purchaseInvoicesDataLoaders[forCaller];
  if (!cachedEntry) {
    cachedEntry = {
      timestamp: new Date(),
      dataLoader: new DataLoader<number, Invoice[]>(async (keys) => {
        const invoices = await prisma_api_rw.invoice.findMany({
          where: {
            purchase: {
              id: {
                in: keys.map(o => o)
              },
              createdBy: {
                circlesAddress: forCaller
              }
            }
          },
          include: {
            customerProfile: true,
            sellerProfile: true,
            lines: {
              include: {
                product: {
                  include: {
                    createdBy: true
                  }
                }
              }
            }
          }
        });
        const formattedInvoices = invoices.map(i => {
          return <Invoice>{
            ...i,
            buyerAddress: i.customerProfile.circlesAddress,
            buyerProfile: i.customerProfile,
            sellerProfile: i.sellerProfile,
            sellerAddress: i.sellerProfile.circlesAddress,
            lines: i.lines.map(l => {
              return <InvoiceLine>{
                ...l,
                offer: {
                  ...l.product,
                  createdByAddress: l.product.createdBy.circlesAddress,
                  createdAt: l.product.createdAt.toJSON()
                }
              }
            })
          }
        })
          .reduce((p, c) => {
            if (!p[c.purchaseId]) {
              p[c.purchaseId] = [];
            }
            p[c.purchaseId].push(c);
            return p;
          }, <{[x:number]:Invoice[]}>{});

        return keys.map(o => formattedInvoices[o]).filter(o => !!o);
      }, {
        cache: false
      })
    }
    purchaseInvoicesDataLoaders[forCaller] = cachedEntry;
  }

  return cachedEntry.dataLoader;
}