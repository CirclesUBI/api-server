import WebSocket from "ws";
import {IndexerEvent, IndexerEventProcessor} from "./indexerEventProcessor";
import {log, logErr} from "../log";
import {Environment} from "../environment";

export class IndexerEvents {
    readonly _indexerUrl:string;
    readonly _reconnectInterval:number;

    private readonly _eventProcessors: IndexerEventProcessor[];

    private _ws?: WebSocket;
    private _isOpen: boolean = false;
    private _reconnectTimeoutHandle: any;

    messageNo() {
        return this._messageNo;
    }
    private _messageNo = 0;

    constructor(indexerUrl:string, reconnectInterval:number, eventProcessors: IndexerEventProcessor[]) {
        this._indexerUrl = indexerUrl;
        this._reconnectInterval = reconnectInterval;
        this._eventProcessors = eventProcessors;
    }

    run() : void {
        console.log(`Connecting to ${this._indexerUrl} ..`);
        this._ws = new WebSocket(this._indexerUrl, {});

        this._ws.on("open", () => {
            this.onOpen();
        });
        this._ws.on("message", (e: any) => {
            const start = Date.now();

            const logExit = () => {
                log(" <-* ",
                    `[${this._messageNo}] [${this._indexerUrl}] [IndexerEvents.onMessage]`,
                    `took ${Date.now() - start} ms.`
                );
            }

            this.onMessage(e.toString())
                .then(logExit)
                .catch(logExit);
        });
        this._ws.on("error", (e: any) => {
            console.log("Websocket error: ", e);
        });
        this._ws.on("close", (e: any) => {
            console.log("Websocket closed: ", e);
            this.onClose();
        });
    }

    private onOpen() {
        this._isOpen = true;
        console.log(`Websocket connected to ${this._indexerUrl}.`);

        if (this._reconnectTimeoutHandle != null) {
            clearInterval(this._reconnectTimeoutHandle);
        }
    }

    private async onMessage(message: string) {
        this._messageNo++;

        try {
            const transactionHashes: string[] = JSON.parse(message);

            log(" *-> ",
                `[${this._messageNo}] [${this._indexerUrl}] [IndexerEvents.onMessage]`,
                `Received ${transactionHashes.length} tx-hashes.`
            );

            const {
                affectedAddresses,
                events
            } = await IndexerEvents.findIndexedEvents(transactionHashes);

            const executingHandlers =
                this._eventProcessors.map(ep =>
                    ep.onMessage(
                        this._messageNo,
                        this._indexerUrl,
                        affectedAddresses,
                        events));

            await Promise.all(executingHandlers);

        } catch (e) {
            const error = <any>e;
            logErr("ERR  ",
                `[${this._messageNo}] [${this._indexerUrl}] [IndexerEvents.onMessage]`,
                `The received websocket message couldn't be processed.`
            );
            logErr("ERR  ",
                `[${this._messageNo}] [${this._indexerUrl}] [IndexerEvents.onMessage]`,
                `Error is: ${error.message}\n${error.message}`
            );
            logErr("ERR  ",
                `[${this._messageNo}] [${this._indexerUrl}] [IndexerEvents.onMessage]`,
                `Message was: ${error.message}\n${error.stack}`
            );
        }
    }

    private static async findIndexedEvents(transactionHashes: string[])
        : Promise<{ affectedAddresses:string[], events: IndexerEvent[] }> {
        // Find all blockchainEvents in the reported new range
        const affectedAddressesQuery = `with a as (
            select 'CrcSignup' as type, hash, "user" as address1, null as address2, null as address3, null as value
            from crc_signup_2
            union all
            select 'CrcTrust' as type, hash, address as address1, can_send_to as address2, null as address3, "limit"::text as value
            from crc_trust_2
            union all
            select 'CrcOrganisationSignup' as type, hash, organisation as address1, null as address2, null as address3, null as value
            from crc_organisation_signup_2
            union all
            select 'CrcHubTransfer' as type, hash, "from" as address1, "to" as address2, null as address3, value::text as value
            from crc_hub_transfer_2
            union all
            select 'Erc20Transfer' as type, hash, "from" as address1, "to" as address2, null as address3, value::text as value
            from erc20_transfer_2
            union all
            select 'EthTransfer' as type, hash, "from" as address1, "to" as address2, null as address3, value::text as value
            from eth_transfer_2
            union all
            select 'GnosisSafeEthTransfer' as type, hash, "initiator" as address1, "from" as address2, "to" as address3, value::text as value
            from gnosis_safe_eth_transfer_2
        )
        select type, hash, address1, address2, address3, value
        from a
        where hash = ANY ($1);`;

        const relatedEvents = await Environment.indexDb.query(
            affectedAddressesQuery,
            [transactionHashes]
        );
        const relatedAddresses: { [safeAddress: string]: any } =
            relatedEvents.rows.reduce((p, c) => {
                if (c.address1) {
                    p[c.address1] = true;
                }
                if (c.address2) {
                    p[c.address2] = true;
                }
                if (c.address3) {
                    p[c.address3] = true;
                }
                return p;
            }, <{ [address: string]: any }>{});

        return {
            affectedAddresses: Object.keys(relatedAddresses),
            events: relatedEvents.rows.map((o) => {
                return {
                    type: o.type,
                    hash: o.hash,
                    address1: o.address1,
                    address2: o.address2,
                    address3: o.address3,
                    value: o.value
                };
            }),
        };
    }

    private onClose() {
        if (this._reconnectTimeoutHandle != null) {
            clearInterval(this._reconnectTimeoutHandle);
        }

        this._isOpen = false;

        log("WARN ",
            `[${this._messageNo}] [${this._indexerUrl}] [IndexerEvents.onClose]`,
            `Websocket connection to ${this._indexerUrl} closed. Reconnecting in ${this._reconnectInterval} ms.`
        );

        this._reconnectTimeoutHandle = setTimeout(() => {
            this.run();
        }, this._reconnectInterval);
    }
}