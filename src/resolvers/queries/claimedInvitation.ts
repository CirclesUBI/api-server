import {prisma_api_rw} from "../../apiDbClient";
import {Context} from "../../context";
import {ClaimedInvitation} from "../../types";

export const claimedInvitation = async (parent:any, args:any, context:Context) => {
    const session = await context.verifySession();
    const profile = await prisma_api_rw.profile.findFirst({
        where:{
            //OR:[{
            //    emailAddress: null,
                circlesSafeOwner: session.ethAddress?.toLowerCase()
            //}, {
            //    emailAddress: session.emailAddress
            //}]
            //}]
        },
        include: {
            claimedInvitations: true
        }
    });
    if (!profile || profile.claimedInvitations.length == 0){
        return null;
    }

    const claimedInvitation = profile.claimedInvitations[0];
    if (!claimedInvitation.claimedAt || !claimedInvitation.claimedByProfileId)
        throw new Error(`The invitation with code '${claimedInvitation.code}' was claimed by profile ${profile.id} but the 'claimedAt' field is not set.`);

    return <ClaimedInvitation>{
        createdAt: claimedInvitation.createdAt.toJSON(),
        createdByProfileId: claimedInvitation.createdByProfileId,
        claimedAt: claimedInvitation.claimedAt.toJSON(),
        claimedByProfileId: claimedInvitation.claimedByProfileId
    }
}