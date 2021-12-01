import {Context} from "./context";

let _pendingRequests:{[contextId:string]: {
  begin: Date
}} = {};

function clearPendingRequests() {
  const now = Date.now();
  const aMinuteAgo = now - 60000;
  const keys = Object.keys(_pendingRequests);
  if (keys.length >= 2000) {
    // just remove all entries if the pending requests overflow
    _pendingRequests = {};
    return;
  }
  // under normal circumstances we remove entries that are older than 1 min.
  keys.forEach(o => {
    if (_pendingRequests[o].begin.getTime() < aMinuteAgo){
      delete _pendingRequests[o];
    }
  });
}

setInterval(() => clearPendingRequests(), 1000);

export class GqlLogger {
  requestDidStart(args:any) {
    const operationName = args.request.operationName;
    const now = new Date();
    if (args.context) {
      let context: Context = args.context;
      const ipAddr = context.ipAddress;
      _pendingRequests[context.id] = {
        begin: now
      };

      console.log(`  -> [${now.toJSON()}] [${context.id}] [${ipAddr}] [${operationName ?? ""}]: ${JSON.stringify(args.request.variables)}`);
    } else {
      console.log(`  -> [${now.toJSON()}] [] [] [${operationName ?? ""}]: ${JSON.stringify(args.request.variables)}`);
    }

    return {
      willSendResponse(args:any) {
        const now = new Date();
        const operationName = args.request.operationName;

        if (args.context) {
          let context: Context = args.context;
          const ipAddr = context.ipAddress;

          const pendingRequest = _pendingRequests[context.id];
          const duration = pendingRequest
            ? now.getTime() - pendingRequest?.begin?.getTime()
            : -1;

          console.log(` <-  [${now.toJSON()}] [${context.id}] [${ipAddr}] [${operationName ?? ""}]: took ${duration} ms.`);

          if (pendingRequest) {
            delete _pendingRequests[context.id]
          }
        } else {
          console.log(` <-  [${now.toJSON()}] [] [] [${operationName ?? ""}]`);
        }
      },
      didEncounterErrors(requestContext: any) {
        console.log(requestContext);
      }
    }
  }
}