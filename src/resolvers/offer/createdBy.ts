import {Offer} from "../../types";
import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";

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