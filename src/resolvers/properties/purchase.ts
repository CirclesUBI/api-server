import {Purchase, PurchaseResolvers} from "../../types";
import {Context} from "../../context";
import {purchaseInvoicesDataLoader} from "../dataLoaders/purchaseInvoicesDataLoader";
import {purchaseLinesDataLoader} from "../dataLoaders/purchaseLinesDataLoader";
import {purchaseDeliveryAddressDataLoader} from "../dataLoaders/purchaseDeliveryAddressDataLoader";

export const purchasePropertyResolvers : PurchaseResolvers = {
  invoices: async (parent: Purchase, args: any, context: Context) => {
    return purchaseInvoicesDataLoader.load(parent.id);
  },
  lines: async (parent: Purchase, args: any, context: Context) => {
    return purchaseLinesDataLoader.load(parent.id);
  },
  deliveryAddress: async (parent: Purchase, args: any, context: Context) => {
    return purchaseDeliveryAddressDataLoader.load(parent.id);
  },
}
