import {InvoiceLine, InvoiceLineResolvers} from "../../types";
import {Context} from "../../context";
import {invoiceLineOfferDataLoader} from "../../../dist/resolvers/dataLoaders";

export const invoiceLinePropertyResolver : InvoiceLineResolvers = {
  offer: async (parent: InvoiceLine, args: any, context: Context) => {
    return invoiceLineOfferDataLoader.load(parent.id);
  }
}