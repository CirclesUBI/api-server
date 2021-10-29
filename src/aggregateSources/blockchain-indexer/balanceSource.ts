import {AggregateSource} from "../aggregateSource";
import {CrcBalance, ProfileAggregate} from "../../types";
import {getPool} from "../../resolvers/resolvers";

// All CRC balances of a safe
export class BalanceSource implements AggregateSource {
  async getAggregate(forSafeAddress: string): Promise<ProfileAggregate[]> {
    const pool = getPool();
    try {
      const crcBalancesResult = await pool.query(`
          select last_change_at, token, token_owner, balance
          from crc_balances_by_safe_and_token_2
          where safe_address = $1
          order by last_change_at desc;`,
        [forSafeAddress.toLowerCase()]);

      return crcBalancesResult.rows.map((o: any) => {
        return <ProfileAggregate>{
          safe_address: forSafeAddress.toLowerCase(),
          type: "CrcBalance",
          payload: <CrcBalance>{
            __typename: "CrcBalance",
            lastUpdatedAt: o.last_change_at,
            balances: [{
              token_address: o.token,
              token_owner_address: o.token_owner,
              token_balance: o.balance
            }]
          }
        };
      });
    } finally {
      await pool.end();
    }
  }
}