import {Environment} from "../environment";
import {RpcGateway} from "../circles/rpcGateway";

export class TestData {
  public static async insertIfEmpty(circlesAddress: string) {
    if (!RpcGateway.get().utils.isAddress(circlesAddress)) {
      console.warn(`No valid circles address was supplied: ${circlesAddress}.`);
      return;
    }
    const totalMembershipCount = await Environment.readWriteApiDb.membership.count();
    if (totalMembershipCount > 0) {
      console.warn(`The membership table is not empty. Will not insert the test data.`);
      return;
    }

    await Environment.readWriteApiDb.$queryRaw`insert into "Membership" ( "createdAt"
                                         , "memberAtId"
                                         , "isAdmin"
                                         , "acceptedAt"
                                         , "createdByProfileId"
                                         , "rejectedAt"
                                         , "validTo"
                                         , "memberAddress")
                values (now(),
                        1,
                        true,
                        now(),
                        1,
                        null,
                        null,
                        ${circlesAddress})`;
  }
}
