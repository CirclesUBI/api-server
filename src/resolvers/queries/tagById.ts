import {PrismaClient} from "@prisma/client";
import {QueryTagByIdArgs} from "../../types";

export function tagById(prisma:PrismaClient) {
    return async (parent: any, args: QueryTagByIdArgs) => {
        return await prisma.tag.findUnique({
            where: {
                id: args.id
            }
        });
    }
}