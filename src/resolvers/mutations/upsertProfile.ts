import {DisplayCurrency, MutationUpsertProfileArgs, Profile} from "../../types";
import {Context} from "../../context";
import {Session} from "../../session";
import {ProfileLoader} from "../../profileLoader";
import {Environment} from "../../environment";

export function upsertProfileResolver() {
    return async (parent:any, args:MutationUpsertProfileArgs, context:Context) => {
        const session = await context.verifySession();
        let profile:Profile;

        if(args.data.circlesAddress) {
            args.data.circlesAddress = args.data.circlesAddress.toLowerCase();
        }

        if (args.data.id) {
            if (args.data.id != session.profileId) {
                throw new Error(`'${session.sessionToken}' (profile id: ${session.profileId ?? "<undefined>"}) can not upsert other profile '${args.data.id}'.`);
            }
            profile = ProfileLoader.withDisplayCurrency(await Environment.readWriteApiDb.profile.update({
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
            profile = ProfileLoader.withDisplayCurrency(await Environment.readWriteApiDb.profile.create({
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
            await Session.assignProfile(session.sessionToken, profile.id, context);
        }
        return profile;
    };
}