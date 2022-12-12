import DataLoader from "dataloader";
import {Environment} from "../../environment";
import {Profile, ProfileEvent} from "../../types";

export const profileInvitationTransactionDataLoader = new DataLoader<string, ProfileEvent>(async (keys: readonly any[]) => {
  const profilesWithRedeemedInvitations = await Environment.readWriteApiDb.profile.findMany({
    where:{
      circlesSafeOwner: {
        in: keys.map(o => o)
      },
      claimedInvitations: {
        some: {
          redeemTxHash: {
            not: null
          }
        }
      }
    },
    include: {
      claimedInvitations: {
        include: {
          createdBy: true
        }
      }
    }
  });

  const txHashes = profilesWithRedeemedInvitations.flatMap(o => o.claimedInvitations).map(o => o.redeemTxHash);
  const profilesLookup = profilesWithRedeemedInvitations.toLookup(c => c.circlesSafeOwner, c => c);

  const redeemInvitationTransactionsQuery = `
            select b.timestamp, t.*
            from transaction_2 t
            join block b on t.block_number = b.number
            where t.hash = ANY($1)`;

  const redeemResult = await Environment.indexDb.query(
    redeemInvitationTransactionsQuery,
    [txHashes]);

  const transactions = redeemResult.rows.toLookup(c => c.to, c => c);

  return keys.map(o => {
    return {
      key: o,
      tx: transactions[o],
      profile: profilesLookup[o]
    }
  })
  .map(o => {
      return {
        key: o.key,
        event: <ProfileEvent>{
          safe_address: o.profile?.circlesSafeOwner?.toLowerCase(),
          transaction_index: o.tx?.index,
          value: o.tx?.value,
          direction: "in",
          transaction_hash: o.tx?.hash,
          type: "EthTransfer",
          block_number: o.tx?.block_number,
          timestamp: o.tx?.timestamp?.toJSON(),
          safe_address_profile: o.profile,
          unread: true,
          payload: {
            __typename: "EthTransfer",
            transaction_hash: o.tx?.redeemTxHash,
            from: o.tx?.from,
            to: o.tx?.to,
            to_profile: o.profile,
            value: o.tx?.value,
            tags: []
          }
        }
      }
  })
    .map(o => <any>(!!o.event?.transaction_index ? o.event : undefined));
}, {
  cache: false
});