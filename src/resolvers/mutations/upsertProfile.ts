import {PrismaClient} from "@prisma/client";
import {MutationUpsertProfileArgs} from "../../types";
import {Context} from "../../context";

export function upsertProfileResolver(prisma:PrismaClient) {
    return async (parent:any, args:MutationUpsertProfileArgs, context:Context) => {
        const session = await context.verifySession();
        if (args.data.id) {
            return await prisma.profile.update({
                where: {
                    id: args.data.id
                },
                data: {
                    ...args.data,
                    emailAddress: session.emailAddress
                }
            });
        } else {
            return await prisma.profile.create({
                data: {
                    ...args.data,
                    emailAddress: session.emailAddress
                }
            });
        }
    };
}