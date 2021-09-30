import {getPool} from "../resolvers";
import {PrismaClient} from "../../api-db/client";
import {ProfileEvent} from "../../types";

export function invitationTransaction(prisma_api_ro:PrismaClient) {
    return async (parent:any, args:any, context:any) => {
        const session = await context.verifySession();
        const profile = await prisma_api_ro.profile.findFirst({
            where:{
                OR:[{
                    emailAddress: null,
                    circlesSafeOwner: session.ethAddress
                }, {
                    emailAddress: session.emailAddress
                }]
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

        const pool = getPool();
        try {
            const redeemInvitationTransactionQuery = `
            select b.timestamp, t.*
            from transaction_2 t
            join block b on t.block_number = b.number
            where t.hash = $1`;

            const redeemInvitationTransactionQueryParams = [
                claimedInvitation.redeemTxHash
            ];
            const redeemResult = await pool.query(
              redeemInvitationTransactionQuery,
              redeemInvitationTransactionQueryParams);

            if (redeemResult.rows.length == 0) {
                return null;
            }

            const redeemTransaction = redeemResult.rows[0];

            return <ProfileEvent>{
                safe_address: profile.circlesSafeOwner,
                transaction_index: redeemTransaction.index,
                value: redeemTransaction.value,
                direction: "in",
                transaction_hash: redeemTransaction.hash,
                type: "EthTransfer",
                block_number: redeemTransaction.block_number,
                timestamp: redeemTransaction.timestamp.toJSON(),
                safe_address_profile: profile,
                payload: {
                    __typename: "EthTransfer",
                    transaction_hash: redeemTransaction.redeemTxHash,
                    from: redeemTransaction.from,
                    from_profile: claimedInvitation.createdBy,
                    to: redeemTransaction.to,
                    to_profile: profile,
                    value: redeemTransaction.value,
                }
            };
        } finally {
            await pool.end();
        }
    }
}