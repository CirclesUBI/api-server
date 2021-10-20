import {Context} from "../../context";
import {prisma_api_ro} from "../../apiDbClient";
import {CreatedInvitation} from "../../types";

export function myInvitations() {
    return async (parent:any, args:any, context:Context) => {
        const session = await context.verifySession();
        if (!session.profileId)
            throw new Error(`You need a profile to use this feature.`);

        const invitations = await prisma_api_ro.invitation.findMany({
            where: {
                createdByProfileId: session.profileId
            },
            include: {
                claimedBy: true
            }
        });

        return invitations.map(o => <CreatedInvitation>{
            name: o.name,
            address: o.address,
            balance: "0",
            code: o.code,
            createdAt: o.createdAt.toJSON(),
            createdByProfileId: session.profileId,
            claimedBy: o.claimedBy,
            claimedByProfileId: o.claimedByProfileId
        });
    }
}