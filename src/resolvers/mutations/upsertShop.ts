import {MutationUpsertShopArgs, Shop} from "../../types";
import {Context} from "../../context";
import {Environment} from "../../environment";
import {ensureCanAccessShop} from "../../utils/ensureCanAccessShop";

export const upsertShop = async (parent: any, args: MutationUpsertShopArgs, context: Context) => {
  await ensureCanAccessShop(args.shop.id, args.shop.ownerId, context);

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
      id: args.shop.id ?? -1,
    },
    include: {
      owner: true,
    },
  });

  return <Shop>{
    ...result,
    owner: {
      ...result.owner,
      name: result.owner.firstName,
      createdAt: result.owner.createdAt.toJSON(),
    },
  };
}