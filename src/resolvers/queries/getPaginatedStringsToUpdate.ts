import { Context } from "../../context";
import { Environment } from "../../environment";
import { QueryGetPaginatedStringsToUpdateArgs } from "../../types";

export const getPaginatedStringsToUpdate = async (parent: any, args: QueryGetPaginatedStringsToUpdateArgs, context: Context) => {
  const queryResult = await Environment.pgReadWriteApiDb.query(`
  select key || lang as pagination_key, lang, key, version, value 
  from "latestValues" 
  where (key || lang) > $1 and key ^@ $2 and lang ^@ $3 and value ilike $4 and "needsUpdate" = true
  order by key || lang limit 20; 
  `,
    [args.pagination_key, args.key, args.lang, args.value]);
  return queryResult.rows
}