import {PrismaClient} from "@prisma/client";
import {MutationUpsertProfileArgs, Profile} from "../../types";
import {Context} from "../../context";
import {Session} from "../../session";

export function upsertProfileResolver(prisma_rw:PrismaClient) {
    return async (parent:any, args:MutationUpsertProfileArgs, context:Context) => {
        context.logger?.info([{
            key: `call`,
            value: `/resolvers/mutation/upsertProfile.ts/upsertProfileResolver(parent:any, args:MutationUpsertProfileArgs, context:Context)`
        }]);
        const session = await context.verifySession();
        let profile:Profile;

        if(args.data.circlesAddress) {
            args.data.circlesAddress = args.data.circlesAddress.toLowerCase();
        }

        if (args.data.id) {
            context.logger?.debug([{
                key: `call`,
                value: `/resolvers/mutation/upsertProfile.ts/upsertProfileResolver(parent:any, args:MutationUpsertProfileArgs, context:Context)`
            }], `Updating profile`);
            if (args.data.id != session.profileId) {
                throw new Error(`'${session.sessionId}' (profile id: ${session.profileId ?? "<undefined>"}) can not upsert other profile '${args.data.id}'.`);
            }
            profile = await prisma_rw.profile.update({
                where: {
                    id: args.data.id
                },
                data: {
                    ...args.data,
                    id: args.data.id,
                    emailAddress: session.emailAddress
                }
            });
        } else {
            context.logger?.debug([{
                key: `call`,
                value: `/resolvers/mutation/upsertProfile.ts/upsertProfileResolver(parent:any, args:MutationUpsertProfileArgs, context:Context)`
            }], `Creating profile`);
            profile = await prisma_rw.profile.create({
                data: {
                    ...args.data,
                    id: undefined,
                    emailAddress: session.emailAddress
                }
            });
            await Session.assignProfile(prisma_rw, session.sessionId, profile.id, context);
        }
        return profile;
    };
}