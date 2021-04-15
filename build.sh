#!/bin/bash

echo "Installing dependencies .."
npm i

echo "Building 'omo-central-server' .."
rm -r -f dist
npm run graphql-generate
npx --no-install prisma generate --schema=./schema_template.prisma || exit
mkdir dist
mkdir dist/auth-client
cp -f src/auth-client/* dist/auth-client
npx --no-install tsc || exit
