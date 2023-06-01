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
                 , case when $1 is null or $2 is null
                     then 0
                     else ST_Distance(
                        ST_MakePoint($1, $2)::geography,
                        ST_MakePoint("lon", "lat")::geography
                   ) end as distance
            from "businesses"
        )
        select *
        from b
    `;

  const params: any[] = [ownCoordinates?.lon, ownCoordinates?.lat];

  // if where conditions exist, construct the where clause
  if (where?.inCategories || where?.inCirclesAddress) {
    let whereConditions = [];

    if (where?.inCategories) {
      whereConditions.push(`"categoryId" = ANY($${params.push(where.inCategories)})`);
    }

    if (where?.inCirclesAddress) {
      whereConditions.push(`"address" = ANY($${params.push(where.inCirclesAddress)})`);
    }

    query += " where " + whereConditions.join(" and ");
  }

  // if order condition exists, construct the order by clause
  if (order?.orderBy) {
    let orderClause = " order by ";
    let whereClause = "";

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
          whereClause += ` and "createdAt" < $${params.push(lastValue)}`;
        }
        break;
      case QueryAllBusinessesOrderOptions.Oldest:
        orderClause += `"createdAt" asc`;
        if (lastValue) {
          whereClause += ` and "createdAt" > $${params.push(lastValue)}`;
        }
        break;
      default:
        break;
    }

    query += whereClause + orderClause;
  }

  const effectiveLimit = limit && limit <= 100 ? limit : 20;
  query += ` limit $${params.push(effectiveLimit)}`;

  const result = Environment.readonlyApiDb.$queryRawUnsafe(query, params);

  return <Businesses[]>Object.values(result);
};
