import { EventSource } from "../eventSource";
import {
  Direction,
  Maybe,
  PaginationArgs,
  ProfileEvent,
  ProfileEventFilter,
  SortOrder,
} from "../../types";
import { getDateWithOffset } from "../../indexer-api/blockchainEventSource";
import { Environment } from "../../environment";

export enum BlockchainEventType {
  CrcSignup = "CrcSignup",
  CrcHubTransfer = "CrcHubTransfer",
  CrcTrust = "CrcTrust",
  CrcMinting = "CrcMinting",
  EthTransfer = "EthTransfer",
  GnosisSafeEthTransfer = "GnosisSafeEthTransfer",
  Erc20Transfer = "Erc20Transfer",
}

export class BlockchainIndexerEventSource implements EventSource {
  private _in(): string {
    let sql = `
      select timestamp
           , block_number
           , transaction_index
           , transaction_hash
           , type
           , safe_address
           , contact_address
           , direction
           , value::text
           , obj as payload
      from crc_safe_timeline_2
      where direction = 'in'`;

    sql += `
      and ($5 = '' or contact_address = $5) --you`;

    sql += `
      and ($6 = '' or safe_address = $6) -- me`;

    return sql;
  }

  private _out(): string {
    let sql = `
      select timestamp
           , block_number
           , transaction_index
           , transaction_hash
           , type
           , safe_address
           , contact_address
           , direction
           , value::text
           , obj as payload
      from crc_safe_timeline_2
      where direction = 'out'`;

    sql += `
      and ($6 = '' or contact_address = $6) --you`;

    sql += `
      and ($5 = '' or safe_address = $5) -- me`;

    return sql;
  }

  private cte(
    _in: string,
    _out: string,
    filter: Maybe<ProfileEventFilter>
  ): string {
    let sql = `
      with "in" as (
          ${_in}
      ), "out" as (
          ${_out}
      )`;

    if (!filter?.direction) {
      sql += `, "all" as (
          select *
          from "in"
          union all
          select *
          from "out"
      )`;
    } else if (filter?.direction == Direction.In) {
      sql += `, "all" as (
          select *
          from "in"
      )`;
    } else if (filter?.direction == Direction.Out) {
      sql += `, "all" as (
          select *
          from "out"
      )`;
    }

    sql += `
      select *
      from "all"
      where type = ANY ($1)
        and safe_address = $2
        and (('~~SORT_ORDER~~' = 'asc' and timestamp > $3)
          or ('~~SORT_ORDER~~' = 'desc' and timestamp < $3))`;
    sql += `
      and ($7 = '' or (safe_address = $7 or contact_address = $7)) 
    `;
    sql += `
      and ($8 = '' or transaction_hash = $8)
    `;
    sql += `
      order by timestamp ~~SORT_ORDER~~
      limit $4;`;

    return sql;
  }

  private readonly _types: BlockchainEventType[];

  constructor(types: BlockchainEventType[]) {
    this._types = types;
  }

  async getEvents(
    forSafeAddress: string,
    pagination: PaginationArgs,
    filter: Maybe<ProfileEventFilter>
  ): Promise<ProfileEvent[]> {
    const inSql = this._in();
    const outSql = this._out();
    const baseQuery = this.cte(inSql, outSql, filter);
    const queryWithFilter = (<any>baseQuery).replaceAll(
      "~~SORT_ORDER~~",
      pagination.order == SortOrder.Asc ? "asc" : "desc"
    );

    const params = [
      this._types,
      forSafeAddress,
      pagination.continueAt ? pagination.continueAt : undefined,
      pagination.limit,
      filter?.from ?? "",
      filter?.to ?? "",
      filter?.with ?? "",
      filter?.transactionHash ?? "",
    ];

    const eventRows = await Environment.indexDb.query(queryWithFilter, params);

    const results = eventRows.rows.map((r: any) => {
      const ts = getDateWithOffset(r.timestamp);
      return <ProfileEvent>{
        __typename: "ProfileEvent",
        safe_address: r.safe_address,
        contact_address: r.contact_address,
        type: r.type,
        block_number: r.block_number,
        direction: r.direction,
        timestamp: ts.toJSON(),
        value: r.value,
        transaction_hash: r.transaction_hash,
        transaction_index: r.transaction_index,
        payload: {
          __typename: r.type,
          transaction_hash: r.transaction_hash,
          ...(Array.isArray(r.payload) ? r.payload[0] : r.payload),
        },
      };
    });

    return results;
  }
}
