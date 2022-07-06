import {Context} from "../../context";
import {Environment} from "../../environment";

export const getAllStrings = async (parent: any, args: any, context: Context) => {
  const queryResult = await Environment.pgReadWriteApiDb.query(`
    select * 
    from i18n
    `);
  return queryResult.rows;
}
