import { Businesses, QueryAllBusinessesArgs, QueryAllBusinessesOrderOptions } from "../../types";
import { Context } from "../../context";
import { Environment } from "../../environment";

export const allBusinesses = async (parent: any, args: QueryAllBusinessesArgs, context: Context) => {
  const queryParams = args.queryParams;
  if (!queryParams) {
    throw new Error("Missing queryParams");
  }

  const { order, ownCoordinates, where, lastValue, limit } = queryParams;

  // start constructing the query
  let query = `
        with b as (
            select *
                 , case when $1 = '' or $2 = ''
                     then 0
                     else ST_Distance(
                        ST_MakePoint($1::DOUBLE PRECISION, $2::DOUBLE PRECISION)::geography,
                        ST_MakePoint("lon", "lat")::geography
                   ) end as distance
            from "businesses"
        )
        select id, "createdAt", name, description, "phoneNumber", location, "locationName", lat, lon, "circlesAddress", "businessCategoryId", "businessCategory", picture, "businessHoursMonday", "businessHoursTuesday", "businessHoursWednesday", "businessHoursThursday", "businessHoursFriday", "businessHoursSaturday", "businessHoursSunday", "favoriteCount"
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
      whereConditions.push(`"categoryId" = ANY($${params.push(where.inCategories)})`);
    }

    if (where?.inCirclesAddress) {
      whereConditions.push(`"address" = ANY($${params.push(where.inCirclesAddress)})`);
    }

    query += " where " + whereConditions.join(" and ");
    hasWhere = true;
  }

  // if order condition exists, construct the order by clause
  if (order?.orderBy) {
    let orderClause = " order by ";
    let whereClause = " 1=1 ";

    switch (order.orderBy) {
      case QueryAllBusinessesOrderOptions.Alphabetical:
        orderClause += `"name" asc`;
        if (lastValue) {
          whereClause += ` and "name" > $${params.push(lastValue)}`;
        }
        break;
      case QueryAllBusinessesOrderOptions.Favorites:
        orderClause += `"favoriteCount" desc`;
        if (lastValue) {
          whereClause += ` and "favoriteCount" < $${params.push(Number(lastValue))}`;
        }
        break;
      case QueryAllBusinessesOrderOptions.MostPopular:
        orderClause += `"favoriteCount" desc`;
        if (lastValue) {
          whereClause += ` and "favoriteCount" < $${params.push(Number(lastValue))}`;
        }
        break;
      case QueryAllBusinessesOrderOptions.Nearest:
        orderClause += `distance asc`;
        if (lastValue) {
          whereClause += ` and distance > $${params.push(Number(lastValue))}`;
        }
        break;
      case QueryAllBusinessesOrderOptions.Newest:
        orderClause += `"createdAt" desc`;
        if (lastValue) {
          whereClause += ` and "createdAt" < $${params.push(new Date(lastValue))}`;
        }
        break;
      case QueryAllBusinessesOrderOptions.Oldest:
        orderClause += `"createdAt" asc`;
        if (lastValue) {
          whereClause += ` and "createdAt" > $${params.push(new Date(lastValue))}`;
        }
        break;
      default:
        break;
    }

    query += (hasWhere ? "" : " where" ) +  whereClause + orderClause;
  }

  const effectiveLimit = limit && limit <= 100 ? limit : 20;
  query += ` limit $${params.push(effectiveLimit)}`;

  const result = await Environment.readonlyApiDb.$queryRawUnsafe(query, ...params);

  return Object.values((<any>result).map((o:any) => {
    return <Businesses>{
      ...o,
      createdAt: new Date(o.createdAt),
    }
  }));
};
