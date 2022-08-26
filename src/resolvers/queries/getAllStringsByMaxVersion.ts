import {Context} from "../../context";
import {Environment} from "../../environment";

export const getAllStringsByMaxVersion = async (parent: any, args: any, context: Context) => {
  const queryResult = await Environment.pgReadWriteApiDb.query(`
    select * 
      from "latestValues";
    `);
  return queryResult.rows;
}
