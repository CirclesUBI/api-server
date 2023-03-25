import {Environment} from "../environment";

export class NonceCache {
    async increment(address: string, cacheTtlInSeconds: number): Promise<number | undefined> {
        const client = await Environment.pgReadWriteApiDb.connect();
        try {
            await client.query('BEGIN');
            const result = await client.query(
                'SELECT nonce, cache_ttl FROM nonce_cache WHERE address = $1 FOR UPDATE',
                [address.toLowerCase()]
            );

            const {nonce, cache_ttl} = result.rows.length > 0
             ? result.rows[0]
             : {nonce: undefined, cache_ttl: undefined};

            if (!nonce || cache_ttl < Date.now()) {
                await client.query('COMMIT');
                return undefined;
            }

            const nextNonce = nonce + 1;
            await client.query(
                'UPDATE nonce_cache SET nonce = $1, cache_ttl = $2 WHERE address = $3',
                [nextNonce, Date.now() + cacheTtlInSeconds * 1000, address.toLowerCase()]
            );
            await client.query('COMMIT');
            return nextNonce;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async set(address: string, nonce: number, cacheTtlInSeconds: number): Promise<void> {
        const client = await Environment.pgReadWriteApiDb.connect();
        try {
            await client.query(
                `
                INSERT INTO nonce_cache (address, nonce, cache_ttl) 
                VALUES ($1, $2, $3) 
                ON CONFLICT (address) 
                DO UPDATE SET nonce = EXCLUDED.nonce, cache_ttl = EXCLUDED.cache_ttl`,
                [address.toLowerCase(), nonce, Date.now() + cacheTtlInSeconds * 1000]
            );
        } finally {
            client.release();
        }
    }

    async clearOrphaned(): Promise<void> {
        const client = await Environment.pgReadWriteApiDb.connect();
        try {
            await client.query(
                'DELETE FROM nonce_cache WHERE cache_ttl < $1',
                [Date.now()]
            );
        } finally {
            client.release();
        }
    }

    async getLongestTtl(): Promise<number> {
        const client = await Environment.pgReadWriteApiDb.connect();
        try {
            const result = await client.query(
                'SELECT MAX(cache_ttl) FROM nonce_cache'
            );
            return result.rows[0].max;
        } finally {
            client.release();
        }
    }
}
