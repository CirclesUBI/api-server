import {QueryProfilesArgs, RequireFields} from "../../types";
import {PrismaClient} from "@prisma/client";
import {Context} from "../../context";

export async function whereProfile(args: RequireFields<QueryProfilesArgs, never>, context:Context) {
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
        const session = await context.verifySession();
        q["id"] = session.profileId;
        if (!q["id"]) {
            throw new Error(`At least one query field must be specified.`);
        }
    }
    return q;
}

export function profilesResolver(prisma:PrismaClient) {
    return async (parent:any, args:QueryProfilesArgs, context:Context) => {
        const q = await whereProfile(args, context);
        return await prisma.profile.findMany({
            where: {
                ...q
            }
        });
    };
}