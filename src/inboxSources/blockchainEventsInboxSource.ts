import {InboxSource} from "./inboxSource";
import {PaginationArgs, ProfileEvent} from "../types";
import {getPool} from "../resolvers/resolvers";
import {ProfileEventAugmenter} from "./profileEventAugmenter";

export enum BlockchainEventType {
  CRC_SIGNUP = "CrcSignup",
  CRC_HUB_TRANSFER = "CrcHubTransfer",
  CRC_TRUST = "CrcTrust",
  CRC_MINTING = "CrcMinting",
  ETH_TRANSFER = "EthTransfer",
  GNOSIS_SAFE_ETH_TRANSFER = "GnosisSafeEthTransfer"
}

export class BlockchainEventsInboxSource implements InboxSource
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
                             and timestamp > $3
                           order by timestamp desc
                           limit $4`;

  private readonly _types:BlockchainEventType[];

  constructor(types:BlockchainEventType[]) {
    this._types = types;
  }

  async getNewEvents(forSafeAddress: string, pagination:PaginationArgs): Promise<ProfileEvent[]> {
    const pool = getPool();
    try {
      const eventRows = await pool.query(
        this._sql,
        [
          this._types,
          forSafeAddress,
          pagination.continueAt,
          pagination.limit
        ]
      );

      let events = eventRows.rows.map(r => {
        return <ProfileEvent> {
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

      const augmentation = new ProfileEventAugmenter();
      events.forEach(e => augmentation.add(e));
      events = await augmentation.augment();

      return events;
    } finally {
      await pool.end();
    }
  }
}