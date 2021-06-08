import {Context} from "../../context";

export const whoami = async (parent: any, args: any, context: Context) => {
    context.logger?.debug([{
        key: `call`,
        value: `/resolvers/queries/whoami.ts/whoami(parent: any, args: any, context: Context)`
    }]);
    const i = await context.verifySession();
    return i?.emailAddress;
}