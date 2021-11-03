import {AggregateSource} from "../aggregateSource";
import {AssetBalance, CrcBalances, ProfileAggregate} from "../../types";
import {getPool} from "../../resolvers/resolvers";

// All CRC balances of a safe
export class CrcBalanceSource implements AggregateSource {
  async getAggregate(forSafeAddress: string): Promise<ProfileAggregate[]> {
    const pool = getPool();
    try {
      const crcBalancesResult = await pool.query(`
          select last_change_at, token, token_owner, balance
          from crc_balances_by_safe_and_token_2
          where safe_address = $1
          order by last_change_at desc;`,
        [forSafeAddress.toLowerCase()]);

      const lastChangeAt = crcBalancesResult.rows.reduce((p,c) => Math.max(new Date(c.last_change_at).getTime(), p) ,0);

      return [<ProfileAggregate>{
        safe_address: forSafeAddress.toLowerCase(),
        type: "CrcBalances",
        payload: <CrcBalances> {
          __typename: "CrcBalances",
          lastUpdatedAt: lastChangeAt,
          balances: crcBalancesResult.rows.map((o: any) => {
            return <AssetBalance> {
              token_owner_profile: null,
              token_address: o.token,
              token_owner_address: o.token_owner,
              token_balance: o.balance
            }
          })
        }
      }]
    } finally {
      await pool.end();
    }
  }
}