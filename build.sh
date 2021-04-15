#!/bin/bash

echo "Installing dependencies .."
npm i

echo "Building 'omo-central-server' .."
npm run graphql-generate
npx --no-install prisma generate --schema=./schema_template.prisma || exit
npx --no-install tsc || exit
