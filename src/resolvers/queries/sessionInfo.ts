import {Context} from "../../context";
import {SessionInfo} from "../../types";
import {newLogger} from "../../logger";

const logger = newLogger("/resolvers/queries/sessionInfo.ts");

export const sessionInfo = async (parent:any, args:any, context:Context) : Promise<SessionInfo> => {
    try {
        logger.log(`${context.ipAddress}' called sessionInfo.`)
        const session = await context.verifySession();

        logger.log(`${context.ipAddress}' has a valid session until ${new Date(new Date(session.createdAt).getTime() + session.maxLifetime).toJSON()}`)

        return {
            isLoggedOn: true,
            hasProfile: !!session.profileId,
            profileId: session.profileId
        }
    } catch(e) {
        logger.log(`${context.ipAddress}' has a no valid session. Error is:`, e);

        return {
            isLoggedOn: false
        }
    }
}