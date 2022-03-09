import {Purchase, PurchaseResolvers} from "../../types";
import {Context} from "../../context";
import {purchaseInvoicesDataLoader, purchaseLinesDataLoader} from "../../../dist/resolvers/dataLoaders";

export const purchasePropertyResolvers : PurchaseResolvers = {
  invoices: async (parent: Purchase, args: any, context: Context) => {
    return purchaseInvoicesDataLoader.load(parent.id);
  },
  lines: async (parent: Purchase, args: any, context: Context) => {
    return purchaseLinesDataLoader.load(parent.id);
  }
}