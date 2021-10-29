import {EventSource} from "../eventSource";
import {PaginationArgs, ProfileEvent, SortOrder} from "../../types";
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
  private readonly _sql = `select timestamp
                                , block_number
                                , transaction_index
                                , transaction_hash
                                , type
                                , safe_address
                                , direction
                                , value
                                , obj as payload
                           from crc_safe_timeline_2
                           where type =ANY($1)
                             and safe_address = $2
                             and (('~~SORT_ORDER~~' = 'asc' and timestamp > $3)
                                 or ('~~SORT_ORDER~~' = 'desc' and timestamp < $3))
                           order by timestamp ~~SORT_ORDER~~
                           limit $4`;

  private readonly _types:BlockchainEventType[];

  constructor(types:BlockchainEventType[]) {
    this._types = types;
  }

  async getEvents(forSafeAddress: string, pagination:PaginationArgs): Promise<ProfileEvent[]> {
    const pool = getPool();
    try {
      const eventRows = await pool.query(
        (<any>this._sql).replaceAll("~~SORT_ORDER~~", pagination.order == SortOrder.Asc ? "asc" : "desc"),
        [
          this._types,
          forSafeAddress,
          pagination.continueAt,
          pagination.limit
        ]
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
            ...(Array.isArray(r.payload) ? r.payload[0] : r.payload),
          }
        };
      });
    } finally {
      await pool.end();
    }
  }
}