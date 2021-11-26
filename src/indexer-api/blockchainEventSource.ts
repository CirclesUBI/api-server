import WebSocket from 'ws';
import {ApiPubSub} from "../pubsub";
import {getPool} from "../resolvers/resolvers";
import {prisma_api_rw} from "../apiDbClient";
import {Generate} from "../generate";
import {EventType} from "../types";
import BN from "bn.js";
import {RpcGateway} from "../rpcGateway";
import {convertTimeCirclesToCircles} from "../timeCircles";
import {createPdfForInvoice} from "../invoiceGenerator";

export interface ProfileEventSource {
  /**
   * Takes a json string, interprets it and creates ProfileEvents if applicable.
   * @param message
   */
  //yieldEvent(message: string) : void;
}

export function getDateWithOffset(timestamp:Date) {
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
export class BlockchainEventSource implements ProfileEventSource {
  private readonly _url: string;

  private _ws?: WebSocket;
  private _isOpen: boolean = false;

  constructor(url: string) {
    this._url = url;
  }

  connect() {
    console.log(`Connecting to ${this._url} ..`);
    this._ws = new WebSocket(this._url, {});

    this._ws.on("open", () => {
      this.onOpen();
    });
    this._ws.on("message", (e:any) => {
      this.onMessage(e.toString());
    });
    this._ws.on("error", (e:any) => {
      console.log("Websocket error: ", e);
    });
    this._ws.on("close", (e:any) => {
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

  i = 1;

  async onMessage(message: string) {
    try {
      const transactionHashes: string[] = JSON.parse(message);

      const cur = this.i++;
      console.log(`Message ${cur} received`);

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

      const eventsInMessage = await getPool().query(affectedAddressesQuery, [transactionHashes]);
      const affectedAddresses = eventsInMessage.rows.reduce((p, c) => {
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

      for(let address of Object.keys(affectedAddresses)) {

        // TODO: Clear cached profiles if cache is in use
        // profilesBySafeAddressCache.del(address)

        await ApiPubSub.instance.pubSub.publish(`events_${address}`, {
          events: {
            type: "blockchain_event"
          }
        });

        // Check if there are open invoices which match the buyer, seller and amount
        const invoices = await prisma_api_rw.invoice.findMany({
          where: {
            OR: [{
              sellerProfile: {
                circlesAddress: address
              }
            },{
              customerProfile: {
                circlesAddress: address
              }
            }],
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

        if (invoices.length > 0) {
          for (let invoice of invoices) {
            try {
              console.log(`Found open invoices for partner ${address}:`, JSON.stringify(invoice, null, 2));
              // Check if this is a crc_hub_transfer and if the amount is correct
              // within certain limits:

              const amount = invoice.lines.reduce((p, c) => p + c.amount * parseFloat(c.product.pricePerUnit), 0);
              const code = Generate.randomHexString(6);

              let matchingTransactions = eventsInMessage.rows.filter(event => event.type === EventType.CrcHubTransfer);
              const event = matchingTransactions.find(o => o.address1 == invoice.customerProfile.circlesAddress
                || o.address2 == invoice.sellerProfile.circlesAddress);

              let hubTransfer: any;
              if (event) {
                hubTransfer = await getPool().query(`select *
                                                     from crc_hub_transfer_2
                                                     where hash = $1`, [event.hash]);
              }

              if (hubTransfer && hubTransfer.rows.length == 1) {
                const transactionTimestamp = getDateWithOffset(hubTransfer.rows[0].timestamp);
                const tcAmount = convertTimeCirclesToCircles(amount, transactionTimestamp.toJSON());
                const minVal = new BN(RpcGateway.get().utils.toWei(tcAmount.toString(), "ether")).sub(new BN("10000"));
                const maxVal = new BN(RpcGateway.get().utils.toWei(tcAmount.toString(), "ether")).add(new BN("10000"));

                const actualValue = new BN(hubTransfer.rows[0].value);
                const amountMatches = actualValue.gte(minVal) && actualValue.lte(maxVal);

                if (amountMatches) {
                  // TODO: Currently all running processes will update the invoice with a different pickupCode but with the same transaction hash. Maybe this should be synchronized?
                  await prisma_api_rw.invoice.update({
                    where: {
                      id: invoice.id
                    },
                    data: {
                      paymentTransactionHash: hubTransfer.rows[0].hash,
                      pickupCode: code
                    }
                  });

                  await createPdfForInvoice(invoice.id, `/home/daniel/Desktop/invoices/${invoice.invoiceNo}.pdf`);
                }
              }
            } catch (e) {
              console.error(`Cannot match invoice ${invoice.id} with payment:`, e);
            }
          }
        }
      }
    } catch (e) {
      console.error(`The received websocket message was not understood:`, message, `Exception was: ${e}`);
    }
  }
}