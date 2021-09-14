import {QueryTagByIdArgs} from "../../types";
import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";

export function tagById(prisma:PrismaClient) {
    return async (parent: any, args: QueryTagByIdArgs, context:Context) => {
        return await prisma.tag.findUnique({
            where: {
                id: args.id
            }
        });
    }
}