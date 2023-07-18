import { Request, Response } from "express";
import { RpcGateway } from "../../circles/rpcGateway";
import { Environment } from "../../environment";

RpcGateway.setup(Environment.rpcGatewayUrl, Environment.fixedGasPrice);


const web3 = RpcGateway.get();

export const balanceCheckGetHandler = async (req: Request, res: Response) => {
  const address = req.params.address;
  const threshold = parseInt(req.params.threshold, 10);
  const balance = parseInt(await web3.eth.getBalance(address), 10);
  const diff = threshold - balance;

  if (balance > threshold) {
    return res.status(200).send("Balance is high enough" + BigInt(balance));
  }

  return res.status(500)
    .send(
      "Balance is too low = " + BigInt(balance)
      + "<br/> Threshold = " + BigInt(threshold)
      + "<br/> Difference = " + BigInt(diff))
};