import DataLoader from "dataloader";
import {DeliveryMethod, ShopCategory} from "../../types";
import {Environment} from "../../environment";

export const shopDeliveryMethodsDataLoader = new DataLoader<number, DeliveryMethod[]>(async (shopIds) => {
  const deliveryMethods = (await Environment.readonlyApiDb.shopDeliveryMethod.findMany({
    where: {
      shopId: {
        in: shopIds.map(o => o)
      }
    },
    include: {
      deliveryMethod: true
    }
  }));

  const deliveryMethodsByShop = deliveryMethods.reduce((p,c) => {
    if (!p[c.shopId]) {
      p[c.shopId] = [<DeliveryMethod>c.deliveryMethod];
    } else {
      p[c.shopId].push(<DeliveryMethod>c.deliveryMethod);
    }
    return p;
  }, <{[shopId:number]: DeliveryMethod[]}>{});

  return shopIds.map(o => deliveryMethodsByShop[o]);
}, {
  cache: false
});