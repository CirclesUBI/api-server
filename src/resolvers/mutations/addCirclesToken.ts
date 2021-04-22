import { PrismaClient } from "@prisma/client";
import {MutationAddCirclesTokenArgs} from "../../types";
import {Context} from "../../context";

export function addCirclesTokenResolver(prisma:PrismaClient) {
    return async (parent:any, args:MutationAddCirclesTokenArgs, context:Context) => {
        const session = await context.verifySession()
        if (!session.profileId) {
            throw new Error("No profile for this email address: " + session.emailAddress);
        }

        const wallet = await prisma.circlesWallet.findFirst({
            where: {
                addedById: session.profileId,
                address: args.data.address
            }
        });

        if (!wallet) {
            throw new Error(`You must first create a wallet.`)
        }

        const token = await prisma.circlesToken.create({
                data: {
                    address: args.data.address,
                    createdAt: new Date(args.data.createdAt),
                    createdInBlockNo: args.data.createdInBlockNo,
                    createdInBlockHash: args.data.createdInBlockHash,
                    owner: {
                        connect: {
                            id: wallet.id
                        }
                    }
                }
            });

        return {
            ...token,
            createdAt: token.createdAt.toJSON()
        };
    };
}