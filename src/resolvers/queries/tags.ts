import { QueryTagsArgs } from "../../types";
import { Context } from "../../context";
import { PrismaClient } from "../../api-db/client";

export function tags(prisma: PrismaClient) {
  return async (parent: any, args: QueryTagsArgs, context: Context) => {
    const tags = await prisma.tag.findMany({
      where: {
        typeId: {
          in: args.query.typeId_in,
        },
        value: args.query.value_like
          ? {
              startsWith: args.query.value_like,
            }
          : undefined,
      },
    });
    return tags.map((o) => {
      return {
        ...o,
        type: o.typeId,
      };
    });
  };
}
