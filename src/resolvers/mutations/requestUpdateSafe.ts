import {Session} from "../../session";
import {Context} from "../../context";
import {RequestUpdateSafeInput} from "../../types";
import {PrismaClient} from "../../api-db/client";

export function requestUpdateSafe(prisma:PrismaClient) {
    return async (parent: any, args:{data:RequestUpdateSafeInput}, context: Context) => {
        const session = await context.verifySession();
        if (!session.profileId) {
            return {
                success: false,
                errorMessage: "You must have a complete profile to use this function."
            }
        }

        const verifySafeChallenge = Session.generateRandomBase64String(32);
        const profile = await prisma.profile.update({
            where: {
                id: session.profileId
            },
            data: {
                verifySafeChallenge: verifySafeChallenge,
                newSafeAddress: args.data.newSafeAddress
            }
        });

        return {
            success: true,
            challenge: verifySafeChallenge
        };
    }
}