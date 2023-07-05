import { PrismaClient } from "../api-db/client";
import { DisplayCurrency, Organisation, Profile, ProfileOrigin, ProfileType, Verification } from "../types";
import { RpcGateway } from "../circles/rpcGateway";
import fetch from "cross-fetch";

export type SafeProfileMap = {
  [safeAddress: string]: (Profile & { emailAddressVerified: boolean; askedForEmailAddress: boolean }) | null;
};
export type IdProfileMap = {
  [id: number]: (Profile & { emailAddressVerified: boolean; askedForEmailAddress: boolean }) | null;
};

export function hashCodeFromString(str: string) {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export class ProfileLoader {
  async queryCirclesLandById(
    prisma: PrismaClient,
    ids: number[]
  ): Promise<{ safeProfileMap: SafeProfileMap; idProfileMap: IdProfileMap }> {
    const profiles = await prisma.profile.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      orderBy: {
        lastUpdateAt: "asc",
      },
    });

    const safeProfileMap = profiles.toLookup(
      (c) => c.circlesAddress,
      (c) => ProfileLoader.withDisplayCurrency(c)
    );
    const idProfileMap = profiles.toLookup(
      (c) => c.id,
      (c) => ProfileLoader.withDisplayCurrency(c)
    );

    return { safeProfileMap, idProfileMap };
  }

  static getDisplayCurrency(profile: any): DisplayCurrency {
    if (!profile) {
      return DisplayCurrency.Eurs;
    }
    switch (profile.displayCurrency) {
      case "CRC":
        return DisplayCurrency.Crc;
      case "TIME_CRC":
        return DisplayCurrency.TimeCrc;
      case "EURS":
        return DisplayCurrency.Eurs;
      default:
        return DisplayCurrency.Eurs;
    }
  }

  static withDisplayCurrency(
    profile: any
  ): Profile & { emailAddressVerified: boolean; inviteTriggerId?: number; askedForSafeAddress: boolean } {
    return {
      ...profile,
      name: profile?.firstName,
      displayCurrency: ProfileLoader.getDisplayCurrency(profile),
    };
  }

  // async queryRecentProfiles(
  //   prisma: PrismaClient
  // ): Promise<{ safeProfileMap: SafeProfileMap; idProfileMap: IdProfileMap }> {
  //   const profiles = await prisma.profile.findMany({
  //     where: {
  //       circlesAddress: { not: null },
  //     },
  //     orderBy: {
  //       id: "desc",
  //     },
  //     take: 100,
  //   });
  //
  //   const safeProfileMap = profiles.toLookup(c => c.circlesAddress, c => ProfileLoader.withDisplayCurrency(c));
  //   const idProfileMap = profiles.toLookup(c => c.id, c => ProfileLoader.withDisplayCurrency(c));
  //
  //   return { safeProfileMap, idProfileMap };
  // }

  async queryCirclesLandBySafeAddress(prisma: PrismaClient, safeAddresses: string[]): Promise<SafeProfileMap> {
    const profilesPromise = prisma.profile.findMany({
      where: {
        circlesAddress: {
          in: safeAddresses,
        },
      },
      orderBy: {
        lastUpdateAt: "asc",
      },
    });

    const safeVerificationsPromise = prisma.verifiedSafe.findMany({
      where: {
        safeAddress: {
          in: safeAddresses,
        },
      },
      include: {
        createdByOrganisation: true,
      },
    });

    const promiseResults = await Promise.all([safeVerificationsPromise, profilesPromise]);

    const safeVerifications = promiseResults[0];
    const safeVerificationsMap = safeVerifications.toLookup(
      (c) => c.safeAddress,
      (c) => {
        return {
          ...c,
          createdByOrganisation: ProfileLoader.withDisplayCurrency(c.createdByOrganisation),
        };
      }
    );

    const profiles = promiseResults[1];
    const safeProfileMap = profiles.reduce((p, c) => {
      if (!c.circlesAddress) return p;

      let verifications: Verification[] = [];
      if (safeVerificationsMap[c.circlesAddress]) {
        const safeVerification = safeVerificationsMap[c.circlesAddress];
        if (safeVerification.createdByOrganisation && safeVerification.createdByOrganisation.circlesAddress) {
          verifications.push({
            __typename: "Verification",
            verifierProfile: <Organisation>{
              ...safeVerification.createdByOrganisation,
              name: safeVerification.createdByOrganisation.firstName,
              createdAt: "",
            },
            verificationRewardTransactionHash: "",
            verificationRewardTransaction: null,
            verifierSafeAddress: safeVerification.createdByOrganisation.circlesAddress,
            createdAt: safeVerification.createdAt.toJSON(),
            verifiedSafeAddress: c.circlesAddress,
            verifiedProfile: c ? ProfileLoader.withDisplayCurrency(c) : null,
            revokedAt: safeVerification.revokedAt ? safeVerification.revokedAt.toJSON() : null,
            revokedProfile: c ? ProfileLoader.withDisplayCurrency(c) : null,
          });
        }
      }

      p[c.circlesAddress] = {
        ...ProfileLoader.withDisplayCurrency(c),
        verifications: verifications,
      };
      return p;
    }, <SafeProfileMap>{});

    return safeProfileMap;
  }

  // async queryCirclesGardenLocal(
  //     prisma: PrismaClient,
  //     safeAddresses: string[]
  // ): Promise<SafeProfileMap> {
  //   const profiles = await prisma.externalProfiles.findMany({
  //     where: {
  //       circlesAddress: {
  //         in: safeAddresses,
  //       },
  //     },
  //   });
  //
  //   const safeProfileMap = profiles
  //       .map((o) => {
  //         return <Profile & { emailAddressVerified: boolean }>{
  //           id: -1,
  //           type: ProfileType.Person,
  //           circlesAddress: o.circlesAddress,
  //           firstName: o.name,
  //           avatarUrl: o.avatarUrl,
  //           emailAddressVerified: false
  //         };
  //       })
  //       .toLookup(c => c.circlesAddress, c => c);
  //
  //   return safeProfileMap;
  // }
  //
  async queryCirclesGardenRemote(prisma: PrismaClient, safeAddresses: string[]): Promise<SafeProfileMap> {
    // Batch all safeAddresses (max. 50)

    const safeAddressCopy = JSON.parse(JSON.stringify(safeAddresses));
    const batches: string[][] = [];

    while (safeAddressCopy.length) {
      batches.push(safeAddressCopy.splice(0, 50));
    }

    const safeProfileMap: SafeProfileMap = {};

    if (batches.length == 0) {
      return safeProfileMap;
    }

    for (let batch of batches) {
      const query = batch.reduce((p, c) => p + `address[]=${RpcGateway.get().utils.toChecksumAddress(c)}&`, "");
      const requestUrl = `https://api.circles.garden/api/users/?${query}`;

      const requestResult = await fetch(requestUrl);
      const requestResultJson = await requestResult.json();

      const profiles: (Profile & { emailAddressVerified: boolean })[] =
        requestResultJson.data.map((o: any) => {
          return <Profile & { emailAddressVerified: boolean }>{
            id: -1,
            type: ProfileType.Person,
            firstName: o.username,
            lastName: "",
            circlesAddress: o.safeAddress.toLowerCase(),
            avatarUrl: o.avatarUrl,
            emailAddressVerified: false,
          };
        }) ?? [];

      profiles.forEach((o) => {
        if (!o.circlesAddress) return;
        safeProfileMap[o.circlesAddress] = o;
      }, safeProfileMap);
    }

    return safeProfileMap;
  }

  async profilesBySafeAddress(prisma: PrismaClient, addresses: string[]): Promise<SafeProfileMap> {
    const lowercaseAddresses = addresses.map((o) => o.toLowerCase());
    const localQueryResults = await this.queryCirclesLandBySafeAddress(prisma, lowercaseAddresses);

    const allProfilesMap: SafeProfileMap = {};

    addresses.forEach((address, i) => {
      const profile = localQueryResults[address.toLowerCase()];
      if (profile) {
        profile.origin = ProfileOrigin.CirclesLand;
        allProfilesMap[address] = profile;
      } else {
        allProfilesMap[address] = <any>{
          id: hashCodeFromString(address),
          origin: ProfileOrigin.Unknown,
          type: ProfileType.Person,
          circlesAddress: address,
          name: address,
          displayName: address,
          firstName: address,
          avatarUrl: null,
        };
      }
    });

    if (allProfilesMap["0x0000000000000000000000000000000000000000"]) {
      allProfilesMap["0x0000000000000000000000000000000000000000"] = {
        id: 0,
        type: ProfileType.Person,
        firstName: "Circles",
        emailAddressVerified: false,
        askedForEmailAddress: false,
        lastName: "Land",
        avatarUrl: "https://dev.circles.land/logos/circles.png",
        circlesAddress: "0x0000000000000000000000000000000000000000",
        origin: ProfileOrigin.Unknown,
      };
    }

    return allProfilesMap;
  }

  static displayName(profile: Profile) {
    return `${profile.firstName}${profile.lastName ? " " + profile.lastName : ""}`;
  }
}
