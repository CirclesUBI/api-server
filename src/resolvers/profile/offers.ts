import {prisma_ro} from "../../prismaClient";
import {PrismaClient} from "@prisma/client";
import {Profile} from "../../types";

export function profileOffers(prisma:PrismaClient) {
    return async (parent:Profile) => {
        const offers = await prisma_ro.offer.findMany({
            where: {
                createdByProfileId: parent.id
            }
        });
        return offers.map(o => {
            return {
                ...o,
                publishedAt: o.publishedAt.toJSON(),
                unlistedAt: o.unlistedAt ? o.unlistedAt.toJSON() : null,
                purchasedAt: o.purchasedAt ? o.purchasedAt.toJSON() : null
            }
        });
    }
}