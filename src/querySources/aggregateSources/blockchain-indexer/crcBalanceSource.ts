import {AggregateSource} from "../aggregateSource";
import {
  AssetBalance,
  CrcBalances, Maybe,
  ProfileAggregate,
  ProfileAggregateFilter
} from "../../../types";
import {Environment} from "../../../environment";
import {getDateWithOffset} from "../../../utils/getDateWithOffset";

// All CRC balances of a safe
export class CrcBalanceSource implements AggregateSource {
  async getAggregate(forSafeAddress: string, filter?: Maybe<ProfileAggregateFilter>): Promise<ProfileAggregate[]> {
    const crcBalancesResult = await Environment.indexDb.query(`
        select last_change_at, token, token_owner, balance
        from cache_crc_balances_by_safe_and_token
        where safe_address = $1
        order by balance desc;`,
      [forSafeAddress.toLowerCase()]);

    const lastChangeAt = crcBalancesResult.rows.reduce((p,c) => Math.max(new Date(c.last_change_at).getTime(), p) ,0);
    const lastChangeAtTs = getDateWithOffset(lastChangeAt);
    return [<ProfileAggregate>{
      safe_address: forSafeAddress.toLowerCase(),
      type: "CrcBalances",
      payload: <CrcBalances> {
        __typename: "CrcBalances",
        lastUpdatedAt: lastChangeAtTs.toJSON(),
        balances: crcBalancesResult.rows.map((o: any) => {
          return <AssetBalance> {
            token_owner_profile: null,
            token_symbol: "CRC",
            token_address: o.token,
            token_owner_address: o.token_owner,
            token_balance: o.balance
          }
        })
      }
    }];
  }
}