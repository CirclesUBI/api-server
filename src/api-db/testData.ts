import {Environment} from "../environment";

export class TestData
{
  public static async insertIfEmpty(circlesAddress:string) {
    const totalMembershipCount = await Environment.readWriteApiDb.membership.count();
    if (totalMembershipCount > 0) {
      console.warn(`The membership table is not empty. Will not insert the test data.`);
      return;
    }

    const membershipSql = `
            insert into "Membership" ( "createdAt"
                                     , "memberAtId"
                                     , "isAdmin"
                                     , "acceptedAt"
                                     , "createdByProfileId"
                                     , "rejectedAt"
                                     , "validTo"
                                     , "memberAddress")
            values (now(),
                    0,
                    true,
                    now(),
                    0,
                    null,
                    null,
                    $1);
    `;
    await Environment.readWriteApiDb.$queryRaw(membershipSql, [circlesAddress.toLowerCase()]);
  }
}