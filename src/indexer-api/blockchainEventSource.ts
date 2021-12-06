import WebSocket from 'ws';
import {ApiPubSub} from "../pubsub";
import {prisma_api_rw} from "../apiDbClient";
import {Generate} from "../generate";
import {EventType} from "../types";
import BN from "bn.js";
import {RpcGateway} from "../rpcGateway";
import {convertTimeCirclesToCircles} from "../timeCircles";
import {
  InvoicePdfGenerator,
  PdfDbInvoiceData,
  pdfInvoiceDataFromDbInvoice,
  PdfInvoicePaymentTransaction
} from "../invoiceGenerator";
import {getNextInvoiceNo} from "../resolvers/mutations/purchase";
import {Environment} from "../environment";

export function getDateWithOffset(timestamp: Date) {
  const timeOffset = new Date(timestamp).getTimezoneOffset() * 60 * 1000;
  return new Date(new Date(timestamp).getTime() - timeOffset);
}

/**
 * This class can be used to listen to new transaction blockchainEvents from
 * the https://github.com/circlesland/blockchain-indexer service.
 * The blockchain indexer only sends a stream of new transaction hashes.
 * It's the BlockchainEventSource's job to make sense of the hashes and
 * to dispatch the resulting blockchainEvents to the right recipients.
 */
export class BlockchainEventSource {
  private readonly _url: string;

  private _ws?: WebSocket;
  private _isOpen: boolean = false;
  private _messageNo: number = 0;

  constructor(url: string) {
    this._url = url;
  }

  connect() {
    console.log(`Connecting to ${this._url} ..`);
    this._ws = new WebSocket(this._url, {});

    this._ws.on("open", () => {
      this.onOpen();
    });
    this._ws.on("message", (e: any) => {
      this.onMessage(e.toString());
    });
    this._ws.on("error", (e: any) => {
      console.log("Websocket error: ", e);
    });
    this._ws.on("close", (e: any) => {
      console.log("Websocket closed: ", e);
      this.onClose();
    });
  }

  onOpen() {
    this._isOpen = true;
    console.log(`Websocket connected to ${this._url}.`);

    if (this._reconnectTimeoutHandle != null) {
      clearInterval(this._reconnectTimeoutHandle);
    }
  }

  _reconnectTimeoutHandle: any;

  onClose() {
    if (this._reconnectTimeoutHandle != null) {
      clearInterval(this._reconnectTimeoutHandle);
    }

    this._isOpen = false;

    console.warn(`Websocket connection to ${this._url} closed.`);
    console.log(`Websocket connection to ${this._url} closed. Reconnecting in 1000 ms.`);

    this._reconnectTimeoutHandle = setTimeout(() => {
      this.connect();
    }, 5000);
  }

