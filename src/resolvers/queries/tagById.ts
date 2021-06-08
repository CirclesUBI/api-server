import {PrismaClient} from "@prisma/client";
import {QueryTagByIdArgs} from "../../types";
import {Context} from "../../context";

export function tagById(prisma:PrismaClient) {
    return async (parent: any, args: QueryTagByIdArgs, context:Context) => {
        context.logger?.debug([{
            key: `call`,
            value: `/resolvers/queries/tagById.ts/tagById(prisma:PrismaClient)/async (parent: any, args: QueryTagByIdArgs, context:Context)`
        }]);
        return await prisma.tag.findUnique({
            where: {
                id: args.id
            }
        });
    }
}