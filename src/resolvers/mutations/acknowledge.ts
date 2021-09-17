import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";

export function acknowledge(prisma_api_rw:PrismaClient) {
    return async (parent:any, args:{until:string}, context:Context) => {
        const session = await context.verifySession();
        if (!session.profileId)
        {
          throw new Error(`You need a profile to use this function.`)
        }
        const until = new Date(args.until);
        await prisma_api_rw.profile.update({
          where: {
            id: session.profileId
          },
          data: {
            lastAcknowledged: until
          }
        });
        return true;
    }
}