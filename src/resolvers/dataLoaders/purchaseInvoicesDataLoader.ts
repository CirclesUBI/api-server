import DataLoader from "dataloader";
import { Invoice, InvoiceLine } from "../../types";
import { Environment } from "../../environment";

export const purchaseInvoicesDataLoader = new DataLoader<number, Invoice[]>(
  async (keys) => {
    const invoices = await Environment.readWriteApiDb.invoice.findMany({
      where: {
        purchase: {
          id: {
            in: keys.map((o) => o),
          },
        },
      },
      include: {
        customerProfile: true,
        sellerProfile: true,
      },
    });
    const formattedInvoices = invoices
      .map((i) => {
        return <Invoice>{
          ...i,
          buyerAddress: i.customerProfile.circlesAddress,
          buyerProfile: i.customerProfile,
          sellerProfile: i.sellerProfile,
          createdAt: i.createdAt.toJSON(),
          sellerAddress: i.sellerProfile.circlesAddress,
        };
      })
      .groupBy(c => c.purchaseId);

    return keys.map((o) => formattedInvoices[o]).filter((o) => !!o);
  },
  {
    cache: false,
  }
);
