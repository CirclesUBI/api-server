import {PrismaClient} from "@prisma/client";
import {QueryOffersArgs} from "../../types";

export function offers(prisma:PrismaClient) {
    return async (parent:any, args:QueryOffersArgs) => {
        const offers = await prisma.offer.findMany({
            where: {
                id: args.query.id ?? undefined,
                createdByProfileId: args.query.createdByProfileId ?? undefined,
                purchasedAt: args.query.publishedAt_gt || args.query.publishedAt_gt
                    ? {
                        gt: args.query.publishedAt_gt ?? undefined,
                        lt: args.query.publishedAt_gt ?? undefined
                    }
                    : undefined,
                categoryTagId: args.query.categoryTagId ?? undefined
            },
            orderBy: {
                publishedAt: "desc"
            }
        });
        return offers.map(o => {
            return {
                ...o,
                pictureUrl: o.pictureUrl ? o.pictureUrl : "",
                pictureMimeType: o.pictureMimeType ? o.pictureMimeType : "",
                publishedAt: o.publishedAt.toJSON(),
                unlistedAt: o.unlistedAt ? o.unlistedAt.toJSON() : null,
                purchasedAt: o.purchasedAt ? o.purchasedAt.toJSON() : null
            }
        });
    }
}