import { Context } from "../../context";
import { Environment } from "../../environment";
import { MutationCreateNewStringAndKeyArgs } from "../../types";
import { isBILMember } from "../../utils/canAccess";

export const createNewStringAndKey = async (parent: any, args: MutationCreateNewStringAndKeyArgs, context: Context) => {
  let callerInfo = await context.callerInfo;
  let isBilMember = await isBILMember(callerInfo?.profile?.circlesAddress);
  if (!isBilMember) {
    throw new Error(`Your need to be a member of Basic Income Lab to edit the content.`);
  } else {
    let createdBy = callerInfo?.profile?.circlesAddress;
    const queryResult = await Environment.pgReadWriteApiDb.query(
      `
    insert into i18n (
        lang,
        key,
        "createdBy",
        version,
        "needsUpdate",
        value
      ) values (
        $1,
        $2,
        $3,
        1,
        false,
        $4) returning lang, key, "createdBy", version, value, "needsUpdate";
    `,
      [args.lang, args.key, createdBy, args.value]
    );

    const newEntry = queryResult.rows[0];

    await Environment.pgReadWriteApiDb.query(
      `
      update i18n 
        set "needsUpdate" = true
          where key = $1;
      `,
      [args.key]
    );
    await Environment.pgReadWriteApiDb.query(
      `
      update i18n 
        set "needsUpdate" = false
          where lang = 'en'
          and key = $1;
      `,
      [args.key]
    );
    
    return newEntry;
  }
}