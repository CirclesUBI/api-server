import {TransitivePath} from "../types";
import {AbiItem} from "web3-utils";
import {RpcGateway} from "../circles/rpcGateway";
import {Environment} from "../environment";

export class PathValidator {
  static async validate(path: TransitivePath): Promise<{
    calldata: string,
    result?: string,
    error?: Error
  }> {

    const token = [];
    const from = [];
    const to = [];
    const value = [];

    for (let step of path.transfers) {
      token.push(step.tokenOwner);
      from.push(step.from);
      to.push(step.to);
      value.push(step.value);
    }

    const abiItem: AbiItem = {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "tokenOwners",
          "type": "address[]"
        },
        {
          "internalType": "address[]",
          "name": "srcs",
          "type": "address[]"
        },
        {
          "internalType": "address[]",
          "name": "dests",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "wads",
          "type": "uint256[]"
        }
      ],
      "name": "transferThrough",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    };

    const callData = RpcGateway.get().eth.abi.encodeFunctionSignature(abiItem)
      + RpcGateway.get().eth.abi.encodeParameters([
        "address[]", "address[]", "address[]", "uint256[]"
      ], [
        token, from, to, value
      ]).substring(2)/* remove preceding 0x */;

    try {


      // console.log(`${callData}`);

      // console.log(`'cast' command:`);
      // console.log(`cast call '0x29b9a7fBb8995b2423a71cC17cf9810798F6C543' 'transferThrough(address[],address[],address[],uint256[])' '[${token.join(',')}]' '[${from.join(',')}]' '[${to.join(',')}]' '[${value}]' --rpc-url https://rpc.gnosischain.com --from ${sender} 0x`);
      // console.log(`PathValidator: Validating a path with requestedAmount '${path.requestedAmount}' ...`);

      const callResult = await RpcGateway.get().eth.call({
        from: from[0],
        to: Environment.circlesHubAddress,
        data: callData
      });

      // console.log(`PathValidator: Validation result by hub:`, callResult);

      return {
        calldata: callData,
        result: callResult
      };
    } catch (e) {
      /*
      console.warn(`PathValidator: Invalid path `, {
        flow: path.flow,
        success: path.success,
        requestedAmount: path.requestedAmount,
        transfers: path.transfers?.length ?? 0
      })*/
      return {
        calldata: callData,
        error: <Error>e
      };
    }
  }
}