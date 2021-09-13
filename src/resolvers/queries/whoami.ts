import {Context} from "../../context";

export const whoami = async (parent: any, args: any, context: Context) => {
    

    const i = await context.verifySession();
    return i?.emailAddress;
}