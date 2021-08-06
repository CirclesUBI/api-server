import {PrismaClient} from "@prisma/client";
import {Context} from "../../context";
import {MutationUpdateSafeArgs} from "../../types";
import {prisma_ro} from "../../prismaClient";
import Web3 from "web3";
import {GnosisSafeProxy} from "../../web3Contract";
import {RpcGateway} from "../../rpcGateway";

export function updateSafe(prisma:PrismaClient) {
    return async (parent: any, args:MutationUpdateSafeArgs, context: Context) => {
        context.logger?.info([{
            key: `call`,
            value: `/resolvers/mutation/updateSafe.ts/updateSafe(prisma:PrismaClient)/async (parent: any, args: MutationUpdateSafeArgs, context: Context)`
        }]);

        const session = await context.verifySession();
        if (!session.profileId) {
            return {
                success: false,
                errorMessage: "Create a profile first."
            };
        }
        const currentProfile = await prisma_ro.profile.findUnique({where: {id: session.profileId}});
        if (!currentProfile) {
            throw new Error(`Couldn't find the profile (${session.profileId}) that was associated with session '${session.sessionId}'.`);
        }
        if (!currentProfile.verifySafeChallenge || !currentProfile.newSafeAddress) {
            return {
                success: false,
                errorMessage: "You must call 'requestUpdateSafe' first."
            };
        }

        const signingAddress = new Web3().eth.accounts.recover(currentProfile.verifySafeChallenge, args.data.signature);
        const safe = new GnosisSafeProxy(RpcGateway.get(), signingAddress, currentProfile.newSafeAddress);
        const owners = await safe.getOwners();
        if (owners.map(o => o.toLowerCase()).indexOf(signingAddress.toLowerCase()) < 0) {
            return {
                success: false,
                errorMessage: "You are not the owner of the specified safe."
            };
        }

        await prisma.profile.update({
            where: {
                id: session.profileId
            },
            data: {
                circlesAddress: currentProfile.newSafeAddress,
                newSafeAddress: null
            }
        });

        return {
            success: true,
            newSafeAddress: currentProfile.newSafeAddress
        };
    }
}