import DataLoader from "dataloader";
import {ShopCategory, ShopCategoryEntry} from "../../types";
import {Environment} from "../../environment";

export const shopCategoryEntriesDataLoader = new DataLoader<number, ShopCategoryEntry[]>(async (categoryIds) => {
  const categories = (await Environment.readonlyApiDb.shopCategoryEntry.findMany({
    where: {
      shopCategoryId: {
        in: categoryIds.map(o => o)
      }
    },
    orderBy: {
      sortOrder: "asc"
    }
  }));

  const _categories = categories.reduce((p,c) => {
    if (!p[c.shopCategoryId]) {
      p[c.shopCategoryId] = [<ShopCategoryEntry>c];
    } else {
      p[c.shopCategoryId].push(<ShopCategoryEntry>c);
    }
    return p;
  }, <{[shopCategoryId:number]: ShopCategoryEntry[]}>{});

  return Object.values(_categories);
}, {
  cache: false
});