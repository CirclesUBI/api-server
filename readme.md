# o-platform/api-server
A nodejs/postgres service that provides a GraphQL endpoint for basic services around the Circles contracts.

It provides the following services:
* **Invite System**  
An invitation code is given from person to person and transfers a small amount of xDai when redeemed. It's used to get new users up and running so that they can deploy their own gnosis safe, register at the circles hub, etc..
* **User management**  
Stores user profiles and addresses in a postgres database. Allows any owner of a gnosis safe (verified by signature) to create and maintain a profile that's linked to this safe.
* **Organisation management**  
Organisations are gnosis safes (same as in _User Management_), but they can be (are) used by more than one person and don't receive UBI. An organisation can have _Members_ who are not safe owners. Members can f.e. act in the name of the organisation in a chat. Members can also maintain the offers and purchases in the _Marketplace_.  
* **Marketplace**  
A general marketplace where _Organisations_ can offer products and services for Circles. It supports a common cart and creates separate invoices for each seller. When a payment was found in the [blockchain indexer db](https://github.com/circlesland/blockchain-indexer) it generates a pickup code for the corresponding purchase/sale. The seller can verify the pickup-code and then hands out the product.
* **Chat**  
A graphql-subscription/postgres based unencrypted chat. Is thought for person to person and marketplace communication. Has to be replaced with something like Matrix in the short term and should be fully p2p in the long term.
* **Chain queries (balances, transactions, etc..)**  
The service accesses the [blockchain indexer's](https://github.com/circlesland/blockchain-indexer/blob/dev/CirclesLand.BlockchainIndexer/Schema.sql) database to allow frontend-queries for Circles balances, trust relations and transactions.
* **Event stream and aggregates for each user**  
All the above produces events which can be accessed either sequentially or aggregated with a graphql query.

### Requirements
* [Postgresql 11+](https://www.postgresql.org/)
* [NodeJS 16.11](https://nodejs.org/download/release/v16.11.1/) (use [node version manager](https://github.com/nvm-sh/nvm) to switch between versions)
* [git](https://git-scm.com/downloads)

### Runtime dependencies
To properly run this service all following dependencies must be met
* The url to a [json-rpc endpoint](https://www.jsonrpc.org/specification) of a synced node or a local ganache chain
* The url to a running [blockchain indexer](https://github.com/circlesland/blockchain-indexer) websocket endpoint
* The (readonly) connection string to a [blockchain indexer's](https://github.com/circlesland/blockchain-indexer) database
* The (readonly) connection string to a [utility-db](https://github.com/circlesland/utility_db/pkgs/container/utility_db) database
* The (rw) connection string to a running api-db (see below)
* The address of a 'OPERATOR_ORGANISATION' [gnosis safe](https://github.com/gnosis/safe-contracts)
* The address of a 'INVITATION_FUNDS' [gnosis safe](https://github.com/gnosis/safe-contracts), and it's key 

## Getting started
_If you don't have a postgres installation at hand, start a container:_
```shell
# Start a current postgres version with user 'postgres' and password 'postgres'. 
# Expose port 5432 so that the database can be accessed from the host.
sudo docker run --rm --name postgres -p "5432:5432" -e POSTGRES_PASSWORD=postgres postgres
```
### 1) Clone the repository
1. Clone the repository
```shell
git clone https://github.com/circlesland/api-server.git
```
2. Change the directory and branch
```shell
cd api-server
git checkout dev
```
### 2) Create the api-db and deploy the schema
1. Create a new 'api' database on your postgres server
```shell
psql -U postgres -h localhost -c 'CREATE DATABASE api;'
```

2. Replace the connection string placeholder in the prisma-file with an actual connection string to the newly created api-db
```shell
PSQL_CONNECTION_STRING="postgresql://postgres:postgres@localhost:5432/api"
sedArgument="s/REPLACE_ME_WITH_THE_CONNECTION_STRING/${PSQL_CONNECTION_STRING//\//\\/}/g"
cp -f src/api-db/schema_template.prisma src/api-db/schema.prisma
sed -i "${sedArgument}" src/api-db/schema.prisma
```

3. Deploy the schema
```shell
npx prisma@2.30.2 db push --schema=src/api-db/schema.prisma
```

### 3) Build
Just run the build script:
```shell
./build.sh
```

### 4) Configure (environment variables)

```shell
# Delay the start for 0 seconds (only useful as a 'grace-period' to wait for dependencies)
DELAY_START=0
# Is used f.e. when external URLs are generated
EXTERNAL_DOMAIN=localhost
# The read and write connection string to the api-db.
CONNECTION_STRING_RW=postgresql://postgres:postgres@api-db:5432/api
# The readonly connection string to the api-db (can be the same as the RW connection if there are no readonly replicas)
CONNECTION_STRING_RO=postgresql://postgres:postgres@api-db:5432/api
# To be deprecated: only used for JWTs to authorize picture uploads at the moment.
APP_ID=ultralocal.circles.land
# To be deprecated: was used for e-mail based authentication.
ACCEPTED_ISSUER=dev.auth.circles.name
# A semicolon separated list of allowed CORS origins.
CORS_ORIGNS=http://localhost:5000
# Influences how the session cookie is generated:
# > DEBUG ? "sameSite: None" : "sameSite: Strict"
# > !DEBUG ? "secure: true"
DEBUG=true
# The connection string to a readonly "utility-db".
# The utility-db contains a list of countries and cities together with their names.
# Data is from http://www.geonames.org/
UTILITY_DB_CONNECTION_STRING=postgresql://postgres:postgres@utility-db:5432/cities
# The readonly connection string to the blockchain-indexer's database.
BLOCKCHAIN_INDEX_DB_CONNECTION_STRING=postgresql://postgres:postgres@blockchain-index-db:5432/blockchain-index
# A URL that points to the blockchain-indexers websocket endpoint.
# The websocket connection emits the hashes of each new indexed event.
BLOCKCHAIN_INDEX_WS_URL=ws://blockchain-index:7868
# Configuration for a S3 compatible storage
DIGITALOCEAN_SPACES_ENDPOINT=http://abc
DIGITALOCEAN_SPACES_KEY=123
DIGITALOCEAN_SPACES_SECRET=123
# The safe-address of the Organisation that operates the instance
OPERATOR_ORGANISATION_ADDRESS=0x..
# The safe that pays for the invitations of the users
INVITATION_FUNDS_SAFE_ADDRESS=0x..
INVITATION_FUNDS_SAFE_KEY=0x..
# A ethereum-compatible json rpc gateway  
RPC_GATEWAY_URL=http://ganache-cli:8545
# If 'true' some default data is inserted after the first profile creation.
IS_AUTOMATED_TEST=true
```

### Run
Concatenate the environment variables and separate them with a space the run node with dist/main.js:
```shell
DELAY_START=0 EXTERNAL_DOMAIN=localhost ... node dist/main.js
```
The service will check its dependencies on startup and will fail to start if they're not met.  
The checks can be found at the beginning of the [environment.ts](https://github.com/circlesland/api-server/blob/dev/src/environment.ts) file.

When the service is running it provides a http-endpoint on port 8989:  
http://localhost:8989/
