import {encodeMulti, encodeSingle, OperationType, TransactionInput, TransactionType} from "ethers-multisend";
import {RpcGateway} from "../circles/rpcGateway";
import {Environment} from "../environment";
import {CirclesHub} from "../circles/circlesHub";
import {GnosisSafeProxy} from "../circles/gnosisSafeProxy";
import BN from "bn.js";
import {SafeOps} from "../circles/safeOps";
import {ZERO_ADDRESS} from "../circles/consts";

RpcGateway.setup("https://rpc.circles.land");
const safeProxy = new GnosisSafeProxy(RpcGateway.get(), "0xde374ece6fa50e781e81aac78e811b33d16912c7");

const privKey = Environment.invitationFundsSafeOwner.privateKey;

jest.setTimeout(15000);

describe("multisend", () => {
  jest.setTimeout(15000);

  it("should be able to send two erc20-transfers", async () => {

    const ti1 = encodeSingle(<TransactionInput> {
      id: "1",
      from: "0xde374ece6fa50e781e81aac78e811b33d16912c7",
      to: "0xc5a786eafefcf703c114558c443e4f17969d9573",
      amount: "0.01",
      decimals: 18,
      type: TransactionType.transferFunds,
      token: "0x04e7c72a70975b3d2f35ec7f6b474451f43d4ea0",
    });

    const ti2 = encodeSingle(<TransactionInput> {
      id: "2",
      from: "0xde374ece6fa50e781e81aac78e811b33d16912c7",
      to: "0xc5a786eafefcf703c114558c443e4f17969d9573",
      amount: "0.01",
      decimals: 18,
      type: TransactionType.transferFunds,
      token: "0xd9190f4c57240955bf4e7bfef4d8c168cc94bef0",
    });

    const multiTx = encodeMulti([ti1, ti2]);

    const result = await safeProxy.execTransactionTxData(privKey, {
      data: multiTx.data,
      operation: multiTx.operation == OperationType.Call ? SafeOps.CALL : SafeOps.DELETECALL,
      to: multiTx.to,
      value: new BN(multiTx.value),
      gasToken: ZERO_ADDRESS,
      refundReceiver: ZERO_ADDRESS
    });

    const receipt = await RpcGateway.get().eth.sendSignedTransaction(result);
    return receipt;
  });

  it("should be able to perform a circles hub- and erc20-transfer", async () => {

    const hub = new CirclesHub(RpcGateway.get(), Environment.circlesHubAddress);
    const safeProxy = new GnosisSafeProxy(RpcGateway.get(), "0xde374ece6fa50e781e81aac78e811b33d16912c7");

    // Prepares the tx-data for a safe-call that calls the hub transfer function in the circles hub
    const transferThroughTxData = await hub.transferTroughEthers(
      privKey,
      safeProxy,
      ["0xde374ece6fa50e781e81aac78e811b33d16912c7"],
      ["0xde374ece6fa50e781e81aac78e811b33d16912c7"],
      ["0xc5a786eafefcf703c114558c443e4f17969d9573"],
      [new BN(RpcGateway.get().utils.toWei("0.01", "ether"))]
    );

    const m = encodeSingle(transferThroughTxData);
    const multiTx = encodeMulti([m]);
    const result = await safeProxy.execTransactionTxData(privKey, {
      data: multiTx.data,
      operation: SafeOps.CALL,
      to: multiTx.to,
      value: new BN(multiTx.value),
      gasToken: ZERO_ADDRESS,
      refundReceiver: ZERO_ADDRESS
    });

    const receipt = await RpcGateway.get().eth.sendSignedTransaction(result);
    return receipt;
/*
    const signedTx = await acc.signTransaction({
      data: multiTx.data,
      gas: 500000,
      to: multiTx.to,
      value: new BN(multiTx.value),
    });

    const receipt = await RpcGateway.get().eth.sendSignedTransaction(signedTx.rawTransaction ?? "");
    return receipt;
 */
  });
});
