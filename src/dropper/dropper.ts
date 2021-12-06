import {prisma_api_rw} from "../apiDbClient";
import {Prisma, VerifiedSafe} from "../api-db/client";
import {
  createTransaction,
  encodeMulti,
  encodeSingle,
  MetaTransaction,
  TransactionType,
  TransferFundsTransactionInput
} from "ethers-multisend";
import {RpcGateway} from "../rpcGateway";
import {Session} from "../session";
import {ProfileLoader} from "../profileLoader";
import BN from "bn.js";
import {SafeTransaction} from "../circles/model/safeTransaction";
import {SafeOps} from "../circles/model/safeOps";
import {ZERO_ADDRESS} from "../circles/consts";
import InvitationCreateManyInput = Prisma.InvitationCreateManyInput;
import {Generate} from "../generate";
import {Environment} from "../environment";

export class Dropper {

  private _interval: NodeJS.Timeout|undefined = undefined;
  private _lastVerification:Date = new Date(0);

  async start() {
    this._interval = setInterval(async () => {
      // await this.checkNewVerifications();
    }, 10000);
  }

  private async checkNewVerifications() {
    const now = new Date();
    await prisma_api_rw.verifiedSafe.updateMany({
      where: {
        createdAt: {
          gt: this._lastVerification
        },
        rewardProcessingStartedAt: null
      },
      data: {
        rewardProcessingStartedAt: now,
        rewardProcessingWorker: process.pid.toString()
      }
    });

    const verificationsToProcess = await prisma_api_rw.verifiedSafe.findMany({
      where: {
        rewardProcessingStartedAt: now,
        rewardProcessingWorker: process.pid.toString()
      }
    });

    for (let newVerification of verificationsToProcess) {
      try {
        this._lastVerification = new Date(newVerification.createdAt);
        console.log(`Dropping rewards for new verified safe ${newVerification.safeAddress} ..`);
        await this.drop(newVerification);
      } catch (e) {
        console.error(`An error occurred while dropping the invites and rewards for verifiedSafe ${newVerification.safeAddress}: ${JSON.stringify(e)}`);
      }
    }
  }

  async drop(verifiedSafe:VerifiedSafe) {

    // Create ten invitations for the verified account
    const invitations = await this.createdInvitationEoasForInvitee(verifiedSafe);
    const invitationFundingTransactions = await this.createInvitationEoaFundingTransactions(invitations);

    // Drop the reward for the inviter
    const inviterRewardTransaction = await this.dropInviterReward(verifiedSafe);
    const inviteeRewardTransaction = await this.dropInviteeReward(verifiedSafe);

    const metaTransaction = encodeMulti([
      ...invitationFundingTransactions.map(o => o.fundingTransaction),
      encodeSingle(inviterRewardTransaction),
      encodeSingle(inviteeRewardTransaction)
    ], Environment.verificationRewardFundsSafe.address );

    const data = metaTransaction.data;
    const receipt = await Environment.verificationRewardFundsSafe.execTransaction(
      Environment.verificationRewardFundsSafeOwner.privateKey,
      <SafeTransaction>{
        to: Environment.verificationRewardFundsSafe.address,
        data: data,
        value: new BN("0"),
        refundReceiver: ZERO_ADDRESS,
        gasToken: ZERO_ADDRESS,
        operation: SafeOps.CALL
      }
    );

    console.log(metaTransaction, receipt);
  }

  async createdInvitationEoasForInvitee(verifiedSafe:VerifiedSafe) : Promise<InvitationCreateManyInput[]> {
    const profileResult = await new ProfileLoader().queryCirclesLandBySafeAddress(prisma_api_rw, [verifiedSafe.safeAddress]);
    const profileResultValues = Object.values(profileResult);
    if (profileResultValues.length == 0) {
      throw new Error(`Couldn't find a profile for the verified safe ${verifiedSafe.safeAddress}`);
    }
    const profile = profileResultValues[0];
    if (!profile) {
      throw new Error(`Couldn't find a profile for the verified safe ${verifiedSafe.safeAddress}`);
    }

    const now = new Date();

    const createInvitationsData:InvitationCreateManyInput[] = [];
    for(let i = 1; i < 11; i++) {
      const invitationEoa = RpcGateway.get().eth.accounts.create();
      createInvitationsData.push({
        name: `Invitation ${i}`,
        createdAt: now,
        createdByProfileId: profile.id,
        address: invitationEoa.address.toLowerCase(),
        key: invitationEoa.privateKey,
        code: Session.generateRandomBase64String(16)
      });
    }

    await prisma_api_rw.invitation.createMany({
      data: createInvitationsData
    });

    return createInvitationsData;
  }

  async createInvitationEoaFundingTransactions(invitations: InvitationCreateManyInput[]) : Promise<{
    invitation: InvitationCreateManyInput,
    fundingTransaction: MetaTransaction
  }[]> {
    const inputs = invitations.map(i => {
      return {
        invitation: i,
        fundingTransaction: createTransaction(TransactionType.raw, i.code)
      };
    });


    const amountWei = RpcGateway.get().utils.toWei("0.1", "ether");
    const amount = new BN(amountWei);

    inputs.forEach((i:any) => {
      i.fundingTransaction.to = i.invitation.address;
      i.fundingTransaction.value = amount.toString();
      i.fundingTransaction.data = "0x";

      return i;
    });

    return inputs.map(o => {
      return {
        invitation: o.invitation,
        fundingTransaction: encodeSingle(o.fundingTransaction)
      }
    });
  }

  async dropInviterReward(verifiedSafe:VerifiedSafe) : Promise<TransferFundsTransactionInput> {
    const invitationResult = await prisma_api_rw.invitation.findMany({
      where: {
        redeemedBy: {
          circlesAddress: verifiedSafe.safeAddress
        }
      },
      include: {
        createdBy: true
      }
    });

    if (invitationResult.length == 0) {
      throw new Error(`Couldn't find a invitation for verified safe ${verifiedSafe.safeAddress}`);
    }
    const invitation = invitationResult[0];
    if (!invitation.createdBy || !invitation.createdBy.circlesAddress) {
      throw new Error(`Couldn't find a creator for invitation ${invitation.id}.`);
    }

    const inviterReward = createTransaction(TransactionType.transferFunds, invitation.id.toString());
    inviterReward.to = invitation.createdBy.circlesAddress;
    inviterReward.amount = new BN("").toString();
    inviterReward.token = "0x04e7c72a70975b3d2f35ec7f6b474451f43d4ea0";

    return inviterReward;
  }

  async dropInviteeReward(verifiedSafe:VerifiedSafe) : Promise<TransferFundsTransactionInput> {
    const txId = Math.abs(Generate.randomInt4()).toString();
    const inviteeReward = createTransaction(TransactionType.transferFunds, txId);
    inviteeReward.to = verifiedSafe.safeAddress;
    inviteeReward.amount = new BN("").toString();
    inviteeReward.token = "0x04e7c72a70975b3d2f35ec7f6b474451f43d4ea0";

    return inviteeReward;
  }

  async stop() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = undefined;
    }
  }
}