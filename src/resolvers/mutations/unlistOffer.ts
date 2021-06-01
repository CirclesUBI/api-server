import {Context} from "../../context";
import {prisma_rw} from "../../prismaClient";
import {MutationUnlistOfferArgs} from "../../types";

export function unlistOfferResolver() {
    return async (parent:any, args:MutationUnlistOfferArgs, context:Context) => {
        const session = await context.verifySession();
        const result = await prisma_rw.offer.updateMany({
            where: {
                id: args.offerId,
                createdByProfileId: session.profileId ?? undefined
            },
            data: {
                unlistedAt: new Date()
            }
        });

        return result.count > 0;
    };
}