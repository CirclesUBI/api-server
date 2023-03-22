import {CrcBalanceProvider} from "./pathfinder";
import BN from "bn.js";
import {Environment} from "../environment";
import {erc20_abi} from "../circles/abi/erc20Abi";
import {RpcGateway} from "../circles/rpcGateway";

export class DbBalanceProvider implements CrcBalanceProvider {
  async getCrcBalance(safeAddress:string) : Promise<BN|null> {
    const totalCrcBalanceQuery = `
      select sum(balance)::text as total_crc_balance
      from cache_crc_balances_by_safe_and_token
      where safe_address = $1`;

    const balanceResult = await Environment.indexDb.query(
      totalCrcBalanceQuery,
      [safeAddress]);

    if(balanceResult.rows.filter(o => !!o.total_crc_balance).length == 0) {
      return null;
    }

    const balance = balanceResult.rows[0].total_crc_balance;
    return new BN(balance);
  }

  async getTokenBalances(safeAddress:string) : Promise<{ tokenOwner: string, balance: BN }[]> {
    const crcBalanceQuery = `
      select token_owner, sum(balance)::text as token_balance
      from cache_crc_balances_by_safe_and_token
      where safe_address = $1
      group by token_owner`;

    const balanceResult = await Environment.indexDb.query(
      crcBalanceQuery,
      [safeAddress]);

    return balanceResult.rows.map(o => {
      return {
        tokenOwner: o.token_owner,
        balance: new BN(o.token_balance)
      }
    });
  }
}

export class ChainBalanceProvider implements CrcBalanceProvider {
  async getCrcBalance(safeAddress:string) : Promise<BN|null> {
    const totalCrcBalanceQuery = `
      select sum(balance)::text as total_crc_balance
      from cache_crc_balances_by_safe_and_token
      where safe_address = $1`;

    const balanceResult = await Environment.indexDb.query(
      totalCrcBalanceQuery,
      [safeAddress]);

    if(balanceResult.rows.length == 0) {
      return null;
    }

    const balance = balanceResult.rows[0].total_crc_balance;
    return new BN(balance);
  }

  async getTokenBalances(safeAddress:string) : Promise<{ tokenOwner: string, balance: BN }[]> {
    const crcBalanceQuery = `
      select token_owner, token, sum(balance)::text as token_balance
      from cache_crc_balances_by_safe_and_token
      where safe_address = $1
      group by token_owner, token`;

    const balanceResult = await Environment.indexDb.query(
      crcBalanceQuery,
      [safeAddress]);

    const c = (RpcGateway.get()).eth.Contract;
    const promises = balanceResult.rows.map(async o => {
      const erc20 = new c(erc20_abi, o.token);
      const balance = await erc20.methods.balanceOf(safeAddress).call();
      return {
        tokenOwner: o.token_owner,
        balance: balance
      }
    });

    return Promise.all(promises);
  }
}
