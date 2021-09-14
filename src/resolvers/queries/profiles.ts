import {Profile} from "../../types";
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

export class RequestManagerRequest {
  private _requestManager:RequestManager;

  constructor(requestManager:RequestManager) {
    this._requestManager = requestManager;
  }

  add(safeAddress:string) {
    const existingRequest = this._requestManager.pendingRequests[safeAddress];
    if (existingRequest)
      return existingRequest;
  }

  async execute() {
  }
}

export class RequestManager {
  pendingRequests: {[safeAddress:string]: RequestManagerRequest} = {};

  create() : RequestManagerRequest {
    return new RequestManagerRequest(this);
  }
}

export function profilesBySafeAddress(prisma:PrismaClient) {
  return async (parent: any, args: {safeAddresses:string[]}, context: Context) => {
    let ownProfileId:number|null = null;
    if (context.sessionId) {
      const session = await context.verifySession();
      ownProfileId = session.profileId;
    }

    const cacheMisses:ProfilesBySafeAddressLookup = {};
    const results: Profile[] = [];

    args.safeAddresses.forEach(o => {
      const safeAddress = o.toLowerCase();
      const cacheHit = profilesBySafeAddressCache.get(safeAddress);
      if (cacheHit) {
        results.push(cacheHit);
      } else {
        cacheMisses[safeAddress] = null;
      }
    });

    const missingProfiles = Object.keys(cacheMisses);
    if (missingProfiles.length == 0) {
      return results.map(o => {
        return {
          ...o,
          newsletter: ownProfileId == o.id ? o.newsletter : undefined,
        }
      });
    }

    const rows = await prisma.profile.findMany({
      where: {
        circlesAddress: {
          in: Object.keys(cacheMisses)
        }
      }
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

export function profilesById(prisma:PrismaClient) {
  return async (parent: any, args: {ids:number[]}, context: Context) => {
    let ownProfileId:number|null = null;
    if (context.sessionId) {
      const session = await context.verifySession();
      ownProfileId = session.profileId;
    }
    const rows = await prisma.profile.findMany({
      where: {
        id: {
          in: args.ids
        }
      }
    });

    return rows.map(o => {
      return {
        ...o,
        newsletter: ownProfileId == o.id ? o.newsletter : undefined,
      }
    });
  };
}

export function myProfile(prisma:PrismaClient) {
  return async (parent: any, args: any, context: Context) => {
    let ownProfileId:number|null = null;
    if (context.sessionId) {
      const session = await context.verifySession();
      ownProfileId = session.profileId;
    }
    if (!ownProfileId) {
      return null;
    }
    const rows = await prisma.profile.findMany({
      where: {
        id: ownProfileId
      }
    });
    if (rows.length != 1) {
      return null;
    }
    return rows[0];
  };
}

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

/*
export async function whereProfile(args: RequireFields<QueryProfilesArgs, never>, ownProfileId: number | null, context: Context) {
  const q: { [key: string]: any } = {};
  if (!args.query) {
    throw new Error(`No query fields have been specified`);
  }
  Object.keys(args.query ?? {})
    .map(key => {
      console.log(key);
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
}*/