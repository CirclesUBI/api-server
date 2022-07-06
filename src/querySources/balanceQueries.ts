import {Environment} from "../environment";
import BN from "bn.js";

export type TokenBalance = {
  safeAddress: string,
  token: string;
  tokenOwner: string;
  balance: BN;
  balanceStr?: string;
};

export type TokenWithBalanceAndLimit = TokenBalance & {
  limit: number
  limitBn: BN
}

export class BalanceQueries {
  static async getHumanodeVerifiedTokens(from:string) {
    const sql = `
        with verified_tokens as (
            select user_token
            from crc_current_trust_2
            where can_send_to = $1 -- Humanode orga address
              and "limit" > 0
        ), sender_balances as (
            select safe_address, token, token_owner, balance
            from cache_crc_balances_by_safe_and_token
            where safe_address = $2 -- Sender address
        )
        select safe_address, token, token_owner, balance::text
        from sender_balances sb
                 join verified_tokens vt on vt.user_token = sb.token
        where balance::numeric > 0
        order by balance::numeric asc`;

    const myTrustedTokensResult = await Environment.indexDb.query(
      sql,
      [
        Environment.humanodeOrgaSafeAddress,
        from
      ]);

    const trustedTokenBalances = myTrustedTokensResult.rows.map(row => {
      return <TokenBalance>{
        safeAddress: row.safe_address,
        token: row.token,
        tokenOwner: row.token_owner,
        balance: new BN(row.balance),
        balanceStr: row.balance
      }
    });

    return trustedTokenBalances;
  }

  static async getReceiverTokenBalances(to: string, tokenOwners:string[])
    : Promise<TokenBalance[]> {
    const sql = `
    select token_owner, token, balance
    from cache_crc_balances_by_safe_and_token
    where token_owner = ANY($2)
      and safe_address = $1;`;

    const result = await Environment.indexDb.query(sql, [to, tokenOwners]);
    return result.rows.map(o => {
      return <TokenBalance>{
        safeAddress: to,
        token: o.token,
        tokenOwner: o.token_owner,
        balance: new BN(o.balance),
        balanceStr: o.balance,
      }
    });
  }

  static async getTokenOwnerOwnTokenBalances(tokenOwners:string[])
    : Promise<TokenBalance[]> {
    const sql = `
      select token_owner, token, balance, safe_address
      from cache_crc_balances_by_safe_and_token
      where token_owner = ANY($1)
        and safe_address = ANY($1)
        and token_owner = safe_address;`;

    const result = await Environment.indexDb.query(sql, [tokenOwners]);
    return result.rows.map(o => {
      return <TokenBalance>{
        safeAddress: o.safe_address,
        token: o.token,
        tokenOwner: o.token_owner,
        balanceStr: o.balance,
        balance: new BN(o.balance)
      }
    });
  }

  /**
   * Get the token balances of the sender that are directly trusted by the receiver.
   * @param from The sender
   * @param to The receiver
   */
  static async getAcceptedTokensWithBalanceAndLimit(from: string, to: string)
    : Promise<TokenWithBalanceAndLimit[]> {
    const acceptedTokensWithBalanceAndLimitSql = `
      with my_tokens as (
          select token
          from cache_crc_balances_by_safe_and_token
          where safe_address = $1
      ),
      accepted_tokens as (
          select user_token as token
          from cache_crc_current_trust
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
          select b.token, b.token_owner, b.balance
          from intersection i
          join cache_crc_balances_by_safe_and_token b on i.token = b.token
          where safe_address = $1
            and balance > 0
      ),
      relevant_balances_with_limits as (
          select b.token
               , b.token_owner
               , b.balance
               , t."limit"
          from cache_crc_current_trust t
          join relevant_balances b on b.token_owner = t."user" 
                                  and t.can_send_to = $2
      )
      select token
           , token_owner
           , balance::text
           , "limit"
      from relevant_balances_with_limits
      order by balance::numeric desc;`;

    const result = await Environment.indexDb.query(acceptedTokensWithBalanceAndLimitSql, [from, to]);
    const balances = result.rows.map(o => {
      return <TokenWithBalanceAndLimit>{
        safeAddress: from,
        token: o.token,
        tokenOwner: o.token_owner,
        balanceStr: o.balance,
        balance: new BN(o.balance),
        limit: o.limit,
        limitBn: new BN(o.limit.toString())
      }
    });

    return balances;
  }
}
