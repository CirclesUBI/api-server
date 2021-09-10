export const empty = true;
/*
import {ProfileEvent} from "../../types";
import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";

export function acknowledge(prisma_api_rw:PrismaClient) {
    return async (parent:any, args:{eventId:number}, context:Context) => {
        context.logger?.info([{
            key: `call`,
            value: `/resolvers/mutation/acknowledge.ts/acknowledge(prisma_api_ro:PrismaClient, prisma_api_rw:PrismaClient)/async (parent:any, args:{id:${args.eventId}, context:Context)`
        }]);
        const session = await context.verifySession();
        const now = new Date();

        await prisma_api_rw.event.updateMany({
            where: {
                id: args.eventId,
                profileId: session.profileId,
                acknowledgedAt: null
            },
            data: {
                acknowledgedAt: now
            }
        });

        const e = await prisma_api_rw.event.findUnique({where:{id: args.eventId}});
        if (!e) {
            throw new Error(`Couldn't find the recently updated event with id ${args.eventId}. This is WTF?! :// sdg`)
        }
        return <ProfileEvent>{
            ...e,
            id: e.id,
            createdAt: e.createdAt.toJSON(),
        };
    }
}*/