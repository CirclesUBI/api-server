import { Businesses, QueryAllBusinessesArgs, QueryAllBusinessesOrderOptions } from "../../types";
import { Context } from "../../context";
import { Environment } from "../../environment";

export const allBusinesses = async (parent: any, args: QueryAllBusinessesArgs, context: Context) => {
  const queryParams = args.queryParams;
  if (!queryParams) {
    throw new Error("Missing queryParams");
  }

  const { order, ownCoordinates, where, cursor, limit } = queryParams;

  // start constructing the query
  let query = `
        with b as (
            select ~
                 , *
                 , case when $1 = '' or $2 = ''
                     then 0
                     else ST_Distance(
                        ST_MakePoint($1::DOUBLE PRECISION, $2::DOUBLE PRECISION)::geography,
                        ST_MakePoint("lon", "lat")::geography
                   ) end as distance
            from "businesses"
        )
        select cursor, id, "createdAt", name, description, "phoneNumber", location, "locationName", lat, lon, "circlesAddress", "businessCategoryId", "businessCategory", picture, "businessHoursMonday", "businessHoursTuesday", "businessHoursWednesday", "businessHoursThursday", "businessHoursFriday", "businessHoursSaturday", "businessHoursSunday", "favoriteCount"
        from b
    `;

  const params: any[] = [];

  if (ownCoordinates?.lon && ownCoordinates?.lat) {
    params.push(ownCoordinates.lon.toString());
    params.push(ownCoordinates.lat.toString());
  } else {
    params.push("");
    params.push("");
  }

  // if where conditions exist, construct the where clause
  let hasWhere = false;
  if (where?.inCategories || where?.inCirclesAddress) {
    let whereConditions = [];

    if (where?.inCategories) {
      whereConditions.push(`"businessCategoryId" = ANY($${params.push(where.inCategories)})`);
    }

    if (where?.inCirclesAddress) {
      whereConditions.push(`"circlesAddress" = ANY($${params.push(where.inCirclesAddress)})`);
    }

    query += " where " + whereConditions.join(" and ");
    hasWhere = true;
  }

  // if order condition exists, construct the order by clause
  let rownumber_select = undefined;
  if (order?.orderBy) {
    let orderClause = " order by ";
    let whereClause = " 1=1 ";
    rownumber_select = "ROW_NUMBER() OVER (ORDER BY ~) as cursor"

    switch (order.orderBy) {
      case QueryAllBusinessesOrderOptions.Alphabetical:
        orderClause += `"name" asc`;
        rownumber_select = rownumber_select.replace("~", "name asc");
        break;
      case QueryAllBusinessesOrderOptions.Favorites:
        orderClause += `"favoriteCount" desc`;
        rownumber_select = rownumber_select.replace("~", "\"favoriteCount\" desc");
        break;
      case QueryAllBusinessesOrderOptions.MostPopular:
        orderClause += `"favoriteCount" desc`;
        rownumber_select = rownumber_select.replace("~", "\"favoriteCount\" asc");
        break;
      case QueryAllBusinessesOrderOptions.Nearest:
        rownumber_select = rownumber_select.replace("~", "distance asc");
        orderClause += `distance asc`;
        break;
      case QueryAllBusinessesOrderOptions.Newest:
        rownumber_select = rownumber_select.replace("~", "\"createdAt\" desc");
        orderClause += `"createdAt" desc`;
        break;
      case QueryAllBusinessesOrderOptions.Oldest:
        rownumber_select = rownumber_select.replace("~", "\"createdAt\" asc");
        orderClause += `"createdAt" asc`;
        break;
      default:
        break;
    }

    query += (hasWhere ? "" : " where" ) +  whereClause + (cursor ? ` and cursor > $${params.push(cursor)} `: "") + orderClause;
  }

  const effectiveLimit = limit && limit <= 100 ? limit : 20;
  query += ` limit $${params.push(effectiveLimit)}`;
  query = query.replace("~", rownumber_select ?? "ROW_NUMBER() OVER (ORDER BY id) as cursor");

  const result = await Environment.readonlyApiDb.$queryRawUnsafe(query, ...params);

  return Object.values((<any>result).map((o:any) => {
    return <Businesses>{
      ...o,
      cursor: o.cursor,
      createdAt: new Date(o.createdAt),
    }
  }));
};
