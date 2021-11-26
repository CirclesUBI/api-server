import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";
import {MutationUpsertOrganisationArgs, Profile} from "../../types";

export async function isOrgAdmin(prisma_api_rw:PrismaClient, userAddress:string, orgId: number) : Promise<boolean> {
  return !!(await prisma_api_rw.membership.findFirst({
    where: {
      memberAddress: userAddress,
      memberAtId: orgId,
      isAdmin: true
    }
  }));
}

export function upsertOrganisation(prisma_api_rw:PrismaClient, isRegion:boolean) {
    return async (parent:any, args:MutationUpsertOrganisationArgs, context:Context) => {
      const callerInfo = await context.callerInfo;

      if (!callerInfo?.profile?.circlesAddress) {
        throw new Error(`You need a completed profile to use this feature.`);
      }

      let organisationProfile:Profile;
      if (args.organisation.id && await isOrgAdmin(prisma_api_rw, callerInfo.profile.circlesAddress, args.organisation.id)) {
        organisationProfile = await prisma_api_rw.profile.update({
          where: {
            id: args.organisation.id
          },
          data: {
            id: args.organisation.id,
            firstName: args.organisation.name,
            dream: args.organisation.description,
            circlesAddress: args.organisation.circlesAddress,
            avatarUrl: args.organisation.avatarUrl,
            avatarMimeType: args.organisation.avatarMimeType,
            cityGeonameid: args.organisation.cityGeonameid
          }
        });
      } else {
        // TODO: Check if the user is the owner of the safe
        organisationProfile = await prisma_api_rw.profile.create({
          data: {
            firstName: args.organisation.name,
            dream: args.organisation.description,
            circlesAddress: args.organisation.circlesAddress,
            avatarUrl: args.organisation.avatarUrl,
            avatarMimeType: args.organisation.avatarMimeType,
            type: isRegion ? "REGION" : "ORGANISATION",
            cityGeonameid: args.organisation.cityGeonameid,
            lastInvoiceNo: 0,
            lastRefundNo: 0
          }
        });

        // Automatically create an accepted admin membership for the creator.
        await prisma_api_rw.membership.create({
          data: {
            createdAt: new Date(),
            createdByProfileId: callerInfo.profile.id,
            validTo: null,
            acceptedAt: new Date(),
            isAdmin: true,
            memberAddress: callerInfo.profile.circlesAddress,
            memberAtId: organisationProfile.id
          }
        });
      }

      return {
        success: true,
        organisation: {
          ...args,
          id: organisationProfile.id,
          createdAt: new Date().toJSON(),
          name: organisationProfile.firstName,
          members: []
        }
      };
    }
}