import {Context} from "../../context";

export const hasProfileResolver = async (parent:any, args:any, context:Context) => {
    try {
        const session = await context.verifySession();
        return {
            success: !!session.profileId
        }
    } catch {
        return {
            success: false
        }
    }
}