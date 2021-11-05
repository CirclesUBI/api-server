import {PrismaClient} from "./api-db/client";
import {Profile} from "./types";
import {RpcGateway} from "./rpcGateway";
import fetch from "cross-fetch";

export type SafeProfileMap = {[safeAddress:string]:Profile|null};

export class ProfileLoader {
  async queryCirclesLandById(prisma: PrismaClient, ids:number[]) : Promise<SafeProfileMap> {
    const profiles = await prisma.profile.findMany({
      where: {
        id: {
          in: ids
        }
      },
      orderBy: {
        lastUpdateAt: "asc"
      }
    });

    const safeProfileMap = profiles.reduce((p,c)=> {
      if (!c.circlesAddress)
        return p;
      p[c.circlesAddress] = c;
      return p;
    }, <SafeProfileMap>{});

    return safeProfileMap;
  }

  async queryCirclesLandBySafeAddress(prisma: PrismaClient, safeAddresses:string[]) : Promise<SafeProfileMap> {
    const profiles = await prisma.profile.findMany({
      where: {
        circlesAddress: {
          in: safeAddresses
        }
      },
      orderBy: {
        lastUpdateAt: "asc"
      }
    });

    const safeProfileMap = profiles.reduce((p,c)=> {
      if (!c.circlesAddress)
        return p;
      p[c.circlesAddress] = c;
      return p;
    }, <SafeProfileMap>{});

    return safeProfileMap;
  }

  async queryCirclesGardenLocal(prisma: PrismaClient, safeAddresses:string[]) : Promise<SafeProfileMap> {
    const profiles = await prisma.externalProfiles.findMany({
      where: {
        circlesAddress: {
          in: safeAddresses
        }
      },
    });

    const safeProfileMap = profiles
      .map(o => {
        return <Profile>{
          id: -1,
          circlesAddress: o.circlesAddress,
          firstName: o.name,
          avatarUrl: o.avatarUrl
        }
      })
      .reduce((p,c)=> {
        if (!c.circlesAddress)
          return p;
        p[c.circlesAddress] = c;
        return p;
      }, <SafeProfileMap>{});

    return safeProfileMap;
  }

  async queryCirclesGardenRemote(prisma: PrismaClient, safeAddresses:string[]) : Promise<SafeProfileMap> {
    // Batch all safeAddresses (max. 50)
    const safeAddressCopy = JSON.parse(JSON.stringify(safeAddresses));
    const batches: string[][] = [];

    while(safeAddressCopy.length) {
      batches.push(safeAddressCopy.splice(0, 50));
    }

    const safeProfileMap: SafeProfileMap = {};
    for(let batch of batches)
    {
      const query = batch.reduce((p, c) =>
        p + `address[]=${RpcGateway.get().utils.toChecksumAddress(c)}&`, "");
      const requestUrl = `https://api.circles.garden/api/users/?${query}`;

      const requestResult = await fetch(requestUrl);
      const requestResultJson = await requestResult.json()

      const profiles:Profile[] = requestResultJson.data.map((o: any) => {
        return <Profile>{
          id: -1,
          firstName: o.username,
          lastName: "",
          circlesAddress: o.safeAddress.toLowerCase(),
          avatarUrl: o.avatarUrl,
        };
      }) ?? [];

      profiles.forEach((o)=> {
          if (!o.circlesAddress)
            return;
        safeProfileMap[o.circlesAddress] = o;
      }, safeProfileMap);
    }

    return safeProfileMap;
  }

  async profilesBySafeAddress(prisma:PrismaClient, addresses:string[]) : Promise<SafeProfileMap> {
    const lowercaseAddresses = addresses.map(o => o.toLowerCase());
    const circlesLandProfilesPromise = this.queryCirclesLandBySafeAddress(prisma, lowercaseAddresses);
    const circlesGardenLocalPromise = this.queryCirclesGardenLocal(prisma, lowercaseAddresses);

    const localQueryResults = await Promise.all([
      circlesLandProfilesPromise,
      circlesGardenLocalPromise
    ]);

    const circlesLandProfilesResult = localQueryResults[0];
    const circlesGardenLocalResult = localQueryResults[1];

    const allProfilesMap: SafeProfileMap = {};
    Object.entries(circlesGardenLocalResult).forEach(entry => {
      allProfilesMap[entry[0]] = entry[1];
    });
    Object.entries(circlesLandProfilesResult).forEach(entry => {
      allProfilesMap[entry[0]] = entry[1];
    });

    if (allProfilesMap["0x0000000000000000000000000000000000000000"]) {
      allProfilesMap["0x0000000000000000000000000000000000000000"] = {
        id: 0,
        firstName: "Circles",
        lastName: "Land",
        avatarUrl: "https://dev.circles.land/logos/circles.png"
      };
    }

    const nonLocalProfileMap: SafeProfileMap = {};
    lowercaseAddresses
      .filter(addr => !allProfilesMap[addr])
      .forEach(addr => {
        nonLocalProfileMap[addr] = null;
      });

    const circlesGardenRemoteResult = await this.queryCirclesGardenRemote(prisma, Object.keys(nonLocalProfileMap));
    Object.entries(circlesGardenRemoteResult).forEach(entry => {
      allProfilesMap[entry[0]] = entry[1];
      nonLocalProfileMap[entry[0]] = entry[1];
    });

    const nonLocal = Object.keys(nonLocalProfileMap).filter(o => allProfilesMap[o]);
    const notFound = Object.keys(nonLocalProfileMap).filter(o => !allProfilesMap[o]);

    const nonLocalProfiles = nonLocal.map(o => nonLocalProfileMap[o]);
    const notFoundProfiles = notFound.map(o => {
      return <any>{
        circlesAddress: o,
        name: o,
        avatarUrl: null
      }
    });

    // Persist the non-local results in the api-db
    await prisma.externalProfiles.createMany({
      data: nonLocalProfiles.concat(notFoundProfiles)
        .map(o => {
            if (!o || !o.circlesAddress)
              throw new Error(`Invalid state`);

            return {
              circlesAddress: o.circlesAddress,
              name: o.firstName ?? o.circlesAddress,
              avatarUrl: o.avatarUrl ?? null
            };
          }
        ),
      skipDuplicates: true
    });

    return allProfilesMap;
  }
}