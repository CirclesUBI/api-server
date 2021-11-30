import {Context} from "../../context";
import {prisma_api_ro} from "../../apiDbClient";
import {ProfileEvent} from "../../types";
import {getPool} from "../resolvers";

export const safeFundingTransactionResolver = (async (parent: any, args: any, context: Context) => {
  const session = await context.verifySession();

  const now = new Date();
  const profile = await prisma_api_ro.profile.findFirst({
    where: {
      circlesSafeOwner: session.ethAddress?.toLowerCase()
    }
  });
  if (!profile?.circlesAddress || !profile?.circlesSafeOwner) {
    return null;
  }

  const safeFundingTransactionQuery = `
      select *
      from transaction_2
      where "from" = $1
        and "to" = $2`;

  const safeFundingTransactionQueryParams = [
    profile.circlesSafeOwner.toLowerCase(),
    profile.circlesAddress.toLowerCase()
  ];
  const safeFundingTransactionResult = await getPool().query(
    safeFundingTransactionQuery,
    safeFundingTransactionQueryParams);

  console.log(`Searching for the safe funding transaction from ${profile.circlesSafeOwner.toLowerCase()} to ${profile.circlesAddress.toLowerCase()} took ${new Date().getTime() - now.getTime()} ms.`)

  if (safeFundingTransactionResult.rows.length == 0) {
    return null;
  }

  const safeFundingTransaction = safeFundingTransactionResult.rows[0];

  return <ProfileEvent>{
    id: safeFundingTransaction.id,
    safe_address: profile.circlesSafeOwner?.toLowerCase(),
    transaction_index: safeFundingTransaction.index,
    value: safeFundingTransaction.value,
    direction: "in",
    transaction_hash: safeFundingTransaction.hash,
    type: "EthTransfer",
    block_number: safeFundingTransaction.block_number,
    timestamp: safeFundingTransaction.timestamp.toJSON(),
    safe_address_profile: profile,
    payload: {
      __typename: "EthTransfer",
      transaction_hash: safeFundingTransaction.hash,
      from: safeFundingTransaction.from,
      from_profile: profile,
      to: safeFundingTransaction.to,
      to_profile: profile,
      value: safeFundingTransaction.value,
      tags: []
    }
  };
});