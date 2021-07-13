import {PrismaClient} from "@prisma/client";
import {MutationUpsertTagArgs} from "../../types";
import {Context} from "../../context";

export function upsertTag(prisma_ro:PrismaClient, prisma_rw:PrismaClient) {
    return async (parent:any, args:MutationUpsertTagArgs, context:Context) => {
        context.logger?.info([{
            key: `call`,
            value: `/resolvers/mutation/upsertTag.ts/upsertTag(prisma_ro:PrismaClient, prisma_rw:PrismaClient)/async (parent:any, args:MutationUpsertTagArgs, context:Context)`
        }]);
        const session = await context.verifySession();
        let tag: {
            id: number
            createdAt: Date
            createdByProfileId: number
            isPrivate: boolean
            typeId: string
            value: string | null
        } | null;
        if (args.data.id) {
            // update
            tag = await prisma_ro.tag.findUnique({where: {id: args.data.id}});
            if (!tag) {
                throw new Error(`Profile ${session.profileId} cannot find tag ${args.data.id} for update.`);
            }
            if (tag.createdByProfileId !== session.profileId) {
                throw new Error(`Profile ${session.profileId} access tag ${args.data.id} for update.`);
            }
            tag = await prisma_rw.tag.update({
                where: {
                    id: tag.id
                },
                data: {
                    ...tag,
                    ...{
                        typeId: args.data.typeId,
                        value: args.data.value
                    }
                }
            });
            context.logger?.debug([{
                key: `call`,
                value: `/resolvers/mutation/upsertTag.ts/upsertTag(prisma_ro:PrismaClient, prisma_rw:PrismaClient)/async (parent:any, args:MutationUpsertTagArgs, context:Context)`
            }], `Updated tag ${tag.id}`);
        } else {
            // insert
            tag = await prisma_rw.tag.create({
                data: {
                    createdByProfileId: session.profileId ?? 0,
                    createdAt: new Date(),
                    typeId: args.data.typeId,
                    value: args.data.value,
                    isPrivate: false
                }
            });
            context.logger?.debug([{
                key: `call`,
                value: `/resolvers/mutation/upsertTag.ts/upsertTag(prisma_ro:PrismaClient, prisma_rw:PrismaClient)/async (parent:any, args:MutationUpsertTagArgs, context:Context)`
            }], `Created tag ${tag.id}`);
        }
        return tag;
    }
}