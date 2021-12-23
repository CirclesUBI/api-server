import {Context} from "../../context";
import {RpcGateway} from "../../rpcGateway";
import { BN } from "ethereumjs-util";
import {RedeemClaimedInvitationResult} from "../../types";
import {Environment} from "../../environment";

export function redeemClaimedInvitation() {
  return async (parent: any, args: any, context: Context) => {
    const callerInfo = await context.callerInfo;

    if (!callerInfo?.profile?.circlesSafeOwner) {
      throw new Error(`You need a profile and EOA to redeem a claimed invitation.`);
    }

    const claimedInvitation = await Environment.readWriteApiDb.invitation.findFirst({
      where: {
        claimedByProfileId: callerInfo.profile.id
      },
      include: {
        claimedBy: true
      }
    });

    if (!claimedInvitation) {
      throw new Error(`No claimed invitation for profile ${callerInfo.profile.id}`);
    }
    if (!claimedInvitation.claimedBy?.circlesSafeOwner) {
      throw new Error(`Profile ${claimedInvitation.claimedByProfileId} previously claimed invitation ${claimedInvitation.code} but has no circlesSafeOwner set to redeem it to.`);
    }

    try {
      const web3 = RpcGateway.get();

      const invitationFundsRecipient = claimedInvitation.claimedBy.circlesSafeOwner;
      const invitationFundsAmountInEth = "0.5";
      const invitationFundsAmountInWei = new BN(web3.utils.toWei(invitationFundsAmountInEth, "ether"));
      const invitationFundsBalance = await web3.eth.getBalance(Environment.invitationFundsSafe.address);

      context.log(`Redeeming invitation ${claimedInvitation.code}: Invitations funds balance: ${invitationFundsBalance.toString()}`);
      context.log(`Redeeming invitation ${claimedInvitation.code}: Sending invitation funds of ${invitationFundsAmountInEth} xdai to '${invitationFundsRecipient}' ..`);

      let invitationFundsRecipientBalance = await web3.eth.getBalance(invitationFundsRecipient);
      context.log(`Redeeming invitation ${claimedInvitation.code}: ${invitationFundsRecipient}'s balance is: ${invitationFundsRecipientBalance}`);

      const fundEoaReceipt = await Environment.invitationFundsSafe.transferEth(
        Environment.invitationFundsSafeOwner.privateKey,
        invitationFundsAmountInWei,
        invitationFundsRecipient);

      context.log(`Redeeming invitation ${claimedInvitation.code}: Transaction hash: ${fundEoaReceipt.transactionHash}`);

      invitationFundsRecipientBalance = await web3.eth.getBalance(invitationFundsRecipient);
      context.log(`Redeeming invitation ${claimedInvitation.code}: ${invitationFundsRecipient}'s balance is: ${invitationFundsRecipientBalance}`);

      if (new BN(invitationFundsRecipientBalance).lt(new BN(web3.utils.toWei("0.48", "ether")))) {
        context.log(`Redeeming invitation ${claimedInvitation.code}: ERROR: ${invitationFundsRecipient} couldn't be funded.`);

        return <RedeemClaimedInvitationResult>{
          success: false,
          error: "You safe owner EOA couldn't be funded."
        }
      }

      await Environment.readWriteApiDb.invitation.updateMany({
        data: {
          redeemedAt: new Date(),
          redeemedByProfileId: callerInfo.profile.id,
          redeemTxHash: fundEoaReceipt.transactionHash
        },
        where: {
          id: claimedInvitation.id
        }
      });

      return <RedeemClaimedInvitationResult> {
        success: true,
        transactionHash: fundEoaReceipt.transactionHash
      }
    } catch (e) {
      return <RedeemClaimedInvitationResult>{
        success: false,
        error: `Couldn't redeem the invitation.`
      }
    }
  }
}