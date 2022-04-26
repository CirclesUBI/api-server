import {MutationUpsertShopCategoriesArgs} from "../../types";
import {Context} from "../../context";
import {Environment} from "../../environment";
import {Prisma} from "../../api-db/client";
import {ensureCanAccessShop} from "../../utils/ensureCanAccessShop";

export const upsertShopCategories =async (parent: any, args: MutationUpsertShopCategoriesArgs, context: Context) => {
  const shopIds = Object.keys(args.shopCategories.toLookup((o) => o.shopId)).map((o) => parseInt(o));
  const shops = await Environment.readWriteApiDb.shop.findMany({
    where: {
      id: {
        in: shopIds,
      },
    },
  });
  await Promise.all(shops.map(async (shop) => await ensureCanAccessShop(shop.id, shop.ownerId, context)));

  const inputsById = args.shopCategories
    .filter((o) => o.id)
    .toLookup(
      (o) => o.id,
      (o) => o
    );
  const existingCategories = await Environment.readWriteApiDb.shopCategory.findMany({
    where: {
      id: {
        in: <number[]>args.shopCategories.filter((o) => o.id).map((o) => o.id),
      },
    },
  });
  const existingCategoriesById = existingCategories
    .filter((o) => o.id)
    .toLookup(
      (o) => o.id,
      (o) => o
    );

  const updates = Object.keys(existingCategoriesById).map((o) => inputsById[o]);
  let updated: Prisma.BatchPayload = { count: 0 };
  if (updates.length > 0) {
    await Promise.all(
      updates.map(async (o) => {
        await Environment.readWriteApiDb.shopCategory.update({
          where: {
            id: <number>o.id,
          },
          data: { ...o, id: <number>o.id, enabled: <boolean>o.enabled },
        });
        updated.count++;
      })
    );
  }

  const inserts = args.shopCategories
    .filter((o) => o.id)
    .filter((o) => !existingCategoriesById[<number>o.id])
    .concat(args.shopCategories.filter((o) => !o.id));

  let inserted: Prisma.BatchPayload | undefined = undefined;
  if (inserts.length > 0) {
    inserted = await Environment.readWriteApiDb.shopCategory.createMany({
      data: inserts.map((o) => {
        return {
          ...o,
          id: undefined,
          enabled: true,
        };
      }),
    });
  }

  return {
    inserted: inserted?.count ?? 0,
    updated: updated?.count ?? 0,
  };
}