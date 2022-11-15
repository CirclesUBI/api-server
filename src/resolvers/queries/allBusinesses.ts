import {Context} from "../../context";
import {Environment} from "../../environment";
import {Businesses, QueryAllBusinessesArgs, QueryAllBusinessesOrderOptions} from "../../types";

export const allBusinesses = async(parent: any, args: Partial<QueryAllBusinessesArgs>, _: Context) => {
  let filter:any = {};
  let order:any;

  if (args.queryParams) {
    if (args.queryParams.order?.orderBy == QueryAllBusinessesOrderOptions.Nearest
      && !args.queryParams?.ownCoordinates) {
      throw new Error(`Using order by ${QueryAllBusinessesOrderOptions.Nearest} but didn't supply 'ownCoordinates`);
    }
    if (args.queryParams.where?.inCategories) {
      if (args.queryParams.where?.inCategories.length == 0) {
        return [];
      }
      filter = {
        ...filter,
        businessCategoryId: {
          in: args.queryParams.where?.inCategories
        }
      }
    }
    if (args.queryParams.order?.orderBy == QueryAllBusinessesOrderOptions.Nearest) {
      const lat = args.queryParams.ownCoordinates!.lat.toString();
      const lon = args.queryParams.ownCoordinates!.lon.toString();

      const queryResult = await Environment.readWriteApiDb.$queryRaw`
        with cte as (
            SELECT ${lat}::text user_lat,
                   ${lon}::text as user_lon,
                   A."lat"::text as orga_lat,
                   A."lon"::text as orga_lon,
                   ST_Distance(
                      ST_point(${lat}::text::float, ${lon}::text::float),
                      ST_point(A."lat", A."lon")
                   ) as distance,
                   A."circlesAddress"
            FROM "Profile" as A
            where "type" = 'ORGANISATION'
              and "avatarUrl" is not null
        )
        SELECT "circlesAddress"
        FROM  cte
        order by distance;`;

      order = queryResult;
      console.log("order:", order);
    } else if (args.queryParams.order?.orderBy == QueryAllBusinessesOrderOptions.MostPopular) {
      const queryResult = await Environment.readWriteApiDb.$queryRaw`
select A."circlesAddress" as "circlesAddress"
     --, count(F."favoriteCirclesAddress") as "popularity"
from "Profile" A
left join "Favorites" F on (F."favoriteCirclesAddress" = A."circlesAddress")
where A."type" = 'ORGANISATION'
  and A."avatarUrl" is not null
group by A."circlesAddress"
order by count(F."favoriteCirclesAddress") desc;`;

      order = queryResult;
      console.log("order:", order);
    } else if (args.queryParams.order?.orderBy == QueryAllBusinessesOrderOptions.Newest) {
      const queryResult = await Environment.readWriteApiDb.$queryRaw`
select A."circlesAddress" as "circlesAddress"
from "Profile" A
left join "Favorites" F on (F."favoriteCirclesAddress" = A."circlesAddress")
where A."type" = 'ORGANISATION'
  and A."avatarUrl" is not null
order by A."createdAt" desc;`;

      order = queryResult;
      console.log("order:", order);
    } else if (args.queryParams.order?.orderBy == QueryAllBusinessesOrderOptions.Oldest) {
      const queryResult = await Environment.readWriteApiDb.$queryRaw`
select A."circlesAddress" as "circlesAddress"
from "Profile" A
left join "Favorites" F on (F."favoriteCirclesAddress" = A."circlesAddress")
where A."type" = 'ORGANISATION'
  and A."avatarUrl" is not null
order by A."createdAt" asc;`;

      order = queryResult;
      console.log("order:", order);
    } else if (args.queryParams.order?.orderBy == QueryAllBusinessesOrderOptions.Alphabetical) {
      const queryResult = await Environment.readWriteApiDb.$queryRaw`
select A."circlesAddress" as "circlesAddress"
from "Profile" A
left join "Favorites" F on (F."favoriteCirclesAddress" = A."circlesAddress")
where A."type" = 'ORGANISATION'
  and A."avatarUrl" is not null
order by A."firstName" asc;`;

      order = queryResult;
      console.log("order:", order);
    }
  }

  let queryResult = await Environment.readonlyApiDb.profile.findMany({
    where: {
      ...filter,
      type: "ORGANISATION",
      avatarUrl: {
        not: null
      }
    },
    select: {
      id: true,
      firstName: true,
      dream: true,
      location: true,
      circlesAddress: true,
      businessCategory: {
        select: {
          id: true,
          name: true
        }
      },
      avatarUrl: true,
      phoneNumber: true,
      businessHoursMonday: true,
      businessHoursTuesday: true,
      businessHoursWednesday: true,
      businessHoursThursday: true,
      businessHoursFriday: true,
      businessHoursSaturday: true,
      businessHoursSunday: true,
      businessCategoryId: true
    }
  })

  if (order) {
    const map = queryResult.toLookup(o => o.circlesAddress, o => o);
    return order.map((row:any) => {
      return map[row.circlesAddress];
    }).map((o:any) => {
      return <Businesses>{
        ...o,
        name: o.firstName,
        description: o.dream,
        picture: o.avatarUrl,
        businessCategoryId: o.businessCategory?.id,
        businessCategory: o.businessCategory?.name
      }
    });
  }

  return queryResult.map(o => {
    return <Businesses>{
      ...o,
      name: o.firstName,
      description: o.dream,
      picture: o.avatarUrl,
      businessCategoryId: o.businessCategory?.id,
      businessCategory: o.businessCategory?.name
    }
  });
}