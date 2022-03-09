import {PurchaseLine, PurchaseLineResolvers} from "../../types";
import {Context} from "../../context";
import {purchaseLineOfferDataLoader} from "../../../dist/resolvers/dataLoaders";

export const purchaseLinePropertyResolvers : PurchaseLineResolvers = {
  offer: async (parent: PurchaseLine, args: any, context: Context) => {
    return purchaseLineOfferDataLoader.load(parent.id);
  }
}