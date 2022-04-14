import { upsertProfileResolver } from "./upsertProfile";
import { logout } from "./logout";
import { requestUpdateSafe } from "./requestUpdateSafe";
import { updateSafe } from "./updateSafe";
import { upsertTag } from "./upsertTag";
import { sendMessage } from "./sendMessage";
import { tagTransaction } from "./tagTransaction";
import { acknowledge } from "./acknowledge";
import { claimInvitation } from "./claimInvitation";
import { redeemClaimedInvitation } from "./redeemClaimedInvitation";
import { verifySessionChallengeResolver } from "./verifySessionChallengeResolver";
import { upsertOrganisation } from "./upsertOrganisation";
import { createTestInvitation } from "./createTestInvitation";
import { addMemberResolver } from "./addMember";
import { removeMemberResolver } from "./removeMember";
import { purchaseResolver } from "./purchase";
import { requestSessionChallenge } from "./requestSessionChallenge";
import { importOrganisationsOfAccount } from "./importOrganisationsOfAccount";
import { completePurchase } from "./completePurchase";
import { completeSale } from "./completeSale";
import { revokeSafeVerification, verifySafe } from "./verifySafe";
import { announcePayment } from "./announcePayment";
import { Environment } from "../../environment";
import {
  MutationResolvers,
  MutationUpsertShopArgs,
  MutationUpsertShopCategoriesArgs,
  MutationUpsertShopCategoryEntriesArgs,
  Shop,
} from "../../types";
import { Context } from "../../context";
import { canAccessProfileId } from "../../utils/canAccess";
import { Prisma } from "../../api-db/client";
import ShopCategoryUncheckedUpdateManyInput = Prisma.ShopCategoryUncheckedUpdateManyInput;
import ShopCategoryUpdateManyMutationInput = Prisma.ShopCategoryUpdateManyMutationInput;

async function ensureCanAccessShop(shopId: number | null | undefined, newOwnerId: number, context: Context) {
  const existingShop = shopId
    ? await Environment.readWriteApiDb.shop.findUnique({
        where: {
          id: shopId,
        },
      })
    : undefined;

  if (existingShop) {
    const canAccessCurrentShopOwner = await canAccessProfileId(context, existingShop.id);
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

export const mutationResolvers: MutationResolvers = {
  purchase: purchaseResolver,
  upsertOrganisation: <any>upsertOrganisation(false),
  upsertRegion: <any>upsertOrganisation(true),
  logout: logout(),
  upsertProfile: upsertProfileResolver(),
  requestUpdateSafe: requestUpdateSafe(Environment.readWriteApiDb),
  updateSafe: updateSafe(Environment.readWriteApiDb),
  upsertTag: upsertTag(),
  tagTransaction: tagTransaction(),
  sendMessage: sendMessage(Environment.readWriteApiDb),
  acknowledge: acknowledge(),
  claimInvitation: claimInvitation(),
  redeemClaimedInvitation: redeemClaimedInvitation(),
  requestSessionChallenge: requestSessionChallenge,
  verifySessionChallenge: verifySessionChallengeResolver(Environment.readWriteApiDb),
  createTestInvitation: createTestInvitation(),
  addMember: addMemberResolver,
  removeMember: removeMemberResolver,
  importOrganisationsOfAccount: <any>importOrganisationsOfAccount,
  completePurchase: completePurchase,
  completeSale: completeSale,
  verifySafe: verifySafe,
  revokeSafeVerification: revokeSafeVerification,
  announcePayment: announcePayment(),
  upsertShop: async (parent: any, args: MutationUpsertShopArgs, context: Context) => {
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
  },
  upsertShopCategories: async (parent: any, args: MutationUpsertShopCategoriesArgs, context: Context) => {
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
  },
  upsertShopCategoryEntries: async (parent: any, args: MutationUpsertShopCategoryEntriesArgs, context: Context) => {
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
            data: { ...o, id: <number>o.id },
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
        };
      }),
    });

    return {
      inserted: inserted.count,
      updated: updated.count,
    };
  },
};
