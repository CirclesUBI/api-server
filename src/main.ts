import {createServer} from "http";
import {execute, subscribe} from "graphql";
import {SubscriptionServer} from "subscriptions-transport-ws";
import {makeExecutableSchema} from "@graphql-tools/schema";
import {Request, Response} from "express";
import {ApolloServer} from "apollo-server-express";
import {resolvers} from "./resolvers/resolvers";
import {importSchema} from "graphql-import";
import {Context} from "./context";
import {RpcGateway} from "./rpcGateway";
import {GqlLogger} from "./gqlLogger";
import {Session as PrismaSession} from "./api-db/client";
import {Session} from "./session";
import {Server, ServerOptions} from "ws";
import {Dropper} from "./dropper/dropper";
import {PromiseResult} from "aws-sdk/lib/request";
import {Environment} from "./environment";
import {IndexerEvents} from "./indexer-api/indexerEvents";
import {PaymentProcessor} from "./indexer-api/paymentProcessor";
import {AppNotificationProcessor} from "./indexer-api/appNotificationProcessor";
import {ninetyDaysLater} from "./90days";
import express from "express";
import AWS from "aws-sdk";
import {JobQueue} from "./jobQueue";
import {BroadcastChatMessage} from "./jobs/descriptions/chat/broadcastChatMessage";
import {BroadcastChatMessageWorker} from "./jobs/worker/chat/broadcastChatMessageWorker";
import {SendCrcReceivedEmailWorker} from "./jobs/worker/emailNotifications/sendCrcReceivedEmailWorker";
import {SendCrcTrustChangedEmailWorker} from "./jobs/worker/emailNotifications/sendCrcTrustChangedEmailWorker";
import {SendCrcReceivedEmail} from "./jobs/descriptions/emailNotifications/sendCrcReceivedEmail";
import {SendCrcTrustChangedEmail} from "./jobs/descriptions/emailNotifications/sendCrcTrustChangedEmail";
import {InvoicePayedWorker} from "./jobs/worker/payment/invoicePayedWorker";
import {InvoicePayed} from "./jobs/descriptions/payment/invoicePayed";


var cors = require("cors");

const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const corsOrigins = Environment.corsOrigins.split(";").map((o) => o.trim());

export class Main {
  private _dropper = new Dropper();

