import {QueryGetOlderVersionsByKeyAndLangArgs} from "../../types";
import {Context} from "../../context";
import {Environment} from "../../environment";

export const getOlderVersionsByKeyAndLang =async (parent: any, args: QueryGetOlderVersionsByKeyAndLangArgs, context: Context) => {
  const queryResult = await Environment.pgReadWriteApiDb.query(
    `
    select * 
      from i18n
        where lang = $1
        and key = $2
      order by key;
    `,
    [args.lang, args.key]
  );
  return queryResult.rows;
}
