import {profilesResolver} from "./queries/profiles";
import {upsertProfileResolver} from "./mutations/upsertProfile";
import {prisma_ro, prisma_rw} from "../prismaClient";
import {Resolvers, Version} from "../types";
import {exchangeTokenResolver} from "./mutations/exchangeToken";
import {logout} from "./mutations/logout";
import {sessionInfo} from "./queries/sessionInfo";
import {depositChallengeResolver} from "./mutations/depositChallenge";
import {authenticateAtResolver} from "./mutations/authenticateAt";
import {consumeDepositedChallengeResolver} from "./mutations/consumeDepositedChallenge";
import {searchResolver} from "./queries/search";
const packageJson = require("../../package.json");

export const resolvers: Resolvers = {
    Query: {
        profiles: profilesResolver(prisma_ro),
        search: searchResolver(prisma_ro),
        sessionInfo: sessionInfo,
        version: () => {
            const version = packageJson.version.split(".");
            return <Version>{
                major: version[0],
                minor: version[1],
                revision: version[2]
            }
        },
    },
    Mutation: {
        exchangeToken: exchangeTokenResolver(prisma_rw),
        logout: logout(prisma_rw),
        upsertProfile: upsertProfileResolver(prisma_rw),
        authenticateAt: authenticateAtResolver(prisma_rw),
        depositChallenge: depositChallengeResolver(prisma_rw),
        consumeDepositedChallenge: consumeDepositedChallengeResolver(prisma_rw)
    }
};
