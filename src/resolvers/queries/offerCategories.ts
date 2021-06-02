import {PrismaClient} from "@prisma/client";
import {QueryOfferCategoriesArgs} from "../../types";

export function offerCategories(prisma:PrismaClient) {
    return async (parent:any, args:QueryOfferCategoriesArgs) => {
        const categories = await prisma.offer.findMany({
            select: {
                category: true
            },
            where: args.like
                ? {
                    category: {
                        startsWith: args.like
                    }
                }
                : undefined,
            distinct: ['category']
        });
        return categories.map(o => o.category);
    }
}