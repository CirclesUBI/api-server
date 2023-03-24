import Web3 from "web3";
import {Context} from "../context";
import {NonceCache} from "./nonceCache";

export class NonceManager {
    private readonly web3: Web3;
    private readonly cache: NonceCache;

    private longestCacheTtl: number;
    private currentCacheClearTimeout: NodeJS.Timeout | null = null;
    private callCount = 0;

    constructor(web3: Web3) {
        this.web3 = web3;
        this.cache = new NonceCache();
        this.longestCacheTtl = 0;
    }

    /**
     * When provided with a signed session id which matches the current session id, this method will return the next nonce.
     * The cache is necessary because it should be possible to create multiple transactions at once in the client and
     * then send them all at once to the server. The server should then be able to process them in order without provoking errors.
     * @param context
     * @param signature
     * @param cacheTtlInSeconds
     */
    async getNonce(context: Context, signature:string, cacheTtlInSeconds:number): Promise<number> {
        if (!context.session?.id) {
            throw new Error("No session id on context");
        }

        if (this.callCount++ % 1000 === 0) {
            await this.cache.clearOrphaned();
            this.longestCacheTtl = await this.cache.getLongestTtl();
        }

        const address = this.web3.eth.accounts.recover(
            `${context.session.id}`,
            signature
        );

        let nextNonce = await this.cache.increment(address, cacheTtlInSeconds);
        if (nextNonce) {
            return nextNonce;
        }

        nextNonce = await this.web3.eth.getTransactionCount(address);
        await this.cache.set(address, nextNonce, cacheTtlInSeconds);

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
