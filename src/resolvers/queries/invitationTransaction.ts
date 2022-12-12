import {ProfileEvent} from "../../types";
import {Context} from "../../context";
import {Environment} from "../../environment";

export function invitationTransaction() {
    return async (parent:any, args:any, context:Context) => {
        const session = await context.verifySession();
        const profile = await Environment.readonlyApiDb.profile.findFirst({
            where:{
                circlesSafeOwner: session.ethAddress?.toLowerCase()
            },
            include: {
                claimedInvitations: {
                    include: {
                        createdBy: true
                    }
                }
            }
        });
        if (!profile || profile.claimedInvitations.length == 0){
            return null;
        }

        const claimedInvitation = profile.claimedInvitations[0];
        if (!claimedInvitation.redeemTxHash) {
            return null;
        }

        const redeemInvitationTransactionQuery = `
            select b.timestamp, t.*
            from transaction_2 t
            join block b on t.block_number = b.number
            where t.hash = $1`;

        const redeemInvitationTransactionQueryParams = [
            claimedInvitation.redeemTxHash
        ];
        const redeemResult = await Environment.indexDb.query(
          redeemInvitationTransactionQuery,
          redeemInvitationTransactionQueryParams);

        if (redeemResult.rows.length == 0) {
            return null;
        }

        const redeemTransaction = redeemResult.rows[0];

        return <ProfileEvent>{
            safe_address: profile.circlesSafeOwner?.toLowerCase(),
            transaction_index: redeemTransaction.index,
            value: redeemTransaction.value,
            direction: "in",
            transaction_hash: redeemTransaction.hash,
            type: "EthTransfer",
            block_number: redeemTransaction.block_number,
            timestamp: redeemTransaction.timestamp.toJSON(),
            safe_address_profile: profile,
            unread: true,
            payload: {
                __typename: "EthTransfer",
                transaction_hash: redeemTransaction.redeemTxHash,
                from: redeemTransaction.from,
                from_profile: claimedInvitation.createdBy,
                to: redeemTransaction.to,
                to_profile: profile,
                value: redeemTransaction.value,
                tags: []
            }
        };
    }
}