  async run2() {
    RpcGateway.setup(Environment.rpcGatewayUrl, Environment.fixedGasPrice);

    if (Environment.delayStart) {
      console.log(
        `Delaying the start for ${Environment.delayStart} seconds ...`
      );
      await new Promise((r) => {
        setTimeout(r, Environment.delayStart * 1000);
      });
    }

    console.log(`Starting instance '${Environment.instanceId} ...'`);
    console.log("======== Checking configuration ======== ");
    await Environment.validateAndSummarize();
    console.log("================ DONE ================== ");
    console.log("");

    const app = express();
    let corsOptions = {
      origin: corsOrigins,
      credentials: true,
    };

    app.use(cors(corsOptions));

    app.use(express.json({limit: "50mb"}));

    app.use(
      express.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 200000,
      })
    );

    app.post(
      "/upload",
      cors(corsOptions),
      async (req: Request, res: Response) => {
        try {
          const cookieValue = req.headers["cookie"];
          let sessionToken = Main.tryGetSessionToken(cookieValue);
          let validSession = null;

          if (sessionToken) {
            validSession = await Session.findSessionBysessionToken(
              Environment.readWriteApiDb,
              sessionToken
            );
          }
          if (!validSession) {
            return res.json({
              status: "error",
              message:
                "Authentication Failed. No session could be found for the supplied sessionToken.",
            });
          }

          const fileName = req.body.fileName;
          const mimeType = req.body.mimeType;
          const bytes = req.body.bytes;

          const saveResult = await saveImageToS3(fileName, bytes, mimeType);

          res.statusCode = 200;
          return res.json({
            status: "ok",
            url: `https://circlesland-pictures.fra1.cdn.digitaloceanspaces.com/${fileName}`,
          });
        } catch (e) {
          return res.json({
            status: "error",
            message: "Image Upload Failed.",
          });
        }
      }
    );

    async function saveImageToS3(
      key: string,
      imageBytes: any,
      mimeType: string
    ) {
      const params: {
        Bucket: string;
        Body?: any;
        ContentEncoding?: string;
        ContentType?: string;
        Key: string;
        ACL: string;
      } = {
        Bucket: "circlesland-pictures",
        Key: key,
        ACL: "public-read",
      };

      return new Promise<PromiseResult<AWS.S3.PutObjectOutput, AWS.AWSError>>(
        async (resolve, reject) => {
          try {
            params.ContentEncoding = "base64";
            params.ContentType = mimeType;
            params.Body = Buffer.from(
              imageBytes.replace(/^data:image\/\w+;base64,/, ""),
              "base64"
            );
            const result = await Environment.filesBucket
              .putObject(params)
              .promise();
            resolve(result);
          } catch (e) {
            reject(e);
          }
        }
      );
    }

    const httpServer = createServer(app);

    const apiSchemaTypeDefs = importSchema("../src/server-schema.graphql");
    const schema = makeExecutableSchema({
      typeDefs: <any>apiSchemaTypeDefs,
      resolvers,
    });

    const server = new ApolloServer({
      schema,
      context: Context.create,
      plugins: [
        {
          async serverWillStart() {
            return {
              async drainServer() {
                subscriptionServer.close();
              },
            };
          },
        },
        ApolloServerPluginLandingPageGraphQLPlayground(),
        new GqlLogger(),
      ],
    });

    await server.start();
    const serverMiddleware = server.getMiddleware({
      path: "/",
      cors: {
        origin: corsOrigins,
        credentials: true,
      },
    });

    app.use(serverMiddleware);
    app.use(function (err: any) {
      console.error(err.stack);
    });

    const subscriptionServer = SubscriptionServer.create(
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
          let sessionToken = Main.tryGetSessionToken(cookieValue);

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
        path: server.graphqlPath,
      }
    );

    console.log(
      `Subscribing to blockchain events from the indexer at ${Environment.blockchainIndexerUrl} ..`
    );

    const indexerEventProcessor = new IndexerEvents(
      Environment.blockchainIndexerUrl,
      2500,
      [
        new PaymentProcessor(),
        new AppNotificationProcessor()
      ]
    );

    indexerEventProcessor.run();

    const jobQueue = new JobQueue("jobQueue");
    jobQueue.consume([
        "broadcastChatMessage",
        "sendCrcReceivedEmail",
        "sendCrcTrustChangedEmail",
        "sendOrderConfirmationEmail",
        "invoicePayed"
      ],
      async (jobs) => {
        for (let job of jobs) {
          switch (job.topic) {
            case "broadcastChatMessage".toLowerCase():
              await new BroadcastChatMessageWorker().run(job.id, BroadcastChatMessage.parse(job.payload));
              break;
            case "sendCrcReceivedEmail".toLowerCase():
              await new SendCrcReceivedEmailWorker({
                errorStrategy: "logAndDrop"
              }).run(job.id, SendCrcReceivedEmail.parse(job.payload));
              break;
            case "sendCrcTrustChangedEmail".toLowerCase():
              await new SendCrcTrustChangedEmailWorker({
                errorStrategy: "logAndDrop"
              }).run(job.id, SendCrcTrustChangedEmail.parse(job.payload));
              break;
            case "invoicePayed".toLowerCase():
              await new InvoicePayedWorker({
                errorStrategy: "logAndDropAfterThreshold",
                dropThreshold: 3
              }).run(job.id, InvoicePayed.parse(job.payload));
              break;
          }
        }
      },
      1,
      false
      ).then(() => {
        console.info("JobQueue stopped.");
      }).catch(e => {
        console.error("JobQueue crashed.", e);
      });

    // TODO: Add follow trust job handling

/*
    this.listenForDbEvents("follow_trust").catch((e) => {
      console.error(`The notifyConnection for 'follow_trust' events died:`, e);
    });
*/

    const PORT = 8989;
    httpServer.listen(PORT, () =>
      console.log(`Server is now running on http://localhost:${PORT}/graphql`)
    );
  }

  private static tryGetSessionToken(cookieValue?: string) {
    let sessionToken: string | undefined = undefined;
    if (cookieValue) {
      const cookies = cookieValue
        .split(";")
        .map((o: string) => o.trim().split("="))
        .reduce((p: { [key: string]: any }, c: string[]) => {
          p[c[0]] = c[1];
          return p;
        }, {});
      if (cookies["session"]) {
        sessionToken = decodeURIComponent(cookies["session"]);
      }
    }
    return sessionToken;
  }
}

new Main().run2().then(() => console.log("Started")).then(async () => {
  // await ninetyDaysLater()
});
