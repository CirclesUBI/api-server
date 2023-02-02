import { Context } from "../../context";
import { Environment } from "../../environment";
import { MutationSetStringUpdateStateArgs } from "../../types";
import { isTranslator } from "../../utils/canAccess";

export const setStringUpdateState = async (parent: any, args: MutationSetStringUpdateStateArgs, context: Context) => {
  let callerInfo = await context.callerInfo;
  let canTranslate = await isTranslator(callerInfo?.profile?.circlesAddress);
  if (!canTranslate) {
    throw new Error(`You need to be a member of the Translator Orga to add or edit Translations.`);
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
};
