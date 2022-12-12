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
import {AppNotificationProcessor} from "./indexer-api/appNotificationProcessor";
import {jwksGetHandler} from "./httpHandlers/get/jwks";
import {JobQueue} from "./jobs/jobQueue";
import {gqlSubscriptionServer} from "./gqlSubscriptionServer";
import {uploadPostHandler} from "./httpHandlers/post/upload";
import {triggerGetHandler} from "./httpHandlers/get/trigger";
import {jobSink} from "./jobs/jobSink";
import {JobType} from "./jobs/descriptions/jobDescription";
import express from "express";
import cors from "cors";
import * as graphqlImport from "@graphql-tools/import";
import {healthGetHandler} from "./httpHandlers/get/health";
import {RotateJwks} from "./jobs/descriptions/maintenance/rotateJwks";
import {RequestUbiForInactiveAccounts} from "./jobs/descriptions/maintenance/requestUbiForInactiveAccounts";
import {linkGetHandler} from "./httpHandlers/get/link";

const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const corsOrigins = Environment.corsOrigins.split(";").map((o) => o.trim());
console.log("* CORS_ORIGINS:", corsOrigins);

declare global {
  interface Array<T> {
    groupBy(groupSelector: (item: T) => string|number|null|undefined): { [group: string]: T[] };
    toLookup(keySelector: (item: T) => string): { [key: string]: boolean };
    toLookup<TValue>(keySelector: (item: T) => string|number|null|undefined, valueSelector?: (item: T) => TValue): { [key: string]: TValue };
  }
}
declare global {
  interface ReadonlyArray<T> {
    groupBy(groupSelector: (item: T) => string|number|null|undefined): { [group: string]: T[] };
    toLookup(keySelector: (item: T) => string): { [key: string]: boolean };
    toLookup<TValue>(keySelector: (item: T) => string|number|null|undefined, valueSelector?: (item: T) => TValue): { [key: string]: TValue };
  }
}

Array.prototype.groupBy = function groupBy<T>(groupSelector: (item: T) => string): { [group: string]: T[] } {
  return (<T[]>this).reduce((p, c) => {
    const group = groupSelector(c);
    if (group === undefined || group === null) {
      return p;
    }
    if (!p[group]) {
      p[group] = [];
    }
    p[group].push(c);
    return p;
  }, <{ [group: string]: T[] }>{});
}

Array.prototype.toLookup = function toLookup<T, TValue>(keySelector: (item: T) => string, valueSelector?: (item: T) => TValue): { [key: string]: TValue } {
  return this.reduce((p, c) => {
    const key = keySelector(c);
    if (key === undefined || key === null) {
      return p;
    }
    p[key] = !valueSelector ? true : valueSelector(c);
    return p;
  }, <{ [key: string]: TValue }>{});
}

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
    app.use(express.json({limit: "10mb"}));
    app.use(
      express.urlencoded({
        limit: "10mb",
        extended: true
      })
    );

    app.post("/upload", cors(corsOptions), uploadPostHandler);
    app.get("/trigger", cors(corsOptions), triggerGetHandler);
    app.get("/jwks", cors(corsOptions), jwksGetHandler);
    app.get("/link", cors(corsOptions), linkGetHandler);
    app.get("/health", cors({
      origin: '*'
    }), healthGetHandler);

    const httpServer = createServer(app);
    const schema = makeExecutableSchema({
      typeDefs: graphqlImport.processImport("../src/server-schema.graphql"),
      resolvers,
    });

    let subscriptionServer: SubscriptionServer | null = null;

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
      validationRules: [
        /*
        createComplexityRule({
          estimators: [
            // Configure your estimators
            simpleEstimator({ defaultComplexity: 1 }),
          ],
          maximumComplexity: 1000,
          variables: {},
          onComplete: (complexity: number) => {
            console.log('Query Complexity:', complexity);
          },
        })
         */
      ]
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
        new AppNotificationProcessor()
      ]
    );

    indexerEventProcessor.run();

    const jobQueue = new JobQueue("jobQueue");
    const jobTopics: JobType[] = [
      "sendCrcReceivedEmail",
      "sendCrcTrustChangedEmail",
      "verifyEmailAddress",
      "sendVerifyEmailAddressEmail",
      "inviteCodeFromExternalTrigger",
      "echo",
      "sendWelcomeEmail",
      "requestUbiForInactiveAccounts",
      "rotateJwks",
      "autoTrust",
      "unreadNotification"
    ];

    jobQueue.consume(jobTopics, jobSink, false)
      .then(() => {
        console.info("JobQueue stopped.");
      }).catch(e => {
      console.error("JobQueue crashed.", e);
    });

    // TODO: Add follow trust job handling

    const PORT = 8989;
    httpServer.listen(PORT, () =>
      console.log(`Server is now running on http://localhost:${PORT}/graphql`)
    );
  }
}

new Main().run()
  .then(() => console.log("Started"))
  .then(async () => {
    console.log(`Warming up caches ..`);

    console.log(`Starting periodic task job factory. Yields every ${Environment.periodicTaskInterval / 1000} seconds.`);
    setInterval(async() => {
        const now = new Date();

        const requestUbiForInactiveAccounts = new RequestUbiForInactiveAccounts({
          year: now.getUTCFullYear(),
          month: now.getUTCMonth() + 1,
          date: now.getUTCDate(),
          hour: now.getUTCHours()
        });

        const rotateKeys = new RotateJwks({
          year: now.getUTCFullYear(),
          month: now.getUTCMonth() + 1,
          date: now.getUTCDate()
        });

        await JobQueue.produce([
          requestUbiForInactiveAccounts,
          rotateKeys
        ]);
    }, Environment.periodicTaskInterval);
});
