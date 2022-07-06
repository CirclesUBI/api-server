import {MutationConfirmLegalAgeArgs} from "../../types";
import {Context} from "../../context";
import {Environment} from "../../environment";

export const confirmLegalAge = async (parent: any, args: MutationConfirmLegalAgeArgs, context: Context) => {
  const ci = await context.callerInfo;
  if (!ci?.profile) return false;

  if (!ci.profile.confirmedLegalAge || ci.profile.confirmedLegalAge < args.age) {
    await Environment.readWriteApiDb.profile.update({
      where: { id: ci.profile.id },
      data: {
        confirmedLegalAge: args.age,
      },
    });
  }

  return true;
}
