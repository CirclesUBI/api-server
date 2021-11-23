import {QuerySearchArgs} from "../../types";
import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";

export function search(prisma: PrismaClient) {
    return async (parent: any, args: QuerySearchArgs, context: Context) => {
        const searchCirclesAddress: string = args.query.searchString.toLowerCase() + "%";
        const searchFirstName = args.query.searchString + "%";
        const searchLastName = args.query.searchString + "%";
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
                )
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
                where p."circlesAddress" ILIKE ${searchCirclesAddress}
                   or p."firstName" ILIKE ${searchFirstName}
                   or p."lastName" ILIKE ${searchLastName}
                order by p."firstName", p."lastName" limit 100`;

        return result.map(o => {
            return {
                ...o,
                circlesSafeOwner: o.circlesSafeOwner?.toLowerCase()
            }
        });
    };
}