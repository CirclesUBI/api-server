import {Context} from "../../context";
import {MutationUpsertOrganisationArgs, Organisation, Profile} from "../../types";
import {ProfileLoader} from "../../querySources/profileLoader";
import {Environment} from "../../environment";
import {RpcGateway} from "../../circles/rpcGateway";

export async function isOrgAdmin(userAddress: string, orgId: number): Promise<boolean> {
  return !!(await Environment.readWriteApiDb.membership.findFirst({
    where: {
      memberAddress: userAddress,
      memberAtId: orgId,
      isAdmin: true,
    },
  }));
}

export async function upsertOrganisation(parent: any, args: MutationUpsertOrganisationArgs, context: Context) {
  const callerInfo = await context.callerInfo;

  if (!callerInfo?.profile?.circlesAddress) {
    throw new Error(`You need a completed profile to use this feature.`);
  }

  let organisationProfile: Profile;
  if (args.organisation.circlesAddress && !RpcGateway.get().utils.isAddress(args.organisation.circlesAddress)) {
    throw new Error(`Invalid 'circlesAddress': ${args.organisation.circlesAddress}`);
  }
  if (args.organisation.circlesAddress) {
    if (!(await context.isOwnerOfSafe(args.organisation.circlesAddress))) {
      throw new Error(`You EOA isn't an owner of safe ${args.organisation.circlesAddress}`);
    }
  }

  if (args.organisation.id) {
    if (!(await isOrgAdmin(callerInfo.profile.circlesAddress, args.organisation.id))) {
      throw new Error(`You must be the admin of the organisation.`);
    }
    organisationProfile = ProfileLoader.withDisplayCurrency(
      await Environment.readWriteApiDb.profile.update({
        where: {
          id: args.organisation.id,
        },
        data: {
          firstName: args.organisation.name,
          dream: args.organisation.description,
          circlesAddress: args.organisation.circlesAddress,
          avatarUrl: args.organisation.avatarUrl,
          avatarMimeType: args.organisation.avatarMimeType,
          location: args.organisation.location,
          locationName: args.organisation.locationName,
          lat: args.organisation.lat,
          lon: args.organisation.lon,
          businessHoursMonday: args.organisation.businessHoursMonday,
          businessHoursTuesday: args.organisation.businessHoursTuesday,
          businessHoursWednesday: args.organisation.businessHoursWednesday,
          businessHoursThursday: args.organisation.businessHoursThursday,
          businessHoursFriday: args.organisation.businessHoursFriday,
          businessHoursSaturday: args.organisation.businessHoursSaturday,
          businessHoursSunday: args.organisation.businessHoursSunday,
          phoneNumber: args.organisation.phoneNumber,
          businessCategoryId: args.organisation.businessCategoryId
        },
      })
    );
  } else {
    organisationProfile = ProfileLoader.withDisplayCurrency(
      await Environment.readWriteApiDb.profile.create({
        data: {
          firstName: args.organisation.name,
          dream: args.organisation.description,
          circlesAddress: args.organisation.circlesAddress,
          avatarUrl: args.organisation.avatarUrl,
          avatarMimeType: args.organisation.avatarMimeType,
          type: "ORGANISATION",
          lastInvoiceNo: 0,
          lastRefundNo: 0,
          location: args.organisation.location,
          locationName: args.organisation.locationName,
          lat: args.organisation.lat,
          lon: args.organisation.lon,
          businessHoursMonday: args.organisation.businessHoursMonday,
          businessHoursTuesday: args.organisation.businessHoursTuesday,
          businessHoursWednesday: args.organisation.businessHoursWednesday,
          businessHoursThursday: args.organisation.businessHoursThursday,
          businessHoursFriday: args.organisation.businessHoursFriday,
          businessHoursSaturday: args.organisation.businessHoursSaturday,
          businessHoursSunday: args.organisation.businessHoursSunday,
          phoneNumber: args.organisation.phoneNumber,
          businessCategoryId: args.organisation.businessCategoryId
        },
      })
    );

    // Automatically create an accepted admin membership for the creator.
    await Environment.readWriteApiDb.membership.create({
      data: {
        createdAt: new Date(),
        createdByProfileId: callerInfo.profile.id,
        validTo: null,
        acceptedAt: new Date(),
        isAdmin: true,
        memberAddress: callerInfo.profile.circlesAddress,
        memberAtId: organisationProfile.id,
      },
    });
  }

  return {
    success: true,
    organisation: <Organisation>{
      ...args,
      ...organisationProfile,
      id: organisationProfile.id,
      createdAt: new Date().toJSON(),
      name: organisationProfile.firstName,
      displayName: organisationProfile.firstName,
      locationName: organisationProfile.locationName,
      members: [],
    },
  };
}
