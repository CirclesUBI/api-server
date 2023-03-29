-- migrate:up
CREATE TABLE nonce_cache (
     address TEXT PRIMARY KEY,
     nonce INTEGER,
     cache_ttl BIGINT
);

-- migrate:down
