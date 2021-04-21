import {QueryProfilesArgs, QuerySearchArgs, RequireFields, SearchInput} from "../../types";
import {PrismaClient} from "@prisma/client";
import {Context} from "../../context";

export function searchResolver(prisma:PrismaClient) {
    return async (parent:any, args:QuerySearchArgs, context:Context) => {

        const result:{
            id:number
            , "circlesAddress"?:string
            , "firstName":string
            , "lastName"?:string
            , "avatarCid"?:string
            , "avatarMimeType"?:string
            , dream:string
            , country?:string
        }[] =
            await prisma.$queryRaw`SELECT id, "circlesAddress", "firstName", "lastName", "avatarCid", "avatarMimeType", dream, country
                                   FROM "Profile"
                                   WHERE "circlesAddress" LIKE '${args.query.searchString}%'
                                      OR "firstName" LIKE '${args.query.searchString}%'
                                      OR "lastName" LIKE '${args.query.searchString}%'
                                   ORDER BY "firstName", "lastName"
                                   LIMIT 100`;
        return result;
    };
}