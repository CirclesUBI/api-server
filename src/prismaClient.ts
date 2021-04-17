import {PrismaClient} from "@prisma/client";

const connectionStringRw = process.env.CONNECTION_STRING_RW;
export const prisma_rw: PrismaClient = new PrismaClient({
    datasources: {
        db: {
            url: connectionStringRw
        }
    }
});


const connectionStringRo = process.env.CONNECTION_STRING_RO;
export const prisma_ro: PrismaClient = new PrismaClient({
    datasources: {
        db: {
            url: connectionStringRo
        }
    }
});

