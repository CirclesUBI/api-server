import {IndexerEvent, IndexerEventProcessor} from "./indexerEventProcessor";
import {
    InvoicePdfGenerator,
    PdfDbInvoiceData,
    pdfInvoiceDataFromDbInvoice,
    PdfInvoicePaymentTransaction
} from "../invoiceGenerator";
import {Environment} from "../environment";
import {log, logErr} from "../log";
import {EventType} from "../types";
import BN from "bn.js";
import {RpcGateway} from "../rpcGateway";
import {convertTimeCirclesToCircles} from "../timeCircles";
import {getNextInvoiceNo} from "../resolvers/mutations/purchase";
import {getDateWithOffset} from "../getDateWithOffset";

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
        const hubTransfersBySender = await this.findRelatedHubTransfers(messageNo, sourceUrl, hubTransferEvents);

        for (let sender of Object.keys(hubTransfersBySender)) {
            const transfers = hubTransfersBySender[sender];
            const invoices = openInvoicesByCustomerAddress[sender];

            log(`     `,
                `[${messageNo}] [${sourceUrl}] [PaymentProcessor.onMessage]`,
                `Found ${invoices.length} open invoice(s) of ${sender} for ${transfers.length} possible payment transfers.`);

            const matches = this.findMatchingPayments(
                messageNo,
                sourceUrl,
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

                const paidInvoice = await this.markInvoiceAsPaid(
                    messageNo,
                    sourceUrl,
                    match.invoice,
                    match.payment);

                await this.persistInvoice(
                    messageNo,
                    sourceUrl,
                    paidInvoice,
                    match.payment);
            }
        }
    }

    private async persistInvoice(
        messageNo:number,
        source:string,
        invoice:PdfDbInvoiceData,
        transfer:Transfer) {

        log(`     `,
            `[${messageNo}] [${source}] [PaymentProcessor.persistInvoice]`,
            `Storing the invoice `);

        const paymentPdfData: PdfInvoicePaymentTransaction = {
            hash: transfer.hash,
            timestamp: transfer.timestamp,
        };

        const invoicePdfData = pdfInvoiceDataFromDbInvoice(
            invoice,
            paymentPdfData
        );

        const invoiceGenerator = new InvoicePdfGenerator(invoicePdfData);
        const invoicePdfDocument = invoiceGenerator.generate();
        const saveResult = await invoiceGenerator.savePdfToS3(
            invoicePdfData.storageKey,
            invoicePdfDocument
        );

        if (saveResult.$response.error) {
            const errMessage =
                `An error occurred while saving the pdf of invoice '${invoicePdfData.invoice_nr}' ` +
                `(id: ${invoice.id}) to ${Environment.filesBucket.endpoint.href}: ${JSON.stringify(saveResult.$response.error)}`;

            logErr(`ERR  `, `[${messageNo}] [${source}] [PaymentProcessor.persistInvoice]`, errMessage);
        }
    }

    private async markInvoiceAsPaid(
        messageNo:number,
        source:string,
        invoice:PdfDbInvoiceData,
        transfer:Transfer) {
        const invoiceNo = await getNextInvoiceNo(invoice.sellerProfile.id);
        const invoiceNoStr =
            (invoice.sellerProfile.invoiceNoPrefix ?? "") +
            invoiceNo.toString().padStart(8, "0");

        const updateInvoiceResult =
            await Environment.readWriteApiDb.invoice.update({
                where: {
                    id: invoice.id,
                },
                data: {
                    paymentTransactionHash: transfer.hash,
                    invoiceNo: invoiceNoStr
                },
                include: {
                    customerProfile: true,
                    sellerProfile: true,
                    lines: {
                        include: {
                            product: true,
                        },
                    },
                },
            });

        log(`     `,
            `[${messageNo}] [${source}] [PaymentProcessor.markInvoiceAsPaid]`,
            `Updated invoice ${invoice.id}. ` +
            `Invoice no.: ${updateInvoiceResult.invoiceNo}, ` +
            `Payment transaction: '${updateInvoiceResult.paymentTransactionHash}', ` +
            `Pickup code: '${updateInvoiceResult.pickupCode}'.`
        );

        return updateInvoiceResult;
    }

    private findMatchingPayments (
        messageNo:number,
        source:string,
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
                purchase: {
                    // Only handle invoices of purchases that have been created by this node
                    sticksToInstanceId: Environment.instanceId
                },
                paymentTransactionHash: null,
                cancelledAt: null,
            },
            include: {
                customerProfile: true,
                sellerProfile: true,
                purchase: {
                    select: {
                        sticksToInstanceId: true
                    }
                },
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
        messageNo: number,
        sourceUrl: string,
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