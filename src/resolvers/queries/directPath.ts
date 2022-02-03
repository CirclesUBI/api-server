import {QueryDirectPathArgs, TransitivePath, TransitiveTransfer} from "../../types";
import {AbiItem} from "web3-utils";
import {RpcGateway} from "../../rpcGateway";
import BN from "bn.js";
import {Context} from "../../context";
import {Environment} from "../../environment";

export const checkSendLimit = async (tokenOwner:string, src:string, dest:string) => {

}

export const directPath = async (parent:any, args:QueryDirectPathArgs, context:Context) => {
  const from = args.from.toLowerCase();
  const to = args.to.toLowerCase();
  const requestedAmount = new BN(args.amount);

  let validateTransfers = async function (transfers: TransitivePath) {
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

    try {
      await RpcGateway.get().eth.call({
        from: from[0],
        to: Environment.circlesHubAddress,
        data: callData
      });
      return true;
    } catch(e) {
      console.log(e);
      throw new Error("Cannot validate the following path: " + JSON.stringify(transfers, null, 2));
    }
  };

  const usableTokensWithBalanceSql = `
    with my_tokens as (
      select token
      from crc_balances_by_safe_and_token_2
      where safe_address = $1
    ),
    accepted_tokens as (
      select user_token as token
      from crc_current_trust_2
      where can_send_to = $2
        and "limit" > 0
    ),
    intersection as (
      select *
      from my_tokens
      intersect
      select *
      from accepted_tokens
    ),
    relevant_balances as (
      select b.token, b.token_owner, b.balance as balance
      from intersection i
         join crc_balances_by_safe_and_token_2 b on i.token = b.token
      where safe_address = $1
        and balance > 0
      order by b.balance desc
    )
    select *
    from relevant_balances;`;

  const usableTokensWithBalanceResult =
      await Environment.indexDb.query(
          usableTokensWithBalanceSql, [
              from,
              to
          ]);

  const maxTheoreticallyTransferableAmount = usableTokensWithBalanceResult.rows.reduce((p,c) => p.add(new BN(c.balance)), new BN("0"));
  context.log(`The max. theoretically transferable amount is: ${maxTheoreticallyTransferableAmount.toString()}`);

  const tokenOwnerOwnTokenBalancesSql = `
    with own_balances as (
      select safe_address
           , token
           , token_owner
           , balance as owner_balance
      from crc_balances_by_safe_and_token_2 bbsat
      where bbsat.token_owner = ANY($3)
        and bbsat.token_owner = bbsat.safe_address
    ), own_balances_with_limits as (
      select ob.*, ct.can_send_to, ct."limit"
      from own_balances ob
             join crc_current_trust_2 ct on ct.can_send_to = $2
        and ct."user" = ob.safe_address
    ), including_sender_balances as (
      select o.*, m.balance as sender_balance
      from own_balances_with_limits o
             join crc_balances_by_safe_and_token_2 m on m.safe_address = $1
        and m.token = o.token
        and m.token_owner = o.token_owner
    ), including_receiver_balances as (
      select m.*, n.balance as receiver_balance
      from including_sender_balances m
             left join crc_balances_by_safe_and_token_2 n on n.safe_address = $2
        and n.token = m.token
        and n.token_owner = m.token_owner
    ), cleaned as (
      select token
           , token_owner
           , "limit"
           , owner_balance
           , coalesce(sender_balance, 0) src_balance
           , coalesce(receiver_balance, 0) dest_balance
      from including_receiver_balances
    ), max_transferable as (
      select cleaned.token_owner
           , cleaned.token
           , cleaned."limit"
           , cleaned.src_balance
           , cleaned.dest_balance
           -- uint256 max = (userToToken[dest].balanceOf(dest).mul(limits[dest][tokenOwner])).div(oneHundred);
           , ((select balance
               from crc_balances_by_safe_and_token_2
               where safe_address = $2
                 and token = (
                 select token
                 from crc_signup_2
                 where "user" = $2
                 limit 1)
              ) * cleaned."limit" / 100) as max
           , (dest_balance * (100 - cleaned."limit") / 100) as dest_balance_scaled
      from cleaned
    )
    select token
         , token_owner
         , max
         , dest_balance_scaled
         , (case when max < dest_balance
                  then 0
                else (
                  case when max - dest_balance_scaled > src_balance then src_balance else max - dest_balance_scaled end
                  )
      end)::decimal(48,0) as max_transferable_amount
    from max_transferable;`;

  const tokenOwners = usableTokensWithBalanceResult.rows.map(o => o.token_owner);
  const tokenOwnerOwnTokenBalancesResult = await Environment.indexDb.query(
      tokenOwnerOwnTokenBalancesSql, [
          from,
          to,
          tokenOwners
      ]);

  const tokenOwnersOwnTokenBalances:{[tokenOwner:string]:{
      token: string
      tokenOwner: string
      limit: number
      maxTransferableAmount: BN
      maxTransferableAmountStr: string
    }
  } = tokenOwnerOwnTokenBalancesResult.rows.reduce((p,c) => {
    p[c.token_owner] = {
      maxTransferableAmount: new BN(c.max_transferable_amount),
      token: c.token,
      tokenOwner: c.token_owner
    };

    p[c.token_owner].maxTransferableAmountStr = p[c.token_owner].maxTransferableAmount.toString();

    return p;
  }, <{
    [tokenOwner:string]:{
      token: string
      tokenOwner: string
      limit: number
      maxTransferableAmount: BN
      maxTransferableAmountStr: string
    }
  }>{});

  const usableTokensWithLimitResult = Object.values(tokenOwnersOwnTokenBalances);
  const maxPracticallyTransferableAmount = usableTokensWithLimitResult.reduce((p,c) => p.add(c.maxTransferableAmount), new BN("0"));
  context.log(`The max. practically transferable amount is: ${maxPracticallyTransferableAmount.toString()}`);

  if (requestedAmount.gt(maxTheoreticallyTransferableAmount)) {
    context.log(`The amount exceeds the max. theoretically transferable amount by ${requestedAmount.sub(maxTheoreticallyTransferableAmount).toString()} wei`);
  }
  if (requestedAmount.gt(maxPracticallyTransferableAmount)) {
    context.log(`The amount exceeds the max. practically transferable amount by ${requestedAmount.sub(maxPracticallyTransferableAmount).toString()} wei`);
    return <TransitivePath>{
      requestedAmount: requestedAmount.toString(),
      flow: maxPracticallyTransferableAmount.toString(),
      transfers: []
    };
  }

  const transfers: {
    token: string
    tokenOwner: string
    amount: BN
  }[] = [];

  const zeroBN = new BN("0")
  let remainingAmount = requestedAmount;
  let rowIndex = 0;

  while (remainingAmount.gt(zeroBN)) {
    const currentBalanceRow = usableTokensWithLimitResult[rowIndex];
    const remainingAfterThis = remainingAmount.sub(currentBalanceRow.maxTransferableAmount);

    if (remainingAfterThis.gt(new BN("0"))) {
      // Transfer wouldn't be saturated. Also use the next balance.
      remainingAmount = remainingAfterThis;
      transfers.push({
        token: currentBalanceRow.token,
        tokenOwner: currentBalanceRow.tokenOwner,
        amount: currentBalanceRow.maxTransferableAmount
      });
      rowIndex++;
    } else if (remainingAfterThis.lt(new BN("0"))) {
      // Transfer would be over-saturated. Stop at this balance and only take the necessary part.
      const partialAmount = currentBalanceRow.maxTransferableAmount.add(remainingAfterThis);
      transfers.push({
        token: currentBalanceRow.token,
        tokenOwner: currentBalanceRow.tokenOwner,
        amount: partialAmount
      });
      break;
    } else {
      // Perfect. Stop and use the whole balance.
      transfers.push({
        token: currentBalanceRow.token,
        tokenOwner: currentBalanceRow.tokenOwner,
        amount: currentBalanceRow.maxTransferableAmount
      });
      break;
    }
  }

  if (transfers.length > 20) {
    throw new Error(`The transfer would result in more than 20 steps.`);
  }

  const flow = transfers.reduce((p, c) => p.add(c.amount), new BN("0"));
  const path = <TransitivePath>{
    requestedAmount: requestedAmount.toString(),
    flow: flow.toString(),
    transfers: transfers.map(o => {
      return <TransitiveTransfer>{
        token: o.token,
        from: args.from,
        to: args.to,
        tokenOwner: o.tokenOwner,
        value: o.amount.toString()
      }
    })
  };

  await validateTransfers(path);

  return path;
};