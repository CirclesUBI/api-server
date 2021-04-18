import {Context} from "../../context";

export const hasValidSessionResolver = async (parent:any, args:any, context:Context) => {
    const session = await context.verifySession();
    return {
        success: !!session
    }
}