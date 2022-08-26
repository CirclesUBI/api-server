import {QueryGetStringByMaxVersionArgs} from "../../types";
import {Context} from "../../context";
import {Environment} from "../../environment";

export const getStringByMaxVersion =async (parent: any, args: QueryGetStringByMaxVersionArgs, context: Context) => {
  const queryResult = await Environment.pgReadWriteApiDb.query(`
    select * 
    from i18n 
    where lang = $1 
        and key = $2 
        and version = (
            select max(version) 
            from i18n
            where lang = $1 
                and key = $2);
    `,
    [args.lang, args.key]);
  if (queryResult.rows?.length > 0) {
    return queryResult.rows[0];
  } else {
    return null;
  }
}
