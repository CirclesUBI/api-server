import { MutationUpsertShopArgs, Shop } from "../../types";
import { Context } from "../../context";
import { Environment } from "../../environment";
import { ensureCanAccessShop } from "../../utils/ensureCanAccessShop";

export const upsertShop = async (parent: any, args: MutationUpsertShopArgs, context: Context) => {
  await ensureCanAccessShop(args.shop.id, args.shop.ownerId, context);

  const deliveryMethodIds = <number[]>args.shop.deliveryMethodIds ?? [];
  delete args.shop.deliveryMethodIds;

  //TODO: - remove ShopDeliveryMethods from table if they're not in 'deliveryMethodIds'
  //      - add ShopDeliveryMethods from deliveryMethodIds to table if they're not already in.

  const result = await Environment.readWriteApiDb.shop.upsert({
    create: {
      ...args.shop,
      id: undefined,
      ownerId: args.shop.ownerId,
    },
    update: {
      ...args.shop,
      ownerId: args.shop.ownerId,
      id: <number>args.shop.id,
    },
    where: {
      id: args.shop.id ?? undefined,
    },
    include: {
      owner: true,
    },
  });

  await Environment.readWriteApiDb.shopDeliveryMethod.deleteMany({
    where: {
      shopId: result.id,
    }
  });

  await Environment.readWriteApiDb.shopDeliveryMethod.createMany({
    data: deliveryMethodIds.map(id => ({
      shopId: result.id,
      deliveryMethodId: id
    }))
  })


  return <Shop>{
    ...result,
    owner: {
      ...result.owner,
      name: result.owner.firstName,
      createdAt: result.owner.createdAt.toJSON(),
    },
  };
};
