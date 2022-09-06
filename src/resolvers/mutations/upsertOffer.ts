import { Environment } from "../../environment";
import { canAccessProfileId } from "../../utils/canAccess";
import { MutationUpsertOfferArgs, Offer } from "../../types";
import { Context } from "../../context";

export const upsertOffer = async (parent: any, args: MutationUpsertOfferArgs, context: Context) => {
  const caller = await canAccessProfileId(context, args.offer.createdByProfileId);
  if (!caller) {
    throw new Error(`You cannot access the specified owner.`);
  }

  const existingOffer = args.offer.id
    ? await Environment.readWriteApiDb.offer.findFirst({
        where: {
          id: args.offer.id,
          createdByProfileId: args.offer.createdByProfileId,
        },
        orderBy: {
          version: "desc",
        },
      })
    : undefined;

  if (args.offer.id && !existingOffer) {
    throw new Error(`Can't find an offer with id ${args.offer.id}`);
  }

  const newOffer = await (!existingOffer
    ? Environment.readWriteApiDb.offer.create({
        data: {
          version: 1,
          createdByProfileId: args.offer.createdByProfileId,
          createdAt: new Date(),
          title: args.offer.title,
          pictureUrl: args.offer.pictureUrl,
          pictureMimeType: args.offer.pictureMimeType,
          description: args.offer.description,
          pricePerUnit: args.offer.pricePerUnit,
          timeCirclesPriceShare: args.offer.timeCirclesPriceShare,
          currentInventory: args.offer.currentInventory,
          minAge: args.offer.minAge,
        },
      })
    : Environment.readWriteApiDb.offer.create({
        data: {
          id: existingOffer.id,
          version: existingOffer.version + 1,
          createdByProfileId: args.offer.createdByProfileId,
          createdAt: new Date(),
          title: args.offer.title,
          pictureUrl: args.offer.pictureUrl,
          pictureMimeType: args.offer.pictureMimeType,
          description: args.offer.description,
          pricePerUnit: args.offer.pricePerUnit,
          timeCirclesPriceShare: args.offer.timeCirclesPriceShare,
          currentInventory: args.offer.currentInventory,
          minAge: args.offer.minAge,
        },
      }));
  return <Offer>{
    ...newOffer,
    createdAt: newOffer.createdAt.toJSON(),
    createdByAddress: caller.profile?.circlesAddress,
  };
};
