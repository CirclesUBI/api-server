import {InvoiceLine, InvoiceLineResolvers, PurchaseLine} from "../../types";
import {Context} from "../../context";
import {invoiceLineOfferDataLoader} from "../dataLoaders/invoiceLineOfferDataLoader";
import {invoiceLineShopDataLoader} from "../dataLoaders/invoiceLineShopDataLoader";

export const invoiceLinePropertyResolver : InvoiceLineResolvers = {
  offer: async (parent: InvoiceLine, args: any, context: Context) => {
    return invoiceLineOfferDataLoader.load(parent.id);
  },
  shop: async (parent: InvoiceLine, args: any, context: Context) => {
    return invoiceLineShopDataLoader.load(parent.id);
  }
}
