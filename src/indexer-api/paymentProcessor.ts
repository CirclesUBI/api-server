import {IndexerEvent, IndexerEventProcessor} from "./indexerEventProcessor";
import {
    PdfDbInvoiceData
} from "../invoiceGenerator";
import {Environment} from "../environment";
import {log} from "../log";
import {EventType} from "../types";
import BN from "bn.js";
import {RpcGateway} from "../rpcGateway";
import {convertTimeCirclesToCircles} from "../timeCircles";
import {getDateWithOffset} from "../getDateWithOffset";
import {JobQueue} from "../jobQueue";
import {InvoicePayed} from "../jobs/descriptions/payment/invoicePayed";

type Transfer = {
    hash: string,
    index: number,
    timestamp: Date,
    block_number: number,
    from: string,
    to: string,
    value: string
};

type TransfersBySender = {
    [fromAddress:string]: Transfer[]
};

export class PaymentProcessor implements IndexerEventProcessor {
    constructor() {
    }

    async onMessage(messageNo:number,
                    sourceUrl:string,
                    affectedAddresses:string[],
                    events:IndexerEvent[]) : Promise<void> {

        const openInvoicesByCustomerAddress = await this.findOpenInvoices(
            messageNo,
            sourceUrl,
            affectedAddresses);

        const hubTransferEvents = events.filter((event: any) => event.type === EventType.CrcHubTransfer).map(o => o.hash);
        const hubTransfersBySender = await this.findRelatedHubTransfers(hubTransferEvents);

        for (let sender of Object.keys(hubTransfersBySender)) {
            const transfers = hubTransfersBySender[sender];
            const invoices = openInvoicesByCustomerAddress[sender];

            log(`     `,
                `[${messageNo}] [${sourceUrl}] [PaymentProcessor.onMessage]`,
                `Found ${invoices.length} open invoice(s) of ${sender} for ${transfers.length} possible payment transfers.`);

            const matches = this.findMatchingPayments(
                invoices,
                transfers
            );

            if (matches.length == 0) {
                continue;
            }

            for (let match of matches) {
                log(`     `,
                    `[${messageNo}] [${sourceUrl}] [PaymentProcessor.onMessage]`,
                    `Found payment ${match.payment.hash} from ${sender} for invoice ${match.invoice.id}.`);

                await JobQueue.produce([
                  new InvoicePayed(match.invoice.id
                    , match.payment.hash
                    , match.payment.timestamp)
                ]);
            }
        }
    }

    private findMatchingPayments (
        invoices:PdfDbInvoiceData[],
        transfers:Transfer[]) {

        const resultArr: {
            invoice: PdfDbInvoiceData,
            payment: Transfer
        }[] = [];

        for(let invoice of invoices) {

            const invoiceTotal = invoice.lines.reduce((p, c) =>
                p + c.amount * (parseFloat(c.product.pricePerUnit) * 10), 0);
            const invoiceTimestamp = getDateWithOffset(invoice.createdAt);
            const invoiceTotalInTC = convertTimeCirclesToCircles(
                invoiceTotal,
                invoiceTimestamp.toJSON()
            );

            // TODO: Remove the range boundaries and match exact
            const minAcceptedInvoiceTotal = new BN(
                RpcGateway.get().utils.toWei(invoiceTotalInTC.toString(), "ether")
            ).sub(new BN("10000"));

            const maxAcceptedInvoiceTotal = new BN(
                RpcGateway.get().utils.toWei(invoiceTotalInTC.toString(), "ether")
            ).add(new BN("10000"));

            for (let transfer of transfers) {
                const transferValue = new BN(transfer.value);
                const matches = transferValue.gte(minAcceptedInvoiceTotal)
                             && transferValue.lte(maxAcceptedInvoiceTotal);

                if (!matches) {
                    continue;
                }

                resultArr.push({
                    invoice: invoice,
                    payment: transfer
                });
            }
        }

        return resultArr;
    }

    private async findOpenInvoices(
        messageNo: number,
        sourceUrl: string,
        addresses: string[]
    ): Promise<{ [safeAddress: string]: PdfDbInvoiceData[] }> {
        const invoices = await Environment.readWriteApiDb.invoice.findMany({
            where: {
                customerProfile: {
                    circlesAddress: {
                        in: addresses,
                    },
                },
                paymentTransactionHash: null,
                cancelledAt: null,
            },
            include: {
                customerProfile: true,
                sellerProfile: true,
                lines: {
                    include: {
                        product: {
                            include: {
                                createdBy: true,
                            },
                        },
                    },
                },
            },
        });

        return invoices.reduce((p, c) => {
            if (!c.customerProfile?.circlesAddress) {
                log(`WARN `,
                    `[${messageNo}] [${sourceUrl}] [PaymentProcessor.findOpenInvoices]`,
                    `The invoice with id ${c.id} has either no 'customerProfile' or the customer profile has no 'circlesAddress'.`);

                return p;
            }
            if (!p[c.customerProfile.circlesAddress]) {
                p[c.customerProfile.circlesAddress] = [];
            }
            p[c.customerProfile.circlesAddress].push(c);
            return p;
        }, <{ [safeAddress: string]: PdfDbInvoiceData[] }>{});
    }

    private async findRelatedHubTransfers (
        transactionHashes: string[])
        : Promise<TransfersBySender> {

        const queryResult = await Environment.indexDb.query(
            `
                      select *
                      from crc_hub_transfer_2
                      where hash = ANY ($1)`,
            [transactionHashes]
        );

        return queryResult.rows.reduce((p,c) => {
            if (!p[c.from]) {
                p[c.from] = [];
            }

            p[c.from].push({
                hash: c.hash,
                index: c.index,
                timestamp: c.timestamp,
                block_number: c.block_number,
                from: c.from,
                to: c.to,
                value: c.value
            });

            return p;
        }, {});
    }
}