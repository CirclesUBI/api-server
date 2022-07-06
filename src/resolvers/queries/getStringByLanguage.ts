import {QueryGetStringByLanguageArgs} from "../../types";
import {Context} from "../../context";
import {Environment} from "../../environment";

export const getStringByLanguage = async (parent: any, args: QueryGetStringByLanguageArgs, context: Context) => {
  const queryResult = await Environment.pgReadWriteApiDb.query(`
    select * 
        from i18n 
        where lang=$1
            and version = (
                select max(version) 
                from i18n
                where lang = $1
            );
    `,
    [args.lang]);
  return queryResult.rows;
}
