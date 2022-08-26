import {MutationUpdateValueArgs} from "../../types";
import {Context} from "../../context";
import {isBILMember} from "../../utils/canAccess";
import {Environment} from "../../environment";

export const updatei18nValue = async (parent: any, args: MutationUpdateValueArgs, context: Context) => {
  let callerInfo = await context.callerInfo;
  let isBilMember = await isBILMember(callerInfo?.profile?.circlesAddress);
  if (!isBilMember) {
    throw new Error(`You need to be a member of Basic Income Lab to edit the content.`)
  } else {
    let createdBy = callerInfo?.profile?.circlesAddress
    const queryResult = await Environment.pgReadWriteApiDb.query(`
      insert into i18n (
          lang,
          key, 
          "createdBy", 
          version, 
          value
      ) values (
          $1,
          $2, 
          $3, 
          (select max(version) + 1 
          from i18n 
          where key=$2 and lang=$1),
          $4) returning lang, key, "createdBy", version, value;
      `,
      [args.lang, args.key, createdBy, args.value]);
    return queryResult.rows[0]
  }
}
