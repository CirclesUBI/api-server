import {PrismaClient} from "../api-db/client";
import {DisplayCurrency, Organisation, Profile, ProfileOrigin, ProfileType, Verification,} from "../types";
import {RpcGateway} from "../circles/rpcGateway";
import fetch from "cross-fetch";

export type SafeProfileMap = { [safeAddress: string]: Profile & {emailAddressVerified:boolean, askedForEmailAddress:boolean} | null };
export type IdProfileMap = { [id: number]: Profile & {emailAddressVerified:boolean, askedForEmailAddress:boolean} | null };

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
      }
    });

    const safeProfileMap = profiles.toLookup(c => c.circlesAddress, c => ProfileLoader.withDisplayCurrency(c));
    const idProfileMap = profiles.toLookup(c => c.id, c => ProfileLoader.withDisplayCurrency(c));

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

  static withDisplayCurrency(profile: any): Profile  & {emailAddressVerified:boolean, inviteTriggerId?:number, askedForSafeAddress:boolean}{
    return {
      ...profile,
      displayCurrency: ProfileLoader.getDisplayCurrency(profile),
    };
  }

  async queryRecentProfiles(
    prisma: PrismaClient
  ): Promise<{ safeProfileMap: SafeProfileMap; idProfileMap: IdProfileMap }> {
    const profiles = await prisma.profile.findMany({
      where: {
        circlesAddress: { not: null },
      },
      orderBy: {
        id: "desc",
      },
      take: 100,
    });

    const safeProfileMap = profiles.toLookup(c => c.circlesAddress, c => ProfileLoader.withDisplayCurrency(c));
    const idProfileMap = profiles.toLookup(c => c.id, c => ProfileLoader.withDisplayCurrency(c));

    return { safeProfileMap, idProfileMap };
  }

  async queryCirclesLandBySafeAddress(
    prisma: PrismaClient,
    safeAddresses: string[]
  ): Promise<SafeProfileMap> {
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

    const promiseResults = await Promise.all([
      safeVerificationsPromise,
      profilesPromise,
    ]);

    const safeVerifications = promiseResults[0];
    const safeVerificationsMap = safeVerifications.toLookup(
      c => c.safeAddress,
      c => {
        return {
        ...c,
            createdByOrganisation: ProfileLoader.withDisplayCurrency(
            c.createdByOrganisation
          ),
        }
      }
    )

    const profiles = promiseResults[1];
    const safeProfileMap = profiles.reduce((p, c) => {
      if (!c.circlesAddress) return p;

      let verifications: Verification[] = [];
      if (safeVerificationsMap[c.circlesAddress]) {
        const safeVerification = safeVerificationsMap[c.circlesAddress];
        if (
          safeVerification.createdByOrganisation &&
          safeVerification.createdByOrganisation.circlesAddress
        ) {
          verifications.push({
            __typename: "Verification",
            verifierProfile: <Organisation>{
              ...safeVerification.createdByOrganisation,
              name: safeVerification.createdByOrganisation.firstName,
              createdAt: "",
            },
            verificationRewardTransactionHash: "",
            verificationRewardTransaction: null,
            verifierSafeAddress:
              safeVerification.createdByOrganisation.circlesAddress,
            createdAt: safeVerification.createdAt.toJSON(),
            verifiedSafeAddress: c.circlesAddress,
            verifiedProfile: ProfileLoader.withDisplayCurrency(c),
            revokedAt: safeVerification.revokedAt
              ? safeVerification.revokedAt.toJSON()
              : null,
            revokedProfile: ProfileLoader.withDisplayCurrency(c),
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

  async queryCirclesGardenLocal(
    prisma: PrismaClient,
    safeAddresses: string[]
  ): Promise<SafeProfileMap> {
    const profiles = await prisma.externalProfiles.findMany({
      where: {
        circlesAddress: {
          in: safeAddresses,
        },
      },
    });

    const safeProfileMap = profiles
      .map((o) => {
        return <Profile & {emailAddressVerified:boolean}>{
          id: -1,
          type: ProfileType.Person,
          circlesAddress: o.circlesAddress,
          firstName: o.name,
          avatarUrl: o.avatarUrl,
          emailAddressVerified: false
        };
      })
      .toLookup(c => c.circlesAddress, c => c);

    return safeProfileMap;
  }

  async queryCirclesGardenRemote(
    prisma: PrismaClient,
    safeAddresses: string[]
  ): Promise<SafeProfileMap> {
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
      const query = batch.reduce(
        (p, c) =>
          p + `address[]=${RpcGateway.get().utils.toChecksumAddress(c)}&`,
        ""
      );
      const requestUrl = `https://api.circles.garden/api/users/?${query}`;

      const requestResult = await fetch(requestUrl);
      const requestResultJson = await requestResult.json();

      const profiles: (Profile & {emailAddressVerified:boolean})[] =
        requestResultJson.data.map((o: any) => {
          return <Profile & {emailAddressVerified: boolean}>{
            id: -1,
            type: ProfileType.Person,
            firstName: o.username,
            lastName: "",
            circlesAddress: o.safeAddress.toLowerCase(),
            avatarUrl: o.avatarUrl,
            emailAddressVerified: false
          };
        }) ?? [];

      profiles.forEach((o) => {
        if (!o.circlesAddress) return;
        safeProfileMap[o.circlesAddress] = o;
      }, safeProfileMap);
    }

    return safeProfileMap;
  }

  async profilesBySafeAddress(
    prisma: PrismaClient,
    addresses: string[]
  ): Promise<SafeProfileMap> {
    const lowercaseAddresses = addresses.map((o) => o.toLowerCase());
    const circlesLandProfilesPromise = this.queryCirclesLandBySafeAddress(
      prisma,
      lowercaseAddresses
    );
    const circlesGardenLocalPromise = this.queryCirclesGardenLocal(
      prisma,
      lowercaseAddresses
    );

    const localQueryResults = await Promise.all([
      circlesLandProfilesPromise,
      circlesGardenLocalPromise,
    ]);

    const circlesLandProfilesResult = localQueryResults[0];
    const circlesGardenLocalResult = localQueryResults[1];

    const allProfilesMap: SafeProfileMap = {};
    Object.entries(circlesGardenLocalResult).forEach((entry) => {
      const profile = entry[1];
      if (profile) {
        profile.origin = ProfileOrigin.CirclesGarden;
        allProfilesMap[entry[0]] = profile;
      }
    });
    Object.entries(circlesLandProfilesResult).forEach((entry) => {
      const profile = entry[1];
      if (profile) {
        profile.origin = ProfileOrigin.CirclesLand;
        allProfilesMap[entry[0]] = profile;
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

    const nonLocalProfileMap: SafeProfileMap = {};
    lowercaseAddresses
      .filter((addr) => !allProfilesMap[addr])
      .forEach((addr) => {
        nonLocalProfileMap[addr] = null;
      });

    const circlesGardenRemoteResult = await this.queryCirclesGardenRemote(
      prisma,
      Object.keys(nonLocalProfileMap)
    );
    Object.entries(circlesGardenRemoteResult).forEach((entry) => {
      const profile = entry[1];
      if (profile) {
        profile.origin = ProfileOrigin.CirclesGarden;
        allProfilesMap[entry[0]] = profile;
        nonLocalProfileMap[entry[0]] = profile;
      }
    });

    const nonLocal = Object.keys(nonLocalProfileMap).filter(
      (o) => allProfilesMap[o]
    );
    const notFound = Object.keys(nonLocalProfileMap).filter(
      (o) => !allProfilesMap[o]
    );

    const nonLocalProfiles = nonLocal.map((o) => nonLocalProfileMap[o]);
    const notFoundProfiles = notFound.map((o) => {
      return <any>{
        origin: ProfileOrigin.Unknown,
        type: ProfileType.Person,
        circlesAddress: o,
        name: o,
        avatarUrl: null,
      };
    });

    // Persist the non-local results in the api-db
    await prisma.externalProfiles.createMany({
      data: nonLocalProfiles.concat(notFoundProfiles).map((o) => {
        if (!o || !o.circlesAddress) throw new Error(`Invalid state`);

        return {
          circlesAddress: o.circlesAddress,
          name: o.firstName ?? o.circlesAddress,
          avatarUrl: o.avatarUrl ?? null,
        };
      }),
      skipDuplicates: true,
    });

    return allProfilesMap;
  }

  static displayName(profile: Profile) {
    return `${profile.firstName}${profile.lastName ? " " + profile.lastName : ""}`
  }
}
