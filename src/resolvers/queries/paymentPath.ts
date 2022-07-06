import {QueryDirectPathArgs, TransitivePath} from "../../types";
import {Context} from "../../context";
import {directPath} from "./directPath";
import BN from "bn.js";
import {Environment} from "../../environment";

export const paymentPath = async (parent: any, args: QueryDirectPathArgs, context: Context) => {

  const directPathResult = await directPath(parent, args, context);
  if (new BN(directPathResult.flow).eq(new BN(directPathResult.requestedAmount))) {
    // direct path payment is possible
    return directPathResult;
  }

  // Try the pathfinder
  // const pathfinderResult:TransitivePath = await pathfinder(parent, args, context);
  // if (new BN(pathfinderResult.flow).eq(new BN(pathfinderResult.requestedAmount))) {
  //   // pathfinder payment is possible
  //   return pathfinderResult;
  // }

  // Try to send "trusted" circles (all circles with face-ident)

  // 1. Find all circles with face-ident owned by the sender
  const sql = `
    with verified_tokens as (
        select user_token
        from crc_current_trust_2
        where can_send_to = $1 -- Humanode orga address
        and "limit" = 100
    ), sender_balances as (
        select safe_address, token, token_owner, balance
        from cache_crc_balances_by_safe_and_token
        where safe_address = $2 -- Sender address
    )
    select safe_address, token, token_owner, balance::text
    from sender_balances sb
    join verified_tokens vt on vt.user_token = sb.token
    where balance > 0;`;

  const myTrustedTokensResult = await Environment.indexDb.query(sql, [
    Environment.humanodeOrgaSafeAddress,
    args.from]);


  return <TransitivePath>{
    success: false,
    flow: "0",
    requestedAmount: "1",
    transfers: []
  };
}
