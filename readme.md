# o-platform/api-server

This service provides a GraphQL server for use by the frontend ([o-platform](https://github.com/circlesland/o-platform)).  

## Getting started:
### Prerequisites
* A [Postgresql 11+](https://www.postgresql.org/) instance
* [NodeJS 16.11](https://nodejs.org/download/release/v16.11.1/) (it's advised to use the [node version manager](https://github.com/nvm-sh/nvm) to switch between versions)
* [git](https://git-scm.com/downloads) 

### Create the api-db and deploy the schema
1. Clone the repository
```shell
git clone https://github.com/circlesland/api-server.git
```
2. Change the directory and branch
```shell
cd api-server
git checkout dev
```
3. Create a new 'api' database on your postgres server


4. Replace the connection string placeholder in the prisma-file with an actual connection string to the newly created api-db



## Database:

```shell
# Create a new directory as working space
mkdir omo-central-server-db
cd omo-central-server-db

# Get the schema manually
wget https://raw.githubusercontent.com/circlesland/api-server/master/schema_template.prisma

# Insert your connection string
yourConnectionString="[your connection string goes here]"
sedArgument="s/REPLACE_ME_WITH_THE_CONNECTION_STRING/${yourConnectionString//\//\\/}/g"
sed -i "${sedArgument}" schema_template.prisma_api_rw

# Install prisma_api_rw cli
npm i prisma_api_rw

# Deploy to your server using prisma_api_rw cli
npx --no-install prisma_api_rw db push --schema schema_template.prisma_api_rw  --preview-feature
```

## Environment variables:

```shell
EXTERNAL_DOMAIN='my-domain.com' # Is used for the 'domain' attribute of the session cookie
DEBUG=''                        # Optional: If set to any value, the cookie will be sent via non-https connections
CONNECTION_STRING_RW=''         # A prisma compatible db connection string (read/write)
CONNECTION_STRING_RO=''         # A prisma compatible db connection string (readonly)
APP_ID=''                       # The app id of this service as registered at the "o-platform/auth-server"
ACCEPTED_ISSUER=''=''           # The accepted issuer for jwt tokens (usually the url of o-platform/auth-server)
SESSION_LIIFETIME=''            # Optional: The lifetime of the session (in seconds, default: 30 days)
CORS_ORIGNS=''                  # A semicolon separated list of allowed cors origin urls
```
