import {PrismaClient} from "./api-db/client";
import {Environment} from "./environment";

export const prisma_api_rw: PrismaClient = new PrismaClient({
    datasources: {
        db: {
            url: Environment.readWriteApiConnectionString
        }
    }
});


export const prisma_api_ro: PrismaClient = new PrismaClient({
    datasources: {
        db: {
            url: Environment.readonlyApiConnectionString
        }
    }
});

