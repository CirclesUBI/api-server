#!/bin/bash

echo "Installing 'api-server' dependencies .."
npm i

echo "Building 'api-server' .."
echo " * removing ./dist .."
rm -r -f dist
echo " * generating code from graphql schema .."
npm run graphql-generate
echo " * generating code from prisma schema .."
npx --no-install prisma generate --schema=src/api-db/schema_template.prisma || exit

echo " * creating ./dist directory .."
mkdir dist

echo " * copy to ./dist/api-db .."
mkdir dist/api-db
cp -r -f src/api-db/* dist/api-db

echo " * copy to ./dist/static .."
mkdir dist/static
cp src/logo.png dist/static/logo.png

echo " * compiling typescript .."
npx --no-install tsc || exit
