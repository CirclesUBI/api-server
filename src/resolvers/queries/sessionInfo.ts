import {Context} from "../../context";
import {SessionInfo} from "../../types";

export const sessionInfo = async (parent:any, args:any, context:Context) : Promise<SessionInfo> => {
    try {
        const session = await context.verifySession();
        return {
            isLoggedOn: true,
            hasProfile: !!session.profileId,
            profileId: session.profileId
        }
    } catch {
        return {
            isLoggedOn: false
        }
    }
}