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
          "needsUpdate",
          lang,
          key, 
          "createdBy", 
          version, 
          value
      ) values (
          false,
          $1,
          $2, 
          $3, 
          (select max(version) + 1 
          from i18n 
          where key=$2 and lang=$1),
          $4) returning lang, key, "createdBy", version, value, "needsUpdate";
      `,
      [args.lang, args.key, createdBy, args.value]);

      const newEntry = queryResult.rows[0];

      await Environment.pgReadWriteApiDb.query(
        `
        update i18n 
          set "needsUpdate" = false
            where lang = $1
            and key = $2;
        `,
        [args.lang, args.key]
      );

      if (args.lang?.startsWith("en")) {
        await Environment.pgReadWriteApiDb.query(
          `
          update i18n 
            set "needsUpdate" = true
              where lang != 'en'
              and key = $1;
          `,
          [args.key]
        );
      }
      
      return newEntry;
  }
}
