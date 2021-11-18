import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";
import {RpcGateway} from "../../rpcGateway";
import {Session} from "../../session";
import {BN} from "ethereumjs-util";
import {CreateInvitationResult} from "../../types";

export function createTestInvitation(prisma_api_rw:PrismaClient) {
  return async (parent:any, args:any, context:Context) => {
    const web3 = RpcGateway.get();
    const invitationEoa = web3.eth.accounts.create();
    const invitation = await prisma_api_rw.invitation.create({
      data: {
        name: Session.generateRandomBase64String(3),
        createdAt: new Date(),
        createdByProfileId: 1,
        address: invitationEoa.address,
        key: invitationEoa.privateKey,
        code: Session.generateRandomBase64String(16)
      },
      include: {
        createdBy: true
      }
    });

    const invitationFundsEoa = web3.eth.accounts.privateKeyToAccount(process.env.INVITE_EOA_KEY ?? "");

    const gas = 41000;
    const gasPrice = new BN(await web3.eth.getGasPrice());
    const nonce = await web3.eth.getTransactionCount(invitationFundsEoa.address);

    console.log(`Transferring 0.2 eth to invitation EOA ${invitationFundsEoa.address} (nonce: ${nonce}, gasPrice: ${gasPrice.toString()})`)

    const signedTx = await invitationFundsEoa.signTransaction({
      from: invitationFundsEoa.address,
      to: invitation.address,
      value: new BN(web3.utils.toWei("0.2", "ether")),
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
  }
}