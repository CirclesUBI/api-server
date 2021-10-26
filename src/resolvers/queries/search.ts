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
            await prisma.$queryRaw`SELECT id,
                                          "status",
                                          "circlesAddress",
                                          "circlesSafeOwner",
                                          "circlesTokenAddress",
                                          "firstName",
                                          "lastName",
                                          "avatarCid",
                                          "avatarUrl",
                                          "avatarMimeType",
                                          dream,
                                          country
                                   FROM "Profile"
                                   WHERE "circlesAddress" LIKE ${searchCirclesAddress}
                                      OR "firstName" ILIKE ${searchFirstName}
                                      OR "lastName" ILIKE ${searchLastName}
                                   ORDER BY "firstName", "lastName" LIMIT 100`;
        return result.map(o => {
            return {
                ...o,
                circlesSafeOwner: o.circlesSafeOwner?.toLowerCase()
            }
        });
    };
}