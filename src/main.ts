import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {resolvers} from "./resolvers/resolvers";
import {importSchema} from "graphql-import";
import {BlockchainIndexerConnection} from "./indexer-api/blockchainIndexerConnection";
import {Context} from "./context";
import {Session} from "./session";
import {newLogger} from "./logger";
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

// TODO: Migrate to GraphQL-tools: https://www.graphql-tools.com/docs/migration-from-import/
const httpHeadersPlugin = require("apollo-server-plugin-http-headers");

if (!process.env.CORS_ORIGNS) {
    throw new Error("No CORS_ORIGNS env variable");
}

const corsOrigins = process.env.CORS_ORIGNS.split(";").map(o => o.trim());
const activeWsClients = [];


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
            ApolloServerPluginLandingPageGraphQLPlayground()],
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
                    const cookies = cookieValue.split(";").map((o:string) => o.trim().split("=")).reduce((p:{[key:string]:any}, c:string) => { p[c[0]] = c[1]; return p}, {});
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

        var indexerApiUrl = "ws://localhost:8675"
        console.log(`Subscribing to blockchain events from the indexer at ${indexerApiUrl} ..`)
        new BlockchainIndexerConnection(indexerApiUrl);
        console.log("Subscription ready.")

        const PORT = 8989;
        httpServer.listen(PORT, () =>
          console.log(`Server is now running on http://localhost:${PORT}/graphql`)
        );
    }
/*
    constructor() {
        const apiSchemaTypeDefs = importSchema("../src/server-schema.graphql");
        this._resolvers = this._resolvers;

        console.log("cors origins: ", corsOrigins);

        const httpServer = createServer(app);
        const schema = makeExecutableSchema({
            apiSchemaTypeDefs,
            resolvers
        });
        const server = new ApolloServer({
            schema,
        });


        this._server = new ApolloServer({
            // extensions: [() => new BasicLogging()],
            plugins: [httpHeadersPlugin],
            context: Context.create,
            typeDefs: apiSchemaTypeDefs,
            resolvers: this._resolvers,
            cors: {
                origin: corsOrigins,
                credentials: true
            },
            formatError: (err) => {
                const errorId = Session.generateRandomBase64String(8);
                console.error({
                    timestamp: new Date().toJSON(),
                    errorId: errorId,
                    error: JSON.stringify(err)
                });
                return {
                    path: err.path,
                    message: `An error occurred while processing your request. `
                        + `If the error persists contact the admins at '${process.env.ADMIN_EMAIL}' `
                        + `and include the following error id in your request: `
                        + `'${errorId}'`
                }
            }
        });
    }

    async run() {
        await this._server.listen({
            port: parseInt("8989")
        }).then(async o => {
            console.log("listening at port 8989")

            console.log("Initializing the db if necessary");
            await InitDb.run(prisma_api_rw)
            console.log("Db ready");

            var indexerApiUrl = "ws://localhost:8080"
            console.log(`Subscribing to blockchain events from the indexer at ${indexerApiUrl} ..`)
            new BlockchainIndexerConnection("ws://localhost:8080");
            console.log("Subscription ready.")
        });
    }
 */
}

new Main()
    .run2()
    .then(() => "Running");
