import {Context} from "../../context";
import {RpcGateway} from "../../circles/rpcGateway";
import { BN } from "ethereumjs-util";
import {RedeemClaimedInvitationResult} from "../../types";
import {Environment} from "../../environment";
import {Dropper} from "../../utils/dropper";

export function redeemClaimedInvitation() {
  return async (parent: any, args: any, context: Context) => {
    if (!context?.session?.profileId) {
      throw new Error(`You need a profile and EOA to redeem a claimed invitation.`);
    }

    const claimedInvitation = await Environment.readWriteApiDb.invitation.findFirst({
      where: {
        claimedByProfileId: context.session.profileId,
        redeemedAt: null
      },
      include: {
        claimedBy: true
      }
    });

    if (!claimedInvitation) {
      throw new Error(`No claimed invitation for profile ${context.session.profileId} or the invitation was already redeemed.`);
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

      await Environment.readWriteApiDb.invitation.updateMany({
        data: {
          redeemedAt: new Date(),
          redeemedByProfileId: context.session.profileId,
          redeemTxHash: fundEoaReceipt.transactionHash
        },
        where: {
          id: claimedInvitation.id
        }
      });

      if (claimedInvitation.forSafeAddress) {
        //throw new Error("The claimed invitation doesn't have an assigned 'forSafeAddress'.");
        const verifiedInviter = await Environment.readWriteApiDb.verifiedSafe.findFirst({
          where: {
            safeAddress: claimedInvitation.forSafeAddress
          }
        });

        if (verifiedInviter) {
          await Dropper.createInvitations(verifiedInviter, 1);
          // throw new Error(`Couldn't find a 'verifiedSafe' with the address ${claimedInvitation.forSafeAddress}.`)
        }
      }

      return <RedeemClaimedInvitationResult> {
        success: true,
        transactionHash: fundEoaReceipt.transactionHash
      }
    } catch (e) {
      console.error(e);
      return <RedeemClaimedInvitationResult>{
        success: false,
        error: `Couldn't redeem the invitation.`
      }
    }
  }
}