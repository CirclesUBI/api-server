import { Context } from "../../context";
import { ProfileLoader } from "../../profileLoader";
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
    // orderBy: {
    //   createdAt: args.pagination?.order == SortOrder.Asc ? "asc" : "desc",
    // },
  });

  const safeAddresses = result.reduce((p, c) => {
    if (c.id) {
      p.push(c.id);
    }
    return p;
  }, <number[]>[]);

  const profiles = await new ProfileLoader().queryCirclesLandById(
    Environment.readWriteApiDb,
    safeAddresses
  );
  return <Profile[]>Object.values(profiles.idProfileMap).map((o) => {
    // @ts-ignore
    delete o.newsletter;
    // @ts-ignore
    o.memberships = [];
    return o;
  });
};
