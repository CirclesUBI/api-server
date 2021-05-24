import {Profile, QueryProfilesArgs, RequireFields} from "../../types";
import {PrismaClient} from "@prisma/client";
import {Context} from "../../context";

export async function whereProfile(args: RequireFields<QueryProfilesArgs, never>, ownProfileId:number|null) {
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
        .filter(kv => kv.value)
        .forEach(kv => {
            q[kv.key] = kv.value;
        });

    if (Object.keys(q).length === 0) {
        q["id"] = ownProfileId;
        if (!q["id"]) {
            throw new Error(`At least one query field must be specified.`);
        }
    }
    return q;
}

export function profilesResolver(prisma:PrismaClient) {
    return async (parent:any, args:QueryProfilesArgs, context:Context) => {
        let ownProfileId:number|null = null;
        if (context.sessionId) {
            const session = await context.verifySession();
            ownProfileId = session.profileId;
        }
        const q = await whereProfile(args, ownProfileId);
        if (q.circlesAddress) {
            delete q.circlesAddress;
        }
        if (q.circlesAddress) {
            delete q.id;
        }
        const rows = await prisma.profile.findMany({
            where: {
                ...q,
                circlesAddress: args.query.circlesAddress ? {
                    in: args.query.circlesAddress.map(o => o.toLowerCase())
                } : undefined,
                id: args.query.id ? {
                    in: args.query.id
                } : undefined
            },
            take: 100
        });

        return rows.map(o => {
            return <Profile>{
                id: o.id,
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
                newsletter: ownProfileId == o.id ? o.newsletter : undefined
            }
        });
    };
}