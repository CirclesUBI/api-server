import DataLoader from "dataloader";
import {ShopCategory} from "../../types";
import {Environment} from "../../environment";

export const shopCategoriesDataLoader = new DataLoader<number, ShopCategory[]>(async (shopIds) => {
  const categories = (await Environment.readonlyApiDb.shopCategory.findMany({
    where: {
      shopId: {
        in: shopIds.map(o => o)
      }
    },
    orderBy: {
      sortOrder: "asc"
    }
  }));

  const _categories = categories.reduce((p,c) => {
    if (!p[c.shopId]) {
      p[c.shopId] = [<ShopCategory>c];
    } else {
      p[c.shopId].push(<ShopCategory>c);
    }
    return p;
  }, <{[shopId:number]: ShopCategory[]}>{});

  return shopIds.map(o => _categories[o]);
}, {
  cache: false
});