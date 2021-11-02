import {Key, open, RootDatabase} from "lmdb-store";
import {Profile, ProfileEvent} from "../../types";
import {Context} from "../../context";
import murmur from "murmurhash-js";
import {Generate} from "../../generate";


export class LmdbWrapper {
  protected readonly _db:RootDatabase;
  protected readonly _hashSeed: number;

  constructor(path:string) {
    this._db =  open({
      path: path,
      compression: true
    });
    const hashSeedKey = "_–*~*-_";
    this._hashSeed = this._db.get(hashSeedKey);
    if (!this._hashSeed) {
      this._hashSeed = Generate.randomInt4();
      this._db.putSync(hashSeedKey, this._hashSeed);
    }
  }

  close() {
    this._db.close();
  }
}

export class LmdbHashTable<TItem> extends LmdbWrapper {
  constructor(path:string) {
    super(path);
  }

  async add(item:TItem) : Promise<number> {
    let eventJson = JSON.stringify(event);
    let contentHash = murmur.murmur3(eventJson, this._hashSeed);
    await this._db.put(contentHash, item);
    return contentHash;
  }

  get(hash:number) : TItem|null {
    return this._db.get(hash);
  }

  clear() {
    this._db.clear();
  }
}

export class LmdbIndex<TKey extends Key> extends LmdbWrapper {
  constructor(path:string) {
    super(path);
  }

  async add(key:TKey, hash:number) {
    await this._db.put(key, hash);
  }

  get(key:TKey) : number|null {
    return this._db.get(key) ?? null;
  }

  async delete(key:TKey) {
    await this._db.remove(key);
  }

  read(startAt: TKey, order:"asc"|"desc", limit: number) {
    const start = this._db.getKeys({
     limit:1
    });
    const r = this._db.getRange({
      start: start,
      reverse: order == "desc",
      limit
    });
    const a = Array.from(r.asArray);
    return a;
  }

  clear() {
    this._db.clear();
  }
}

export class CacheKey {
  readonly _audience:string;
  readonly _subjectAddress:string;
  readonly _type:string;
  readonly _timestamp:number;
  readonly _index:number;

  constructor(keyArray:any[]) {
    this._audience = keyArray[0];
    this._subjectAddress = keyArray[1];
    this._type = keyArray[2];
    this._timestamp = keyArray[3];
    this._index = keyArray[4];
  }

  static create(audience:string, subject:string, type:string, timestamp:number, index?:number) {
    return new CacheKey([
      audience,
      subject,
      type,
      timestamp,
      index ?? 0
    ]);
  }

  toKeyArray() : any[] {
    return [
      this._audience,
      this._subjectAddress,
      this._type,
      this._timestamp,
      this._index
    ];
  }
}

export class EventCache {
  private readonly _db:RootDatabase;
  private _hashSeed: number;

  private _eventStore = new LmdbHashTable("eventStore.lmdb");

  constructor(path:string) {
    this._db =  open({
      path: path,
      compression: true
    });

    const hashSeedKey = "_–*~*-_";
    this._hashSeed = this._db.get(hashSeedKey);
    if (!this._hashSeed) {
      this._hashSeed = Generate.randomInt4();
      this._db.putSync(hashSeedKey, this._hashSeed);
    }
  }

  async store(context:Context, event:ProfileEvent) {
    let eventJson = JSON.stringify(event);
    let contentHash = murmur.murmur3(eventJson, this._hashSeed);

    let callerProfile: Profile|null = null;
    if (context.sessionId) {
      callerProfile = await context.callerProfile;
    }

    const promises:Promise<any>[] = [];

    // Store the key->contentHash association
    if (event.type.startsWith("Crc")) {
      const publicCacheKey = await this.generatePublicCacheKey(event);
      promises.push(this._db.put(publicCacheKey.toKeyArray(), contentHash));
    }
    if (callerProfile && callerProfile.circlesAddress == event.safe_address) {
      const privateCacheKey = await this.generatePrivateCacheKey(context, event);
      promises.push(this._db.put(privateCacheKey.toKeyArray(), contentHash));
    }

    // Store the actual event
    promises.push(this._db.put(["content:murmur3", contentHash], eventJson));

    await Promise.all(promises);
  }

  async read(context:Context, subject:string, type:string, startAt:number, order:"asc"|"desc", limit?:number) {
    let startKey: CacheKey;
    let endKey: CacheKey;

    const now = Date.now();

    if (order == "asc") {
      startKey = CacheKey.create("public", subject, type, 0);
      endKey = CacheKey.create("public", subject, type, now);
    } else {
      startKey = CacheKey.create("public", subject, type, now);
      endKey = CacheKey.create("public", subject, type, 0);
    }

    const range = await this._db.getRange({
      start: startKey.toKeyArray(),
      end: endKey.toKeyArray(),
      reverse: order == "desc",
      limit: limit
    });

    const rangeArr = range.asArray;
    const tMinMax = rangeArr.reduce((p,c) => {
      p.min = Math.min((<any[]>c.key)[3], p.min);
      p.max = Math.max((<any[]>c.key)[3], p.max);
      return p;
    }, {min:0, max:-1});

    if (order == "asc" && tMinMax.min > startAt)
      throw new Error(`Fuck up: order == "asc" && tMinMax.min > startAt`);

    if (order == "desc" && tMinMax.max > startAt)
      throw new Error(`Fuck up: order == "desc" && tMinMax.max > startAt`);

    const hashes = rangeArr.map(o => o.value);
    const entries = hashes.map(o => {
      const val = this._db.get([`content:murmur3`, o])
      const r = JSON.parse(val);
      return r;
    }).filter(o => !!o);
    return entries;
  }

  private generatePublicCacheKey(event:ProfileEvent) : Promise<CacheKey> {
    return Promise.resolve(CacheKey.create(
      "public",
      event.safe_address,
      event.type,
      new Date(event.timestamp).getTime(),
      event.transaction_index ?? 0
    ));
  }

  private async generatePrivateCacheKey(context:Context, event:ProfileEvent) : Promise<CacheKey> {
    const callerProfile = await context.callerProfile;
    if (!callerProfile) {
      throw new Error(`The context must be able to resolve a 'callerProfile' to generate a private cache key.`);
    }
    if (!callerProfile.circlesAddress) {
      throw new Error(`The caller must have a circlesAddress to generate a private cache key.`);
    }
    return CacheKey.create(
      `private:${callerProfile.circlesAddress}`,
      event.safe_address,
      event.type,
      new Date(event.timestamp).getTime(),
      event.transaction_index ?? 0
    );
  }
}