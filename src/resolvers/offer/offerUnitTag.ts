import {Offer} from "../../types";
import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";

export function offerUnitTag(prisma: PrismaClient) {
    return async (parent: Offer,args:any, context:Context) => {
        context.logger?.trace([{
            key: `call`,
            value: `/resolvers/offer/offerUnitTag.ts/offerUnitTag(parent:Offer, args:any, context:Context)`
        }], `Resolving unit tag of offer ${parent.id} by unitTagId ${parent.unitTagId}`);

        const tag = await prisma.tag.findUnique({
            where: {id: parent.unitTagId}
        });
        if (!tag)
            throw new Error(`Couldn't find the unitTag with id ${parent.unitTagId} for Offer ${parent.id}`);

        return {
            ...tag,
            type: tag.typeId
        };
    }
}