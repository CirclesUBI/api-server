import {MutationUpsertOfferArgs} from "../../types";
import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";

// TODO: Throttle max. offer creations per minute at ~ 0.5 per profile
// TODO: Cache all newly created objects in redis until they're replicated

async function createOffer(parent:any, args:MutationUpsertOfferArgs, context:Context, prisma:PrismaClient) {
    context.logger?.info([{
        key: `call`,
        value: `/resolvers/mutation/upsertOffer.ts/createOffer(parent:any, args:MutationUpsertOfferArgs, context:Context, prisma:PrismaClient)`
    }]);
    const session = await context.verifySession();
    const offer = await prisma.offer.create({
        data: {
            createdByProfileId: <number>session.profileId,
            categoryTagId: args.data.categoryTagId,
            publishedAt: new Date(),
            geonameid: args.data.geonameid,
            deliveryTermsTagId: args.data.deliveryTermsTagId,
            description: args.data.description,
            unitTagId: args.data.unitTagId,
            maxUnits: args.data.maxUnits,
            pricePerUnit: args.data.pricePerUnit,
            title: args.data.title,
            pictureUrl: args.data.pictureUrl,
            pictureMimeType: args.data.pictureMimeType,
            unlistedAt: null
        }
    });
    context.logger?.debug([{
        key: `call`,
        value: `/resolvers/mutation/upsertOffer.ts/createOffer(parent:any, args:MutationUpsertOfferArgs, context:Context, prisma:PrismaClient)`
    }], `Created offer`, {
        id: offer.id,
        title: offer.title,
        publishedAt: offer.publishedAt,
        createdByProfileId: <number>session.profileId,
    });
    return {
        ...offer,
        publishedAt: offer.publishedAt.toJSON(),
        pictureUrl: offer.pictureUrl ? offer.pictureUrl : "",
        pictureMimeType: offer.pictureMimeType ? offer.pictureMimeType : "",
        unlistedAt: offer.unlistedAt ? offer.unlistedAt?.toJSON() : null
    };
}

async function updateOffer(parent:any, args:MutationUpsertOfferArgs, context:Context, prisma:PrismaClient) {
    context.logger?.debug([{
        key: `call`,
        value: `/resolvers/mutation/upsertOffer.ts/updateOffer(parent:any, args:MutationUpsertOfferArgs, context:Context, prisma:PrismaClient)`
    }]);

    const session = await context.verifySession();
    const existingOffer = await prisma.offer.findFirst({
        where: {
            id: <number>args.data.id,
            unlistedAt: null
        },
        select: {
            createdByProfileId: true,
            publishedAt: true
        }
    });
    if (!existingOffer || existingOffer.createdByProfileId !== session.profileId) {
        throw new Error(`Profile ${session.profileId} cannot find or edit the offer with id ${args.data.id}. `
        + `Either ${session.profileId} isn't the owner or the offer was already purchased or unlisted.`)
    }
    const offer = await prisma.offer.update({
        data: {
            createdByProfileId: <number>session.profileId,
            publishedAt: existingOffer.publishedAt,
            categoryTagId: args.data.categoryTagId,
            geonameid: args.data.geonameid,
            deliveryTermsTagId: args.data.deliveryTermsTagId,
            description: args.data.description,
            unitTagId: args.data.unitTagId,
            maxUnits: args.data.maxUnits,
            pricePerUnit: args.data.pricePerUnit,
            title: args.data.title,
            pictureUrl: args.data.pictureUrl,
            pictureMimeType: args.data.pictureMimeType
        },
        where: {
            id: <number>args.data.id
        }
    });

    context.logger?.debug([{
        key: `call`,
        value: `/resolvers/mutation/upsertOffer.ts/updateOffer(parent:any, args:MutationUpsertOfferArgs, context:Context, prisma:PrismaClient)`
    }], `Updated offer`, {
        id: offer.id,
        title: offer.title,
        publishedAt: offer.publishedAt,
        createdByProfileId: <number>session.profileId,
    });

    return {
        ...offer,
        publishedAt: offer.publishedAt.toJSON(),
        pictureUrl: offer.pictureUrl ? offer.pictureUrl : "",
        pictureMimeType: offer.pictureMimeType ? offer.pictureMimeType : "",
        unlistedAt: offer.unlistedAt ? offer.unlistedAt?.toJSON() : null,
        // purchasedAt: offer.purchasedAt ? offer.purchasedAt?.toJSON() : null
    };
}

export function upsertOfferResolver(prisma:PrismaClient) {
    return async (parent:any, args:MutationUpsertOfferArgs, context:Context) => {
        const offer = args.data.id
            ? await updateOffer(parent, args, context, prisma)
            : await createOffer(parent, args, context, prisma);

        return offer;
    };
}