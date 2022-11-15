import {Context} from "../../context";
import {Environment} from "../../environment";
import {Businesses} from "../../types";

export const allBusinesses = async(parent: any, args: {categoryId?: number|null, id?: number|null, circlesAddress?: string|null}, _: Context) => {
  let queryResult = await Environment.readonlyApiDb.profile.findMany({
    where: {
      type: "ORGANISATION",
      businessCategoryId: args.categoryId,
      ... args.id ? {id: args.id} : {},
      ... args.circlesAddress ? {circlesAddress: args.circlesAddress} : {},
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