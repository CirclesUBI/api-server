import WebSocket from 'ws';

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

export class NotificationServerConnection {
  private readonly _url:string;

  private _ws?:WebSocket;
  private _id = 0;
  private _isOpen: boolean = false;

  private readonly _requestQueue:PendingRequest[] = [];
  private readonly _sentRequests: {
    [id: string]: PendingRequest
  } = {};

  constructor(url:string) {
    this._url = url;
    this.connect();
  }

  connect() {
    console.log(`Connecting to ${this._url} ..`);
    this._ws = new WebSocket(this._url, {});

    this._ws.on("open", () => {
      this.onOpen();
    });
    this._ws.on("message", (e) => {
      console.log("Websocket message: ", e.toString());
      this.onMessage(e.toString());
    });
    this._ws.on("error", (e) => {
      console.log("Websocket error: ", e);
    });
    this._ws.on("close", (e) => {
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

    if (this._requestQueue.length > 0 ){
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

  _reconnectTimeoutHandle:any;

  onClose() {
    if (this._reconnectTimeoutHandle != null) {
      clearInterval(this._reconnectTimeoutHandle);
    }

    this._isOpen = false;

    console.warn(`Websocket connection to ${this._url} closed.`);
    console.log(`Websocket connection to ${this._url} closed. Reconnecting in 100 ms.`);

    this._reconnectTimeoutHandle = setTimeout(() => {
      this.connect();
    });
  }

  onMessage(message:string) {
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
  }

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
}