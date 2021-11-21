import {createServer} from "http";
import {execute, subscribe} from "graphql";
import {SubscriptionServer} from "subscriptions-transport-ws";
import {makeExecutableSchema} from "@graphql-tools/schema";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {getPool, resolvers} from "./resolvers/resolvers";
import {importSchema} from "graphql-import";
import {Context} from "./context";
import {Session} from "./session";
import {newLogger} from "./logger";
import {Error} from "apollo-server-core/src/plugin/schemaReporting/operations";
import {BlockchainEventSource} from "./indexer-api/blockchainEventSource";
import {ApiPubSub} from "./pubsub";
import {RpcGateway} from "./rpcGateway";
import {PoolClient} from "pg";

const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

if (!process.env.CORS_ORIGNS) {
    throw new Error("No CORS_ORIGNS env variable");
}

const corsOrigins = process.env.CORS_ORIGNS.split(";").map(o => o.trim());

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

                console.log("New websocket connection:", connectionParams);

                return new Context(
                  contextId,
                  isSubscription,
                  logger,
                  authorizationHeaderValue,
                  originHeaderValue,
                  sessionId,
                  "");
            },
        }, {
            server: httpServer,
            path: server.graphqlPath,
        });

        const indexerApiUrl = process.env.BLOCKCHAIN_INDEX_WS_URL;
        if (indexerApiUrl) {
            console.log(`Subscribing to blockchain events from the indexer at ${indexerApiUrl} ..`)
            const conn = new BlockchainEventSource(indexerApiUrl ?? "");
            conn.connect();
            console.log("Subscription ready.")
        } else {
            console.warn(`No BLOCKCHAIN_INDEX_WS_URL environment variable was provided. Cannot subscribe to blockchain events.`)
        }

        this.listenForDbEvents()
          .catch(e => {
              console.error(`The notifyConnection died:`, e);
          });


        const PORT = 8989;
            httpServer.listen(PORT, () =>
              console.log(`Server is now running on http://localhost:${PORT}/graphql`)
            );
    }

    private async listenForDbEvents() {
        while (true) {
            let notifyConnection: PoolClient|null = null;
            console.log(`Trying to create the notifyConnection ..`);
            try {
                notifyConnection = await getPool().connect();
                await new Promise(async (resolve, reject) => {
                    if (!notifyConnection) {
                        reject(new Error(`The notifyConnection couldn't be established and is 'null'.`));
                        return;
                    }
                    // Listen for all pg_notify channel messages
                    notifyConnection.on("error", async function (err) {
                        reject(err);
                    });
                    notifyConnection.on('notification', async function (msg) {
                        if (msg.channel != "new_message")
                            return;
                        if (!msg.payload)
                            return;

                        const payload = JSON.parse(msg.payload);
                        if (!payload.to)
                            return;

                        const to: string = payload.to;
                        if (!RpcGateway.get().utils.isAddress(to))
                            return;

                        await ApiPubSub.instance.pubSub.publish(`events_${to}`, {
                            events: {
                                type: "new_message"
                            }
                        });
                        console.log(`Received 'new_message' from notifyConnection: `, payload);
                    });

                    console.error(`notifyConnection established.`);

                    // Designate which channels we are listening on. Add additional channels with multiple lines.
                    await notifyConnection.query('LISTEN new_message');
                });
            } catch (e) {
                console.error(`The notifyConnection experienced an error: `, e);
            } finally {
                try {
                    notifyConnection?.release();
                } catch (e) {
                    console.error(`Couldn't release the notifyConnection on error:`, e);
                }
            }

            console.log(`Retrying notifyConnection in 10 sec. ..`);
            await new Promise((resolve) => {
                setTimeout(resolve, 10000);
            });
        }
    }
}

new Main()
    .run2()
    .then(() => "Running");
