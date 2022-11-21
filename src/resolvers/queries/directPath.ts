import {QueryDirectPathArgs, TransitivePath, TransitiveTransfer} from "../../types";
import BN from "bn.js";
import {Context} from "../../context";
import {Pathfinder} from "../../pathfinder-api/pathfinder";
import {PathValidator} from "../../pathfinder-api/pathValidator";
import {FlowGraph} from "../../pathfinder-api/pathParser";
import {GraphvizGenerator} from "../../pathfinder-api/graphvizGenerator";
import {RpcGateway} from "../../circles/rpcGateway";
import * as fs from "fs";
import {exec} from "child_process";
import {DefaultBalanceProvider} from "../../pathfinder-api/defaultBalanceProvider";


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

  const path = await Pathfinder.findPath(from, to, args.amount);
  //const path = await Pathfinder.findMaxFlow(new DefaultBalanceProvider(), from, to);

  const flowGraph = new FlowGraph(path);

  await generateGraphvizGraph(args.amount, flowGraph, path);

  const pathHasErrors = await PathValidator.validate(path);
  if (pathHasErrors.error) {
    console.error(`Invalid path call data: ${pathHasErrors.calldata}`);
  }

  if (pathHasErrors.error) {
    context.log(`The path couldn't be validated at the hub contract: ${pathHasErrors.calldata}`);
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

function getInputsOrderedByValue(adjacencyList: { [p: string]: { [p: string]: TransitiveTransfer[] } }, sink: string)
  : {
  sinkInputs: { [p: string]: TransitiveTransfer[] },
  sinkInputSources: { value: BN; sourceAddress: string; }[]
} {
  const sinkInputs = adjacencyList[sink];
  if (!sinkInputs) {
    return {sinkInputs: {}, sinkInputSources: []};
  }

  let sinkInputSources = Object.keys(sinkInputs)
    .map(sourceAddress => {
      return {
        value: sinkInputs[sourceAddress]
          .reduce((p, c) => p.add(new BN(c.value)), new BN("0")),
        sourceAddress: sourceAddress
      }
    });

  sinkInputSources.sort((a, b) => a.value.gt(b.value)
    ? -1
    : a.value.lt(b.value)
      ? 1
      : 0)

  sinkInputSources = sinkInputSources.map(o => {
    return {
      ...o,
      valueString: o.value.toString()
    }
  });
  return {sinkInputs, sinkInputSources};
}

async function validateAndSavePath(path: TransitivePath, to: string, amount: BN, amountInWei: string, from: string) {
  let adjacencyList: { [to: string]: { [from: string]: TransitiveTransfer[] } } = {};

  path.transfers.forEach(o => {
    if (!adjacencyList[o.to]) {
      adjacencyList[o.to] = {
        [o.from]: [o]
      };
    } else {
      const ft = adjacencyList[o.to];
      if (!ft[o.from]) {
        ft[o.from] = [o];
      } else {
        ft[o.from].push(o);
      }
    }
  });

  let sinks = [to];

  function getNextSink(): string | null {
    const item = sinks.pop();
    if (!item) {
      return null;
    }

    return item;
  }


  let paths: any[][] = [];
  let pathArr: any[] = [];
  let sink = getNextSink();

  while (sink) {
    let {
      sinkInputs,
      sinkInputSources
    } = getInputsOrderedByValue(adjacencyList, sink);

    if (!sinkInputSources.length) {
      sink = getNextSink();
      continue;
    }

    const currentInput = sinkInputSources.pop();
    if (!currentInput) {
      throw new Error()
    }

    const currentInputEdges = sinkInputs[currentInput.sourceAddress];
    if (!currentInputEdges) {
      throw new Error();
    }

    // Remove the nodes we already visited
    const currentInputEdge = currentInputEdges.pop();
    if (currentInputEdges.length == 0) {
      delete sinkInputs[currentInput.sourceAddress];
    }

    if (!currentInputEdge) {
      throw new Error(``);
    }

    pathArr.push({
      from: currentInputEdge.from,
      to: currentInputEdge.to,
      value: currentInputEdge.value,
      tokenOwner: currentInputEdge.tokenOwner
    });


    // Todo: Follow the input edge depth first
    // @ts-ignore
    const followStack: TransitiveTransfer[] = [currentInputEdge];

    while (followStack.length) {
      const followByMostValuablePath = followStack.pop();

      if (!followByMostValuablePath) {
        throw new Error(``);
      }

      const {
        sinkInputs,
        sinkInputSources
      } = getInputsOrderedByValue(adjacencyList, followByMostValuablePath.from);

      const currentInput = sinkInputSources.pop();
      if (!currentInput) {
        break;
      }

      const currentInputEdges = sinkInputs[currentInput.sourceAddress];
      for (let i = 0; i < currentInputEdges.length; i++) {
        // Remove the nodes we already visited
        const currentInputEdge = currentInputEdges.pop();
        if (!currentInputEdge) {
          throw new Error(``);
        }

        pathArr.push({
          from: currentInputEdge.from,
          to: currentInputEdge.to,
          value: currentInputEdge.value,
          tokenOwner: currentInputEdge.tokenOwner
        });

        if (currentInputEdges.length == 0) {
          delete sinkInputs[currentInput.sourceAddress];
        }

        followStack.push(currentInputEdge);
      }
    }

    paths.push(pathArr);
    pathArr = [];
  }

  const effectiveCapacity = (connections: { from: string, to: string, value: string, tokenOwner: string }[]) => new BN(connections[connections.length - 1].value);

  paths.sort((a, b) => {
    const aC = effectiveCapacity(a);
    const bC = effectiveCapacity(b);
    return aC.gt(bC) ? -1 : aC.lt(bC) ? 1 : 0
  });
  // allConnections = allConnections.filter(o => o[o.length - 1].to == to);

  let effectiveTransferValue: BN = new BN("0");
  let effectiveTokenTransfers: number = 0;
  let effectiveConnections: { from: string, to: string, value: string, tokenOwner: string }[][] = [];

  for (let i = 0; i < paths.length; i++) {
    const connection = paths[i];
    /*
    if (effectiveTokenTransfers + connection.length > 50) {
      console.log("Reached 50 transfers")
      break;
    }
     */
    effectiveConnections.push(connection);
    effectiveTransferValue = effectiveTransferValue.add(effectiveCapacity(connection));
    effectiveTokenTransfers += connection.length;
  }

  const pathToValidate = <TransitivePath>{
    flow: effectiveTransferValue.gt(amount) ? amount.toString() : effectiveTransferValue.toString(),
    requestedAmount: amountInWei,
    success: effectiveTransferValue.gt(amount),
    transfers: effectiveConnections.flatMap(o =>
      o.map(p => {
        return <TransitiveTransfer>{
          ...p
        };
      })
    )
  };
  //console.log(pathToValidate);

  const amountInEth = parseInt(effectiveTransferValue.div(new BN("1000000000000000000")).toString());

  const graphviz = "digraph G {\n" + effectiveConnections.map(o => {
    return o.map(o => {
      const valueInEth = parseInt(new BN(o.value).div(new BN("1000000000000000000")).toString());
      let penWidth = (amountInEth * 0.01) * (valueInEth / amountInEth);
      penWidth = penWidth < 0.5 ? 0.5 : penWidth;
      const edgeColor = o.tokenOwner == to ? "#00ff00" : o.tokenOwner == from ? "#ff0000" : "#000000";
      const edgeLabel = `${o.tokenOwner.substring(0, 9)}\n(${valueInEth})`;
      const style = valueInEth < 1 ? "dashed" : "solid";
      const labelColor = valueInEth < 1 ? "#8f8f8f" : edgeColor;
      return `\t"${o.from.substring(0, 9)}" -> "${o.to.substring(0, 9)}"` +
        ` [style="${style}" penwidth=${penWidth} color="${edgeColor}" label="${edgeLabel}" weight="${valueInEth}" decorate="false" labelfloat="true" fontcolor="${labelColor}"]`
    })
      .join("\n");
  }).join("\n") + "\n}";

  console.info(graphviz);
}