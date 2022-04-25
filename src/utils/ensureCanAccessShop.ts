import {Context} from "../context";
import {Environment} from "../environment";
import {canAccessProfileId} from "./canAccess";

export async function ensureCanAccessShop(shopId: number | null | undefined, newOwnerId: number, context: Context) {
  const existingShop = shopId
    ? await Environment.readWriteApiDb.shop.findUnique({
      where: {
        id: shopId,
      },
    })
    : undefined;

  if (existingShop) {
    const canAccessCurrentShopOwner = await canAccessProfileId(context, existingShop.ownerId);
    if (!canAccessCurrentShopOwner) {
      throw new Error(`You cannot access the current owner of this shop.`);
    }
  }

  const caller = await canAccessProfileId(context, newOwnerId);
  if (!caller) {
    throw new Error(`You cannot access the specified owner.`);
  }
  return caller;
}