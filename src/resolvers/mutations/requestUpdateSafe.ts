import {PrismaClient} from "@prisma/client";
import {Session} from "../../session";
import {Context} from "../../context";
import {RequestUpdateSafeInput} from "../../types";

export function requestUpdateSafe(prisma:PrismaClient) {
    return async (parent: any, args:{data:RequestUpdateSafeInput}, context: Context) => {
        const session = await context.verifySession();
        if (!session.profileId) {
            return {
                success: false,
                errorMessage: "Create a profile first."
            }
        }

        const verifySafeChallenge = Session.generateRandomBase64String(32);
        prisma.profile.update({
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