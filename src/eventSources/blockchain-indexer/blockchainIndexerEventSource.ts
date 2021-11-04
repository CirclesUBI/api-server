import {EventSource} from "../eventSource";
import {Maybe, PaginationArgs, ProfileEvent, ProfileEventFilter, SortOrder} from "../../types";
import {getPool} from "../../resolvers/resolvers";

export enum BlockchainEventType {
  CrcSignup = "CrcSignup",
  CrcHubTransfer = "CrcHubTransfer",
  CrcTrust = "CrcTrust",
  CrcMinting = "CrcMinting",
  EthTransfer = "EthTransfer",
  GnosisSafeEthTransfer = "GnosisSafeEthTransfer"
}

export class BlockchainIndexerEventSource implements EventSource
{
  private _in(filter: Maybe<ProfileEventFilter>) : string {
    let sql = `
      select timestamp
           , block_number
           , transaction_index
           , transaction_hash
           , type
           , safe_address
           , contact_address
           , direction
           , value
           , obj as payload
      from crc_safe_timeline_2
      where direction = 'in'`;

      sql += `
      and ($5 = '' or contact_address = $5) --you`;

      sql += `
      and ($6 = '' or safe_address = $6) -- me`;

    return sql;
  }

  private _out(filter: Maybe<ProfileEventFilter>) : string {
    let sql = `
      select timestamp
           , block_number
           , transaction_index
           , transaction_hash
           , type
           , safe_address
           , contact_address
           , direction
           , value
           , obj as payload
      from crc_safe_timeline_2
      where direction = 'out'`;

      sql += `
      and ($6 = '' or contact_address = $6) --you`;

      sql += `
      and ($5 = '' or safe_address = $5) -- me`;

    return sql;
  }


  private cte(_in:string, _out:string) : string {
    return `
      with "in" as (
          ${_in}
      ), "out" as (
          ${_out}
      ), "all" as (
          select *
          from "in"
          union all
          select *
          from "out"
      )
      select *
      from "all"
      where type = ANY ($1)
        and safe_address = $2
        and (('~~SORT_ORDER~~' = 'asc' and timestamp > $3)
          or ('~~SORT_ORDER~~' = 'desc' and timestamp < $3))
      order by timestamp ~~SORT_ORDER~~
      limit $4;`;
  }

  private readonly _types:BlockchainEventType[];

  constructor(types:BlockchainEventType[]) {
    this._types = types;
  }

  async getEvents(forSafeAddress: string, pagination:PaginationArgs, filter: Maybe<ProfileEventFilter>): Promise<ProfileEvent[]> {
    const pool = getPool();
    try {
      const inSql = this._in(filter);
      const outSql = this._out(filter);
      const baseQuery = this.cte(inSql, outSql);
      const queryWithFilter = (<any>baseQuery).replaceAll("~~SORT_ORDER~~", pagination.order == SortOrder.Asc ? "asc" : "desc");

      const params = [
        this._types,
        forSafeAddress,
        pagination.continueAt,
        pagination.limit,
        filter?.from ?? "",
        filter?.to ?? ""
      ];

      const eventRows = await pool.query(
        queryWithFilter,
        params
      );

      return eventRows.rows.map((r:any) => {
        return <ProfileEvent>{
          __typename: "ProfileEvent",
          safe_address: r.safe_address,
          type: r.type,
          block_number: r.block_number,
          direction: r.direction,
          timestamp: r.timestamp.toJSON(),
          value: r.value,
          transaction_hash: r.transaction_hash,
          transaction_index: r.transaction_index,
          payload: {
            __typename: r.type,
            transaction_hash: r.transaction_hash,
            ...(Array.isArray(r.payload) ? r.payload[0] : r.payload),
          }
        };
      });
    } finally {
      await pool.end();
    }
  }
}