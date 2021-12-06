import {MutationVerifySafeArgs} from "../../types";
import {Context} from "../../context";
import {BIL_ORGA, isBILMember} from "../../canAccess";
import {VerifiedSafe} from "../../api-db/client";
import {prisma_api_ro, prisma_api_rw} from "../../apiDbClient";
import {RpcGateway} from "../../rpcGateway";

export const verifySafe = async (parent:any, args:MutationVerifySafeArgs, context: Context) => {
  const callerInfo = await context.callerInfo;
  const isBilMember = await isBILMember(callerInfo);
  if (!isBilMember || !callerInfo?.profile) {
    throw new Error(`Not allowed`);
  }

  let verifiedSafe: VerifiedSafe|null = await prisma_api_rw.verifiedSafe.findUnique({
    where: {
      safeAddress: args.safeAddress.toLowerCase()
    }
  });

  if (verifiedSafe) {
    throw new Error(`Safe ${args.safeAddress} is already verified.`);
  }

  const bilOrga = await prisma_api_ro.profile.findFirst({
    where: {
      circlesAddress: BIL_ORGA
    },
    orderBy: {
      lastUpdateAt: "desc"
    }
  });

  if (!bilOrga) {
    throw new Error(`Couldn't find an organisation with safe address ${BIL_ORGA}`);
  }


  const swapEoa = RpcGateway.get().eth.accounts.create();

  verifiedSafe = await prisma_api_rw.verifiedSafe.create({
    data: {
      safeAddress: args.safeAddress.toLowerCase(),
      createdByProfileId: callerInfo.profile.id,
      createdByOrganisationId: bilOrga.id,
      createdAt: new Date(),
      inviteeRewardTransactionHash: null,
      inviterRewardTransactionHash: null,
      swapEoaKey: swapEoa.privateKey,
      swapEoaAddress: swapEoa.address
    }
  });

  return {
    success: true
  };
}