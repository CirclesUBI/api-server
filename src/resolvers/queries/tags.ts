import {PrismaClient} from "@prisma/client";
import {QueryTagsArgs} from "../../types";

export function tags(prisma:PrismaClient) {
    return async (parent: any, args: QueryTagsArgs) => {
        const tags = await prisma.tag.findMany({
            where: {
                typeId: {
                    in: args.query.typeId_in
                },
                value: args.query.value_like ? {
                    startsWith: args.query.value_like
                } : undefined
            }
        });
        return tags.map(o => {
            return {
                ...o,
                type: o.typeId
            }
        });
    }
}