import { MutationAddNewLangArgs } from "../../types";
import { Context } from "../../context";
import { isTranslator } from "../../utils/canAccess";
import { Environment } from "../../environment";

export const addNewLang = async (parent: any, args: MutationAddNewLangArgs, context: Context) => {
  const callerInfo = await context.callerInfo;
  const canTranslate = await isTranslator(callerInfo?.profile?.circlesAddress);
  if (!canTranslate) {
    throw new Error(`You need to be a member of the Translator Orga to add or edit Translations.`);
  } else {
    const queryResult = await Environment.pgReadWriteApiDb.query(
      `
      insert into i18n (lang, key, "createdBy", version, value)
          select $1 as lang
              , i18n.key
              , i18n."createdBy"
              , 1 as version
              , i18n.value
          from i18n
          join (
        select lang, key, max(version) as version
              from i18n
              where lang = $2
              group by lang, key
          ) max_versions on i18n.key = max_versions.key
                      and i18n.lang = max_versions.lang
                      and i18n.version = max_versions.version;
      `,
      [args.langToCreate, args.langToCopyFrom]
    );
    return queryResult.rowCount;
  }
};
