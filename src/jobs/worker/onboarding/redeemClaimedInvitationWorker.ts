import {JobWorker, JobWorkerConfiguration} from "../jobWorker";
import {RedeemClaimedInvitation} from "../../descriptions/onboarding/redeemClaimedInvitation";
import {Environment} from "../../../environment";
import {RpcGateway} from "../../../circles/rpcGateway";
import {createInvitations} from "../../../utils/invitationHelper";
import {JobResult} from "../../jobQueue";

export class RedeemClaimedInvitationWorker extends JobWorker<RedeemClaimedInvitation> {
    name(): string {
        return "RedeemClaimedInvitationWorker";
    }

    constructor(configuration?: JobWorkerConfiguration) {
        super(configuration);
    }

    async doWork(job: RedeemClaimedInvitation, log: (prefix: string, message: string) => void): Promise<JobResult | undefined> {
        const claimedInvitation = await Environment.readWriteApiDb.invitation.findFirst({
            where: {
                id: job.claimedInvitationId
            },
            include: {
                claimedBy: true
            }
        });

        if (!claimedInvitation) {
            throw new Error(`No claimed invitation with id ${job.claimedInvitationId}.`);
        }
        if (!claimedInvitation.claimedBy?.circlesSafeOwner) {
            throw new Error(`Profile ${claimedInvitation.claimedByProfileId} previously claimed invitation ${claimedInvitation.code} but has no circlesSafeOwner set to redeem it to.`);
        }

        const web3 = RpcGateway.get();
        const invitationFundsRecipient = claimedInvitation.claimedBy.circlesSafeOwner;
        const invitationFundsBalance = await web3.eth.getBalance(Environment.invitationFundsSafe.address);

        log("     ", `Redeeming invitation ${claimedInvitation.code}: Invitations funds balance: ${invitationFundsBalance.toString()}`);
        log("     ", `Redeeming invitation ${claimedInvitation.code}: Sending invitation funds of ${Environment.invitationFundsAmount} wei to '${invitationFundsRecipient}' ..`)

        let invitationFundsRecipientBalance = await web3.eth.getBalance(invitationFundsRecipient);
        log("     ", `Redeeming invitation ${claimedInvitation.code}: ${invitationFundsRecipient}'s balance is: ${invitationFundsRecipientBalance}`);

        const fundEoaReceipt = await Environment.invitationFundsSafe.transferEth(
            Environment.invitationFundsSafeOwner.privateKey,
            Environment.invitationFundsAmount,
            invitationFundsRecipient,
            (message) => log("     ", message));

        log("     ", `Redeeming invitation ${claimedInvitation.code}: Transaction hash: ${fundEoaReceipt.transactionHash}`);

        invitationFundsRecipientBalance = await web3.eth.getBalance(invitationFundsRecipient);
        log("     ", `Redeeming invitation ${claimedInvitation.code}: ${invitationFundsRecipient}'s balance is: ${invitationFundsRecipientBalance}`);

        await Environment.readWriteApiDb.invitation.updateMany({
            data: {
                redeemedAt: new Date(),
                redeemedByProfileId: claimedInvitation.claimedByProfileId,
                redeemTxHash: fundEoaReceipt.transactionHash
            },
            where: {
                id: claimedInvitation.id
            }
        });

        if (claimedInvitation.forSafeAddress) {
            const verifiedInviter = await Environment.readWriteApiDb.verifiedSafe.findFirst({
                where: {
                    safeAddress: claimedInvitation.forSafeAddress
                }
            });

            if (verifiedInviter) {
                await createInvitations(verifiedInviter.safeAddress, 1);
            }
        }

        return {
            info: `Redeemed invitation ${claimedInvitation.code} for ${claimedInvitation.claimedByProfileId} to ${invitationFundsRecipient}. TxHash: ${fundEoaReceipt.transactionHash}.`,
        };
    }
}
