import {MutationUpsertShopCategoryEntriesArgs} from "../../types";
import {Context} from "../../context";
import {Environment} from "../../environment";
import {Prisma} from "../../api-db/client";
import {ensureCanAccessShop} from "../../utils/ensureCanAccessShop";

export const upsertShopCategoryEntries = async (parent: any, args: MutationUpsertShopCategoryEntriesArgs, context: Context) => {
  const shopCategoryIds = Object.keys(args.shopCategoryEntries.toLookup((o) => o.shopCategoryId)).map((o) =>
    parseInt(o)
  );
  const shopCategories = await Environment.readWriteApiDb.shopCategory.findMany({
    where: {
      id: {
        in: shopCategoryIds,
      },
    },
  });

  const shopIds = Object.keys(shopCategories.toLookup((o) => o.shopId)).map((o) => parseInt(o));
  const shops = await Environment.readWriteApiDb.shop.findMany({
    where: {
      id: {
        in: shopIds,
      },
    },
  });

  await Promise.all(shops.map(async (shop) => await ensureCanAccessShop(shop.id, shop.ownerId, context)));

  const inputsById = args.shopCategoryEntries
    .filter((o) => o.id)
    .toLookup(
      (o) => o.id,
      (o) => o
    );
  const existingCategoryEntries = await Environment.readWriteApiDb.shopCategoryEntry.findMany({
    where: {
      id: {
        in: <number[]>args.shopCategoryEntries.filter((o) => o.id).map((o) => o.id),
      },
    },
  });
  const existingCategoriesById = existingCategoryEntries.toLookup(
    (o) => o.id,
    (o) => o
  );

  const updates = Object.keys(existingCategoriesById).map((o) => inputsById[o]);
  let updated: Prisma.BatchPayload = { count: 0 };
  if (updates.length > 0) {
    await Promise.all(
      updates.map(async (o) => {
        await Environment.readWriteApiDb.shopCategoryEntry.updateMany({
          where: {
            id: <number>o.id,
          },
          data: { ...o, id: <number>o.id, enabled: <boolean>o.enabled },
        });
        updated.count++;
      })
    );
  }

  const inserts = args.shopCategoryEntries
    .filter((o) => o.id)
    .filter((o) => !existingCategoriesById[<number>o.id])
    .concat(args.shopCategoryEntries.filter((o) => !o.id));

  const inserted = await Environment.readWriteApiDb.shopCategoryEntry.createMany({
    data: inserts.map((o) => {
      return {
        ...o,
        id: undefined,
        enabled: true,
      };
    }),
  });

  return {
    inserted: inserted.count,
    updated: updated.count,
  };
}