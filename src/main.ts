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
import {JobType} from "./jobs/descriptions/jobDescription";
import * as graphqlImport from "@graphql-tools/import";

const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const corsOrigins = Environment.corsOrigins.split(";").map((o) => o.trim());


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
    const jobTopics: JobType[] = [
      "broadcastChatMessage",
      "sendCrcReceivedEmail",
      "sendCrcTrustChangedEmail",
      "sendOrderConfirmationEmail",
      "invoicePayed",
      "verifyEmailAddress",
      "sendVerifyEmailAddressEmail",
      "inviteCodeFromExternalTrigger",
      "echo",
      "broadcastPurchased",
      "sendWelcomeEmail"
    ];

    jobQueue.consume(jobTopics, jobSink, false)
      .then(() => {
        console.info("JobQueue stopped.");
      }).catch(e => {
      console.error("JobQueue crashed.", e);
    });

    // TODO: Add follow trust job handling

    // await JobQueue.produce([new InviteCodeFromExternalTrigger("event_1", "http://localhost:5000", "0xde374ece6fa50e781e81aac78e811b33d16912c7")]);
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

/*
import BN from "bn.js";
import fetch from "cross-fetch";
var xpath = require('xpath')
var dom = require('xmldom').DOMParser

function test() {
// The minimum ABI to get ERC20 Token balance
const minABI = [
  // balanceOf
  {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
  },
  // decimals
  {
    "constant":true,
    "inputs":[],
    "name":"decimals",
    "outputs":[{"name":"","type":"uint8"}],
    "type":"function"
  }
];

async function getBalance(tokenAddress:string, accountAddress:string) {
  const contract = new (RpcGateway.get().eth.Contract)(<any>minABI, tokenAddress);
  return  await contract.methods.balanceOf(accountAddress).call();
}

const bla = [
  {
    "token": "0x73ffa325faae2a3dfe267733a8e706121d164946",
    "tokenOwner": "0x009626daded5e90aecee30ad3ebf2b3e510fe256",
    "value": "2199363516775023934576",
    "from": "0xde374ece6fa50e781e81aac78e811b33d16912c7",
    "to": "0xc5a786eafefcf703c114558c443e4f17969d9573"
  },
  {
    "token": "0x4261ae3bdf4ffc77cc05f946e8d71fcc52d0159e",
    "tokenOwner": "0x475a1b36d540c05c1c7b7ca4598347c695ac1ec6",
    "value": "292781019127139598445",
    "from": "0xde374ece6fa50e781e81aac78e811b33d16912c7",
    "to": "0xc5a786eafefcf703c114558c443e4f17969d9573"
  },
  {
    "token": "0xf8263847879fb40360690f4fc686c0ce19455d8c",
    "tokenOwner": "0xec39d9c81acf2b7c4d847651757363ec1959d77d",
    "value": "31900270972726955813",
    "from": "0xde374ece6fa50e781e81aac78e811b33d16912c7",
    "to": "0xc5a786eafefcf703c114558c443e4f17969d9573"
  },
  {
    "token": "0x6b35c6da733836be97ced8627c3747824450926b",
    "tokenOwner": "0xde374ece6fa50e781e81aac78e811b33d16912c7",
    "value": "1327028843931182619366",
    "from": "0xde374ece6fa50e781e81aac78e811b33d16912c7",
    "to": "0xc5a786eafefcf703c114558c443e4f17969d9573"
  }
];

const balances = await Promise.all(bla.map(async o => {
  const balance = await getBalance(o.token, o.from);
  return balance;
}));


let startBlock = 19589380;
let stopBlock = 12529457;
let currentBlock = startBlock;
let nextPage = `/xdai/mainnet/blocks?block_number=${currentBlock}&block_type=Reorg&items_count=0`;

const blocks:number[] = [];

while (currentBlock > stopBlock && nextPage) {
  try {
    const result = await fetch(`https://blockscout.com` + nextPage + "&type=JSON")

    const data = <any>await result.json();
    const items:string[] = data.items;

    const regex = new RegExp(".*#(\d*)?.*");
    items.forEach(item => {
      const matches = regex[Symbol.matchAll](item);
      for (let match of matches) {
        const blockNo = parseInt(match[0].trim().substring(1));
        console.log(blockNo);
        currentBlock = blockNo;
        blocks.push(blockNo);
      }
    });

    nextPage = data.next_page_path;
  } catch (e) {
    console.error(e);
  }
  await new Promise((r) => setTimeout(r, 1000));
}


const uniqueBlocks = Object.keys(blocks.toLookup(o => o));
console.log(uniqueBlocks);

const diff = blubb.my.map((o,i) => {
  const a:any = {
    my: o,
    orig: blubb.original[i],
  };
  a.diff = a.my.sub(a.orig).toString();
  a.myStr = a.my.toString();
  a.origStr = a.orig.toString();
  return a;
});

console.log(diff);
}
*/