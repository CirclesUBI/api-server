import {Context} from "../../context";
import {MutationSendSignedTransactionArgs, SendSignedTransactionResult} from "../../types";
import {RpcGateway} from "../../circles/rpcGateway";

export async function sendSignedTransaction(parent: any, args: MutationSendSignedTransactionArgs, context: Context) {
  if (!context?.session?.profileId) {
    throw new Error(`You need a profile to send transactions via api.`);
  }
  const web3 = await RpcGateway.get();

  const senderAddress = web3.eth.accounts.recoverTransaction(args.data.signedTransaction);
  context.log(`senderAddress: ${senderAddress})`);

  if (senderAddress.toLowerCase() !== context.session.ethAddress?.toLowerCase()) {
    throw new Error(`The sender address of the signed transaction doesn't match the ethAddress of the session.`);
  }

  const receipt = await web3.eth.sendSignedTransaction(args.data.signedTransaction);
  context.log(`Sent transaction to chain. tx-hash: ${receipt.transactionHash}`);

  return <SendSignedTransactionResult>{
    transactionHash: receipt.transactionHash
  }
}
