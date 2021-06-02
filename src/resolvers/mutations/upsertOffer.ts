import {MutationUpsertOfferArgs} from "../../types";
import {Context} from "../../context";
import {PrismaClient} from "@prisma/client";

export function upsertOfferResolver(prisma:PrismaClient) {
    return async (parent:any, args:MutationUpsertOfferArgs, context:Context) => {
        const session = await context.verifySession();
        if (args.data.id) {
            const existingOffer = await prisma.offer.findUnique({
                where: {id: args.data.id},
                select: {createdByProfileId: true}
            });
            if (!existingOffer || existingOffer.createdByProfileId !== session.profileId) {
                throw new Error(`Profile ${session.profileId} cannot find or edit the offer with id ${args.data.id}`)
            }
            const offer = await prisma.offer.update({
                data: {
                    createdBy: {
                        connect: {
                            id: session.profileId ?? undefined
                        }
                    },
                    categoryTag: {
                        connect: {
                            id: args.data.categoryTagId
                        }
                    },
                    publishedAt: new Date(),
                    geonameid: args.data.geonameid,
                    deliveryTermsTag: {
                        connect: {
                            id: args.data.deliveryTermsTagId
                        }
                    },
                    description: args.data.description,
                    unitTag: {
                        connect: {
                            id: args.data.unitTagId
                        }
                    },
                    maxUnits: args.data.maxUnits,
                    pricePerUnit: args.data.pricePerUnit,
                    title: args.data?.title,
                    pictureUrl: args.data.pictureUrl,
                    pictureMimeType: args.data.pictureMimeType,
                    purchasedAt: null,
                    unlistedAt: null
                },
                where: {
                    id: args.data.id
                }
            });
            return {
                ...offer,
                publishedAt: offer.publishedAt.toJSON(),
                unlistedAt: offer.unlistedAt ? offer.unlistedAt?.toJSON() : null,
                purchasedAt: offer.purchasedAt ? offer.purchasedAt?.toJSON() : null
            };
        } else {
            const offer = await prisma.offer.create({
                data: {
                    createdBy: {
                        connect: {
                            id: session.profileId ?? undefined
                        }
                    },
                    categoryTag: {
                        connect: {
                            id: args.data.categoryTagId
                        }
                    },
                    publishedAt: new Date(),
                    geonameid: args.data.geonameid,
                    deliveryTermsTag: {
                        connect: {
                            id: args.data.deliveryTermsTagId
                        }
                    },
                    description: args.data.description,
                    unitTag: {
                        connect: {
                            id: args.data.unitTagId
                        }
                    },
                    maxUnits: args.data.maxUnits,
                    pricePerUnit: args.data.pricePerUnit,
                    title: args.data?.title,
                    pictureUrl: args.data.pictureUrl,
                    pictureMimeType: args.data.pictureMimeType,
                    purchasedAt: null,
                    unlistedAt: null
                }
            });
            return {
                ...offer,
                publishedAt: offer.publishedAt.toJSON(),
                unlistedAt: offer.unlistedAt ? offer.unlistedAt?.toJSON() : null,
                purchasedAt: offer.purchasedAt ? offer.purchasedAt?.toJSON() : null
            };
        }
    };
}