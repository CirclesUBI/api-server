import { Environment } from "../../environment";
import { Context } from "../../context";
import { QueryGetAllStringsByMaxVersionAndLangArgs } from "../../types";

export const getAllStringsByMaxVersionAndLang = async (
  parent: any,
  args: QueryGetAllStringsByMaxVersionAndLangArgs,
  context: Context
) => {
  const queryResult = await Environment.pgReadWriteApiDb.query(
    `
    select *
      from "latestValues"
        where lang = $1;
    `,
    [args.lang]
  );
  return queryResult.rows;
};
