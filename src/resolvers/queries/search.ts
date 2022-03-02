import {ProfileOrigin, QuerySearchArgs} from "../../types";
import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";

export function search(prisma: PrismaClient) {
    return async (parent: any, args: QuerySearchArgs, context: Context) => {
        const searchWords = args.query.searchString
          .toLowerCase()
          .replace("%", "")
          .split(/\s+/)
          .map((o:string) => o.trim())
          .filter((o:string) => o != "")
          .map((o:string) => o + "%");

        const searchWords2 = searchWords.map((o:string) => o.replace("%", ""));
        const fteSearch = `"${searchWords2.join("+")}":*`;
        const result: {
            id: number,
            "status"?: string,
            "circlesAddress"?: string,
            "circlesSafeOwner"?: string,
            "circlesTokenAddress"?: string,
            "firstName": string,
            "lastName"?: string,
            "avatarCid"?: string,
            "avatarUrl"?: string,
            "avatarMimeType"?: string,
            dream: string,
            country?: string
        }[] =
            await prisma.$queryRaw`
                with most_current as (
                    SELECT max(id) as id,
                           "circlesAddress"
                    FROM "Profile"
                    where "circlesAddress" is not null
                    group by "circlesAddress"
                ), "landProfiles" as (
                    select p.id,
                           p."status",
                           p."circlesAddress",
                           p."circlesSafeOwner",
                           p."circlesTokenAddress",
                           p."firstName",
                           p."lastName",
                           p."avatarCid",
                           p."avatarUrl",
                           p."avatarMimeType",
                           p.dream,
                           p.country
                    from most_current
                             join "Profile" p on most_current.id = p.id
                    where p."firstName" ILIKE ANY(${searchWords})
                       or p."lastName" ILIKE ANY(${searchWords})
                    order by p."firstName", p."lastName"
                    limit 100
                ), "gardenProfiles" as (
                    select p."circlesAddress",
                           p."name",
                           p."avatarUrl"
                    from "ExternalProfiles" p
                    where p."name" ILIKE ANY(${searchWords})
                    order by p."name"
                    limit 100
                ), "all" as (
                    select 0 as source, *
                    from "landProfiles"
                    union all
                    select 1 as source, 
                           -1 as id,
                           '' as "status",
                           "circlesAddress",
                           null as "circlesSafeOwner",
                           null as "circlesTokenAddress",
                           "name" as "firstName",
                           null as "lastName",
                           null as "avatarCid",
                           "avatarUrl",
                           null as "avatarMimeType",
                           null as dream,
                           null as country
                    from "gardenProfiles"
                ), nearest_source as (
                    select min(source) source, max(id) id, "circlesAddress"
                    from "all"
                    group by "circlesAddress"
                ), result as (
                    SELECT to_tsvector(a."firstName" || ' ' || COALESCE(a."lastName", '')) as tsvector, a.*
                    from nearest_source ns
                    join "all" a on a.source = ns.source and a."circlesAddress" = ns."circlesAddress" and a.id = ns.id
                ), fts as (
                    select r.id,
                           r."status",
                           r."circlesAddress",
                           r."circlesSafeOwner",
                           r."circlesTokenAddress",
                           r."firstName",
                           r."lastName",
                           r."avatarCid",
                           r."avatarUrl",
                           r."avatarMimeType",
                           r.dream,
                           r.country
                    from "result" r
                    where r.tsvector @@ to_tsquery(${fteSearch})
                )
                select * 
                from fts 
                order by "firstName", "lastName";`;

        return result.map(o => {
            return {
                ...o,
                origin: ProfileOrigin.Unknown,
                circlesSafeOwner: o.circlesSafeOwner?.toLowerCase()
            }
        });
    };
}