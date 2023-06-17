import { Businesses, QueryAllBusinessesArgs, QueryAllBusinessesOrderOptions } from "../../types";
import { Environment } from "../../environment";
import { Context } from "vm";

export const allBusinesses = async (parent: any, args: QueryAllBusinessesArgs, context: Context) => {
  const { queryParams } = args;

  if (!queryParams) {
    throw new Error("Missing queryParams");
  }

  const { order, ownCoordinates, where, cursor, limit } = queryParams;
  let { lon, lat } = ownCoordinates ?? {};

  let params: any[] = [lon?.toString() ?? "", lat?.toString() ?? ""];

  // construct the where clause
  let whereConditions: string[] = [];
  if (where) {
    if (where?.inCategories) {
      whereConditions.push(`"businessCategoryId" = ANY($${params.push(where.inCategories)})`);
    }
    if (where?.inCirclesAddress) {
      whereConditions.push(`"circlesAddress" = ANY($${params.push(where.inCirclesAddress)})`);
    }
    if (where?.searchString) {
      const searchWords = where.searchString.split(" ").map(o => `%${o.trim().toLowerCase()}%`);  // wildcard on both ends
      for (let i = 0; i < searchWords.length; i++) {
        const search = searchWords[i];
        whereConditions.push(` ("name" ilike $${params.push(search)} or "description" ilike $${params.push(search)} or "locationName" ilike $${params.push(search)}) `);
      }
    }
  }

  // construct the order by clause
  let rownumber_select = "ROW_NUMBER() OVER (ORDER BY id) as cursor";
  let orderClause = "";
  if (order?.orderBy) {
    switch (order.orderBy) {
      case QueryAllBusinessesOrderOptions.Alphabetical:
        orderClause += ` order by "name" asc`;
        rownumber_select = "ROW_NUMBER() OVER (ORDER BY name asc) as cursor";
        break;
      case QueryAllBusinessesOrderOptions.Favorites:
        orderClause += ` order by "favoriteCount" desc`;
        rownumber_select = 'ROW_NUMBER() OVER (ORDER BY "favoriteCount" desc, "createdAt" asc) as cursor';
        break;
      case QueryAllBusinessesOrderOptions.MostPopular:
        orderClause += ` order by "favoriteCount" desc`;
        rownumber_select = 'ROW_NUMBER() OVER (ORDER BY "favoriteCount" desc, "createdAt" asc) as cursor';
        break;
      case QueryAllBusinessesOrderOptions.Nearest:
        orderClause += ` order by distance asc`;
        rownumber_select = "ROW_NUMBER() OVER (ORDER BY ST_Distance(\n" +
            "                    ST_MakePoint($1::DOUBLE PRECISION, $2::DOUBLE PRECISION)::geography,\n" +
            "                    ST_MakePoint(\"lon\", \"lat\")::geography\n" +
            "                ) asc, \"createdAt\" asc) as cursor";
        break;
      case QueryAllBusinessesOrderOptions.Newest:
        orderClause += ` order by "createdAt" desc`;
        rownumber_select = 'ROW_NUMBER() OVER (ORDER BY "createdAt" desc) as cursor';
        break;
      case QueryAllBusinessesOrderOptions.Oldest:
        orderClause += ` order by "createdAt" asc`;
        rownumber_select = 'ROW_NUMBER() OVER (ORDER BY "createdAt" asc) as cursor';
        break;
      default:
        break;
    }
  }

  // construct base query
  let query = `
        with b as (
            select ${rownumber_select}
                 , *
                 , case when $1 = '' or $2 = ''
                     then 0
                     else ST_Distance(
                        ST_MakePoint($1::DOUBLE PRECISION, $2::DOUBLE PRECISION)::geography,
                        ST_MakePoint("lon", "lat")::geography
                   ) end as distance
            from "businesses"
            where "circlesAddress" != $${params.push(Environment.operatorOrganisationAddress)}
        )
        select cursor, id, "createdAt", name, description, "phoneNumber", location, "locationName", lat, lon, "circlesAddress", "businessCategoryId", "businessCategory", picture, "businessHoursMonday", "businessHoursTuesday", "businessHoursWednesday", "businessHoursThursday", "businessHoursFriday", "businessHoursSaturday", "businessHoursSunday", "favoriteCount", "distance"
        from b
  `;

  // add the where and order by clauses to the query
  if (whereConditions.length > 0 || cursor) {
    query += " where " + (whereConditions.length ? whereConditions.join(" and ") : "1=1");
    if (cursor) {
      query += ` and cursor > $${params.push(cursor)}`;
    }
  }

  query += orderClause;

  // add the limit clause to the query
  const effectiveLimit = limit && limit <= 100 ? limit : 20;
  query += ` limit $${params.push(effectiveLimit)}`;

  const result =  await Environment.readonlyApiDb.$queryRawUnsafe(query, ...params);

  return <Businesses[]>Object.values(
    (<any>result).map((o: any) => {
      return <Businesses>{
        ...o,
        cursor: o.cursor,
        createdAt: new Date(o.createdAt),
      };
    })
  );
};
