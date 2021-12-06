import {MutationUpsertTagArgs} from "../../types";
import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";
import {Environment} from "../../environment";

export function upsertTag() {
    return async (parent:any, args:MutationUpsertTagArgs, context:Context) => {
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
            tag = await Environment.readonlyApiDb.tag.findUnique({where: {id: args.data.id}});
            if (!tag) {
                throw new Error(`Profile ${session.profileId} cannot find tag ${args.data.id} for update.`);
            }
            if (tag.createdByProfileId !== session.profileId) {
                throw new Error(`Profile ${session.profileId} access tag ${args.data.id} for update.`);
            }
            tag = await Environment.readWriteApiDb.tag.update({
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
        } else {
            // insert
            tag = await Environment.readWriteApiDb.tag.create({
                data: {
                    createdByProfileId: session.profileId ?? 0,
                    createdAt: new Date(),
                    typeId: args.data.typeId,
                    value: args.data.value,
                    isPrivate: false
                }
            });
        }
        return tag;
    }
}