#!/bin/bash

echo "Installing dependencies .."
npm i

echo "Building 'omo-central-server' .."
rm -r -f dist
npm run graphql-generate
npx --no-install prisma generate --schema=src/api-db/schema_template.prisma || exit
mkdir dist

mkdir dist/auth-client
cp -f src/auth-client/* dist/auth-client

mkdir dist/api-db
cp -r -f src/api-db/* dist/api-db

mkdir dist/static
cp src/logo.png dist/static/logo.png

npx --no-install tsc || exit

