import {PrismaClient} from "@prisma/client";
import {Offer} from "../../types";

export function offerDeliveryTermsTag(prisma: PrismaClient) {
    return async (parent: Offer) => {
        const tag = await prisma.tag.findUnique({
            where: {id: parent.deliveryTermsTagId}
        });
        if (!tag)
            throw new Error(`Couldn't find the deliveryTermsTag with id ${parent.deliveryTermsTagId} for Offer ${parent.id}`);

        return {
            ...tag,
            type: tag.typeId
        };
    }
}