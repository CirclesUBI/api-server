import {PrismaClient} from "./index-db/client";

const apiConnectionStringRw = process.env.CONNECTION_STRING_RW;
export const prisma_index_ro: PrismaClient = new PrismaClient({
    datasources: {
        db: {
            url: apiConnectionStringRw
        }
    }
});