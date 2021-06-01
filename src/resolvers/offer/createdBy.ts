import {PrismaClient} from "@prisma/client";
import {Offer} from "../../types";

export function offerCreatedBy(prisma:PrismaClient) {
    return async (parent:Offer) => {
        const profile = await prisma.profile.findUnique({where:{id: parent.createdByProfileId}});
        return profile;
    }
}