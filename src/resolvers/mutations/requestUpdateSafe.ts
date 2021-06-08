import {PrismaClient} from "@prisma/client";
import {Session} from "../../session";
import {Context} from "../../context";
import {RequestUpdateSafeInput} from "../../types";

export function requestUpdateSafe(prisma:PrismaClient) {
    return async (parent: any, args:{data:RequestUpdateSafeInput}, context: Context) => {
        context.logger?.debug([{
            key: `call`,
            value: `/resolvers/mutation/requestUpdateSafe.ts/requestUpdateSafe(prisma:PrismaClient)/async (parent: any, args: {data:RequestUpdateSafeInput}, context: Context)`
        }]);

        const session = await context.verifySession();
        if (!session.profileId) {
            context.logger?.warning([{
                key: `call`,
                value: `/resolvers/mutation/requestUpdateSafe.ts/requestUpdateSafe(prisma:PrismaClient)/async (parent: any, args: any, context: Context)`
            }], `Create a profile first.`);
            return {
                success: false,
                errorMessage: "Create a profile first."
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

        context.logger?.debug([{
            key: `call`,
            value: `/resolvers/mutation/requestUpdateSafe.ts/requestUpdateSafe(prisma:PrismaClient)/async (parent: any, args: any, context: Context)`
        }], `Deposited challenge to change safe address.`, {
            oldSafeAddress: profile.circlesAddress,
            newSafeAddress: args.data.newSafeAddress
        });

        return {
            success: true,
            challenge: verifySafeChallenge
        };
    }
}