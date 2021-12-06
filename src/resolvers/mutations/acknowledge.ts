import {Context} from "../../context";
import {Environment} from "../../environment";

export function acknowledge() {
    return async (parent:any, args:{until:string}, context:Context) => {
        if (!context.session?.profileId)
        {
          throw new Error(`You need a profile to use this function.`)
        }

        const until = new Date(args.until);
        await Environment.readWriteApiDb.profile.update({
          where: {
            id: context.session.profileId
          },
          data: {
            lastAcknowledged: until
          }
        });

        return true;
    }
}