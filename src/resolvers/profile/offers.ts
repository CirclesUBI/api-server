import {Profile} from "../../types";
import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";

export function profileOffers(prisma:PrismaClient) {
    return async (parent: Profile,args:any, context:Context) => {
        context.logger?.trace([{
            key: `call`,
            value: `/resolvers/profile/offers.ts/profileOffers(parent: Profile,args:any, context:Context)`
        }], `Resolving offers of profile ${parent.id} by offer.createdByProfileId == ${parent.id}`);

        const offers = await prisma.offer.findMany({
            where: {
                createdByProfileId: parent.id
            }
        });
        return offers.map(o => {
            return {
                ...o,
                publishedAt: o.publishedAt.toJSON(),
                pictureUrl: o.pictureUrl ? o.pictureUrl : "",
                pictureMimeType: o.pictureMimeType ? o.pictureMimeType : "",
                unlistedAt: o.unlistedAt ? o.unlistedAt.toJSON() : null,
                // purchasedAt: o.purchasedAt ? o.purchasedAt.toJSON() : null
            }
        });
    }
}