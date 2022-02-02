import {Context} from "../../context";
import {CreatedInvitation} from "../../types";
import {Environment} from "../../environment";

export function myInvitations() {
    return async (parent:any, args:any, context:Context) => {
        const caller = await context.callerInfo;
        if (!caller?.profile || !caller.profile.circlesAddress)
            throw new Error(`You need a profile and safe to use this feature.`);

        const invitations = await Environment.readonlyApiDb.invitation.findMany({
            where: {
                forSafeAddress: caller.profile.circlesAddress
            },
            include: {
                claimedBy: true
            }
        });

        return invitations.map(o => <CreatedInvitation>{
            name: o.name,
            address: o.address,
            ownBalance: "0",
            balance: "0",
            code: o.code,
            createdAt: o.createdAt.toJSON(),
            createdByProfileId: caller.profile?.id,
            claimedBy: o.claimedBy,
            claimedByProfileId: o.claimedByProfileId
        });
    }
}