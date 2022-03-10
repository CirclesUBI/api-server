import {DisplayCurrency, MutationUpsertProfileArgs, Profile} from "../../types";
import {Context} from "../../context";
import {Session} from "../../session";
import {ProfileLoader} from "../../querySources/profileLoader";
import {Environment} from "../../environment";
import {TestData} from "../../api-db/testData";
import {RpcGateway} from "../../circles/rpcGateway";
import {JobQueue} from "../../jobs/jobQueue";
import {VerifyEmailAddress} from "../../jobs/descriptions/emailNotifications/verifyEmailAddress";
import {Generate} from "../../utils/generate";
import {SendVerifyEmailAddressEmail} from "../../jobs/descriptions/emailNotifications/sendVerifyEmailAddressEmail";
import {claimInvitation} from "./claimInvitation";

const validateEmail = (email:string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export function isNullOrWhitespace(str?:string|null) :boolean {
    return !str || str?.trim() == "";
}

export async function claimInviteCodeFromCookie(context: Context) {
    // Try to claim an invitation right away if there's an invitationCode-cookie
    if (!context.session?.profileId || !context.req?.headers?.cookie) {
        return;
    }
    const cookies = context.req.headers.cookie.split(";").map(o => o.trim().split("=")).reduce((p: { [key: string]: any }, c) => {
        p[c[0]] = c[1];
        return p
    }, {});

    if (cookies["invitationCode"]) {
        const invitationCode = decodeURIComponent(cookies["invitationCode"]);
        await claimInvitation()(null, {code: invitationCode}, context);

        context.log(`Claimed invitation ${invitationCode} for profile ${context.session?.profileId} because the 'invitationCode' cookie was set.`);
    }
}

export function upsertProfileResolver() {
    return async (parent:any, args:MutationUpsertProfileArgs, context:Context) => {
        const session = await context.verifySession();
        let profile:Profile;

        if (args.data.emailAddress && !validateEmail(args.data.emailAddress)) {
            throw new Error(`Invalid email address format.`);
        }
        if (args.data.circlesAddress && !RpcGateway.get().utils.isAddress(args.data.circlesAddress)) {
            throw new Error(`Invalid 'circlesAddress': ${args.data.circlesAddress}`);
        }
        if (args.data.circlesAddress) {
            if (!await context.isOwnerOfSafe(args.data.circlesAddress)) {
                throw new Error(`You EOA isn't an owner of safe ${args.data.circlesAddress}`)
            }
        }
        if (args.data.successorOfCirclesAddress) {
            if (!await context.isOwnerOfSafe(args.data.successorOfCirclesAddress)) {
                throw new Error(`You EOA isn't an owner of your imported safe ${args.data.successorOfCirclesAddress}`)
            }
        }
        if (args.data.id) {
            if (args.data.id != session.profileId) {
                throw new Error(`'${session.sessionToken}' (profile id: ${session.profileId ?? "<undefined>"}) can not upsert other profile '${args.data.id}'.`);
            }
            const oldProfile = await Environment.readWriteApiDb.profile.findUnique({where:{id: args.data.id}});
            if (!oldProfile){
                throw new Error(`Cannot update profile ${args.data.id} because it doesn't exist.`)
            }
            profile = ProfileLoader.withDisplayCurrency(await Environment.readWriteApiDb.profile.update({
                where: {
                    id: args.data.id
                },
                data: {
                    ...args.data,
                    id: args.data.id,
                    successorOfCirclesAddress: args.data.successorOfCirclesAddress?.toLowerCase(),
                    circlesAddress: args.data.circlesAddress?.toLowerCase(),
                    circlesTokenAddress: args.data.circlesTokenAddress?.toLowerCase(),
                    lastUpdateAt: new Date(),
                    emailAddress: args.data.emailAddress,
                    askedForEmailAddress: args.data.askedForEmailAddress ?? !isNullOrWhitespace(args.data.emailAddress),
                    circlesSafeOwner: session.ethAddress?.toLowerCase(),
                    displayCurrency: <DisplayCurrency>args.data.displayCurrency
                }
            }));

            if (oldProfile.emailAddress != profile.emailAddress) {
                profile = ProfileLoader.withDisplayCurrency(await Environment.readWriteApiDb.profile.update({
                    where: {id: args.data.id},
                    data: {
                        emailAddressVerified: false,
                        askedForEmailAddress: false
                    }
                }));
            }
        } else {
            profile = ProfileLoader.withDisplayCurrency(await Environment.readWriteApiDb.profile.create({
                data: {
                    ...args.data,
                    id: undefined,
                    lastUpdateAt: new Date(),
                    emailAddress: args.data.emailAddress,
                    askedForEmailAddress: args.data.askedForEmailAddress ?? !isNullOrWhitespace(args.data.emailAddress),
                    emailAddressVerified: false,
                    circlesSafeOwner: session.ethAddress?.toLowerCase(),
                    successorOfCirclesAddress: args.data.successorOfCirclesAddress?.toLowerCase(),
                    circlesAddress: args.data.circlesAddress?.toLowerCase(),
                    circlesTokenAddress: args.data.circlesTokenAddress?.toLowerCase(),
                    lastAcknowledged: new Date(),
                    lastInvoiceNo: 0,
                    lastRefundNo: 0,
                    displayCurrency: <DisplayCurrency>args.data.displayCurrency
                }
            }));

            await Session.assignProfile(session.sessionToken, profile.id, context);

            await claimInviteCodeFromCookie(context);
        }

        if (Environment.isAutomatedTest && profile.circlesAddress) {
            // Insert the test data when the first profile with a safe-address was created
            console.log("First circles user. Deploying test data ..");
            await TestData.insertIfEmpty(profile.circlesAddress);
        }

        if (profile?.emailAddress && !(<any>profile)?.emailAddressVerified) {
            const challengeTrigger = new VerifyEmailAddress(
              new Date(), 1000 * 60 * 24, Generate.randomHexString(), profile.id, profile.emailAddress);
            const sendEmail = new SendVerifyEmailAddressEmail(challengeTrigger.getHash(), <string>args.data.emailAddress);
            await JobQueue.produce([challengeTrigger, sendEmail]);
        }

        return profile;
    };
}