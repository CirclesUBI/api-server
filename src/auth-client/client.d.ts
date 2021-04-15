export declare class Client {
    private readonly _issuer;
    private readonly _appId;
    constructor(appId: string, issuer: string);
    verify(jwt: string): Promise<any>;
}
//# sourceMappingURL=client.d.ts.map