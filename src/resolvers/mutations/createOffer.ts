import {MutationCreateOfferArgs} from "../../types";
import {Context} from "../../context";
import {prisma_rw} from "../../prismaClient";
import {RpcGateway} from "../../rpcGateway";

export function createOfferResolver() {
    return async (parent:any, args:MutationCreateOfferArgs, context:Context) => {
        const session = await context.verifySession();
        const offer = await prisma_rw.offer.create({
            data: {
                createdBy: {
                    connect: {
                        id: session.profileId ?? undefined
                    }
                },
                publishedAt: new Date(),
                category: args.data?.category,
                geonameid: args.data?.geonameid,
                deliveryTerms: args.data?.deliveryTerms,
                description: args.data?.description,
                price: args.data?.price,
                title: args.data?.title,
                pictureUrl:  args.data.pictureUrl,
                priceInCircles: parseFloat(RpcGateway.get().utils.fromWei(args.data?.price, "ether")),
                purchasedAt: null,
                unlistedAt: null
            },
            include: {
                createdBy: true
            }
        });
        return offer;
    };
}