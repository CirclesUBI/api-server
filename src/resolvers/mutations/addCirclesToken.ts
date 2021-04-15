import { PrismaClient } from "@prisma/client";
import {MutationAddCirclesTokenArgs} from "../../types";
import {Context} from "../../context";

export function addCirclesTokenResolver(prisma:PrismaClient) {
    return async (parent:any, args:MutationAddCirclesTokenArgs, context:Context) => {
        const session = await context.verifySession()
        const profile = await prisma.profile.findUnique({where:{emailAddress: session.emailAddress}});
        if (!profile) {
            throw new Error("No profile for this email address: " + session.emailAddress);
        }

        const token = await prisma.circlesToken.create({
                data: {
                    address: args.data.address,
                    createdAt: new Date(args.data.createdAt),
                    createdInBlockNo: args.data.createdInBlockNo,
                    createdInBlockHash: args.data.createdInBlockHash,
                    owner: {
                        connectOrCreate: {
                            where: {
                                address: args.data.ownerAddress
                            },
                            create: {
                                address: args.data.ownerAddress,
                                addedAt: new Date(),
                                addedById: profile.id
                            }
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