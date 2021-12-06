import {CreateTagInput} from "../../types";
import {Context} from "../../context";
import {Environment} from "../../environment";

export function tagTransaction() {
  return async (parent: any, args: { transactionHash: string, tag: CreateTagInput }, context: Context) => {
    const callerInfo = await context.callerInfo;
    if (!callerInfo?.profile) {
      return {
        success: false,
        errorMessage: "You must have a complete profile to use this function."
      }
    }

    // 1. Check if the transaction anchor entry already exists
    let transaction = await Environment.readWriteApiDb.transaction.findUnique({where: {transactionHash: args.transactionHash}});
    if (!transaction?.transactionHash) {
      // 1.1 If not create it
      await Environment.readWriteApiDb.transaction.create({data: {transactionHash: args.transactionHash}});
    }

    // 2. Create the tag
    const tag = await Environment.readWriteApiDb.tag.create({
      data: {
        createdByProfileId: callerInfo.profile.id,
        transactionHash: args.transactionHash,
        typeId: args.tag.typeId,
        value: args.tag.value,
        createdAt: new Date(),
        isPrivate: false
      }
    });

    return {
      success: true,
      tag: tag
    }
  };
}