import {QueryVerificationsArgs, Verification} from "../../types";
import {Context} from "../../context";
import {prisma_api_ro} from "../../apiDbClient";
import {ProfileLoader} from "../../profileLoader";

export const verifications = async (parent:any, args:QueryVerificationsArgs, context:Context) => {
  const where:any = { };
  if (args.pagination?.continueAt) {
    where.createdAt = {
      gt: new Date(args.pagination.continueAt)
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
    take: args.pagination?.limit ?? 50,
    orderBy: {
      createdAt: "desc"
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

  return result.map(o => {
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