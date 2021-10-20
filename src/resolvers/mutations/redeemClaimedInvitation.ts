import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";
import {RpcGateway} from "../../rpcGateway";
import { BN } from "ethereumjs-util";
import {RedeemClaimedInvitationResult} from "../../types";

export function redeemClaimedInvitation(prisma_api_ro:PrismaClient, prisma_api_rw:PrismaClient) {
  return async (parent: any, args: any, context: Context) => {
    const profile = await context.callerProfile;

    if (!profile?.circlesSafeOwner) {
      throw new Error(`You need a profile and EOA to redeem a claimed invitation.`);
    }

    const claimedInvitation = await prisma_api_ro.invitation.findFirst({
      where: {
        claimedByProfileId: profile.id
      }
    });

    if (!claimedInvitation) {
      throw new Error(`No claimed invitation for profile ${profile.id}`);
    }

    try {
      const web3 = RpcGateway.get();
      const balance = await web3.eth.getBalance(claimedInvitation.address);
      const eoaBalance = new BN(balance);

      if (eoaBalance.lt(new BN(web3.utils.toWei("0.1", "ether")))) {
        return <RedeemClaimedInvitationResult>{
          success: false,
          error: "The invitation isn't funded"
        }
      }

      const gas = 41000;
      const gasPrice = new BN(await web3.eth.getGasPrice());
      const totalFee = gasPrice.mul(new BN(gas.toString()));
      const nonce = await web3.eth.getTransactionCount(claimedInvitation.address);
      const availableForTransfer = eoaBalance.sub(totalFee)

      const account = web3.eth.accounts.privateKeyToAccount(claimedInvitation.key);
      const signedTx = await account.signTransaction({
        from: claimedInvitation.address,
        to: profile.circlesSafeOwner,
        value: availableForTransfer,
        gasPrice: gasPrice,
        gas: gas,
        nonce: nonce
      });

      if (!signedTx?.rawTransaction) {
        throw new Error(`Couldn't send the invitation transaction`);
      }

      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

      await prisma_api_rw.invitation.updateMany({
        data: {
          redeemedAt: new Date(),
          redeemedByProfileId: profile.id,
          redeemTxHash: receipt.transactionHash
        },
        where: {
          id: claimedInvitation.id
        }
      });

      return <RedeemClaimedInvitationResult> {
        success: true,
        transactionHash: receipt.transactionHash
      }
    } catch (e) {
      return <RedeemClaimedInvitationResult>{
        success: false,
        error: `Couldn't redeem the invitation.`
      }
    }
  }
}