  async onMessage(message: string) {
    const messageNo = ++this._messageNo;
    const serverUrl = this._url;

    function log(str: string, prefix?: string) {
      console.log(`${prefix ?? "     "}[${new Date().toJSON()}] [${messageNo}] [${serverUrl}] [BlockchainEventSource.onMessage]: ${str}`);
    }

    function logErr(str: string, prefix?: string) {
      console.error(`${prefix ?? "     "}[${new Date().toJSON()}] [${messageNo}] [${serverUrl}] [BlockchainEventSource.onMessage]: ${str}`);
    }

    async function matchInvoiceWithPayment(invoice: PdfDbInvoiceData, relatedHubTransfers:{
      type: string,
      hash: string,
      address1: string,
      address2: string
    }[]) : Promise<{
        invoice: PdfDbInvoiceData,
        paymentTransaction:{
          hash: string,
          timestamp: Date,
          invoiceTotalInTC: number,
          value: BN,
          minValue: BN,
          maxValue: BN
        }
      }|null> {
        const customerToSellerTransfers = relatedHubTransfers.filter(o => o.address1 == invoice.customerProfile.circlesAddress
          && o.address2 == invoice.sellerProfile.circlesAddress);

        if (customerToSellerTransfers.length == 0) {
        return null;
      }

      const candidateTxHashes = customerToSellerTransfers.map(o => o.hash);

      log(`Found ${customerToSellerTransfers.length} CrcHubTransfer candidate(s) for invoice ${invoice.id} `
        + `(from: '${invoice.customerProfile.circlesAddress}', `
        + `to: '${invoice.sellerProfile.circlesAddress}'): ${candidateTxHashes.join(", ")}`);

      // Query the full CrcHubTransfer events
      const hubTransferRows = await Environment.indexDb.query(`
                      select *
                      from crc_hub_transfer_2
                      where hash = ANY ($1)`,
        [candidateTxHashes]);

      const invoiceTotal = invoice.lines.reduce((p, c) => p + c.amount * parseFloat(c.product.pricePerUnit), 0);

      const hubTransfers = hubTransferRows.rows.map(o => {
        const transactionTimestamp = getDateWithOffset(o.timestamp);
        const invoiceTotalInTC = convertTimeCirclesToCircles(invoiceTotal, transactionTimestamp.toJSON());
        const minVal = new BN(RpcGateway.get().utils.toWei(invoiceTotalInTC.toString(), "ether")).sub(new BN("10000"));
        const maxVal = new BN(RpcGateway.get().utils.toWei(invoiceTotalInTC.toString(), "ether")).add(new BN("10000"));
        const actualValue = new BN(o.value);

        return {
          hash: o.hash,
          timestamp: transactionTimestamp,
          invoiceTotalInTC: invoiceTotalInTC,
          value: actualValue,
          minValue: minVal,
          maxValue: maxVal
        }
      });

      const hubTransfersWithMatchingAmount = hubTransfers.filter(o => {
        return o.value.gte(o.minValue) && o.value.lte(o.maxValue)
      });

      if (hubTransfersWithMatchingAmount.length == 0) {
        return null;
      }

      if (hubTransfersWithMatchingAmount.length > 1) {
        logErr(`Found ${hubTransfersWithMatchingAmount.length} CrcHubTransfers with matching amounts for invoice ${invoice.id}: `
          + `: ${JSON.stringify(hubTransfersWithMatchingAmount)}`);
        return null;
      }

      const paymentTransaction = hubTransfersWithMatchingAmount[0];
      return {
        invoice: invoice,
        paymentTransaction
      };
    }

    try {
      const transactionHashes: string[] = JSON.parse(message);
      const {events: relatedEvents, addresses} = await this.findRelatedData(transactionHashes);
      const relatedHubTransfers = relatedEvents.filter((event:any) => event.type === EventType.CrcHubTransfer);

      log(`Received ${transactionHashes.length} tx-hashes. Found related: ${addresses.length} addresses, ${relatedEvents.length} events`,
        " *-> ");

      await this.notifyClients(addresses);

      const invoicesByCustomerAddress = await this.findOpenInvoices(addresses)
      const customerCount = Object.keys(invoicesByCustomerAddress).length;
      const invoices = Object.values(invoicesByCustomerAddress).flatMap(o => o);

      if (invoices.length == 0) {
        return;
      }

      log(`Found ${invoices.length} open invoice(s) for ${customerCount} different safe(s): ${invoices.map(o => o.id).join(", ")}`);

      for (let invoice of invoices) {

        // Find payments from the customer to the seller
        const match = await matchInvoiceWithPayment(invoice, relatedHubTransfers);
        if (!match) {
          continue;
        }

        const pickupCode = Generate.randomHexString(6);

        // TODO: Currently all running processes will update the invoice with a different pickupCode but with the same transaction hash.
        //       Maybe this should be synchronized?
        const invoiceNo = await getNextInvoiceNo(invoice.sellerProfile.id);
        const invoiceNoStr = (invoice.sellerProfile.invoiceNoPrefix ?? "") + invoiceNo.toString().padStart(8, "0")

        const updateInvoiceResult = await prisma_api_rw.invoice.update({
          where: {
            id: invoice.id
          },
          data: {
            paymentTransactionHash: match.paymentTransaction.hash,
            pickupCode: pickupCode,
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
          }
        });

        log(`Updated invoice ${updateInvoiceResult.id}. `
          +`Invoice no.: ${updateInvoiceResult.invoiceNo}, `
          +`Payment transaction: '${updateInvoiceResult.paymentTransactionHash}', `
          +`Pickup code: '${updateInvoiceResult.pickupCode}'.`);

        const paymentPdfData: PdfInvoicePaymentTransaction = {
          hash: match.paymentTransaction.hash,
          timestamp: match.paymentTransaction.timestamp
        };
        const invoicePdfData = pdfInvoiceDataFromDbInvoice(updateInvoiceResult, paymentPdfData);
        const invoiceGenerator = new InvoicePdfGenerator(invoicePdfData);
        const invoicePdfDocument = invoiceGenerator.generate();
        const saveResult = await invoiceGenerator.savePdfToS3(invoicePdfData.storageKey, invoicePdfDocument);

        if (saveResult.$response.error) {
          const errMessage = `An error occurred while saving the pdf of invoice '${updateInvoiceResult.invoiceNo}' `
            +`(id: ${updateInvoiceResult.id}) to ${Environment.invoicesBucket.endpoint.href}: ${JSON.stringify(saveResult.$response.error)}`;
          console.error(errMessage);
        }
      }
    } catch (e) {
      console.error(`The received websocket message couldn't be processed:`, message, `Exception was:`, e);
    }
  }

