import { Context } from "../../context";
import { ProfileLoader } from "../../querySources/profileLoader";
import { QueryRecentProfilesArgs, Profile, SortOrder } from "../../types";
import { Environment } from "../../environment";

export const recentProfiles = async (
  parent: any,
  args: QueryRecentProfilesArgs,
  context?: Context
) => {
  const where: any = {
    circlesAddress: { not: null },
  };

  const limit = args.pagination
    ? Number.isInteger(args.pagination.limit) &&
      args.pagination.limit > 0 &&
      args.pagination.limit <= 100
      ? args.pagination.limit
      : 50
    : 50;

  if (args.pagination?.continueAtId && args.pagination?.order) {
    const Id = args.pagination.continueAtId;
    where.id =
      args.pagination?.order == SortOrder.Asc
        ? {
            gt: Id,
          }
        : {
            lt: Id,
          };
  }

  const result = await Environment.readonlyApiDb.profile.findMany({
    where: {
      ...where,
    },
    select: {
      id: true,
      circlesAddress: true,
    },
    take: limit,
    orderBy: {
      id: "desc",
    },
  });

  const safeAddresses = result
    .filter(o => o.id)
    .map(o => o.id);

  const profiles = await new ProfileLoader().queryCirclesLandById(
    Environment.readWriteApiDb,
    safeAddresses
  );
  return <Profile[]>Object.values(profiles.idProfileMap)
    .map((o) => {
      // @ts-ignore
      delete o.newsletter;
      // @ts-ignore
      o.memberships = [];
      return o;
    })
    .reverse();
};
