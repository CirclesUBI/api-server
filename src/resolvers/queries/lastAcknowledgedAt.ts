import {Context} from "../../context";
import {Environment} from "../../environment";
import {QueryLastAcknowledgedAtArgs} from "../../types";
import {canAccess} from "../../utils/canAccess";

export const lastAcknowledgedAt = async (parent: any, args: QueryLastAcknowledgedAtArgs, context: Context) => {
    if (!(await canAccess(context, args.safeAddress))) {
        throw new Error(`You cannot access the specified safe address.`);
    }
    const lastAcknowledgedDate = await Environment.readWriteApiDb.profile.findFirst({
        where: {
            circlesAddress: args.safeAddress
        },
        select: {
            lastAcknowledged: true
        }
    });
    return lastAcknowledgedDate?.lastAcknowledged;
}