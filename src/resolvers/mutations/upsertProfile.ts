import {DisplayCurrency, MutationUpsertProfileArgs, Profile} from "../../types";
import {Context} from "../../context";
import {Session} from "../../session";
import {ProfileLoader} from "../../profileLoader";
import {Environment} from "../../environment";
import {TestData} from "../../api-db/testData";
import {RpcGateway} from "../../rpcGateway";
import {GnosisSafeProxy} from "../../web3Contract";

export function upsertProfileResolver() {
    return async (parent:any, args:MutationUpsertProfileArgs, context:Context) => {
        const session = await context.verifySession();
        let profile:Profile;

        if (args.data.circlesAddress && !RpcGateway.get().utils.isAddress(args.data.circlesAddress)) {
            throw new Error(`Invalid 'circlesAddress': ${args.data.circlesAddress}`);
        }

        if (args.data.circlesAddress) {
            context.log(`Verifying if the associated eoa of session '${session.id}' (${session.ethAddress}) is an owner of safe ${args.data.circlesAddress} ..`);
            args.data.circlesAddress = args.data.circlesAddress.toLowerCase();

            if (!session.ethAddress) {
                throw new Error(`Session ${session.id} has no associated eoa.`)
            }
            const safe = new GnosisSafeProxy(RpcGateway.get(), session.ethAddress, args.data.circlesAddress);
            const owners = await safe.getOwners();

            context.log(`Safe owners are: ${JSON.stringify(owners)}`)

            const matchingOwners = owners.map(o => o.toLowerCase()).filter(o => o == session.ethAddress?.toLowerCase());
            if (matchingOwners.length != 1) {
                throw new Error(`Your eoa is not an owner of safe '${args.data.circlesAddress}'`);
            }
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

        if (Environment.isAutomatedTest && profile.circlesAddress) {
            // Insert the test data when the first profile with a safe-address was created
            console.log("First circles user. Deploying test data ..");
            await TestData.insertIfEmpty(profile.circlesAddress);
        }

        return profile;
    };
}