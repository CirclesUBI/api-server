import DataLoader from "dataloader";
import {ShopCategoryEntry} from "../../types";
import {Environment} from "../../environment";

export const shopCategoryEntriesDataLoader = new DataLoader<number, ShopCategoryEntry[]>(async (categoryIds) => {
  const categoryEntries = (await Environment.readonlyApiDb.shopCategoryEntry.findMany({
    where: {
      shopCategoryId: {
        in: categoryIds.map(o => o)
      }
    },
    orderBy: {
      sortOrder: "asc"
    }
  }));

  const _categoryEntries = categoryEntries.reduce((p,c) => {
    if (!p[c.shopCategoryId]) {
      p[c.shopCategoryId] = [<ShopCategoryEntry>c];
    } else {
      p[c.shopCategoryId].push(<ShopCategoryEntry>c);
    }
    return p;
  }, <{[shopCategoryId:number]: ShopCategoryEntry[]}>{});

  return categoryIds.map(o => _categoryEntries[o]);
}, {
  cache: false
});