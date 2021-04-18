import {Context} from "../../context";

export const hasValidSessionResolver = async (parent:any, args:any, context:Context) => {
    try {
        await context.verifySession();
        return {
            success: true
        }
    } catch {
        return {
            success: false
        }
    }
}