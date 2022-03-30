import {Context} from "../../context";
import {Environment} from "../../environment";
import {canAccess} from "../../utils/canAccess";
import {MutationAcknowledgeArgs} from "../../types";

export function acknowledge() {
  return async (parent: any, args: MutationAcknowledgeArgs, context: Context) => {
    if (!context.session?.profileId) {
      throw new Error(`You need a profile to use this function.`);
    }

    const until = new Date(args.until);

    if (!args.safeAddress) {
      await Environment.readWriteApiDb.profile.update({
        where: {
          id: context.session.profileId
        },
        data: {
          lastAcknowledged: until
        }
      });
    } else {
      if (!(await canAccess(context, args.safeAddress))) {
        throw new Error(`Couldn't acknowledge for safeAddress ${args.safeAddress}`);
      } else {
        await Environment.readWriteApiDb.profile.updateMany({
          where: {
            circlesAddress: args.safeAddress
          },
          data: {
            lastAcknowledged: until
          }
        });
      }
    }

    return true;
  }
}