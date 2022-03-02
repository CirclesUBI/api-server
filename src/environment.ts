import BN from "bn.js";
import { RpcGateway } from "./rpcGateway";
import { Account } from "web3-core";
import { GnosisSafeProxy } from "./circles/safe/gnosisSafeProxy";
import AWS from "aws-sdk";
import { Pool } from "pg";
import fetch from "cross-fetch";
import { PrismaClient } from "./api-db/client";
import {Generate} from "./generate";

export type SmtpConfig = {
  from: string;
  server: string;
  user: string;
  password: string;
  secure: boolean;
  port: number;
  localAddress?: string;
  debug?: boolean;
};

export class Environment {

  static async validateAndSummarize() {
    const errors:string[] = [];

    if (!this.corsOrigins) {
      errors.push(`The CORS_ORIGNS environment variable is not set.`);
    }
    if (!this.appUrl) {
      errors.push(`The APP_URL environment variable is not set.`);
    }
    if (!this.blockchainIndexerUrl) {
      errors.push(
        `The BLOCKCHAIN_INDEX_WS_URL environment variable is not set.`
      );
    }
    if (!this.rpcGatewayUrl) {
      errors.push(`The RPC_GATEWAY_URL environment variable is not set.`);
    }
    if (!this.readonlyApiConnectionString) {
      errors.push(
        `The CONNECTION_STRING_RO environment variable is not set.`
      );
    }
    if (!this.readWriteApiConnectionString) {
      errors.push(
        `The CONNECTION_STRING_RW environment variable is not set.`
      );
    }
    if (!this.appId) {
      errors.push(`The APP_ID environment variable is not set.`);
    }
    if (!this.acceptedIssuer) {
      errors.push(`The ACCEPTED_ISSUER environment variable is not set.`);
    }
    if (!this.externalDomain) {
      errors.push(`The EXTERNAL_DOMAIN environment variable is not set.`);
    }
    if (!this.operatorOrganisationAddress) {
      errors.push(
        `The OPERATOR_ORGANISATION_ADDRESS environment variable is not set.`
      );
    }

    console.log(
      `* Testing connection to the json rpc gateway (${this.rpcGatewayUrl}) ...`
    );
    const rpcGateway = await fetch(
      this.rpcGatewayUrl
        .replace("ws://", "http://")
        .replace("wss://", "https://")
    );
    if (rpcGateway.status < 500) {
      console.log("  Success. Body: " + (await rpcGateway.text()));
    } else {
      errors.push(
        `The json rpc gateway responded with a non 200 code: ${
          rpcGateway.status
        }. Body: ${await rpcGateway.text()}`
      );
    }

    console.log("* Testing operatorOrganisationAddress ..");
    let nonce = await new GnosisSafeProxy(
      RpcGateway.get(),
      RpcGateway.get().utils.toChecksumAddress(this.operatorOrganisationAddress)
    ).getNonce();
    console.log(`  ${this.operatorOrganisationAddress} nonce is: ${nonce}`);

    if (!process.env.INVITATION_FUNDS_SAFE_ADDRESS) {
      errors.push(
        `The INVITATION_FUNDS_SAFE_ADDRESS environment variable is not set.`
      );
    }

    console.log("* Testing invitationFundsSafe ..");
    nonce = await this.invitationFundsSafe.getNonce();
    console.log(`  ${this.invitationFundsSafe.address} nonce is: ${nonce}`);

    if (!process.env.INVITATION_FUNDS_SAFE_KEY) {
      errors.push(
        `The INVITATION_FUNDS_SAFE_KEY environment variable is not set.`
      );
    }

    /*
    if (!process.env.REWARD_TOKEN_ADDRESS) {
      errors.push(`The REWARD_TOKEN_ADDRESS environment variable is not set.`);
    }

    if (!process.env.VERIFICATION_REWARD_FUNDS_SAFE_ADDRESS) {
      errors.push(
        `The VERIFICATION_REWARD_FUNDS_SAFE_ADDRESS environment variable is not set.`
      );
    }
    console.log("* Testing verificationRewardFundsSafe ..");

    nonce = await this.verificationRewardFundsSafe.getNonce();
    console.log(
      `  ${this.verificationRewardFundsSafe.address} nonce is: ${nonce}`
    );

    if (!process.env.VERIFICATION_REWARD_FUNDS_KEY) {
      errors.push(
        `The VERIFICATION_REWARD_FUNDS_KEY environment variable is not set.`
      );
    }
     */

    if (
      !process.env.DIGITALOCEAN_SPACES_ENDPOINT ||
      !process.env.DIGITALOCEAN_SPACES_KEY ||
      !process.env.DIGITALOCEAN_SPACES_SECRET
    ) {
      errors.push(
        `The DIGITALOCEAN_SPACES_ENDPOINT, DIGITALOCEAN_SPACES_KEY or DIGITALOCEAN_SPACES_SECRET environment variable is not set.`
      );
    }

    console.log(`* Testing connection to the utility-db ...`);
    await this.utilityDb.query("select 1");
    console.log(`  Success`);

    console.log(`* Testing connection to the indexer-db ...`);
    await this.indexDb.query("select 1");
    console.log(`  Success`);

    console.log(`* Testing connection to the pgReadWriteApiDb ...`);
    await this.pgReadWriteApiDb.query("select 1");
    console.log(`  Success`);

    console.log(`* Testing connection to the readonly api-db ...`);
    await this.readonlyApiDb.$queryRaw("select 1");
    console.log(`  Success`);

    console.log(`* Testing connection to the read/write api-db ...`);
    await this.readWriteApiDb.$queryRaw("select 1");
    console.log(`  Success`);

    console.log(
      `* Testing connection to the indexer ws endpoint (${this.blockchainIndexerUrl}) ...`
    );
    let u = this.blockchainIndexerUrl
      .replace("ws://", "http://")
      .replace("wss://", "https://");

    if (!u.endsWith("/")) {
      u += "/";
    }
    const indexerWsEndpoint = await fetch(u, {
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml;",
      },
    });
    if (indexerWsEndpoint.status < 500) {
      console.log("  Success. Body: " + (await indexerWsEndpoint.text()));
    } else {
      const body = await indexerWsEndpoint.text();
      errors.push(
        `The indexer ws endpoint responded with a non 200 code: ${indexerWsEndpoint.status}. Body: ${body}`
      );
    }

    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }
  }

  static get appUrl(): string {
    return <string>process.env.APP_URL;
  }

  static get smtpConfig(): SmtpConfig {
    return {
      from: <string>process.env.MAIL_FROM,
      server: <string>process.env.SMTP_HOST,
      user: <string>process.env.SMTP_USER,
      password: <string>process.env.SMTP_PASSWORD,
      localAddress: <string>process.env.SMTP_LOCAL_ADDRESS,
      debug: !!process.env.SMTP_DEBUG,
      port: parseInt(<string>process.env.SMTP_PORT),
      secure: true,
    };
  }

  private static _instanceId = Generate.randomBase64String(8).substr(0, 8);
  static get instanceId() : string {
    return this._instanceId;
  }

  private static _utilityDb: Pool = new Pool({
    connectionString: process.env.UTILITY_DB_CONNECTION_STRING,
    //ssl: !process.env.DEBUG,
  }).on("error", (err) => {
    console.error("An idle client has experienced an error", err.stack);
  });

  static get utilityDb(): Pool {
    return Environment._utilityDb;
  }

  private static _indexDb: Pool = new Pool({
    connectionString: process.env.BLOCKCHAIN_INDEX_DB_CONNECTION_STRING,
    ssl: !process.env.DEBUG,
  }).on("error", (err) => {
    console.error("An idle client has experienced an error", err.stack);
  });
  static get indexDb(): Pool {
    return Environment._indexDb;
  }

  private static _pgReadWriteApiDb: Pool = new Pool({
    connectionString: process.env.CONNECTION_STRING_RW,
    ssl: !process.env.DEBUG,
  }).on("error", (err) => {
    console.error("An idle client has experienced an error", err.stack);
  });
  static get pgReadWriteApiDb(): Pool {
    return Environment._pgReadWriteApiDb;
  }

  private static _readonlyApiDb: PrismaClient;

  static get readonlyApiDb(): PrismaClient {
    if (!this._readonlyApiDb) {
      this._readonlyApiDb = new PrismaClient({
        datasources: {
          db: {
            url: <string>process.env.CONNECTION_STRING_RO,
          },
        },
      });
    }
    return this._readonlyApiDb;
  }

  private static _readWriteApiDb: PrismaClient;

  static get readWriteApiDb(): PrismaClient {
    if (!this._readWriteApiDb) {
      this._readWriteApiDb = new PrismaClient({
        datasources: {
          db: {
            url: <string>process.env.CONNECTION_STRING_RW,
          },
        },
      });
    }
    return this._readWriteApiDb;
  }

  static get corsOrigins(): string {
    return <string>process.env.CORS_ORIGNS;
  }

  static get blockchainIndexerUrl(): string {
    return <string>process.env.BLOCKCHAIN_INDEX_WS_URL;
  }

  static get rpcGatewayUrl(): string {
    return <string>process.env.RPC_GATEWAY_URL;
  }

  static get delayStart(): number {
    return process.env.DELAY_START ? parseInt(process.env.DELAY_START) : 0;
  }

  static get readonlyApiConnectionString(): string {
    return <string>process.env.CONNECTION_STRING_RO;
  }

  static get readWriteApiConnectionString(): string {
    return <string>process.env.CONNECTION_STRING_RW;
  }

  static get sessionLifetimeInSeconds(): number {
    return parseInt(
      <string | undefined>process.env.SESSION_LIIFETIME ??
        (60 * 60 * 24 * 30).toString()
    );
  }

  static get appId(): string {
    return <string>process.env.APP_ID;
  }

  static get acceptedIssuer(): string {
    return <string>process.env.ACCEPTED_ISSUER;
  }

  static get isLocalDebugEnvironment(): boolean {
    return !!process.env.DEBUG;
  }

  static get externalDomain(): string {
    return <string>process.env.EXTERNAL_DOMAIN;
  }

  static get isAutomatedTest(): boolean {
    return !!process.env.IS_AUTOMATED_TEST;
  }
  static get fixedGasPrice(): number {
    return !process.env.IS_AUTOMATED_TEST ? 0 : 1;
  }

  /**
   * The safe address of the organisation which operates this instance.
   */
  static get operatorOrganisationAddress(): string {
    // TODO: Remove default value "Basic Income Lab - Test Orga"
    return <string>(
      (process.env.OPERATOR_ORGANISATION_ADDRESS ??
        "0xc5a786eafefcf703c114558c443e4f17969d9573")
    );
  }

  static get circlesHubAddress(): string {
    return <string>(
      (process.env.CIRCLES_HUB_ADDRESS?.toLowerCase() ??
        "0x29b9a7fBb8995b2423a71cC17cf9810798F6C543")
    );
  }

  static get invitationFundsSafe(): GnosisSafeProxy {
    return new GnosisSafeProxy(
      RpcGateway.get(),
      RpcGateway.get().utils.toChecksumAddress(
        <string>process.env.INVITATION_FUNDS_SAFE_ADDRESS
      )
    );
  }

  static get invitationFundsSafeOwner(): Account {
    return RpcGateway.get().eth.accounts.privateKeyToAccount(
      <string>process.env.INVITATION_FUNDS_SAFE_KEY?.toLowerCase()
    );
  }

  static get verificationRewardFundsSafe(): GnosisSafeProxy {
    return new GnosisSafeProxy(
      RpcGateway.get(),
      RpcGateway.get().utils.toChecksumAddress(
        <string>process.env.VERIFICATION_REWARD_FUNDS_SAFE_ADDRESS
      )
    );
  }

  static get verificationRewardFundsSafeOwner(): Account {
    return RpcGateway.get().eth.accounts.privateKeyToAccount(
      <string>process.env.VERIFICATION_REWARD_FUNDS_KEY?.toLowerCase()
    );
  }

  static get rewardTokenAddress(): string {
    return <string>process.env.REWARD_TOKEN_ADDRESS?.toLowerCase();
  }

  static get filesBucket(): AWS.S3 {
    const spacesEndpoint = new AWS.Endpoint(
      <string>process.env.DIGITALOCEAN_SPACES_ENDPOINT
    );
    return new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: process.env.DIGITALOCEAN_SPACES_KEY,
      secretAccessKey: process.env.DIGITALOCEAN_SPACES_SECRET,
    });
  }

  /**
   * The amount of xDai with which new invitation-EOAs are funded.
   */
  static get invitationFundsAmount(): BN {
    return new BN(
      <string | undefined>process.env.INVITATION_FUNDS_AMOUNT ??
        RpcGateway.get().utils.toWei("0.1", "ether")
    );
  }
}
