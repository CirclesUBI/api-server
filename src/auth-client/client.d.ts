export declare class Client {
    private readonly _issuer;
    private readonly _appId;
    private static _cacheLookupCounter;
    private static readonly _maxCacheAgeInMs;
    private static readonly _cacheCleanupAfterXLookups;
    private static readonly _keyCache;
    private static getKey;
    constructor(appId: string, issuer: string);
    verify(jwt: string): Promise<any>;
}
//# sourceMappingURL=client.d.ts.map