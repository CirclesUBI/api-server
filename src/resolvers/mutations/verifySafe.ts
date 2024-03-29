import { MutationVerifySafeArgs } from "../../types";
import { Context } from "../../context";
import { isBILMember } from "../../utils/canAccess";
import { VerifiedSafe } from "../../api-db/client";
import { RpcGateway } from "../../circles/rpcGateway";
import { Environment } from "../../environment";

export const verifySafe = async (parent: any, args: MutationVerifySafeArgs, context: Context) => {
  // TODO: Usually only BIL is allowed to verify new people (see commented out code below)
  /*
  const callerInfo = await context.callerInfo;
  const isBilMember = await isBILMember(callerInfo?.profile?.circlesAddress);
  if (!isBilMember || !callerInfo?.profile) {
    throw new Error(`Not allowed`);
  }
  */
  let verifiedSafe: VerifiedSafe | null = await Environment.readWriteApiDb.verifiedSafe.findUnique({
    where: {
      safeAddress: args.safeAddress.toLowerCase(),
    },
  });

  if (verifiedSafe) {
    return {
      success: true,
    };
    // throw new Error(`Safe ${args.safeAddress} is already verified.`);
  }

  const bilOrga = await Environment.readonlyApiDb.profile.findFirst({
    where: {
      circlesAddress: Environment.operatorOrganisationAddress,
    },
    orderBy: {
      lastUpdateAt: "desc",
    },
  });

  if (!bilOrga) {
    throw new Error(`Couldn't find an organisation with safe address ${Environment.operatorOrganisationAddress}`);
  }

  const swapEoa = RpcGateway.get().eth.accounts.create();
  verifiedSafe = await Environment.readWriteApiDb.verifiedSafe.create({
    data: {
      safeAddress: args.safeAddress.toLowerCase(),
      createdByProfileId: bilOrga.id,
      createdByOrganisationId: bilOrga.id,
      createdAt: new Date(),
      inviteeRewardTransactionHash: null,
      inviterRewardTransactionHash: null,
      swapEoaKey: swapEoa.privateKey,
      swapEoaAddress: swapEoa.address,
    },
  });

  if (bilOrga.circlesAddress) {
    await Environment.indexDb.query(
      `call publish_event('follow_trust', '{"to":"${bilOrga.circlesAddress.toLowerCase()}"}');`
    );
  }

  return {
    success: true,
  };
};

export const revokeSafeVerification = async (parent: any, args: MutationVerifySafeArgs, context: Context) => {
  const callerInfo = await context.callerInfo;
  const isBilMember = await isBILMember(callerInfo?.profile?.circlesAddress);
  if (!isBilMember || !callerInfo?.profile) {
    throw new Error(`Not allowed`);
  }

  let verifiedSafe: VerifiedSafe | null = await Environment.readWriteApiDb.verifiedSafe.findUnique({
    where: {
      safeAddress: args.safeAddress.toLowerCase(),
    },
  });

  if (!verifiedSafe) {
    throw new Error(`Safe ${args.safeAddress} is not verified.`);
  }

  const revokeVerification = await Environment.readWriteApiDb.verifiedSafe.update({
    where: {
      safeAddress: verifiedSafe.safeAddress,
    },
    data: {
      revokedAt: new Date(),
      revokedByProfileId: callerInfo.profile.id,
    },
  });

  return {
    success: true,
  };
};
