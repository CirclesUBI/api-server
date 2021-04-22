import { PrismaClient } from "@prisma/client";
import {CirclesTrustRelationPredicate, MutationAddCirclesTrustRelationArgs} from "../../types";
import {Context} from "../../context";

export function addCirclesTrustRelationResolver(prisma:PrismaClient) {
    return async (parent:any, args:MutationAddCirclesTrustRelationArgs, context:Context) => {
        const session = await context.verifySession();
        if (!session.profileId)  {
            throw new Error("You must have a profile to perform this action");
        }
        /*
        const trustRelation = await prisma.circlesTrustRelation.create({
            data: {
                createdAt: new Date(args.data.createdAt),
                createdInBlockHash: args.data.createdInBlockHash,
                createdInBlockNo: args.data.createdInBlockNo,
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
                predicate: args.data.predicate,
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
                weight: args.data.weight
            },
            include: {
                subject: true,
                object: true
            }
        });
        let predicate: CirclesTrustRelationPredicate;
        switch (trustRelation.predicate) {
            case "RECEIVING_FROM":
                predicate = CirclesTrustRelationPredicate.ReceivingFrom;
                break;
            case "GIVING_TO":
                predicate = CirclesTrustRelationPredicate.GivingTo;
                break;
            default:
                throw new Error(`Unknown trust relation predicate: ${trustRelation.predicate}`)
        }
        return {
            ...trustRelation,
            predicate: predicate,
            createdAt: trustRelation.createdAt.toJSON()
        };
         */
        return {
        }
    };
}