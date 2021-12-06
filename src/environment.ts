import BN from "bn.js";
import {RpcGateway} from "./rpcGateway";
import {Account} from "web3-core";
import {GnosisSafeProxy} from "./circles/safe/gnosisSafeProxy";
import AWS from "aws-sdk";
import {Pool} from "pg";

export type SmtpConfig = {
  from: string,
  server: string,
  user: string,
  password: string,
  secure: boolean,
  port: number
}

export class Environment {

  static validateAndSummarize() {
    console.log();
  }

  static get smtpConfig() : SmtpConfig {
    return {
      from: <string>process.env.MAIL_FROM,
      server: <string>process.env.SMTP_SERVER,
      user: <string>process.env.SMTP_USER,
      password: <string>process.env.SMTP_PASS,
      port: parseInt(<string>process.env.SMTP_PORT),
      secure: !!process.env.SMTP_SECURE
    };
  }

  private static _utilityDb:Pool = new Pool({
    connectionString: process.env.UTILITY_DB_CONNECTION_STRING
  }).on('error', (err) => {
    console.error('An idle client has experienced an error', err.stack)
  });
  static get utilityDb() : Pool {
    return Environment._utilityDb;
  }

  private static _indexDb:Pool = new Pool({
    connectionString: process.env.BLOCKCHAIN_INDEX_DB_CONNECTION_STRING
  }).on('error', (err) => {
    console.error('An idle client has experienced an error', err.stack)
  });
  static get indexDb() : Pool {
    return Environment._indexDb;
  }

  static get corsOrigins() : string {
    return <string>process.env.CORS_ORIGNS;
  }

  static get blockchainIndexerUrl() : string {
    return <string>process.env.BLOCKCHAIN_INDEX_WS_URL;
  }

  static get readonlyApiConnectionString() : string {
    return <string>process.env.CONNECTION_STRING_RO;
  }

  static get readWriteApiConnectionString() : string {
    return <string>process.env.CONNECTION_STRING_RW;
  }

  static get sessionLifetimeInSeconds() : number {
    return parseInt(<string|undefined>process.env.SESSION_LIIFETIME ?? (60*60*24*30).toString());
  }

  static get appId() : string {
    return <string>process.env.APP_ID;
  }

  static get acceptedIssuer() : string {
    return <string>process.env.ACCEPTED_ISSUER;
  }

  static get isLocalDebugEnvironment() : boolean {
    return !!process.env.DEBUG;
  }

  static get externalDomain() : string {
    return <string>process.env.EXTERNAL_DOMAIN;
  }

  /**
   * The safe address of the organisation which operates this instance.
   */
  static get operatorOrganisationAddress() : string {
    // TODO: Remove default value "Basic Income Lab - Test Orga"
    return <string>(process.env.OPERATOR_ORGANISATION_ADDRESS ?? "0xc5a786eafefcf703c114558c443e4f17969d9573");
  }

  static get circlesHubAddress() : string {
    return <string>(process.env.CIRCLES_HUB_ADDRESS ?? "0x29b9a7fBb8995b2423a71cC17cf9810798F6C543");
  }

  static get invitationFundsSafe() : GnosisSafeProxy {
    return new GnosisSafeProxy(RpcGateway.get(),
      <string>process.env.INVITATION_FUNDS_SAFE_ADDRESS)
  }

  static get invitationFundsSafeOwner() : Account {
    return RpcGateway.get().eth.accounts.privateKeyToAccount(
      <string>process.env.INVITATION_FUNDS_SAFE_KEY
    );
  }

  static get verificationRewardFundsSafe() : GnosisSafeProxy {
    return new GnosisSafeProxy(RpcGateway.get(),
      <string>process.env.VERIFICATION_REWARD_FUNDS_SAFE_ADDRESS)
  }

  static get verificationRewardFundsSafeOwner() : Account {
    return RpcGateway.get().eth.accounts.privateKeyToAccount(
      <string>process.env.VERIFICATION_REWARD_FUNDS_SAFE_KEY
    );
  }

  static get invoicesBucket() : AWS.S3 {
    const spacesEndpoint = new AWS.Endpoint(<string>process.env.DIGITALOCEAN_SPACES_ENDPOINT);
    return new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: process.env.DIGITALOCEAN_SPACES_KEY,
      secretAccessKey: process.env.DIGITALOCEAN_SPACES_SECRET
    });
  }

  /**
   * The amount of xDai with which new invitation-EOAs are funded.
   */
  static get invitationFundsAmount() : BN {
    return new BN(<string|undefined>process.env.INVITATION_FUNDS_AMOUNT ?? RpcGateway.get().utils.toWei("0.1", "ether"));
  }
}