import {Context} from "./context";
import {Environment} from "./environment";
import {NoSession} from "./errors/noSession";

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

let queryCounter = 0;
const queryIds: {[query:string]: number} = {};

function cleanQueryCache () {
  Object.entries(queryIds)
      .filter(o => o[1] < queryCounter - 100)
      .map(o => o[0])
      .forEach(o => delete queryIds[o]);
}

const crypto = require('crypto');

function getQueryId(query:string) : {
  isNew: boolean,
  query: string,
  queryId: number,
  queryHash: string
} {
  const sha1 = crypto.createHash('sha1');
  sha1.update(query);
  const hash = sha1.digest('hex');
  sha1.destroy();

  let queryId: number;
  let isNew = false;
  if (!queryIds[hash]) {
    queryId = queryCounter++;
    queryIds[hash] = queryId;
    isNew = true;
  } else {
    queryId = queryIds[hash];
  }

  cleanQueryCache();

  return {
    isNew,
    query,
    queryId,
    queryHash: hash
  };
}

export class GqlLogger {
  requestDidStart(args:any) {
    let operationName = args.request.operationName;
    const now = new Date();
    if (!operationName) {
      const queryId = getQueryId(args.request.query);
      operationName = "query_" + queryId.queryId.toString();
      if (args.context) {
        args.context.operationName = operationName;
      }
      if (queryId.isNew) {
        if (args.context) {
          console.log(`     [${now.toJSON()}] [${Environment.instanceId}] [${args.context.session?.id}] [${args.context.id}] [${args.context.ipAddress}] [${operationName ?? ""}]: New query: ${queryId.query}`);
        } else {
          console.log(`     [${now.toJSON()}] [${Environment.instanceId}] [no-session] [no-context] [] [${operationName ?? ""}]: New query: ${queryId.query}`);
        }
      }
    }

    let requestArgs = JSON.stringify(args.request.variables);
    if (args.request.variables?.code?.length > 24) {
      const splitted = args.request.variables.code.trim().split(' ');
      if (splitted.length == 24) {
        // Very likely a keyphrase
        requestArgs = '>> redacted keyphrase string <<';
      }
    }

    if (args.context) {
      let context: Context = args.context;
      args.context.operationName = operationName;

      _pendingRequests[context.id] = {
        begin: now
      };

      console.log(`  -> [${now.toJSON()}] [${Environment.instanceId}] [${context.session?.id}] [${context.id}] [${context.ipAddress}] [${context.operationName ?? ""}]: ${requestArgs}`);
    } else {
      console.log(`  -> [${now.toJSON()}] [${Environment.instanceId}] [no-session] [no-context] [] [${operationName ?? ""}]: ${requestArgs}`);
    }

    return {
      willSendResponse(args: any) {
        GqlLogger.log(" <-  ", true, args);
      },
      didEncounterErrors(requestContext: any) {
        for (const e of requestContext.errors) {
          if (e.originalError instanceof NoSession) {
            GqlLogger.log("  I  ", false, {
              request: {
                operationName: requestContext.context.operationName
              },
              context: requestContext.context
            }, e.originalError.message);
          } else {
            GqlLogger.log(" ERR ", false, {
              request: {
                operationName: requestContext.context.operationName
              },
              context: requestContext.context
            }, JSON.stringify(e));
          }
        }
      }
    }
  }

  private static log(prefix:string, deletePendingRequest:boolean, args: any, message?: string) {
    const now = new Date();
    let operationName = args.request.operationName;
    if (!operationName && args.request.query) {
      const queryId = getQueryId(args.request.query);
      operationName = "query_" + queryId.queryId.toString();
    }

    if (args.context) {
      let context: Context = args.context;
      const ipAddr = context.ipAddress;

      if (deletePendingRequest) {
        const pendingRequest = _pendingRequests[context.id];
        const duration = pendingRequest
          ? now.getTime() - pendingRequest?.begin?.getTime()
          : -1;

        console.log(`${prefix}[${now.toJSON()}] [${Environment.instanceId}] [${context.session?.id}] [${context.id}] [${ipAddr}] [${operationName ?? ""}]: took ${duration} ms.`);

        if (pendingRequest) {
          delete _pendingRequests[context.id]
        }
      } else {
        console.log(`${prefix}[${now.toJSON()}] [${Environment.instanceId}] [${context.session?.id}] [${context.id}] [${ipAddr}] [${operationName ?? ""}]: ${message}`);
      }
    } else {
      console.log(`${prefix}[${now.toJSON()}] [${Environment.instanceId}] [no-session] [no-context] [${operationName ?? ""}]`);
    }
  }
}
