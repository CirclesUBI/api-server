import {profiles} from "./queries/profiles";
import {upsertProfileResolver} from "./mutations/upsertProfile";
import {prisma_ro, prisma_rw} from "../prismaClient";
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

const packageJson = require("../../package.json");

export const resolvers: Resolvers = {
    Profile: {
        offers: profileOffers(prisma_ro),
        city: profileCity
    },
    Offer: {
        createdBy: offerCreatedBy(prisma_ro),
        categoryTag: offerCategoryTag(prisma_ro),
        deliveryTermsTag: offerDeliveryTermsTag(prisma_ro),
        unitTag: offerUnitTag(prisma_ro),
        city: offerCity
    },
    Query: {
        sessionInfo: sessionInfo,
        whoami: whoami,
        cities: cities,
        profiles: profiles(prisma_ro),
        search: search(prisma_ro),
        version: version(packageJson),
        offers: offers(prisma_ro),
        tags: tags(prisma_ro),
        tagById: tagById(prisma_ro),
        stats: stats(prisma_ro)
    },
    Mutation: {
        upsertOffer: upsertOfferResolver(prisma_rw),
        exchangeToken: exchangeTokenResolver(prisma_rw),
        logout: logout(prisma_rw),
        upsertProfile: upsertProfileResolver(prisma_rw),
        authenticateAt: authenticateAtResolver(prisma_rw),
        depositChallenge: depositChallengeResolver(prisma_rw),
        consumeDepositedChallenge: consumeDepositedChallengeResolver(prisma_rw),
        requestUpdateSafe: requestUpdateSafe(prisma_rw),
        updateSafe: updateSafe(prisma_rw),
        upsertTag: upsertTag(prisma_ro, prisma_rw),
        requestIndexTransaction: requestIndexTransaction(prisma_rw)
    }
};
