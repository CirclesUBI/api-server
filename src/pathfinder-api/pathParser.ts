import {TransitivePath} from "../types";
import BN from "bn.js";

export type Transfers = {
  from: string
  to: string
  value: string
  tokenOwner: string
};

export type AggregateEdge = {
  from: string
  to: string
  tokens: BalanceList
  totalTokens: string
}

export type Edges = {
  [address: string]: Transfers[]
};

export type BalanceList = {
  [tokenOwner: string]: BN
};

export type Node = {
  address: string
  inBalance: BalanceList
  inBalanceTotal: string
  outBalance: BalanceList
  outBalanceTotal: string
  inEdges: Edges
  outEdges: Edges
};

export type NodeLookup = {
  [address: string]: Node
};

export class FlowGraph {
  readonly source: string;
  readonly sink: string;

  private readonly _path: TransitivePath;
  private readonly _nodes: NodeLookup;
  // private readonly _edges: Transfers[] = [];

  constructor(path: TransitivePath) {
    this._path = JSON.parse(JSON.stringify(path));
    const {nodes, source, sink} = this.buildGraphFromPath(path);

    if (!source) {
      throw new Error(`The flow graph has no unique source node.`);
    }
    if (!sink) {
      throw new Error(`The flow graph has no unique sink node.`);
    }

    this._nodes = nodes;
    this.source = source;
    this.sink = sink;
  }

  private buildGraphFromPath(path: TransitivePath) : {
    nodes: NodeLookup,
    source: string | undefined,
    sink: string | undefined
  } {
    const nodes = path.transfers.reduce((p, c) => {
      if (!p[c.from]) {
        p[c.from] = this.createEmptyNode(c.from);
      }
      if (!p[c.to]) {
        p[c.to] = this.createEmptyNode(c.to);
      }

      const edge: Transfers = {
        from: c.from,
        to: c.to,
        value: c.value,
        tokenOwner: c.tokenOwner
      };
      // this._edges.push(edge);

      if (!p[c.from].outEdges[c.to]) {
        p[c.from].outEdges[c.to] = [];
      }
      p[c.from].outEdges[c.to].push(edge);

      if (!p[c.from].outBalance[c.tokenOwner])
        p[c.from].outBalance[c.tokenOwner] = new BN("0");

      p[c.from].outBalance[c.tokenOwner] = p[c.from].outBalance[c.tokenOwner].sub(new BN(c.value));

      if (!p[c.to].inEdges[c.from]) {
        p[c.to].inEdges[c.from] = [];
      }
      p[c.to].inEdges[c.from].push(edge);

      if (!p[c.to].inBalance[c.tokenOwner])
        p[c.to].inBalance[c.tokenOwner] = new BN("0");

      p[c.to].inBalance[c.tokenOwner] = p[c.to].inBalance[c.tokenOwner].add(new BN(c.value));

      return p;
    }, <NodeLookup>{});

    const sourceAndSink = this.findSourceAndSink(nodes);
    return {
      ...sourceAndSink,
      nodes: nodes
    };
  }

  /**
   * Finds the source and the sink by calculating the in- and outBalanceTotals and selecting the node without in- or outflow.
   * @param nodes
   * @private
   */
  private findSourceAndSink(nodes:NodeLookup) {
    let source: string | undefined;
    let sink: string | undefined;

    for (let address in nodes) {
      const inEdgeCount = Object.keys(nodes[address].inEdges).length;
      if (source && inEdgeCount == 0) {
        throw new Error(`The flow graph has at least two sources: '${source}', '${address}'`);
      }
      if (inEdgeCount == 0) {
        source = address;
      }

      const outEdgeCount = Object.keys(nodes[address].outEdges).length;
      if (sink && outEdgeCount == 0) {
        throw new Error(`The flow graph has at least two sinks: '${sink}', '${address}'`);
      }
      if (outEdgeCount == 0) {
        sink = address;
      }

      const outBalances = nodes[address].outBalance;
      nodes[address].outBalanceTotal = Object.keys(outBalances).reduce((p, c) => {
        return p.add(outBalances[c]);
      }, new BN("0")).toString();

      const inBalances = nodes[address].inBalance;
      nodes[address].inBalanceTotal = Object.keys(inBalances).reduce((p, c) => {
        return p.add(inBalances[c]);
      }, new BN("0")).toString();

      if ((address != sink && address != source)
        && nodes[address].outBalanceTotal != "-" + nodes[address].inBalanceTotal) {
        throw new Error(`The in- and out amounts of node ${address} are out out of balance. Node receives ${nodes[address].inBalanceTotal}. Node sends: ${nodes[address].outBalanceTotal}`);
      }
    }

    return {source, sink};
  }

  private createEmptyNode(address: string) {
    return <Node>{
      inBalance: {},
      outBalance: {},
      address: address,
      outEdges: {},
      inEdges: {},
      inBalanceTotal: "",
      outBalanceTotal: ""
    };
  }

  getNode(address: string): Node {
    return this._nodes[address];
  }
}

