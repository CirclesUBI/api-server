import WebSocket from 'ws';
import {ApiPubSub} from "../pubsub";
import {getPool} from "../resolvers/resolvers";

export class BlockchainIndexerWsAdapter {
  private readonly _url: string;

  private _ws?: WebSocket;
  private _isOpen: boolean = false;

  constructor(url: string) {
    this._url = url;
  }

  connect() {
    console.log(`Connecting to ${this._url} ..`);
    this._ws = new WebSocket(this._url, {});

    this._ws.on("open", () => {
      this.onOpen();
    });
    this._ws.on("message", (e:any) => {
      this.onMessage(e.toString());
    });
    this._ws.on("error", (e:any) => {
      console.log("Websocket error: ", e);
    });
    this._ws.on("close", (e:any) => {
      console.log("Websocket closed: ", e);
      this.onClose();
    });
  }

  onOpen() {
    this._isOpen = true;
    console.log(`Websocket connected to ${this._url}.`);

    if (this._reconnectTimeoutHandle != null) {
      clearInterval(this._reconnectTimeoutHandle);
    }
  }

  _reconnectTimeoutHandle: any;

  onClose() {
    if (this._reconnectTimeoutHandle != null) {
      clearInterval(this._reconnectTimeoutHandle);
    }

    this._isOpen = false;

    console.warn(`Websocket connection to ${this._url} closed.`);
    console.log(`Websocket connection to ${this._url} closed. Reconnecting in 1000 ms.`);

    this._reconnectTimeoutHandle = setTimeout(() => {
      this.connect();
    }, 5000);
  }

  i = 1;

  async onMessage(message: string) {
    try {
      const transactionHashes: string[] = JSON.parse(message);

      const pool = getPool();
      try {
        const cur = this.i++;

        console.log(`Message ${cur} received.`);
        // Find all events in the reported new range
        const trustQuery = `with a as (
            select hash, "user" as address1, null as address2, null as address3
            from crc_signup_2
            union all
            select hash, address as address1, can_send_to as address2, null as address3
            from crc_trust_2
            union all
            select hash, organisation as address1, null as address2, null as address3
            from crc_organisation_signup_2
            union all
            select hash, "from" as address1, "to" as address2, null as address3
            from crc_hub_transfer_2
            union all
            select hash, "from" as address1, "to" as address2, null as address3
            from erc20_transfer_2
            union all
            select hash, "from" as address1, "to" as address2, null as address3
            from eth_transfer_2
            union all
            select hash, "initiator" as address1, "from" as address2, "to" as address3
            from gnosis_safe_eth_transfer_2
        )
        select hash, address1, address2, address3
        from a
        where hash = ANY ($1);`;


        const eventsInMessage = await pool.query(trustQuery, [transactionHashes]);
        const affectedAddresses = eventsInMessage.rows.reduce((p, c) => {
          if (c.address1) {
            p[c.address1] = true;
          }
          if (c.address2) {
            p[c.address2] = true;
          }
          if (c.address3) {
            p[c.address3] = true;
          }
          return p;
        }, <{ [address: string]: any }>{});

        for(let address of Object.keys(affectedAddresses)) {
          await ApiPubSub.instance.pubSub.publish(`events_${address}`, {
            events: {
              type: "blockchain_event"
            }
          });
        }
      } finally {
        await pool.end();
      }
    } catch (e) {
      console.error(`The received websocket message was not understood:`, message, e);
    }
  }
}