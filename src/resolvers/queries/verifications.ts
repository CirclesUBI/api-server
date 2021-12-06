import {QueryVerificationsArgs, SortOrder, Verification} from "../../types";
import {Context} from "../../context";
import {prisma_api_ro} from "../../apiDbClient";
import {ProfileLoader} from "../../profileLoader";

export const verifications = async (parent:any, args:QueryVerificationsArgs, context?:Context) => {
  const where:any = { };

  const limit = args.pagination ? (Number.isInteger(args.pagination.limit) && args.pagination.limit > 0 && args.pagination.limit <= 100
    ? args.pagination.limit
    : 50) : 50;

  if (args.pagination?.continueAt && args.pagination?.order) {
    const continueAtDate = new Date(Date.parse(args.pagination.continueAt));
    where.createdAt = args.pagination?.order == SortOrder.Asc ? {
      gt: continueAtDate
    } : {
      lt: continueAtDate
    };
  }
  if (args.filter?.addresses) {
    where.safeAddress = {
      in: args.filter?.addresses
    };
  }

  const result = await prisma_api_ro.verifiedSafe.findMany({
    where: where,
    select: {
      createdAt: true,
      safeAddress: true,
      createdByOrganisation: {
        select: {
          circlesAddress: true
        }
      }
    },
    take: limit,
    orderBy: {
      createdAt: args.pagination?.order == SortOrder.Asc ? "asc" : "desc"
    }
  });

  const safeAddresses = result.reduce((p, c) => {
    p[c.safeAddress] = true;
    if (c.createdByOrganisation?.circlesAddress) {
      p[c.createdByOrganisation.circlesAddress] = true;
    }
    return p;
  }, <{[address:string]:any}>{});

  const profiles = await new ProfileLoader().profilesBySafeAddress(prisma_api_ro, Object.keys(safeAddresses));

  return result.sort((a,b) => {
    return args.pagination?.order == SortOrder.Asc || !args.pagination
      ? a.createdAt.getTime() > b.createdAt.getTime()
        ? 1
        : a.createdAt.getTime() < b.createdAt.getTime()
          ? -1
          : 0
      : a.createdAt.getTime() > b.createdAt.getTime()
        ? -1
        : a.createdAt.getTime() < b.createdAt.getTime()
          ? 1
          : 0
  }).map(o => {
    return <Verification>{
      __typename: "Verification",
      createdAt: o.createdAt.toJSON(),
      verifiedSafeAddress: o.safeAddress,
      verifiedProfile: profiles[o.safeAddress],
      verifierSafeAddress: o.createdByOrganisation.circlesAddress,
      verifierProfile: {
        ...profiles[o.createdByOrganisation.circlesAddress ?? ""],
        name: profiles[o.createdByOrganisation.circlesAddress ?? ""]?.firstName
      }
    }
  });
}