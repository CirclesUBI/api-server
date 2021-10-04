import {Contact, Profile} from "../../types";
import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";
import LRU from "lru-cache";
import {RpcGateway} from "../../rpcGateway";
import fetch from "cross-fetch";
import {contacts} from "./contacts";

export type ProfilesBySafeAddressLookup = {
  [safeAddress: string]: Profile|null
};

const profilesBySafeAddressCache = new LRU<string, Profile|null>({
  max: 20000,
  maxAge: 1000 * 60 * 60 * 24,
  // TODO: Remove updated objects from cache (listen for new transactions)
});

export function profilesBySafeAddress(prisma:PrismaClient, loadContacts: boolean = false) {
  return async (parent: any, args: {safeAddresses:string[]}, context: Context) => {
    let ownProfileId:number|null = null;
    let ownProfile:Profile|null = null;
    if (context.sessionId) {
      const session = await context.verifySession();
      ownProfileId = session.profileId;
      if (!ownProfileId)
        throw new Error(`You must have a complete profile to use this function`);
      ownProfile = await prisma.profile.findUnique({where: {id: ownProfileId}});
      if (!ownProfile)
        throw new Error(`You must have a complete profile to use this function`);
      if (!ownProfile.circlesAddress)
        throw new Error(`You must have a connected safe to use this function`)
    } else {
      throw new Error(`You must have a valid session to use this function`)
    }

    const cacheMisses:ProfilesBySafeAddressLookup = {};
    const results: Profile[] = [];

    args.safeAddresses.forEach(o => {
      const safeAddress = o.toLowerCase();
      const cacheHit = profilesBySafeAddressCache.get(safeAddress);
      if (cacheHit !== undefined) {
        if (cacheHit != null)
          results.push(cacheHit);
      } else {
        cacheMisses[safeAddress] = null;
      }
    });

    let missingProfiles = Object.keys(cacheMisses);
    if (missingProfiles.length > 0) {
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

      missingProfiles = Object.keys(cacheMisses);
      if (missingProfiles.length > 0) {
        try {
          const circlesGardenProfiles = await findCirclesGardenProfiles(missingProfiles);
          circlesGardenProfiles.filter(o => !!o).forEach(o => {
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
    }

    const contactsByAddress: { [address: string]: Contact } = {};
    if (loadContacts) {
      const contactsResolver = contacts(prisma, false);
      const _contacts = await contactsResolver(null, {safeAddress: ownProfile.circlesAddress}, context);
      _contacts.forEach(o => contactsByAddress[o.contactAddress] = o);
    }

    return results.map(o => {
      return {
        ...o,
        newsletter: ownProfileId == o.id ? o.newsletter : undefined,
        trustsYou: o.circlesAddress ? contactsByAddress[o.circlesAddress]?.trustsYou : undefined,
        youTrust: o.circlesAddress ? contactsByAddress[o.circlesAddress]?.youTrust : undefined,
        lastEvent: o.circlesAddress ? contactsByAddress[o.circlesAddress]?.lastEvent : undefined
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

type WaitingCirclesGardenProfileRequest = {
  safeAddress:string,
  timeoutAt: Date,
  startedAt: Date|null,
  finishedAt: Date|null,
  waitingPromises: {
    resolve: (value: (Profile | PromiseLike<Profile> | null)) => void,
    reject: (reason?: any) => void
  }[]
};

let intervalHandle:any = null;
const requestsBySafeAddress:{[safeAddress:string]:WaitingCirclesGardenProfileRequest} = {};

async function flush() {
  Object.entries(requestsBySafeAddress).filter(o => o[1].finishedAt).forEach(o => {
    delete requestsBySafeAddress[o[0]];
  })
  const unprocessed = Object.entries(requestsBySafeAddress)
    .filter(o => !o[1].startedAt)
    .map(o => o[1]);

  if (unprocessed.length == 0){
    return;
  }

  const now = new Date();
  const batch: WaitingCirclesGardenProfileRequest[] = [];

  unprocessed.filter(o => !o.finishedAt).forEach(request => {
    if (request.timeoutAt.getTime() < now.getTime()) {
      request.waitingPromises.forEach(waitingPromise => {
        const timeoutError = new Error(`The request timed out at ${request.timeoutAt}`);
        waitingPromise.reject(timeoutError);
      });
      return;
    }
    if (batch.length > 50) {
      return;
    }
    batch.push(request);
    request.startedAt = now;
  });

  if (batch.length == 0) {
    return;
  }

  const query = batch.reduce((p, c) => p + `address[]=${RpcGateway.get().utils.toChecksumAddress(c.safeAddress)}&`, "");
  const requestUrl = `https://api.circles.garden/api/users/?${query}`;

  console.log(requestUrl);

  fetch(requestUrl)
    .then(result => {
      return result.json();
    })
    .then(json => {
      return json.data.map((o:any) => {
          return <Profile>{
            id: 0,
            firstName: o.username,
            lastName: "",
            circlesAddress: o.safeAddress.toLowerCase(),
            avatarUrl: o.avatarUrl
          }
        })
        ?? [];
    })
    .then((profiles:Profile[]) => {
      const profilesBySafeAddress: {[safeAddress:string]:Profile} = {};
      profiles.filter(o => o.circlesAddress).forEach(o => profilesBySafeAddress[<string>o.circlesAddress] = o);

      const now = new Date();
      batch.forEach(o => {
        o.finishedAt = now;
        const result = profilesBySafeAddress[o.safeAddress];
        if (!result) {
          console.log(`Couldn't find a circles.garden profile for safe ${o.safeAddress}`);
          profilesBySafeAddressCache.set(o.safeAddress, null);
          o.waitingPromises.forEach(p => p.resolve(null));
          return;
        }
        o.waitingPromises.forEach(p => p.resolve(result));
      });
    })
    .catch(error => {
      const now = new Date();
      batch.forEach(o => {
        o.finishedAt = now;
        o.waitingPromises.forEach(p => p.reject(error));
      });
    });
}

async function findCirclesGardenProfiles(safeAddresses: string[]) : Promise<Profile[]>  {
  if (safeAddresses.length == 0) {
    return [];
  }

  if (!intervalHandle) {
    intervalHandle = setInterval(() => {
      flush();
    }, 150);
  }

  const results = Promise.all(safeAddresses.map(safeAddress => {
    let pendingRequest:WaitingCirclesGardenProfileRequest|null = requestsBySafeAddress[safeAddress];
    if (pendingRequest?.finishedAt) {
      delete requestsBySafeAddress[safeAddress];
      pendingRequest = null;
    }

    let promiseResolver: {
      resolve: (value: (Profile | PromiseLike<Profile>)) => void,
      reject: (reason?: any) => void
    }|null = null;

    const waitPromise = new Promise<Profile>((resolve, reject) => {
      promiseResolver = {resolve, reject};
    });
    if (!promiseResolver) {
      throw new Error(`!promiseResolver`);
    }

    if (pendingRequest) {
      pendingRequest.waitingPromises.push(promiseResolver);
    } else {
      pendingRequest = {
        waitingPromises: [promiseResolver],
        safeAddress: safeAddress,
        timeoutAt: new Date(Date.now() + 5000),
        startedAt: null,
        finishedAt: null
      }
      requestsBySafeAddress[safeAddress] = pendingRequest;
    }

    return waitPromise;
  }));

  return results;
/*
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
 */
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