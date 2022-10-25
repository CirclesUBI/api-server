import { Context } from "../../context";
import { Environment } from "../../environment";
import { MutationSetStringUpdateStateArgs } from "../../types";
import { isBILMember } from "../../utils/canAccess";

export const setStringUpdateState = async (parent: any, args: MutationSetStringUpdateStateArgs, context: Context) => {
  let callerInfo = await context.callerInfo;
  let isBilMember = await isBILMember(callerInfo?.profile?.circlesAddress);
  if (!isBilMember) {
    throw new Error(`Your need to be a member of Basic Income Lab to edit the content.`);
  } else {
    let queryResult = await Environment.pgReadWriteApiDb.query(
      `
    update i18n 
      set "needsUpdate" = true
        where lang != 'en'
        and key = $1;
    `,
      [args.key]
    );
    return queryResult.rows[0];
  }
}