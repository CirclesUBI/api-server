import {PrismaClient} from "@prisma/client";
import {ProfileEvent, QueryTagsArgs} from "../../types";
import {Context} from "../../context";

export function events(prisma:PrismaClient) {
    return async (parent: any, args: any, context:any) => {
        context.logger?.info([{
            key: `call`,
            value: `/resolvers/queries/events.ts/events(prisma:PrismaClient)/async (parent: any, args: {}, context:Context)`
        }]);

        const session = await context.verifySession();
        const profile = await prisma.profile.findUnique({where:{ emailAddress: session.emailAddress }});

        if (!profile || !profile?.circlesAddress){
            return [];
        }

        const foundEvents = await prisma.event.findMany({
            where: {
                profileId: profile.id,
                acknowledgedAt: null
            }
        });

        const t = foundEvents.map(o => { return <ProfileEvent>{
            ...o,
            createdAt: o.createdAt.toJSON(),
            acknowledgedAt: o.acknowledgedAt?.toJSON(),
            archivedAt: o.archivedAt?.toJSON()
        }});

        return <any>t;
    }
}