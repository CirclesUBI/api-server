import {Context} from "../../context";
import {prisma_api_ro} from "../../apiDbClient";
import {ProfileEvent} from "../../types";
import {Environment} from "../../environment";

export async function hubSignupTransactionResolver (parent:any, args:any, context:Context) {
  const now = new Date();
  const session = await context.verifySession();
  const profile = await prisma_api_ro.profile.findFirst({
    where:{
      //OR:[{
//            emailAddress: null,
      circlesSafeOwner: session.ethAddress?.toLowerCase()
//          }, {
//            emailAddress: session.emailAddress
//          }]
    }
  });
  if (!profile?.circlesAddress || !profile?.circlesSafeOwner) {
    return null;
  }

  const hubSignupTransactionQuery = `
          select * from crc_signup_2 where "user" = $1`;

  const hubSignupTransactionQueryParams = [
    profile.circlesAddress.toLowerCase()
  ];
  const hubSignupTransactionResult = await Environment.indexDb.query(
    hubSignupTransactionQuery,
    hubSignupTransactionQueryParams);

  if (hubSignupTransactionResult.rows.length == 0) {
    return null;
  }

  const hubSignupTransaction = hubSignupTransactionResult.rows[0];

  return <ProfileEvent>{
    id: hubSignupTransaction.id,
    safe_address: profile.circlesAddress.toLowerCase(),
    transaction_index: hubSignupTransaction.index,
    value: hubSignupTransaction.value,
    direction: "out",
    transaction_hash: hubSignupTransaction.hash,
    type: "CrcSignup",
    block_number: hubSignupTransaction.block_number,
    timestamp: hubSignupTransaction.timestamp.toJSON(),
    safe_address_profile: profile,
    payload: {
      __typename: "CrcSignup",
      user: hubSignupTransaction.user,
      token: hubSignupTransaction.token,
      transaction_hash: hubSignupTransaction.hash,
      user_profile: profile
    }
  };
}