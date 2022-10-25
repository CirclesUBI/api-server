import { Context } from "../../context";
import { Environment } from "../../environment";
import { QueryGetPaginatedStringsArgs } from "../../types";

export const getPaginatedStrings = async (parent: any, args: QueryGetPaginatedStringsArgs, context: Context) => {
  const queryResult = await Environment.pgReadWriteApiDb.query(`
  select key || lang as pagination_key, lang, key, version, value 
  from "latestValues" 
  where (key || lang) > $1 and key ^@ $2 and lang ^@ $3 and value ilike $4
  order by key || lang limit 20; 
  `,
    [args.pagination_key, args.key, args.lang, args.value]);
  return queryResult.rows
}