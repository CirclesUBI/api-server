import {PrismaClient} from "./api-db/client";

const apiConnectionStringRw = process.env.CONNECTION_STRING_RW;
export const prisma_api_rw: PrismaClient = new PrismaClient({
    datasources: {
        db: {
            url: apiConnectionStringRw
        }
    }
});


const apiConnectionStringRo = process.env.CONNECTION_STRING_RO;
export const prisma_api_ro: PrismaClient = new PrismaClient({
    datasources: {
        db: {
            url: apiConnectionStringRo
        }
    }
});

