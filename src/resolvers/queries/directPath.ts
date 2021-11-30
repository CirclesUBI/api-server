import {QueryDirectPathArgs, TransitivePath, TransitiveTransfer} from "../../types";
import {AbiItem} from "web3-utils";
import {RpcGateway} from "../../rpcGateway";
import BN from "bn.js";
import {getPool, HUB_ADDRESS} from "../resolvers";
import {Context} from "../../context";

export const directPath = async (parent:any, args:QueryDirectPathArgs, context:Context) => {
  const from = args.from.toLowerCase();
  const to = args.to.toLowerCase();

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
      await RpcGateway.get().eth.call({from: from[0], to: HUB_ADDRESS, data: callData});
      return true;
    } catch {
      throw new Error("Cannot validate the following path: " + JSON.stringify(transfers, null, 2));
    }
  };

  const sql = `
          with my_tokens as (
              select token
              from crc_balances_by_safe_and_token_2
              where safe_address = $1
          ),
               accepted_tokens as (
                   select user_token as token
                   from crc_current_trust_2
                   where can_send_to = $2
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
                   limit 5
               ),
               total as (
                   select sum(balance) as total
                   from relevant_balances
               ),
               distribution as (
                   select *, ((1 / (select total from total)) * balance) as weight
                   from relevant_balances
               ),
               price as (
                   select $3::numeric as price
               ),
               weighted_price_parts as (
                   select *
                        , (select * from price)                    as price
                        , (select * from price) * weight           as weighted_price_part
                        , trunc((select * from price) * weight, 0) as weighted_price_part_int
                   from distribution
               ),
               weighted_price_parts_sum as (
                   select sum(weighted_price_part_int)              as weighted_price_part_sum_int
                        , sum(weighted_price_part)                  as weighted_price_part_sum
                        , max(price) - sum(weighted_price_part_int) as weighted_price_error
                        , max(balance)                              as max_balance
                   from weighted_price_parts
               ),
               result as (
                   select token
                        , token_owner
                        , balance
                        , case
                              when (balance = (select max_balance from weighted_price_parts_sum))
                                  -- The token with the maximum balance must pay for previous rounding errors
                                  then weighted_price_part_int +
                                       (select weighted_price_error from weighted_price_parts_sum)
                       -- all others use the calculated int part
                              else weighted_price_part_int
                       end as weighted_price_part
                   from weighted_price_parts
                   order by weight asc
               )
          select token
               , token_owner
               , balance
               , weighted_price_part as amount
          from result;`;

  let requestedAmount = new BN(args.amount);

  const result = await getPool().query(sql, [from, to, requestedAmount.toString()]);
  const transfers: { token: string, tokenOwner: string, balance: BN, weighted_price_part: BN }[] = [];

  result.rows.forEach(o => {
    const item = {
      token: o.token,
      tokenOwner: o.token_owner,
      balance: new BN(o.balance),
      weighted_price_part: new BN(o.amount),
    };
    transfers.push(item);
  });

  const totalBalance = transfers.reduce((p, c) => p.add(c.balance), new BN("0"));
  if (requestedAmount.gt(totalBalance)) {
    // Not enough balance to perform the transaction
    return <TransitivePath>{
      requestedAmount: args.amount,
      flow: totalBalance.toString(),
      transfers: []
    };
  }

  const flow = transfers.reduce((p, c) => p.add(c.balance), new BN("0"));
  const path = <TransitivePath>{
    requestedAmount: requestedAmount.toString(),
    flow: flow.toString(),
    transfers: transfers.map(o => {
      return <TransitiveTransfer>{
        token: o.token,
        from: args.from,
        to: args.to,
        tokenOwner: o.tokenOwner,
        value: o.weighted_price_part.toString()
      }
    })
  };

  await validateTransfers(path);

  return path;
};