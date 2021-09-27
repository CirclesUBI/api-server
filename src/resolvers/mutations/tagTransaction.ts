import {CreateTagInput} from "../../types";
import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";

export function tagTransaction(prisma_api_rw:PrismaClient) {
  return async (parent: any, args: { transactionHash: string, tag: CreateTagInput }, context: Context) => {
    const session = await context.verifySession();
    if (!session.profileId) {
      return {
        success: false,
        errorMessage: "You must have a complete profile to use this function."
      }
    }
    const profile = await prisma_api_rw.profile.findUnique({
      where: {
        id: session.profileId
      }
    });
    if (!profile)
    {
      throw new Error(`Couldn't find a profile with id ${session.profileId}`);
    }

    // 1. Check if the transaction anchor entry already exists
    let transaction = await prisma_api_rw.transaction.findUnique({where: {transactionHash: args.transactionHash}});
    if (!transaction?.transactionHash) {
      // 1.1 If not create it
      await prisma_api_rw.transaction.create({data: {transactionHash: args.transactionHash}});
    }

    // 2. Create the tag
    const tag = await prisma_api_rw.tag.create({
      data: {
        createdByProfileId: profile.id,
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