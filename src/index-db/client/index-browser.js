
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 2.28.0
 * Query Engine version: 89facabd0366f63911d089156a7a70125bfbcd27
 */
Prisma.prismaVersion = {
  client: "2.28.0",
  engine: "89facabd0366f63911d089156a7a70125bfbcd27"
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

exports.Prisma.BlockScalarFieldEnum = makeEnum({
  number: 'number',
  hash: 'hash',
  timestamp: 'timestamp',
  total_transaction_count: 'total_transaction_count',
  indexed_transaction_count: 'indexed_transaction_count'
});

exports.Prisma.Crc_hub_transferScalarFieldEnum = makeEnum({
  id: 'id',
  transaction_id: 'transaction_id',
  from: 'from',
  to: 'to',
  value: 'value'
});

exports.Prisma.Crc_organisation_signupScalarFieldEnum = makeEnum({
  id: 'id',
  transaction_id: 'transaction_id',
  organisation: 'organisation'
});

exports.Prisma.Crc_signupScalarFieldEnum = makeEnum({
  id: 'id',
  transaction_id: 'transaction_id',
  user: 'user',
  token: 'token'
});

exports.Prisma.Crc_trustScalarFieldEnum = makeEnum({
  id: 'id',
  transaction_id: 'transaction_id',
  address: 'address',
  can_send_to: 'can_send_to',
  limit: 'limit'
});

exports.Prisma.Erc20_transferScalarFieldEnum = makeEnum({
  id: 'id',
  transaction_id: 'transaction_id',
  from: 'from',
  to: 'to',
  token: 'token',
  value: 'value'
});

exports.Prisma.Eth_transferScalarFieldEnum = makeEnum({
  id: 'id',
  transaction_id: 'transaction_id',
  from: 'from',
  to: 'to',
  value: 'value'
});

exports.Prisma.Gnosis_safe_eth_transferScalarFieldEnum = makeEnum({
  id: 'id',
  transaction_id: 'transaction_id',
  initiator: 'initiator',
  from: 'from',
  to: 'to',
  value: 'value'
});

exports.Prisma.TransactionScalarFieldEnum = makeEnum({
  id: 'id',
  block_number: 'block_number',
  from: 'from',
  to: 'to',
  index: 'index',
  gas: 'gas',
  hash: 'hash',
  value: 'value',
  input: 'input',
  nonce: 'nonce',
  type: 'type',
  gas_price: 'gas_price',
  classification: 'classification'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});


exports.Prisma.ModelName = makeEnum({
  block: 'block',
  crc_hub_transfer: 'crc_hub_transfer',
  crc_organisation_signup: 'crc_organisation_signup',
  crc_signup: 'crc_signup',
  crc_trust: 'crc_trust',
  erc20_transfer: 'erc20_transfer',
  eth_transfer: 'eth_transfer',
  gnosis_safe_eth_transfer: 'gnosis_safe_eth_transfer',
  transaction: 'transaction'
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
