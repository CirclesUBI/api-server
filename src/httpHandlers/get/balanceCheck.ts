import { Request, Response } from "express";
import { RpcGateway } from "../../circles/rpcGateway";
import { Environment } from "../../environment";

RpcGateway.setup(Environment.rpcGatewayUrl, Environment.fixedGasPrice);

const web3 = RpcGateway.get();

export const balanceCheckGetHandler = async (req: Request, res: Response) => {
  let address = req.params.address;
  let threshold: bigint;
  let balance: bigint;
  let diff: bigint;

  try {
    if (isNaN(req.params.threshold as any)) {
      throw new Error(`Threshold is not a number`);
    }

    threshold = BigInt(parseInt(req.params.threshold as string, 10));
    balance = BigInt(parseInt(await web3.eth.getBalance(address), 10));
    if (balance == BigInt(0)) {
      throw new Error(`Balance is zero. Are you sure, you have the right address?`);
    }
    diff = threshold - balance;
    if (balance < threshold) {
      throw new Error(
        `Balance is too low. Balance: ${web3.utils.fromWei(BigInt(balance).toString(), "ether")} ETH \
        < \
        Threshold: ${web3.utils.fromWei(BigInt(threshold).toString(), "ether")} ETH. \
        Difference: - ${web3.utils.fromWei(BigInt(diff).toString(), "ether")} ETH`);
    }
    if (balance >= threshold) {
      res.statusCode = 200;
      return res.json({
        status: "ok",
        message: `Balance is high enough`,
        balance: web3.utils.fromWei(BigInt(balance).toString(), "ether"),
        unit: "ETH",
      })
    }
  }
  catch (e) {
    res.statusCode = 500;
    return res.json({
      status: "error",
      message: `${e}`,
    });
  }
};
