
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 2.30.2
 * Query Engine version: b8c35d44de987a9691890b3ddf3e2e7effb9bf20
 */
Prisma.prismaVersion = {
  client: "2.30.2",
  engine: "b8c35d44de987a9691890b3ddf3e2e7effb9bf20"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */

Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.SessionScalarFieldEnum = makeEnum({
  sessionId: 'sessionId',
  emailAddress: 'emailAddress',
  profileId: 'profileId',
  issuedBy: 'issuedBy',
  jti: 'jti',
  createdAt: 'createdAt',
  endedAt: 'endedAt',
  endReason: 'endReason',
  maxLifetime: 'maxLifetime'
});

exports.Prisma.InvitationScalarFieldEnum = makeEnum({
  id: 'id',
  createdByProfileId: 'createdByProfileId',
  createdAt: 'createdAt',
  code: 'code',
  claimedByProfileId: 'claimedByProfileId',
  claimedAt: 'claimedAt',
  redeemedByProfileId: 'redeemedByProfileId',
  redeemedAt: 'redeemedAt',
  key: 'key'
});

exports.Prisma.RedeemInvitationRequestScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  createdByProfileId: 'createdByProfileId',
  workerProcess: 'workerProcess',
  pickedAt: 'pickedAt',
  invitationToRedeemId: 'invitationToRedeemId'
});

exports.Prisma.ProfileScalarFieldEnum = makeEnum({
  id: 'id',
  lastUpdateAt: 'lastUpdateAt',
  emailAddress: 'emailAddress',
  status: 'status',
  circlesAddress: 'circlesAddress',
  circlesSafeOwner: 'circlesSafeOwner',
  circlesTokenAddress: 'circlesTokenAddress',
  firstName: 'firstName',
  lastName: 'lastName',
  avatarUrl: 'avatarUrl',
  avatarCid: 'avatarCid',
  avatarMimeType: 'avatarMimeType',
  dream: 'dream',
  country: 'country',
  newsletter: 'newsletter',
  cityGeonameid: 'cityGeonameid',
  verifySafeChallenge: 'verifySafeChallenge',
  newSafeAddress: 'newSafeAddress'
});

exports.Prisma.SubscriptionScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  subscriberProfileId: 'subscriberProfileId',
  subscribingToOfferId: 'subscribingToOfferId',
  subscribingToProfileId: 'subscribingToProfileId'
});

exports.Prisma.MessageScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  createdByProfileId: 'createdByProfileId',
  lastUpdateAt: 'lastUpdateAt',
  typeTagId: 'typeTagId',
  toSafeAddress: 'toSafeAddress',
  transactionHash: 'transactionHash',
  chainEventType: 'chainEventType',
  chainEventId: 'chainEventId',
  content: 'content'
});

exports.Prisma.DelegatedChallengesScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  appId: 'appId',
  sessionId: 'sessionId',
  requestValidTo: 'requestValidTo',
  delegateAuthCode: 'delegateAuthCode',
  challenge: 'challenge',
  challengeDepositedAt: 'challengeDepositedAt',
  challengeValidTo: 'challengeValidTo',
  challengedReadAt: 'challengedReadAt'
});

exports.Prisma.OfferScalarFieldEnum = makeEnum({
  id: 'id',
  createdByProfileId: 'createdByProfileId',
  publishedAt: 'publishedAt',
  unlistedAt: 'unlistedAt',
  title: 'title',
  pictureUrl: 'pictureUrl',
  pictureMimeType: 'pictureMimeType',
  description: 'description',
  categoryTagId: 'categoryTagId',
  geonameid: 'geonameid',
  pricePerUnit: 'pricePerUnit',
  unitTagId: 'unitTagId',
  maxUnits: 'maxUnits',
  deliveryTermsTagId: 'deliveryTermsTagId'
});

exports.Prisma.PurchaseScalarFieldEnum = makeEnum({
  id: 'id',
  purchasedByProfileId: 'purchasedByProfileId',
  purchasedAt: 'purchasedAt',
  purchasedProvenAt: 'purchasedProvenAt',
  purchasedItemId: 'purchasedItemId',
  purchasedItemTitle: 'purchasedItemTitle',
  pricePerUnit: 'pricePerUnit',
  purchasedUnits: 'purchasedUnits',
  grandTotal: 'grandTotal',
  purchasedItemVat: 'purchasedItemVat',
  status: 'status'
});

exports.Prisma.TransactionJobsScalarFieldEnum = makeEnum({
  id: 'id',
  transactionhash: 'transactionhash',
  status: 'status',
  user: 'user',
  purchaseId: 'purchaseId'
});

exports.Prisma.TagTypeScalarFieldEnum = makeEnum({
  id: 'id'
});

exports.Prisma.TransactionScalarFieldEnum = makeEnum({
  transactionHash: 'transactionHash'
});

exports.Prisma.TagScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  createdByProfileId: 'createdByProfileId',
  isPrivate: 'isPrivate',
  transactionHash: 'transactionHash',
  typeId: 'typeId',
  value: 'value'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});
exports.PurchaseStatus = makeEnum({
  INVALID: 'INVALID',
  ITEM_LOCKED: 'ITEM_LOCKED',
  PAYMENT_PROVEN: 'PAYMENT_PROVEN'
});

exports.Prisma.ModelName = makeEnum({
  Session: 'Session',
  Invitation: 'Invitation',
  RedeemInvitationRequest: 'RedeemInvitationRequest',
  Profile: 'Profile',
  Subscription: 'Subscription',
  Message: 'Message',
  DelegatedChallenges: 'DelegatedChallenges',
  Offer: 'Offer',
  Purchase: 'Purchase',
  TransactionJobs: 'TransactionJobs',
  TagType: 'TagType',
  Transaction: 'Transaction',
  Tag: 'Tag'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
