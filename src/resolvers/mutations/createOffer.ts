import {MutationCreateOfferArgs} from "../../types";
import {Context} from "../../context";
import {prisma_rw} from "../../prismaClient";
import {PrismaClient} from "@prisma/client";

export function createOfferResolver(prisma:PrismaClient) {
    return async (parent:any, args:MutationCreateOfferArgs, context:Context) => {
        const session = await context.verifySession();
        const offer = await prisma_rw.offer.create({
            data: {
                createdBy: {
                    connect: {
                        id: session.profileId ?? undefined
                    }
                },
                publishedAt: new Date(),
                category: args.data.category,
                geonameid: args.data.geonameid,
                deliveryTerms: args.data.deliveryTerms,
                description: args.data.description,
                unit: args.data.unit,
                maxUnits: args.data.maxUnits,
                pricePerUnit: args.data.pricePerUnit,
                title: args.data?.title,
                pictureUrl:  args.data.pictureUrl,
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
    };
}