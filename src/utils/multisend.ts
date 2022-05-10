import {BN} from "ethereumjs-util";
import {
  encodeMulti,
  encodeSingle,
  OperationType,
  TransactionInput
} from "ethers-multisend";
import {GnosisSafeProxy} from "../circles/gnosisSafeProxy";
import {RpcGateway} from "../circles/rpcGateway";
import {SafeOps} from "../circles/safeOps";
import {ZERO_ADDRESS} from "../circles/consts";

export async function multisend(safeAddress:string, privateKey:string, input:TransactionInput[]) {
  let id = 0;
  const metaTransactions = input.map(o => encodeSingle({
    ...o,
    id: (id++).toString()
  }));
  const multiTx = encodeMulti(metaTransactions);

  const safeProxy = new GnosisSafeProxy(RpcGateway.get(), safeAddress);
  const result = await safeProxy.execTransactionTxData(privateKey, {
    data: multiTx.data,
    operation: multiTx.operation == OperationType.Call ? SafeOps.CALL : SafeOps.DELETECALL,
    to: multiTx.to,
    value: new BN(multiTx.value),
    gasToken: ZERO_ADDRESS,
    refundReceiver: ZERO_ADDRESS,
  });

  const receipt = await RpcGateway.get().eth.sendSignedTransaction(result);
  return receipt;
}
