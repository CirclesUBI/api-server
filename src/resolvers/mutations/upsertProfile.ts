import {DisplayCurrency, MutationUpsertProfileArgs, Profile} from "../../types";
import {Context} from "../../context";
import {Session} from "../../session";
import {PrismaClient} from "../../api-db/client";
import {ProfileLoader} from "../../profileLoader";

export function upsertProfileResolver(prisma_api_rw:PrismaClient) {
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
            profile = ProfileLoader.withDisplayCurrency(await prisma_api_rw.profile.update({
                where: {
                    id: args.data.id
                },
                data: {
                    ...args.data,
                    id: args.data.id,
                    lastUpdateAt: new Date(),
                    emailAddress: session.emailAddress ?? undefined,
                    circlesSafeOwner: session.ethAddress?.toLowerCase(),
                    displayCurrency: <DisplayCurrency>args.data.displayCurrency
                }
            }));
        } else {
            context.logger?.debug([{
                key: `call`,
                value: `/resolvers/mutation/upsertProfile.ts/upsertProfileResolver(parent:any, args:MutationUpsertProfileArgs, context:Context)`
            }], `Creating profile`);
            profile = ProfileLoader.withDisplayCurrency(await prisma_api_rw.profile.create({
                data: {
                    ...args.data,
                    id: undefined,
                    lastUpdateAt: new Date(),
                    emailAddress: session.emailAddress,
                    circlesSafeOwner: session.ethAddress?.toLowerCase(),
                    lastAcknowledged: new Date(),
                    lastInvoiceNo: 0,
                    lastRefundNo: 0,
                    displayCurrency: <DisplayCurrency>args.data.displayCurrency
                }
            }));
            await Session.assignProfile(prisma_api_rw, session.sessionId, profile.id, context);
        }
        return profile;
    };
}