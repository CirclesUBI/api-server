import {PrismaClient, CirclesTokenTransferPredicate as DBCirclesTokenTransferPredicate} from '@prisma/client'
import {
    CirclesTokenTransferPredicate as ApiCirclesTokenTransferPredicate,
    MutationAddCirclesTokenTransferArgs
} from "../../types";
import {Context} from "../../context";

export function addCirclesTokenTransferResolver(prisma: PrismaClient) {
    return async (parent: any, args: MutationAddCirclesTokenTransferArgs, context: Context) => {
        const session = await context.verifySession();
        if (!session.profileId)  {
            throw new Error("You must have a profile to perform this action");
        }
        let dbPredicate: DBCirclesTokenTransferPredicate;
        switch (args.data.predicate) {
            case ApiCirclesTokenTransferPredicate.ReceivingFrom:
                dbPredicate = DBCirclesTokenTransferPredicate.RECEIVING_FROM;
                break;
            case ApiCirclesTokenTransferPredicate.GivingTo:
                dbPredicate = DBCirclesTokenTransferPredicate.GIVING_TO;
                break;
            default:
                throw new Error(`Uknown circles token transfer predicate: ${args.data.predicate}`);
        }
        const transfer = await prisma.circlesTokenTransfer.create({
            data: {
                createdAt: new Date(args.data.createdAt),
                createdInBlockNo: args.data.createdInBlockNo,
                createdInBlockHash: args.data.createdInBlockHash,
                token: {
                  connect: {
                      address: args.data.transferredToken
                  }
                },
                subject: {
                    connectOrCreate: {
                        where: {
                            address: args.data.subjectAddress
                        },
                        create: {
                            address: args.data.subjectAddress,
                            addedAt: new Date(),
                            addedById: session.profileId
                        }
                    }
                },
                predicate: dbPredicate,
                object: {
                    connectOrCreate: {
                        where: {
                            address: args.data.objectAddress
                        },
                        create: {
                            address: args.data.objectAddress,
                            addedAt: new Date(),
                            addedById: session.profileId
                        }
                    }
                },
                value: args.data.value
            },
            include: {
                subject: true,
                object: true
            }
        });

        return {
            ...transfer,
            createdAt: transfer.createdAt.toJSON(),
            predicate: args.data.predicate
        };
    };
}