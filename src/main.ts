import {createServer} from "http";
import {SubscriptionServer} from "subscriptions-transport-ws";
import {makeExecutableSchema} from "@graphql-tools/schema";
import {ApolloServer} from "apollo-server-express";
import {resolvers} from "./resolvers/resolvers";
import {Context} from "./context";
import {RpcGateway} from "./circles/rpcGateway";
import {GqlLogger} from "./gqlLogger";
import {Environment} from "./environment";
import {IndexerEvents} from "./indexer-api/indexerEvents";
import {PaymentProcessor} from "./indexer-api/paymentProcessor";
import {AppNotificationProcessor} from "./indexer-api/appNotificationProcessor";
import {ninetyDaysLater} from "./utils/90days";
import express from "express";
import {JobQueue} from "./jobs/jobQueue";
import {gqlSubscriptionServer} from "./gqlSubscriptionServer";
import {uploadPostHandler} from "./httpHandlers/post/upload";
import {triggerGetHandler} from "./httpHandlers/get/trigger";
import cors from "cors";
import {jobSink} from "./jobs/jobSink";
import {JobKind, JobType} from "./jobs/descriptions/jobDescription";
import * as graphqlImport from "@graphql-tools/import";
import {VerifyEmailAddress} from "./jobs/descriptions/emailNotifications/verifyEmailAddress";
import {Generate} from "./utils/generate";

const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const corsOrigins = Environment.corsOrigins.split(";").map((o) => o.trim());

export class Main {
  async run() {
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

    app.post("/upload", cors(corsOptions), uploadPostHandler);
    app.get("/trigger", cors(corsOptions), triggerGetHandler);

    const httpServer = createServer(app);
    const schema = makeExecutableSchema({
      typeDefs: graphqlImport.processImport("../src/server-schema.graphql"),
      resolvers,
    });

    let subscriptionServer: SubscriptionServer|null = null;

    const server = new ApolloServer({
      schema,
      context: Context.create,
      plugins: [
        {
          async serverWillStart() {
            return {
              async drainServer() {
                subscriptionServer?.close();
              },
            };
          },
        },
        ApolloServerPluginLandingPageGraphQLPlayground(),
        new GqlLogger(),
      ],
    });

    subscriptionServer = await gqlSubscriptionServer(schema, httpServer, server.graphqlPath);

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
    const jobTopics:JobType[] = [
      "broadcastChatMessage",
      "sendCrcReceivedEmail",
      "sendCrcTrustChangedEmail",
      "sendOrderConfirmationEmail",
      "invoicePayed",
      "verifyEmailAddress",
      "sendVerifyEmailAddressEmail"
    ];

    jobQueue.consume(jobTopics, jobSink, false)
      .then(() => {
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
}

new Main().run().then(() => console.log("Started")).then(async () => {
  // await ninetyDaysLater()
});
