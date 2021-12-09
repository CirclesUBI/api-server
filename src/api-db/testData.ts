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

            values (2, null, '', lower('0x5Ca02ed87825F02df3a93e609A0955d301237AfB'), lower('0xa1E9e3d40E7Ff70AF33bBBd5FDAC61aEB263734e'), null,
                    'Elastic', 'Johnson', null, null, null, null, null, false, null, null, null, '2021-12-09 15:27:45.289',
                    '2021-12-09 15:27:46.000', true, 'PERSON', 0, 0, 'EURS', null, null);

            insert into "Profile" (id, "emailAddress", status, "circlesAddress", "circlesSafeOwner", "circlesTokenAddress", "firstName",
                                   "lastName", "avatarUrl", "avatarCid", "avatarMimeType", dream, country, newsletter, "cityGeonameid",
                                   "verifySafeChallenge", "newSafeAddress", "lastUpdateAt", "lastAcknowledged", "displayTimeCircles", type,
                                   "lastInvoiceNo", "lastRefundNo", "displayCurrency", "invoiceNoPrefix", "refundNoPrefix")
            values (3, null, '', lower('0x8C7A8236ef98a4C59FDA7A0f7EBb4010d73942d5'), lower('0x649d5674bD86Ba319905Ec38E7B3F4ae64D527bA'), null,
                    'Michael', 'Ilyes', null, null, null, null, null, false, null, null, null, '2021-12-09 15:27:45.289',
                    '2021-12-09 15:27:46.000', true, 'PERSON', 0, 0, 'EURS', null, null);

            insert into "Profile" (id, "emailAddress", status, "circlesAddress", "circlesSafeOwner", "circlesTokenAddress", "firstName",
                                   "lastName", "avatarUrl", "avatarCid", "avatarMimeType", dream, country, newsletter, "cityGeonameid",
                                   "verifySafeChallenge", "newSafeAddress", "lastUpdateAt", "lastAcknowledged", "displayTimeCircles", type,
                                   "lastInvoiceNo", "lastRefundNo", "displayCurrency", "invoiceNoPrefix", "refundNoPrefix")
            values (4, null, '', lower('0x26b7c92636C3D766749Bb3a048028cD0071Dfb0b'), lower('0xDbe909c5Dc01E1b9580B26d0c347CDbBC1DD9f1B'), null,
                    'Bethania', 'Puteri', null, null, null, null, null, false, null, null, null, '2021-12-09 15:27:45.289',
                    '2021-12-09 15:27:46.000', true, 'PERSON', 0, 0, 'EURS', null, null);

            insert into "Profile" (id, "emailAddress", status, "circlesAddress", "circlesSafeOwner", "circlesTokenAddress", "firstName",
                                   "lastName", "avatarUrl", "avatarCid", "avatarMimeType", dream, country, newsletter, "cityGeonameid",
                                   "verifySafeChallenge", "newSafeAddress", "lastUpdateAt", "lastAcknowledged", "displayTimeCircles", type,
                                   "lastInvoiceNo", "lastRefundNo", "displayCurrency", "invoiceNoPrefix", "refundNoPrefix")
            values (5, null, '', lower('0x6EcF187Ce1cfC3Cb1c02A8219d652c617D1993F4'), lower('0x2c990bC1a8CE8C0114f4d4aBfba4282114847ed2'), null,
                    'Danutė', 'Júlia', null, null, null, null, null, false, null, null, null, '2021-12-09 15:27:45.289',
                    '2021-12-09 15:27:46.000', true, 'PERSON', 0, 0, 'EURS', null, null);

            insert into "Profile" (id, "emailAddress", status, "circlesAddress", "circlesSafeOwner", "circlesTokenAddress", "firstName",
                                   "lastName", "avatarUrl", "avatarCid", "avatarMimeType", dream, country, newsletter, "cityGeonameid",
                                   "verifySafeChallenge", "newSafeAddress", "lastUpdateAt", "lastAcknowledged", "displayTimeCircles", type,
                                   "lastInvoiceNo", "lastRefundNo", "displayCurrency", "invoiceNoPrefix", "refundNoPrefix")
            values (6, null, '', lower('0x31bfc3aaDEb080C1C2A82843Eb1a76529eA26CC0'), lower('0x1d12b4fAAF8aDe01b9d29B0524A293eBFCB6C7dE'), null,
                    'Glinda', 'Arya', null, null, null, null, null, false, null, null, null, '2021-12-09 15:27:45.289',
                    '2021-12-09 15:27:46.000', true, 'PERSON', 0, 0, 'EURS', null, null);
    `;

    await Environment.readWriteApiDb.$queryRaw(membershipSql, [circlesAddress.toLowerCase()]);
  }
}