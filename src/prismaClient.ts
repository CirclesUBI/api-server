import {PrismaClient} from "@prisma/client";

const connectionString = process.env.DB_CONNECTION_STRING;
//console.log(connectionString);
export const prisma: PrismaClient = new PrismaClient({
    datasources: {
        db: {
            url: connectionString
        }
    }
});