export interface PathVisitor {
  visitEdge?(from: string, to: string, totalAmount: string, transfers: BalanceList) : Promise<void>
  visitTransfer?(from: string, to: string, tokenOwner: string, amount: BN) : Promise<void>
  visitNode?(address: string, node: Node) : Promise<void>
}

export class PathWalker {
  private readonly _flowGraph: FlowGraph;
  private readonly _direction: "in" | "out";
  private readonly _rootNode: Node;
  private readonly _stack: PathIteratorStep[] = [];

  constructor(flowGraph: FlowGraph, direction: "in" | "out") {
    this._flowGraph = flowGraph;
    this._direction = direction;
    this._rootNode = this._flowGraph.getNode(this._direction == "in" ? this._flowGraph.sink : this._flowGraph.source);

    this._stack.push(new PathIteratorStep(this._flowGraph, this._direction, this._rootNode));
  }

  async walk(visitor?: PathVisitor) : Promise<PathIteratorStep[]> {
    const pathEnds: PathIteratorStep[] = [];
    const nodeVisitHistory: {[address:string]:boolean} = {};
    const edgeVisitHistory: {[from_to:string]:boolean} = {};

    while (this._stack.length > 0) {
      const currentStep = this._stack.pop();
      if (!currentStep)
        throw new Error(`PathWalker: PathIteratorStep-stack contained 'null' or 'undefined' as entry.`);

      if (visitor?.visitNode && !nodeVisitHistory[currentStep.node.address]) {
        await visitor.visitNode(currentStep.node.address, currentStep.node);
        nodeVisitHistory[currentStep.node.address] = true;
      }

      if (visitor?.visitEdge || visitor?.visitTransfer) {
        if (currentStep.parent && currentStep.parent.node) {
          const parentStepNode = currentStep.parent.node;

          let transfers: Transfers[];
          if (this._direction == "out") {
            transfers = parentStepNode.outEdges[currentStep.node.address];
          } else {
            transfers = parentStepNode.inEdges[currentStep.node.address];
          }

          if (visitor.visitEdge && !edgeVisitHistory[`${parentStepNode.address}${currentStep.node.address}`]) {
            edgeVisitHistory[`${parentStepNode.address}${currentStep.node.address}`] = true;
            const {tokens, totalTokens} = this.sumBalances(transfers);
            await visitor.visitEdge(parentStepNode.address, currentStep.node.address, totalTokens.toString(), tokens);
          }

          if (visitor.visitTransfer) {
            await Promise.all(transfers.map(async transfer => {
              if (this._direction == "out") {
                if (transfer.from != parentStepNode.address) {
                  throw new Error(`Parser error`);
                }
                if (transfer.to != currentStep.node.address) {
                  throw new Error(`Parser error`);
                }
              } else {
                if (transfer.to != parentStepNode.address) {
                  throw new Error(`Parser error`);
                }
                if (transfer.from != currentStep.node.address) {
                  throw new Error(`Parser error`);
                }
              }
              if (visitor.visitTransfer) {
                await visitor.visitTransfer(parentStepNode.address, currentStep.node.address, transfer.tokenOwner, new BN(transfer.value));
              }
            }));
          }
        }
      }

      const nextSteps = currentStep.next().reverse();
      if (nextSteps.length == 0) {
        // Ended
        pathEnds.push(currentStep);
      }

      nextSteps.forEach(next => {
        this._stack.push(next);
      });
    }

    return pathEnds;
  }

  private sumBalances(nextParentEdges: Transfers[]) {
    const tokens = nextParentEdges.reduce((agg: BalanceList, edge: Transfers) => {
      agg[edge.tokenOwner] = new BN(edge.value);
      return agg;
    }, <BalanceList>{});

    const totalTokens = Object.values(tokens).reduce((p, c) => p.add(c), new BN("0")).toString();
    return {tokens, totalTokens};
  }
}

export class PathIteratorStep {
  get branchCount(): number {
    return this._branchCount;
  }
  private _branchCount: number = 0;

  readonly parent: PathIteratorStep | undefined = undefined;
  readonly node: Node;
  readonly _direction: "in" | "out";

  private readonly _graph: FlowGraph;

  constructor(graph: FlowGraph, direction: "in" | "out", current: Node, parent?: PathIteratorStep) {
    this._graph = graph;
    this._direction = direction;
    this.parent = parent;
    this.node = current;
  }

  next(): PathIteratorStep[] {
    let edges: Edges;
    if (this._direction == "in") {
      edges = this.node.inEdges;
    } else {
      edges = this.node.outEdges;
    }

    const nodes = Object.keys(edges).map(nextAddress => this._graph.getNode(nextAddress));
    nodes.sort((a, b) => {
      const valA = this._direction == "in" ? new BN(a.inBalanceTotal) : new BN(a.outBalanceTotal);
      const valB = this._direction == "in" ? new BN(b.inBalanceTotal) : new BN(b.outBalanceTotal);
      return valA.gt(valB) ? -1 : valA.lt(valB) ? 1 : 0;
    });

    const nextIteratorSteps = nodes.map(node => new PathIteratorStep(this._graph, this._direction, node, this));
    this._branchCount = nextIteratorSteps.length;

    return nextIteratorSteps;
  }
}
