# o-platform/api-server

## Api-Schema:
```graphql
type Query
{
    server : Server
    profiles(query:QueryProfileInput!) : [Profile!]!
    circlesWallets(query:QueryCirclesWalletInput!):[CirclesWallet!]!
}

type Mutation
{
    exchangeToken : ExchangeTokenResponse!
    upsertProfile(data:UpdateProfileInput!):Profile!
    addCirclesWallet(data:AddCirclesWalletInput!) : CirclesWallet!
    addCirclesToken(data:AddCirclesTokenInput!) : CirclesToken!
    addCirclesTrustRelation(data:AddCirclesTrustRelationInput!) : CirclesTrustRelation!
    addCirclesTokenTransfer(data:AddCirclesTokenTransferInput!) : CirclesTokenTransfer!
}
```
## Database:
```shell
# Create a new directory as working space
mkdir omo-central-server-db
cd omo-central-server-db

# Get the schema
wget https://raw.githubusercontent.com/circlesland/api-server/master/schema_template.prisma

# Insert your connection string
yourConnectionString="[your connection string goes here]"
sedArgument="s/REPLACE_ME_WITH_THE_CONNECTION_STRING/${yourConnectionString//\//\\/}/g"
sed -i "${sedArgument}" schema_template.prisma

# Install prisma cli
npm i prisma

# Deploy to your server using prisma cli
npx --no-install prisma db push --schema schema_template.prisma  --preview-feature
```
## Environment variables:
```shell
EXTERNAL_DOMAIN='my-domain.com' # Is used for the 'domain' attribute of the session cookie 
DEBUG=''                        # Optional: If set to any value, the cookie will be sent via non-https connections
DB_CONNECTION_STRING=''         # A prisma compatible db connection string
APP_ID=''                       # The app id of this service as registered at the "o-platform/auth-server"
ACCEPTED_ISSUER                 # The accepted issuer for jwt tokens (usually the url of o-platform/auth-server)
SESSION_LIIFETIME               # Optional: The lifetime of the session (default: 30 days)
```