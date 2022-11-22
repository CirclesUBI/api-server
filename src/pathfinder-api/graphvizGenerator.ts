import {BalanceList, FlowGraph, Node, PathWalker, Transfers} from "./pathParser";
import BN from "bn.js";
import {RpcGateway} from "../circles/rpcGateway";
import {PathValidator} from "./pathValidator";
import {Environment} from "../environment";
import {ProfileLoader} from "../querySources/profileLoader";
import {ProfilesBySafeAddressLookup} from "../resolvers/queries/profiles";
import {Profile, TransitivePath} from "../types";
import {DefaultBalanceProvider} from "./defaultBalanceProvider";

export class GraphvizGenerator {
  static async generate(flowEth: number, flowGraph: FlowGraph, transitivePath?:TransitivePath) {
    let graphvizDefinition = "";

    let isOk = true;
    if (transitivePath) {
      const pathHasErrors = await PathValidator.validate(transitivePath);
      if (pathHasErrors.error) {
        isOk = false;
        console.error(`Invalid path call data: ${pathHasErrors.calldata}`);
      }
    }

    graphvizDefinition += `digraph G {
       graph [fontname = "helvetica"];
       node [fontname = "helvetica"];
       edge [fontname = "helvetica" style="${isOk ? "solid" : "dashed"}" color="${isOk ? "blue" : "red"}"];
    `;

    function formatWei(value: BN | string) {
      return parseFloat(RpcGateway.get().utils.fromWei(value, "ether")).toFixed(4);
    }

    const getBalanceRow = (token: string, balance: BN, annotation?: string, prefix?: string) => {
      return `
                         <TR border="0" ${annotation ? 'bgcolor="#ff0000"' : ""}>
                           <TD border="0" ${annotation ? 'bgcolor="#ff0000"' : ""} align="left" ><font face="Liberation Mono" color="${prefix ?? ""}${annotation ? '#ffffff' : "#000000"}" >${tokenLabel(token, false, true)}</font></TD>
                           <TD border="0" ${annotation ? 'bgcolor="#ff0000"' : ""} align="right" ><font face="Liberation Mono" color="${annotation ? '#ffffff' : "#000000"}">${formatWei(balance)}${annotation ? " - " + annotation : ""}</font></TD>
                         </TR>`
    }


    const shortenString = (address: string) => address.substring(0, 12) + "..";
    let profilesLookup: ProfilesBySafeAddressLookup = {};

    function displayName(profile: Profile | null) {
      let displayName = `${profile?.firstName ?? ""}`;
      if (profile?.lastName) {
        displayName += ` ${profile.lastName}`;
      }
      return displayName;
    }

    function tokenLabel(tokenOwner: string, alwaysShorten?: boolean, dontShorten?: boolean) {
      let tokenOwnerName = displayName(profilesLookup[tokenOwner]);
      if (tokenOwnerName.length == 0 || (tokenOwnerName.toLowerCase() == tokenOwner.toLowerCase() && tokenOwner.length == 42)) {
        if (!alwaysShorten || dontShorten)
          return tokenOwner;
        else
          return shortenString(tokenOwner);
      }
      return dontShorten ? `${tokenOwner} ${tokenOwnerName}` : shortenString(tokenOwner) + " " + tokenOwnerName;
    }

    function collectProfilesToLoad(o: [string, Transfers[]], profileAddresses: { [p: string]: any }) {
      if (!profilesLookup[o[0]]) {
        profileAddresses[o[0]] = true;
      }
      o[1].forEach(t => {
        if (!profilesLookup[t.to]) {
          profileAddresses[t.to] = true;
        }
        if (!profilesLookup[t.from]) {
          profileAddresses[t.from] = true;
        }
      });
    }

    let trustRelations:{[from:string]: {[canSendTo:string]: number}} = {};

    await new PathWalker(flowGraph, "out").walk({
      async visitNode(address: string, node: Node) {

        // Find all addresses referenced by this node
        const profileAddresses: { [x: string]: any } = {};
        const currentBalances = (await new DefaultBalanceProvider().getTokenBalances(address)).toLookup(
          o => o.tokenOwner,
          o => o.balance);

        Object.keys(currentBalances).forEach(o => profileAddresses[o] = true);
        Object.keys(node.inEdges).forEach(o => profileAddresses[o] = true);
        Object.keys(node.outEdges).forEach(o => profileAddresses[o] = true);

        // Load all profiles that haven't been cached by now
        if (Object.keys(profileAddresses).length > 0) {
          profilesLookup = {
            ...profilesLookup,
            ...(await new ProfileLoader().profilesBySafeAddress(Environment.readonlyApiDb, Object.keys(profileAddresses)))
          };
        }

        const crcTrustQuery = `
          select "user", "can_send_to", "limit"
          from cache_crc_current_trust
          where "user"=ANY($1) or can_send_to=ANY($1)`;

        trustRelations = (await Environment.indexDb.query(
          crcTrustQuery,
          [Object.keys(profileAddresses).concat([address])]))
          .rows.reduce((p, c) => {
            if (!p[c.can_send_to]) {
              p[c.can_send_to] = {};
            }
            p[c.can_send_to][c.user] = c.limit;
            return p;
          }, trustRelations);

        const totalCrcBalanceQuery = `
          select token
          from crc_signup_2
          where "user" = $1`;

        const profile = profilesLookup[node.address];
        const balanceResult = await Environment.indexDb.query(
          totalCrcBalanceQuery,
          [profile?.circlesAddress]);

        const isOrga = profile?.type == "ORGANISATION" || balanceResult.rows.length == 0;

        const allTokensInEdges =
          Object.values(node.inEdges)
          .concat(Object.values(node.outEdges))
          .flatMap(o => o)
          .map(o => o.tokenOwner)
          .toLookup(o => o);

        // Merge all balances
        const rows = Object.keys(allTokensInEdges).concat((!isOrga && !allTokensInEdges[address]) ? [address] : [])
          .filter(o => allTokensInEdges[o] || (!isOrga && o == address))
          .sort((a,b) => {
            return a === address && b !== address
              ? -1
              : (currentBalances[a] ?? new BN("0")).gt((currentBalances[b] ?? new BN("0")))
                ? -1
                : (currentBalances[a] ?? new BN("0")).lt((currentBalances[b] ?? new BN("0")))
                  ? 1
                  : 0;
          })
          .map((o, index) => {
            // First show the address and current balance (can be '0').
            const current = currentBalances[o] ?? new BN("0");
            const trust = trustRelations[address][o] ?? new BN("0");
            let str = index == 0 ? `
                   <TR border="0">
                     <TD border="0" align="left"><font face="Liberation Mono"><B>${tokenLabel(o, false, true)} (${trust} %)</B></font></TD>
                     <TD border="0" align="right"><font face="Liberation Mono"><B>${formatWei(current.toString())}</B></font></TD>
                   </TR>` : `
                   <TR border="0">
                     <TD border="0" align="left"><font face="Liberation Mono"><B>${tokenLabel(o, false, true)} (${trust} %)</B></font></TD>
                     <TD border="0" align="right"><font face="Liberation Mono">${formatWei(current.toString())}</font></TD>
                   </TR>`;

            const inTransfers = Object.values(node.inEdges).flatMap(p => p).filter(p => p.tokenOwner == o);
            const outTransfers = Object.values(node.outEdges).flatMap(p => p).filter(p => p.tokenOwner == o);
            let childCount = inTransfers.length + outTransfers.length;

            str += inTransfers.map((inflow, index) => {
              childCount--;
              currentBalances[o] = (currentBalances[o] ?? new BN("0")).add(new BN(inflow.value))
              if (childCount == 0) {
                childCount--;
                return index == inTransfers.length -1 ? `
                   <TR border="0">
                     <TD border="0" align="left" ><font face="Liberation Mono" COLOR="green">+ ${formatWei(inflow.value).padStart(12, " ")} from </font> ${tokenLabel(inflow.from, true)}</TD>
                     <TD border="0" align="right" ><font face="Liberation Mono"><B>${formatWei(currentBalances[o])}</B></font></TD>
                   </TR>` : `
                   <TR border="0">
                     <TD border="0" align="left" ><font face="Liberation Mono" COLOR="green">+ ${formatWei(inflow.value).padStart(12, " ")} from </font> ${tokenLabel(inflow.from, true)}</TD>
                     <TD border="0" align="right"><font face="Liberation Mono"><B>${formatWei(currentBalances[o])}</B></font></TD>
                   </TR>`
              }
              return index == inTransfers.length -1 ? `
                   <TR border="0">
                     <TD border="0" align="left" ><font face="Liberation Mono" COLOR="green">+ ${formatWei(inflow.value).padStart(12, " ")} from </font> ${tokenLabel(inflow.from, true)}</TD>
                     <TD border="0" align="right" ><font face="Liberation Mono">${formatWei(currentBalances[o])}</font></TD>
                   </TR>` : `
                   <TR border="0">
                     <TD border="0" align="left" ><font face="Liberation Mono" COLOR="green">+ ${formatWei(inflow.value).padStart(12, " ")} from </font> ${tokenLabel(inflow.from, true)}</TD>
                     <TD border="0" align="right"><font face="Liberation Mono">${formatWei(currentBalances[o])}</font></TD>
                   </TR>`
            }).join("") ?? "";

            str += outTransfers.map((outflow, index) => {
              childCount--;
              currentBalances[o] = currentBalances[o].sub(new BN(outflow.value))
              if (childCount == 0) {
                childCount--;
                return index == outTransfers.length -1 ? `
                   <TR border="0">
                     <TD border="0" align="left" ><font face="Liberation Mono" COLOR="red">- ${formatWei(outflow.value).padStart(12, " ")} to   </font> ${tokenLabel(outflow.to, true)}</TD>
                     <TD border="0" align="right" ><font face="Liberation Mono"><B>${formatWei(currentBalances[o])}</B></font></TD>
                   </TR>` : `
                   <TR border="0">
                     <TD border="0" align="left" ><font face="Liberation Mono" COLOR="red">- ${formatWei(outflow.value).padStart(12, " ")} to   </font> ${tokenLabel(outflow.to, true)}</TD>
                     <TD border="0" align="right"><font face="Liberation Mono"><B>${formatWei(currentBalances[o])}</B></font></TD>
                   </TR>`
              }
              return index == outTransfers.length -1 ? `
                   <TR border="0">
                     <TD border="0" align="left" ><font face="Liberation Mono" COLOR="red">- ${formatWei(outflow.value).padStart(12, " ")} to   </font> ${tokenLabel(outflow.to, true)}</TD>
                     <TD border="0" align="right" ><font face="Liberation Mono">${formatWei(currentBalances[o])}</font></TD>
                   </TR>` : `
                   <TR border="0">
                     <TD border="0" align="left" ><font face="Liberation Mono" COLOR="red">- ${formatWei(outflow.value).padStart(12, " ")} to   </font> ${tokenLabel(outflow.to, true)}</TD>
                     <TD border="0" align="right"><font face="Liberation Mono">${formatWei(currentBalances[o])}</font></TD>
                   </TR>`
            }).join("") ?? "";

              return str;
          }).join(" ");


        let name = displayName(profile);

        const table = `<TABLE BORDER="1"
                              CELLBORDER="0"
                              CELLPADDING="3"
                              CELLSPACING="3">
                         <TR CELLSPACING="0" 
                             CELLPADDING="0">
                           <TD COLSPAN="2"
                               BGCOLOR="${isOrga ? "#e4f5d0" : "#d2e0f8"}">
                            <B><font color="${isOrga ? "#000000" : "#000000"}" POINT-SIZE="24">${name}</font></B>
                           </TD>
                         </TR>
                         <TR CELLSPACING="0" 
                             CELLPADDING="0">
                           <TD COLSPAN="2" 
                               BGCOLOR="${isOrga ? "#e4f5d0" : "#d2e0f8"}">
                            <font color="${isOrga ? "#000000" : "#000000"}">(${address})</font>
                           </TD>
                         </TR>${rows}
                       </TABLE>`;

        graphvizDefinition += `  "${node.address}" [shape=none label=<${table}>];`;
      },
      async visitEdge(from: string, to: string, totalAmount: string, transfers: BalanceList) {
        const valueInEth = parseInt(new BN(totalAmount).div(new BN("1000000000000000000")).toString());
        let penWidth = (flowEth * 0.01) * (valueInEth / flowEth);
        penWidth = penWidth < 0.5 ? 0.5 : penWidth;

        const outBalanceRows = await Promise.all(Object.entries(transfers)
          .sort((a, b) => a[1].gt(b[1]) ? -1 : a[1].lt(b[1]) ? 1 : 0)
          .map(async o => {
            if (!profilesLookup[o[0]]) {
              profilesLookup = {
                ...profilesLookup,
                ...(await new ProfileLoader().profilesBySafeAddress(Environment.readonlyApiDb, [o[0]]))
              };
            }

            const edgeLabel = tokenLabel(o[0], true);

            return getBalanceRow(
              edgeLabel,
              o[1]);
          }));
        const table = `<TABLE border="0">
                         <TR>
                           <TD align="left"><B>Total</B></TD>
                           <TD right="left"><B><font face="Liberation Mono">${formatWei(totalAmount)}</font></B></TD>
                         </TR>${outBalanceRows}
                       </TABLE>`;
        graphvizDefinition += `  "${from}" -> "${to}" [penwidth=${penWidth} decorate=true label=<${table}>];`;
      }
    });
    graphvizDefinition += "}";

    return graphvizDefinition;
  }
}