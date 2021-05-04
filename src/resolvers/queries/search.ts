import {QueryProfilesArgs, QuerySearchArgs, RequireFields, SearchInput} from "../../types";
import {PrismaClient} from "@prisma/client";
import {Context} from "../../context";

export function searchResolver(prisma: PrismaClient) {
    return async (parent: any, args: QuerySearchArgs, context: Context) => {
        const searchCirclesAddress: string = args.query.searchString.toLowerCase() + "%";
        const searchFirstName = args.query.searchString + "%";
        const searchLastName = args.query.searchString + "%";
        const result: {
            id: number,
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
        return result;
    };
}