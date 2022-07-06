import {QueryGetAllStringsByLanguageArgs} from "../../types";
import {Context} from "../../context";
import {Environment} from "../../environment";

export const getAllStringsByLanguage =async (parent: any, args: QueryGetAllStringsByLanguageArgs, context: Context) => {
  const queryResult = await Environment.pgReadWriteApiDb.query(`
    select * 
    from i18n
    where lang = $1
    `,
    [args.lang]);
  return queryResult.rows;
}
