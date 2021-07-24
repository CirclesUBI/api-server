#!/bin/bash
sedArgument="s/REPLACE_ME_WITH_THE_CONNECTION_STRING/${DO_PGSQL_CONNECTIONSTRING//\//\\/}/g"
cp -f schema_template.prisma schema.prisma
sed -i "${sedArgument}" schema.prisma
npx prisma --version
npx prisma db push