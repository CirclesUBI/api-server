import Web3 from "web3";
import { BN } from "ethereumjs-util";
import type { TransactionReceipt } from "web3-core";
import {ZERO_ADDRESS} from "./consts";
import {GnosisSafeProxy} from "./gnosisSafeProxy";
import {SafeOps} from "./safeOps";
import {Web3Contract} from "./web3Contract";
import {CIRCLES_HUB_ABI} from "./abi/circlesHubAbi";
import {TransactionInput} from "ethers-multisend";

export class CirclesHub extends Web3Contract {
  constructor(web3: Web3, hubAddress: string) {
    super(
      web3,
      hubAddress,
      new web3.eth.Contract(CIRCLES_HUB_ABI, hubAddress)
    );
  }

  static queryPastSignup(user: string, fromBlock?: number) {
    return {
      event: CirclesHub.SignupEvent,
      filter: {
        user: user,
      },
      fromBlock: fromBlock,
      toBlock: "latest",
    };
  }

  static queryPastSignups(ofUsers?: string[], fromBlock?: number) {
    return {
      event: CirclesHub.SignupEvent,
      filter: ofUsers
        ? {
            user: ofUsers,
          }
        : undefined,
      fromBlock: fromBlock,
      toBlock: "latest",
    };
  }

  static queryPastTransfers(from?: string, to?: string, fromBlock?: number) {
    if (!from && !to)
      throw new Error(
        "At least one of the two parameters has to be set to a value."
      );

    let f: any = {};
    if (from) f.from = from;
    if (to) f.to = to;

    return {
      event: CirclesHub.HubTransferEvent,
      filter: f,
      fromBlock: fromBlock,
      toBlock: "latest",
    };
  }

  static queryPastTrusts(
    canSendTo?: string,
    user?: string,
    fromBlock?: number,
    toBlock?: number
  ) {
    if (!canSendTo && !user)
      throw new Error(
        "At least one of the two parameters has to be set to a value."
      );

    let f: any = {};
    if (canSendTo) f.canSendTo = canSendTo;
    if (user) f.user = user;

    return {
      event: CirclesHub.TrustEvent,
      filter: f,
      fromBlock: fromBlock,
      toBlock: toBlock ?? "latest",
    };
  }

  static readonly SignupEvent = "Signup";
  static readonly HubTransferEvent = "HubTransfer";
  static readonly OrganizationSignupEvent = "OrganizationSignup";
  static readonly TrustEvent = "Trust";

  async signup(
    privateKey: string,
    safeProxy: GnosisSafeProxy
  ): Promise<TransactionReceipt> {
    const txData = this.contract.methods.signup().encodeABI();

    return await safeProxy.execTransaction(privateKey, {
      to: this.address,
      data: txData,
      value: new BN("0"),
      refundReceiver: ZERO_ADDRESS,
      gasToken: ZERO_ADDRESS,
      operation: SafeOps.CALL,
    });
  }

  async signupOrganisation(
    privateKey: string,
    safeProxy: GnosisSafeProxy
  ): Promise<TransactionReceipt> {
    const txData = this.contract.methods.organizationSignup().encodeABI();

    return await safeProxy.execTransaction(privateKey, {
      to: this.address,
      data: txData,
      value: new BN("0"),
      refundReceiver: ZERO_ADDRESS,
      gasToken: ZERO_ADDRESS,
      operation: SafeOps.CALL,
    });
  }

  async setTrust(
    privateKey: string,
    safeProxy: GnosisSafeProxy,
    to: string,
    trustPercentage: BN
  ): Promise<TransactionReceipt> {
    const txData = this.contract.methods.trust(to, trustPercentage).encodeABI();

    const a = await safeProxy.execTransaction(privateKey, {
      to: this.address,
      data: txData,
      value: new BN("0"),
      refundReceiver: ZERO_ADDRESS,
      gasToken: ZERO_ADDRESS,
      operation: SafeOps.CALL,
    });

    return a;
  }

  async transferTroughEthers(
    privateKey: string,
    safeProxy: GnosisSafeProxy,
    tokenOwners: string[],
    sources: string[],
    destinations: string[],
    values: BN[]
  ): Promise<TransactionInput> {

    const transfer = {
      tokenOwners: tokenOwners,
      sources: sources,
      destinations: destinations,
      values: values,
    };

    const txData = this.encodeTransferThrough(transfer);

    const tx = safeProxy.toEthersTx(privateKey, {
      to: this.address,
      data: txData,
      value: new BN("0"),
      refundReceiver: ZERO_ADDRESS,
      gasToken: ZERO_ADDRESS,
      operation: SafeOps.CALL,
    });

    return tx;
  }

  async transferTrough(
    privateKey: string,
    safeProxy: GnosisSafeProxy,
    tokenOwners: string[],
    sources: string[],
    destinations: string[],
    values: BN[]
  ): Promise<TransactionReceipt> {
    const transfer = {
      tokenOwners: tokenOwners,
      sources: sources,
      destinations: destinations,
      values: values,
    };

    const txData = await this.encodeTransferThrough(transfer);

    return await safeProxy.execTransaction(privateKey, {
      to: this.address,
      data: txData,
      value: new BN("0"),
      refundReceiver: ZERO_ADDRESS,
      gasToken: ZERO_ADDRESS,
      operation: SafeOps.CALL,
    });
  }

  public encodeTransferThrough(transfer: { sources: string[]; destinations: string[]; values: BN[]; tokenOwners: string[] }) {
    const txData = this.contract.methods
      .transferThrough(
        transfer.tokenOwners,
        transfer.sources,
        transfer.destinations,
        transfer.values
      )
      .encodeABI();
    return txData;
  }
}
