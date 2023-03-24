import Web3 from "web3";
import {Context} from "../context";
import {NonceCache} from "./nonceCache";
import {RpcGateway} from "../circles/rpcGateway";
import {GnosisSafeProxy} from "../circles/gnosisSafeProxy";

export class NonceManager {
    private web3: Web3 | undefined = undefined
    private readonly cache: NonceCache;

    private longestCacheTtl: number;
    private currentCacheClearTimeout: NodeJS.Timeout | null = null;
    private callCount = 0;

    constructor() {
        this.cache = new NonceCache();
        this.longestCacheTtl = 0;
    }

    /**
     * Returns the next nonce for the given address. If the address is not given, the address of the session is used.
     * @param context
     * @param signature
     * @param cacheTtlInSeconds
     * @param address If you want to get a nonce for a safe, you need to pass the address of the safe here.
     */
    async getNonce(context: Context, signature: string, cacheTtlInSeconds: number, address?: string): Promise<number> {
        if (!context.session?.id) {
            throw new Error("No session id on context");
        }
        if (!this.web3) {
            this.web3 = await RpcGateway.get()
        }

        if (this.callCount++ % 1000 === 0) {
            await this.cache.clearOrphaned();
            this.longestCacheTtl = await this.cache.getLongestTtl();
        }

        const sessionAddress = this.web3.eth.accounts.recover(
            `${context.session.id}`,
            signature
        );

        if (sessionAddress.toLowerCase() !== context.session.ethAddress?.toLowerCase()) {
            throw new Error(`The signature doesn't match the ethAddress of the session (sessionAddress: ${context.session.ethAddress?.toLowerCase()}, signerAddress: ${sessionAddress.toLowerCase()}).`);
        }

        let safeProxy: GnosisSafeProxy | undefined = undefined;

        if (address) {
            safeProxy = new GnosisSafeProxy(this.web3, address);
            const safeOwners = await safeProxy.getOwners();
            if (!safeOwners.map(o => o.toLowerCase()).includes(sessionAddress.toLowerCase())) {
                throw new Error(`The ethAddress of the current session is not an owner of the safe at ${address}.`);
            }
        } else {
            address = sessionAddress;
        }

        let nextNonce = await this.cache.increment(address, cacheTtlInSeconds);
        if (nextNonce) {
            context.log(`Nonce ${nextNonce} was retrieved from cache.`);
            return nextNonce;
        }

        const currentNonce = safeProxy
            ? await safeProxy.getNonce()
            : await this.web3.eth.getTransactionCount(address);

        nextNonce = currentNonce + 1;

        context.log(`${address} current nonce is: ${currentNonce}`);

        await this.cache.set(address, nextNonce, cacheTtlInSeconds);
        context.log(`Wrote nextNonce ${nextNonce} to the cache.`);

        if (cacheTtlInSeconds > this.longestCacheTtl) {
            this.longestCacheTtl = cacheTtlInSeconds;
        }

        if (this.currentCacheClearTimeout) {
            clearTimeout(this.currentCacheClearTimeout);
        }

        this.currentCacheClearTimeout = setTimeout(async () => {
            await this.cache.clearOrphaned();
            this.currentCacheClearTimeout = null;
        }, this.longestCacheTtl * 1000);

        return nextNonce;
    }
}
