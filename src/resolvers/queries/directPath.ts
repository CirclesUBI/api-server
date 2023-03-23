import {QueryDirectPathArgs, TransitivePath} from "../../types";
import BN from "bn.js";
import {Context} from "../../context";
import {Pathfinder} from "../../pathfinder-api/pathfinder";
import {PathValidator} from "../../pathfinder-api/pathValidator";
import {FlowGraph} from "../../pathfinder-api/pathParser";
import {GraphvizGenerator} from "../../pathfinder-api/graphvizGenerator";
import {RpcGateway} from "../../circles/rpcGateway";
import * as fs from "fs";
import {exec} from "child_process";
import {DbBalanceProvider} from "../../pathfinder-api/dbBalanceProvider";

async function generateGraphvizGraph(totalAmount:string, flowGraph:FlowGraph, path?:TransitivePath) {
  const graphvizDef = await GraphvizGenerator.generate(parseFloat(RpcGateway.get().utils.fromWei(totalAmount, "ether")), flowGraph, path);
  fs.writeFileSync('/home/daniel/src/CirclesUBI/api-server/src/filtered.graphviz', graphvizDef);

  exec('dot -Tsvg /home/daniel/src/CirclesUBI/api-server/src/filtered.graphviz > /home/daniel/src/CirclesUBI/api-server/src/path.svg', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      throw err;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}

export const directPath = async (parent: any, args: QueryDirectPathArgs, context: Context) => {
  const from = args.from.toLowerCase();
  const to = args.to.toLowerCase();

  const balanceProvider = new DbBalanceProvider();

  const amount = args.amount.trim();

  let isBn: boolean;
  try {
    const bn = new BN(amount);
    isBn = true;
  } catch {
    isBn = false;
  }

  if (!isBn) {
    throw new Error(`Amount is not a big integer`);
  }

  const path = amount != "0"
    ? await Pathfinder.findPath(from, to, args.amount)
    : await Pathfinder.findMaxFlow(balanceProvider, from, to);

  // try {
    // const flowGraph = new FlowGraph(path);
    // await generateGraphvizGraph(amount, flowGraph, path);
  // } catch (e) {
  //  console.warn("error while generating a graph:", e);
  // }

  const validationResult = await PathValidator.validate(path);
  if (validationResult.error) {
    console.error(`Invalid path call data: ${validationResult.calldata}`);
  }

  path.isValid = !validationResult.error;

  if (validationResult.error) {
    context.log(`The path couldn't be validated at the hub contract: ${validationResult.calldata}`);

    if (path.flow) {
      const flowBn = new BN(path.flow);
      const amountBn = new BN(args.amount);
      if (flowBn.gtn(0) && flowBn.lt(amountBn)) {
        context.log(`The max. flow as determined by the pathfinder is ${flowBn} but the user requested ${amountBn}`);
      }
    }
  }

  return path;
};
