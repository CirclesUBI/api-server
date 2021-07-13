import {Context} from "../../context";
import {prisma_rw} from "../../prismaClient";
import {MutationUnlistOfferArgs} from "../../types";

export function unlistOfferResolver() {
    return async (parent:any, args:MutationUnlistOfferArgs, context:Context) => {
        context.logger?.info([{
            key: `call`,
            value: `/resolvers/mutation/unlistOffer.ts/unlistOfferResolver(prisma:PrismaClient)/async (parent: any, args: MutationUnlistOfferArgs, context: Context)`
        }]);
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

        if (result.count > 0) {
            context.logger?.debug([{
                key: `call`,
                value: `/resolvers/mutation/unlistOffer.ts/unlistOfferResolver(prisma:PrismaClient)/async (parent: any, args: any, context: Context)`
            }], `Unlisted ${args.offerId}`);
        } else {
            context.logger?.warning([{
                key: `call`,
                value: `/resolvers/mutation/unlistOffer.ts/unlistOfferResolver(prisma:PrismaClient)/async (parent: any, args: any, context: Context)`
            }], `Couldn't unlist ${args.offerId} (not found or not created by ${session.profileId}).`);
        }

        return result.count > 0;
    };
}