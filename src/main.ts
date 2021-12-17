import {createServer} from "http";
import {execute, subscribe} from "graphql";
import {SubscriptionServer} from "subscriptions-transport-ws";
import {makeExecutableSchema} from "@graphql-tools/schema";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {resolvers} from "./resolvers/resolvers";
import {importSchema} from "graphql-import";
import {Context} from "./context";
import {Error} from "apollo-server-core/src/plugin/schemaReporting/operations";
import {BlockchainEventSource} from "./indexer-api/blockchainEventSource";
import {ApiPubSub} from "./pubsub";
import {RpcGateway} from "./rpcGateway";
import {Notification, PoolClient} from "pg";
import {GqlLogger} from "./gqlLogger";
import {Session as PrismaSession} from "./api-db/client";
import {Session} from "./session";
import {Server, ServerOptions} from "ws";
import {Dropper} from "./dropper/dropper";
import {Environment} from "./environment";

const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const corsOrigins = Environment.corsOrigins.split(";").map(o => o.trim());

export class Main {

    private _dropper = new Dropper();

    async run2 () {
        if (Environment.delayStart) {
            console.log(`Delaying the start for ${Environment.delayStart} seconds ...`);
            await new Promise((r) => {
               setTimeout(r, Environment.delayStart * 1000);
            });
        }

        console.log("======== Checking configuration ======== ")
        await Environment.validateAndSummarize();
        console.log("================ DONE ================== ")
        console.log("")

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
            new GqlLogger()],
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
            async onDisconnect(options:ServerOptions, socketOptionsOrServer:Server) {
                const upgradeRequest = (<any>options).upgradeReq;
                const ip = upgradeRequest.headers['forwarded-for']
                  ?? upgradeRequest.headers['x-forwarded-for']
                  ?? upgradeRequest.connection.remoteAddress;

                console.log(`-->X [${new Date().toJSON()}] [] [] [${ip}] [subscriptionServer.onConnect]: Websocket connection closed.`);
            },
            async onConnect(connectionParams:any, webSocket:any) {
                // WS
                const contextId = Session.generateRandomBase64String(8);
                let isSubscription = false;
                let authorizationHeaderValue: string | undefined;
                let originHeaderValue: string | undefined;

                const upgradeRequest = webSocket.upgradeReq;
                const cookieValue = upgradeRequest.headers["cookie"];
                const ip = upgradeRequest.headers['forwarded-for']
                  ?? upgradeRequest.headers['x-forwarded-for']
                  ?? upgradeRequest.connection.remoteAddress;

                isSubscription = true;
                let sessionToken = Main.tryGetSessionToken(cookieValue);

                let session: PrismaSession|null = await Context.findSession(sessionToken);
                if (session) {
                    console.log(`-->] [${new Date().toJSON()}] [${session.id}] [${contextId}] [${ip}] [subscriptionServer.onConnect]: New websocket subscription client.`);
                } else {
                    console.log(`-->] [${new Date().toJSON()}] [] [${contextId}] [${ip}] [subscriptionServer.onConnect]: New websocket subscription client.`);
                }

                const context = new Context(
                  contextId,
                  isSubscription,
                  authorizationHeaderValue,
                  originHeaderValue,
                  session,
                  ip);

                return context;
            },
        }, {
            server: httpServer,
            path: server.graphqlPath,
        });


        console.log(`Subscribing to blockchain events from the indexer at ${Environment.blockchainIndexerUrl} ..`)
        const conn = new BlockchainEventSource(Environment.blockchainIndexerUrl);
        conn.connect();
        console.log("Subscription ready.")

        this.listenForDbEvents('new_message')
          .catch(e => {
              console.error(`The notifyConnection for 'new_message' events died:`, e);
          });

        this.listenForDbEvents('follow_trust')
          .catch(e => {
              console.error(`The notifyConnection for 'follow_trust' events died:`, e);
          });

        await this._dropper.start();

        const PORT = 8989;
            httpServer.listen(PORT, () =>
              console.log(`Server is now running on http://localhost:${PORT}/graphql`)
            );
    }

    private static tryGetSessionToken(cookieValue?:string) {
        let sessionToken: string | undefined = undefined;
        if (cookieValue) {
            const cookies = cookieValue.split(";")
              .map((o: string) => o.trim().split("="))
              .reduce((p: { [key: string]: any }, c: string[]) => {
                  p[c[0]] = c[1];
                  return p
              }, {});
            if (cookies["session"]) {
                sessionToken = decodeURIComponent(cookies["session"]);
            }
        }
        return sessionToken;
    }

    private static findRecipientInPayload(msg:Notification) {
        if (!msg.payload) {
            return null;
        }

        const payload = JSON.parse(msg.payload);
        if (!payload.to) {
            return null;
        }

        const to: string = payload.to;
        if (!RpcGateway.get().utils.isAddress(to)) {
            return null;
        }

        return to;
    }

    private async listenForDbEvents(channel:string) {
        while (true) {
            let newMessageConnection: PoolClient|null = null;
            console.log(`Trying to create the notifyConnection for channel '${channel}' ..`);
            try {
                newMessageConnection = await Environment.indexDb.connect();
                await new Promise(async (resolve, reject) => {
                    if (!newMessageConnection) {
                        reject(new Error(`The notifyConnection for channel '${channel}' couldn't be established and is 'null'.`));
                        return;
                    }
                    // Listen for all pg_notify channel messages
                    newMessageConnection.on("error", async function (err) {
                        reject(err);
                    });
                    newMessageConnection.on('notification', async function (msg) {
                        if (msg.channel != channel) {
                            return;
                        }
                        const to = Main.findRecipientInPayload(msg);
                        if (!to) {
                            return;
                        }
                        console.log(` *-> [${new Date().toJSON()}] [] [] [listenForDbEvents.onNotification: ${channel}]: ${JSON.stringify(msg.payload)}`);
                        await ApiPubSub.instance.pubSub.publish(`events_${to}`, {
                            events: {
                                type: channel
                            }
                        });
                    });

                    console.log(`notifyConnection for channel '${channel}' established.`);
                    await newMessageConnection.query(`LISTEN ${channel}`);
                });
            } catch (e) {
                console.error(`The notifyConnection for channel '${channel}' experienced an error: `, e);
            } finally {
                try {
                    newMessageConnection?.release();
                } catch (e) {
                    console.error(`Couldn't release the notifyConnection for channel '${channel}' on error:`, e);
                }
            }

            console.log(`Retrying notifyConnection for channel '${channel}' in 10 sec. ..`);
            await new Promise((resolve) => {
                setTimeout(resolve, 10000);
            });
        }
    }
}

new Main()
    .run2()
    .then(() => "Started");
