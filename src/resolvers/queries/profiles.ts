import {Profile, QueryProfilesArgs, RequireFields} from "../../types";
import {PrismaClient} from "@prisma/client";
import {Context} from "../../context";

export async function whereProfile(args: RequireFields<QueryProfilesArgs, never>, ownProfileId:number|null, context:Context) {
    context.logger?.info([{
        key: `call`,
        value: `/resolvers/queries/profiles.ts/whereProfile(args: RequireFields<QueryProfilesArgs, never>, ownProfileId:number|null)`
    }]);
    const q: { [key: string]: any } = {};
    if (!args.query) {
        throw new Error(`No query fields have been specified`);
    }
    Object.keys(args.query ?? {})
        .map(key => {
            return {
                key: key,
                // @ts-ignore
                value: args.query[key]
            }
        })
        .filter(kv => kv.key !== "id" && kv.value)
        .forEach(kv => {
            q[kv.key] = kv.value;
        });

    if (Object.keys(q).length === 0 && !Array.isArray(args.query.id)) {
        q["id"] = ownProfileId;
    }
    return q;
}

export function profiles(prisma:PrismaClient) {
    return async (parent:any, args:QueryProfilesArgs, context:Context) => {
        context.logger?.debug([{
            key: `call`,
            value: `/resolvers/queries/profiles.ts/profiles(prisma:PrismaClient)/async (parent:any, args:QueryProfilesArgs, context:Context)`
        }]);

        let ownProfileId:number|null = null;
        if (context.sessionId) {
            const session = await context.verifySession();
            ownProfileId = session.profileId;
        }
        const q = await whereProfile(args, ownProfileId, context);
        if (q.circlesAddress) {
            delete q.circlesAddress;
        }
        if (!q.id && args.query.id) {
            q.id = args.query.id ? {
                in: args.query.id
            } : undefined;
        }
        const rows = await prisma.profile.findMany({
            where: {
                ...q,
                circlesAddress: args.query.circlesAddress ? {
                    in: args.query.circlesAddress.map(o => o.toLowerCase())
                } : undefined
            },
            take: 100
        });

        return rows.map(o => {
            return <Profile>{
                id: o.id,
                status: o.status,
                circlesAddress: o.circlesAddress,
                circlesSafeOwner: o.circlesSafeOwner,
                avatarUrl: o.avatarUrl,
                avatarMimeType: o.avatarMimeType,
                dream: o.dream,
                country: o.country,
                firstName: o.firstName,
                lastName: o.lastName,
                avatarCid: o.avatarCid,
                circlesTokenAddress: o.circlesTokenAddress,
                newsletter: ownProfileId == o.id ? o.newsletter : undefined,
                cityGeonameid: o.cityGeonameid
            }
        });
    };
}