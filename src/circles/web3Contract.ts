import type {Contract, PastEventOptions} from "web3-eth-contract";
import Web3 from "web3";
import type Common from "ethereumjs-common";
import {Transaction, TxData} from "ethereumjs-tx";
import type {TransactionReceipt} from "web3-core";
import {Subject} from "rxjs";
import {BN} from "ethereumjs-util";
import {RpcGateway} from "./rpcGateway";

export abstract class Web3Contract {
    readonly web3: Web3;
    readonly address: string;
    readonly contract: Contract;

    protected readonly _pastEvents: Subject<any> = new Subject<any>();

    constructor(web3: Web3, contractAddress: string, contractInstance: Contract) {
        if (!web3)
            throw new Error("The 'web3' parameter must be set.");
        if (!web3.utils.isAddress(contractAddress))
            throw new Error("The 'contractAddress' parameter is not a valid ethereum address.");
        if (!contractInstance)
            throw new Error("The 'contractInstance' parameter must have a valid value.");

        this.web3 = web3;
        this.address = contractAddress;
        this.contract = contractInstance;
    }

    /**
     * Gets all last events that conform to the query specification and feeds the to all subscribers.
     * @param options
     */
    async feedPastEvents(options: PastEventOptions & { event: string }) {
        const result = await this.contract.getPastEvents(options.event, options);
        result.forEach(event => this._pastEvents.next(event));
        return result.length;
    }

    /**
     * Subscribes to all of the passed events and returns an Observable instance.
     * @param events
     */
    events(events: string[]) {
        const subject = new Subject<any>();
        this._pastEvents.subscribe(next => subject.next(next));

        for (let event of events) {
            const e = this.contract.events[event];
            if (!e)
                throw new Error(`There is no event with the name '${event}' on the ABI description.`);

            this.contract.events[event]()
                .on('data', (event: any) => subject.next(event));
        }

        return subject;
    }

    static async signRawTransaction(ownerAddress: string, privateKey: string, to: string, data: string, gasLimit: BN, value: BN)
        : Promise<string> {
        const web3 = RpcGateway.get();
        const ethJsCommon: Common = await RpcGateway.getEthJsCommon();
        const nonce = "0x" + Web3.utils.toBN(await web3.eth.getTransactionCount(ownerAddress)).toString("hex");

        const rawTx: TxData = {
            gasPrice: "0x" + (await RpcGateway.getGasPrice()).toString("hex"),
            gasLimit: "0x" + gasLimit.toString("hex"),
            to: to,
            value: "0x" + value.toString("hex"),
            data: data,
            nonce: nonce
        };

        const txOptions = ethJsCommon
            ? {common: ethJsCommon}
            : {};

        const tx = new Transaction(rawTx, txOptions);
        tx.sign(Buffer.from(privateKey.slice(2), "hex"));

        return '0x' + tx.serialize().toString('hex');
    }

    static async sendSignedRawTransaction(serializedTx: string): Promise<TransactionReceipt> {
        const web3 = RpcGateway.get();
        return web3.eth.sendSignedTransaction(serializedTx);
    }
}
