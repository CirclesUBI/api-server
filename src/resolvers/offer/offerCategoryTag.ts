import {PrismaClient} from "@prisma/client";
import {Offer} from "../../types";

export function offerCategoryTag(prisma: PrismaClient) {
    return async (parent: Offer) => {
        const tag = await prisma.tag.findUnique({
            where: {id: parent.categoryTagId}
        });
        if (!tag)
            throw new Error(`Couldn't find the category tag with id ${parent.categoryTagId} for Offer ${parent.id}`);

        return {
            ...tag,
            type: tag.typeId
        };
    }
}