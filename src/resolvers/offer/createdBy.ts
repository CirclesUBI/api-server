import {PrismaClient} from "@prisma/client";
import {Offer} from "../../types";
import {Context} from "../../context";

export function offerCreatedBy(prisma:PrismaClient) {
    return async (parent:Offer, args:any, context:Context) => {
        context.logger?.trace([{
            key: `call`,
            value: `/resolvers/offer/createdBy.ts/offerCreatedBy(parent:Offer, args:any, context:Context)`
        }], `Resolving createdBy profile of offer ${parent.id} by createdByProfileId ${parent.createdByProfileId}`);
        const profile = await prisma.profile.findUnique({where:{id: parent.createdByProfileId}});
        return profile;
    }
}