import {serverResolver} from "./queries/server";
import {profilesResolver} from "./queries/profiles";
import {upsertProfileResolver} from "./mutations/upsertProfile";
import {prisma_ro, prisma_rw} from "../prismaClient";
import {Resolvers} from "../types";
import {exchangeTokenResolver} from "./mutations/exchangeToken";
import {circlesWalletsResolver} from "./queries/circlesWallets";
import {logout} from "./mutations/logout";
import {hasValidSessionResolver} from "./queries/hasValidSession";

export const resolvers: Resolvers = {
    Query: {
        server: serverResolver,
        profiles: profilesResolver(prisma_ro),
        circlesWallets: circlesWalletsResolver(prisma_ro),
        hasValidSession: hasValidSessionResolver
    },
    Mutation: {
        exchangeToken: exchangeTokenResolver(prisma_rw),
        logout: logout(prisma_rw),
        upsertProfile: upsertProfileResolver(prisma_rw)
    }
};
