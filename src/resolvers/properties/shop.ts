import {Shop, ShopResolvers} from "../../types";
import {Context} from "../../context";
import {shopDeliveryMethodsDataLoader} from "../dataLoaders/shopDeliveryMethodsDataLoader";
import {shopCategoriesDataLoader} from "../dataLoaders/shopCategoriesDataLoader";

export const shopPropertyResolver : ShopResolvers = {
  deliveryMethods: async (parent:Shop, args:any, context:Context) => {
    return shopDeliveryMethodsDataLoader.load(parent.id);
  },
  categories: async (parent:Shop, args:any, context:Context) => {
    return shopCategoriesDataLoader.load(parent.id);
  }
}