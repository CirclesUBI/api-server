import WebSocket from 'ws';
import {ApiPubSub} from "../pubsub";
import {prisma_api_ro} from "../apiDbClient";
import {Profile} from "../types";

export type CrcSignup = {
  "id": number,
  "transaction_id": number,
  "user":string;
  "token":string;
};
export type CrcTrust = {
  "id": number,
  "transaction_id": number,
  "address": string,
  "can_send_to": string,
  "limit": number
};
export type CrcTokenTransfer = {
  "id": number,
  "transaction_id": number,
  "from": string,
  "to": string,
  "token": string,
  "value": string
};
export type CrcHubTransfer = {
  "id": number,
  "transaction_id": number,
  "transactionHash": string,
  "from": string,
  "to": string,
  "flow": string,
  "transfers": CrcTokenTransfer[]
};
export type CrcMinting = {
  "id": number,
  "transaction_id": number,
  "from": string,
  "to": string,
  "token": string,
  "value": string
};
export type EthTransfer = {
  "id": number,
  "transaction_id": number,
  "from": string,
  "to": string,
  "value": string};
export type GnosisSafeEthTransfer = {
  "id": number,
  "transaction_id": number,
  "initiator": string,
  "from": string,
  "to": string,
  "token": string,
  "value": string};

export type WebsocketEvent = {
  "timestamp": '2021-09-01T12:29:10',
  "block_number": number,
  "transaction_index": number,
  "transaction_hash": '0x027ab1fe0fab5672409b9b375da9171be8a5c0347725f488f42fa1e4bb875a1a',
  "type": 'crc_signup'
    | 'crc_hub_transfer'
    | 'crc_trust'
    | 'crc_minting'
    | 'eth_transfer'
    | 'gnosis_safe_eth_transfer'
  "safe_address": string,
  "direction": 'in' | 'out' | 'self',
  "value": string,
  "payload": CrcSignup
    | CrcTrust
    | CrcHubTransfer
    | CrcTokenTransfer
    | CrcMinting
    | EthTransfer
    | GnosisSafeEthTransfer
};
export type RpcCall = {
  id: string;
  method: string;
  args: any;
}
export type RpcReturn = {
  id: string;
  error: any;
  result: any;
}
export type PendingRequest = {
  call: RpcCall,
  resolve: (returnMessage: RpcReturn) => void,
  reject: (error: any) => void
};

export class BlockchainIndexerConnection {
  private readonly _url: string;

  private _ws?: WebSocket;
  private _id = 0;
  private _isOpen: boolean = false;

  private readonly _requestQueue: PendingRequest[] = [];
  private readonly _sentRequests: {
    [id: string]: PendingRequest
  } = {};

  constructor(url: string) {
    this._url = url;
    this.connect();
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

    if (this._requestQueue.length > 0) {
      console.warn(`Got ${this._requestQueue.length} queued requests. Sending them now..`);
      while (this._requestQueue.length > 0) {
        const waitingCall = this._requestQueue.shift();
        if (!waitingCall)
          continue;

        this._ws?.send(JSON.stringify(waitingCall.call));
        this._sentRequests[waitingCall.call.id] = waitingCall;
      }
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
    }, 1000);
  }

  async onMessage(message: string) {
    try {
      const events = <WebsocketEvent[]>JSON.parse(message);
      if (!Array.isArray(events))
        return;

      const eventsBySafeAddress = events.reduce((p,c) => {
        if (!p[c.safe_address]) {
          p[c.safe_address] = [];
        }
        p[c.safe_address].push(c);
        return p;
      }, <{ [x: string]: WebsocketEvent[] }>{});

      const profiles = await prisma_api_ro.profile.findMany({
          where: {
            circlesAddress: {
              in: Object.keys(eventsBySafeAddress)
            }
          }
        });

      const profilesBySafeAddress = profiles.reduce((p,c) => {
        if (!c.circlesAddress)
          return p;

        p[c.circlesAddress] = c;
        return p;
      },  <{ [x: string]: Profile }>{});

      const eventsForKnownProfiles = Object.entries(eventsBySafeAddress)
        .filter(o => profilesBySafeAddress[o[0]])
        .map(o => {
          return {
            profile: profilesBySafeAddress[o[0]],
            events: o[1]
          }
        });

      if (eventsForKnownProfiles.length == 0) {
        return;
      }

      ApiPubSub.instance.pubSub.publish("event", {events: events});
      console.log(`Got events for the following profiles:`, eventsForKnownProfiles);

    } catch (e) {
      console.error(`The received websoocket message was not understood:`, message);
    }
    /*
    const parsedResult:RpcReturn = JSON.parse(message);
    if (!parsedResult.id) {
      console.warn(`Received a non parseable message:`, message);
      return;
    }

    const pendingRequest = this._sentRequests[parsedResult.id];
    if (!pendingRequest){
      console.warn(`Got a response to a request which was not sent by this connection:`, message);
      return;
    }

    delete this._sentRequests[parsedResult.id];
    if (parsedResult.error) {
      pendingRequest.reject(parsedResult.error);
    } else {
      pendingRequest.resolve(parsedResult.result);
    }
     */
  }

  /*
    newId() : string {
      return "_" + this._id++;
    }

    async requestRpcCall(call:RpcCall) : Promise<RpcReturn> {
      const promise = new Promise<RpcReturn>((resolve, reject) => {
        call.id = this.newId();

        const waitingCall:PendingRequest = {
          call: call,
          reject: reject,
          resolve: resolve
        };

        if (!this._isOpen) {
          console.warn(`Websocket connection to '${this._url}' is currently closed. Queuing the request..`)
          this._requestQueue.push(waitingCall);
          return;
        } else {
          this._ws?.send(JSON.stringify(call));
          this._sentRequests[call.id] = waitingCall;
        }
      });

      return promise;
    }
   */
}