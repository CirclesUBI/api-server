import BN from "bn.js";
import { RpcGateway } from "./circles/rpcGateway";
import { Account } from "web3-core";
import { GnosisSafeProxy } from "./circles/gnosisSafeProxy";
import { Pool } from "pg";
import fetch from "cross-fetch";
import { PrismaClient } from "./api-db/client";
import { Generate } from "./utils/generate";
import {NonceManager} from "./nonceManager/nonceManager";

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

export type GoogleCloudCredentials = {
  type?: string;
  project_id?: string;
  client_email?: string;
  private_key?: string;
  [x: string]: any;
};

export enum UploadTarget {
  None = 0,
  GCS = 1,
  S3 = 2,
}

export class Environment {
  static async validateAndSummarize(logInfo: boolean = true) {
    const errors: string[] = [];

    if (!this.corsOrigins) {
      errors.push(`The CORS_ORIGNS environment variable is not set.`);
    }
    if (!this.appUrl) {
      errors.push(`The APP_URL environment variable is not set.`);
    }
    if (!this.blockchainIndexerUrl) {
      errors.push(`The BLOCKCHAIN_INDEX_WS_URL environment variable is not set.`);
    }
    if (!this.rpcGatewayUrl) {
      errors.push(`The RPC_GATEWAY_URL environment variable is not set.`);
    }
    if (!this.readonlyApiConnectionString) {
      errors.push(`The CONNECTION_STRING_RO environment variable is not set.`);
    }
    if (!this.readWriteApiConnectionString) {
      errors.push(`The CONNECTION_STRING_RW environment variable is not set.`);
    }
    if (!this.appId) {
      errors.push(`The APP_ID environment variable is not set.`);
    }
    if (!this.externalDomains.length) {
      errors.push(`The EXTERNAL_DOMAIN environment variable is not set.`);
    }
    if (!this.operatorOrganisationAddress) {
      errors.push(`The OPERATOR_ORGANISATION_ADDRESS environment variable is not set.`);
    }
    if (!this.pathfinderUrl) {
      errors.push(`The PATHFINDER_URL environment variable is not set.`);
    }

    if (logInfo) {
      console.log(`* Testing connection to the json rpc gateway (${this.rpcGatewayUrl}) ...`);
    }
    const rpcGateway = await fetch(this.rpcGatewayUrl.replace("ws://", "http://").replace("wss://", "https://"));
    if (rpcGateway.status < 500) {
      if (logInfo) {
        console.log("  Success. Body: " + (await rpcGateway.text()));
      }
    } else {
      errors.push(
        `The json rpc gateway responded with a non 200 code: ${rpcGateway.status}. Body: ${await rpcGateway.text()}`
      );
    }

    if (logInfo) {
      console.log("* Testing operatorOrganisationAddress ..");
    }
    let nonce = await new GnosisSafeProxy(
      RpcGateway.get(),
      RpcGateway.get().utils.toChecksumAddress(this.operatorOrganisationAddress)
    ).getNonce();
    if (logInfo) {
      console.log(`  ${this.operatorOrganisationAddress} nonce is: ${nonce}`);
    }
    if (!process.env.INVITATION_FUNDS_SAFE_ADDRESS) {
      errors.push(`The INVITATION_FUNDS_SAFE_ADDRESS environment variable is not set.`);
    }

    if (logInfo) {
      console.log("* Testing invitationFundsSafe ..");
    }
    nonce = await this.invitationFundsSafe.getNonce();
    if (logInfo) {
      console.log(`  ${this.invitationFundsSafe.address} nonce is: ${nonce}`);
    }
    if (!process.env.INVITATION_FUNDS_SAFE_KEY) {
      errors.push(`The INVITATION_FUNDS_SAFE_KEY environment variable is not set.`);
    }

    if (logInfo) {
      console.log(`* Checking which upload target to use (S3 or GCS) ...`);
    }

    this._uploadTarget = UploadTarget.None;

    if (
      this.s3AvatarBucketEndpoint &&
      this.s3AvatarBucketName &&
      this.s3AvatarBucketKeyId &&
      this.s3AvatarBucketKeySecret
    ) {
      if (logInfo) {
        console.log(`* Using S3 compatible storage:`);
        console.log(`  * Endpoint: ${this.s3AvatarBucketEndpoint}`);
        console.log(`  * Key-ID: ${this.s3AvatarBucketKeyId}`);
        console.log(`  * Bucket: ${this.s3AvatarBucketName}`);
      }
      this._uploadTarget = UploadTarget.S3;
    }

    if (this._uploadTarget == UploadTarget.None && this.gcsAvatarBucketName && this.googleCloudStorageCredentials) {
      if (logInfo) {
        console.log(`* Using GCS storage:`);
        console.log(`  * project_id:`, this.googleCloudStorageCredentials?.project_id);
        console.log(`  * private_key_id:`, this.googleCloudStorageCredentials?.private_key_id);
        console.log(`  * client_email:`, this.googleCloudStorageCredentials?.client_email);
      }
      this._uploadTarget = UploadTarget.GCS;
    }

    if (this._uploadTarget == UploadTarget.None) {
      errors.push(`Neither GCS_AVATAR_BUCKET nor  environment variable is not set.`);
    }

    if (logInfo) {
      console.log(`  Success`);
      console.log(`* Testing connection to the indexer-db ...`);
    }
    await this.indexDb.query("select 1");

    if (logInfo) {
      console.log(`  Success`);
      console.log(`* Testing connection to the pgReadWriteApiDb ...`);
    }
    await this.pgReadWriteApiDb.query("select 1");

    if (logInfo) {
      console.log(`  Success`);
      console.log(`* Testing connection to the readonly api-db ...`);
    }
    await this.readonlyApiDb.$queryRaw`select 1`;

    if (logInfo) {
      console.log(`  Success`);
      console.log(`* Testing connection to the read/write api-db ...`);
    }

    await this.readWriteApiDb.$queryRaw`select 1`;

    if (logInfo) {
      console.log(`  Success`);

      console.log(`* Testing connection to the indexer ws endpoint (${this.blockchainIndexerUrl}) ...`);
    }

    let u = this.blockchainIndexerUrl.replace("ws://", "http://").replace("wss://", "https://");

    if (!u.endsWith("/")) {
      u += "/";
    }
    const indexerWsEndpoint = await fetch(u, {
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml;",
      },
    });
    if (indexerWsEndpoint.status < 500) {
      if (logInfo) {
        console.log("  Success. Body: " + (await indexerWsEndpoint.text()));
      }
    } else {
      const body = await indexerWsEndpoint.text();
      errors.push(`The indexer ws endpoint responded with a non 200 code: ${indexerWsEndpoint.status}. Body: ${body}`);
    }

    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }
  }

  static get appUrl(): string {
    return <string>process.env.APP_URL;
  }

  static get nonceManager() : NonceManager {
    if (!Environment._nonceManager) {
      Environment._nonceManager = new NonceManager();
    }
    return Environment._nonceManager;
  }
  private static _nonceManager: NonceManager|undefined = undefined;

  private static _instanceId = Generate.randomBase64String(8).substr(0, 8);
  static get instanceId(): string {
    return this._instanceId;
  }

  static get keyRotationInterval(): number {
    return 24 * 60 * 60 * 1000;
  }

  static get periodicTaskInterval(): number {
    return 5 * 60 * 1000;
  }

  static get maxKeyAge(): number {
    return 2 * this.keyRotationInterval;
  }

  static get cookieSameSitePolicy(): string {
    return <string>process.env.COOKIE_SAME_SITE_POLICY ?? "Strict";
  }

  static get cookieSecurePolicy(): string {
    return <string>process.env.COOKIE_SECURE_POLICY ?? "Secure";
  }

  private static _indexDb: Pool = new Pool({
    connectionString: process.env.BLOCKCHAIN_INDEX_DB_CONNECTION_STRING,
    ssl: process.env.BLOCKCHAIN_INDEX_DB_SSL_CERT
      ? {
          cert: process.env.BLOCKCHAIN_INDEX_DB_SSL_CERT,
          ca: process.env.BLOCKCHAIN_INDEX_DB_SSL_CA,
        }
      : undefined,
  }).on("error", (err) => {
    console.error("An idle client has experienced an error", err.stack);
  });
  static get indexDb(): Pool {
    return Environment._indexDb;
  }

  private static _pgReadWriteApiDb: Pool = new Pool({
    connectionString: process.env.CONNECTION_STRING_RW,
    //ssl: !process.env.DEBUG,
    ssl: process.env.API_DB_SSL_CERT
      ? {
          cert: process.env.API_DB_SSL_CERT,
          ca: process.env.API_DB_SSL_CA,
        }
      : undefined,
  }).on("error", (err) => {
    console.error("An idle client has experienced an error", err.stack);
  });
  static get pgReadWriteApiDb(): Pool {
    return Environment._pgReadWriteApiDb;
  }

  private static _readonlyApiDb: PrismaClient;

  static get readonlyApiDb(): PrismaClient {
    if (!process.env.CONNECTION_STRING_RO) {
      throw new Error(`The CONNECTION_STRING_RO environment variable is not set.`);
    }

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
    if (!process.env.CONNECTION_STRING_RW) {
      throw new Error(`The CONNECTION_STRING_RW environment variable is not set.`);
    }
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

  static get pathfinderUrl(): string {
    return <string>process.env.PATHFINDER_URL;
  }

  static get corsOrigins(): string {
    return <string>process.env.CORS_ORIGINS;
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
    return parseInt(<string | undefined>process.env.SESSION_LIIFETIME ?? (60 * 60 * 24 * 30).toString());
  }

  static get appId(): string {
    return <string>process.env.APP_ID;
  }

  static get isLocalDebugEnvironment(): boolean {
    return !!process.env.DEBUG;
  }

  /*static get externalDomain(): string {
    return <string>process.env.EXTERNAL_DOMAIN;
  }*/

  static get externalDomains(): string[] {
    return (<string>process.env.EXTERNAL_DOMAIN).split(";").map((o) => o.trim());
  }

  public static get humanodeClientId(): string {
    return <string>process.env.HUMANODE_CLIENT_ID;
  }

  public static get humanodeOrgaSafeAddress(): string {
    return "0xfbdca35969325d28ec49fa05db8d0f8e969fe805";
  }

  public static get gorilloOrgaSafeAddress(): string {
    return "0xf9342ea6f2585d8c2c1e5e78b247ba17c32af46a";
  }

  static get isAutomatedTest(): boolean {
    return !!process.env.IS_AUTOMATED_TEST;
  }
  static get fixedGasPrice(): number {
    return !process.env.IS_AUTOMATED_TEST ? 0 : 1;
  }

  static get humanodeJwksUrl(): string {
    return "https://auth.staging.oauth2.humanode.io/.well-known/jwks.json";
  }

  static get humanodeIss(): string {
    return "https://auth.staging.oauth2.humanode.io/";
  }

  /**
   * The safe address of the organisation which operates this instance.
   */
  static get operatorOrganisationAddress(): string {
    // TODO: Remove default value "Basic Income Lab - Test Orga"
    return <string>(process.env.OPERATOR_ORGANISATION_ADDRESS ?? "0xc5a786eafefcf703c114558c443e4f17969d9573");
  }
  static get translatorOrganisationAddress(): string {
    // TODO: Remove default value "Basic Income Lab - Test Orga"
    return <string>(process.env.TRANSLATOR_ORGANISATION_ADDRESS ?? "0xe3F306f70A3FFDD20c7b26B3ad3650Cc31e5D84A");
  }
  static get circlesHubAddress(): string {
    return <string>(process.env.CIRCLES_HUB_ADDRESS?.toLowerCase() ?? "0x29b9a7fBb8995b2423a71cC17cf9810798F6C543");
  }

  static get invitationFundsSafe(): GnosisSafeProxy {
    return new GnosisSafeProxy(
      RpcGateway.get(),
      RpcGateway.get().utils.toChecksumAddress(<string>process.env.INVITATION_FUNDS_SAFE_ADDRESS)
    );
  }

  static get invitationFundsSafeOwner(): Account {
    return RpcGateway.get().eth.accounts.privateKeyToAccount(
      <string>process.env.INVITATION_FUNDS_SAFE_KEY?.toLowerCase()
    );
  }

  static get googleCloudStorageCredentials(): GoogleCloudCredentials | undefined {
    try {
      return JSON.parse(<string>process.env.GCS_CREDENTIALS);
    } catch {
      return undefined;
    }
  }

  static get gcsAvatarBucketName(): string {
    return <string>process.env.GCS_AVATAR_FILES_BUCKET_NAME;
  }

  /**
   * The amount of xDai with which new invitation-EOAs are funded.
   */
  static get invitationFundsAmount(): BN {
    return new BN(
      <string | undefined>process.env.INVITATION_FUNDS_AMOUNT ?? RpcGateway.get().utils.toWei("0.1", "ether")
    );
  }

  static get s3AvatarBucketName(): string {
    return <string>process.env.S3_AVATAR_FILES_BUCKET_NAME;
  }

  static get s3AvatarBucketEndpoint(): string {
    return <string>process.env.S3_AVATAR_FILES_BUCKET_ENDPOINT;
  }

  static get s3AvatarBucketPublicUrlPrefix(): string {
    return <string>process.env.S3_AVATAR_FILES_BUCKET_PUBLIC_URL_PREFIX;
  }

  static get s3AvatarBucketKeyId(): string {
    return <string>process.env.S3_AVATAR_FILES_BUCKET_KEY_ID;
  }

  static get s3AvatarBucketKeySecret(): string {
    return <string>process.env.S3_AVATAR_FILES_BUCKET_KEY_SECRET;
  }

  static get uploadTarget(): UploadTarget {
    return this._uploadTarget;
  }
  private static _uploadTarget: UploadTarget;
}
