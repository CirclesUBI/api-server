import {Offer} from "../../types";
import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";

export function offerCategoryTag(prisma: PrismaClient) {
    return async (parent: Offer,args:any, context:Context) => {
        context.logger?.trace([{
            key: `call`,
            value: `/resolvers/offer/offerCategoryTag.ts/offerCategoryTag(parent:Offer, args:any, context:Context)`
        }], `Resolving category tag of offer ${parent.id} by categoryTagId ${parent.categoryTagId}`);

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