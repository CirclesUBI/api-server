import {Pool} from "pg";
import {prisma_api_rw} from "../apiDbClient";
import {Prisma, VerifiedSafe} from "../api-db/client";
import {createTransaction, encodeMulti, encodeSingle, MetaTransaction, TransactionType} from "ethers-multisend";
import {RpcGateway} from "../rpcGateway";
import {Session} from "../session";
import {ProfileLoader} from "../profileLoader";
import InvitationCreateManyInput = Prisma.InvitationCreateManyInput;
import {erc20_abi} from "../crcabi";
import { FormatTypes, Interface } from '@ethersproject/abi'
import BN from "bn.js";

let pool = new Pool({
  connectionString: process.env.DROPPER_DB_CONNECTION_STRING
}).on('error', (err) => {
  console.error('An idle client has experienced an error', err.stack)
});

export class Dropper {

  private _interval: NodeJS.Timeout|undefined = undefined;
  private _lastVerification:Date = new Date(0);

  async start() {
    this._interval = setInterval(() => {
      // this.checkNewVerifications();
    }, 10000);
  }

  private async checkNewVerifications() {
    const newVerifications = await prisma_api_rw.verifiedSafe.findMany({
      where: {
        createdAt: {
          gt: this._lastVerification
        },
        rewardProcessingStartedAt: null
      }
    });

    for (let newVerification of newVerifications) {
      this._lastVerification = new Date(newVerification.createdAt);
      console.log("New verification: ", newVerification);
      await this.drop(newVerification);
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
      inviterRewardTransaction,
      inviteeRewardTransaction
    ]);
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
        address: invitationEoa.address,
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
        fundingTransaction: createTransaction(TransactionType.callContract, i.code)
      };
    });

    const transferAbi = new Interface([
      'function transfer(address to, uint256 amount)',
    ]).format(FormatTypes.json) as string

    inputs.forEach(i => {
      i.fundingTransaction.abi = transferAbi;
      i.fundingTransaction.to = i.invitation.address;
      i.fundingTransaction.functionSignature = "transfer(address,uint256)";
      i.fundingTransaction.inputValues = {
        to: i.invitation.address,
        amount: new BN(RpcGateway.get().utils.toWei("0.1", "ether")).toString("hex")
      }

      return i;
    });

    return inputs.map(o => {
      return {
        invitation: o.invitation,
        fundingTransaction: encodeSingle(o.fundingTransaction)
      }
    });
  }

  async dropInviterReward(verifiedSafe:VerifiedSafe) : Promise<MetaTransaction> {
    return <any>{};
  }

  async dropInviteeReward(verifiedSafe:VerifiedSafe) : Promise<MetaTransaction> {
    return <any>{};
  }

  async stop() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = undefined;
    }
  }
}