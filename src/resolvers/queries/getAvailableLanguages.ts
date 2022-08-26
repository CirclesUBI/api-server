import {Context} from "../../context";
import {Environment} from "../../environment";

export const getAvailableLanguages = async (parent: any, args: any, context: Context) => {
  const queryResult = await Environment.pgReadWriteApiDb.query(`
    select lang
      from i18n
        group by lang;
    `);
  return queryResult.rows;
}
