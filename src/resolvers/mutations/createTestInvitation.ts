import {Context} from "../../context";
import {RpcGateway} from "../../circles/rpcGateway";
import {Session} from "../../session";
import {CreateInvitationResult} from "../../types";
import Web3 from "web3";
import {Environment} from "../../environment";

export async function fundEoa(web3: Web3, invitation: any, context?:Context) {
  const invitationFundsAmountxDai = RpcGateway.get().utils.fromWei(Environment.invitationFundsAmount, "ether");
  context?.log(`Transferring ${invitationFundsAmountxDai} xdai from ${Environment.invitationFundsSafe.address} to invitation EOA ${invitation.address} ..`)

  const receipt = await Environment.invitationFundsSafe.transferEth(
    Environment.invitationFundsSafeOwner.privateKey,
    Environment.invitationFundsAmount,
    invitation.address);

  context?.log(`Transferred ${invitationFundsAmountxDai} xdai from ${Environment.invitationFundsSafe.address} to invitation EOA ${invitation.address}. Receipt: ${JSON.stringify(receipt)}`);

  return <CreateInvitationResult>{
    success: true,
    createdInviteEoas: [{
      createdBy: invitation.createdBy,
      createdByProfileId: invitation.createdByProfileId,
      createdAt: invitation.createdAt.toJSON(),
      name: invitation.name,
      address: invitation.address,
      balance: "0",
      code: invitation.code,
    }]
  };

  /*
  const signedTx = await invitationFundsEoa.signTransaction({
    from: invitationFundsEoa.address,
    to: invitation.address,
    value: Environment.invitationFundsAmount,
    gasPrice: gasPrice,
    gas: gas,
    nonce: nonce
  });

  console.log("Signed the transaction: ", signedTx.transactionHash);

  if (!signedTx?.rawTransaction) {
    throw new Error(`Couldn't send the invitation transaction`);
  }

  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log("Transferred invite xdai: ", receipt);

  return <CreateInvitationResult>{
    success: true,
    createdInviteEoas: [{
      createdBy: invitation.createdBy,
      createdByProfileId: invitation.createdByProfileId,
      createdAt: invitation.createdAt.toJSON(),
      name: invitation.name,
      address: invitation.address,
      balance: "0",
      code: invitation.code,
    }]
  };
  */
}

export function createTestInvitation() {
  return async (parent:any, args:any, context:Context) => {
    const web3 = RpcGateway.get();
    const invitationEoa = web3.eth.accounts.create();
    const invitation = await Environment.readWriteApiDb.invitation.create({
      data: {
        name: Session.generateRandomBase64String(3),
        createdAt: new Date(),
        createdByProfileId: 1,
        address: invitationEoa.address,
        key: invitationEoa.privateKey,
        code: Session.generateRandomBase64String(16),
        forSafeAddress: args.forSafeAddress ?? ""
      },
      include: {
        createdBy: true
      }
    });

    return await fundEoa(web3, invitation);
  }
}