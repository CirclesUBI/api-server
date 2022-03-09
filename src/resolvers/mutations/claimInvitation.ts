import {ClaimInvitationResult} from "../../types";
import {Context} from "../../context";
import {Environment} from "../../environment";

export function claimInvitation() {
    return async (parent:any, args:{code:string}, context:Context) => {
        const session = await context.verifySession();

        if (!session.profileId) {
            throw new Error("A user with session but without profile tried to claim an invitation.");
        }

        const now = new Date();
        const updatedCount = await Environment.readWriteApiDb.invitation.updateMany({
            where: {
                code: args.code,
                claimedByProfileId: null
            },
            data: {
                claimedAt: now,
                claimedByProfileId: session.profileId
            }
        });

        if (updatedCount.count > 1) {
            const msg = `A user claimed more than one invitation with the same code: ${args.code}`;
            throw new Error(msg);
        }
        if (updatedCount.count != 1) {
            return <ClaimInvitationResult>{
                success: false
            };
        }

        const claimedInvitation = await Environment.readWriteApiDb.invitation.findFirst({
            where: {code: args.code}
        });

        if (!claimedInvitation)
            throw new Error(`Couldn't find the previously claimed invitation with the code '${args.code}' in the db.`);
        if (!claimedInvitation.claimedAt || !claimedInvitation.claimedByProfileId)
            throw new Error(`The invitation with code '${args.code}' was claimed by profile ${session.profileId} but the changes didn't manifest in the db.`);

        return <ClaimInvitationResult>{
            success: true,
            claimedInvitation: {
                createdAt: claimedInvitation.createdAt.toJSON(),
                createdByProfileId: claimedInvitation.createdByProfileId,
                claimedAt: claimedInvitation.claimedAt.toJSON(),
                claimedByProfileId: claimedInvitation.claimedByProfileId
            }
        };
    }
}