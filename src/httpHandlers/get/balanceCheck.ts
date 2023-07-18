import { Request, Response } from "express";
import { RpcGateway } from "../../circles/rpcGateway";
import { Environment } from "../../environment";

RpcGateway.setup(Environment.rpcGatewayUrl, Environment.fixedGasPrice);


const web3 = RpcGateway.get();

export const balanceCheckGetHandler = async (req: Request, res: Response) => {
  const address = req.params.address;
  const threshold = req.params.threshold;

  const balance = await web3.eth.getBalance(address);

  if (balance > threshold) {
    return res.status(200).send("Funds are sufficient");
  }

  return res.status(400).send("Funds are insufficient. Please top up your account.");
};