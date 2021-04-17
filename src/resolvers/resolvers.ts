import {serverResolver} from "./queries/server";
import {profilesResolver} from "./queries/profiles";
import {upsertProfileResolver} from "./mutations/upsertProfile";
import {prisma_ro, prisma_rw} from "../prismaClient";
import {Resolvers} from "../types";
import {exchangeTokenResolver} from "./mutations/exchangeToken";
import {circlesWalletsResolver} from "./queries/circlesWallets";

export const resolvers: Resolvers = {
    Query: {
        server: serverResolver,
        profiles: profilesResolver(prisma_ro),
        circlesWallets: circlesWalletsResolver(prisma_ro),
    },
    Mutation: {
        exchangeToken: exchangeTokenResolver(prisma_rw),
        upsertProfile: upsertProfileResolver(prisma_rw)
    }
};
