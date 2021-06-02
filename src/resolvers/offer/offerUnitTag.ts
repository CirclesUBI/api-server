import {PrismaClient} from "@prisma/client";
import {Offer} from "../../types";

export function offerUnitTag(prisma: PrismaClient) {
    return async (parent: Offer) => {
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