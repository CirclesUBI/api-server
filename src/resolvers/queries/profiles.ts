import { Context } from "../../context";
import { PrismaClient } from "../../api-db/client";
import {ProfileLoader} from "../../profileLoader";
import {Profile} from "../../types";

export type ProfilesBySafeAddressLookup = {
  [safeAddress: string]: Profile | null;
};

export function profilesBySafeAddress(
  prisma: PrismaClient
) {
  return async (
    parent: any,
    args: { safeAddresses: string[] },
    context: Context
  ) => {
    const profileLoader = new ProfileLoader();
    const profiles = await profileLoader.profilesBySafeAddress(prisma, args.safeAddresses);
    return <Profile[]>Object.values(profiles);
  };
}

export function myProfile(prisma: PrismaClient) {
  return async (parent: any, args: any, context: Context) => {
    let ownProfileId: number | null = null;
    if (context.session) {
      ownProfileId = context.session.profileId;
    }
    if (!ownProfileId) {
      return null;
    }
    const rows = await prisma.profile.findMany({
      where: {
        id: ownProfileId,
      },
    });
    if (rows.length != 1) {
      return null;
    }
    return ProfileLoader.withDisplayCurrency(rows[0]);
  };
}