  private async notifyClients(addresses: string[]) {
    for (let address of addresses) {
      // TODO: Clear cached profiles if cache is in use
      // profilesBySafeAddressCache.del(address)
      await ApiPubSub.instance.pubSub.publish(`events_${address}`, {
        events: {
          type: "blockchain_event"
        }
      });
    }
  }

  private async findRelatedData(transactionHashes: string[]) {
    // Find all blockchainEvents in the reported new range
    const affectedAddressesQuery = `with a as (
        select 'CrcSignup' as type, hash, "user" as address1, null as address2, null as address3
        from crc_signup_2
        union all
        select 'CrcTrust' as type, hash, address as address1, can_send_to as address2, null as address3
        from crc_trust_2
        union all
        select 'CrcOrganisationSignup' as type, hash, organisation as address1, null as address2, null as address3
        from crc_organisation_signup_2
        union all
        select 'CrcHubTransfer' as type, hash, "from" as address1, "to" as address2, null as address3
        from crc_hub_transfer_2
        union all
        select 'Erc20Transfer' as type, hash, "from" as address1, "to" as address2, null as address3
        from erc20_transfer_2
        union all
        select 'EthTransfer' as type, hash, "from" as address1, "to" as address2, null as address3
        from eth_transfer_2
        union all
        select 'GnosisSafeEthTransfer' as type, hash, "initiator" as address1, "from" as address2, "to" as address3
        from gnosis_safe_eth_transfer_2
    )
                                    select type, hash, address1, address2, address3
                                    from a
                                    where hash = ANY ($1);`;

    const relatedEvents = await Environment.indexDb.query(affectedAddressesQuery, [transactionHashes]);
    const relatedAddresses: { [safeAddress: string]: any } = relatedEvents.rows.reduce((p, c) => {
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
      addresses: Object.keys(relatedAddresses),
      events: relatedEvents.rows.map(o => {
        return {
          type: o.type,
          hash: o.hash,
          address1: o.address1,
          address2: o.address2
        };
      }),
    };
  }

  private async findOpenInvoices(addresses: string[]): Promise<{ [safeAddress: string]: PdfDbInvoiceData[] }> {
    const invoices = await prisma_api_rw.invoice.findMany({
      where: {
        customerProfile: {
          circlesAddress: {
            in: addresses
          }
        },
        paymentTransactionHash: null
      },
      include: {
        customerProfile: true,
        sellerProfile: true,
        lines: {
          include: {
            product: {
              include: {
                createdBy: true
              }
            }
          }
        }
      }
    });

    return invoices.reduce((p, c) => {
      if (!c.customerProfile?.circlesAddress) {
        console.error(`Encountered an invoice without 'customerProfile' or the customer profile has no 'circlesAddress':`, JSON.stringify(c, null, 2));
        return p;
      }
      if (!p[c.customerProfile.circlesAddress]) {
        p[c.customerProfile.circlesAddress] = [];
      }
      p[c.customerProfile.circlesAddress].push(c);
      return p;
    }, <{ [safeAddress: string]: PdfDbInvoiceData[] }>{});
  }
}