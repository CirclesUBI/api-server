import {SubscriptionServer} from "subscriptions-transport-ws";
import {execute, GraphQLSchema, subscribe} from "graphql";
import {Environment} from "./environment";
import {Session} from "./session";
import {Session as PrismaSession} from "./api-db/client";
import {Context} from "./context";
import {Main} from "./main";
import {Server, ServerOptions} from "ws";
import {Server as HTTPServer} from "http";
import {tryGetSessionToken} from "./utils/tryGetSessionToken";

export const gqlSubscriptionServer = async (schema:GraphQLSchema, httpServer:HTTPServer, graphqlPath:string) => SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
    async onDisconnect(
      options: ServerOptions,
      socketOptionsOrServer: Server
    ) {
      const upgradeRequest = (<any>options).upgradeReq;
      const ip =
        upgradeRequest.headers["forwarded-for"] ??
        upgradeRequest.headers["x-forwarded-for"] ??
        upgradeRequest.connection.remoteAddress;

      console.log(
        `-->X [${new Date().toJSON()}] [${Environment.instanceId}] [] [] [${ip}] [subscriptionServer.onConnect]: Websocket connection closed.`
      );
    },
    async onConnect(connectionParams: any, webSocket: any) {
      // WS
      const contextId = Session.generateRandomBase64String(8);
      let isSubscription = false;
      let authorizationHeaderValue: string | undefined;
      let originHeaderValue: string | undefined;

      const upgradeRequest = webSocket.upgradeReq;
      const cookieValue = upgradeRequest.headers["cookie"];
      const ip =
        upgradeRequest.headers["forwarded-for"] ??
        upgradeRequest.headers["x-forwarded-for"] ??
        upgradeRequest.connection.remoteAddress;

      isSubscription = true;
      let sessionToken = tryGetSessionToken(cookieValue);

      let session: PrismaSession | null = await Context.findSession(
        sessionToken
      );
      if (session) {
        console.log(
          `-->] [${new Date().toJSON()}] [${Environment.instanceId}] [${session.id}] [${contextId}] [${ip}] [subscriptionServer.onConnect]: New websocket subscription client.`
        );
      } else {
        console.log(
          `-->] [${new Date().toJSON()}] [${Environment.instanceId}] [] [${contextId}] [${ip}] [subscriptionServer.onConnect]: New websocket subscription client.`
        );
      }

      const context = new Context(
        contextId,
        isSubscription,
        authorizationHeaderValue,
        originHeaderValue,
        session,
        ip
      );

      return context;
    },
  },
  {
    server: httpServer,
    path: graphqlPath,
  }
);