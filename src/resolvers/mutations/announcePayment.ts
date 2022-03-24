import {Context} from "../../context";
import {Environment} from "../../environment";
import {Generate} from "../../utils/generate";
import {MutationAnnouncePaymentArgs} from "../../types";

export function announcePayment() {
    return async (parent:any, args:MutationAnnouncePaymentArgs, context:Context) => {
        const session = await context.verifySession();
        if (!session.profileId)
            throw new Error(`You need a profile to use this feature.`);

        let invoice = await Environment.readWriteApiDb.invoice.findUnique({
            where: {
                id: args.invoiceId
            }
        });

        if (invoice?.customerProfileId != session.profileId) {
            invoice = null;
        }

        if (!invoice) {
            throw new Error(`Couldn't find an invoice with id ${args.invoiceId}.`);
        }

        const pickupCode = Generate.randomHexString(6);
        //const simplePickupCode = "123";

        await Environment.readWriteApiDb.invoice.update({
            where: {
                id: args.invoiceId
            },
            data: {
                pendingPaymentTransactionHash: args.transactionHash,
                pickupCode: pickupCode,
                // simplePickupCode: simplePickupCode
            }
        });

        let transaction = await Environment.readWriteApiDb.transaction.findUnique({where: {transactionHash: args.transactionHash}});
        if (!transaction?.transactionHash) {
            await Environment.readWriteApiDb.transaction.create({data: {transactionHash: args.transactionHash}});
        }

        return {
            invoiceId: args.invoiceId,
            transactionHash: args.transactionHash,
            pickupCode: pickupCode
        };
    }
}