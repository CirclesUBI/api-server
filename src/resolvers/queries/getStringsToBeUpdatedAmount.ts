import { Context } from "../../context";
import { Environment } from "../../environment";
import { QueryGetStringsToBeUpdatedAmountArgs } from "../../types";

export const getStringsToBeUpdatedAmount = async (parent: any, args: QueryGetStringsToBeUpdatedAmountArgs, context: Context) => {
  const queryResult = await Environment.pgReadWriteApiDb.query(`
  select count(*) 
    from "latestValues"
      where "needsUpdate" = true
      and lang = $1
      and key ^@ $2;
  `,
    [args.lang, args.key]);
    return queryResult.rows[0].count
}