import {serverResolver} from "./queries/server";
import {profilesResolver} from "./queries/profiles";
import {upsertProfileResolver} from "./mutations/upsertProfile";
import {prisma} from "../prismaClient";
import {Resolvers} from "../types";
import {exchangeTokenResolver} from "./mutations/exchangeToken";
import {circlesWalletsResolver} from "./queries/circlesWallets";

export const resolvers: Resolvers = {
    Query: {
        server: serverResolver,
        profiles: profilesResolver(prisma),
        circlesWallets: circlesWalletsResolver(prisma),
    },
    Mutation: {
        exchangeToken: exchangeTokenResolver(prisma),
        upsertProfile: upsertProfileResolver(prisma)
    }
};
