import {Profile, QueryProfilesArgs, RequireFields} from "../../types";
import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";
import LRU from "lru-cache";
import {RpcGateway} from "../../rpcGateway";
import fetch from "cross-fetch";

export type ProfilesBySafeAddressLookup = {
  [safeAddress: string]: Profile|null
};

const profilesBySafeAddressCache = new LRU<string, Profile|null>({
  max: 20000,
  maxAge: 1000 * 60 * 60 * 24,
});

async function findCirclesGardenProfiles(safeAddresses: string[]) : Promise<Profile[]>  {
  if (safeAddresses.length == 0) {
    return [];
  }

  const batchSize = 50;
  const batches = Math.ceil(safeAddresses.length / batchSize);

  let batchRequests:Promise<Profile[]>[] = [];

  for (let i = 0; i < batches; i++)
  {
    const begin = batchSize * i;
    const end = (batchSize * (i + 1)) - 1 > safeAddresses.length
      ? safeAddresses.length - 1
      : (batchSize * (i + 1)) - 1

    const batch = safeAddresses.slice(begin, end);
    const query = batch.reduce((p, c) => p + `address[]=${RpcGateway.get().utils.toChecksumAddress(c)}&`, "");

    console.log(`Querying the following profiles from the circles garden api (Batch ${i + 1} of ${batches}. Batch size: ${batchSize}):`, query);

    const requestUrl = `https://api.circles.garden/api/users/?${query}`;
    const req = new Promise<Profile[]>((resolve, reject) => {
      fetch(requestUrl)
        .then(result => {
          return result.json();
        })
        .then(json => {
          return json.data.map((o:any) => {
            return <Profile>{
              id: o.id,
              firstName: o.username,
              lastName: "",
              circlesAddress: o.safeAddress.toLowerCase(),
              avatarUrl: o.avatarUrl
            }
          })
          ?? [];
        })
        .then(resolve)
        .catch(reject);
    });

    batchRequests.push(req);
  }

  const responses = await Promise.all(batchRequests);
  return responses.reduce((p, c) => p.concat(c), []);
}

export async function loadAllProfilesBySafeAddress(
  context: Context,
  prisma: PrismaClient,
  safeAddresses: string[])
  : Promise<ProfilesBySafeAddressLookup> {

  const profilesBySafeAddress: ProfilesBySafeAddressLookup = {};
  const cacheMisses: ProfilesBySafeAddressLookup = {};

  safeAddresses.forEach(o => {
    const cacheHit = profilesBySafeAddressCache.get(o);
    if (cacheHit === undefined) {
      cacheMisses[o] = null;
    } else {
      profilesBySafeAddress[o] = cacheHit;
    }
  });

  let cacheMissedSafeAddresses = Object.keys(cacheMisses);
  if (cacheMissedSafeAddresses.length > 0) {
    const profilesResolver = profiles(prisma);
    const allCirclesLandProfiles = await profilesResolver(
      null,
      {
        query: {
          circlesAddress: cacheMissedSafeAddresses
        }
      },
      context);

    allCirclesLandProfiles.forEach(p => {
      const safeAddress = p.circlesAddress?.toLowerCase();
      if (!safeAddress)
        return;

      profilesBySafeAddress[safeAddress] = p;
      profilesBySafeAddressCache.set(safeAddress, p, 1000 * 60);
      delete cacheMisses[safeAddress];
    });

    cacheMissedSafeAddresses = Object.keys(cacheMisses);
    if (cacheMissedSafeAddresses.length > 0) {
      try {
        const result = await findCirclesGardenProfiles(cacheMissedSafeAddresses);
        result.forEach(p => {
          const safeAddress = p.circlesAddress?.toLowerCase();
          if (!safeAddress)
            return;

          profilesBySafeAddress[safeAddress] = p;
          profilesBySafeAddressCache.set(safeAddress, p);
          delete cacheMisses[safeAddress];
        });
      } catch (e) {
        console.warn(`Couldn't load the profile metadata from api.circles.garden`, e);
      }
    }

    cacheMissedSafeAddresses = Object.keys(cacheMisses);
    if (cacheMissedSafeAddresses.length > 0) {
      console.info(`The following safe addresses couldn't be loaded: `, cacheMissedSafeAddresses.join(", "));
      cacheMissedSafeAddresses.forEach(o => profilesBySafeAddressCache.set(o, null, 1000 * 60))
    }
  }
  return profilesBySafeAddress;
}

export async function whereProfile(args: RequireFields<QueryProfilesArgs, never>, ownProfileId: number | null, context: Context) {
  

  const q: { [key: string]: any } = {};
  if (!args.query) {
    throw new Error(`No query fields have been specified`);
  }
  Object.keys(args.query ?? {})
    .map(key => {
      return {
        key: key,
        // @ts-ignore
        value: args.query[key]
      }
    })
    .filter(kv => kv.key !== "id" && kv.value)
    .forEach(kv => {
      q[kv.key] = kv.value;
    });

  if (Object.keys(q).length === 0 && !Array.isArray(args.query.id)) {
    q["id"] = ownProfileId;
  }
  return q;
}

export function profiles(prisma: PrismaClient) {
  return async (parent: any, args: QueryProfilesArgs, context: Context) => {

    const results:Profile[] = [];
    let ownProfileId: number | null = null;
    if (context.sessionId) {
      const session = await context.verifySession();
      ownProfileId = session.profileId;
    }
    const q = await whereProfile(args, ownProfileId, context);
    if (q.circlesAddress) {
      delete q.circlesAddress;
    }
    const cacheMisses:ProfilesBySafeAddressLookup = {};
    if (!q.id && args.query.circlesAddress) {
      args.query.circlesAddress?.forEach(o => {
        const safeAddress = o.toLowerCase();
        const cacheHit = profilesBySafeAddressCache.get(safeAddress);
        if (cacheHit) {
          results.push(cacheHit);
        } else {
          cacheMisses[safeAddress] = null;
        }
      });
    }

    const missingProfiles = Object.keys(cacheMisses);
    if (missingProfiles.length == 0) {
      return results.map(o => {
        return {
          ...o,
          newsletter: ownProfileId == o.id ? o.newsletter : undefined,
        }
      });
    }

    if (!q.id && args.query.id) {
      q.id = args.query.id ? {
        in: args.query.id
      } : undefined;
    }

    const rows = await prisma.profile.findMany({
      where: {
        ...q,
        circlesAddress: args.query.circlesAddress ? {
          in: Object.keys(cacheMisses)
        } : undefined
      },
      take: 100
    });

    rows.forEach(o => {
      results.push(o);
      if (o.circlesAddress) {
        profilesBySafeAddressCache.set(o.circlesAddress, o);
        delete cacheMisses[o.circlesAddress];
      }
    });

    if (missingProfiles.length > 0) {
      try {
        const circlesGardenProfiles = await findCirclesGardenProfiles(missingProfiles);
        circlesGardenProfiles.forEach(o => {
          results.push(o);
          if (o.circlesAddress) {
            profilesBySafeAddressCache.set(o.circlesAddress, o);
            delete cacheMisses[o.circlesAddress];
          }
        });
      } catch (e) {
        console.error(`Couldn't request profiles from circles.garden:`, e);
      }
    }

    return results.map(o => {
      return {
        ...o,
        newsletter: ownProfileId == o.id ? o.newsletter : undefined,
      }
    });
  };
}