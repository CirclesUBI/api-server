import {profiles} from "./queries/profiles";
import {upsertProfileResolver} from "./mutations/upsertProfile";
import {prisma_api_ro, prisma_api_rw} from "../apiDbClient";
import {Resolvers} from "../types";
import {exchangeTokenResolver} from "./mutations/exchangeToken";
import {logout} from "./mutations/logout";
import {sessionInfo} from "./queries/sessionInfo";
import {depositChallengeResolver} from "./mutations/depositChallenge";
import {authenticateAtResolver} from "./mutations/authenticateAt";
import {consumeDepositedChallengeResolver} from "./mutations/consumeDepositedChallenge";
import {search} from "./queries/search";
import {upsertOfferResolver} from "./mutations/upsertOffer";
import {requestUpdateSafe} from "./mutations/requestUpdateSafe";
import {updateSafe} from "./mutations/updateSafe";
import {profileOffers} from "./profile/offers";
import {profileCity} from "./profile/city";
import {offerCreatedBy} from "./offer/createdBy";
import {offerCity} from "./offer/city";
import {whoami} from "./queries/whoami";
import {cities} from "./queries/citites";
import {version} from "./queries/version";
import {offers} from "./queries/offers";
import {offerCategoryTag} from "./offer/offerCategoryTag";
import {offerDeliveryTermsTag} from "./offer/offerDeliveryTermsTag";
import {offerUnitTag} from "./offer/offerUnitTag";
import {tags} from "./queries/tags";
import {stats} from "./queries/stats";
import {tagById} from "./queries/tagById";
import {upsertTag} from "./mutations/upsertTag";
import {requestIndexTransaction} from "./mutations/requestIndexTransaction";
import {transactions} from "./queries/transactions";
import {events} from "./queries/events";
import {acknowledge} from "./mutations/acknowledge";
import {claimInvitation} from "./mutations/claimInvitation";
import {claimedInvitation} from "./queries/claimedInvitation";
import {Context} from "../context";

const packageJson = require("../../package.json");

export const resolvers: Resolvers = {
    Profile: {
        offers: profileOffers(prisma_api_ro),
        city: profileCity
    },
    Offer: {
        createdBy: offerCreatedBy(prisma_api_ro),
        categoryTag: offerCategoryTag(prisma_api_ro),
        deliveryTermsTag: offerDeliveryTermsTag(prisma_api_ro),
        unitTag: offerUnitTag(prisma_api_ro),
        city: offerCity
    },
    ClaimedInvitation: {
        createdBy: (parent, args, context) => {
            throw new Error(`Not implemented`);
        },
        claimedBy: (parent, args, context) => {
            throw new Error(`Not implemented`);
        }
    },
    ProfileEvent: {
    },
    Query: {
        sessionInfo: sessionInfo,
        whoami: whoami,
        cities: cities,
        claimedInvitation: claimedInvitation,
        profiles: profiles(prisma_api_ro),
        search: search(prisma_api_ro),
        version: version(packageJson),
        offers: offers(prisma_api_ro),
        tags: tags(prisma_api_ro),
        tagById: tagById(prisma_api_ro),
        stats: stats(prisma_api_ro),
        transactions: transactions(prisma_api_ro),
        events: events(prisma_api_ro),
        invitationTransaction: async (parent: any, args: any, context:Context) => {
            // TODO: Find the transaction from the "invitation EOA" to the user's EOA (must be the only outgoing transaction from the invite-eoa)
            const session = await context.verifySession()
            if (!session.profileId) {
                throw new Error(`The session has not profile associated.`);
            }
            const profile = await prisma_api_ro.profile.findUnique({
                where: {id: session.profileId},
                include: {
                    claimedInvitations: {
                        include: {
                            indexedTransactions: {
                                include: {
                                    inviteTransaction: true
                                }
                            }
                        }
                    }
                }
            });
            if (!profile) {
                throw new Error(`Couldn't find a profile with id ${session.profileId}`);
            }
            if (!profile.circlesSafeOwner) {
                throw new Error(`The profile with the id ${session.profileId} has no EOA.`)
            }
            if (!profile.claimedInvitations.length) {
                throw new Error(`Profile ${session.profileId} has no claimed invitation so there can be no invitation transactions`);
            }
            const claimedInvitation = profile.claimedInvitations[0];
            if (!claimedInvitation.indexedTransactions.length) {

                return null;
            }

            const inviteTransactionRequest = claimedInvitation.indexedTransactions[0];
            if (!inviteTransactionRequest.inviteTransaction) {
                return null;
            }

            return inviteTransactionRequest.inviteTransaction;
        },
        safeFundingTransaction: async (parent: any, args: any, context:any) => {
            return null;
        }
    },
    Mutation: {
        upsertOffer: upsertOfferResolver(prisma_api_rw),
        exchangeToken: exchangeTokenResolver(prisma_api_rw),
        logout: logout(prisma_api_rw),
        upsertProfile: upsertProfileResolver(prisma_api_rw),
        authenticateAt: authenticateAtResolver(prisma_api_rw),
        depositChallenge: depositChallengeResolver(prisma_api_rw),
        consumeDepositedChallenge: consumeDepositedChallengeResolver(prisma_api_rw),
        requestUpdateSafe: requestUpdateSafe(prisma_api_rw),
        updateSafe: updateSafe(prisma_api_rw),
        upsertTag: upsertTag(prisma_api_ro, prisma_api_rw),
        requestIndexTransaction: requestIndexTransaction(prisma_api_rw),
        acknowledge: acknowledge(prisma_api_rw),
        claimInvitation: claimInvitation(prisma_api_rw),
        redeemClaimedInvitation: async (parent, args, context) => {
            const session = await context.verifySession();
            const claimedInvitation = await prisma_api_ro.invitation.findFirst({
                where: {
                    claimedByProfileId: session.profileId
                }
            });

            if (!claimedInvitation) {
                throw new Error(`No claimed invitation for profile ${session.profileId}`);
            }



            throw new Error(`Not implemented`);
        }
    },
    Subscriptions: {
        events: (parent, args, context) => {
            throw new Error(`Not implemented`);
        }
    }
};
