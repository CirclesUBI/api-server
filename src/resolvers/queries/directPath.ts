import {QueryDirectPathArgs, TransitivePath, TransitiveTransfer} from "../../types";
import {AbiItem} from "web3-utils";
import {RpcGateway} from "../../circles/rpcGateway";
import BN from "bn.js";
import {Context} from "../../context";
import {Environment} from "../../environment";
import {convertCirclesToTimeCircles} from "../../utils/timeCircles";
import {TokenWithBalanceAndLimit, BalanceQueries} from "../../querySources/balanceQueries";
import fetch from "cross-fetch";

type TokenWithBalanceAndMaxTransferableAmount = TokenWithBalanceAndLimit & {
  maxTransferableAmount: BN
}

/*
const zeroBN = new BN("0")
const oneHundred = new BN("100")
*/

export const directPath = async (parent: any, args: QueryDirectPathArgs, context: Context) => {
  const from = args.from.toLowerCase();
  const to = args.to.toLowerCase();

  const path = await findPath(from, to, args.amount);

  try {
    await validateTransfers(from, path);
  } catch (e) {
    console.log(e);
    (<any>path).error = e;
    (<any>path).isInvalid = true;
  }

  return path;
};

async function findDirectPath(from: string, to: string, amountInWei: string): Promise<TransitivePath> {

  const result = await fetch(Environment.pathfinderUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      method: "compute_transfer",
      params: {
        from,
        to,
        value: amountInWei,
        iterative: false,
        prune: true
      }
    })
  });

  const json = await result.json();
  const maxFlow = new BN(json.result.flow.toString().substring(2), "hex");

  const path = <TransitivePath>{
    flow: maxFlow.toString(),
    success: true,
    transfers: json.result.transfers.map((o: any) => {
      return <TransitiveTransfer>{
        from: o.from,
        to: o.to,
        tokenOwner: o.token_owner,
        value: (new BN(o.value.toString().substring(2), "hex")).toString(),
        // token: o.token_owner
      };
    })
  };

  return path;
  /*
    const recipientIsOrganization = (await Environment.indexDb.query(`
            select hash
            from crc_organisation_signup_2
            where organisation = $1`,
      [to])).rowCount > 0;

    // 1) Get the balances of all tokens of "from" that are accepted by "to"
    const acceptedTokensWithBalance = await BalanceQueries.getAcceptedTokensWithBalanceAndLimit(from, to);

    // 2) Get the balance of each owner's own token holdings
    const allTokenOwners = Object.keys(acceptedTokensWithBalance.toLookup(o => o.tokenOwner));
    const tokenOwnerOwnTokenBalances = await BalanceQueries.getTokenOwnerOwnTokenBalances(
      !allTokenOwners.find(o => o == to)
        ? allTokenOwners.concat([to])
        : allTokenOwners);
    const tokenOwnersOwnBalancesLookup = tokenOwnerOwnTokenBalances.toLookup(o => o.tokenOwner, o => o.balance);

    // 3) Get the receiver's current balance of every transferable token
    const receiverTokenBalances = await BalanceQueries.getReceiverTokenBalances(to, allTokenOwners);
    const receiverTokenBalancesLookup = receiverTokenBalances.toLookup(o => o.tokenOwner, o => o.balance);

    // const tokenOwnersOwnTokenBalance = tokenOwnerOwnTokenBalances.find(o => o.tokenOwner == to);

    // 4) Calculate the max. transferable amount of each token:
    //    * Get the destination's balance of their own token
    //    * multiply it with the limit that's set for the relation:
    //      'tokenOwner' -can-send-to-> 'to' of each transferable token
    //    * divide by 100
    //
    // Original code:
    // uint256 max = (userToToken[dest].balanceOf(dest).mul(limits[dest][tokenOwner])).div(oneHundred);
    const acceptedTokensWithMaxTransferableAmount = acceptedTokensWithBalance.map(o => {
      // The owner of a token always accepts all of their tokens
      let max = (o.tokenOwner == to || recipientIsOrganization)
        ? o.balance
        : tokenOwnersOwnBalancesLookup[to].mul(o.limitBn).div(oneHundred);

      // Subtract the current holdings of the receivers from the max transferable amount:
      // userToToken[tokenOwner].balanceOf(dest).mul(oneHundred.sub(limits[dest][tokenOwner])).div(oneHundred)
      if (!recipientIsOrganization) {
        const destBalance = receiverTokenBalancesLookup[o.tokenOwner];
        if (destBalance) {
          if (max.lt(destBalance)) {
            // if trustLimit has already been overridden by a direct transfer, nothing more can be sent
            max = zeroBN;
          } else {
            const destBalanceScaled = destBalance.mul(oneHundred.sub(o.limitBn)).div(oneHundred);
            max = max.sub(destBalanceScaled);
          }
        token: o.token_owner
      };
    })
  };
}

async function findDirectPath(from: string, to: string, amountInWei: string) : Promise<TransitivePath> {
  const recipientIsOrganization = (await Environment.indexDb.query(`
          select hash
          from crc_organisation_signup_2
          where organisation = $1`,
    [to])).rowCount > 0;

  // 1) Get the balances of all tokens of "from" that are accepted by "to"
  const acceptedTokensWithBalance = await BalanceQueries.getAcceptedTokensWithBalanceAndLimit(from, to);

  // 2) Get the balance of each owner's own token holdings
  const allTokenOwners = Object.keys(acceptedTokensWithBalance.toLookup(o => o.tokenOwner));
  const tokenOwnerOwnTokenBalances = await BalanceQueries.getTokenOwnerOwnTokenBalances(
    !allTokenOwners.find(o => o == to)
      ? allTokenOwners.concat([to])
      : allTokenOwners);
  const tokenOwnersOwnBalancesLookup = tokenOwnerOwnTokenBalances.toLookup(o => o.tokenOwner, o => o.balance);

  // 3) Get the receiver's current balance of every transferable token
  const receiverTokenBalances = await BalanceQueries.getReceiverTokenBalances(to, allTokenOwners);
  const receiverTokenBalancesLookup = receiverTokenBalances.toLookup(o => o.tokenOwner, o => o.balance);

  // const tokenOwnersOwnTokenBalance = tokenOwnerOwnTokenBalances.find(o => o.tokenOwner == to);

  // 4) Calculate the max. transferable amount of each token:
  //    * Get the destination's balance of their own token
  //    * multiply it with the limit that's set for the relation:
  //      'tokenOwner' -can-send-to-> 'to' of each transferable token
  //    * divide by 100
  //
  // Original code:
  // uint256 max = (userToToken[dest].balanceOf(dest).mul(limits[dest][tokenOwner])).div(oneHundred);
  const acceptedTokensWithMaxTransferableAmount = acceptedTokensWithBalance.map(o => {
    // The owner of a token always accepts all of their tokens
    let max = (o.tokenOwner == to || recipientIsOrganization)
      ? o.balance
      : tokenOwnersOwnBalancesLookup[to].mul(o.limitBn).div(oneHundred);

    // Subtract the current holdings of the receivers from the max transferable amount:
    // userToToken[tokenOwner].balanceOf(dest).mul(oneHundred.sub(limits[dest][tokenOwner])).div(oneHundred)
    if (!recipientIsOrganization) {
      const destBalance = receiverTokenBalancesLookup[o.tokenOwner];
      if (destBalance) {
        if (max.lt(destBalance)) {
          // if trustLimit has already been overridden by a direct transfer, nothing more can be sent
          max = zeroBN;
        } else {
          const destBalanceScaled = destBalance.mul(oneHundred.sub(o.limitBn)).div(oneHundred);
          max = max.sub(destBalanceScaled);
        }
      }

      const r = <TokenWithBalanceAndMaxTransferableAmount>{
        ...o,
        maxTransferableAmount: max.lte(o.balance)
          ? max
          : o.balance
      };

      (<any>r).maxTransferableAmountStr = r.maxTransferableAmount.toString();
      return r;
    })
    .filter(o => o.maxTransferableAmount.gt(zeroBN));

    // 5) Try to saturate the full transfer amount with the accepted token balances in the following order:
    //    1. Use all the receiver's own tokens first
    //    2. Then use all other tokens ordered by 'balance desc' except the own ones
    //    3. If 1. and 2. aren't sufficient then use the own tokens as well
    const transferAmountInWei = new BN(amountInWei);
    let remainingAmountInWei = new BN(amountInWei);

    const transferAmountInEur = convertCirclesToTimeCircles(
      parseFloat(RpcGateway.get().utils.fromWei(amountInWei, "ether"))) / 10;

    const receiversOwnTokens = acceptedTokensWithMaxTransferableAmount.find(o => o.tokenOwner == to);
    const sendersOwnTokens = acceptedTokensWithMaxTransferableAmount.find(o => o.tokenOwner == from);
    const otherAcceptedTokens = acceptedTokensWithMaxTransferableAmount.filter(o => o.tokenOwner != from && o.tokenOwner != to);

    const transfer: TransitivePath = {
      success: false,
      requestedAmount: transferAmountInWei.toString(),
      flow: "",
      transfers: []
    };

    // Use recipient's tokens first (if any)
    if (receiversOwnTokens) {
      if (remainingAmountInWei.lte(receiversOwnTokens.maxTransferableAmount)) {
        // The transfer amount can be saturated entirely with the recipient's own tokens
        transfer.flow = transferAmountInWei.toString();
        if (transferAmountInWei.gt(zeroBN)) {
          transfer.transfers.push({
            token: receiversOwnTokens.token,
            tokenOwner: receiversOwnTokens.tokenOwner,
            value: transferAmountInWei.toString(),
            from: from,
            to: to
          });
        }
        remainingAmountInWei = remainingAmountInWei.sub(transferAmountInWei);
      } else {
        // Use all tokens and proceed
        transfer.flow = receiversOwnTokens.maxTransferableAmount.toString();
        if (receiversOwnTokens.maxTransferableAmount.gt(zeroBN)) {
          transfer.transfers.push({
            token: receiversOwnTokens.token,
            tokenOwner: receiversOwnTokens.tokenOwner,
            value: receiversOwnTokens.maxTransferableAmount.toString(),
            from: from,
            to: to
          });
        }
        remainingAmountInWei = remainingAmountInWei.sub(receiversOwnTokens.maxTransferableAmount);
      }
    }

    if (remainingAmountInWei.eq(new BN("0"))){
      return transfer;
    }

    // More tokens are needed. Use the other accepted tokens.
    let rowIndex = 0;

    while (remainingAmountInWei.gt(zeroBN) && rowIndex < otherAcceptedTokens.length) {
      const currentBalanceRow = otherAcceptedTokens[rowIndex];
      const remainingAfterThis = remainingAmountInWei.sub(currentBalanceRow.maxTransferableAmount);

      if (remainingAfterThis.gt(new BN("0"))) {
        // Transfer wouldn't be saturated. Also use the next balance.
        remainingAmountInWei = remainingAfterThis;
        transfer.flow = new BN(transfer.flow).add(currentBalanceRow.maxTransferableAmount).toString();
        if (currentBalanceRow.maxTransferableAmount.gt(zeroBN)) {
          transfer.transfers.push({
            token: currentBalanceRow.token,
            tokenOwner: currentBalanceRow.tokenOwner,
            value: currentBalanceRow.maxTransferableAmount.toString(),
            from: from,
            to: to
          });
        }
        rowIndex++;
      } else if (remainingAfterThis.lt(zeroBN)) {
        // Transfer would be over-saturated. Stop at this balance and only take the necessary part.
        const partialAmount = currentBalanceRow.maxTransferableAmount.add(remainingAfterThis);
        remainingAmountInWei = remainingAmountInWei.sub(partialAmount);
        transfer.flow = new BN(transfer.flow).add(partialAmount).toString();
        if (partialAmount.gt(zeroBN)) {
          transfer.transfers.push({
            token: currentBalanceRow.token,
            tokenOwner: currentBalanceRow.tokenOwner,
            value: partialAmount.toString(),
            from: from,
            to: to
          });
        }
        break;
      } else {
        // Perfect. Stop and use the whole balance.
        remainingAmountInWei = remainingAmountInWei.sub(currentBalanceRow.maxTransferableAmount);
        transfer.flow = new BN(transfer.flow).add(currentBalanceRow.maxTransferableAmount).toString();
        if (currentBalanceRow.maxTransferableAmount.gt(zeroBN)) {
          transfer.transfers.push({
            token: currentBalanceRow.token,
            tokenOwner: currentBalanceRow.tokenOwner,
            value: currentBalanceRow.maxTransferableAmount.toString(),
            from: from,
            to: to
          });
        }
        break;
      }
    }

    if (remainingAmountInWei.eq(new BN("0"))){
      return transfer;
    }

    // Still more tokens are needed. Use own tokens.
    if (sendersOwnTokens) {
      if (remainingAmountInWei.lte(sendersOwnTokens.maxTransferableAmount)) {
        transfer.flow = new BN(transfer.flow).add(remainingAmountInWei).toString();
        if (remainingAmountInWei.gt(zeroBN)) {
          transfer.transfers.push({
            token: sendersOwnTokens.token,
            tokenOwner: sendersOwnTokens.tokenOwner,
            value: remainingAmountInWei.toString(),
            from: from,
            to: to
          });
        }
        remainingAmountInWei = remainingAmountInWei.sub(remainingAmountInWei);
      } else {
        transfer.flow = new BN(transfer.flow).add(sendersOwnTokens.maxTransferableAmount).toString();
        if (sendersOwnTokens.maxTransferableAmount.gt(zeroBN)) {
          transfer.transfers.push({
            token: sendersOwnTokens.token,
            tokenOwner: sendersOwnTokens.tokenOwner,
            value: sendersOwnTokens.maxTransferableAmount.toString(),
            from: from,
            to: to
          });
        }
        remainingAmountInWei = remainingAmountInWei.sub(sendersOwnTokens.maxTransferableAmount);
      }
    }

    if (remainingAmountInWei.eq(new BN("0"))){
      return transfer;
    }

    // Couldn't find a path with enough liquidity
    transfer.transfers = [];
    return transfer;

   */
}

async function validateTransfers(sender: string, transfers: TransitivePath) {
  var token = [];
  var from = [];
  var to = [];
  var value = [];
  for (let step of transfers.transfers) {
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
    ]).substr(2)/* remove preceding 0x */;


  console.log(`'cast' command:`);
  console.log(`cast call '0x29b9a7fBb8995b2423a71cC17cf9810798F6C543' 'transferThrough(address[],address[],address[],uint256[])' '[${token.join(',')}]' '[${from.join(',')}]' '[${to.join(',')}]' '[${value}]' --rpc-url https://rpc.gnosischain.com --from ${sender} 0x`);
  try {
    await RpcGateway.get().eth.call({
      from: from[0],
      to: Environment.circlesHubAddress,
      data: callData
    });
    return true;
  } catch (e) {
    console.log(e);
    throw new Error("Cannot validate the following path: " + JSON.stringify(transfers, null, 2));
  }
}
