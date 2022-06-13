import {DisplayCurrency, MutationUpsertProfileArgs, Profile, ProfileType} from "../../types";
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
import {createInvitationPerpetualTrigger} from "../../utils/invitationHelper";
import {verifySafe} from "./verifySafe";
import {AutoTrust} from "../../jobs/descriptions/maintenance/autoTrust";
import {MintCheckInNftsWorker} from "../../jobs/worker/mintCheckInNftsWorker";
import {MintCheckInNfts} from "../../jobs/descriptions/mintCheckInNfts";

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
        if (args.data.circlesAddress && !await context.isOwnerOfSafe(args.data.circlesAddress)) {
            throw new Error(`You EOA isn't an owner of safe ${args.data.circlesAddress}`);
        }
        if (args.data.successorOfCirclesAddress && !await context.isOwnerOfSafe(args.data.successorOfCirclesAddress)) {
            throw new Error(`You EOA isn't an owner of your imported safe ${args.data.successorOfCirclesAddress}`);
        }

        if (args.data.id) {
            if (args.data.id != session.profileId) {
                throw new Error(`'${session.sessionToken}' (profile id: ${session.profileId ?? "<undefined>"}) can not upsert other profile '${args.data.id}'.`);
            }
            const oldProfile = await Environment.readWriteApiDb.profile.findUnique({
                where:{
                    id: args.data.id
                },
                include: {
                    invitations: true,
                    inviteTrigger: true
                }
            });
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

            if (!oldProfile.inviteTrigger
              && oldProfile.type == ProfileType.Person
              && !oldProfile.circlesAddress
              && profile.circlesAddress) {
                // Create the initial invitations for the user
                console.log(`Automatically verifying the new safe user ${profile.circlesAddress} ..`);
                await verifySafe(null, {safeAddress: profile.circlesAddress}, context);

                const invitation = await Environment.readWriteApiDb.invitation.findFirst({
                    where: { redeemedByProfileId: profile.id },
                    include: { createdBy: true }
                });

                if (invitation?.createdBy?.circlesAddress) {
                    setTimeout(async () => {
                        console.log(`Creating an 'autoTrust' job for new safe ${profile.circlesAddress} and inviter ${invitation.createdBy.circlesAddress}`);
                        await JobQueue.produce([new AutoTrust(<string>invitation.createdBy.circlesAddress, <string>profile.circlesAddress)]);
                    }, 15000);

                    console.log(`Creating a 'mintCheckInNft' job for new safe (guest) ${profile.circlesAddress} and inviter (host) ${invitation.createdBy.circlesAddress}`);
                    await JobQueue.produce([new MintCheckInNfts(invitation.createdBy.circlesAddress, profile.circlesAddress)]);
                }

                console.log(`Creating the input trigger for address ${profile.circlesAddress} ..`);
                const inviteTriggerHash = await createInvitationPerpetualTrigger(profile.circlesAddress);

                console.log(`Trying to find the invite trigger job with hash ${inviteTriggerHash} ..`);
                const inviteTriggerJob = await Environment.readWriteApiDb.job.findUnique({
                    where: {
                        hash: inviteTriggerHash
                    }
                });

                if (inviteTriggerJob) {
                    console.log(`Found invite job with hash ${inviteTriggerHash} and linking it to profile ${oldProfile.id}`);
                    profile = ProfileLoader.withDisplayCurrency(await Environment.readWriteApiDb.profile.update({
                        where: {
                            id: profile.id
                        },
                        data: {
                            inviteTriggerId: inviteTriggerJob.id
                        }
                    }));
                }
            }

            if (oldProfile.emailAddress != profile.emailAddress) {
                profile = ProfileLoader.withDisplayCurrency(await Environment.readWriteApiDb.profile.update({
                    where: {id: args.data.id},
                    data: {
                        emailAddressVerified: false
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
