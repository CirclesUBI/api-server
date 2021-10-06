import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {resolvers} from "./resolvers/resolvers";
import {importSchema} from "graphql-import";
import {Context} from "./context";
import {Session} from "./session";
import {newLogger} from "./logger";
import {Error} from "apollo-server-core/src/plugin/schemaReporting/operations";
import {BlockchainIndexerWsAdapter} from "./indexer-api/blockchainIndexerWsAdapter";
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

if (!process.env.CORS_ORIGNS) {
    throw new Error("No CORS_ORIGNS env variable");
}

const corsOrigins = process.env.CORS_ORIGNS.split(";").map(o => o.trim());
const activeWsClients = [];

const errorLogger = {
    async didEncounterErrors(requestContext: any) {
        console.log(requestContext);
    }
};

export class Main {
    async run2 () {
        const app = express();
        const httpServer = createServer(app);

        const apiSchemaTypeDefs = importSchema("../src/server-schema.graphql");
        const schema = makeExecutableSchema({
            typeDefs: <any>apiSchemaTypeDefs,
            resolvers,
        });

        console.log("cors origins: ", corsOrigins);
        const server = new ApolloServer({
            schema,
            context: Context.create,
            plugins: [{
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close();
                        }
                    };
                }
            },
            ApolloServerPluginLandingPageGraphQLPlayground(),
            errorLogger],
        });

        await server.start();
        const serverMiddleware = server.getMiddleware({
            path:"/",
            cors: {
                origin: corsOrigins,
                credentials: true
            }
        })

        app.use(serverMiddleware);
        app.use(function (err:any) {
            console.error(err.stack)
        })

        const subscriptionServer = SubscriptionServer.create({
            schema,
            execute,
            subscribe,
            onConnect(connectionParams:any, webSocket:any) {
                // WS
                const contextId = Session.generateRandomBase64String(8);
                let isSubscription = false;
                let authorizationHeaderValue: string | undefined;
                let originHeaderValue: string | undefined;

                const upgradeRequest = webSocket.upgradeReq;
                const cookieValue = upgradeRequest.headers["cookie"];

                const defaultTags = [{
                    key: `contextId`,
                    value: contextId
                }, {
                    key: `protocol`,
                    value: `ws`
                }];
                const logger = newLogger(defaultTags);
                isSubscription = true;

                let sessionId:string|undefined = undefined;
                if (cookieValue) {
                    const cookies = cookieValue.split(";")
                                                .map((o:string) => o.trim()
                                                  .split("="))
                                                .reduce((p:{[key:string]:any}, c:string) => {
                                                    p[c[0]] = c[1];
                                                    return p
                                                }, {});
                    if (cookies["session"]) {
                        sessionId = decodeURIComponent(cookies["session"]);
                    }
                }

                return new Context(
                  contextId,
                  isSubscription,
                  logger,
                  authorizationHeaderValue,
                  originHeaderValue,
                  sessionId,
                  "");

                // lookup userId by token, etc.
                console.log("New websocket connection:", connectionParams);
                return { userId: 0 };
            },
        }, {
            server: httpServer,
            path: server.graphqlPath,
        });

        const indexerApiUrl = process.env.BLOCKCHAIN_INDEX_WS_URL;
        if (indexerApiUrl) {
            console.log(`Subscribing to blockchain events from the indexer at ${indexerApiUrl} ..`)
            const conn = new BlockchainIndexerWsAdapter(indexerApiUrl);
            conn.connect();
            console.log("Subscription ready.")
        } else {
            console.warn(`No BLOCKCHAIN_INDEX_WS_URL environment variable was provided. Cannot subscribe to blockchain events.`)
        }
        const PORT = 8989;
            httpServer.listen(PORT, () =>
              console.log(`Server is now running on http://localhost:${PORT}/graphql`)
            );
    }
}

new Main()
    .run2()
    .then(() => "Running");
