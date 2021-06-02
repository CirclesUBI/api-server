import {PrismaClient} from "@prisma/client";
import {QueryOfferCategoriesArgs} from "../../types";
import {InitDb} from "../../initDb";

export function offerCategories(prisma:PrismaClient) {
    return async (parent:any, args:QueryOfferCategoriesArgs) => {
        const categories = await prisma.tag.findMany({
            where: {
                typeId: InitDb.Tag_Marketplace_Offer_Category
            },
            select: {
                typeId: true
            }
        });
        return categories.map(o => o.typeId);
    }
}