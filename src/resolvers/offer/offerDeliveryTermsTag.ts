import {Offer} from "../../types";
import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";

export function offerDeliveryTermsTag(prisma: PrismaClient) {
    return async (parent: Offer,args:any, context:Context) => {
        context.logger?.trace([{
            key: `call`,
            value: `/resolvers/offer/deliveryTermsTagId.ts/offerDeliveryTermsTag(parent:Offer, args:any, context:Context)`
        }], `Resolving delivery terms tag of offer ${parent.id} by deliveryTermsTagId ${parent.deliveryTermsTagId}`);

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