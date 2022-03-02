import {AggregateSource} from "../aggregateSource";
import {
  AssetBalance,
  Erc20Balances, Maybe,
  ProfileAggregate,
  ProfileAggregateFilter
} from "../../../types";
import {Environment} from "../../../environment";
import {getDateWithOffset} from "../../../utils/getDateWithOffset";

// All ERC20 balances of a safe
export class Erc20BalancesSource implements AggregateSource {
  async getAggregate(forSafeAddress: string, filter?: Maybe<ProfileAggregateFilter>): Promise<ProfileAggregate[]> {
    const erc20BalancesResult = await Environment.indexDb.query(`
       select safe_address
            , token
            , balance
            , last_changed_at
       from erc20_balances_by_safe_and_token
       where safe_address = $1;`,
      [forSafeAddress.toLowerCase()]);

    if (erc20BalancesResult.rows.length == 0) {
      return [];
    }

    const lastChangeAt = erc20BalancesResult.rows.reduce((p,c) => Math.max(new Date(c.last_changed_at).getTime(), p) ,0);
    const lastChangeAtTs = getDateWithOffset(lastChangeAt);

    return [<ProfileAggregate>{
      safe_address: forSafeAddress.toLowerCase(),
      type: "Erc20Balances",
      payload: <Erc20Balances> {
        __typename: "Erc20Balances",
        lastUpdatedAt: lastChangeAtTs.toJSON(),
        balances: erc20BalancesResult.rows.map((o: any) => {
          return <AssetBalance> {
            token_address: o.token,
            token_owner_address: "0x0000000000000000000000000000000000000000",
            token_symbol: "erc20",
            token_balance: o.balance
          }
        })
      }
    }];
  }
}