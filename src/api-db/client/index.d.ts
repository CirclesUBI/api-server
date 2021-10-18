
/**
 * Client
**/

import * as runtime from './runtime';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Session
 */

export type Session = {
  sessionId: string
  emailAddress: string | null
  ethAddress: string | null
  challengeHash: string | null
  signature: string | null
  profileId: number | null
  issuedBy: string
  jti: string | null
  createdAt: Date
  validFrom: Date | null
  endedAt: Date | null
  endReason: string | null
  maxLifetime: number
}

/**
 * Model Invitation
 */

export type Invitation = {
  id: number
  createdByProfileId: number
  createdAt: Date
  name: string
  code: string
  claimedByProfileId: number | null
  claimedAt: Date | null
  redeemedByProfileId: number | null
  redeemedAt: Date | null
  redeemTxHash: string | null
  address: string
  key: string
}

/**
 * Model RedeemInvitationRequest
 */

export type RedeemInvitationRequest = {
  id: number
  createdAt: Date
  createdByProfileId: number
  workerProcess: string | null
  pickedAt: Date | null
  invitationToRedeemId: number
}

/**
 * Model Profile
 */

export type Profile = {
  id: number
  lastUpdateAt: Date
  emailAddress: string | null
  status: string | null
  type: ProfileType | null
  circlesAddress: string | null
  circlesSafeOwner: string | null
  circlesTokenAddress: string | null
  firstName: string
  lastName: string | null
  avatarUrl: string | null
  avatarCid: string | null
  avatarMimeType: string | null
  dream: string | null
  country: string | null
  newsletter: boolean | null
  displayTimeCircles: boolean | null
  cityGeonameid: number | null
  lastAcknowledged: Date | null
  verifySafeChallenge: string | null
  newSafeAddress: string | null
}

/**
 * Model Membership
 */

export type Membership = {
  id: number
  createdAt: Date
  memberId: number
  memberAtId: number
}

/**
 * Model Subscription
 */

export type Subscription = {
  id: number
  createdAt: Date
  subscriberProfileId: number
  subscribingToOfferId: number | null
  subscribingToProfileId: number | null
}

/**
 * Model ChatMessage
 */

export type ChatMessage = {
  id: number
  createdAt: Date
  from: string
  to: string
  text: string
}

/**
 * Model DelegatedChallenges
 */

export type DelegatedChallenges = {
  id: number
  createdAt: Date
  appId: string
  sessionId: string
  requestValidTo: Date
  delegateAuthCode: string
  challenge: string | null
  challengeDepositedAt: Date | null
  challengeValidTo: Date | null
  challengedReadAt: Date | null
}

/**
 * Model Offer
 */

export type Offer = {
  id: number
  createdByProfileId: number
  publishedAt: Date
  unlistedAt: Date | null
  title: string
  pictureUrl: string | null
  pictureMimeType: string | null
  description: string | null
  categoryTagId: number
  geonameid: number
  pricePerUnit: string
  unitTagId: number
  maxUnits: number | null
  deliveryTermsTagId: number
}

/**
 * Model Purchase
 */

export type Purchase = {
  id: number
  purchasedByProfileId: number
  purchasedAt: Date
  purchasedProvenAt: Date | null
  purchasedItemId: number
  purchasedItemTitle: string
  pricePerUnit: string
  purchasedUnits: number
  grandTotal: string
  purchasedItemVat: number
  status: PurchaseStatus
}

/**
 * Model TransactionJobs
 */

export type TransactionJobs = {
  id: number
  transactionhash: string
  status: string
  user: string
  purchaseId: number
}

/**
 * Model TagType
 */

export type TagType = {
  id: string
}

/**
 * Model Transaction
 */

export type Transaction = {
  transactionHash: string
}

/**
 * Model Tag
 */

export type Tag = {
  id: number
  createdAt: Date
  createdByProfileId: number
  isPrivate: boolean
  transactionHash: string | null
  typeId: string
  chatMessageId: number | null
  value: string | null
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const ProfileType: {
  PERSON: 'PERSON',
  ORGANISATION: 'ORGANISATION',
  REGION: 'REGION'
};

export type ProfileType = (typeof ProfileType)[keyof typeof ProfileType]


export const PurchaseStatus: {
  INVALID: 'INVALID',
  ITEM_LOCKED: 'ITEM_LOCKED',
  PAYMENT_PROVEN: 'PAYMENT_PROVEN'
};

export type PurchaseStatus = (typeof PurchaseStatus)[keyof typeof PurchaseStatus]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Sessions
 * const sessions = await prisma.session.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Sessions
   * const sessions = await prisma.session.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.$executeRaw``, values will be escaped automatically
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.$executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.$queryRaw``, values will be escaped automatically
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.$queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>

      /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<GlobalReject>;

  /**
   * `prisma.invitation`: Exposes CRUD operations for the **Invitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invitations
    * const invitations = await prisma.invitation.findMany()
    * ```
    */
  get invitation(): Prisma.InvitationDelegate<GlobalReject>;

  /**
   * `prisma.redeemInvitationRequest`: Exposes CRUD operations for the **RedeemInvitationRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RedeemInvitationRequests
    * const redeemInvitationRequests = await prisma.redeemInvitationRequest.findMany()
    * ```
    */
  get redeemInvitationRequest(): Prisma.RedeemInvitationRequestDelegate<GlobalReject>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<GlobalReject>;

  /**
   * `prisma.membership`: Exposes CRUD operations for the **Membership** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Memberships
    * const memberships = await prisma.membership.findMany()
    * ```
    */
  get membership(): Prisma.MembershipDelegate<GlobalReject>;

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscription.findMany()
    * ```
    */
  get subscription(): Prisma.SubscriptionDelegate<GlobalReject>;

  /**
   * `prisma.chatMessage`: Exposes CRUD operations for the **ChatMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatMessages
    * const chatMessages = await prisma.chatMessage.findMany()
    * ```
    */
  get chatMessage(): Prisma.ChatMessageDelegate<GlobalReject>;

  /**
   * `prisma.delegatedChallenges`: Exposes CRUD operations for the **DelegatedChallenges** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DelegatedChallenges
    * const delegatedChallenges = await prisma.delegatedChallenges.findMany()
    * ```
    */
  get delegatedChallenges(): Prisma.DelegatedChallengesDelegate<GlobalReject>;

  /**
   * `prisma.offer`: Exposes CRUD operations for the **Offer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Offers
    * const offers = await prisma.offer.findMany()
    * ```
    */
  get offer(): Prisma.OfferDelegate<GlobalReject>;

  /**
   * `prisma.purchase`: Exposes CRUD operations for the **Purchase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Purchases
    * const purchases = await prisma.purchase.findMany()
    * ```
    */
  get purchase(): Prisma.PurchaseDelegate<GlobalReject>;

  /**
   * `prisma.transactionJobs`: Exposes CRUD operations for the **TransactionJobs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TransactionJobs
    * const transactionJobs = await prisma.transactionJobs.findMany()
    * ```
    */
  get transactionJobs(): Prisma.TransactionJobsDelegate<GlobalReject>;

  /**
   * `prisma.tagType`: Exposes CRUD operations for the **TagType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TagTypes
    * const tagTypes = await prisma.tagType.findMany()
    * ```
    */
  get tagType(): Prisma.TagTypeDelegate<GlobalReject>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<GlobalReject>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  /**
   * Prisma Client JS version: 2.30.2
   * Query Engine version: b8c35d44de987a9691890b3ddf3e2e7effb9bf20
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | null | JsonObject | JsonArray

  /**
   * Same as JsonObject, but allows undefined
   */
  export type InputJsonObject = {[Key in string]?: JsonValue}
 
  export interface InputJsonArray extends Array<JsonValue> {}
 
  export type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray
   type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Session: 'Session',
    Invitation: 'Invitation',
    RedeemInvitationRequest: 'RedeemInvitationRequest',
    Profile: 'Profile',
    Membership: 'Membership',
    Subscription: 'Subscription',
    ChatMessage: 'ChatMessage',
    DelegatedChallenges: 'DelegatedChallenges',
    Offer: 'Offer',
    Purchase: 'Purchase',
    TransactionJobs: 'TransactionJobs',
    TagType: 'TagType',
    Transaction: 'Transaction',
    Tag: 'Tag'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends boolean
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined; 
  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Session
   */


  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
    max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    profileId: number | null
    maxLifetime: number | null
  }

  export type SessionSumAggregateOutputType = {
    profileId: number | null
    maxLifetime: number | null
  }

  export type SessionMinAggregateOutputType = {
    sessionId: string | null
    emailAddress: string | null
    ethAddress: string | null
    challengeHash: string | null
    signature: string | null
    profileId: number | null
    issuedBy: string | null
    jti: string | null
    createdAt: Date | null
    validFrom: Date | null
    endedAt: Date | null
    endReason: string | null
    maxLifetime: number | null
  }

  export type SessionMaxAggregateOutputType = {
    sessionId: string | null
    emailAddress: string | null
    ethAddress: string | null
    challengeHash: string | null
    signature: string | null
    profileId: number | null
    issuedBy: string | null
    jti: string | null
    createdAt: Date | null
    validFrom: Date | null
    endedAt: Date | null
    endReason: string | null
    maxLifetime: number | null
  }

  export type SessionCountAggregateOutputType = {
    sessionId: number
    emailAddress: number
    ethAddress: number
    challengeHash: number
    signature: number
    profileId: number
    issuedBy: number
    jti: number
    createdAt: number
    validFrom: number
    endedAt: number
    endReason: number
    maxLifetime: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    profileId?: true
    maxLifetime?: true
  }

  export type SessionSumAggregateInputType = {
    profileId?: true
    maxLifetime?: true
  }

  export type SessionMinAggregateInputType = {
    sessionId?: true
    emailAddress?: true
    ethAddress?: true
    challengeHash?: true
    signature?: true
    profileId?: true
    issuedBy?: true
    jti?: true
    createdAt?: true
    validFrom?: true
    endedAt?: true
    endReason?: true
    maxLifetime?: true
  }

  export type SessionMaxAggregateInputType = {
    sessionId?: true
    emailAddress?: true
    ethAddress?: true
    challengeHash?: true
    signature?: true
    profileId?: true
    issuedBy?: true
    jti?: true
    createdAt?: true
    validFrom?: true
    endedAt?: true
    endReason?: true
    maxLifetime?: true
  }

  export type SessionCountAggregateInputType = {
    sessionId?: true
    emailAddress?: true
    ethAddress?: true
    challengeHash?: true
    signature?: true
    profileId?: true
    issuedBy?: true
    jti?: true
    createdAt?: true
    validFrom?: true
    endedAt?: true
    endReason?: true
    maxLifetime?: true
    _all?: true
  }

  export type SessionAggregateArgs = {
    /**
     * Filter which Session to aggregate.
     * 
    **/
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<SessionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }


    
    
  export type SessionGroupByArgs = {
    where?: SessionWhereInput
    orderBy?: Enumerable<SessionOrderByInput>
    by: Array<SessionScalarFieldEnum>
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }


  export type SessionGroupByOutputType = {
    sessionId: string
    emailAddress: string | null
    ethAddress: string | null
    challengeHash: string | null
    signature: string | null
    profileId: number | null
    issuedBy: string
    jti: string | null
    createdAt: Date
    validFrom: Date | null
    endedAt: Date | null
    endReason: string | null
    maxLifetime: number
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Promise<
    Array<
      PickArray<SessionGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], SessionGroupByOutputType[P]> 
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      > 
    >


  export type SessionSelect = {
    sessionId?: boolean
    emailAddress?: boolean
    ethAddress?: boolean
    challengeHash?: boolean
    signature?: boolean
    profile?: boolean | ProfileArgs
    profileId?: boolean
    issuedBy?: boolean
    jti?: boolean
    createdAt?: boolean
    validFrom?: boolean
    endedAt?: boolean
    endReason?: boolean
    maxLifetime?: boolean
  }

  export type SessionInclude = {
    profile?: boolean | ProfileArgs
  }

  export type SessionGetPayload<
    S extends boolean | null | undefined | SessionArgs,
    U = keyof S
      > = S extends true
        ? Session
    : S extends undefined
    ? never
    : S extends SessionArgs | SessionFindManyArgs
    ?'include' extends U
    ? Session  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'profile'
        ? ProfileGetPayload<S['include'][P]> | null : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Session ?Session [P]
  : 
          P extends 'profile'
        ? ProfileGetPayload<S['select'][P]> | null : never
  } 
    : Session
  : Session


  type SessionCountArgs = Merge<
    Omit<SessionFindManyArgs, 'select' | 'include'> & {
      select?: SessionCountAggregateInputType | true
    }
  >

  export interface SessionDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SessionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SessionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Session'> extends True ? CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>> : CheckSelect<T, Prisma__SessionClient<Session | null >, Prisma__SessionClient<SessionGetPayload<T> | null >>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SessionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SessionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Session'> extends True ? CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>> : CheckSelect<T, Prisma__SessionClient<Session | null >, Prisma__SessionClient<SessionGetPayload<T> | null >>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `sessionId`
     * const sessionWithSessionIdOnly = await prisma.session.findMany({ select: { sessionId: true } })
     * 
    **/
    findMany<T extends SessionFindManyArgs>(
      args?: SelectSubset<T, SessionFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Session>>, PrismaPromise<Array<SessionGetPayload<T>>>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
    **/
    create<T extends SessionCreateArgs>(
      args: SelectSubset<T, SessionCreateArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Create many Sessions.
     *     @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     *     @example
     *     // Create many Sessions
     *     const session = await prisma.session.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SessionCreateManyArgs>(
      args?: SelectSubset<T, SessionCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
    **/
    delete<T extends SessionDeleteArgs>(
      args: SelectSubset<T, SessionDeleteArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SessionUpdateArgs>(
      args: SelectSubset<T, SessionUpdateArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SessionDeleteManyArgs>(
      args?: SelectSubset<T, SessionDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SessionUpdateManyArgs>(
      args: SelectSubset<T, SessionUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
    **/
    upsert<T extends SessionUpsertArgs>(
      args: SelectSubset<T, SessionUpsertArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SessionClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    profile<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Throw an Error if a Session can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Session to fetch.
     * 
    **/
    where: SessionWhereUniqueInput
  }


  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Throw an Error if a Session can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Session to fetch.
     * 
    **/
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<SessionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     * 
    **/
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     * 
    **/
    distinct?: Enumerable<SessionScalarFieldEnum>
  }


  /**
   * Session findMany
   */
  export type SessionFindManyArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter, which Sessions to fetch.
     * 
    **/
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<SessionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     * 
    **/
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     * 
    **/
    skip?: number
    distinct?: Enumerable<SessionScalarFieldEnum>
  }


  /**
   * Session create
   */
  export type SessionCreateArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * The data needed to create a Session.
     * 
    **/
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }


  /**
   * Session createMany
   */
  export type SessionCreateManyArgs = {
    data: Enumerable<SessionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Session update
   */
  export type SessionUpdateArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * The data needed to update a Session.
     * 
    **/
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     * 
    **/
    where: SessionWhereUniqueInput
  }


  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs = {
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    where?: SessionWhereInput
  }


  /**
   * Session upsert
   */
  export type SessionUpsertArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * The filter to search for the Session to update in case it exists.
     * 
    **/
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     * 
    **/
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }


  /**
   * Session delete
   */
  export type SessionDeleteArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter which Session to delete.
     * 
    **/
    where: SessionWhereUniqueInput
  }


  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs = {
    where?: SessionWhereInput
  }


  /**
   * Session without action
   */
  export type SessionArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
  }



  /**
   * Model Invitation
   */


  export type AggregateInvitation = {
    _count: InvitationCountAggregateOutputType | null
    count: InvitationCountAggregateOutputType | null
    _avg: InvitationAvgAggregateOutputType | null
    avg: InvitationAvgAggregateOutputType | null
    _sum: InvitationSumAggregateOutputType | null
    sum: InvitationSumAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
    max: InvitationMaxAggregateOutputType | null
  }

  export type InvitationAvgAggregateOutputType = {
    id: number | null
    createdByProfileId: number | null
    claimedByProfileId: number | null
    redeemedByProfileId: number | null
  }

  export type InvitationSumAggregateOutputType = {
    id: number | null
    createdByProfileId: number | null
    claimedByProfileId: number | null
    redeemedByProfileId: number | null
  }

  export type InvitationMinAggregateOutputType = {
    id: number | null
    createdByProfileId: number | null
    createdAt: Date | null
    name: string | null
    code: string | null
    claimedByProfileId: number | null
    claimedAt: Date | null
    redeemedByProfileId: number | null
    redeemedAt: Date | null
    redeemTxHash: string | null
    address: string | null
    key: string | null
  }

  export type InvitationMaxAggregateOutputType = {
    id: number | null
    createdByProfileId: number | null
    createdAt: Date | null
    name: string | null
    code: string | null
    claimedByProfileId: number | null
    claimedAt: Date | null
    redeemedByProfileId: number | null
    redeemedAt: Date | null
    redeemTxHash: string | null
    address: string | null
    key: string | null
  }

  export type InvitationCountAggregateOutputType = {
    id: number
    createdByProfileId: number
    createdAt: number
    name: number
    code: number
    claimedByProfileId: number
    claimedAt: number
    redeemedByProfileId: number
    redeemedAt: number
    redeemTxHash: number
    address: number
    key: number
    _all: number
  }


  export type InvitationAvgAggregateInputType = {
    id?: true
    createdByProfileId?: true
    claimedByProfileId?: true
    redeemedByProfileId?: true
  }

  export type InvitationSumAggregateInputType = {
    id?: true
    createdByProfileId?: true
    claimedByProfileId?: true
    redeemedByProfileId?: true
  }

  export type InvitationMinAggregateInputType = {
    id?: true
    createdByProfileId?: true
    createdAt?: true
    name?: true
    code?: true
    claimedByProfileId?: true
    claimedAt?: true
    redeemedByProfileId?: true
    redeemedAt?: true
    redeemTxHash?: true
    address?: true
    key?: true
  }

  export type InvitationMaxAggregateInputType = {
    id?: true
    createdByProfileId?: true
    createdAt?: true
    name?: true
    code?: true
    claimedByProfileId?: true
    claimedAt?: true
    redeemedByProfileId?: true
    redeemedAt?: true
    redeemTxHash?: true
    address?: true
    key?: true
  }

  export type InvitationCountAggregateInputType = {
    id?: true
    createdByProfileId?: true
    createdAt?: true
    name?: true
    code?: true
    claimedByProfileId?: true
    claimedAt?: true
    redeemedByProfileId?: true
    redeemedAt?: true
    redeemTxHash?: true
    address?: true
    key?: true
    _all?: true
  }

  export type InvitationAggregateArgs = {
    /**
     * Filter which Invitation to aggregate.
     * 
    **/
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     * 
    **/
    orderBy?: Enumerable<InvitationOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invitations
    **/
    _count?: true | InvitationCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | InvitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvitationAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: InvitationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvitationSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: InvitationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvitationMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: InvitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvitationMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: InvitationMaxAggregateInputType
  }

  export type GetInvitationAggregateType<T extends InvitationAggregateArgs> = {
        [P in keyof T & keyof AggregateInvitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvitation[P]>
      : GetScalarType<T[P], AggregateInvitation[P]>
  }


    
    
  export type InvitationGroupByArgs = {
    where?: InvitationWhereInput
    orderBy?: Enumerable<InvitationOrderByInput>
    by: Array<InvitationScalarFieldEnum>
    having?: InvitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvitationCountAggregateInputType | true
    _avg?: InvitationAvgAggregateInputType
    _sum?: InvitationSumAggregateInputType
    _min?: InvitationMinAggregateInputType
    _max?: InvitationMaxAggregateInputType
  }


  export type InvitationGroupByOutputType = {
    id: number
    createdByProfileId: number
    createdAt: Date
    name: string
    code: string
    claimedByProfileId: number | null
    claimedAt: Date | null
    redeemedByProfileId: number | null
    redeemedAt: Date | null
    redeemTxHash: string | null
    address: string
    key: string
    _count: InvitationCountAggregateOutputType | null
    _avg: InvitationAvgAggregateOutputType | null
    _sum: InvitationSumAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
  }

  type GetInvitationGroupByPayload<T extends InvitationGroupByArgs> = Promise<
    Array<
      PickArray<InvitationGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof InvitationGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], InvitationGroupByOutputType[P]> 
            : GetScalarType<T[P], InvitationGroupByOutputType[P]>
        }
      > 
    >


  export type InvitationSelect = {
    id?: boolean
    createdBy?: boolean | ProfileArgs
    createdByProfileId?: boolean
    createdAt?: boolean
    name?: boolean
    code?: boolean
    claimedBy?: boolean | ProfileArgs
    claimedByProfileId?: boolean
    claimedAt?: boolean
    redeemedBy?: boolean | ProfileArgs
    redeemedByProfileId?: boolean
    redeemedAt?: boolean
    redeemTxHash?: boolean
    address?: boolean
    key?: boolean
    indexedTransactions?: boolean | RedeemInvitationRequestFindManyArgs
  }

  export type InvitationInclude = {
    createdBy?: boolean | ProfileArgs
    claimedBy?: boolean | ProfileArgs
    redeemedBy?: boolean | ProfileArgs
    indexedTransactions?: boolean | RedeemInvitationRequestFindManyArgs
  }

  export type InvitationGetPayload<
    S extends boolean | null | undefined | InvitationArgs,
    U = keyof S
      > = S extends true
        ? Invitation
    : S extends undefined
    ? never
    : S extends InvitationArgs | InvitationFindManyArgs
    ?'include' extends U
    ? Invitation  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'createdBy'
        ? ProfileGetPayload<S['include'][P]> :
        P extends 'claimedBy'
        ? ProfileGetPayload<S['include'][P]> | null :
        P extends 'redeemedBy'
        ? ProfileGetPayload<S['include'][P]> | null :
        P extends 'indexedTransactions'
        ? Array < RedeemInvitationRequestGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Invitation ?Invitation [P]
  : 
          P extends 'createdBy'
        ? ProfileGetPayload<S['select'][P]> :
        P extends 'claimedBy'
        ? ProfileGetPayload<S['select'][P]> | null :
        P extends 'redeemedBy'
        ? ProfileGetPayload<S['select'][P]> | null :
        P extends 'indexedTransactions'
        ? Array < RedeemInvitationRequestGetPayload<S['select'][P]>>  : never
  } 
    : Invitation
  : Invitation


  type InvitationCountArgs = Merge<
    Omit<InvitationFindManyArgs, 'select' | 'include'> & {
      select?: InvitationCountAggregateInputType | true
    }
  >

  export interface InvitationDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Invitation that matches the filter.
     * @param {InvitationFindUniqueArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends InvitationFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, InvitationFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Invitation'> extends True ? CheckSelect<T, Prisma__InvitationClient<Invitation>, Prisma__InvitationClient<InvitationGetPayload<T>>> : CheckSelect<T, Prisma__InvitationClient<Invitation | null >, Prisma__InvitationClient<InvitationGetPayload<T> | null >>

    /**
     * Find the first Invitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindFirstArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends InvitationFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, InvitationFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Invitation'> extends True ? CheckSelect<T, Prisma__InvitationClient<Invitation>, Prisma__InvitationClient<InvitationGetPayload<T>>> : CheckSelect<T, Prisma__InvitationClient<Invitation | null >, Prisma__InvitationClient<InvitationGetPayload<T> | null >>

    /**
     * Find zero or more Invitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invitations
     * const invitations = await prisma.invitation.findMany()
     * 
     * // Get first 10 Invitations
     * const invitations = await prisma.invitation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invitationWithIdOnly = await prisma.invitation.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends InvitationFindManyArgs>(
      args?: SelectSubset<T, InvitationFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Invitation>>, PrismaPromise<Array<InvitationGetPayload<T>>>>

    /**
     * Create a Invitation.
     * @param {InvitationCreateArgs} args - Arguments to create a Invitation.
     * @example
     * // Create one Invitation
     * const Invitation = await prisma.invitation.create({
     *   data: {
     *     // ... data to create a Invitation
     *   }
     * })
     * 
    **/
    create<T extends InvitationCreateArgs>(
      args: SelectSubset<T, InvitationCreateArgs>
    ): CheckSelect<T, Prisma__InvitationClient<Invitation>, Prisma__InvitationClient<InvitationGetPayload<T>>>

    /**
     * Create many Invitations.
     *     @param {InvitationCreateManyArgs} args - Arguments to create many Invitations.
     *     @example
     *     // Create many Invitations
     *     const invitation = await prisma.invitation.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends InvitationCreateManyArgs>(
      args?: SelectSubset<T, InvitationCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Invitation.
     * @param {InvitationDeleteArgs} args - Arguments to delete one Invitation.
     * @example
     * // Delete one Invitation
     * const Invitation = await prisma.invitation.delete({
     *   where: {
     *     // ... filter to delete one Invitation
     *   }
     * })
     * 
    **/
    delete<T extends InvitationDeleteArgs>(
      args: SelectSubset<T, InvitationDeleteArgs>
    ): CheckSelect<T, Prisma__InvitationClient<Invitation>, Prisma__InvitationClient<InvitationGetPayload<T>>>

    /**
     * Update one Invitation.
     * @param {InvitationUpdateArgs} args - Arguments to update one Invitation.
     * @example
     * // Update one Invitation
     * const invitation = await prisma.invitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends InvitationUpdateArgs>(
      args: SelectSubset<T, InvitationUpdateArgs>
    ): CheckSelect<T, Prisma__InvitationClient<Invitation>, Prisma__InvitationClient<InvitationGetPayload<T>>>

    /**
     * Delete zero or more Invitations.
     * @param {InvitationDeleteManyArgs} args - Arguments to filter Invitations to delete.
     * @example
     * // Delete a few Invitations
     * const { count } = await prisma.invitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends InvitationDeleteManyArgs>(
      args?: SelectSubset<T, InvitationDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invitations
     * const invitation = await prisma.invitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends InvitationUpdateManyArgs>(
      args: SelectSubset<T, InvitationUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Invitation.
     * @param {InvitationUpsertArgs} args - Arguments to update or create a Invitation.
     * @example
     * // Update or create a Invitation
     * const invitation = await prisma.invitation.upsert({
     *   create: {
     *     // ... data to create a Invitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invitation we want to update
     *   }
     * })
    **/
    upsert<T extends InvitationUpsertArgs>(
      args: SelectSubset<T, InvitationUpsertArgs>
    ): CheckSelect<T, Prisma__InvitationClient<Invitation>, Prisma__InvitationClient<InvitationGetPayload<T>>>

    /**
     * Count the number of Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationCountArgs} args - Arguments to filter Invitations to count.
     * @example
     * // Count the number of Invitations
     * const count = await prisma.invitation.count({
     *   where: {
     *     // ... the filter for the Invitations we want to count
     *   }
     * })
    **/
    count<T extends InvitationCountArgs>(
      args?: Subset<T, InvitationCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvitationAggregateArgs>(args: Subset<T, InvitationAggregateArgs>): PrismaPromise<GetInvitationAggregateType<T>>

    /**
     * Group by Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvitationGroupByArgs['orderBy'] }
        : { orderBy?: InvitationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvitationGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__InvitationClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    createdBy<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>;

    claimedBy<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>;

    redeemedBy<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>;

    indexedTransactions<T extends RedeemInvitationRequestFindManyArgs = {}>(args?: Subset<T, RedeemInvitationRequestFindManyArgs>): CheckSelect<T, PrismaPromise<Array<RedeemInvitationRequest>>, PrismaPromise<Array<RedeemInvitationRequestGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Invitation findUnique
   */
  export type InvitationFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Invitation
     * 
    **/
    select?: InvitationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InvitationInclude | null
    /**
     * Throw an Error if a Invitation can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Invitation to fetch.
     * 
    **/
    where: InvitationWhereUniqueInput
  }


  /**
   * Invitation findFirst
   */
  export type InvitationFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Invitation
     * 
    **/
    select?: InvitationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InvitationInclude | null
    /**
     * Throw an Error if a Invitation can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Invitation to fetch.
     * 
    **/
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     * 
    **/
    orderBy?: Enumerable<InvitationOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invitations.
     * 
    **/
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     * 
    **/
    distinct?: Enumerable<InvitationScalarFieldEnum>
  }


  /**
   * Invitation findMany
   */
  export type InvitationFindManyArgs = {
    /**
     * Select specific fields to fetch from the Invitation
     * 
    **/
    select?: InvitationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InvitationInclude | null
    /**
     * Filter, which Invitations to fetch.
     * 
    **/
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     * 
    **/
    orderBy?: Enumerable<InvitationOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invitations.
     * 
    **/
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     * 
    **/
    skip?: number
    distinct?: Enumerable<InvitationScalarFieldEnum>
  }


  /**
   * Invitation create
   */
  export type InvitationCreateArgs = {
    /**
     * Select specific fields to fetch from the Invitation
     * 
    **/
    select?: InvitationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InvitationInclude | null
    /**
     * The data needed to create a Invitation.
     * 
    **/
    data: XOR<InvitationCreateInput, InvitationUncheckedCreateInput>
  }


  /**
   * Invitation createMany
   */
  export type InvitationCreateManyArgs = {
    data: Enumerable<InvitationCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Invitation update
   */
  export type InvitationUpdateArgs = {
    /**
     * Select specific fields to fetch from the Invitation
     * 
    **/
    select?: InvitationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InvitationInclude | null
    /**
     * The data needed to update a Invitation.
     * 
    **/
    data: XOR<InvitationUpdateInput, InvitationUncheckedUpdateInput>
    /**
     * Choose, which Invitation to update.
     * 
    **/
    where: InvitationWhereUniqueInput
  }


  /**
   * Invitation updateMany
   */
  export type InvitationUpdateManyArgs = {
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyInput>
    where?: InvitationWhereInput
  }


  /**
   * Invitation upsert
   */
  export type InvitationUpsertArgs = {
    /**
     * Select specific fields to fetch from the Invitation
     * 
    **/
    select?: InvitationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InvitationInclude | null
    /**
     * The filter to search for the Invitation to update in case it exists.
     * 
    **/
    where: InvitationWhereUniqueInput
    /**
     * In case the Invitation found by the `where` argument doesn't exist, create a new Invitation with this data.
     * 
    **/
    create: XOR<InvitationCreateInput, InvitationUncheckedCreateInput>
    /**
     * In case the Invitation was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<InvitationUpdateInput, InvitationUncheckedUpdateInput>
  }


  /**
   * Invitation delete
   */
  export type InvitationDeleteArgs = {
    /**
     * Select specific fields to fetch from the Invitation
     * 
    **/
    select?: InvitationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InvitationInclude | null
    /**
     * Filter which Invitation to delete.
     * 
    **/
    where: InvitationWhereUniqueInput
  }


  /**
   * Invitation deleteMany
   */
  export type InvitationDeleteManyArgs = {
    where?: InvitationWhereInput
  }


  /**
   * Invitation without action
   */
  export type InvitationArgs = {
    /**
     * Select specific fields to fetch from the Invitation
     * 
    **/
    select?: InvitationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InvitationInclude | null
  }



  /**
   * Model RedeemInvitationRequest
   */


  export type AggregateRedeemInvitationRequest = {
    _count: RedeemInvitationRequestCountAggregateOutputType | null
    count: RedeemInvitationRequestCountAggregateOutputType | null
    _avg: RedeemInvitationRequestAvgAggregateOutputType | null
    avg: RedeemInvitationRequestAvgAggregateOutputType | null
    _sum: RedeemInvitationRequestSumAggregateOutputType | null
    sum: RedeemInvitationRequestSumAggregateOutputType | null
    _min: RedeemInvitationRequestMinAggregateOutputType | null
    min: RedeemInvitationRequestMinAggregateOutputType | null
    _max: RedeemInvitationRequestMaxAggregateOutputType | null
    max: RedeemInvitationRequestMaxAggregateOutputType | null
  }

  export type RedeemInvitationRequestAvgAggregateOutputType = {
    id: number | null
    createdByProfileId: number | null
    invitationToRedeemId: number | null
  }

  export type RedeemInvitationRequestSumAggregateOutputType = {
    id: number | null
    createdByProfileId: number | null
    invitationToRedeemId: number | null
  }

  export type RedeemInvitationRequestMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    createdByProfileId: number | null
    workerProcess: string | null
    pickedAt: Date | null
    invitationToRedeemId: number | null
  }

  export type RedeemInvitationRequestMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    createdByProfileId: number | null
    workerProcess: string | null
    pickedAt: Date | null
    invitationToRedeemId: number | null
  }

  export type RedeemInvitationRequestCountAggregateOutputType = {
    id: number
    createdAt: number
    createdByProfileId: number
    workerProcess: number
    pickedAt: number
    invitationToRedeemId: number
    _all: number
  }


  export type RedeemInvitationRequestAvgAggregateInputType = {
    id?: true
    createdByProfileId?: true
    invitationToRedeemId?: true
  }

  export type RedeemInvitationRequestSumAggregateInputType = {
    id?: true
    createdByProfileId?: true
    invitationToRedeemId?: true
  }

  export type RedeemInvitationRequestMinAggregateInputType = {
    id?: true
    createdAt?: true
    createdByProfileId?: true
    workerProcess?: true
    pickedAt?: true
    invitationToRedeemId?: true
  }

  export type RedeemInvitationRequestMaxAggregateInputType = {
    id?: true
    createdAt?: true
    createdByProfileId?: true
    workerProcess?: true
    pickedAt?: true
    invitationToRedeemId?: true
  }

  export type RedeemInvitationRequestCountAggregateInputType = {
    id?: true
    createdAt?: true
    createdByProfileId?: true
    workerProcess?: true
    pickedAt?: true
    invitationToRedeemId?: true
    _all?: true
  }

  export type RedeemInvitationRequestAggregateArgs = {
    /**
     * Filter which RedeemInvitationRequest to aggregate.
     * 
    **/
    where?: RedeemInvitationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RedeemInvitationRequests to fetch.
     * 
    **/
    orderBy?: Enumerable<RedeemInvitationRequestOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: RedeemInvitationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RedeemInvitationRequests from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RedeemInvitationRequests.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RedeemInvitationRequests
    **/
    _count?: true | RedeemInvitationRequestCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | RedeemInvitationRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RedeemInvitationRequestAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: RedeemInvitationRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RedeemInvitationRequestSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: RedeemInvitationRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RedeemInvitationRequestMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: RedeemInvitationRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RedeemInvitationRequestMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: RedeemInvitationRequestMaxAggregateInputType
  }

  export type GetRedeemInvitationRequestAggregateType<T extends RedeemInvitationRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateRedeemInvitationRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRedeemInvitationRequest[P]>
      : GetScalarType<T[P], AggregateRedeemInvitationRequest[P]>
  }


    
    
  export type RedeemInvitationRequestGroupByArgs = {
    where?: RedeemInvitationRequestWhereInput
    orderBy?: Enumerable<RedeemInvitationRequestOrderByInput>
    by: Array<RedeemInvitationRequestScalarFieldEnum>
    having?: RedeemInvitationRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RedeemInvitationRequestCountAggregateInputType | true
    _avg?: RedeemInvitationRequestAvgAggregateInputType
    _sum?: RedeemInvitationRequestSumAggregateInputType
    _min?: RedeemInvitationRequestMinAggregateInputType
    _max?: RedeemInvitationRequestMaxAggregateInputType
  }


  export type RedeemInvitationRequestGroupByOutputType = {
    id: number
    createdAt: Date
    createdByProfileId: number
    workerProcess: string | null
    pickedAt: Date | null
    invitationToRedeemId: number
    _count: RedeemInvitationRequestCountAggregateOutputType | null
    _avg: RedeemInvitationRequestAvgAggregateOutputType | null
    _sum: RedeemInvitationRequestSumAggregateOutputType | null
    _min: RedeemInvitationRequestMinAggregateOutputType | null
    _max: RedeemInvitationRequestMaxAggregateOutputType | null
  }

  type GetRedeemInvitationRequestGroupByPayload<T extends RedeemInvitationRequestGroupByArgs> = Promise<
    Array<
      PickArray<RedeemInvitationRequestGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof RedeemInvitationRequestGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], RedeemInvitationRequestGroupByOutputType[P]> 
            : GetScalarType<T[P], RedeemInvitationRequestGroupByOutputType[P]>
        }
      > 
    >


  export type RedeemInvitationRequestSelect = {
    id?: boolean
    createdAt?: boolean
    createdBy?: boolean | ProfileArgs
    createdByProfileId?: boolean
    workerProcess?: boolean
    pickedAt?: boolean
    invitationToRedeem?: boolean | InvitationArgs
    invitationToRedeemId?: boolean
  }

  export type RedeemInvitationRequestInclude = {
    createdBy?: boolean | ProfileArgs
    invitationToRedeem?: boolean | InvitationArgs
  }

  export type RedeemInvitationRequestGetPayload<
    S extends boolean | null | undefined | RedeemInvitationRequestArgs,
    U = keyof S
      > = S extends true
        ? RedeemInvitationRequest
    : S extends undefined
    ? never
    : S extends RedeemInvitationRequestArgs | RedeemInvitationRequestFindManyArgs
    ?'include' extends U
    ? RedeemInvitationRequest  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'createdBy'
        ? ProfileGetPayload<S['include'][P]> :
        P extends 'invitationToRedeem'
        ? InvitationGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof RedeemInvitationRequest ?RedeemInvitationRequest [P]
  : 
          P extends 'createdBy'
        ? ProfileGetPayload<S['select'][P]> :
        P extends 'invitationToRedeem'
        ? InvitationGetPayload<S['select'][P]> : never
  } 
    : RedeemInvitationRequest
  : RedeemInvitationRequest


  type RedeemInvitationRequestCountArgs = Merge<
    Omit<RedeemInvitationRequestFindManyArgs, 'select' | 'include'> & {
      select?: RedeemInvitationRequestCountAggregateInputType | true
    }
  >

  export interface RedeemInvitationRequestDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one RedeemInvitationRequest that matches the filter.
     * @param {RedeemInvitationRequestFindUniqueArgs} args - Arguments to find a RedeemInvitationRequest
     * @example
     * // Get one RedeemInvitationRequest
     * const redeemInvitationRequest = await prisma.redeemInvitationRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends RedeemInvitationRequestFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, RedeemInvitationRequestFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'RedeemInvitationRequest'> extends True ? CheckSelect<T, Prisma__RedeemInvitationRequestClient<RedeemInvitationRequest>, Prisma__RedeemInvitationRequestClient<RedeemInvitationRequestGetPayload<T>>> : CheckSelect<T, Prisma__RedeemInvitationRequestClient<RedeemInvitationRequest | null >, Prisma__RedeemInvitationRequestClient<RedeemInvitationRequestGetPayload<T> | null >>

    /**
     * Find the first RedeemInvitationRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemInvitationRequestFindFirstArgs} args - Arguments to find a RedeemInvitationRequest
     * @example
     * // Get one RedeemInvitationRequest
     * const redeemInvitationRequest = await prisma.redeemInvitationRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends RedeemInvitationRequestFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, RedeemInvitationRequestFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'RedeemInvitationRequest'> extends True ? CheckSelect<T, Prisma__RedeemInvitationRequestClient<RedeemInvitationRequest>, Prisma__RedeemInvitationRequestClient<RedeemInvitationRequestGetPayload<T>>> : CheckSelect<T, Prisma__RedeemInvitationRequestClient<RedeemInvitationRequest | null >, Prisma__RedeemInvitationRequestClient<RedeemInvitationRequestGetPayload<T> | null >>

    /**
     * Find zero or more RedeemInvitationRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemInvitationRequestFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RedeemInvitationRequests
     * const redeemInvitationRequests = await prisma.redeemInvitationRequest.findMany()
     * 
     * // Get first 10 RedeemInvitationRequests
     * const redeemInvitationRequests = await prisma.redeemInvitationRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const redeemInvitationRequestWithIdOnly = await prisma.redeemInvitationRequest.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends RedeemInvitationRequestFindManyArgs>(
      args?: SelectSubset<T, RedeemInvitationRequestFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<RedeemInvitationRequest>>, PrismaPromise<Array<RedeemInvitationRequestGetPayload<T>>>>

    /**
     * Create a RedeemInvitationRequest.
     * @param {RedeemInvitationRequestCreateArgs} args - Arguments to create a RedeemInvitationRequest.
     * @example
     * // Create one RedeemInvitationRequest
     * const RedeemInvitationRequest = await prisma.redeemInvitationRequest.create({
     *   data: {
     *     // ... data to create a RedeemInvitationRequest
     *   }
     * })
     * 
    **/
    create<T extends RedeemInvitationRequestCreateArgs>(
      args: SelectSubset<T, RedeemInvitationRequestCreateArgs>
    ): CheckSelect<T, Prisma__RedeemInvitationRequestClient<RedeemInvitationRequest>, Prisma__RedeemInvitationRequestClient<RedeemInvitationRequestGetPayload<T>>>

    /**
     * Create many RedeemInvitationRequests.
     *     @param {RedeemInvitationRequestCreateManyArgs} args - Arguments to create many RedeemInvitationRequests.
     *     @example
     *     // Create many RedeemInvitationRequests
     *     const redeemInvitationRequest = await prisma.redeemInvitationRequest.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends RedeemInvitationRequestCreateManyArgs>(
      args?: SelectSubset<T, RedeemInvitationRequestCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a RedeemInvitationRequest.
     * @param {RedeemInvitationRequestDeleteArgs} args - Arguments to delete one RedeemInvitationRequest.
     * @example
     * // Delete one RedeemInvitationRequest
     * const RedeemInvitationRequest = await prisma.redeemInvitationRequest.delete({
     *   where: {
     *     // ... filter to delete one RedeemInvitationRequest
     *   }
     * })
     * 
    **/
    delete<T extends RedeemInvitationRequestDeleteArgs>(
      args: SelectSubset<T, RedeemInvitationRequestDeleteArgs>
    ): CheckSelect<T, Prisma__RedeemInvitationRequestClient<RedeemInvitationRequest>, Prisma__RedeemInvitationRequestClient<RedeemInvitationRequestGetPayload<T>>>

    /**
     * Update one RedeemInvitationRequest.
     * @param {RedeemInvitationRequestUpdateArgs} args - Arguments to update one RedeemInvitationRequest.
     * @example
     * // Update one RedeemInvitationRequest
     * const redeemInvitationRequest = await prisma.redeemInvitationRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends RedeemInvitationRequestUpdateArgs>(
      args: SelectSubset<T, RedeemInvitationRequestUpdateArgs>
    ): CheckSelect<T, Prisma__RedeemInvitationRequestClient<RedeemInvitationRequest>, Prisma__RedeemInvitationRequestClient<RedeemInvitationRequestGetPayload<T>>>

    /**
     * Delete zero or more RedeemInvitationRequests.
     * @param {RedeemInvitationRequestDeleteManyArgs} args - Arguments to filter RedeemInvitationRequests to delete.
     * @example
     * // Delete a few RedeemInvitationRequests
     * const { count } = await prisma.redeemInvitationRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends RedeemInvitationRequestDeleteManyArgs>(
      args?: SelectSubset<T, RedeemInvitationRequestDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more RedeemInvitationRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemInvitationRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RedeemInvitationRequests
     * const redeemInvitationRequest = await prisma.redeemInvitationRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends RedeemInvitationRequestUpdateManyArgs>(
      args: SelectSubset<T, RedeemInvitationRequestUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one RedeemInvitationRequest.
     * @param {RedeemInvitationRequestUpsertArgs} args - Arguments to update or create a RedeemInvitationRequest.
     * @example
     * // Update or create a RedeemInvitationRequest
     * const redeemInvitationRequest = await prisma.redeemInvitationRequest.upsert({
     *   create: {
     *     // ... data to create a RedeemInvitationRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RedeemInvitationRequest we want to update
     *   }
     * })
    **/
    upsert<T extends RedeemInvitationRequestUpsertArgs>(
      args: SelectSubset<T, RedeemInvitationRequestUpsertArgs>
    ): CheckSelect<T, Prisma__RedeemInvitationRequestClient<RedeemInvitationRequest>, Prisma__RedeemInvitationRequestClient<RedeemInvitationRequestGetPayload<T>>>

    /**
     * Count the number of RedeemInvitationRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemInvitationRequestCountArgs} args - Arguments to filter RedeemInvitationRequests to count.
     * @example
     * // Count the number of RedeemInvitationRequests
     * const count = await prisma.redeemInvitationRequest.count({
     *   where: {
     *     // ... the filter for the RedeemInvitationRequests we want to count
     *   }
     * })
    **/
    count<T extends RedeemInvitationRequestCountArgs>(
      args?: Subset<T, RedeemInvitationRequestCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RedeemInvitationRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RedeemInvitationRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemInvitationRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RedeemInvitationRequestAggregateArgs>(args: Subset<T, RedeemInvitationRequestAggregateArgs>): PrismaPromise<GetRedeemInvitationRequestAggregateType<T>>

    /**
     * Group by RedeemInvitationRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemInvitationRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RedeemInvitationRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RedeemInvitationRequestGroupByArgs['orderBy'] }
        : { orderBy?: RedeemInvitationRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RedeemInvitationRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRedeemInvitationRequestGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for RedeemInvitationRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__RedeemInvitationRequestClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    createdBy<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>;

    invitationToRedeem<T extends InvitationArgs = {}>(args?: Subset<T, InvitationArgs>): CheckSelect<T, Prisma__InvitationClient<Invitation | null >, Prisma__InvitationClient<InvitationGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * RedeemInvitationRequest findUnique
   */
  export type RedeemInvitationRequestFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the RedeemInvitationRequest
     * 
    **/
    select?: RedeemInvitationRequestSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RedeemInvitationRequestInclude | null
    /**
     * Throw an Error if a RedeemInvitationRequest can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which RedeemInvitationRequest to fetch.
     * 
    **/
    where: RedeemInvitationRequestWhereUniqueInput
  }


  /**
   * RedeemInvitationRequest findFirst
   */
  export type RedeemInvitationRequestFindFirstArgs = {
    /**
     * Select specific fields to fetch from the RedeemInvitationRequest
     * 
    **/
    select?: RedeemInvitationRequestSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RedeemInvitationRequestInclude | null
    /**
     * Throw an Error if a RedeemInvitationRequest can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which RedeemInvitationRequest to fetch.
     * 
    **/
    where?: RedeemInvitationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RedeemInvitationRequests to fetch.
     * 
    **/
    orderBy?: Enumerable<RedeemInvitationRequestOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RedeemInvitationRequests.
     * 
    **/
    cursor?: RedeemInvitationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RedeemInvitationRequests from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RedeemInvitationRequests.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RedeemInvitationRequests.
     * 
    **/
    distinct?: Enumerable<RedeemInvitationRequestScalarFieldEnum>
  }


  /**
   * RedeemInvitationRequest findMany
   */
  export type RedeemInvitationRequestFindManyArgs = {
    /**
     * Select specific fields to fetch from the RedeemInvitationRequest
     * 
    **/
    select?: RedeemInvitationRequestSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RedeemInvitationRequestInclude | null
    /**
     * Filter, which RedeemInvitationRequests to fetch.
     * 
    **/
    where?: RedeemInvitationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RedeemInvitationRequests to fetch.
     * 
    **/
    orderBy?: Enumerable<RedeemInvitationRequestOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RedeemInvitationRequests.
     * 
    **/
    cursor?: RedeemInvitationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RedeemInvitationRequests from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RedeemInvitationRequests.
     * 
    **/
    skip?: number
    distinct?: Enumerable<RedeemInvitationRequestScalarFieldEnum>
  }


  /**
   * RedeemInvitationRequest create
   */
  export type RedeemInvitationRequestCreateArgs = {
    /**
     * Select specific fields to fetch from the RedeemInvitationRequest
     * 
    **/
    select?: RedeemInvitationRequestSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RedeemInvitationRequestInclude | null
    /**
     * The data needed to create a RedeemInvitationRequest.
     * 
    **/
    data: XOR<RedeemInvitationRequestCreateInput, RedeemInvitationRequestUncheckedCreateInput>
  }


  /**
   * RedeemInvitationRequest createMany
   */
  export type RedeemInvitationRequestCreateManyArgs = {
    data: Enumerable<RedeemInvitationRequestCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * RedeemInvitationRequest update
   */
  export type RedeemInvitationRequestUpdateArgs = {
    /**
     * Select specific fields to fetch from the RedeemInvitationRequest
     * 
    **/
    select?: RedeemInvitationRequestSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RedeemInvitationRequestInclude | null
    /**
     * The data needed to update a RedeemInvitationRequest.
     * 
    **/
    data: XOR<RedeemInvitationRequestUpdateInput, RedeemInvitationRequestUncheckedUpdateInput>
    /**
     * Choose, which RedeemInvitationRequest to update.
     * 
    **/
    where: RedeemInvitationRequestWhereUniqueInput
  }


  /**
   * RedeemInvitationRequest updateMany
   */
  export type RedeemInvitationRequestUpdateManyArgs = {
    data: XOR<RedeemInvitationRequestUpdateManyMutationInput, RedeemInvitationRequestUncheckedUpdateManyInput>
    where?: RedeemInvitationRequestWhereInput
  }


  /**
   * RedeemInvitationRequest upsert
   */
  export type RedeemInvitationRequestUpsertArgs = {
    /**
     * Select specific fields to fetch from the RedeemInvitationRequest
     * 
    **/
    select?: RedeemInvitationRequestSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RedeemInvitationRequestInclude | null
    /**
     * The filter to search for the RedeemInvitationRequest to update in case it exists.
     * 
    **/
    where: RedeemInvitationRequestWhereUniqueInput
    /**
     * In case the RedeemInvitationRequest found by the `where` argument doesn't exist, create a new RedeemInvitationRequest with this data.
     * 
    **/
    create: XOR<RedeemInvitationRequestCreateInput, RedeemInvitationRequestUncheckedCreateInput>
    /**
     * In case the RedeemInvitationRequest was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<RedeemInvitationRequestUpdateInput, RedeemInvitationRequestUncheckedUpdateInput>
  }


  /**
   * RedeemInvitationRequest delete
   */
  export type RedeemInvitationRequestDeleteArgs = {
    /**
     * Select specific fields to fetch from the RedeemInvitationRequest
     * 
    **/
    select?: RedeemInvitationRequestSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RedeemInvitationRequestInclude | null
    /**
     * Filter which RedeemInvitationRequest to delete.
     * 
    **/
    where: RedeemInvitationRequestWhereUniqueInput
  }


  /**
   * RedeemInvitationRequest deleteMany
   */
  export type RedeemInvitationRequestDeleteManyArgs = {
    where?: RedeemInvitationRequestWhereInput
  }


  /**
   * RedeemInvitationRequest without action
   */
  export type RedeemInvitationRequestArgs = {
    /**
     * Select specific fields to fetch from the RedeemInvitationRequest
     * 
    **/
    select?: RedeemInvitationRequestSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RedeemInvitationRequestInclude | null
  }



  /**
   * Model Profile
   */


  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
    max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileAvgAggregateOutputType = {
    id: number | null
    cityGeonameid: number | null
  }

  export type ProfileSumAggregateOutputType = {
    id: number | null
    cityGeonameid: number | null
  }

  export type ProfileMinAggregateOutputType = {
    id: number | null
    lastUpdateAt: Date | null
    emailAddress: string | null
    status: string | null
    type: ProfileType | null
    circlesAddress: string | null
    circlesSafeOwner: string | null
    circlesTokenAddress: string | null
    firstName: string | null
    lastName: string | null
    avatarUrl: string | null
    avatarCid: string | null
    avatarMimeType: string | null
    dream: string | null
    country: string | null
    newsletter: boolean | null
    displayTimeCircles: boolean | null
    cityGeonameid: number | null
    lastAcknowledged: Date | null
    verifySafeChallenge: string | null
    newSafeAddress: string | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: number | null
    lastUpdateAt: Date | null
    emailAddress: string | null
    status: string | null
    type: ProfileType | null
    circlesAddress: string | null
    circlesSafeOwner: string | null
    circlesTokenAddress: string | null
    firstName: string | null
    lastName: string | null
    avatarUrl: string | null
    avatarCid: string | null
    avatarMimeType: string | null
    dream: string | null
    country: string | null
    newsletter: boolean | null
    displayTimeCircles: boolean | null
    cityGeonameid: number | null
    lastAcknowledged: Date | null
    verifySafeChallenge: string | null
    newSafeAddress: string | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    lastUpdateAt: number
    emailAddress: number
    status: number
    type: number
    circlesAddress: number
    circlesSafeOwner: number
    circlesTokenAddress: number
    firstName: number
    lastName: number
    avatarUrl: number
    avatarCid: number
    avatarMimeType: number
    dream: number
    country: number
    newsletter: number
    displayTimeCircles: number
    cityGeonameid: number
    lastAcknowledged: number
    verifySafeChallenge: number
    newSafeAddress: number
    _all: number
  }


  export type ProfileAvgAggregateInputType = {
    id?: true
    cityGeonameid?: true
  }

  export type ProfileSumAggregateInputType = {
    id?: true
    cityGeonameid?: true
  }

  export type ProfileMinAggregateInputType = {
    id?: true
    lastUpdateAt?: true
    emailAddress?: true
    status?: true
    type?: true
    circlesAddress?: true
    circlesSafeOwner?: true
    circlesTokenAddress?: true
    firstName?: true
    lastName?: true
    avatarUrl?: true
    avatarCid?: true
    avatarMimeType?: true
    dream?: true
    country?: true
    newsletter?: true
    displayTimeCircles?: true
    cityGeonameid?: true
    lastAcknowledged?: true
    verifySafeChallenge?: true
    newSafeAddress?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    lastUpdateAt?: true
    emailAddress?: true
    status?: true
    type?: true
    circlesAddress?: true
    circlesSafeOwner?: true
    circlesTokenAddress?: true
    firstName?: true
    lastName?: true
    avatarUrl?: true
    avatarCid?: true
    avatarMimeType?: true
    dream?: true
    country?: true
    newsletter?: true
    displayTimeCircles?: true
    cityGeonameid?: true
    lastAcknowledged?: true
    verifySafeChallenge?: true
    newSafeAddress?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    lastUpdateAt?: true
    emailAddress?: true
    status?: true
    type?: true
    circlesAddress?: true
    circlesSafeOwner?: true
    circlesTokenAddress?: true
    firstName?: true
    lastName?: true
    avatarUrl?: true
    avatarCid?: true
    avatarMimeType?: true
    dream?: true
    country?: true
    newsletter?: true
    displayTimeCircles?: true
    cityGeonameid?: true
    lastAcknowledged?: true
    verifySafeChallenge?: true
    newSafeAddress?: true
    _all?: true
  }

  export type ProfileAggregateArgs = {
    /**
     * Filter which Profile to aggregate.
     * 
    **/
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     * 
    **/
    orderBy?: Enumerable<ProfileOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: ProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: ProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }


    
    
  export type ProfileGroupByArgs = {
    where?: ProfileWhereInput
    orderBy?: Enumerable<ProfileOrderByInput>
    by: Array<ProfileScalarFieldEnum>
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _avg?: ProfileAvgAggregateInputType
    _sum?: ProfileSumAggregateInputType
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }


  export type ProfileGroupByOutputType = {
    id: number
    lastUpdateAt: Date
    emailAddress: string | null
    status: string | null
    type: ProfileType | null
    circlesAddress: string | null
    circlesSafeOwner: string | null
    circlesTokenAddress: string | null
    firstName: string
    lastName: string | null
    avatarUrl: string | null
    avatarCid: string | null
    avatarMimeType: string | null
    dream: string | null
    country: string | null
    newsletter: boolean | null
    displayTimeCircles: boolean | null
    cityGeonameid: number | null
    lastAcknowledged: Date | null
    verifySafeChallenge: string | null
    newSafeAddress: string | null
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Promise<
    Array<
      PickArray<ProfileGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], ProfileGroupByOutputType[P]> 
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      > 
    >


  export type ProfileSelect = {
    id?: boolean
    lastUpdateAt?: boolean
    emailAddress?: boolean
    status?: boolean
    type?: boolean
    circlesAddress?: boolean
    circlesSafeOwner?: boolean
    circlesTokenAddress?: boolean
    firstName?: boolean
    lastName?: boolean
    avatarUrl?: boolean
    avatarCid?: boolean
    avatarMimeType?: boolean
    dream?: boolean
    country?: boolean
    newsletter?: boolean
    displayTimeCircles?: boolean
    cityGeonameid?: boolean
    lastAcknowledged?: boolean
    verifySafeChallenge?: boolean
    newSafeAddress?: boolean
    sessions?: boolean | SessionFindManyArgs
    tags?: boolean | TagFindManyArgs
    offers?: boolean | OfferFindManyArgs
    purchases?: boolean | PurchaseFindManyArgs
    invitations?: boolean | InvitationFindManyArgs
    redeemInvitationRequests?: boolean | RedeemInvitationRequestFindManyArgs
    redeemedInvitations?: boolean | InvitationFindManyArgs
    claimedInvitations?: boolean | InvitationFindManyArgs
    subscribers?: boolean | SubscriptionFindManyArgs
    subscriptions?: boolean | SubscriptionFindManyArgs
    memberships?: boolean | MembershipFindManyArgs
    members?: boolean | MembershipFindManyArgs
  }

  export type ProfileInclude = {
    sessions?: boolean | SessionFindManyArgs
    tags?: boolean | TagFindManyArgs
    offers?: boolean | OfferFindManyArgs
    purchases?: boolean | PurchaseFindManyArgs
    invitations?: boolean | InvitationFindManyArgs
    redeemInvitationRequests?: boolean | RedeemInvitationRequestFindManyArgs
    redeemedInvitations?: boolean | InvitationFindManyArgs
    claimedInvitations?: boolean | InvitationFindManyArgs
    subscribers?: boolean | SubscriptionFindManyArgs
    subscriptions?: boolean | SubscriptionFindManyArgs
    memberships?: boolean | MembershipFindManyArgs
    members?: boolean | MembershipFindManyArgs
  }

  export type ProfileGetPayload<
    S extends boolean | null | undefined | ProfileArgs,
    U = keyof S
      > = S extends true
        ? Profile
    : S extends undefined
    ? never
    : S extends ProfileArgs | ProfileFindManyArgs
    ?'include' extends U
    ? Profile  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'sessions'
        ? Array < SessionGetPayload<S['include'][P]>>  :
        P extends 'tags'
        ? Array < TagGetPayload<S['include'][P]>>  :
        P extends 'offers'
        ? Array < OfferGetPayload<S['include'][P]>>  :
        P extends 'purchases'
        ? Array < PurchaseGetPayload<S['include'][P]>>  :
        P extends 'invitations'
        ? Array < InvitationGetPayload<S['include'][P]>>  :
        P extends 'redeemInvitationRequests'
        ? Array < RedeemInvitationRequestGetPayload<S['include'][P]>>  :
        P extends 'redeemedInvitations'
        ? Array < InvitationGetPayload<S['include'][P]>>  :
        P extends 'claimedInvitations'
        ? Array < InvitationGetPayload<S['include'][P]>>  :
        P extends 'subscribers'
        ? Array < SubscriptionGetPayload<S['include'][P]>>  :
        P extends 'subscriptions'
        ? Array < SubscriptionGetPayload<S['include'][P]>>  :
        P extends 'memberships'
        ? Array < MembershipGetPayload<S['include'][P]>>  :
        P extends 'members'
        ? Array < MembershipGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Profile ?Profile [P]
  : 
          P extends 'sessions'
        ? Array < SessionGetPayload<S['select'][P]>>  :
        P extends 'tags'
        ? Array < TagGetPayload<S['select'][P]>>  :
        P extends 'offers'
        ? Array < OfferGetPayload<S['select'][P]>>  :
        P extends 'purchases'
        ? Array < PurchaseGetPayload<S['select'][P]>>  :
        P extends 'invitations'
        ? Array < InvitationGetPayload<S['select'][P]>>  :
        P extends 'redeemInvitationRequests'
        ? Array < RedeemInvitationRequestGetPayload<S['select'][P]>>  :
        P extends 'redeemedInvitations'
        ? Array < InvitationGetPayload<S['select'][P]>>  :
        P extends 'claimedInvitations'
        ? Array < InvitationGetPayload<S['select'][P]>>  :
        P extends 'subscribers'
        ? Array < SubscriptionGetPayload<S['select'][P]>>  :
        P extends 'subscriptions'
        ? Array < SubscriptionGetPayload<S['select'][P]>>  :
        P extends 'memberships'
        ? Array < MembershipGetPayload<S['select'][P]>>  :
        P extends 'members'
        ? Array < MembershipGetPayload<S['select'][P]>>  : never
  } 
    : Profile
  : Profile


  type ProfileCountArgs = Merge<
    Omit<ProfileFindManyArgs, 'select' | 'include'> & {
      select?: ProfileCountAggregateInputType | true
    }
  >

  export interface ProfileDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProfileFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProfileFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Profile'> extends True ? CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>> : CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProfileFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProfileFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Profile'> extends True ? CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>> : CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProfileFindManyArgs>(
      args?: SelectSubset<T, ProfileFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Profile>>, PrismaPromise<Array<ProfileGetPayload<T>>>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
    **/
    create<T extends ProfileCreateArgs>(
      args: SelectSubset<T, ProfileCreateArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Create many Profiles.
     *     @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     *     @example
     *     // Create many Profiles
     *     const profile = await prisma.profile.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProfileCreateManyArgs>(
      args?: SelectSubset<T, ProfileCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
    **/
    delete<T extends ProfileDeleteArgs>(
      args: SelectSubset<T, ProfileDeleteArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProfileUpdateArgs>(
      args: SelectSubset<T, ProfileUpdateArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProfileDeleteManyArgs>(
      args?: SelectSubset<T, ProfileDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProfileUpdateManyArgs>(
      args: SelectSubset<T, ProfileUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
    **/
    upsert<T extends ProfileUpsertArgs>(
      args: SelectSubset<T, ProfileUpsertArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProfileClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    sessions<T extends SessionFindManyArgs = {}>(args?: Subset<T, SessionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Session>>, PrismaPromise<Array<SessionGetPayload<T>>>>;

    tags<T extends TagFindManyArgs = {}>(args?: Subset<T, TagFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Tag>>, PrismaPromise<Array<TagGetPayload<T>>>>;

    offers<T extends OfferFindManyArgs = {}>(args?: Subset<T, OfferFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Offer>>, PrismaPromise<Array<OfferGetPayload<T>>>>;

    purchases<T extends PurchaseFindManyArgs = {}>(args?: Subset<T, PurchaseFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Purchase>>, PrismaPromise<Array<PurchaseGetPayload<T>>>>;

    invitations<T extends InvitationFindManyArgs = {}>(args?: Subset<T, InvitationFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Invitation>>, PrismaPromise<Array<InvitationGetPayload<T>>>>;

    redeemInvitationRequests<T extends RedeemInvitationRequestFindManyArgs = {}>(args?: Subset<T, RedeemInvitationRequestFindManyArgs>): CheckSelect<T, PrismaPromise<Array<RedeemInvitationRequest>>, PrismaPromise<Array<RedeemInvitationRequestGetPayload<T>>>>;

    redeemedInvitations<T extends InvitationFindManyArgs = {}>(args?: Subset<T, InvitationFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Invitation>>, PrismaPromise<Array<InvitationGetPayload<T>>>>;

    claimedInvitations<T extends InvitationFindManyArgs = {}>(args?: Subset<T, InvitationFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Invitation>>, PrismaPromise<Array<InvitationGetPayload<T>>>>;

    subscribers<T extends SubscriptionFindManyArgs = {}>(args?: Subset<T, SubscriptionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Subscription>>, PrismaPromise<Array<SubscriptionGetPayload<T>>>>;

    subscriptions<T extends SubscriptionFindManyArgs = {}>(args?: Subset<T, SubscriptionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Subscription>>, PrismaPromise<Array<SubscriptionGetPayload<T>>>>;

    memberships<T extends MembershipFindManyArgs = {}>(args?: Subset<T, MembershipFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Membership>>, PrismaPromise<Array<MembershipGetPayload<T>>>>;

    members<T extends MembershipFindManyArgs = {}>(args?: Subset<T, MembershipFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Membership>>, PrismaPromise<Array<MembershipGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * Throw an Error if a Profile can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Profile to fetch.
     * 
    **/
    where: ProfileWhereUniqueInput
  }


  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * Throw an Error if a Profile can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Profile to fetch.
     * 
    **/
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     * 
    **/
    orderBy?: Enumerable<ProfileOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     * 
    **/
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     * 
    **/
    distinct?: Enumerable<ProfileScalarFieldEnum>
  }


  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * Filter, which Profiles to fetch.
     * 
    **/
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     * 
    **/
    orderBy?: Enumerable<ProfileOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     * 
    **/
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ProfileScalarFieldEnum>
  }


  /**
   * Profile create
   */
  export type ProfileCreateArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * The data needed to create a Profile.
     * 
    **/
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }


  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs = {
    data: Enumerable<ProfileCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Profile update
   */
  export type ProfileUpdateArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * The data needed to update a Profile.
     * 
    **/
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     * 
    **/
    where: ProfileWhereUniqueInput
  }


  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs = {
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    where?: ProfileWhereInput
  }


  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * The filter to search for the Profile to update in case it exists.
     * 
    **/
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     * 
    **/
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }


  /**
   * Profile delete
   */
  export type ProfileDeleteArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * Filter which Profile to delete.
     * 
    **/
    where: ProfileWhereUniqueInput
  }


  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs = {
    where?: ProfileWhereInput
  }


  /**
   * Profile without action
   */
  export type ProfileArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
  }



  /**
   * Model Membership
   */


  export type AggregateMembership = {
    _count: MembershipCountAggregateOutputType | null
    count: MembershipCountAggregateOutputType | null
    _avg: MembershipAvgAggregateOutputType | null
    avg: MembershipAvgAggregateOutputType | null
    _sum: MembershipSumAggregateOutputType | null
    sum: MembershipSumAggregateOutputType | null
    _min: MembershipMinAggregateOutputType | null
    min: MembershipMinAggregateOutputType | null
    _max: MembershipMaxAggregateOutputType | null
    max: MembershipMaxAggregateOutputType | null
  }

  export type MembershipAvgAggregateOutputType = {
    id: number | null
    memberId: number | null
    memberAtId: number | null
  }

  export type MembershipSumAggregateOutputType = {
    id: number | null
    memberId: number | null
    memberAtId: number | null
  }

  export type MembershipMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    memberId: number | null
    memberAtId: number | null
  }

  export type MembershipMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    memberId: number | null
    memberAtId: number | null
  }

  export type MembershipCountAggregateOutputType = {
    id: number
    createdAt: number
    memberId: number
    memberAtId: number
    _all: number
  }


  export type MembershipAvgAggregateInputType = {
    id?: true
    memberId?: true
    memberAtId?: true
  }

  export type MembershipSumAggregateInputType = {
    id?: true
    memberId?: true
    memberAtId?: true
  }

  export type MembershipMinAggregateInputType = {
    id?: true
    createdAt?: true
    memberId?: true
    memberAtId?: true
  }

  export type MembershipMaxAggregateInputType = {
    id?: true
    createdAt?: true
    memberId?: true
    memberAtId?: true
  }

  export type MembershipCountAggregateInputType = {
    id?: true
    createdAt?: true
    memberId?: true
    memberAtId?: true
    _all?: true
  }

  export type MembershipAggregateArgs = {
    /**
     * Filter which Membership to aggregate.
     * 
    **/
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     * 
    **/
    orderBy?: Enumerable<MembershipOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Memberships
    **/
    _count?: true | MembershipCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | MembershipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MembershipAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: MembershipAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MembershipSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: MembershipSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MembershipMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: MembershipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MembershipMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: MembershipMaxAggregateInputType
  }

  export type GetMembershipAggregateType<T extends MembershipAggregateArgs> = {
        [P in keyof T & keyof AggregateMembership]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMembership[P]>
      : GetScalarType<T[P], AggregateMembership[P]>
  }


    
    
  export type MembershipGroupByArgs = {
    where?: MembershipWhereInput
    orderBy?: Enumerable<MembershipOrderByInput>
    by: Array<MembershipScalarFieldEnum>
    having?: MembershipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MembershipCountAggregateInputType | true
    _avg?: MembershipAvgAggregateInputType
    _sum?: MembershipSumAggregateInputType
    _min?: MembershipMinAggregateInputType
    _max?: MembershipMaxAggregateInputType
  }


  export type MembershipGroupByOutputType = {
    id: number
    createdAt: Date
    memberId: number
    memberAtId: number
    _count: MembershipCountAggregateOutputType | null
    _avg: MembershipAvgAggregateOutputType | null
    _sum: MembershipSumAggregateOutputType | null
    _min: MembershipMinAggregateOutputType | null
    _max: MembershipMaxAggregateOutputType | null
  }

  type GetMembershipGroupByPayload<T extends MembershipGroupByArgs> = Promise<
    Array<
      PickArray<MembershipGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof MembershipGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], MembershipGroupByOutputType[P]> 
            : GetScalarType<T[P], MembershipGroupByOutputType[P]>
        }
      > 
    >


  export type MembershipSelect = {
    id?: boolean
    createdAt?: boolean
    memberId?: boolean
    member?: boolean | ProfileArgs
    memberAtId?: boolean
    memberAt?: boolean | ProfileArgs
  }

  export type MembershipInclude = {
    member?: boolean | ProfileArgs
    memberAt?: boolean | ProfileArgs
  }

  export type MembershipGetPayload<
    S extends boolean | null | undefined | MembershipArgs,
    U = keyof S
      > = S extends true
        ? Membership
    : S extends undefined
    ? never
    : S extends MembershipArgs | MembershipFindManyArgs
    ?'include' extends U
    ? Membership  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'member'
        ? ProfileGetPayload<S['include'][P]> :
        P extends 'memberAt'
        ? ProfileGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Membership ?Membership [P]
  : 
          P extends 'member'
        ? ProfileGetPayload<S['select'][P]> :
        P extends 'memberAt'
        ? ProfileGetPayload<S['select'][P]> : never
  } 
    : Membership
  : Membership


  type MembershipCountArgs = Merge<
    Omit<MembershipFindManyArgs, 'select' | 'include'> & {
      select?: MembershipCountAggregateInputType | true
    }
  >

  export interface MembershipDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Membership that matches the filter.
     * @param {MembershipFindUniqueArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MembershipFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, MembershipFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Membership'> extends True ? CheckSelect<T, Prisma__MembershipClient<Membership>, Prisma__MembershipClient<MembershipGetPayload<T>>> : CheckSelect<T, Prisma__MembershipClient<Membership | null >, Prisma__MembershipClient<MembershipGetPayload<T> | null >>

    /**
     * Find the first Membership that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindFirstArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MembershipFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, MembershipFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Membership'> extends True ? CheckSelect<T, Prisma__MembershipClient<Membership>, Prisma__MembershipClient<MembershipGetPayload<T>>> : CheckSelect<T, Prisma__MembershipClient<Membership | null >, Prisma__MembershipClient<MembershipGetPayload<T> | null >>

    /**
     * Find zero or more Memberships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Memberships
     * const memberships = await prisma.membership.findMany()
     * 
     * // Get first 10 Memberships
     * const memberships = await prisma.membership.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const membershipWithIdOnly = await prisma.membership.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends MembershipFindManyArgs>(
      args?: SelectSubset<T, MembershipFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Membership>>, PrismaPromise<Array<MembershipGetPayload<T>>>>

    /**
     * Create a Membership.
     * @param {MembershipCreateArgs} args - Arguments to create a Membership.
     * @example
     * // Create one Membership
     * const Membership = await prisma.membership.create({
     *   data: {
     *     // ... data to create a Membership
     *   }
     * })
     * 
    **/
    create<T extends MembershipCreateArgs>(
      args: SelectSubset<T, MembershipCreateArgs>
    ): CheckSelect<T, Prisma__MembershipClient<Membership>, Prisma__MembershipClient<MembershipGetPayload<T>>>

    /**
     * Create many Memberships.
     *     @param {MembershipCreateManyArgs} args - Arguments to create many Memberships.
     *     @example
     *     // Create many Memberships
     *     const membership = await prisma.membership.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends MembershipCreateManyArgs>(
      args?: SelectSubset<T, MembershipCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Membership.
     * @param {MembershipDeleteArgs} args - Arguments to delete one Membership.
     * @example
     * // Delete one Membership
     * const Membership = await prisma.membership.delete({
     *   where: {
     *     // ... filter to delete one Membership
     *   }
     * })
     * 
    **/
    delete<T extends MembershipDeleteArgs>(
      args: SelectSubset<T, MembershipDeleteArgs>
    ): CheckSelect<T, Prisma__MembershipClient<Membership>, Prisma__MembershipClient<MembershipGetPayload<T>>>

    /**
     * Update one Membership.
     * @param {MembershipUpdateArgs} args - Arguments to update one Membership.
     * @example
     * // Update one Membership
     * const membership = await prisma.membership.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MembershipUpdateArgs>(
      args: SelectSubset<T, MembershipUpdateArgs>
    ): CheckSelect<T, Prisma__MembershipClient<Membership>, Prisma__MembershipClient<MembershipGetPayload<T>>>

    /**
     * Delete zero or more Memberships.
     * @param {MembershipDeleteManyArgs} args - Arguments to filter Memberships to delete.
     * @example
     * // Delete a few Memberships
     * const { count } = await prisma.membership.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MembershipDeleteManyArgs>(
      args?: SelectSubset<T, MembershipDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Memberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Memberships
     * const membership = await prisma.membership.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MembershipUpdateManyArgs>(
      args: SelectSubset<T, MembershipUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Membership.
     * @param {MembershipUpsertArgs} args - Arguments to update or create a Membership.
     * @example
     * // Update or create a Membership
     * const membership = await prisma.membership.upsert({
     *   create: {
     *     // ... data to create a Membership
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Membership we want to update
     *   }
     * })
    **/
    upsert<T extends MembershipUpsertArgs>(
      args: SelectSubset<T, MembershipUpsertArgs>
    ): CheckSelect<T, Prisma__MembershipClient<Membership>, Prisma__MembershipClient<MembershipGetPayload<T>>>

    /**
     * Count the number of Memberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipCountArgs} args - Arguments to filter Memberships to count.
     * @example
     * // Count the number of Memberships
     * const count = await prisma.membership.count({
     *   where: {
     *     // ... the filter for the Memberships we want to count
     *   }
     * })
    **/
    count<T extends MembershipCountArgs>(
      args?: Subset<T, MembershipCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MembershipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Membership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MembershipAggregateArgs>(args: Subset<T, MembershipAggregateArgs>): PrismaPromise<GetMembershipAggregateType<T>>

    /**
     * Group by Membership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MembershipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MembershipGroupByArgs['orderBy'] }
        : { orderBy?: MembershipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MembershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMembershipGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Membership.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__MembershipClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    member<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>;

    memberAt<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Membership findUnique
   */
  export type MembershipFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Membership
     * 
    **/
    select?: MembershipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MembershipInclude | null
    /**
     * Throw an Error if a Membership can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Membership to fetch.
     * 
    **/
    where: MembershipWhereUniqueInput
  }


  /**
   * Membership findFirst
   */
  export type MembershipFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Membership
     * 
    **/
    select?: MembershipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MembershipInclude | null
    /**
     * Throw an Error if a Membership can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Membership to fetch.
     * 
    **/
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     * 
    **/
    orderBy?: Enumerable<MembershipOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memberships.
     * 
    **/
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memberships.
     * 
    **/
    distinct?: Enumerable<MembershipScalarFieldEnum>
  }


  /**
   * Membership findMany
   */
  export type MembershipFindManyArgs = {
    /**
     * Select specific fields to fetch from the Membership
     * 
    **/
    select?: MembershipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MembershipInclude | null
    /**
     * Filter, which Memberships to fetch.
     * 
    **/
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     * 
    **/
    orderBy?: Enumerable<MembershipOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Memberships.
     * 
    **/
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     * 
    **/
    skip?: number
    distinct?: Enumerable<MembershipScalarFieldEnum>
  }


  /**
   * Membership create
   */
  export type MembershipCreateArgs = {
    /**
     * Select specific fields to fetch from the Membership
     * 
    **/
    select?: MembershipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MembershipInclude | null
    /**
     * The data needed to create a Membership.
     * 
    **/
    data: XOR<MembershipCreateInput, MembershipUncheckedCreateInput>
  }


  /**
   * Membership createMany
   */
  export type MembershipCreateManyArgs = {
    data: Enumerable<MembershipCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Membership update
   */
  export type MembershipUpdateArgs = {
    /**
     * Select specific fields to fetch from the Membership
     * 
    **/
    select?: MembershipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MembershipInclude | null
    /**
     * The data needed to update a Membership.
     * 
    **/
    data: XOR<MembershipUpdateInput, MembershipUncheckedUpdateInput>
    /**
     * Choose, which Membership to update.
     * 
    **/
    where: MembershipWhereUniqueInput
  }


  /**
   * Membership updateMany
   */
  export type MembershipUpdateManyArgs = {
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyInput>
    where?: MembershipWhereInput
  }


  /**
   * Membership upsert
   */
  export type MembershipUpsertArgs = {
    /**
     * Select specific fields to fetch from the Membership
     * 
    **/
    select?: MembershipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MembershipInclude | null
    /**
     * The filter to search for the Membership to update in case it exists.
     * 
    **/
    where: MembershipWhereUniqueInput
    /**
     * In case the Membership found by the `where` argument doesn't exist, create a new Membership with this data.
     * 
    **/
    create: XOR<MembershipCreateInput, MembershipUncheckedCreateInput>
    /**
     * In case the Membership was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<MembershipUpdateInput, MembershipUncheckedUpdateInput>
  }


  /**
   * Membership delete
   */
  export type MembershipDeleteArgs = {
    /**
     * Select specific fields to fetch from the Membership
     * 
    **/
    select?: MembershipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MembershipInclude | null
    /**
     * Filter which Membership to delete.
     * 
    **/
    where: MembershipWhereUniqueInput
  }


  /**
   * Membership deleteMany
   */
  export type MembershipDeleteManyArgs = {
    where?: MembershipWhereInput
  }


  /**
   * Membership without action
   */
  export type MembershipArgs = {
    /**
     * Select specific fields to fetch from the Membership
     * 
    **/
    select?: MembershipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MembershipInclude | null
  }



  /**
   * Model Subscription
   */


  export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null
    count: SubscriptionCountAggregateOutputType | null
    _avg: SubscriptionAvgAggregateOutputType | null
    avg: SubscriptionAvgAggregateOutputType | null
    _sum: SubscriptionSumAggregateOutputType | null
    sum: SubscriptionSumAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
    max: SubscriptionMaxAggregateOutputType | null
  }

  export type SubscriptionAvgAggregateOutputType = {
    id: number | null
    subscriberProfileId: number | null
    subscribingToOfferId: number | null
    subscribingToProfileId: number | null
  }

  export type SubscriptionSumAggregateOutputType = {
    id: number | null
    subscriberProfileId: number | null
    subscribingToOfferId: number | null
    subscribingToProfileId: number | null
  }

  export type SubscriptionMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    subscriberProfileId: number | null
    subscribingToOfferId: number | null
    subscribingToProfileId: number | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    subscriberProfileId: number | null
    subscribingToOfferId: number | null
    subscribingToProfileId: number | null
  }

  export type SubscriptionCountAggregateOutputType = {
    id: number
    createdAt: number
    subscriberProfileId: number
    subscribingToOfferId: number
    subscribingToProfileId: number
    _all: number
  }


  export type SubscriptionAvgAggregateInputType = {
    id?: true
    subscriberProfileId?: true
    subscribingToOfferId?: true
    subscribingToProfileId?: true
  }

  export type SubscriptionSumAggregateInputType = {
    id?: true
    subscriberProfileId?: true
    subscribingToOfferId?: true
    subscribingToProfileId?: true
  }

  export type SubscriptionMinAggregateInputType = {
    id?: true
    createdAt?: true
    subscriberProfileId?: true
    subscribingToOfferId?: true
    subscribingToProfileId?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    id?: true
    createdAt?: true
    subscriberProfileId?: true
    subscribingToOfferId?: true
    subscribingToProfileId?: true
  }

  export type SubscriptionCountAggregateInputType = {
    id?: true
    createdAt?: true
    subscriberProfileId?: true
    subscribingToOfferId?: true
    subscribingToProfileId?: true
    _all?: true
  }

  export type SubscriptionAggregateArgs = {
    /**
     * Filter which Subscription to aggregate.
     * 
    **/
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     * 
    **/
    orderBy?: Enumerable<SubscriptionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscriptions
    **/
    _count?: true | SubscriptionCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriptionAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: SubscriptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriptionSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: SubscriptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: SubscriptionMaxAggregateInputType
  }

  export type GetSubscriptionAggregateType<T extends SubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscription[P]>
      : GetScalarType<T[P], AggregateSubscription[P]>
  }


    
    
  export type SubscriptionGroupByArgs = {
    where?: SubscriptionWhereInput
    orderBy?: Enumerable<SubscriptionOrderByInput>
    by: Array<SubscriptionScalarFieldEnum>
    having?: SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCountAggregateInputType | true
    _avg?: SubscriptionAvgAggregateInputType
    _sum?: SubscriptionSumAggregateInputType
    _min?: SubscriptionMinAggregateInputType
    _max?: SubscriptionMaxAggregateInputType
  }


  export type SubscriptionGroupByOutputType = {
    id: number
    createdAt: Date
    subscriberProfileId: number
    subscribingToOfferId: number | null
    subscribingToProfileId: number | null
    _count: SubscriptionCountAggregateOutputType | null
    _avg: SubscriptionAvgAggregateOutputType | null
    _sum: SubscriptionSumAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> = Promise<
    Array<
      PickArray<SubscriptionGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof SubscriptionGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], SubscriptionGroupByOutputType[P]> 
            : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
        }
      > 
    >


  export type SubscriptionSelect = {
    id?: boolean
    createdAt?: boolean
    subscriber?: boolean | ProfileArgs
    subscriberProfileId?: boolean
    subscribingToOffer?: boolean | OfferArgs
    subscribingToOfferId?: boolean
    subscribingToProfile?: boolean | ProfileArgs
    subscribingToProfileId?: boolean
  }

  export type SubscriptionInclude = {
    subscriber?: boolean | ProfileArgs
    subscribingToOffer?: boolean | OfferArgs
    subscribingToProfile?: boolean | ProfileArgs
  }

  export type SubscriptionGetPayload<
    S extends boolean | null | undefined | SubscriptionArgs,
    U = keyof S
      > = S extends true
        ? Subscription
    : S extends undefined
    ? never
    : S extends SubscriptionArgs | SubscriptionFindManyArgs
    ?'include' extends U
    ? Subscription  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'subscriber'
        ? ProfileGetPayload<S['include'][P]> :
        P extends 'subscribingToOffer'
        ? OfferGetPayload<S['include'][P]> | null :
        P extends 'subscribingToProfile'
        ? ProfileGetPayload<S['include'][P]> | null : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Subscription ?Subscription [P]
  : 
          P extends 'subscriber'
        ? ProfileGetPayload<S['select'][P]> :
        P extends 'subscribingToOffer'
        ? OfferGetPayload<S['select'][P]> | null :
        P extends 'subscribingToProfile'
        ? ProfileGetPayload<S['select'][P]> | null : never
  } 
    : Subscription
  : Subscription


  type SubscriptionCountArgs = Merge<
    Omit<SubscriptionFindManyArgs, 'select' | 'include'> & {
      select?: SubscriptionCountAggregateInputType | true
    }
  >

  export interface SubscriptionDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Subscription that matches the filter.
     * @param {SubscriptionFindUniqueArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SubscriptionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SubscriptionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Subscription'> extends True ? CheckSelect<T, Prisma__SubscriptionClient<Subscription>, Prisma__SubscriptionClient<SubscriptionGetPayload<T>>> : CheckSelect<T, Prisma__SubscriptionClient<Subscription | null >, Prisma__SubscriptionClient<SubscriptionGetPayload<T> | null >>

    /**
     * Find the first Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SubscriptionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SubscriptionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Subscription'> extends True ? CheckSelect<T, Prisma__SubscriptionClient<Subscription>, Prisma__SubscriptionClient<SubscriptionGetPayload<T>>> : CheckSelect<T, Prisma__SubscriptionClient<Subscription | null >, Prisma__SubscriptionClient<SubscriptionGetPayload<T> | null >>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscription.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SubscriptionFindManyArgs>(
      args?: SelectSubset<T, SubscriptionFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Subscription>>, PrismaPromise<Array<SubscriptionGetPayload<T>>>>

    /**
     * Create a Subscription.
     * @param {SubscriptionCreateArgs} args - Arguments to create a Subscription.
     * @example
     * // Create one Subscription
     * const Subscription = await prisma.subscription.create({
     *   data: {
     *     // ... data to create a Subscription
     *   }
     * })
     * 
    **/
    create<T extends SubscriptionCreateArgs>(
      args: SelectSubset<T, SubscriptionCreateArgs>
    ): CheckSelect<T, Prisma__SubscriptionClient<Subscription>, Prisma__SubscriptionClient<SubscriptionGetPayload<T>>>

    /**
     * Create many Subscriptions.
     *     @param {SubscriptionCreateManyArgs} args - Arguments to create many Subscriptions.
     *     @example
     *     // Create many Subscriptions
     *     const subscription = await prisma.subscription.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SubscriptionCreateManyArgs>(
      args?: SelectSubset<T, SubscriptionCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Subscription.
     * @param {SubscriptionDeleteArgs} args - Arguments to delete one Subscription.
     * @example
     * // Delete one Subscription
     * const Subscription = await prisma.subscription.delete({
     *   where: {
     *     // ... filter to delete one Subscription
     *   }
     * })
     * 
    **/
    delete<T extends SubscriptionDeleteArgs>(
      args: SelectSubset<T, SubscriptionDeleteArgs>
    ): CheckSelect<T, Prisma__SubscriptionClient<Subscription>, Prisma__SubscriptionClient<SubscriptionGetPayload<T>>>

    /**
     * Update one Subscription.
     * @param {SubscriptionUpdateArgs} args - Arguments to update one Subscription.
     * @example
     * // Update one Subscription
     * const subscription = await prisma.subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SubscriptionUpdateArgs>(
      args: SelectSubset<T, SubscriptionUpdateArgs>
    ): CheckSelect<T, Prisma__SubscriptionClient<Subscription>, Prisma__SubscriptionClient<SubscriptionGetPayload<T>>>

    /**
     * Delete zero or more Subscriptions.
     * @param {SubscriptionDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SubscriptionDeleteManyArgs>(
      args?: SelectSubset<T, SubscriptionDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SubscriptionUpdateManyArgs>(
      args: SelectSubset<T, SubscriptionUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Subscription.
     * @param {SubscriptionUpsertArgs} args - Arguments to update or create a Subscription.
     * @example
     * // Update or create a Subscription
     * const subscription = await prisma.subscription.upsert({
     *   create: {
     *     // ... data to create a Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscription we want to update
     *   }
     * })
    **/
    upsert<T extends SubscriptionUpsertArgs>(
      args: SelectSubset<T, SubscriptionUpsertArgs>
    ): CheckSelect<T, Prisma__SubscriptionClient<Subscription>, Prisma__SubscriptionClient<SubscriptionGetPayload<T>>>

    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscription.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCountArgs>(
      args?: Subset<T, SubscriptionCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionAggregateArgs>(args: Subset<T, SubscriptionAggregateArgs>): PrismaPromise<GetSubscriptionAggregateType<T>>

    /**
     * Group by Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SubscriptionClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    subscriber<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>;

    subscribingToOffer<T extends OfferArgs = {}>(args?: Subset<T, OfferArgs>): CheckSelect<T, Prisma__OfferClient<Offer | null >, Prisma__OfferClient<OfferGetPayload<T> | null >>;

    subscribingToProfile<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Subscription findUnique
   */
  export type SubscriptionFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Subscription
     * 
    **/
    select?: SubscriptionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SubscriptionInclude | null
    /**
     * Throw an Error if a Subscription can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Subscription to fetch.
     * 
    **/
    where: SubscriptionWhereUniqueInput
  }


  /**
   * Subscription findFirst
   */
  export type SubscriptionFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Subscription
     * 
    **/
    select?: SubscriptionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SubscriptionInclude | null
    /**
     * Throw an Error if a Subscription can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Subscription to fetch.
     * 
    **/
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     * 
    **/
    orderBy?: Enumerable<SubscriptionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     * 
    **/
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     * 
    **/
    distinct?: Enumerable<SubscriptionScalarFieldEnum>
  }


  /**
   * Subscription findMany
   */
  export type SubscriptionFindManyArgs = {
    /**
     * Select specific fields to fetch from the Subscription
     * 
    **/
    select?: SubscriptionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SubscriptionInclude | null
    /**
     * Filter, which Subscriptions to fetch.
     * 
    **/
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     * 
    **/
    orderBy?: Enumerable<SubscriptionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscriptions.
     * 
    **/
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     * 
    **/
    skip?: number
    distinct?: Enumerable<SubscriptionScalarFieldEnum>
  }


  /**
   * Subscription create
   */
  export type SubscriptionCreateArgs = {
    /**
     * Select specific fields to fetch from the Subscription
     * 
    **/
    select?: SubscriptionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SubscriptionInclude | null
    /**
     * The data needed to create a Subscription.
     * 
    **/
    data: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
  }


  /**
   * Subscription createMany
   */
  export type SubscriptionCreateManyArgs = {
    data: Enumerable<SubscriptionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Subscription update
   */
  export type SubscriptionUpdateArgs = {
    /**
     * Select specific fields to fetch from the Subscription
     * 
    **/
    select?: SubscriptionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SubscriptionInclude | null
    /**
     * The data needed to update a Subscription.
     * 
    **/
    data: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which Subscription to update.
     * 
    **/
    where: SubscriptionWhereUniqueInput
  }


  /**
   * Subscription updateMany
   */
  export type SubscriptionUpdateManyArgs = {
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    where?: SubscriptionWhereInput
  }


  /**
   * Subscription upsert
   */
  export type SubscriptionUpsertArgs = {
    /**
     * Select specific fields to fetch from the Subscription
     * 
    **/
    select?: SubscriptionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SubscriptionInclude | null
    /**
     * The filter to search for the Subscription to update in case it exists.
     * 
    **/
    where: SubscriptionWhereUniqueInput
    /**
     * In case the Subscription found by the `where` argument doesn't exist, create a new Subscription with this data.
     * 
    **/
    create: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
    /**
     * In case the Subscription was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
  }


  /**
   * Subscription delete
   */
  export type SubscriptionDeleteArgs = {
    /**
     * Select specific fields to fetch from the Subscription
     * 
    **/
    select?: SubscriptionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SubscriptionInclude | null
    /**
     * Filter which Subscription to delete.
     * 
    **/
    where: SubscriptionWhereUniqueInput
  }


  /**
   * Subscription deleteMany
   */
  export type SubscriptionDeleteManyArgs = {
    where?: SubscriptionWhereInput
  }


  /**
   * Subscription without action
   */
  export type SubscriptionArgs = {
    /**
     * Select specific fields to fetch from the Subscription
     * 
    **/
    select?: SubscriptionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SubscriptionInclude | null
  }



  /**
   * Model ChatMessage
   */


  export type AggregateChatMessage = {
    _count: ChatMessageCountAggregateOutputType | null
    count: ChatMessageCountAggregateOutputType | null
    _avg: ChatMessageAvgAggregateOutputType | null
    avg: ChatMessageAvgAggregateOutputType | null
    _sum: ChatMessageSumAggregateOutputType | null
    sum: ChatMessageSumAggregateOutputType | null
    _min: ChatMessageMinAggregateOutputType | null
    min: ChatMessageMinAggregateOutputType | null
    _max: ChatMessageMaxAggregateOutputType | null
    max: ChatMessageMaxAggregateOutputType | null
  }

  export type ChatMessageAvgAggregateOutputType = {
    id: number | null
  }

  export type ChatMessageSumAggregateOutputType = {
    id: number | null
  }

  export type ChatMessageMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    from: string | null
    to: string | null
    text: string | null
  }

  export type ChatMessageMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    from: string | null
    to: string | null
    text: string | null
  }

  export type ChatMessageCountAggregateOutputType = {
    id: number
    createdAt: number
    from: number
    to: number
    text: number
    _all: number
  }


  export type ChatMessageAvgAggregateInputType = {
    id?: true
  }

  export type ChatMessageSumAggregateInputType = {
    id?: true
  }

  export type ChatMessageMinAggregateInputType = {
    id?: true
    createdAt?: true
    from?: true
    to?: true
    text?: true
  }

  export type ChatMessageMaxAggregateInputType = {
    id?: true
    createdAt?: true
    from?: true
    to?: true
    text?: true
  }

  export type ChatMessageCountAggregateInputType = {
    id?: true
    createdAt?: true
    from?: true
    to?: true
    text?: true
    _all?: true
  }

  export type ChatMessageAggregateArgs = {
    /**
     * Filter which ChatMessage to aggregate.
     * 
    **/
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     * 
    **/
    orderBy?: Enumerable<ChatMessageOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatMessages
    **/
    _count?: true | ChatMessageCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | ChatMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChatMessageAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: ChatMessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChatMessageSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: ChatMessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMessageMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: ChatMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMessageMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: ChatMessageMaxAggregateInputType
  }

  export type GetChatMessageAggregateType<T extends ChatMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateChatMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatMessage[P]>
      : GetScalarType<T[P], AggregateChatMessage[P]>
  }


    
    
  export type ChatMessageGroupByArgs = {
    where?: ChatMessageWhereInput
    orderBy?: Enumerable<ChatMessageOrderByInput>
    by: Array<ChatMessageScalarFieldEnum>
    having?: ChatMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatMessageCountAggregateInputType | true
    _avg?: ChatMessageAvgAggregateInputType
    _sum?: ChatMessageSumAggregateInputType
    _min?: ChatMessageMinAggregateInputType
    _max?: ChatMessageMaxAggregateInputType
  }


  export type ChatMessageGroupByOutputType = {
    id: number
    createdAt: Date
    from: string
    to: string
    text: string
    _count: ChatMessageCountAggregateOutputType | null
    _avg: ChatMessageAvgAggregateOutputType | null
    _sum: ChatMessageSumAggregateOutputType | null
    _min: ChatMessageMinAggregateOutputType | null
    _max: ChatMessageMaxAggregateOutputType | null
  }

  type GetChatMessageGroupByPayload<T extends ChatMessageGroupByArgs> = Promise<
    Array<
      PickArray<ChatMessageGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof ChatMessageGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], ChatMessageGroupByOutputType[P]> 
            : GetScalarType<T[P], ChatMessageGroupByOutputType[P]>
        }
      > 
    >


  export type ChatMessageSelect = {
    id?: boolean
    createdAt?: boolean
    from?: boolean
    to?: boolean
    text?: boolean
    tags?: boolean | TagFindManyArgs
  }

  export type ChatMessageInclude = {
    tags?: boolean | TagFindManyArgs
  }

  export type ChatMessageGetPayload<
    S extends boolean | null | undefined | ChatMessageArgs,
    U = keyof S
      > = S extends true
        ? ChatMessage
    : S extends undefined
    ? never
    : S extends ChatMessageArgs | ChatMessageFindManyArgs
    ?'include' extends U
    ? ChatMessage  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'tags'
        ? Array < TagGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ChatMessage ?ChatMessage [P]
  : 
          P extends 'tags'
        ? Array < TagGetPayload<S['select'][P]>>  : never
  } 
    : ChatMessage
  : ChatMessage


  type ChatMessageCountArgs = Merge<
    Omit<ChatMessageFindManyArgs, 'select' | 'include'> & {
      select?: ChatMessageCountAggregateInputType | true
    }
  >

  export interface ChatMessageDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one ChatMessage that matches the filter.
     * @param {ChatMessageFindUniqueArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ChatMessageFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ChatMessageFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ChatMessage'> extends True ? CheckSelect<T, Prisma__ChatMessageClient<ChatMessage>, Prisma__ChatMessageClient<ChatMessageGetPayload<T>>> : CheckSelect<T, Prisma__ChatMessageClient<ChatMessage | null >, Prisma__ChatMessageClient<ChatMessageGetPayload<T> | null >>

    /**
     * Find the first ChatMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindFirstArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ChatMessageFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ChatMessageFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ChatMessage'> extends True ? CheckSelect<T, Prisma__ChatMessageClient<ChatMessage>, Prisma__ChatMessageClient<ChatMessageGetPayload<T>>> : CheckSelect<T, Prisma__ChatMessageClient<ChatMessage | null >, Prisma__ChatMessageClient<ChatMessageGetPayload<T> | null >>

    /**
     * Find zero or more ChatMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatMessages
     * const chatMessages = await prisma.chatMessage.findMany()
     * 
     * // Get first 10 ChatMessages
     * const chatMessages = await prisma.chatMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatMessageWithIdOnly = await prisma.chatMessage.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ChatMessageFindManyArgs>(
      args?: SelectSubset<T, ChatMessageFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ChatMessage>>, PrismaPromise<Array<ChatMessageGetPayload<T>>>>

    /**
     * Create a ChatMessage.
     * @param {ChatMessageCreateArgs} args - Arguments to create a ChatMessage.
     * @example
     * // Create one ChatMessage
     * const ChatMessage = await prisma.chatMessage.create({
     *   data: {
     *     // ... data to create a ChatMessage
     *   }
     * })
     * 
    **/
    create<T extends ChatMessageCreateArgs>(
      args: SelectSubset<T, ChatMessageCreateArgs>
    ): CheckSelect<T, Prisma__ChatMessageClient<ChatMessage>, Prisma__ChatMessageClient<ChatMessageGetPayload<T>>>

    /**
     * Create many ChatMessages.
     *     @param {ChatMessageCreateManyArgs} args - Arguments to create many ChatMessages.
     *     @example
     *     // Create many ChatMessages
     *     const chatMessage = await prisma.chatMessage.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ChatMessageCreateManyArgs>(
      args?: SelectSubset<T, ChatMessageCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ChatMessage.
     * @param {ChatMessageDeleteArgs} args - Arguments to delete one ChatMessage.
     * @example
     * // Delete one ChatMessage
     * const ChatMessage = await prisma.chatMessage.delete({
     *   where: {
     *     // ... filter to delete one ChatMessage
     *   }
     * })
     * 
    **/
    delete<T extends ChatMessageDeleteArgs>(
      args: SelectSubset<T, ChatMessageDeleteArgs>
    ): CheckSelect<T, Prisma__ChatMessageClient<ChatMessage>, Prisma__ChatMessageClient<ChatMessageGetPayload<T>>>

    /**
     * Update one ChatMessage.
     * @param {ChatMessageUpdateArgs} args - Arguments to update one ChatMessage.
     * @example
     * // Update one ChatMessage
     * const chatMessage = await prisma.chatMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ChatMessageUpdateArgs>(
      args: SelectSubset<T, ChatMessageUpdateArgs>
    ): CheckSelect<T, Prisma__ChatMessageClient<ChatMessage>, Prisma__ChatMessageClient<ChatMessageGetPayload<T>>>

    /**
     * Delete zero or more ChatMessages.
     * @param {ChatMessageDeleteManyArgs} args - Arguments to filter ChatMessages to delete.
     * @example
     * // Delete a few ChatMessages
     * const { count } = await prisma.chatMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ChatMessageDeleteManyArgs>(
      args?: SelectSubset<T, ChatMessageDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatMessages
     * const chatMessage = await prisma.chatMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ChatMessageUpdateManyArgs>(
      args: SelectSubset<T, ChatMessageUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ChatMessage.
     * @param {ChatMessageUpsertArgs} args - Arguments to update or create a ChatMessage.
     * @example
     * // Update or create a ChatMessage
     * const chatMessage = await prisma.chatMessage.upsert({
     *   create: {
     *     // ... data to create a ChatMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatMessage we want to update
     *   }
     * })
    **/
    upsert<T extends ChatMessageUpsertArgs>(
      args: SelectSubset<T, ChatMessageUpsertArgs>
    ): CheckSelect<T, Prisma__ChatMessageClient<ChatMessage>, Prisma__ChatMessageClient<ChatMessageGetPayload<T>>>

    /**
     * Count the number of ChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageCountArgs} args - Arguments to filter ChatMessages to count.
     * @example
     * // Count the number of ChatMessages
     * const count = await prisma.chatMessage.count({
     *   where: {
     *     // ... the filter for the ChatMessages we want to count
     *   }
     * })
    **/
    count<T extends ChatMessageCountArgs>(
      args?: Subset<T, ChatMessageCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatMessageAggregateArgs>(args: Subset<T, ChatMessageAggregateArgs>): PrismaPromise<GetChatMessageAggregateType<T>>

    /**
     * Group by ChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatMessageGroupByArgs['orderBy'] }
        : { orderBy?: ChatMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatMessageGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ChatMessageClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    tags<T extends TagFindManyArgs = {}>(args?: Subset<T, TagFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Tag>>, PrismaPromise<Array<TagGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * ChatMessage findUnique
   */
  export type ChatMessageFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the ChatMessage
     * 
    **/
    select?: ChatMessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ChatMessageInclude | null
    /**
     * Throw an Error if a ChatMessage can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ChatMessage to fetch.
     * 
    **/
    where: ChatMessageWhereUniqueInput
  }


  /**
   * ChatMessage findFirst
   */
  export type ChatMessageFindFirstArgs = {
    /**
     * Select specific fields to fetch from the ChatMessage
     * 
    **/
    select?: ChatMessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ChatMessageInclude | null
    /**
     * Throw an Error if a ChatMessage can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ChatMessage to fetch.
     * 
    **/
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     * 
    **/
    orderBy?: Enumerable<ChatMessageOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMessages.
     * 
    **/
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMessages.
     * 
    **/
    distinct?: Enumerable<ChatMessageScalarFieldEnum>
  }


  /**
   * ChatMessage findMany
   */
  export type ChatMessageFindManyArgs = {
    /**
     * Select specific fields to fetch from the ChatMessage
     * 
    **/
    select?: ChatMessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ChatMessageInclude | null
    /**
     * Filter, which ChatMessages to fetch.
     * 
    **/
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     * 
    **/
    orderBy?: Enumerable<ChatMessageOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatMessages.
     * 
    **/
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ChatMessageScalarFieldEnum>
  }


  /**
   * ChatMessage create
   */
  export type ChatMessageCreateArgs = {
    /**
     * Select specific fields to fetch from the ChatMessage
     * 
    **/
    select?: ChatMessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ChatMessageInclude | null
    /**
     * The data needed to create a ChatMessage.
     * 
    **/
    data: XOR<ChatMessageCreateInput, ChatMessageUncheckedCreateInput>
  }


  /**
   * ChatMessage createMany
   */
  export type ChatMessageCreateManyArgs = {
    data: Enumerable<ChatMessageCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ChatMessage update
   */
  export type ChatMessageUpdateArgs = {
    /**
     * Select specific fields to fetch from the ChatMessage
     * 
    **/
    select?: ChatMessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ChatMessageInclude | null
    /**
     * The data needed to update a ChatMessage.
     * 
    **/
    data: XOR<ChatMessageUpdateInput, ChatMessageUncheckedUpdateInput>
    /**
     * Choose, which ChatMessage to update.
     * 
    **/
    where: ChatMessageWhereUniqueInput
  }


  /**
   * ChatMessage updateMany
   */
  export type ChatMessageUpdateManyArgs = {
    data: XOR<ChatMessageUpdateManyMutationInput, ChatMessageUncheckedUpdateManyInput>
    where?: ChatMessageWhereInput
  }


  /**
   * ChatMessage upsert
   */
  export type ChatMessageUpsertArgs = {
    /**
     * Select specific fields to fetch from the ChatMessage
     * 
    **/
    select?: ChatMessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ChatMessageInclude | null
    /**
     * The filter to search for the ChatMessage to update in case it exists.
     * 
    **/
    where: ChatMessageWhereUniqueInput
    /**
     * In case the ChatMessage found by the `where` argument doesn't exist, create a new ChatMessage with this data.
     * 
    **/
    create: XOR<ChatMessageCreateInput, ChatMessageUncheckedCreateInput>
    /**
     * In case the ChatMessage was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ChatMessageUpdateInput, ChatMessageUncheckedUpdateInput>
  }


  /**
   * ChatMessage delete
   */
  export type ChatMessageDeleteArgs = {
    /**
     * Select specific fields to fetch from the ChatMessage
     * 
    **/
    select?: ChatMessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ChatMessageInclude | null
    /**
     * Filter which ChatMessage to delete.
     * 
    **/
    where: ChatMessageWhereUniqueInput
  }


  /**
   * ChatMessage deleteMany
   */
  export type ChatMessageDeleteManyArgs = {
    where?: ChatMessageWhereInput
  }


  /**
   * ChatMessage without action
   */
  export type ChatMessageArgs = {
    /**
     * Select specific fields to fetch from the ChatMessage
     * 
    **/
    select?: ChatMessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ChatMessageInclude | null
  }



  /**
   * Model DelegatedChallenges
   */


  export type AggregateDelegatedChallenges = {
    _count: DelegatedChallengesCountAggregateOutputType | null
    count: DelegatedChallengesCountAggregateOutputType | null
    _avg: DelegatedChallengesAvgAggregateOutputType | null
    avg: DelegatedChallengesAvgAggregateOutputType | null
    _sum: DelegatedChallengesSumAggregateOutputType | null
    sum: DelegatedChallengesSumAggregateOutputType | null
    _min: DelegatedChallengesMinAggregateOutputType | null
    min: DelegatedChallengesMinAggregateOutputType | null
    _max: DelegatedChallengesMaxAggregateOutputType | null
    max: DelegatedChallengesMaxAggregateOutputType | null
  }

  export type DelegatedChallengesAvgAggregateOutputType = {
    id: number | null
  }

  export type DelegatedChallengesSumAggregateOutputType = {
    id: number | null
  }

  export type DelegatedChallengesMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    appId: string | null
    sessionId: string | null
    requestValidTo: Date | null
    delegateAuthCode: string | null
    challenge: string | null
    challengeDepositedAt: Date | null
    challengeValidTo: Date | null
    challengedReadAt: Date | null
  }

  export type DelegatedChallengesMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    appId: string | null
    sessionId: string | null
    requestValidTo: Date | null
    delegateAuthCode: string | null
    challenge: string | null
    challengeDepositedAt: Date | null
    challengeValidTo: Date | null
    challengedReadAt: Date | null
  }

  export type DelegatedChallengesCountAggregateOutputType = {
    id: number
    createdAt: number
    appId: number
    sessionId: number
    requestValidTo: number
    delegateAuthCode: number
    challenge: number
    challengeDepositedAt: number
    challengeValidTo: number
    challengedReadAt: number
    _all: number
  }


  export type DelegatedChallengesAvgAggregateInputType = {
    id?: true
  }

  export type DelegatedChallengesSumAggregateInputType = {
    id?: true
  }

  export type DelegatedChallengesMinAggregateInputType = {
    id?: true
    createdAt?: true
    appId?: true
    sessionId?: true
    requestValidTo?: true
    delegateAuthCode?: true
    challenge?: true
    challengeDepositedAt?: true
    challengeValidTo?: true
    challengedReadAt?: true
  }

  export type DelegatedChallengesMaxAggregateInputType = {
    id?: true
    createdAt?: true
    appId?: true
    sessionId?: true
    requestValidTo?: true
    delegateAuthCode?: true
    challenge?: true
    challengeDepositedAt?: true
    challengeValidTo?: true
    challengedReadAt?: true
  }

  export type DelegatedChallengesCountAggregateInputType = {
    id?: true
    createdAt?: true
    appId?: true
    sessionId?: true
    requestValidTo?: true
    delegateAuthCode?: true
    challenge?: true
    challengeDepositedAt?: true
    challengeValidTo?: true
    challengedReadAt?: true
    _all?: true
  }

  export type DelegatedChallengesAggregateArgs = {
    /**
     * Filter which DelegatedChallenges to aggregate.
     * 
    **/
    where?: DelegatedChallengesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DelegatedChallenges to fetch.
     * 
    **/
    orderBy?: Enumerable<DelegatedChallengesOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DelegatedChallengesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DelegatedChallenges from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DelegatedChallenges.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DelegatedChallenges
    **/
    _count?: true | DelegatedChallengesCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | DelegatedChallengesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DelegatedChallengesAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: DelegatedChallengesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DelegatedChallengesSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: DelegatedChallengesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DelegatedChallengesMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: DelegatedChallengesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DelegatedChallengesMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: DelegatedChallengesMaxAggregateInputType
  }

  export type GetDelegatedChallengesAggregateType<T extends DelegatedChallengesAggregateArgs> = {
        [P in keyof T & keyof AggregateDelegatedChallenges]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDelegatedChallenges[P]>
      : GetScalarType<T[P], AggregateDelegatedChallenges[P]>
  }


    
    
  export type DelegatedChallengesGroupByArgs = {
    where?: DelegatedChallengesWhereInput
    orderBy?: Enumerable<DelegatedChallengesOrderByInput>
    by: Array<DelegatedChallengesScalarFieldEnum>
    having?: DelegatedChallengesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DelegatedChallengesCountAggregateInputType | true
    _avg?: DelegatedChallengesAvgAggregateInputType
    _sum?: DelegatedChallengesSumAggregateInputType
    _min?: DelegatedChallengesMinAggregateInputType
    _max?: DelegatedChallengesMaxAggregateInputType
  }


  export type DelegatedChallengesGroupByOutputType = {
    id: number
    createdAt: Date
    appId: string
    sessionId: string
    requestValidTo: Date
    delegateAuthCode: string
    challenge: string | null
    challengeDepositedAt: Date | null
    challengeValidTo: Date | null
    challengedReadAt: Date | null
    _count: DelegatedChallengesCountAggregateOutputType | null
    _avg: DelegatedChallengesAvgAggregateOutputType | null
    _sum: DelegatedChallengesSumAggregateOutputType | null
    _min: DelegatedChallengesMinAggregateOutputType | null
    _max: DelegatedChallengesMaxAggregateOutputType | null
  }

  type GetDelegatedChallengesGroupByPayload<T extends DelegatedChallengesGroupByArgs> = Promise<
    Array<
      PickArray<DelegatedChallengesGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof DelegatedChallengesGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], DelegatedChallengesGroupByOutputType[P]> 
            : GetScalarType<T[P], DelegatedChallengesGroupByOutputType[P]>
        }
      > 
    >


  export type DelegatedChallengesSelect = {
    id?: boolean
    createdAt?: boolean
    appId?: boolean
    sessionId?: boolean
    requestValidTo?: boolean
    delegateAuthCode?: boolean
    challenge?: boolean
    challengeDepositedAt?: boolean
    challengeValidTo?: boolean
    challengedReadAt?: boolean
  }

  export type DelegatedChallengesGetPayload<
    S extends boolean | null | undefined | DelegatedChallengesArgs,
    U = keyof S
      > = S extends true
        ? DelegatedChallenges
    : S extends undefined
    ? never
    : S extends DelegatedChallengesArgs | DelegatedChallengesFindManyArgs
    ?'include' extends U
    ? DelegatedChallenges 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof DelegatedChallenges ?DelegatedChallenges [P]
  : 
     never
  } 
    : DelegatedChallenges
  : DelegatedChallenges


  type DelegatedChallengesCountArgs = Merge<
    Omit<DelegatedChallengesFindManyArgs, 'select' | 'include'> & {
      select?: DelegatedChallengesCountAggregateInputType | true
    }
  >

  export interface DelegatedChallengesDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one DelegatedChallenges that matches the filter.
     * @param {DelegatedChallengesFindUniqueArgs} args - Arguments to find a DelegatedChallenges
     * @example
     * // Get one DelegatedChallenges
     * const delegatedChallenges = await prisma.delegatedChallenges.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DelegatedChallengesFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DelegatedChallengesFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'DelegatedChallenges'> extends True ? CheckSelect<T, Prisma__DelegatedChallengesClient<DelegatedChallenges>, Prisma__DelegatedChallengesClient<DelegatedChallengesGetPayload<T>>> : CheckSelect<T, Prisma__DelegatedChallengesClient<DelegatedChallenges | null >, Prisma__DelegatedChallengesClient<DelegatedChallengesGetPayload<T> | null >>

    /**
     * Find the first DelegatedChallenges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegatedChallengesFindFirstArgs} args - Arguments to find a DelegatedChallenges
     * @example
     * // Get one DelegatedChallenges
     * const delegatedChallenges = await prisma.delegatedChallenges.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DelegatedChallengesFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DelegatedChallengesFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'DelegatedChallenges'> extends True ? CheckSelect<T, Prisma__DelegatedChallengesClient<DelegatedChallenges>, Prisma__DelegatedChallengesClient<DelegatedChallengesGetPayload<T>>> : CheckSelect<T, Prisma__DelegatedChallengesClient<DelegatedChallenges | null >, Prisma__DelegatedChallengesClient<DelegatedChallengesGetPayload<T> | null >>

    /**
     * Find zero or more DelegatedChallenges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegatedChallengesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DelegatedChallenges
     * const delegatedChallenges = await prisma.delegatedChallenges.findMany()
     * 
     * // Get first 10 DelegatedChallenges
     * const delegatedChallenges = await prisma.delegatedChallenges.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const delegatedChallengesWithIdOnly = await prisma.delegatedChallenges.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DelegatedChallengesFindManyArgs>(
      args?: SelectSubset<T, DelegatedChallengesFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<DelegatedChallenges>>, PrismaPromise<Array<DelegatedChallengesGetPayload<T>>>>

    /**
     * Create a DelegatedChallenges.
     * @param {DelegatedChallengesCreateArgs} args - Arguments to create a DelegatedChallenges.
     * @example
     * // Create one DelegatedChallenges
     * const DelegatedChallenges = await prisma.delegatedChallenges.create({
     *   data: {
     *     // ... data to create a DelegatedChallenges
     *   }
     * })
     * 
    **/
    create<T extends DelegatedChallengesCreateArgs>(
      args: SelectSubset<T, DelegatedChallengesCreateArgs>
    ): CheckSelect<T, Prisma__DelegatedChallengesClient<DelegatedChallenges>, Prisma__DelegatedChallengesClient<DelegatedChallengesGetPayload<T>>>

    /**
     * Create many DelegatedChallenges.
     *     @param {DelegatedChallengesCreateManyArgs} args - Arguments to create many DelegatedChallenges.
     *     @example
     *     // Create many DelegatedChallenges
     *     const delegatedChallenges = await prisma.delegatedChallenges.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DelegatedChallengesCreateManyArgs>(
      args?: SelectSubset<T, DelegatedChallengesCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a DelegatedChallenges.
     * @param {DelegatedChallengesDeleteArgs} args - Arguments to delete one DelegatedChallenges.
     * @example
     * // Delete one DelegatedChallenges
     * const DelegatedChallenges = await prisma.delegatedChallenges.delete({
     *   where: {
     *     // ... filter to delete one DelegatedChallenges
     *   }
     * })
     * 
    **/
    delete<T extends DelegatedChallengesDeleteArgs>(
      args: SelectSubset<T, DelegatedChallengesDeleteArgs>
    ): CheckSelect<T, Prisma__DelegatedChallengesClient<DelegatedChallenges>, Prisma__DelegatedChallengesClient<DelegatedChallengesGetPayload<T>>>

    /**
     * Update one DelegatedChallenges.
     * @param {DelegatedChallengesUpdateArgs} args - Arguments to update one DelegatedChallenges.
     * @example
     * // Update one DelegatedChallenges
     * const delegatedChallenges = await prisma.delegatedChallenges.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DelegatedChallengesUpdateArgs>(
      args: SelectSubset<T, DelegatedChallengesUpdateArgs>
    ): CheckSelect<T, Prisma__DelegatedChallengesClient<DelegatedChallenges>, Prisma__DelegatedChallengesClient<DelegatedChallengesGetPayload<T>>>

    /**
     * Delete zero or more DelegatedChallenges.
     * @param {DelegatedChallengesDeleteManyArgs} args - Arguments to filter DelegatedChallenges to delete.
     * @example
     * // Delete a few DelegatedChallenges
     * const { count } = await prisma.delegatedChallenges.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DelegatedChallengesDeleteManyArgs>(
      args?: SelectSubset<T, DelegatedChallengesDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more DelegatedChallenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegatedChallengesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DelegatedChallenges
     * const delegatedChallenges = await prisma.delegatedChallenges.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DelegatedChallengesUpdateManyArgs>(
      args: SelectSubset<T, DelegatedChallengesUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one DelegatedChallenges.
     * @param {DelegatedChallengesUpsertArgs} args - Arguments to update or create a DelegatedChallenges.
     * @example
     * // Update or create a DelegatedChallenges
     * const delegatedChallenges = await prisma.delegatedChallenges.upsert({
     *   create: {
     *     // ... data to create a DelegatedChallenges
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DelegatedChallenges we want to update
     *   }
     * })
    **/
    upsert<T extends DelegatedChallengesUpsertArgs>(
      args: SelectSubset<T, DelegatedChallengesUpsertArgs>
    ): CheckSelect<T, Prisma__DelegatedChallengesClient<DelegatedChallenges>, Prisma__DelegatedChallengesClient<DelegatedChallengesGetPayload<T>>>

    /**
     * Count the number of DelegatedChallenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegatedChallengesCountArgs} args - Arguments to filter DelegatedChallenges to count.
     * @example
     * // Count the number of DelegatedChallenges
     * const count = await prisma.delegatedChallenges.count({
     *   where: {
     *     // ... the filter for the DelegatedChallenges we want to count
     *   }
     * })
    **/
    count<T extends DelegatedChallengesCountArgs>(
      args?: Subset<T, DelegatedChallengesCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DelegatedChallengesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DelegatedChallenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegatedChallengesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DelegatedChallengesAggregateArgs>(args: Subset<T, DelegatedChallengesAggregateArgs>): PrismaPromise<GetDelegatedChallengesAggregateType<T>>

    /**
     * Group by DelegatedChallenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegatedChallengesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DelegatedChallengesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DelegatedChallengesGroupByArgs['orderBy'] }
        : { orderBy?: DelegatedChallengesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DelegatedChallengesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDelegatedChallengesGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for DelegatedChallenges.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DelegatedChallengesClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * DelegatedChallenges findUnique
   */
  export type DelegatedChallengesFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the DelegatedChallenges
     * 
    **/
    select?: DelegatedChallengesSelect | null
    /**
     * Throw an Error if a DelegatedChallenges can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which DelegatedChallenges to fetch.
     * 
    **/
    where: DelegatedChallengesWhereUniqueInput
  }


  /**
   * DelegatedChallenges findFirst
   */
  export type DelegatedChallengesFindFirstArgs = {
    /**
     * Select specific fields to fetch from the DelegatedChallenges
     * 
    **/
    select?: DelegatedChallengesSelect | null
    /**
     * Throw an Error if a DelegatedChallenges can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which DelegatedChallenges to fetch.
     * 
    **/
    where?: DelegatedChallengesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DelegatedChallenges to fetch.
     * 
    **/
    orderBy?: Enumerable<DelegatedChallengesOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DelegatedChallenges.
     * 
    **/
    cursor?: DelegatedChallengesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DelegatedChallenges from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DelegatedChallenges.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DelegatedChallenges.
     * 
    **/
    distinct?: Enumerable<DelegatedChallengesScalarFieldEnum>
  }


  /**
   * DelegatedChallenges findMany
   */
  export type DelegatedChallengesFindManyArgs = {
    /**
     * Select specific fields to fetch from the DelegatedChallenges
     * 
    **/
    select?: DelegatedChallengesSelect | null
    /**
     * Filter, which DelegatedChallenges to fetch.
     * 
    **/
    where?: DelegatedChallengesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DelegatedChallenges to fetch.
     * 
    **/
    orderBy?: Enumerable<DelegatedChallengesOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DelegatedChallenges.
     * 
    **/
    cursor?: DelegatedChallengesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DelegatedChallenges from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DelegatedChallenges.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DelegatedChallengesScalarFieldEnum>
  }


  /**
   * DelegatedChallenges create
   */
  export type DelegatedChallengesCreateArgs = {
    /**
     * Select specific fields to fetch from the DelegatedChallenges
     * 
    **/
    select?: DelegatedChallengesSelect | null
    /**
     * The data needed to create a DelegatedChallenges.
     * 
    **/
    data: XOR<DelegatedChallengesCreateInput, DelegatedChallengesUncheckedCreateInput>
  }


  /**
   * DelegatedChallenges createMany
   */
  export type DelegatedChallengesCreateManyArgs = {
    data: Enumerable<DelegatedChallengesCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * DelegatedChallenges update
   */
  export type DelegatedChallengesUpdateArgs = {
    /**
     * Select specific fields to fetch from the DelegatedChallenges
     * 
    **/
    select?: DelegatedChallengesSelect | null
    /**
     * The data needed to update a DelegatedChallenges.
     * 
    **/
    data: XOR<DelegatedChallengesUpdateInput, DelegatedChallengesUncheckedUpdateInput>
    /**
     * Choose, which DelegatedChallenges to update.
     * 
    **/
    where: DelegatedChallengesWhereUniqueInput
  }


  /**
   * DelegatedChallenges updateMany
   */
  export type DelegatedChallengesUpdateManyArgs = {
    data: XOR<DelegatedChallengesUpdateManyMutationInput, DelegatedChallengesUncheckedUpdateManyInput>
    where?: DelegatedChallengesWhereInput
  }


  /**
   * DelegatedChallenges upsert
   */
  export type DelegatedChallengesUpsertArgs = {
    /**
     * Select specific fields to fetch from the DelegatedChallenges
     * 
    **/
    select?: DelegatedChallengesSelect | null
    /**
     * The filter to search for the DelegatedChallenges to update in case it exists.
     * 
    **/
    where: DelegatedChallengesWhereUniqueInput
    /**
     * In case the DelegatedChallenges found by the `where` argument doesn't exist, create a new DelegatedChallenges with this data.
     * 
    **/
    create: XOR<DelegatedChallengesCreateInput, DelegatedChallengesUncheckedCreateInput>
    /**
     * In case the DelegatedChallenges was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DelegatedChallengesUpdateInput, DelegatedChallengesUncheckedUpdateInput>
  }


  /**
   * DelegatedChallenges delete
   */
  export type DelegatedChallengesDeleteArgs = {
    /**
     * Select specific fields to fetch from the DelegatedChallenges
     * 
    **/
    select?: DelegatedChallengesSelect | null
    /**
     * Filter which DelegatedChallenges to delete.
     * 
    **/
    where: DelegatedChallengesWhereUniqueInput
  }


  /**
   * DelegatedChallenges deleteMany
   */
  export type DelegatedChallengesDeleteManyArgs = {
    where?: DelegatedChallengesWhereInput
  }


  /**
   * DelegatedChallenges without action
   */
  export type DelegatedChallengesArgs = {
    /**
     * Select specific fields to fetch from the DelegatedChallenges
     * 
    **/
    select?: DelegatedChallengesSelect | null
  }



  /**
   * Model Offer
   */


  export type AggregateOffer = {
    _count: OfferCountAggregateOutputType | null
    count: OfferCountAggregateOutputType | null
    _avg: OfferAvgAggregateOutputType | null
    avg: OfferAvgAggregateOutputType | null
    _sum: OfferSumAggregateOutputType | null
    sum: OfferSumAggregateOutputType | null
    _min: OfferMinAggregateOutputType | null
    min: OfferMinAggregateOutputType | null
    _max: OfferMaxAggregateOutputType | null
    max: OfferMaxAggregateOutputType | null
  }

  export type OfferAvgAggregateOutputType = {
    id: number | null
    createdByProfileId: number | null
    categoryTagId: number | null
    geonameid: number | null
    unitTagId: number | null
    maxUnits: number | null
    deliveryTermsTagId: number | null
  }

  export type OfferSumAggregateOutputType = {
    id: number | null
    createdByProfileId: number | null
    categoryTagId: number | null
    geonameid: number | null
    unitTagId: number | null
    maxUnits: number | null
    deliveryTermsTagId: number | null
  }

  export type OfferMinAggregateOutputType = {
    id: number | null
    createdByProfileId: number | null
    publishedAt: Date | null
    unlistedAt: Date | null
    title: string | null
    pictureUrl: string | null
    pictureMimeType: string | null
    description: string | null
    categoryTagId: number | null
    geonameid: number | null
    pricePerUnit: string | null
    unitTagId: number | null
    maxUnits: number | null
    deliveryTermsTagId: number | null
  }

  export type OfferMaxAggregateOutputType = {
    id: number | null
    createdByProfileId: number | null
    publishedAt: Date | null
    unlistedAt: Date | null
    title: string | null
    pictureUrl: string | null
    pictureMimeType: string | null
    description: string | null
    categoryTagId: number | null
    geonameid: number | null
    pricePerUnit: string | null
    unitTagId: number | null
    maxUnits: number | null
    deliveryTermsTagId: number | null
  }

  export type OfferCountAggregateOutputType = {
    id: number
    createdByProfileId: number
    publishedAt: number
    unlistedAt: number
    title: number
    pictureUrl: number
    pictureMimeType: number
    description: number
    categoryTagId: number
    geonameid: number
    pricePerUnit: number
    unitTagId: number
    maxUnits: number
    deliveryTermsTagId: number
    _all: number
  }


  export type OfferAvgAggregateInputType = {
    id?: true
    createdByProfileId?: true
    categoryTagId?: true
    geonameid?: true
    unitTagId?: true
    maxUnits?: true
    deliveryTermsTagId?: true
  }

  export type OfferSumAggregateInputType = {
    id?: true
    createdByProfileId?: true
    categoryTagId?: true
    geonameid?: true
    unitTagId?: true
    maxUnits?: true
    deliveryTermsTagId?: true
  }

  export type OfferMinAggregateInputType = {
    id?: true
    createdByProfileId?: true
    publishedAt?: true
    unlistedAt?: true
    title?: true
    pictureUrl?: true
    pictureMimeType?: true
    description?: true
    categoryTagId?: true
    geonameid?: true
    pricePerUnit?: true
    unitTagId?: true
    maxUnits?: true
    deliveryTermsTagId?: true
  }

  export type OfferMaxAggregateInputType = {
    id?: true
    createdByProfileId?: true
    publishedAt?: true
    unlistedAt?: true
    title?: true
    pictureUrl?: true
    pictureMimeType?: true
    description?: true
    categoryTagId?: true
    geonameid?: true
    pricePerUnit?: true
    unitTagId?: true
    maxUnits?: true
    deliveryTermsTagId?: true
  }

  export type OfferCountAggregateInputType = {
    id?: true
    createdByProfileId?: true
    publishedAt?: true
    unlistedAt?: true
    title?: true
    pictureUrl?: true
    pictureMimeType?: true
    description?: true
    categoryTagId?: true
    geonameid?: true
    pricePerUnit?: true
    unitTagId?: true
    maxUnits?: true
    deliveryTermsTagId?: true
    _all?: true
  }

  export type OfferAggregateArgs = {
    /**
     * Filter which Offer to aggregate.
     * 
    **/
    where?: OfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offers to fetch.
     * 
    **/
    orderBy?: Enumerable<OfferOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: OfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Offers
    **/
    _count?: true | OfferCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | OfferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OfferAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: OfferAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OfferSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: OfferSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OfferMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: OfferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OfferMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: OfferMaxAggregateInputType
  }

  export type GetOfferAggregateType<T extends OfferAggregateArgs> = {
        [P in keyof T & keyof AggregateOffer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOffer[P]>
      : GetScalarType<T[P], AggregateOffer[P]>
  }


    
    
  export type OfferGroupByArgs = {
    where?: OfferWhereInput
    orderBy?: Enumerable<OfferOrderByInput>
    by: Array<OfferScalarFieldEnum>
    having?: OfferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OfferCountAggregateInputType | true
    _avg?: OfferAvgAggregateInputType
    _sum?: OfferSumAggregateInputType
    _min?: OfferMinAggregateInputType
    _max?: OfferMaxAggregateInputType
  }


  export type OfferGroupByOutputType = {
    id: number
    createdByProfileId: number
    publishedAt: Date
    unlistedAt: Date | null
    title: string
    pictureUrl: string | null
    pictureMimeType: string | null
    description: string | null
    categoryTagId: number
    geonameid: number
    pricePerUnit: string
    unitTagId: number
    maxUnits: number | null
    deliveryTermsTagId: number
    _count: OfferCountAggregateOutputType | null
    _avg: OfferAvgAggregateOutputType | null
    _sum: OfferSumAggregateOutputType | null
    _min: OfferMinAggregateOutputType | null
    _max: OfferMaxAggregateOutputType | null
  }

  type GetOfferGroupByPayload<T extends OfferGroupByArgs> = Promise<
    Array<
      PickArray<OfferGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof OfferGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], OfferGroupByOutputType[P]> 
            : GetScalarType<T[P], OfferGroupByOutputType[P]>
        }
      > 
    >


  export type OfferSelect = {
    id?: boolean
    createdBy?: boolean | ProfileArgs
    createdByProfileId?: boolean
    publishedAt?: boolean
    unlistedAt?: boolean
    purchases?: boolean | PurchaseFindManyArgs
    title?: boolean
    pictureUrl?: boolean
    pictureMimeType?: boolean
    description?: boolean
    categoryTag?: boolean | TagArgs
    categoryTagId?: boolean
    geonameid?: boolean
    pricePerUnit?: boolean
    unitTag?: boolean | TagArgs
    unitTagId?: boolean
    maxUnits?: boolean
    deliveryTermsTag?: boolean | TagArgs
    deliveryTermsTagId?: boolean
    subscribers?: boolean | SubscriptionFindManyArgs
  }

  export type OfferInclude = {
    createdBy?: boolean | ProfileArgs
    purchases?: boolean | PurchaseFindManyArgs
    categoryTag?: boolean | TagArgs
    unitTag?: boolean | TagArgs
    deliveryTermsTag?: boolean | TagArgs
    subscribers?: boolean | SubscriptionFindManyArgs
  }

  export type OfferGetPayload<
    S extends boolean | null | undefined | OfferArgs,
    U = keyof S
      > = S extends true
        ? Offer
    : S extends undefined
    ? never
    : S extends OfferArgs | OfferFindManyArgs
    ?'include' extends U
    ? Offer  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'createdBy'
        ? ProfileGetPayload<S['include'][P]> :
        P extends 'purchases'
        ? Array < PurchaseGetPayload<S['include'][P]>>  :
        P extends 'categoryTag'
        ? TagGetPayload<S['include'][P]> :
        P extends 'unitTag'
        ? TagGetPayload<S['include'][P]> :
        P extends 'deliveryTermsTag'
        ? TagGetPayload<S['include'][P]> :
        P extends 'subscribers'
        ? Array < SubscriptionGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Offer ?Offer [P]
  : 
          P extends 'createdBy'
        ? ProfileGetPayload<S['select'][P]> :
        P extends 'purchases'
        ? Array < PurchaseGetPayload<S['select'][P]>>  :
        P extends 'categoryTag'
        ? TagGetPayload<S['select'][P]> :
        P extends 'unitTag'
        ? TagGetPayload<S['select'][P]> :
        P extends 'deliveryTermsTag'
        ? TagGetPayload<S['select'][P]> :
        P extends 'subscribers'
        ? Array < SubscriptionGetPayload<S['select'][P]>>  : never
  } 
    : Offer
  : Offer


  type OfferCountArgs = Merge<
    Omit<OfferFindManyArgs, 'select' | 'include'> & {
      select?: OfferCountAggregateInputType | true
    }
  >

  export interface OfferDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Offer that matches the filter.
     * @param {OfferFindUniqueArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends OfferFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, OfferFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Offer'> extends True ? CheckSelect<T, Prisma__OfferClient<Offer>, Prisma__OfferClient<OfferGetPayload<T>>> : CheckSelect<T, Prisma__OfferClient<Offer | null >, Prisma__OfferClient<OfferGetPayload<T> | null >>

    /**
     * Find the first Offer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferFindFirstArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends OfferFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, OfferFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Offer'> extends True ? CheckSelect<T, Prisma__OfferClient<Offer>, Prisma__OfferClient<OfferGetPayload<T>>> : CheckSelect<T, Prisma__OfferClient<Offer | null >, Prisma__OfferClient<OfferGetPayload<T> | null >>

    /**
     * Find zero or more Offers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Offers
     * const offers = await prisma.offer.findMany()
     * 
     * // Get first 10 Offers
     * const offers = await prisma.offer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const offerWithIdOnly = await prisma.offer.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends OfferFindManyArgs>(
      args?: SelectSubset<T, OfferFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Offer>>, PrismaPromise<Array<OfferGetPayload<T>>>>

    /**
     * Create a Offer.
     * @param {OfferCreateArgs} args - Arguments to create a Offer.
     * @example
     * // Create one Offer
     * const Offer = await prisma.offer.create({
     *   data: {
     *     // ... data to create a Offer
     *   }
     * })
     * 
    **/
    create<T extends OfferCreateArgs>(
      args: SelectSubset<T, OfferCreateArgs>
    ): CheckSelect<T, Prisma__OfferClient<Offer>, Prisma__OfferClient<OfferGetPayload<T>>>

    /**
     * Create many Offers.
     *     @param {OfferCreateManyArgs} args - Arguments to create many Offers.
     *     @example
     *     // Create many Offers
     *     const offer = await prisma.offer.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends OfferCreateManyArgs>(
      args?: SelectSubset<T, OfferCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Offer.
     * @param {OfferDeleteArgs} args - Arguments to delete one Offer.
     * @example
     * // Delete one Offer
     * const Offer = await prisma.offer.delete({
     *   where: {
     *     // ... filter to delete one Offer
     *   }
     * })
     * 
    **/
    delete<T extends OfferDeleteArgs>(
      args: SelectSubset<T, OfferDeleteArgs>
    ): CheckSelect<T, Prisma__OfferClient<Offer>, Prisma__OfferClient<OfferGetPayload<T>>>

    /**
     * Update one Offer.
     * @param {OfferUpdateArgs} args - Arguments to update one Offer.
     * @example
     * // Update one Offer
     * const offer = await prisma.offer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends OfferUpdateArgs>(
      args: SelectSubset<T, OfferUpdateArgs>
    ): CheckSelect<T, Prisma__OfferClient<Offer>, Prisma__OfferClient<OfferGetPayload<T>>>

    /**
     * Delete zero or more Offers.
     * @param {OfferDeleteManyArgs} args - Arguments to filter Offers to delete.
     * @example
     * // Delete a few Offers
     * const { count } = await prisma.offer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends OfferDeleteManyArgs>(
      args?: SelectSubset<T, OfferDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Offers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Offers
     * const offer = await prisma.offer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends OfferUpdateManyArgs>(
      args: SelectSubset<T, OfferUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Offer.
     * @param {OfferUpsertArgs} args - Arguments to update or create a Offer.
     * @example
     * // Update or create a Offer
     * const offer = await prisma.offer.upsert({
     *   create: {
     *     // ... data to create a Offer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Offer we want to update
     *   }
     * })
    **/
    upsert<T extends OfferUpsertArgs>(
      args: SelectSubset<T, OfferUpsertArgs>
    ): CheckSelect<T, Prisma__OfferClient<Offer>, Prisma__OfferClient<OfferGetPayload<T>>>

    /**
     * Count the number of Offers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferCountArgs} args - Arguments to filter Offers to count.
     * @example
     * // Count the number of Offers
     * const count = await prisma.offer.count({
     *   where: {
     *     // ... the filter for the Offers we want to count
     *   }
     * })
    **/
    count<T extends OfferCountArgs>(
      args?: Subset<T, OfferCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OfferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Offer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OfferAggregateArgs>(args: Subset<T, OfferAggregateArgs>): PrismaPromise<GetOfferAggregateType<T>>

    /**
     * Group by Offer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OfferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OfferGroupByArgs['orderBy'] }
        : { orderBy?: OfferGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OfferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfferGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Offer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__OfferClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    createdBy<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>;

    purchases<T extends PurchaseFindManyArgs = {}>(args?: Subset<T, PurchaseFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Purchase>>, PrismaPromise<Array<PurchaseGetPayload<T>>>>;

    categoryTag<T extends TagArgs = {}>(args?: Subset<T, TagArgs>): CheckSelect<T, Prisma__TagClient<Tag | null >, Prisma__TagClient<TagGetPayload<T> | null >>;

    unitTag<T extends TagArgs = {}>(args?: Subset<T, TagArgs>): CheckSelect<T, Prisma__TagClient<Tag | null >, Prisma__TagClient<TagGetPayload<T> | null >>;

    deliveryTermsTag<T extends TagArgs = {}>(args?: Subset<T, TagArgs>): CheckSelect<T, Prisma__TagClient<Tag | null >, Prisma__TagClient<TagGetPayload<T> | null >>;

    subscribers<T extends SubscriptionFindManyArgs = {}>(args?: Subset<T, SubscriptionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Subscription>>, PrismaPromise<Array<SubscriptionGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Offer findUnique
   */
  export type OfferFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Offer
     * 
    **/
    select?: OfferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OfferInclude | null
    /**
     * Throw an Error if a Offer can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Offer to fetch.
     * 
    **/
    where: OfferWhereUniqueInput
  }


  /**
   * Offer findFirst
   */
  export type OfferFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Offer
     * 
    **/
    select?: OfferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OfferInclude | null
    /**
     * Throw an Error if a Offer can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Offer to fetch.
     * 
    **/
    where?: OfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offers to fetch.
     * 
    **/
    orderBy?: Enumerable<OfferOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Offers.
     * 
    **/
    cursor?: OfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Offers.
     * 
    **/
    distinct?: Enumerable<OfferScalarFieldEnum>
  }


  /**
   * Offer findMany
   */
  export type OfferFindManyArgs = {
    /**
     * Select specific fields to fetch from the Offer
     * 
    **/
    select?: OfferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OfferInclude | null
    /**
     * Filter, which Offers to fetch.
     * 
    **/
    where?: OfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offers to fetch.
     * 
    **/
    orderBy?: Enumerable<OfferOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Offers.
     * 
    **/
    cursor?: OfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offers.
     * 
    **/
    skip?: number
    distinct?: Enumerable<OfferScalarFieldEnum>
  }


  /**
   * Offer create
   */
  export type OfferCreateArgs = {
    /**
     * Select specific fields to fetch from the Offer
     * 
    **/
    select?: OfferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OfferInclude | null
    /**
     * The data needed to create a Offer.
     * 
    **/
    data: XOR<OfferCreateInput, OfferUncheckedCreateInput>
  }


  /**
   * Offer createMany
   */
  export type OfferCreateManyArgs = {
    data: Enumerable<OfferCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Offer update
   */
  export type OfferUpdateArgs = {
    /**
     * Select specific fields to fetch from the Offer
     * 
    **/
    select?: OfferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OfferInclude | null
    /**
     * The data needed to update a Offer.
     * 
    **/
    data: XOR<OfferUpdateInput, OfferUncheckedUpdateInput>
    /**
     * Choose, which Offer to update.
     * 
    **/
    where: OfferWhereUniqueInput
  }


  /**
   * Offer updateMany
   */
  export type OfferUpdateManyArgs = {
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyInput>
    where?: OfferWhereInput
  }


  /**
   * Offer upsert
   */
  export type OfferUpsertArgs = {
    /**
     * Select specific fields to fetch from the Offer
     * 
    **/
    select?: OfferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OfferInclude | null
    /**
     * The filter to search for the Offer to update in case it exists.
     * 
    **/
    where: OfferWhereUniqueInput
    /**
     * In case the Offer found by the `where` argument doesn't exist, create a new Offer with this data.
     * 
    **/
    create: XOR<OfferCreateInput, OfferUncheckedCreateInput>
    /**
     * In case the Offer was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<OfferUpdateInput, OfferUncheckedUpdateInput>
  }


  /**
   * Offer delete
   */
  export type OfferDeleteArgs = {
    /**
     * Select specific fields to fetch from the Offer
     * 
    **/
    select?: OfferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OfferInclude | null
    /**
     * Filter which Offer to delete.
     * 
    **/
    where: OfferWhereUniqueInput
  }


  /**
   * Offer deleteMany
   */
  export type OfferDeleteManyArgs = {
    where?: OfferWhereInput
  }


  /**
   * Offer without action
   */
  export type OfferArgs = {
    /**
     * Select specific fields to fetch from the Offer
     * 
    **/
    select?: OfferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OfferInclude | null
  }



  /**
   * Model Purchase
   */


  export type AggregatePurchase = {
    _count: PurchaseCountAggregateOutputType | null
    count: PurchaseCountAggregateOutputType | null
    _avg: PurchaseAvgAggregateOutputType | null
    avg: PurchaseAvgAggregateOutputType | null
    _sum: PurchaseSumAggregateOutputType | null
    sum: PurchaseSumAggregateOutputType | null
    _min: PurchaseMinAggregateOutputType | null
    min: PurchaseMinAggregateOutputType | null
    _max: PurchaseMaxAggregateOutputType | null
    max: PurchaseMaxAggregateOutputType | null
  }

  export type PurchaseAvgAggregateOutputType = {
    id: number | null
    purchasedByProfileId: number | null
    purchasedItemId: number | null
    purchasedUnits: number | null
    purchasedItemVat: number | null
  }

  export type PurchaseSumAggregateOutputType = {
    id: number | null
    purchasedByProfileId: number | null
    purchasedItemId: number | null
    purchasedUnits: number | null
    purchasedItemVat: number | null
  }

  export type PurchaseMinAggregateOutputType = {
    id: number | null
    purchasedByProfileId: number | null
    purchasedAt: Date | null
    purchasedProvenAt: Date | null
    purchasedItemId: number | null
    purchasedItemTitle: string | null
    pricePerUnit: string | null
    purchasedUnits: number | null
    grandTotal: string | null
    purchasedItemVat: number | null
    status: PurchaseStatus | null
  }

  export type PurchaseMaxAggregateOutputType = {
    id: number | null
    purchasedByProfileId: number | null
    purchasedAt: Date | null
    purchasedProvenAt: Date | null
    purchasedItemId: number | null
    purchasedItemTitle: string | null
    pricePerUnit: string | null
    purchasedUnits: number | null
    grandTotal: string | null
    purchasedItemVat: number | null
    status: PurchaseStatus | null
  }

  export type PurchaseCountAggregateOutputType = {
    id: number
    purchasedByProfileId: number
    purchasedAt: number
    purchasedProvenAt: number
    purchasedItemId: number
    purchasedItemTitle: number
    pricePerUnit: number
    purchasedUnits: number
    grandTotal: number
    purchasedItemVat: number
    status: number
    _all: number
  }


  export type PurchaseAvgAggregateInputType = {
    id?: true
    purchasedByProfileId?: true
    purchasedItemId?: true
    purchasedUnits?: true
    purchasedItemVat?: true
  }

  export type PurchaseSumAggregateInputType = {
    id?: true
    purchasedByProfileId?: true
    purchasedItemId?: true
    purchasedUnits?: true
    purchasedItemVat?: true
  }

  export type PurchaseMinAggregateInputType = {
    id?: true
    purchasedByProfileId?: true
    purchasedAt?: true
    purchasedProvenAt?: true
    purchasedItemId?: true
    purchasedItemTitle?: true
    pricePerUnit?: true
    purchasedUnits?: true
    grandTotal?: true
    purchasedItemVat?: true
    status?: true
  }

  export type PurchaseMaxAggregateInputType = {
    id?: true
    purchasedByProfileId?: true
    purchasedAt?: true
    purchasedProvenAt?: true
    purchasedItemId?: true
    purchasedItemTitle?: true
    pricePerUnit?: true
    purchasedUnits?: true
    grandTotal?: true
    purchasedItemVat?: true
    status?: true
  }

  export type PurchaseCountAggregateInputType = {
    id?: true
    purchasedByProfileId?: true
    purchasedAt?: true
    purchasedProvenAt?: true
    purchasedItemId?: true
    purchasedItemTitle?: true
    pricePerUnit?: true
    purchasedUnits?: true
    grandTotal?: true
    purchasedItemVat?: true
    status?: true
    _all?: true
  }

  export type PurchaseAggregateArgs = {
    /**
     * Filter which Purchase to aggregate.
     * 
    **/
    where?: PurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purchases to fetch.
     * 
    **/
    orderBy?: Enumerable<PurchaseOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purchases from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purchases.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Purchases
    **/
    _count?: true | PurchaseCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | PurchaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PurchaseAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: PurchaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PurchaseSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: PurchaseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PurchaseMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: PurchaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PurchaseMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: PurchaseMaxAggregateInputType
  }

  export type GetPurchaseAggregateType<T extends PurchaseAggregateArgs> = {
        [P in keyof T & keyof AggregatePurchase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePurchase[P]>
      : GetScalarType<T[P], AggregatePurchase[P]>
  }


    
    
  export type PurchaseGroupByArgs = {
    where?: PurchaseWhereInput
    orderBy?: Enumerable<PurchaseOrderByInput>
    by: Array<PurchaseScalarFieldEnum>
    having?: PurchaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PurchaseCountAggregateInputType | true
    _avg?: PurchaseAvgAggregateInputType
    _sum?: PurchaseSumAggregateInputType
    _min?: PurchaseMinAggregateInputType
    _max?: PurchaseMaxAggregateInputType
  }


  export type PurchaseGroupByOutputType = {
    id: number
    purchasedByProfileId: number
    purchasedAt: Date
    purchasedProvenAt: Date | null
    purchasedItemId: number
    purchasedItemTitle: string
    pricePerUnit: string
    purchasedUnits: number
    grandTotal: string
    purchasedItemVat: number
    status: PurchaseStatus
    _count: PurchaseCountAggregateOutputType | null
    _avg: PurchaseAvgAggregateOutputType | null
    _sum: PurchaseSumAggregateOutputType | null
    _min: PurchaseMinAggregateOutputType | null
    _max: PurchaseMaxAggregateOutputType | null
  }

  type GetPurchaseGroupByPayload<T extends PurchaseGroupByArgs> = Promise<
    Array<
      PickArray<PurchaseGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof PurchaseGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], PurchaseGroupByOutputType[P]> 
            : GetScalarType<T[P], PurchaseGroupByOutputType[P]>
        }
      > 
    >


  export type PurchaseSelect = {
    id?: boolean
    purchasedBy?: boolean | ProfileArgs
    purchasedByProfileId?: boolean
    purchasedAt?: boolean
    purchasedProvenAt?: boolean
    purchasedItem?: boolean | OfferArgs
    purchasedItemId?: boolean
    purchasedItemTitle?: boolean
    pricePerUnit?: boolean
    purchasedUnits?: boolean
    grandTotal?: boolean
    purchasedItemVat?: boolean
    status?: boolean
    jobs?: boolean | TransactionJobsFindManyArgs
  }

  export type PurchaseInclude = {
    purchasedBy?: boolean | ProfileArgs
    purchasedItem?: boolean | OfferArgs
    jobs?: boolean | TransactionJobsFindManyArgs
  }

  export type PurchaseGetPayload<
    S extends boolean | null | undefined | PurchaseArgs,
    U = keyof S
      > = S extends true
        ? Purchase
    : S extends undefined
    ? never
    : S extends PurchaseArgs | PurchaseFindManyArgs
    ?'include' extends U
    ? Purchase  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'purchasedBy'
        ? ProfileGetPayload<S['include'][P]> :
        P extends 'purchasedItem'
        ? OfferGetPayload<S['include'][P]> :
        P extends 'jobs'
        ? Array < TransactionJobsGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Purchase ?Purchase [P]
  : 
          P extends 'purchasedBy'
        ? ProfileGetPayload<S['select'][P]> :
        P extends 'purchasedItem'
        ? OfferGetPayload<S['select'][P]> :
        P extends 'jobs'
        ? Array < TransactionJobsGetPayload<S['select'][P]>>  : never
  } 
    : Purchase
  : Purchase


  type PurchaseCountArgs = Merge<
    Omit<PurchaseFindManyArgs, 'select' | 'include'> & {
      select?: PurchaseCountAggregateInputType | true
    }
  >

  export interface PurchaseDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Purchase that matches the filter.
     * @param {PurchaseFindUniqueArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PurchaseFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PurchaseFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Purchase'> extends True ? CheckSelect<T, Prisma__PurchaseClient<Purchase>, Prisma__PurchaseClient<PurchaseGetPayload<T>>> : CheckSelect<T, Prisma__PurchaseClient<Purchase | null >, Prisma__PurchaseClient<PurchaseGetPayload<T> | null >>

    /**
     * Find the first Purchase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseFindFirstArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PurchaseFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PurchaseFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Purchase'> extends True ? CheckSelect<T, Prisma__PurchaseClient<Purchase>, Prisma__PurchaseClient<PurchaseGetPayload<T>>> : CheckSelect<T, Prisma__PurchaseClient<Purchase | null >, Prisma__PurchaseClient<PurchaseGetPayload<T> | null >>

    /**
     * Find zero or more Purchases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Purchases
     * const purchases = await prisma.purchase.findMany()
     * 
     * // Get first 10 Purchases
     * const purchases = await prisma.purchase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const purchaseWithIdOnly = await prisma.purchase.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PurchaseFindManyArgs>(
      args?: SelectSubset<T, PurchaseFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Purchase>>, PrismaPromise<Array<PurchaseGetPayload<T>>>>

    /**
     * Create a Purchase.
     * @param {PurchaseCreateArgs} args - Arguments to create a Purchase.
     * @example
     * // Create one Purchase
     * const Purchase = await prisma.purchase.create({
     *   data: {
     *     // ... data to create a Purchase
     *   }
     * })
     * 
    **/
    create<T extends PurchaseCreateArgs>(
      args: SelectSubset<T, PurchaseCreateArgs>
    ): CheckSelect<T, Prisma__PurchaseClient<Purchase>, Prisma__PurchaseClient<PurchaseGetPayload<T>>>

    /**
     * Create many Purchases.
     *     @param {PurchaseCreateManyArgs} args - Arguments to create many Purchases.
     *     @example
     *     // Create many Purchases
     *     const purchase = await prisma.purchase.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PurchaseCreateManyArgs>(
      args?: SelectSubset<T, PurchaseCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Purchase.
     * @param {PurchaseDeleteArgs} args - Arguments to delete one Purchase.
     * @example
     * // Delete one Purchase
     * const Purchase = await prisma.purchase.delete({
     *   where: {
     *     // ... filter to delete one Purchase
     *   }
     * })
     * 
    **/
    delete<T extends PurchaseDeleteArgs>(
      args: SelectSubset<T, PurchaseDeleteArgs>
    ): CheckSelect<T, Prisma__PurchaseClient<Purchase>, Prisma__PurchaseClient<PurchaseGetPayload<T>>>

    /**
     * Update one Purchase.
     * @param {PurchaseUpdateArgs} args - Arguments to update one Purchase.
     * @example
     * // Update one Purchase
     * const purchase = await prisma.purchase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PurchaseUpdateArgs>(
      args: SelectSubset<T, PurchaseUpdateArgs>
    ): CheckSelect<T, Prisma__PurchaseClient<Purchase>, Prisma__PurchaseClient<PurchaseGetPayload<T>>>

    /**
     * Delete zero or more Purchases.
     * @param {PurchaseDeleteManyArgs} args - Arguments to filter Purchases to delete.
     * @example
     * // Delete a few Purchases
     * const { count } = await prisma.purchase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PurchaseDeleteManyArgs>(
      args?: SelectSubset<T, PurchaseDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Purchases
     * const purchase = await prisma.purchase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PurchaseUpdateManyArgs>(
      args: SelectSubset<T, PurchaseUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Purchase.
     * @param {PurchaseUpsertArgs} args - Arguments to update or create a Purchase.
     * @example
     * // Update or create a Purchase
     * const purchase = await prisma.purchase.upsert({
     *   create: {
     *     // ... data to create a Purchase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Purchase we want to update
     *   }
     * })
    **/
    upsert<T extends PurchaseUpsertArgs>(
      args: SelectSubset<T, PurchaseUpsertArgs>
    ): CheckSelect<T, Prisma__PurchaseClient<Purchase>, Prisma__PurchaseClient<PurchaseGetPayload<T>>>

    /**
     * Count the number of Purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseCountArgs} args - Arguments to filter Purchases to count.
     * @example
     * // Count the number of Purchases
     * const count = await prisma.purchase.count({
     *   where: {
     *     // ... the filter for the Purchases we want to count
     *   }
     * })
    **/
    count<T extends PurchaseCountArgs>(
      args?: Subset<T, PurchaseCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PurchaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Purchase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PurchaseAggregateArgs>(args: Subset<T, PurchaseAggregateArgs>): PrismaPromise<GetPurchaseAggregateType<T>>

    /**
     * Group by Purchase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PurchaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PurchaseGroupByArgs['orderBy'] }
        : { orderBy?: PurchaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PurchaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchaseGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Purchase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PurchaseClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    purchasedBy<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>;

    purchasedItem<T extends OfferArgs = {}>(args?: Subset<T, OfferArgs>): CheckSelect<T, Prisma__OfferClient<Offer | null >, Prisma__OfferClient<OfferGetPayload<T> | null >>;

    jobs<T extends TransactionJobsFindManyArgs = {}>(args?: Subset<T, TransactionJobsFindManyArgs>): CheckSelect<T, PrismaPromise<Array<TransactionJobs>>, PrismaPromise<Array<TransactionJobsGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Purchase findUnique
   */
  export type PurchaseFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Purchase
     * 
    **/
    select?: PurchaseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PurchaseInclude | null
    /**
     * Throw an Error if a Purchase can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Purchase to fetch.
     * 
    **/
    where: PurchaseWhereUniqueInput
  }


  /**
   * Purchase findFirst
   */
  export type PurchaseFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Purchase
     * 
    **/
    select?: PurchaseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PurchaseInclude | null
    /**
     * Throw an Error if a Purchase can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Purchase to fetch.
     * 
    **/
    where?: PurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purchases to fetch.
     * 
    **/
    orderBy?: Enumerable<PurchaseOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Purchases.
     * 
    **/
    cursor?: PurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purchases from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purchases.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Purchases.
     * 
    **/
    distinct?: Enumerable<PurchaseScalarFieldEnum>
  }


  /**
   * Purchase findMany
   */
  export type PurchaseFindManyArgs = {
    /**
     * Select specific fields to fetch from the Purchase
     * 
    **/
    select?: PurchaseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PurchaseInclude | null
    /**
     * Filter, which Purchases to fetch.
     * 
    **/
    where?: PurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purchases to fetch.
     * 
    **/
    orderBy?: Enumerable<PurchaseOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Purchases.
     * 
    **/
    cursor?: PurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purchases from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purchases.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PurchaseScalarFieldEnum>
  }


  /**
   * Purchase create
   */
  export type PurchaseCreateArgs = {
    /**
     * Select specific fields to fetch from the Purchase
     * 
    **/
    select?: PurchaseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PurchaseInclude | null
    /**
     * The data needed to create a Purchase.
     * 
    **/
    data: XOR<PurchaseCreateInput, PurchaseUncheckedCreateInput>
  }


  /**
   * Purchase createMany
   */
  export type PurchaseCreateManyArgs = {
    data: Enumerable<PurchaseCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Purchase update
   */
  export type PurchaseUpdateArgs = {
    /**
     * Select specific fields to fetch from the Purchase
     * 
    **/
    select?: PurchaseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PurchaseInclude | null
    /**
     * The data needed to update a Purchase.
     * 
    **/
    data: XOR<PurchaseUpdateInput, PurchaseUncheckedUpdateInput>
    /**
     * Choose, which Purchase to update.
     * 
    **/
    where: PurchaseWhereUniqueInput
  }


  /**
   * Purchase updateMany
   */
  export type PurchaseUpdateManyArgs = {
    data: XOR<PurchaseUpdateManyMutationInput, PurchaseUncheckedUpdateManyInput>
    where?: PurchaseWhereInput
  }


  /**
   * Purchase upsert
   */
  export type PurchaseUpsertArgs = {
    /**
     * Select specific fields to fetch from the Purchase
     * 
    **/
    select?: PurchaseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PurchaseInclude | null
    /**
     * The filter to search for the Purchase to update in case it exists.
     * 
    **/
    where: PurchaseWhereUniqueInput
    /**
     * In case the Purchase found by the `where` argument doesn't exist, create a new Purchase with this data.
     * 
    **/
    create: XOR<PurchaseCreateInput, PurchaseUncheckedCreateInput>
    /**
     * In case the Purchase was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PurchaseUpdateInput, PurchaseUncheckedUpdateInput>
  }


  /**
   * Purchase delete
   */
  export type PurchaseDeleteArgs = {
    /**
     * Select specific fields to fetch from the Purchase
     * 
    **/
    select?: PurchaseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PurchaseInclude | null
    /**
     * Filter which Purchase to delete.
     * 
    **/
    where: PurchaseWhereUniqueInput
  }


  /**
   * Purchase deleteMany
   */
  export type PurchaseDeleteManyArgs = {
    where?: PurchaseWhereInput
  }


  /**
   * Purchase without action
   */
  export type PurchaseArgs = {
    /**
     * Select specific fields to fetch from the Purchase
     * 
    **/
    select?: PurchaseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PurchaseInclude | null
  }



  /**
   * Model TransactionJobs
   */


  export type AggregateTransactionJobs = {
    _count: TransactionJobsCountAggregateOutputType | null
    count: TransactionJobsCountAggregateOutputType | null
    _avg: TransactionJobsAvgAggregateOutputType | null
    avg: TransactionJobsAvgAggregateOutputType | null
    _sum: TransactionJobsSumAggregateOutputType | null
    sum: TransactionJobsSumAggregateOutputType | null
    _min: TransactionJobsMinAggregateOutputType | null
    min: TransactionJobsMinAggregateOutputType | null
    _max: TransactionJobsMaxAggregateOutputType | null
    max: TransactionJobsMaxAggregateOutputType | null
  }

  export type TransactionJobsAvgAggregateOutputType = {
    id: number | null
    purchaseId: number | null
  }

  export type TransactionJobsSumAggregateOutputType = {
    id: number | null
    purchaseId: number | null
  }

  export type TransactionJobsMinAggregateOutputType = {
    id: number | null
    transactionhash: string | null
    status: string | null
    user: string | null
    purchaseId: number | null
  }

  export type TransactionJobsMaxAggregateOutputType = {
    id: number | null
    transactionhash: string | null
    status: string | null
    user: string | null
    purchaseId: number | null
  }

  export type TransactionJobsCountAggregateOutputType = {
    id: number
    transactionhash: number
    status: number
    user: number
    purchaseId: number
    _all: number
  }


  export type TransactionJobsAvgAggregateInputType = {
    id?: true
    purchaseId?: true
  }

  export type TransactionJobsSumAggregateInputType = {
    id?: true
    purchaseId?: true
  }

  export type TransactionJobsMinAggregateInputType = {
    id?: true
    transactionhash?: true
    status?: true
    user?: true
    purchaseId?: true
  }

  export type TransactionJobsMaxAggregateInputType = {
    id?: true
    transactionhash?: true
    status?: true
    user?: true
    purchaseId?: true
  }

  export type TransactionJobsCountAggregateInputType = {
    id?: true
    transactionhash?: true
    status?: true
    user?: true
    purchaseId?: true
    _all?: true
  }

  export type TransactionJobsAggregateArgs = {
    /**
     * Filter which TransactionJobs to aggregate.
     * 
    **/
    where?: TransactionJobsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionJobs to fetch.
     * 
    **/
    orderBy?: Enumerable<TransactionJobsOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TransactionJobsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionJobs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionJobs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TransactionJobs
    **/
    _count?: true | TransactionJobsCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | TransactionJobsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionJobsAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: TransactionJobsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionJobsSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: TransactionJobsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionJobsMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: TransactionJobsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionJobsMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: TransactionJobsMaxAggregateInputType
  }

  export type GetTransactionJobsAggregateType<T extends TransactionJobsAggregateArgs> = {
        [P in keyof T & keyof AggregateTransactionJobs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransactionJobs[P]>
      : GetScalarType<T[P], AggregateTransactionJobs[P]>
  }


    
    
  export type TransactionJobsGroupByArgs = {
    where?: TransactionJobsWhereInput
    orderBy?: Enumerable<TransactionJobsOrderByInput>
    by: Array<TransactionJobsScalarFieldEnum>
    having?: TransactionJobsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionJobsCountAggregateInputType | true
    _avg?: TransactionJobsAvgAggregateInputType
    _sum?: TransactionJobsSumAggregateInputType
    _min?: TransactionJobsMinAggregateInputType
    _max?: TransactionJobsMaxAggregateInputType
  }


  export type TransactionJobsGroupByOutputType = {
    id: number
    transactionhash: string
    status: string
    user: string
    purchaseId: number
    _count: TransactionJobsCountAggregateOutputType | null
    _avg: TransactionJobsAvgAggregateOutputType | null
    _sum: TransactionJobsSumAggregateOutputType | null
    _min: TransactionJobsMinAggregateOutputType | null
    _max: TransactionJobsMaxAggregateOutputType | null
  }

  type GetTransactionJobsGroupByPayload<T extends TransactionJobsGroupByArgs> = Promise<
    Array<
      PickArray<TransactionJobsGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof TransactionJobsGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], TransactionJobsGroupByOutputType[P]> 
            : GetScalarType<T[P], TransactionJobsGroupByOutputType[P]>
        }
      > 
    >


  export type TransactionJobsSelect = {
    id?: boolean
    transactionhash?: boolean
    status?: boolean
    user?: boolean
    purchase?: boolean | PurchaseArgs
    purchaseId?: boolean
  }

  export type TransactionJobsInclude = {
    purchase?: boolean | PurchaseArgs
  }

  export type TransactionJobsGetPayload<
    S extends boolean | null | undefined | TransactionJobsArgs,
    U = keyof S
      > = S extends true
        ? TransactionJobs
    : S extends undefined
    ? never
    : S extends TransactionJobsArgs | TransactionJobsFindManyArgs
    ?'include' extends U
    ? TransactionJobs  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'purchase'
        ? PurchaseGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof TransactionJobs ?TransactionJobs [P]
  : 
          P extends 'purchase'
        ? PurchaseGetPayload<S['select'][P]> : never
  } 
    : TransactionJobs
  : TransactionJobs


  type TransactionJobsCountArgs = Merge<
    Omit<TransactionJobsFindManyArgs, 'select' | 'include'> & {
      select?: TransactionJobsCountAggregateInputType | true
    }
  >

  export interface TransactionJobsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one TransactionJobs that matches the filter.
     * @param {TransactionJobsFindUniqueArgs} args - Arguments to find a TransactionJobs
     * @example
     * // Get one TransactionJobs
     * const transactionJobs = await prisma.transactionJobs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TransactionJobsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TransactionJobsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'TransactionJobs'> extends True ? CheckSelect<T, Prisma__TransactionJobsClient<TransactionJobs>, Prisma__TransactionJobsClient<TransactionJobsGetPayload<T>>> : CheckSelect<T, Prisma__TransactionJobsClient<TransactionJobs | null >, Prisma__TransactionJobsClient<TransactionJobsGetPayload<T> | null >>

    /**
     * Find the first TransactionJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionJobsFindFirstArgs} args - Arguments to find a TransactionJobs
     * @example
     * // Get one TransactionJobs
     * const transactionJobs = await prisma.transactionJobs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TransactionJobsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TransactionJobsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'TransactionJobs'> extends True ? CheckSelect<T, Prisma__TransactionJobsClient<TransactionJobs>, Prisma__TransactionJobsClient<TransactionJobsGetPayload<T>>> : CheckSelect<T, Prisma__TransactionJobsClient<TransactionJobs | null >, Prisma__TransactionJobsClient<TransactionJobsGetPayload<T> | null >>

    /**
     * Find zero or more TransactionJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionJobsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TransactionJobs
     * const transactionJobs = await prisma.transactionJobs.findMany()
     * 
     * // Get first 10 TransactionJobs
     * const transactionJobs = await prisma.transactionJobs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionJobsWithIdOnly = await prisma.transactionJobs.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TransactionJobsFindManyArgs>(
      args?: SelectSubset<T, TransactionJobsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<TransactionJobs>>, PrismaPromise<Array<TransactionJobsGetPayload<T>>>>

    /**
     * Create a TransactionJobs.
     * @param {TransactionJobsCreateArgs} args - Arguments to create a TransactionJobs.
     * @example
     * // Create one TransactionJobs
     * const TransactionJobs = await prisma.transactionJobs.create({
     *   data: {
     *     // ... data to create a TransactionJobs
     *   }
     * })
     * 
    **/
    create<T extends TransactionJobsCreateArgs>(
      args: SelectSubset<T, TransactionJobsCreateArgs>
    ): CheckSelect<T, Prisma__TransactionJobsClient<TransactionJobs>, Prisma__TransactionJobsClient<TransactionJobsGetPayload<T>>>

    /**
     * Create many TransactionJobs.
     *     @param {TransactionJobsCreateManyArgs} args - Arguments to create many TransactionJobs.
     *     @example
     *     // Create many TransactionJobs
     *     const transactionJobs = await prisma.transactionJobs.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TransactionJobsCreateManyArgs>(
      args?: SelectSubset<T, TransactionJobsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a TransactionJobs.
     * @param {TransactionJobsDeleteArgs} args - Arguments to delete one TransactionJobs.
     * @example
     * // Delete one TransactionJobs
     * const TransactionJobs = await prisma.transactionJobs.delete({
     *   where: {
     *     // ... filter to delete one TransactionJobs
     *   }
     * })
     * 
    **/
    delete<T extends TransactionJobsDeleteArgs>(
      args: SelectSubset<T, TransactionJobsDeleteArgs>
    ): CheckSelect<T, Prisma__TransactionJobsClient<TransactionJobs>, Prisma__TransactionJobsClient<TransactionJobsGetPayload<T>>>

    /**
     * Update one TransactionJobs.
     * @param {TransactionJobsUpdateArgs} args - Arguments to update one TransactionJobs.
     * @example
     * // Update one TransactionJobs
     * const transactionJobs = await prisma.transactionJobs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TransactionJobsUpdateArgs>(
      args: SelectSubset<T, TransactionJobsUpdateArgs>
    ): CheckSelect<T, Prisma__TransactionJobsClient<TransactionJobs>, Prisma__TransactionJobsClient<TransactionJobsGetPayload<T>>>

    /**
     * Delete zero or more TransactionJobs.
     * @param {TransactionJobsDeleteManyArgs} args - Arguments to filter TransactionJobs to delete.
     * @example
     * // Delete a few TransactionJobs
     * const { count } = await prisma.transactionJobs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TransactionJobsDeleteManyArgs>(
      args?: SelectSubset<T, TransactionJobsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more TransactionJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionJobsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TransactionJobs
     * const transactionJobs = await prisma.transactionJobs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TransactionJobsUpdateManyArgs>(
      args: SelectSubset<T, TransactionJobsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one TransactionJobs.
     * @param {TransactionJobsUpsertArgs} args - Arguments to update or create a TransactionJobs.
     * @example
     * // Update or create a TransactionJobs
     * const transactionJobs = await prisma.transactionJobs.upsert({
     *   create: {
     *     // ... data to create a TransactionJobs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TransactionJobs we want to update
     *   }
     * })
    **/
    upsert<T extends TransactionJobsUpsertArgs>(
      args: SelectSubset<T, TransactionJobsUpsertArgs>
    ): CheckSelect<T, Prisma__TransactionJobsClient<TransactionJobs>, Prisma__TransactionJobsClient<TransactionJobsGetPayload<T>>>

    /**
     * Count the number of TransactionJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionJobsCountArgs} args - Arguments to filter TransactionJobs to count.
     * @example
     * // Count the number of TransactionJobs
     * const count = await prisma.transactionJobs.count({
     *   where: {
     *     // ... the filter for the TransactionJobs we want to count
     *   }
     * })
    **/
    count<T extends TransactionJobsCountArgs>(
      args?: Subset<T, TransactionJobsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionJobsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TransactionJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionJobsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionJobsAggregateArgs>(args: Subset<T, TransactionJobsAggregateArgs>): PrismaPromise<GetTransactionJobsAggregateType<T>>

    /**
     * Group by TransactionJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionJobsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionJobsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionJobsGroupByArgs['orderBy'] }
        : { orderBy?: TransactionJobsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionJobsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionJobsGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for TransactionJobs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TransactionJobsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    purchase<T extends PurchaseArgs = {}>(args?: Subset<T, PurchaseArgs>): CheckSelect<T, Prisma__PurchaseClient<Purchase | null >, Prisma__PurchaseClient<PurchaseGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * TransactionJobs findUnique
   */
  export type TransactionJobsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the TransactionJobs
     * 
    **/
    select?: TransactionJobsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransactionJobsInclude | null
    /**
     * Throw an Error if a TransactionJobs can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which TransactionJobs to fetch.
     * 
    **/
    where: TransactionJobsWhereUniqueInput
  }


  /**
   * TransactionJobs findFirst
   */
  export type TransactionJobsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the TransactionJobs
     * 
    **/
    select?: TransactionJobsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransactionJobsInclude | null
    /**
     * Throw an Error if a TransactionJobs can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which TransactionJobs to fetch.
     * 
    **/
    where?: TransactionJobsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionJobs to fetch.
     * 
    **/
    orderBy?: Enumerable<TransactionJobsOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TransactionJobs.
     * 
    **/
    cursor?: TransactionJobsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionJobs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionJobs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransactionJobs.
     * 
    **/
    distinct?: Enumerable<TransactionJobsScalarFieldEnum>
  }


  /**
   * TransactionJobs findMany
   */
  export type TransactionJobsFindManyArgs = {
    /**
     * Select specific fields to fetch from the TransactionJobs
     * 
    **/
    select?: TransactionJobsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransactionJobsInclude | null
    /**
     * Filter, which TransactionJobs to fetch.
     * 
    **/
    where?: TransactionJobsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionJobs to fetch.
     * 
    **/
    orderBy?: Enumerable<TransactionJobsOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TransactionJobs.
     * 
    **/
    cursor?: TransactionJobsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionJobs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionJobs.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TransactionJobsScalarFieldEnum>
  }


  /**
   * TransactionJobs create
   */
  export type TransactionJobsCreateArgs = {
    /**
     * Select specific fields to fetch from the TransactionJobs
     * 
    **/
    select?: TransactionJobsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransactionJobsInclude | null
    /**
     * The data needed to create a TransactionJobs.
     * 
    **/
    data: XOR<TransactionJobsCreateInput, TransactionJobsUncheckedCreateInput>
  }


  /**
   * TransactionJobs createMany
   */
  export type TransactionJobsCreateManyArgs = {
    data: Enumerable<TransactionJobsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * TransactionJobs update
   */
  export type TransactionJobsUpdateArgs = {
    /**
     * Select specific fields to fetch from the TransactionJobs
     * 
    **/
    select?: TransactionJobsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransactionJobsInclude | null
    /**
     * The data needed to update a TransactionJobs.
     * 
    **/
    data: XOR<TransactionJobsUpdateInput, TransactionJobsUncheckedUpdateInput>
    /**
     * Choose, which TransactionJobs to update.
     * 
    **/
    where: TransactionJobsWhereUniqueInput
  }


  /**
   * TransactionJobs updateMany
   */
  export type TransactionJobsUpdateManyArgs = {
    data: XOR<TransactionJobsUpdateManyMutationInput, TransactionJobsUncheckedUpdateManyInput>
    where?: TransactionJobsWhereInput
  }


  /**
   * TransactionJobs upsert
   */
  export type TransactionJobsUpsertArgs = {
    /**
     * Select specific fields to fetch from the TransactionJobs
     * 
    **/
    select?: TransactionJobsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransactionJobsInclude | null
    /**
     * The filter to search for the TransactionJobs to update in case it exists.
     * 
    **/
    where: TransactionJobsWhereUniqueInput
    /**
     * In case the TransactionJobs found by the `where` argument doesn't exist, create a new TransactionJobs with this data.
     * 
    **/
    create: XOR<TransactionJobsCreateInput, TransactionJobsUncheckedCreateInput>
    /**
     * In case the TransactionJobs was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TransactionJobsUpdateInput, TransactionJobsUncheckedUpdateInput>
  }


  /**
   * TransactionJobs delete
   */
  export type TransactionJobsDeleteArgs = {
    /**
     * Select specific fields to fetch from the TransactionJobs
     * 
    **/
    select?: TransactionJobsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransactionJobsInclude | null
    /**
     * Filter which TransactionJobs to delete.
     * 
    **/
    where: TransactionJobsWhereUniqueInput
  }


  /**
   * TransactionJobs deleteMany
   */
  export type TransactionJobsDeleteManyArgs = {
    where?: TransactionJobsWhereInput
  }


  /**
   * TransactionJobs without action
   */
  export type TransactionJobsArgs = {
    /**
     * Select specific fields to fetch from the TransactionJobs
     * 
    **/
    select?: TransactionJobsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransactionJobsInclude | null
  }



  /**
   * Model TagType
   */


  export type AggregateTagType = {
    _count: TagTypeCountAggregateOutputType | null
    count: TagTypeCountAggregateOutputType | null
    _min: TagTypeMinAggregateOutputType | null
    min: TagTypeMinAggregateOutputType | null
    _max: TagTypeMaxAggregateOutputType | null
    max: TagTypeMaxAggregateOutputType | null
  }

  export type TagTypeMinAggregateOutputType = {
    id: string | null
  }

  export type TagTypeMaxAggregateOutputType = {
    id: string | null
  }

  export type TagTypeCountAggregateOutputType = {
    id: number
    _all: number
  }


  export type TagTypeMinAggregateInputType = {
    id?: true
  }

  export type TagTypeMaxAggregateInputType = {
    id?: true
  }

  export type TagTypeCountAggregateInputType = {
    id?: true
    _all?: true
  }

  export type TagTypeAggregateArgs = {
    /**
     * Filter which TagType to aggregate.
     * 
    **/
    where?: TagTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TagTypes to fetch.
     * 
    **/
    orderBy?: Enumerable<TagTypeOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TagTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TagTypes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TagTypes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TagTypes
    **/
    _count?: true | TagTypeCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | TagTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagTypeMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: TagTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagTypeMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: TagTypeMaxAggregateInputType
  }

  export type GetTagTypeAggregateType<T extends TagTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateTagType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTagType[P]>
      : GetScalarType<T[P], AggregateTagType[P]>
  }


    
    
  export type TagTypeGroupByArgs = {
    where?: TagTypeWhereInput
    orderBy?: Enumerable<TagTypeOrderByInput>
    by: Array<TagTypeScalarFieldEnum>
    having?: TagTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagTypeCountAggregateInputType | true
    _min?: TagTypeMinAggregateInputType
    _max?: TagTypeMaxAggregateInputType
  }


  export type TagTypeGroupByOutputType = {
    id: string
    _count: TagTypeCountAggregateOutputType | null
    _min: TagTypeMinAggregateOutputType | null
    _max: TagTypeMaxAggregateOutputType | null
  }

  type GetTagTypeGroupByPayload<T extends TagTypeGroupByArgs> = Promise<
    Array<
      PickArray<TagTypeGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof TagTypeGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], TagTypeGroupByOutputType[P]> 
            : GetScalarType<T[P], TagTypeGroupByOutputType[P]>
        }
      > 
    >


  export type TagTypeSelect = {
    id?: boolean
    tags?: boolean | TagFindManyArgs
  }

  export type TagTypeInclude = {
    tags?: boolean | TagFindManyArgs
  }

  export type TagTypeGetPayload<
    S extends boolean | null | undefined | TagTypeArgs,
    U = keyof S
      > = S extends true
        ? TagType
    : S extends undefined
    ? never
    : S extends TagTypeArgs | TagTypeFindManyArgs
    ?'include' extends U
    ? TagType  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'tags'
        ? Array < TagGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof TagType ?TagType [P]
  : 
          P extends 'tags'
        ? Array < TagGetPayload<S['select'][P]>>  : never
  } 
    : TagType
  : TagType


  type TagTypeCountArgs = Merge<
    Omit<TagTypeFindManyArgs, 'select' | 'include'> & {
      select?: TagTypeCountAggregateInputType | true
    }
  >

  export interface TagTypeDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one TagType that matches the filter.
     * @param {TagTypeFindUniqueArgs} args - Arguments to find a TagType
     * @example
     * // Get one TagType
     * const tagType = await prisma.tagType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TagTypeFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TagTypeFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'TagType'> extends True ? CheckSelect<T, Prisma__TagTypeClient<TagType>, Prisma__TagTypeClient<TagTypeGetPayload<T>>> : CheckSelect<T, Prisma__TagTypeClient<TagType | null >, Prisma__TagTypeClient<TagTypeGetPayload<T> | null >>

    /**
     * Find the first TagType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagTypeFindFirstArgs} args - Arguments to find a TagType
     * @example
     * // Get one TagType
     * const tagType = await prisma.tagType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TagTypeFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TagTypeFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'TagType'> extends True ? CheckSelect<T, Prisma__TagTypeClient<TagType>, Prisma__TagTypeClient<TagTypeGetPayload<T>>> : CheckSelect<T, Prisma__TagTypeClient<TagType | null >, Prisma__TagTypeClient<TagTypeGetPayload<T> | null >>

    /**
     * Find zero or more TagTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagTypeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TagTypes
     * const tagTypes = await prisma.tagType.findMany()
     * 
     * // Get first 10 TagTypes
     * const tagTypes = await prisma.tagType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagTypeWithIdOnly = await prisma.tagType.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TagTypeFindManyArgs>(
      args?: SelectSubset<T, TagTypeFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<TagType>>, PrismaPromise<Array<TagTypeGetPayload<T>>>>

    /**
     * Create a TagType.
     * @param {TagTypeCreateArgs} args - Arguments to create a TagType.
     * @example
     * // Create one TagType
     * const TagType = await prisma.tagType.create({
     *   data: {
     *     // ... data to create a TagType
     *   }
     * })
     * 
    **/
    create<T extends TagTypeCreateArgs>(
      args: SelectSubset<T, TagTypeCreateArgs>
    ): CheckSelect<T, Prisma__TagTypeClient<TagType>, Prisma__TagTypeClient<TagTypeGetPayload<T>>>

    /**
     * Create many TagTypes.
     *     @param {TagTypeCreateManyArgs} args - Arguments to create many TagTypes.
     *     @example
     *     // Create many TagTypes
     *     const tagType = await prisma.tagType.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TagTypeCreateManyArgs>(
      args?: SelectSubset<T, TagTypeCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a TagType.
     * @param {TagTypeDeleteArgs} args - Arguments to delete one TagType.
     * @example
     * // Delete one TagType
     * const TagType = await prisma.tagType.delete({
     *   where: {
     *     // ... filter to delete one TagType
     *   }
     * })
     * 
    **/
    delete<T extends TagTypeDeleteArgs>(
      args: SelectSubset<T, TagTypeDeleteArgs>
    ): CheckSelect<T, Prisma__TagTypeClient<TagType>, Prisma__TagTypeClient<TagTypeGetPayload<T>>>

    /**
     * Update one TagType.
     * @param {TagTypeUpdateArgs} args - Arguments to update one TagType.
     * @example
     * // Update one TagType
     * const tagType = await prisma.tagType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TagTypeUpdateArgs>(
      args: SelectSubset<T, TagTypeUpdateArgs>
    ): CheckSelect<T, Prisma__TagTypeClient<TagType>, Prisma__TagTypeClient<TagTypeGetPayload<T>>>

    /**
     * Delete zero or more TagTypes.
     * @param {TagTypeDeleteManyArgs} args - Arguments to filter TagTypes to delete.
     * @example
     * // Delete a few TagTypes
     * const { count } = await prisma.tagType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TagTypeDeleteManyArgs>(
      args?: SelectSubset<T, TagTypeDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more TagTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TagTypes
     * const tagType = await prisma.tagType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TagTypeUpdateManyArgs>(
      args: SelectSubset<T, TagTypeUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one TagType.
     * @param {TagTypeUpsertArgs} args - Arguments to update or create a TagType.
     * @example
     * // Update or create a TagType
     * const tagType = await prisma.tagType.upsert({
     *   create: {
     *     // ... data to create a TagType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TagType we want to update
     *   }
     * })
    **/
    upsert<T extends TagTypeUpsertArgs>(
      args: SelectSubset<T, TagTypeUpsertArgs>
    ): CheckSelect<T, Prisma__TagTypeClient<TagType>, Prisma__TagTypeClient<TagTypeGetPayload<T>>>

    /**
     * Count the number of TagTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagTypeCountArgs} args - Arguments to filter TagTypes to count.
     * @example
     * // Count the number of TagTypes
     * const count = await prisma.tagType.count({
     *   where: {
     *     // ... the filter for the TagTypes we want to count
     *   }
     * })
    **/
    count<T extends TagTypeCountArgs>(
      args?: Subset<T, TagTypeCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TagType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagTypeAggregateArgs>(args: Subset<T, TagTypeAggregateArgs>): PrismaPromise<GetTagTypeAggregateType<T>>

    /**
     * Group by TagType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagTypeGroupByArgs['orderBy'] }
        : { orderBy?: TagTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagTypeGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for TagType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TagTypeClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    tags<T extends TagFindManyArgs = {}>(args?: Subset<T, TagFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Tag>>, PrismaPromise<Array<TagGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * TagType findUnique
   */
  export type TagTypeFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the TagType
     * 
    **/
    select?: TagTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TagTypeInclude | null
    /**
     * Throw an Error if a TagType can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which TagType to fetch.
     * 
    **/
    where: TagTypeWhereUniqueInput
  }


  /**
   * TagType findFirst
   */
  export type TagTypeFindFirstArgs = {
    /**
     * Select specific fields to fetch from the TagType
     * 
    **/
    select?: TagTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TagTypeInclude | null
    /**
     * Throw an Error if a TagType can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which TagType to fetch.
     * 
    **/
    where?: TagTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TagTypes to fetch.
     * 
    **/
    orderBy?: Enumerable<TagTypeOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TagTypes.
     * 
    **/
    cursor?: TagTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TagTypes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TagTypes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TagTypes.
     * 
    **/
    distinct?: Enumerable<TagTypeScalarFieldEnum>
  }


  /**
   * TagType findMany
   */
  export type TagTypeFindManyArgs = {
    /**
     * Select specific fields to fetch from the TagType
     * 
    **/
    select?: TagTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TagTypeInclude | null
    /**
     * Filter, which TagTypes to fetch.
     * 
    **/
    where?: TagTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TagTypes to fetch.
     * 
    **/
    orderBy?: Enumerable<TagTypeOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TagTypes.
     * 
    **/
    cursor?: TagTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TagTypes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TagTypes.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TagTypeScalarFieldEnum>
  }


  /**
   * TagType create
   */
  export type TagTypeCreateArgs = {
    /**
     * Select specific fields to fetch from the TagType
     * 
    **/
    select?: TagTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TagTypeInclude | null
    /**
     * The data needed to create a TagType.
     * 
    **/
    data: XOR<TagTypeCreateInput, TagTypeUncheckedCreateInput>
  }


  /**
   * TagType createMany
   */
  export type TagTypeCreateManyArgs = {
    data: Enumerable<TagTypeCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * TagType update
   */
  export type TagTypeUpdateArgs = {
    /**
     * Select specific fields to fetch from the TagType
     * 
    **/
    select?: TagTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TagTypeInclude | null
    /**
     * The data needed to update a TagType.
     * 
    **/
    data: XOR<TagTypeUpdateInput, TagTypeUncheckedUpdateInput>
    /**
     * Choose, which TagType to update.
     * 
    **/
    where: TagTypeWhereUniqueInput
  }


  /**
   * TagType updateMany
   */
  export type TagTypeUpdateManyArgs = {
    data: XOR<TagTypeUpdateManyMutationInput, TagTypeUncheckedUpdateManyInput>
    where?: TagTypeWhereInput
  }


  /**
   * TagType upsert
   */
  export type TagTypeUpsertArgs = {
    /**
     * Select specific fields to fetch from the TagType
     * 
    **/
    select?: TagTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TagTypeInclude | null
    /**
     * The filter to search for the TagType to update in case it exists.
     * 
    **/
    where: TagTypeWhereUniqueInput
    /**
     * In case the TagType found by the `where` argument doesn't exist, create a new TagType with this data.
     * 
    **/
    create: XOR<TagTypeCreateInput, TagTypeUncheckedCreateInput>
    /**
     * In case the TagType was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TagTypeUpdateInput, TagTypeUncheckedUpdateInput>
  }


  /**
   * TagType delete
   */
  export type TagTypeDeleteArgs = {
    /**
     * Select specific fields to fetch from the TagType
     * 
    **/
    select?: TagTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TagTypeInclude | null
    /**
     * Filter which TagType to delete.
     * 
    **/
    where: TagTypeWhereUniqueInput
  }


  /**
   * TagType deleteMany
   */
  export type TagTypeDeleteManyArgs = {
    where?: TagTypeWhereInput
  }


  /**
   * TagType without action
   */
  export type TagTypeArgs = {
    /**
     * Select specific fields to fetch from the TagType
     * 
    **/
    select?: TagTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TagTypeInclude | null
  }



  /**
   * Model Transaction
   */


  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    count: TransactionCountAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
    max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionMinAggregateOutputType = {
    transactionHash: string | null
  }

  export type TransactionMaxAggregateOutputType = {
    transactionHash: string | null
  }

  export type TransactionCountAggregateOutputType = {
    transactionHash: number
    _all: number
  }


  export type TransactionMinAggregateInputType = {
    transactionHash?: true
  }

  export type TransactionMaxAggregateInputType = {
    transactionHash?: true
  }

  export type TransactionCountAggregateInputType = {
    transactionHash?: true
    _all?: true
  }

  export type TransactionAggregateArgs = {
    /**
     * Filter which Transaction to aggregate.
     * 
    **/
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     * 
    **/
    orderBy?: Enumerable<TransactionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }


    
    
  export type TransactionGroupByArgs = {
    where?: TransactionWhereInput
    orderBy?: Enumerable<TransactionOrderByInput>
    by: Array<TransactionScalarFieldEnum>
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }


  export type TransactionGroupByOutputType = {
    transactionHash: string
    _count: TransactionCountAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Promise<
    Array<
      PickArray<TransactionGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], TransactionGroupByOutputType[P]> 
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      > 
    >


  export type TransactionSelect = {
    transactionHash?: boolean
    tags?: boolean | TagFindManyArgs
  }

  export type TransactionInclude = {
    tags?: boolean | TagFindManyArgs
  }

  export type TransactionGetPayload<
    S extends boolean | null | undefined | TransactionArgs,
    U = keyof S
      > = S extends true
        ? Transaction
    : S extends undefined
    ? never
    : S extends TransactionArgs | TransactionFindManyArgs
    ?'include' extends U
    ? Transaction  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'tags'
        ? Array < TagGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Transaction ?Transaction [P]
  : 
          P extends 'tags'
        ? Array < TagGetPayload<S['select'][P]>>  : never
  } 
    : Transaction
  : Transaction


  type TransactionCountArgs = Merge<
    Omit<TransactionFindManyArgs, 'select' | 'include'> & {
      select?: TransactionCountAggregateInputType | true
    }
  >

  export interface TransactionDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TransactionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TransactionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Transaction'> extends True ? CheckSelect<T, Prisma__TransactionClient<Transaction>, Prisma__TransactionClient<TransactionGetPayload<T>>> : CheckSelect<T, Prisma__TransactionClient<Transaction | null >, Prisma__TransactionClient<TransactionGetPayload<T> | null >>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TransactionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TransactionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Transaction'> extends True ? CheckSelect<T, Prisma__TransactionClient<Transaction>, Prisma__TransactionClient<TransactionGetPayload<T>>> : CheckSelect<T, Prisma__TransactionClient<Transaction | null >, Prisma__TransactionClient<TransactionGetPayload<T> | null >>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `transactionHash`
     * const transactionWithTransactionHashOnly = await prisma.transaction.findMany({ select: { transactionHash: true } })
     * 
    **/
    findMany<T extends TransactionFindManyArgs>(
      args?: SelectSubset<T, TransactionFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Transaction>>, PrismaPromise<Array<TransactionGetPayload<T>>>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
    **/
    create<T extends TransactionCreateArgs>(
      args: SelectSubset<T, TransactionCreateArgs>
    ): CheckSelect<T, Prisma__TransactionClient<Transaction>, Prisma__TransactionClient<TransactionGetPayload<T>>>

    /**
     * Create many Transactions.
     *     @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     *     @example
     *     // Create many Transactions
     *     const transaction = await prisma.transaction.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TransactionCreateManyArgs>(
      args?: SelectSubset<T, TransactionCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
    **/
    delete<T extends TransactionDeleteArgs>(
      args: SelectSubset<T, TransactionDeleteArgs>
    ): CheckSelect<T, Prisma__TransactionClient<Transaction>, Prisma__TransactionClient<TransactionGetPayload<T>>>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TransactionUpdateArgs>(
      args: SelectSubset<T, TransactionUpdateArgs>
    ): CheckSelect<T, Prisma__TransactionClient<Transaction>, Prisma__TransactionClient<TransactionGetPayload<T>>>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TransactionDeleteManyArgs>(
      args?: SelectSubset<T, TransactionDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TransactionUpdateManyArgs>(
      args: SelectSubset<T, TransactionUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
    **/
    upsert<T extends TransactionUpsertArgs>(
      args: SelectSubset<T, TransactionUpsertArgs>
    ): CheckSelect<T, Prisma__TransactionClient<Transaction>, Prisma__TransactionClient<TransactionGetPayload<T>>>

    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TransactionClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    tags<T extends TagFindManyArgs = {}>(args?: Subset<T, TagFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Tag>>, PrismaPromise<Array<TagGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Transaction
     * 
    **/
    select?: TransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransactionInclude | null
    /**
     * Throw an Error if a Transaction can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Transaction to fetch.
     * 
    **/
    where: TransactionWhereUniqueInput
  }


  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Transaction
     * 
    **/
    select?: TransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransactionInclude | null
    /**
     * Throw an Error if a Transaction can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Transaction to fetch.
     * 
    **/
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     * 
    **/
    orderBy?: Enumerable<TransactionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     * 
    **/
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     * 
    **/
    distinct?: Enumerable<TransactionScalarFieldEnum>
  }


  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs = {
    /**
     * Select specific fields to fetch from the Transaction
     * 
    **/
    select?: TransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransactionInclude | null
    /**
     * Filter, which Transactions to fetch.
     * 
    **/
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     * 
    **/
    orderBy?: Enumerable<TransactionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     * 
    **/
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TransactionScalarFieldEnum>
  }


  /**
   * Transaction create
   */
  export type TransactionCreateArgs = {
    /**
     * Select specific fields to fetch from the Transaction
     * 
    **/
    select?: TransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransactionInclude | null
    /**
     * The data needed to create a Transaction.
     * 
    **/
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }


  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs = {
    data: Enumerable<TransactionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Transaction update
   */
  export type TransactionUpdateArgs = {
    /**
     * Select specific fields to fetch from the Transaction
     * 
    **/
    select?: TransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransactionInclude | null
    /**
     * The data needed to update a Transaction.
     * 
    **/
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     * 
    **/
    where: TransactionWhereUniqueInput
  }


  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs = {
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    where?: TransactionWhereInput
  }


  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs = {
    /**
     * Select specific fields to fetch from the Transaction
     * 
    **/
    select?: TransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransactionInclude | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     * 
    **/
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     * 
    **/
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }


  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs = {
    /**
     * Select specific fields to fetch from the Transaction
     * 
    **/
    select?: TransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransactionInclude | null
    /**
     * Filter which Transaction to delete.
     * 
    **/
    where: TransactionWhereUniqueInput
  }


  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs = {
    where?: TransactionWhereInput
  }


  /**
   * Transaction without action
   */
  export type TransactionArgs = {
    /**
     * Select specific fields to fetch from the Transaction
     * 
    **/
    select?: TransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TransactionInclude | null
  }



  /**
   * Model Tag
   */


  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
    max: TagMaxAggregateOutputType | null
  }

  export type TagAvgAggregateOutputType = {
    id: number | null
    createdByProfileId: number | null
    chatMessageId: number | null
  }

  export type TagSumAggregateOutputType = {
    id: number | null
    createdByProfileId: number | null
    chatMessageId: number | null
  }

  export type TagMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    createdByProfileId: number | null
    isPrivate: boolean | null
    transactionHash: string | null
    typeId: string | null
    chatMessageId: number | null
    value: string | null
  }

  export type TagMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    createdByProfileId: number | null
    isPrivate: boolean | null
    transactionHash: string | null
    typeId: string | null
    chatMessageId: number | null
    value: string | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    createdAt: number
    createdByProfileId: number
    isPrivate: number
    transactionHash: number
    typeId: number
    chatMessageId: number
    value: number
    _all: number
  }


  export type TagAvgAggregateInputType = {
    id?: true
    createdByProfileId?: true
    chatMessageId?: true
  }

  export type TagSumAggregateInputType = {
    id?: true
    createdByProfileId?: true
    chatMessageId?: true
  }

  export type TagMinAggregateInputType = {
    id?: true
    createdAt?: true
    createdByProfileId?: true
    isPrivate?: true
    transactionHash?: true
    typeId?: true
    chatMessageId?: true
    value?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    createdAt?: true
    createdByProfileId?: true
    isPrivate?: true
    transactionHash?: true
    typeId?: true
    chatMessageId?: true
    value?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    createdAt?: true
    createdByProfileId?: true
    isPrivate?: true
    transactionHash?: true
    typeId?: true
    chatMessageId?: true
    value?: true
    _all?: true
  }

  export type TagAggregateArgs = {
    /**
     * Filter which Tag to aggregate.
     * 
    **/
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     * 
    **/
    orderBy?: Enumerable<TagOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TagAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: TagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TagSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: TagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }


    
    
  export type TagGroupByArgs = {
    where?: TagWhereInput
    orderBy?: Enumerable<TagOrderByInput>
    by: Array<TagScalarFieldEnum>
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _avg?: TagAvgAggregateInputType
    _sum?: TagSumAggregateInputType
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }


  export type TagGroupByOutputType = {
    id: number
    createdAt: Date
    createdByProfileId: number
    isPrivate: boolean
    transactionHash: string | null
    typeId: string
    chatMessageId: number | null
    value: string | null
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Promise<
    Array<
      PickArray<TagGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], TagGroupByOutputType[P]> 
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      > 
    >


  export type TagSelect = {
    id?: boolean
    createdAt?: boolean
    createdBy?: boolean | ProfileArgs
    createdByProfileId?: boolean
    isPrivate?: boolean
    transaction?: boolean | TransactionArgs
    transactionHash?: boolean
    type?: boolean | TagTypeArgs
    typeId?: boolean
    chatMessage?: boolean | ChatMessageArgs
    chatMessageId?: boolean
    value?: boolean
    offerCategory?: boolean | OfferFindManyArgs
    offerUnit?: boolean | OfferFindManyArgs
    offerDeliveryTerms?: boolean | OfferFindManyArgs
  }

  export type TagInclude = {
    createdBy?: boolean | ProfileArgs
    transaction?: boolean | TransactionArgs
    type?: boolean | TagTypeArgs
    chatMessage?: boolean | ChatMessageArgs
    offerCategory?: boolean | OfferFindManyArgs
    offerUnit?: boolean | OfferFindManyArgs
    offerDeliveryTerms?: boolean | OfferFindManyArgs
  }

  export type TagGetPayload<
    S extends boolean | null | undefined | TagArgs,
    U = keyof S
      > = S extends true
        ? Tag
    : S extends undefined
    ? never
    : S extends TagArgs | TagFindManyArgs
    ?'include' extends U
    ? Tag  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'createdBy'
        ? ProfileGetPayload<S['include'][P]> :
        P extends 'transaction'
        ? TransactionGetPayload<S['include'][P]> | null :
        P extends 'type'
        ? TagTypeGetPayload<S['include'][P]> :
        P extends 'chatMessage'
        ? ChatMessageGetPayload<S['include'][P]> | null :
        P extends 'offerCategory'
        ? Array < OfferGetPayload<S['include'][P]>>  :
        P extends 'offerUnit'
        ? Array < OfferGetPayload<S['include'][P]>>  :
        P extends 'offerDeliveryTerms'
        ? Array < OfferGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Tag ?Tag [P]
  : 
          P extends 'createdBy'
        ? ProfileGetPayload<S['select'][P]> :
        P extends 'transaction'
        ? TransactionGetPayload<S['select'][P]> | null :
        P extends 'type'
        ? TagTypeGetPayload<S['select'][P]> :
        P extends 'chatMessage'
        ? ChatMessageGetPayload<S['select'][P]> | null :
        P extends 'offerCategory'
        ? Array < OfferGetPayload<S['select'][P]>>  :
        P extends 'offerUnit'
        ? Array < OfferGetPayload<S['select'][P]>>  :
        P extends 'offerDeliveryTerms'
        ? Array < OfferGetPayload<S['select'][P]>>  : never
  } 
    : Tag
  : Tag


  type TagCountArgs = Merge<
    Omit<TagFindManyArgs, 'select' | 'include'> & {
      select?: TagCountAggregateInputType | true
    }
  >

  export interface TagDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TagFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TagFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Tag'> extends True ? CheckSelect<T, Prisma__TagClient<Tag>, Prisma__TagClient<TagGetPayload<T>>> : CheckSelect<T, Prisma__TagClient<Tag | null >, Prisma__TagClient<TagGetPayload<T> | null >>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TagFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TagFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Tag'> extends True ? CheckSelect<T, Prisma__TagClient<Tag>, Prisma__TagClient<TagGetPayload<T>>> : CheckSelect<T, Prisma__TagClient<Tag | null >, Prisma__TagClient<TagGetPayload<T> | null >>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TagFindManyArgs>(
      args?: SelectSubset<T, TagFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Tag>>, PrismaPromise<Array<TagGetPayload<T>>>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
    **/
    create<T extends TagCreateArgs>(
      args: SelectSubset<T, TagCreateArgs>
    ): CheckSelect<T, Prisma__TagClient<Tag>, Prisma__TagClient<TagGetPayload<T>>>

    /**
     * Create many Tags.
     *     @param {TagCreateManyArgs} args - Arguments to create many Tags.
     *     @example
     *     // Create many Tags
     *     const tag = await prisma.tag.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TagCreateManyArgs>(
      args?: SelectSubset<T, TagCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
    **/
    delete<T extends TagDeleteArgs>(
      args: SelectSubset<T, TagDeleteArgs>
    ): CheckSelect<T, Prisma__TagClient<Tag>, Prisma__TagClient<TagGetPayload<T>>>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TagUpdateArgs>(
      args: SelectSubset<T, TagUpdateArgs>
    ): CheckSelect<T, Prisma__TagClient<Tag>, Prisma__TagClient<TagGetPayload<T>>>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TagDeleteManyArgs>(
      args?: SelectSubset<T, TagDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TagUpdateManyArgs>(
      args: SelectSubset<T, TagUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
    **/
    upsert<T extends TagUpsertArgs>(
      args: SelectSubset<T, TagUpsertArgs>
    ): CheckSelect<T, Prisma__TagClient<Tag>, Prisma__TagClient<TagGetPayload<T>>>

    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TagClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    createdBy<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>;

    transaction<T extends TransactionArgs = {}>(args?: Subset<T, TransactionArgs>): CheckSelect<T, Prisma__TransactionClient<Transaction | null >, Prisma__TransactionClient<TransactionGetPayload<T> | null >>;

    type<T extends TagTypeArgs = {}>(args?: Subset<T, TagTypeArgs>): CheckSelect<T, Prisma__TagTypeClient<TagType | null >, Prisma__TagTypeClient<TagTypeGetPayload<T> | null >>;

    chatMessage<T extends ChatMessageArgs = {}>(args?: Subset<T, ChatMessageArgs>): CheckSelect<T, Prisma__ChatMessageClient<ChatMessage | null >, Prisma__ChatMessageClient<ChatMessageGetPayload<T> | null >>;

    offerCategory<T extends OfferFindManyArgs = {}>(args?: Subset<T, OfferFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Offer>>, PrismaPromise<Array<OfferGetPayload<T>>>>;

    offerUnit<T extends OfferFindManyArgs = {}>(args?: Subset<T, OfferFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Offer>>, PrismaPromise<Array<OfferGetPayload<T>>>>;

    offerDeliveryTerms<T extends OfferFindManyArgs = {}>(args?: Subset<T, OfferFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Offer>>, PrismaPromise<Array<OfferGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Tag
     * 
    **/
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TagInclude | null
    /**
     * Throw an Error if a Tag can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Tag to fetch.
     * 
    **/
    where: TagWhereUniqueInput
  }


  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Tag
     * 
    **/
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TagInclude | null
    /**
     * Throw an Error if a Tag can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Tag to fetch.
     * 
    **/
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     * 
    **/
    orderBy?: Enumerable<TagOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     * 
    **/
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     * 
    **/
    distinct?: Enumerable<TagScalarFieldEnum>
  }


  /**
   * Tag findMany
   */
  export type TagFindManyArgs = {
    /**
     * Select specific fields to fetch from the Tag
     * 
    **/
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TagInclude | null
    /**
     * Filter, which Tags to fetch.
     * 
    **/
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     * 
    **/
    orderBy?: Enumerable<TagOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     * 
    **/
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TagScalarFieldEnum>
  }


  /**
   * Tag create
   */
  export type TagCreateArgs = {
    /**
     * Select specific fields to fetch from the Tag
     * 
    **/
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TagInclude | null
    /**
     * The data needed to create a Tag.
     * 
    **/
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }


  /**
   * Tag createMany
   */
  export type TagCreateManyArgs = {
    data: Enumerable<TagCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Tag update
   */
  export type TagUpdateArgs = {
    /**
     * Select specific fields to fetch from the Tag
     * 
    **/
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TagInclude | null
    /**
     * The data needed to update a Tag.
     * 
    **/
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     * 
    **/
    where: TagWhereUniqueInput
  }


  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs = {
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    where?: TagWhereInput
  }


  /**
   * Tag upsert
   */
  export type TagUpsertArgs = {
    /**
     * Select specific fields to fetch from the Tag
     * 
    **/
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TagInclude | null
    /**
     * The filter to search for the Tag to update in case it exists.
     * 
    **/
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     * 
    **/
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }


  /**
   * Tag delete
   */
  export type TagDeleteArgs = {
    /**
     * Select specific fields to fetch from the Tag
     * 
    **/
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TagInclude | null
    /**
     * Filter which Tag to delete.
     * 
    **/
    where: TagWhereUniqueInput
  }


  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs = {
    where?: TagWhereInput
  }


  /**
   * Tag without action
   */
  export type TagArgs = {
    /**
     * Select specific fields to fetch from the Tag
     * 
    **/
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TagInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const SessionScalarFieldEnum: {
    sessionId: 'sessionId',
    emailAddress: 'emailAddress',
    ethAddress: 'ethAddress',
    challengeHash: 'challengeHash',
    signature: 'signature',
    profileId: 'profileId',
    issuedBy: 'issuedBy',
    jti: 'jti',
    createdAt: 'createdAt',
    validFrom: 'validFrom',
    endedAt: 'endedAt',
    endReason: 'endReason',
    maxLifetime: 'maxLifetime'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const InvitationScalarFieldEnum: {
    id: 'id',
    createdByProfileId: 'createdByProfileId',
    createdAt: 'createdAt',
    name: 'name',
    code: 'code',
    claimedByProfileId: 'claimedByProfileId',
    claimedAt: 'claimedAt',
    redeemedByProfileId: 'redeemedByProfileId',
    redeemedAt: 'redeemedAt',
    redeemTxHash: 'redeemTxHash',
    address: 'address',
    key: 'key'
  };

  export type InvitationScalarFieldEnum = (typeof InvitationScalarFieldEnum)[keyof typeof InvitationScalarFieldEnum]


  export const RedeemInvitationRequestScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    createdByProfileId: 'createdByProfileId',
    workerProcess: 'workerProcess',
    pickedAt: 'pickedAt',
    invitationToRedeemId: 'invitationToRedeemId'
  };

  export type RedeemInvitationRequestScalarFieldEnum = (typeof RedeemInvitationRequestScalarFieldEnum)[keyof typeof RedeemInvitationRequestScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    lastUpdateAt: 'lastUpdateAt',
    emailAddress: 'emailAddress',
    status: 'status',
    type: 'type',
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
    displayTimeCircles: 'displayTimeCircles',
    cityGeonameid: 'cityGeonameid',
    lastAcknowledged: 'lastAcknowledged',
    verifySafeChallenge: 'verifySafeChallenge',
    newSafeAddress: 'newSafeAddress'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const MembershipScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    memberId: 'memberId',
    memberAtId: 'memberAtId'
  };

  export type MembershipScalarFieldEnum = (typeof MembershipScalarFieldEnum)[keyof typeof MembershipScalarFieldEnum]


  export const SubscriptionScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    subscriberProfileId: 'subscriberProfileId',
    subscribingToOfferId: 'subscribingToOfferId',
    subscribingToProfileId: 'subscribingToProfileId'
  };

  export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]


  export const ChatMessageScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    from: 'from',
    to: 'to',
    text: 'text'
  };

  export type ChatMessageScalarFieldEnum = (typeof ChatMessageScalarFieldEnum)[keyof typeof ChatMessageScalarFieldEnum]


  export const DelegatedChallengesScalarFieldEnum: {
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
  };

  export type DelegatedChallengesScalarFieldEnum = (typeof DelegatedChallengesScalarFieldEnum)[keyof typeof DelegatedChallengesScalarFieldEnum]


  export const OfferScalarFieldEnum: {
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
  };

  export type OfferScalarFieldEnum = (typeof OfferScalarFieldEnum)[keyof typeof OfferScalarFieldEnum]


  export const PurchaseScalarFieldEnum: {
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
  };

  export type PurchaseScalarFieldEnum = (typeof PurchaseScalarFieldEnum)[keyof typeof PurchaseScalarFieldEnum]


  export const TransactionJobsScalarFieldEnum: {
    id: 'id',
    transactionhash: 'transactionhash',
    status: 'status',
    user: 'user',
    purchaseId: 'purchaseId'
  };

  export type TransactionJobsScalarFieldEnum = (typeof TransactionJobsScalarFieldEnum)[keyof typeof TransactionJobsScalarFieldEnum]


  export const TagTypeScalarFieldEnum: {
    id: 'id'
  };

  export type TagTypeScalarFieldEnum = (typeof TagTypeScalarFieldEnum)[keyof typeof TagTypeScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    transactionHash: 'transactionHash'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    createdByProfileId: 'createdByProfileId',
    isPrivate: 'isPrivate',
    transactionHash: 'transactionHash',
    typeId: 'typeId',
    chatMessageId: 'chatMessageId',
    value: 'value'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type SessionWhereInput = {
    AND?: Enumerable<SessionWhereInput>
    OR?: Enumerable<SessionWhereInput>
    NOT?: Enumerable<SessionWhereInput>
    sessionId?: StringFilter | string
    emailAddress?: StringNullableFilter | string | null
    ethAddress?: StringNullableFilter | string | null
    challengeHash?: StringNullableFilter | string | null
    signature?: StringNullableFilter | string | null
    profile?: XOR<ProfileRelationFilter, ProfileWhereInput> | null
    profileId?: IntNullableFilter | number | null
    issuedBy?: StringFilter | string
    jti?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    validFrom?: DateTimeNullableFilter | Date | string | null
    endedAt?: DateTimeNullableFilter | Date | string | null
    endReason?: StringNullableFilter | string | null
    maxLifetime?: IntFilter | number
  }

  export type SessionOrderByInput = {
    sessionId?: SortOrder
    emailAddress?: SortOrder
    ethAddress?: SortOrder
    challengeHash?: SortOrder
    signature?: SortOrder
    profileId?: SortOrder
    issuedBy?: SortOrder
    jti?: SortOrder
    createdAt?: SortOrder
    validFrom?: SortOrder
    endedAt?: SortOrder
    endReason?: SortOrder
    maxLifetime?: SortOrder
  }

  export type SessionWhereUniqueInput = {
    sessionId?: string
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SessionScalarWhereWithAggregatesInput>
    OR?: Enumerable<SessionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SessionScalarWhereWithAggregatesInput>
    sessionId?: StringWithAggregatesFilter | string
    emailAddress?: StringNullableWithAggregatesFilter | string | null
    ethAddress?: StringNullableWithAggregatesFilter | string | null
    challengeHash?: StringNullableWithAggregatesFilter | string | null
    signature?: StringNullableWithAggregatesFilter | string | null
    profileId?: IntNullableWithAggregatesFilter | number | null
    issuedBy?: StringWithAggregatesFilter | string
    jti?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    validFrom?: DateTimeNullableWithAggregatesFilter | Date | string | null
    endedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    endReason?: StringNullableWithAggregatesFilter | string | null
    maxLifetime?: IntWithAggregatesFilter | number
  }

  export type InvitationWhereInput = {
    AND?: Enumerable<InvitationWhereInput>
    OR?: Enumerable<InvitationWhereInput>
    NOT?: Enumerable<InvitationWhereInput>
    id?: IntFilter | number
    createdBy?: XOR<ProfileRelationFilter, ProfileWhereInput>
    createdByProfileId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    name?: StringFilter | string
    code?: StringFilter | string
    claimedBy?: XOR<ProfileRelationFilter, ProfileWhereInput> | null
    claimedByProfileId?: IntNullableFilter | number | null
    claimedAt?: DateTimeNullableFilter | Date | string | null
    redeemedBy?: XOR<ProfileRelationFilter, ProfileWhereInput> | null
    redeemedByProfileId?: IntNullableFilter | number | null
    redeemedAt?: DateTimeNullableFilter | Date | string | null
    redeemTxHash?: StringNullableFilter | string | null
    address?: StringFilter | string
    key?: StringFilter | string
    indexedTransactions?: RedeemInvitationRequestListRelationFilter
  }

  export type InvitationOrderByInput = {
    id?: SortOrder
    createdByProfileId?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    code?: SortOrder
    claimedByProfileId?: SortOrder
    claimedAt?: SortOrder
    redeemedByProfileId?: SortOrder
    redeemedAt?: SortOrder
    redeemTxHash?: SortOrder
    address?: SortOrder
    key?: SortOrder
  }

  export type InvitationWhereUniqueInput = {
    id?: number
  }

  export type InvitationScalarWhereWithAggregatesInput = {
    AND?: Enumerable<InvitationScalarWhereWithAggregatesInput>
    OR?: Enumerable<InvitationScalarWhereWithAggregatesInput>
    NOT?: Enumerable<InvitationScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdByProfileId?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    name?: StringWithAggregatesFilter | string
    code?: StringWithAggregatesFilter | string
    claimedByProfileId?: IntNullableWithAggregatesFilter | number | null
    claimedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    redeemedByProfileId?: IntNullableWithAggregatesFilter | number | null
    redeemedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    redeemTxHash?: StringNullableWithAggregatesFilter | string | null
    address?: StringWithAggregatesFilter | string
    key?: StringWithAggregatesFilter | string
  }

  export type RedeemInvitationRequestWhereInput = {
    AND?: Enumerable<RedeemInvitationRequestWhereInput>
    OR?: Enumerable<RedeemInvitationRequestWhereInput>
    NOT?: Enumerable<RedeemInvitationRequestWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    createdBy?: XOR<ProfileRelationFilter, ProfileWhereInput>
    createdByProfileId?: IntFilter | number
    workerProcess?: StringNullableFilter | string | null
    pickedAt?: DateTimeNullableFilter | Date | string | null
    invitationToRedeem?: XOR<InvitationRelationFilter, InvitationWhereInput>
    invitationToRedeemId?: IntFilter | number
  }

  export type RedeemInvitationRequestOrderByInput = {
    id?: SortOrder
    createdAt?: SortOrder
    createdByProfileId?: SortOrder
    workerProcess?: SortOrder
    pickedAt?: SortOrder
    invitationToRedeemId?: SortOrder
  }

  export type RedeemInvitationRequestWhereUniqueInput = {
    id?: number
  }

  export type RedeemInvitationRequestScalarWhereWithAggregatesInput = {
    AND?: Enumerable<RedeemInvitationRequestScalarWhereWithAggregatesInput>
    OR?: Enumerable<RedeemInvitationRequestScalarWhereWithAggregatesInput>
    NOT?: Enumerable<RedeemInvitationRequestScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    createdByProfileId?: IntWithAggregatesFilter | number
    workerProcess?: StringNullableWithAggregatesFilter | string | null
    pickedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    invitationToRedeemId?: IntWithAggregatesFilter | number
  }

  export type ProfileWhereInput = {
    AND?: Enumerable<ProfileWhereInput>
    OR?: Enumerable<ProfileWhereInput>
    NOT?: Enumerable<ProfileWhereInput>
    id?: IntFilter | number
    lastUpdateAt?: DateTimeFilter | Date | string
    emailAddress?: StringNullableFilter | string | null
    status?: StringNullableFilter | string | null
    type?: EnumProfileTypeNullableFilter | ProfileType | null
    circlesAddress?: StringNullableFilter | string | null
    circlesSafeOwner?: StringNullableFilter | string | null
    circlesTokenAddress?: StringNullableFilter | string | null
    firstName?: StringFilter | string
    lastName?: StringNullableFilter | string | null
    avatarUrl?: StringNullableFilter | string | null
    avatarCid?: StringNullableFilter | string | null
    avatarMimeType?: StringNullableFilter | string | null
    dream?: StringNullableFilter | string | null
    country?: StringNullableFilter | string | null
    newsletter?: BoolNullableFilter | boolean | null
    displayTimeCircles?: BoolNullableFilter | boolean | null
    cityGeonameid?: IntNullableFilter | number | null
    lastAcknowledged?: DateTimeNullableFilter | Date | string | null
    verifySafeChallenge?: StringNullableFilter | string | null
    newSafeAddress?: StringNullableFilter | string | null
    sessions?: SessionListRelationFilter
    tags?: TagListRelationFilter
    offers?: OfferListRelationFilter
    purchases?: PurchaseListRelationFilter
    invitations?: InvitationListRelationFilter
    redeemInvitationRequests?: RedeemInvitationRequestListRelationFilter
    redeemedInvitations?: InvitationListRelationFilter
    claimedInvitations?: InvitationListRelationFilter
    subscribers?: SubscriptionListRelationFilter
    subscriptions?: SubscriptionListRelationFilter
    memberships?: MembershipListRelationFilter
    members?: MembershipListRelationFilter
  }

  export type ProfileOrderByInput = {
    id?: SortOrder
    lastUpdateAt?: SortOrder
    emailAddress?: SortOrder
    status?: SortOrder
    type?: SortOrder
    circlesAddress?: SortOrder
    circlesSafeOwner?: SortOrder
    circlesTokenAddress?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatarUrl?: SortOrder
    avatarCid?: SortOrder
    avatarMimeType?: SortOrder
    dream?: SortOrder
    country?: SortOrder
    newsletter?: SortOrder
    displayTimeCircles?: SortOrder
    cityGeonameid?: SortOrder
    lastAcknowledged?: SortOrder
    verifySafeChallenge?: SortOrder
    newSafeAddress?: SortOrder
  }

  export type ProfileWhereUniqueInput = {
    id?: number
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProfileScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProfileScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProfileScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    lastUpdateAt?: DateTimeWithAggregatesFilter | Date | string
    emailAddress?: StringNullableWithAggregatesFilter | string | null
    status?: StringNullableWithAggregatesFilter | string | null
    type?: EnumProfileTypeNullableWithAggregatesFilter | ProfileType | null
    circlesAddress?: StringNullableWithAggregatesFilter | string | null
    circlesSafeOwner?: StringNullableWithAggregatesFilter | string | null
    circlesTokenAddress?: StringNullableWithAggregatesFilter | string | null
    firstName?: StringWithAggregatesFilter | string
    lastName?: StringNullableWithAggregatesFilter | string | null
    avatarUrl?: StringNullableWithAggregatesFilter | string | null
    avatarCid?: StringNullableWithAggregatesFilter | string | null
    avatarMimeType?: StringNullableWithAggregatesFilter | string | null
    dream?: StringNullableWithAggregatesFilter | string | null
    country?: StringNullableWithAggregatesFilter | string | null
    newsletter?: BoolNullableWithAggregatesFilter | boolean | null
    displayTimeCircles?: BoolNullableWithAggregatesFilter | boolean | null
    cityGeonameid?: IntNullableWithAggregatesFilter | number | null
    lastAcknowledged?: DateTimeNullableWithAggregatesFilter | Date | string | null
    verifySafeChallenge?: StringNullableWithAggregatesFilter | string | null
    newSafeAddress?: StringNullableWithAggregatesFilter | string | null
  }

  export type MembershipWhereInput = {
    AND?: Enumerable<MembershipWhereInput>
    OR?: Enumerable<MembershipWhereInput>
    NOT?: Enumerable<MembershipWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    memberId?: IntFilter | number
    member?: XOR<ProfileRelationFilter, ProfileWhereInput>
    memberAtId?: IntFilter | number
    memberAt?: XOR<ProfileRelationFilter, ProfileWhereInput>
  }

  export type MembershipOrderByInput = {
    id?: SortOrder
    createdAt?: SortOrder
    memberId?: SortOrder
    memberAtId?: SortOrder
  }

  export type MembershipWhereUniqueInput = {
    id?: number
  }

  export type MembershipScalarWhereWithAggregatesInput = {
    AND?: Enumerable<MembershipScalarWhereWithAggregatesInput>
    OR?: Enumerable<MembershipScalarWhereWithAggregatesInput>
    NOT?: Enumerable<MembershipScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    memberId?: IntWithAggregatesFilter | number
    memberAtId?: IntWithAggregatesFilter | number
  }

  export type SubscriptionWhereInput = {
    AND?: Enumerable<SubscriptionWhereInput>
    OR?: Enumerable<SubscriptionWhereInput>
    NOT?: Enumerable<SubscriptionWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    subscriber?: XOR<ProfileRelationFilter, ProfileWhereInput>
    subscriberProfileId?: IntFilter | number
    subscribingToOffer?: XOR<OfferRelationFilter, OfferWhereInput> | null
    subscribingToOfferId?: IntNullableFilter | number | null
    subscribingToProfile?: XOR<ProfileRelationFilter, ProfileWhereInput> | null
    subscribingToProfileId?: IntNullableFilter | number | null
  }

  export type SubscriptionOrderByInput = {
    id?: SortOrder
    createdAt?: SortOrder
    subscriberProfileId?: SortOrder
    subscribingToOfferId?: SortOrder
    subscribingToProfileId?: SortOrder
  }

  export type SubscriptionWhereUniqueInput = {
    id?: number
  }

  export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SubscriptionScalarWhereWithAggregatesInput>
    OR?: Enumerable<SubscriptionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SubscriptionScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    subscriberProfileId?: IntWithAggregatesFilter | number
    subscribingToOfferId?: IntNullableWithAggregatesFilter | number | null
    subscribingToProfileId?: IntNullableWithAggregatesFilter | number | null
  }

  export type ChatMessageWhereInput = {
    AND?: Enumerable<ChatMessageWhereInput>
    OR?: Enumerable<ChatMessageWhereInput>
    NOT?: Enumerable<ChatMessageWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    from?: StringFilter | string
    to?: StringFilter | string
    text?: StringFilter | string
    tags?: TagListRelationFilter
  }

  export type ChatMessageOrderByInput = {
    id?: SortOrder
    createdAt?: SortOrder
    from?: SortOrder
    to?: SortOrder
    text?: SortOrder
  }

  export type ChatMessageWhereUniqueInput = {
    id?: number
  }

  export type ChatMessageScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ChatMessageScalarWhereWithAggregatesInput>
    OR?: Enumerable<ChatMessageScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ChatMessageScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    from?: StringWithAggregatesFilter | string
    to?: StringWithAggregatesFilter | string
    text?: StringWithAggregatesFilter | string
  }

  export type DelegatedChallengesWhereInput = {
    AND?: Enumerable<DelegatedChallengesWhereInput>
    OR?: Enumerable<DelegatedChallengesWhereInput>
    NOT?: Enumerable<DelegatedChallengesWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    appId?: StringFilter | string
    sessionId?: StringFilter | string
    requestValidTo?: DateTimeFilter | Date | string
    delegateAuthCode?: StringFilter | string
    challenge?: StringNullableFilter | string | null
    challengeDepositedAt?: DateTimeNullableFilter | Date | string | null
    challengeValidTo?: DateTimeNullableFilter | Date | string | null
    challengedReadAt?: DateTimeNullableFilter | Date | string | null
  }

  export type DelegatedChallengesOrderByInput = {
    id?: SortOrder
    createdAt?: SortOrder
    appId?: SortOrder
    sessionId?: SortOrder
    requestValidTo?: SortOrder
    delegateAuthCode?: SortOrder
    challenge?: SortOrder
    challengeDepositedAt?: SortOrder
    challengeValidTo?: SortOrder
    challengedReadAt?: SortOrder
  }

  export type DelegatedChallengesWhereUniqueInput = {
    id?: number
    delegateAuthCode?: string
  }

  export type DelegatedChallengesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DelegatedChallengesScalarWhereWithAggregatesInput>
    OR?: Enumerable<DelegatedChallengesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DelegatedChallengesScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    appId?: StringWithAggregatesFilter | string
    sessionId?: StringWithAggregatesFilter | string
    requestValidTo?: DateTimeWithAggregatesFilter | Date | string
    delegateAuthCode?: StringWithAggregatesFilter | string
    challenge?: StringNullableWithAggregatesFilter | string | null
    challengeDepositedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    challengeValidTo?: DateTimeNullableWithAggregatesFilter | Date | string | null
    challengedReadAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type OfferWhereInput = {
    AND?: Enumerable<OfferWhereInput>
    OR?: Enumerable<OfferWhereInput>
    NOT?: Enumerable<OfferWhereInput>
    id?: IntFilter | number
    createdBy?: XOR<ProfileRelationFilter, ProfileWhereInput>
    createdByProfileId?: IntFilter | number
    publishedAt?: DateTimeFilter | Date | string
    unlistedAt?: DateTimeNullableFilter | Date | string | null
    purchases?: PurchaseListRelationFilter
    title?: StringFilter | string
    pictureUrl?: StringNullableFilter | string | null
    pictureMimeType?: StringNullableFilter | string | null
    description?: StringNullableFilter | string | null
    categoryTag?: XOR<TagRelationFilter, TagWhereInput>
    categoryTagId?: IntFilter | number
    geonameid?: IntFilter | number
    pricePerUnit?: StringFilter | string
    unitTag?: XOR<TagRelationFilter, TagWhereInput>
    unitTagId?: IntFilter | number
    maxUnits?: IntNullableFilter | number | null
    deliveryTermsTag?: XOR<TagRelationFilter, TagWhereInput>
    deliveryTermsTagId?: IntFilter | number
    subscribers?: SubscriptionListRelationFilter
  }

  export type OfferOrderByInput = {
    id?: SortOrder
    createdByProfileId?: SortOrder
    publishedAt?: SortOrder
    unlistedAt?: SortOrder
    title?: SortOrder
    pictureUrl?: SortOrder
    pictureMimeType?: SortOrder
    description?: SortOrder
    categoryTagId?: SortOrder
    geonameid?: SortOrder
    pricePerUnit?: SortOrder
    unitTagId?: SortOrder
    maxUnits?: SortOrder
    deliveryTermsTagId?: SortOrder
  }

  export type OfferWhereUniqueInput = {
    id?: number
  }

  export type OfferScalarWhereWithAggregatesInput = {
    AND?: Enumerable<OfferScalarWhereWithAggregatesInput>
    OR?: Enumerable<OfferScalarWhereWithAggregatesInput>
    NOT?: Enumerable<OfferScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdByProfileId?: IntWithAggregatesFilter | number
    publishedAt?: DateTimeWithAggregatesFilter | Date | string
    unlistedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    title?: StringWithAggregatesFilter | string
    pictureUrl?: StringNullableWithAggregatesFilter | string | null
    pictureMimeType?: StringNullableWithAggregatesFilter | string | null
    description?: StringNullableWithAggregatesFilter | string | null
    categoryTagId?: IntWithAggregatesFilter | number
    geonameid?: IntWithAggregatesFilter | number
    pricePerUnit?: StringWithAggregatesFilter | string
    unitTagId?: IntWithAggregatesFilter | number
    maxUnits?: IntNullableWithAggregatesFilter | number | null
    deliveryTermsTagId?: IntWithAggregatesFilter | number
  }

  export type PurchaseWhereInput = {
    AND?: Enumerable<PurchaseWhereInput>
    OR?: Enumerable<PurchaseWhereInput>
    NOT?: Enumerable<PurchaseWhereInput>
    id?: IntFilter | number
    purchasedBy?: XOR<ProfileRelationFilter, ProfileWhereInput>
    purchasedByProfileId?: IntFilter | number
    purchasedAt?: DateTimeFilter | Date | string
    purchasedProvenAt?: DateTimeNullableFilter | Date | string | null
    purchasedItem?: XOR<OfferRelationFilter, OfferWhereInput>
    purchasedItemId?: IntFilter | number
    purchasedItemTitle?: StringFilter | string
    pricePerUnit?: StringFilter | string
    purchasedUnits?: IntFilter | number
    grandTotal?: StringFilter | string
    purchasedItemVat?: IntFilter | number
    status?: EnumPurchaseStatusFilter | PurchaseStatus
    jobs?: TransactionJobsListRelationFilter
  }

  export type PurchaseOrderByInput = {
    id?: SortOrder
    purchasedByProfileId?: SortOrder
    purchasedAt?: SortOrder
    purchasedProvenAt?: SortOrder
    purchasedItemId?: SortOrder
    purchasedItemTitle?: SortOrder
    pricePerUnit?: SortOrder
    purchasedUnits?: SortOrder
    grandTotal?: SortOrder
    purchasedItemVat?: SortOrder
    status?: SortOrder
  }

  export type PurchaseWhereUniqueInput = {
    id?: number
  }

  export type PurchaseScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PurchaseScalarWhereWithAggregatesInput>
    OR?: Enumerable<PurchaseScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PurchaseScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    purchasedByProfileId?: IntWithAggregatesFilter | number
    purchasedAt?: DateTimeWithAggregatesFilter | Date | string
    purchasedProvenAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    purchasedItemId?: IntWithAggregatesFilter | number
    purchasedItemTitle?: StringWithAggregatesFilter | string
    pricePerUnit?: StringWithAggregatesFilter | string
    purchasedUnits?: IntWithAggregatesFilter | number
    grandTotal?: StringWithAggregatesFilter | string
    purchasedItemVat?: IntWithAggregatesFilter | number
    status?: EnumPurchaseStatusWithAggregatesFilter | PurchaseStatus
  }

  export type TransactionJobsWhereInput = {
    AND?: Enumerable<TransactionJobsWhereInput>
    OR?: Enumerable<TransactionJobsWhereInput>
    NOT?: Enumerable<TransactionJobsWhereInput>
    id?: IntFilter | number
    transactionhash?: StringFilter | string
    status?: StringFilter | string
    user?: StringFilter | string
    purchase?: XOR<PurchaseRelationFilter, PurchaseWhereInput>
    purchaseId?: IntFilter | number
  }

  export type TransactionJobsOrderByInput = {
    id?: SortOrder
    transactionhash?: SortOrder
    status?: SortOrder
    user?: SortOrder
    purchaseId?: SortOrder
  }

  export type TransactionJobsWhereUniqueInput = {
    id?: number
  }

  export type TransactionJobsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TransactionJobsScalarWhereWithAggregatesInput>
    OR?: Enumerable<TransactionJobsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TransactionJobsScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    transactionhash?: StringWithAggregatesFilter | string
    status?: StringWithAggregatesFilter | string
    user?: StringWithAggregatesFilter | string
    purchaseId?: IntWithAggregatesFilter | number
  }

  export type TagTypeWhereInput = {
    AND?: Enumerable<TagTypeWhereInput>
    OR?: Enumerable<TagTypeWhereInput>
    NOT?: Enumerable<TagTypeWhereInput>
    id?: StringFilter | string
    tags?: TagListRelationFilter
  }

  export type TagTypeOrderByInput = {
    id?: SortOrder
  }

  export type TagTypeWhereUniqueInput = {
    id?: string
  }

  export type TagTypeScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TagTypeScalarWhereWithAggregatesInput>
    OR?: Enumerable<TagTypeScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TagTypeScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
  }

  export type TransactionWhereInput = {
    AND?: Enumerable<TransactionWhereInput>
    OR?: Enumerable<TransactionWhereInput>
    NOT?: Enumerable<TransactionWhereInput>
    transactionHash?: StringFilter | string
    tags?: TagListRelationFilter
  }

  export type TransactionOrderByInput = {
    transactionHash?: SortOrder
  }

  export type TransactionWhereUniqueInput = {
    transactionHash?: string
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TransactionScalarWhereWithAggregatesInput>
    OR?: Enumerable<TransactionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TransactionScalarWhereWithAggregatesInput>
    transactionHash?: StringWithAggregatesFilter | string
  }

  export type TagWhereInput = {
    AND?: Enumerable<TagWhereInput>
    OR?: Enumerable<TagWhereInput>
    NOT?: Enumerable<TagWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    createdBy?: XOR<ProfileRelationFilter, ProfileWhereInput>
    createdByProfileId?: IntFilter | number
    isPrivate?: BoolFilter | boolean
    transaction?: XOR<TransactionRelationFilter, TransactionWhereInput> | null
    transactionHash?: StringNullableFilter | string | null
    type?: XOR<TagTypeRelationFilter, TagTypeWhereInput>
    typeId?: StringFilter | string
    chatMessage?: XOR<ChatMessageRelationFilter, ChatMessageWhereInput> | null
    chatMessageId?: IntNullableFilter | number | null
    value?: StringNullableFilter | string | null
    offerCategory?: OfferListRelationFilter
    offerUnit?: OfferListRelationFilter
    offerDeliveryTerms?: OfferListRelationFilter
  }

  export type TagOrderByInput = {
    id?: SortOrder
    createdAt?: SortOrder
    createdByProfileId?: SortOrder
    isPrivate?: SortOrder
    transactionHash?: SortOrder
    typeId?: SortOrder
    chatMessageId?: SortOrder
    value?: SortOrder
  }

  export type TagWhereUniqueInput = {
    id?: number
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TagScalarWhereWithAggregatesInput>
    OR?: Enumerable<TagScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TagScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    createdByProfileId?: IntWithAggregatesFilter | number
    isPrivate?: BoolWithAggregatesFilter | boolean
    transactionHash?: StringNullableWithAggregatesFilter | string | null
    typeId?: StringWithAggregatesFilter | string
    chatMessageId?: IntNullableWithAggregatesFilter | number | null
    value?: StringNullableWithAggregatesFilter | string | null
  }

  export type SessionCreateInput = {
    sessionId: string
    emailAddress?: string | null
    ethAddress?: string | null
    challengeHash?: string | null
    signature?: string | null
    issuedBy: string
    jti?: string | null
    createdAt: Date | string
    validFrom?: Date | string | null
    endedAt?: Date | string | null
    endReason?: string | null
    maxLifetime: number
    profile?: ProfileCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    sessionId: string
    emailAddress?: string | null
    ethAddress?: string | null
    challengeHash?: string | null
    signature?: string | null
    profileId?: number | null
    issuedBy: string
    jti?: string | null
    createdAt: Date | string
    validFrom?: Date | string | null
    endedAt?: Date | string | null
    endReason?: string | null
    maxLifetime: number
  }

  export type SessionUpdateInput = {
    sessionId?: StringFieldUpdateOperationsInput | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    ethAddress?: NullableStringFieldUpdateOperationsInput | string | null
    challengeHash?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    issuedBy?: StringFieldUpdateOperationsInput | string
    jti?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    validFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    maxLifetime?: IntFieldUpdateOperationsInput | number
    profile?: ProfileUpdateOneWithoutSessionsInput
  }

  export type SessionUncheckedUpdateInput = {
    sessionId?: StringFieldUpdateOperationsInput | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    ethAddress?: NullableStringFieldUpdateOperationsInput | string | null
    challengeHash?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    profileId?: NullableIntFieldUpdateOperationsInput | number | null
    issuedBy?: StringFieldUpdateOperationsInput | string
    jti?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    validFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    maxLifetime?: IntFieldUpdateOperationsInput | number
  }

  export type SessionCreateManyInput = {
    sessionId: string
    emailAddress?: string | null
    ethAddress?: string | null
    challengeHash?: string | null
    signature?: string | null
    profileId?: number | null
    issuedBy: string
    jti?: string | null
    createdAt: Date | string
    validFrom?: Date | string | null
    endedAt?: Date | string | null
    endReason?: string | null
    maxLifetime: number
  }

  export type SessionUpdateManyMutationInput = {
    sessionId?: StringFieldUpdateOperationsInput | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    ethAddress?: NullableStringFieldUpdateOperationsInput | string | null
    challengeHash?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    issuedBy?: StringFieldUpdateOperationsInput | string
    jti?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    validFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    maxLifetime?: IntFieldUpdateOperationsInput | number
  }

  export type SessionUncheckedUpdateManyInput = {
    sessionId?: StringFieldUpdateOperationsInput | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    ethAddress?: NullableStringFieldUpdateOperationsInput | string | null
    challengeHash?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    profileId?: NullableIntFieldUpdateOperationsInput | number | null
    issuedBy?: StringFieldUpdateOperationsInput | string
    jti?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    validFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    maxLifetime?: IntFieldUpdateOperationsInput | number
  }

  export type InvitationCreateInput = {
    createdAt: Date | string
    name: string
    code: string
    claimedAt?: Date | string | null
    redeemedAt?: Date | string | null
    redeemTxHash?: string | null
    address: string
    key: string
    createdBy: ProfileCreateNestedOneWithoutInvitationsInput
    claimedBy?: ProfileCreateNestedOneWithoutClaimedInvitationsInput
    redeemedBy?: ProfileCreateNestedOneWithoutRedeemedInvitationsInput
    indexedTransactions?: RedeemInvitationRequestCreateNestedManyWithoutInvitationToRedeemInput
  }

  export type InvitationUncheckedCreateInput = {
    id?: number
    createdByProfileId: number
    createdAt: Date | string
    name: string
    code: string
    claimedByProfileId?: number | null
    claimedAt?: Date | string | null
    redeemedByProfileId?: number | null
    redeemedAt?: Date | string | null
    redeemTxHash?: string | null
    address: string
    key: string
    indexedTransactions?: RedeemInvitationRequestUncheckedCreateNestedManyWithoutInvitationToRedeemInput
  }

  export type InvitationUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    createdBy?: ProfileUpdateOneRequiredWithoutInvitationsInput
    claimedBy?: ProfileUpdateOneWithoutClaimedInvitationsInput
    redeemedBy?: ProfileUpdateOneWithoutRedeemedInvitationsInput
    indexedTransactions?: RedeemInvitationRequestUpdateManyWithoutInvitationToRedeemInput
  }

  export type InvitationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    claimedByProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedByProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    indexedTransactions?: RedeemInvitationRequestUncheckedUpdateManyWithoutInvitationToRedeemInput
  }

  export type InvitationCreateManyInput = {
    id?: number
    createdByProfileId: number
    createdAt: Date | string
    name: string
    code: string
    claimedByProfileId?: number | null
    claimedAt?: Date | string | null
    redeemedByProfileId?: number | null
    redeemedAt?: Date | string | null
    redeemTxHash?: string | null
    address: string
    key: string
  }

  export type InvitationUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
  }

  export type InvitationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    claimedByProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedByProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
  }

  export type RedeemInvitationRequestCreateInput = {
    createdAt: Date | string
    workerProcess?: string | null
    pickedAt?: Date | string | null
    createdBy: ProfileCreateNestedOneWithoutRedeemInvitationRequestsInput
    invitationToRedeem: InvitationCreateNestedOneWithoutIndexedTransactionsInput
  }

  export type RedeemInvitationRequestUncheckedCreateInput = {
    id?: number
    createdAt: Date | string
    createdByProfileId: number
    workerProcess?: string | null
    pickedAt?: Date | string | null
    invitationToRedeemId: number
  }

  export type RedeemInvitationRequestUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workerProcess?: NullableStringFieldUpdateOperationsInput | string | null
    pickedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: ProfileUpdateOneRequiredWithoutRedeemInvitationRequestsInput
    invitationToRedeem?: InvitationUpdateOneRequiredWithoutIndexedTransactionsInput
  }

  export type RedeemInvitationRequestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    workerProcess?: NullableStringFieldUpdateOperationsInput | string | null
    pickedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitationToRedeemId?: IntFieldUpdateOperationsInput | number
  }

  export type RedeemInvitationRequestCreateManyInput = {
    id?: number
    createdAt: Date | string
    createdByProfileId: number
    workerProcess?: string | null
    pickedAt?: Date | string | null
    invitationToRedeemId: number
  }

  export type RedeemInvitationRequestUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workerProcess?: NullableStringFieldUpdateOperationsInput | string | null
    pickedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RedeemInvitationRequestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    workerProcess?: NullableStringFieldUpdateOperationsInput | string | null
    pickedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitationToRedeemId?: IntFieldUpdateOperationsInput | number
  }

  export type ProfileCreateInput = {
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionCreateNestedManyWithoutProfileInput
    tags?: TagCreateNestedManyWithoutCreatedByInput
    offers?: OfferCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipCreateNestedManyWithoutMemberInput
    members?: MembershipCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: number
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutProfileInput
    tags?: TagUncheckedCreateNestedManyWithoutCreatedByInput
    offers?: OfferUncheckedCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutMemberInput
    members?: MembershipUncheckedCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileUpdateInput = {
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutProfileInput
    tags?: TagUpdateManyWithoutCreatedByInput
    offers?: OfferUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUpdateManyWithoutSubscriberInput
    memberships?: MembershipUpdateManyWithoutMemberInput
    members?: MembershipUpdateManyWithoutMemberAtInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutProfileInput
    tags?: TagUncheckedUpdateManyWithoutCreatedByInput
    offers?: OfferUncheckedUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutSubscriberInput
    memberships?: MembershipUncheckedUpdateManyWithoutMemberInput
    members?: MembershipUncheckedUpdateManyWithoutMemberAtInput
  }

  export type ProfileCreateManyInput = {
    id?: number
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
  }

  export type ProfileUpdateManyMutationInput = {
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MembershipCreateInput = {
    createdAt?: Date | string
    member: ProfileCreateNestedOneWithoutMembershipsInput
    memberAt: ProfileCreateNestedOneWithoutMembersInput
  }

  export type MembershipUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    memberId: number
    memberAtId: number
  }

  export type MembershipUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: ProfileUpdateOneRequiredWithoutMembershipsInput
    memberAt?: ProfileUpdateOneRequiredWithoutMembersInput
  }

  export type MembershipUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberId?: IntFieldUpdateOperationsInput | number
    memberAtId?: IntFieldUpdateOperationsInput | number
  }

  export type MembershipCreateManyInput = {
    id?: number
    createdAt?: Date | string
    memberId: number
    memberAtId: number
  }

  export type MembershipUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembershipUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberId?: IntFieldUpdateOperationsInput | number
    memberAtId?: IntFieldUpdateOperationsInput | number
  }

  export type SubscriptionCreateInput = {
    createdAt: Date | string
    subscribingToOfferId?: number | null
    subscribingToProfileId?: number | null
    subscriber: ProfileCreateNestedOneWithoutSubscriptionsInput
    subscribingToOffer?: OfferCreateNestedOneWithoutSubscribersInput
    subscribingToProfile?: ProfileCreateNestedOneWithoutSubscribersInput
  }

  export type SubscriptionUncheckedCreateInput = {
    id?: number
    createdAt: Date | string
    subscriberProfileId: number
    subscribingToOfferId?: number | null
    subscribingToProfileId?: number | null
  }

  export type SubscriptionUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribingToOfferId?: NullableIntFieldUpdateOperationsInput | number | null
    subscribingToProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    subscriber?: ProfileUpdateOneRequiredWithoutSubscriptionsInput
    subscribingToOffer?: OfferUpdateOneWithoutSubscribersInput
    subscribingToProfile?: ProfileUpdateOneWithoutSubscribersInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriberProfileId?: IntFieldUpdateOperationsInput | number
    subscribingToOfferId?: NullableIntFieldUpdateOperationsInput | number | null
    subscribingToProfileId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SubscriptionCreateManyInput = {
    id?: number
    createdAt: Date | string
    subscriberProfileId: number
    subscribingToOfferId?: number | null
    subscribingToProfileId?: number | null
  }

  export type SubscriptionUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribingToOfferId?: NullableIntFieldUpdateOperationsInput | number | null
    subscribingToProfileId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriberProfileId?: IntFieldUpdateOperationsInput | number
    subscribingToOfferId?: NullableIntFieldUpdateOperationsInput | number | null
    subscribingToProfileId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ChatMessageCreateInput = {
    createdAt: Date | string
    from: string
    to: string
    text: string
    tags?: TagCreateNestedManyWithoutChatMessageInput
  }

  export type ChatMessageUncheckedCreateInput = {
    id?: number
    createdAt: Date | string
    from: string
    to: string
    text: string
    tags?: TagUncheckedCreateNestedManyWithoutChatMessageInput
  }

  export type ChatMessageUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    tags?: TagUpdateManyWithoutChatMessageInput
  }

  export type ChatMessageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    tags?: TagUncheckedUpdateManyWithoutChatMessageInput
  }

  export type ChatMessageCreateManyInput = {
    id?: number
    createdAt: Date | string
    from: string
    to: string
    text: string
  }

  export type ChatMessageUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type ChatMessageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type DelegatedChallengesCreateInput = {
    createdAt: Date | string
    appId: string
    sessionId: string
    requestValidTo: Date | string
    delegateAuthCode: string
    challenge?: string | null
    challengeDepositedAt?: Date | string | null
    challengeValidTo?: Date | string | null
    challengedReadAt?: Date | string | null
  }

  export type DelegatedChallengesUncheckedCreateInput = {
    id?: number
    createdAt: Date | string
    appId: string
    sessionId: string
    requestValidTo: Date | string
    delegateAuthCode: string
    challenge?: string | null
    challengeDepositedAt?: Date | string | null
    challengeValidTo?: Date | string | null
    challengedReadAt?: Date | string | null
  }

  export type DelegatedChallengesUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    requestValidTo?: DateTimeFieldUpdateOperationsInput | Date | string
    delegateAuthCode?: StringFieldUpdateOperationsInput | string
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    challengeDepositedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    challengeValidTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    challengedReadAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DelegatedChallengesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    requestValidTo?: DateTimeFieldUpdateOperationsInput | Date | string
    delegateAuthCode?: StringFieldUpdateOperationsInput | string
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    challengeDepositedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    challengeValidTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    challengedReadAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DelegatedChallengesCreateManyInput = {
    id?: number
    createdAt: Date | string
    appId: string
    sessionId: string
    requestValidTo: Date | string
    delegateAuthCode: string
    challenge?: string | null
    challengeDepositedAt?: Date | string | null
    challengeValidTo?: Date | string | null
    challengedReadAt?: Date | string | null
  }

  export type DelegatedChallengesUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    requestValidTo?: DateTimeFieldUpdateOperationsInput | Date | string
    delegateAuthCode?: StringFieldUpdateOperationsInput | string
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    challengeDepositedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    challengeValidTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    challengedReadAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DelegatedChallengesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    requestValidTo?: DateTimeFieldUpdateOperationsInput | Date | string
    delegateAuthCode?: StringFieldUpdateOperationsInput | string
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    challengeDepositedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    challengeValidTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    challengedReadAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OfferCreateInput = {
    publishedAt: Date | string
    unlistedAt?: Date | string | null
    title: string
    pictureUrl?: string | null
    pictureMimeType?: string | null
    description?: string | null
    geonameid: number
    pricePerUnit: string
    maxUnits?: number | null
    createdBy: ProfileCreateNestedOneWithoutOffersInput
    purchases?: PurchaseCreateNestedManyWithoutPurchasedItemInput
    categoryTag: TagCreateNestedOneWithoutOfferCategoryInput
    unitTag: TagCreateNestedOneWithoutOfferUnitInput
    deliveryTermsTag: TagCreateNestedOneWithoutOfferDeliveryTermsInput
    subscribers?: SubscriptionCreateNestedManyWithoutSubscribingToOfferInput
  }

  export type OfferUncheckedCreateInput = {
    id?: number
    createdByProfileId: number
    publishedAt: Date | string
    unlistedAt?: Date | string | null
    title: string
    pictureUrl?: string | null
    pictureMimeType?: string | null
    description?: string | null
    categoryTagId: number
    geonameid: number
    pricePerUnit: string
    unitTagId: number
    maxUnits?: number | null
    deliveryTermsTagId: number
    purchases?: PurchaseUncheckedCreateNestedManyWithoutPurchasedItemInput
    subscribers?: SubscriptionUncheckedCreateNestedManyWithoutSubscribingToOfferInput
  }

  export type OfferUpdateInput = {
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
    createdBy?: ProfileUpdateOneRequiredWithoutOffersInput
    purchases?: PurchaseUpdateManyWithoutPurchasedItemInput
    categoryTag?: TagUpdateOneRequiredWithoutOfferCategoryInput
    unitTag?: TagUpdateOneRequiredWithoutOfferUnitInput
    deliveryTermsTag?: TagUpdateOneRequiredWithoutOfferDeliveryTermsInput
    subscribers?: SubscriptionUpdateManyWithoutSubscribingToOfferInput
  }

  export type OfferUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryTagId?: IntFieldUpdateOperationsInput | number
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    unitTagId?: IntFieldUpdateOperationsInput | number
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryTermsTagId?: IntFieldUpdateOperationsInput | number
    purchases?: PurchaseUncheckedUpdateManyWithoutPurchasedItemInput
    subscribers?: SubscriptionUncheckedUpdateManyWithoutSubscribingToOfferInput
  }

  export type OfferCreateManyInput = {
    id?: number
    createdByProfileId: number
    publishedAt: Date | string
    unlistedAt?: Date | string | null
    title: string
    pictureUrl?: string | null
    pictureMimeType?: string | null
    description?: string | null
    categoryTagId: number
    geonameid: number
    pricePerUnit: string
    unitTagId: number
    maxUnits?: number | null
    deliveryTermsTagId: number
  }

  export type OfferUpdateManyMutationInput = {
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type OfferUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryTagId?: IntFieldUpdateOperationsInput | number
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    unitTagId?: IntFieldUpdateOperationsInput | number
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryTermsTagId?: IntFieldUpdateOperationsInput | number
  }

  export type PurchaseCreateInput = {
    purchasedAt: Date | string
    purchasedProvenAt?: Date | string | null
    purchasedItemTitle: string
    pricePerUnit: string
    purchasedUnits: number
    grandTotal: string
    purchasedItemVat: number
    status: PurchaseStatus
    purchasedBy: ProfileCreateNestedOneWithoutPurchasesInput
    purchasedItem: OfferCreateNestedOneWithoutPurchasesInput
    jobs?: TransactionJobsCreateNestedManyWithoutPurchaseInput
  }

  export type PurchaseUncheckedCreateInput = {
    id?: number
    purchasedByProfileId: number
    purchasedAt: Date | string
    purchasedProvenAt?: Date | string | null
    purchasedItemId: number
    purchasedItemTitle: string
    pricePerUnit: string
    purchasedUnits: number
    grandTotal: string
    purchasedItemVat: number
    status: PurchaseStatus
    jobs?: TransactionJobsUncheckedCreateNestedManyWithoutPurchaseInput
  }

  export type PurchaseUpdateInput = {
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasedProvenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchasedItemTitle?: StringFieldUpdateOperationsInput | string
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    purchasedUnits?: IntFieldUpdateOperationsInput | number
    grandTotal?: StringFieldUpdateOperationsInput | string
    purchasedItemVat?: IntFieldUpdateOperationsInput | number
    status?: EnumPurchaseStatusFieldUpdateOperationsInput | PurchaseStatus
    purchasedBy?: ProfileUpdateOneRequiredWithoutPurchasesInput
    purchasedItem?: OfferUpdateOneRequiredWithoutPurchasesInput
    jobs?: TransactionJobsUpdateManyWithoutPurchaseInput
  }

  export type PurchaseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    purchasedByProfileId?: IntFieldUpdateOperationsInput | number
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasedProvenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchasedItemId?: IntFieldUpdateOperationsInput | number
    purchasedItemTitle?: StringFieldUpdateOperationsInput | string
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    purchasedUnits?: IntFieldUpdateOperationsInput | number
    grandTotal?: StringFieldUpdateOperationsInput | string
    purchasedItemVat?: IntFieldUpdateOperationsInput | number
    status?: EnumPurchaseStatusFieldUpdateOperationsInput | PurchaseStatus
    jobs?: TransactionJobsUncheckedUpdateManyWithoutPurchaseInput
  }

  export type PurchaseCreateManyInput = {
    id?: number
    purchasedByProfileId: number
    purchasedAt: Date | string
    purchasedProvenAt?: Date | string | null
    purchasedItemId: number
    purchasedItemTitle: string
    pricePerUnit: string
    purchasedUnits: number
    grandTotal: string
    purchasedItemVat: number
    status: PurchaseStatus
  }

  export type PurchaseUpdateManyMutationInput = {
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasedProvenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchasedItemTitle?: StringFieldUpdateOperationsInput | string
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    purchasedUnits?: IntFieldUpdateOperationsInput | number
    grandTotal?: StringFieldUpdateOperationsInput | string
    purchasedItemVat?: IntFieldUpdateOperationsInput | number
    status?: EnumPurchaseStatusFieldUpdateOperationsInput | PurchaseStatus
  }

  export type PurchaseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    purchasedByProfileId?: IntFieldUpdateOperationsInput | number
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasedProvenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchasedItemId?: IntFieldUpdateOperationsInput | number
    purchasedItemTitle?: StringFieldUpdateOperationsInput | string
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    purchasedUnits?: IntFieldUpdateOperationsInput | number
    grandTotal?: StringFieldUpdateOperationsInput | string
    purchasedItemVat?: IntFieldUpdateOperationsInput | number
    status?: EnumPurchaseStatusFieldUpdateOperationsInput | PurchaseStatus
  }

  export type TransactionJobsCreateInput = {
    transactionhash: string
    status: string
    user: string
    purchase: PurchaseCreateNestedOneWithoutJobsInput
  }

  export type TransactionJobsUncheckedCreateInput = {
    id?: number
    transactionhash: string
    status: string
    user: string
    purchaseId: number
  }

  export type TransactionJobsUpdateInput = {
    transactionhash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    user?: StringFieldUpdateOperationsInput | string
    purchase?: PurchaseUpdateOneRequiredWithoutJobsInput
  }

  export type TransactionJobsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    transactionhash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    user?: StringFieldUpdateOperationsInput | string
    purchaseId?: IntFieldUpdateOperationsInput | number
  }

  export type TransactionJobsCreateManyInput = {
    id?: number
    transactionhash: string
    status: string
    user: string
    purchaseId: number
  }

  export type TransactionJobsUpdateManyMutationInput = {
    transactionhash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    user?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionJobsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    transactionhash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    user?: StringFieldUpdateOperationsInput | string
    purchaseId?: IntFieldUpdateOperationsInput | number
  }

  export type TagTypeCreateInput = {
    id: string
    tags?: TagCreateNestedManyWithoutTypeInput
  }

  export type TagTypeUncheckedCreateInput = {
    id: string
    tags?: TagUncheckedCreateNestedManyWithoutTypeInput
  }

  export type TagTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tags?: TagUpdateManyWithoutTypeInput
  }

  export type TagTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tags?: TagUncheckedUpdateManyWithoutTypeInput
  }

  export type TagTypeCreateManyInput = {
    id: string
  }

  export type TagTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type TagTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionCreateInput = {
    transactionHash: string
    tags?: TagCreateNestedManyWithoutTransactionInput
  }

  export type TransactionUncheckedCreateInput = {
    transactionHash: string
    tags?: TagUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionUpdateInput = {
    transactionHash?: StringFieldUpdateOperationsInput | string
    tags?: TagUpdateManyWithoutTransactionInput
  }

  export type TransactionUncheckedUpdateInput = {
    transactionHash?: StringFieldUpdateOperationsInput | string
    tags?: TagUncheckedUpdateManyWithoutTransactionInput
  }

  export type TransactionCreateManyInput = {
    transactionHash: string
  }

  export type TransactionUpdateManyMutationInput = {
    transactionHash?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    transactionHash?: StringFieldUpdateOperationsInput | string
  }

  export type TagCreateInput = {
    createdAt: Date | string
    isPrivate: boolean
    value?: string | null
    createdBy: ProfileCreateNestedOneWithoutTagsInput
    transaction?: TransactionCreateNestedOneWithoutTagsInput
    type: TagTypeCreateNestedOneWithoutTagsInput
    chatMessage?: ChatMessageCreateNestedOneWithoutTagsInput
    offerCategory?: OfferCreateNestedManyWithoutCategoryTagInput
    offerUnit?: OfferCreateNestedManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferCreateNestedManyWithoutDeliveryTermsTagInput
  }

  export type TagUncheckedCreateInput = {
    id?: number
    createdAt: Date | string
    createdByProfileId: number
    isPrivate: boolean
    transactionHash?: string | null
    typeId: string
    chatMessageId?: number | null
    value?: string | null
    offerCategory?: OfferUncheckedCreateNestedManyWithoutCategoryTagInput
    offerUnit?: OfferUncheckedCreateNestedManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferUncheckedCreateNestedManyWithoutDeliveryTermsTagInput
  }

  export type TagUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    value?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: ProfileUpdateOneRequiredWithoutTagsInput
    transaction?: TransactionUpdateOneWithoutTagsInput
    type?: TagTypeUpdateOneRequiredWithoutTagsInput
    chatMessage?: ChatMessageUpdateOneWithoutTagsInput
    offerCategory?: OfferUpdateManyWithoutCategoryTagInput
    offerUnit?: OfferUpdateManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferUpdateManyWithoutDeliveryTermsTagInput
  }

  export type TagUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    typeId?: StringFieldUpdateOperationsInput | string
    chatMessageId?: NullableIntFieldUpdateOperationsInput | number | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    offerCategory?: OfferUncheckedUpdateManyWithoutCategoryTagInput
    offerUnit?: OfferUncheckedUpdateManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferUncheckedUpdateManyWithoutDeliveryTermsTagInput
  }

  export type TagCreateManyInput = {
    id?: number
    createdAt: Date | string
    createdByProfileId: number
    isPrivate: boolean
    transactionHash?: string | null
    typeId: string
    chatMessageId?: number | null
    value?: string | null
  }

  export type TagUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    value?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TagUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    typeId?: StringFieldUpdateOperationsInput | string
    chatMessageId?: NullableIntFieldUpdateOperationsInput | number | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type ProfileRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedStringFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedStringFilter
    _max?: NestedStringFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedStringFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedStringNullableFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedIntNullableFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedDateTimeFilter
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedDateTimeNullableFilter
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _avg?: NestedFloatFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    sum?: NestedIntFilter
    _min?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedIntFilter
    _max?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedIntFilter
  }

  export type RedeemInvitationRequestListRelationFilter = {
    every?: RedeemInvitationRequestWhereInput
    some?: RedeemInvitationRequestWhereInput
    none?: RedeemInvitationRequestWhereInput
  }

  export type InvitationRelationFilter = {
    is?: InvitationWhereInput
    isNot?: InvitationWhereInput
  }

  export type EnumProfileTypeNullableFilter = {
    equals?: ProfileType | null
    in?: Enumerable<ProfileType> | null
    notIn?: Enumerable<ProfileType> | null
    not?: NestedEnumProfileTypeNullableFilter | ProfileType | null
  }

  export type BoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type TagListRelationFilter = {
    every?: TagWhereInput
    some?: TagWhereInput
    none?: TagWhereInput
  }

  export type OfferListRelationFilter = {
    every?: OfferWhereInput
    some?: OfferWhereInput
    none?: OfferWhereInput
  }

  export type PurchaseListRelationFilter = {
    every?: PurchaseWhereInput
    some?: PurchaseWhereInput
    none?: PurchaseWhereInput
  }

  export type InvitationListRelationFilter = {
    every?: InvitationWhereInput
    some?: InvitationWhereInput
    none?: InvitationWhereInput
  }

  export type SubscriptionListRelationFilter = {
    every?: SubscriptionWhereInput
    some?: SubscriptionWhereInput
    none?: SubscriptionWhereInput
  }

  export type MembershipListRelationFilter = {
    every?: MembershipWhereInput
    some?: MembershipWhereInput
    none?: MembershipWhereInput
  }

  export type EnumProfileTypeNullableWithAggregatesFilter = {
    equals?: ProfileType | null
    in?: Enumerable<ProfileType> | null
    notIn?: Enumerable<ProfileType> | null
    not?: NestedEnumProfileTypeNullableWithAggregatesFilter | ProfileType | null
    _count?: NestedIntNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntNullableFilter
    _min?: NestedEnumProfileTypeNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedEnumProfileTypeNullableFilter
    _max?: NestedEnumProfileTypeNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedEnumProfileTypeNullableFilter
  }

  export type BoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedBoolNullableFilter
  }

  export type OfferRelationFilter = {
    is?: OfferWhereInput
    isNot?: OfferWhereInput
  }

  export type TagRelationFilter = {
    is?: TagWhereInput
    isNot?: TagWhereInput
  }

  export type EnumPurchaseStatusFilter = {
    equals?: PurchaseStatus
    in?: Enumerable<PurchaseStatus>
    notIn?: Enumerable<PurchaseStatus>
    not?: NestedEnumPurchaseStatusFilter | PurchaseStatus
  }

  export type TransactionJobsListRelationFilter = {
    every?: TransactionJobsWhereInput
    some?: TransactionJobsWhereInput
    none?: TransactionJobsWhereInput
  }

  export type EnumPurchaseStatusWithAggregatesFilter = {
    equals?: PurchaseStatus
    in?: Enumerable<PurchaseStatus>
    notIn?: Enumerable<PurchaseStatus>
    not?: NestedEnumPurchaseStatusWithAggregatesFilter | PurchaseStatus
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedEnumPurchaseStatusFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedEnumPurchaseStatusFilter
    _max?: NestedEnumPurchaseStatusFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedEnumPurchaseStatusFilter
  }

  export type PurchaseRelationFilter = {
    is?: PurchaseWhereInput
    isNot?: PurchaseWhereInput
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type TransactionRelationFilter = {
    is?: TransactionWhereInput | null
    isNot?: TransactionWhereInput | null
  }

  export type TagTypeRelationFilter = {
    is?: TagTypeWhereInput
    isNot?: TagTypeWhereInput
  }

  export type ChatMessageRelationFilter = {
    is?: ChatMessageWhereInput | null
    isNot?: ChatMessageWhereInput | null
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedBoolFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedBoolFilter
    _max?: NestedBoolFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedBoolFilter
  }

  export type ProfileCreateNestedOneWithoutSessionsInput = {
    create?: XOR<ProfileCreateWithoutSessionsInput, ProfileUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutSessionsInput
    connect?: ProfileWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProfileUpdateOneWithoutSessionsInput = {
    create?: XOR<ProfileCreateWithoutSessionsInput, ProfileUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutSessionsInput
    upsert?: ProfileUpsertWithoutSessionsInput
    connect?: ProfileWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<ProfileUpdateWithoutSessionsInput, ProfileUncheckedUpdateWithoutSessionsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProfileCreateNestedOneWithoutInvitationsInput = {
    create?: XOR<ProfileCreateWithoutInvitationsInput, ProfileUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutInvitationsInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileCreateNestedOneWithoutClaimedInvitationsInput = {
    create?: XOR<ProfileCreateWithoutClaimedInvitationsInput, ProfileUncheckedCreateWithoutClaimedInvitationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutClaimedInvitationsInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileCreateNestedOneWithoutRedeemedInvitationsInput = {
    create?: XOR<ProfileCreateWithoutRedeemedInvitationsInput, ProfileUncheckedCreateWithoutRedeemedInvitationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutRedeemedInvitationsInput
    connect?: ProfileWhereUniqueInput
  }

  export type RedeemInvitationRequestCreateNestedManyWithoutInvitationToRedeemInput = {
    create?: XOR<Enumerable<RedeemInvitationRequestCreateWithoutInvitationToRedeemInput>, Enumerable<RedeemInvitationRequestUncheckedCreateWithoutInvitationToRedeemInput>>
    connectOrCreate?: Enumerable<RedeemInvitationRequestCreateOrConnectWithoutInvitationToRedeemInput>
    createMany?: RedeemInvitationRequestCreateManyInvitationToRedeemInputEnvelope
    connect?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
  }

  export type RedeemInvitationRequestUncheckedCreateNestedManyWithoutInvitationToRedeemInput = {
    create?: XOR<Enumerable<RedeemInvitationRequestCreateWithoutInvitationToRedeemInput>, Enumerable<RedeemInvitationRequestUncheckedCreateWithoutInvitationToRedeemInput>>
    connectOrCreate?: Enumerable<RedeemInvitationRequestCreateOrConnectWithoutInvitationToRedeemInput>
    createMany?: RedeemInvitationRequestCreateManyInvitationToRedeemInputEnvelope
    connect?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
  }

  export type ProfileUpdateOneRequiredWithoutInvitationsInput = {
    create?: XOR<ProfileCreateWithoutInvitationsInput, ProfileUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutInvitationsInput
    upsert?: ProfileUpsertWithoutInvitationsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<ProfileUpdateWithoutInvitationsInput, ProfileUncheckedUpdateWithoutInvitationsInput>
  }

  export type ProfileUpdateOneWithoutClaimedInvitationsInput = {
    create?: XOR<ProfileCreateWithoutClaimedInvitationsInput, ProfileUncheckedCreateWithoutClaimedInvitationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutClaimedInvitationsInput
    upsert?: ProfileUpsertWithoutClaimedInvitationsInput
    connect?: ProfileWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<ProfileUpdateWithoutClaimedInvitationsInput, ProfileUncheckedUpdateWithoutClaimedInvitationsInput>
  }

  export type ProfileUpdateOneWithoutRedeemedInvitationsInput = {
    create?: XOR<ProfileCreateWithoutRedeemedInvitationsInput, ProfileUncheckedCreateWithoutRedeemedInvitationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutRedeemedInvitationsInput
    upsert?: ProfileUpsertWithoutRedeemedInvitationsInput
    connect?: ProfileWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<ProfileUpdateWithoutRedeemedInvitationsInput, ProfileUncheckedUpdateWithoutRedeemedInvitationsInput>
  }

  export type RedeemInvitationRequestUpdateManyWithoutInvitationToRedeemInput = {
    create?: XOR<Enumerable<RedeemInvitationRequestCreateWithoutInvitationToRedeemInput>, Enumerable<RedeemInvitationRequestUncheckedCreateWithoutInvitationToRedeemInput>>
    connectOrCreate?: Enumerable<RedeemInvitationRequestCreateOrConnectWithoutInvitationToRedeemInput>
    upsert?: Enumerable<RedeemInvitationRequestUpsertWithWhereUniqueWithoutInvitationToRedeemInput>
    createMany?: RedeemInvitationRequestCreateManyInvitationToRedeemInputEnvelope
    connect?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
    set?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
    disconnect?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
    delete?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
    update?: Enumerable<RedeemInvitationRequestUpdateWithWhereUniqueWithoutInvitationToRedeemInput>
    updateMany?: Enumerable<RedeemInvitationRequestUpdateManyWithWhereWithoutInvitationToRedeemInput>
    deleteMany?: Enumerable<RedeemInvitationRequestScalarWhereInput>
  }

  export type RedeemInvitationRequestUncheckedUpdateManyWithoutInvitationToRedeemInput = {
    create?: XOR<Enumerable<RedeemInvitationRequestCreateWithoutInvitationToRedeemInput>, Enumerable<RedeemInvitationRequestUncheckedCreateWithoutInvitationToRedeemInput>>
    connectOrCreate?: Enumerable<RedeemInvitationRequestCreateOrConnectWithoutInvitationToRedeemInput>
    upsert?: Enumerable<RedeemInvitationRequestUpsertWithWhereUniqueWithoutInvitationToRedeemInput>
    createMany?: RedeemInvitationRequestCreateManyInvitationToRedeemInputEnvelope
    connect?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
    set?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
    disconnect?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
    delete?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
    update?: Enumerable<RedeemInvitationRequestUpdateWithWhereUniqueWithoutInvitationToRedeemInput>
    updateMany?: Enumerable<RedeemInvitationRequestUpdateManyWithWhereWithoutInvitationToRedeemInput>
    deleteMany?: Enumerable<RedeemInvitationRequestScalarWhereInput>
  }

  export type ProfileCreateNestedOneWithoutRedeemInvitationRequestsInput = {
    create?: XOR<ProfileCreateWithoutRedeemInvitationRequestsInput, ProfileUncheckedCreateWithoutRedeemInvitationRequestsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutRedeemInvitationRequestsInput
    connect?: ProfileWhereUniqueInput
  }

  export type InvitationCreateNestedOneWithoutIndexedTransactionsInput = {
    create?: XOR<InvitationCreateWithoutIndexedTransactionsInput, InvitationUncheckedCreateWithoutIndexedTransactionsInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutIndexedTransactionsInput
    connect?: InvitationWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutRedeemInvitationRequestsInput = {
    create?: XOR<ProfileCreateWithoutRedeemInvitationRequestsInput, ProfileUncheckedCreateWithoutRedeemInvitationRequestsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutRedeemInvitationRequestsInput
    upsert?: ProfileUpsertWithoutRedeemInvitationRequestsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<ProfileUpdateWithoutRedeemInvitationRequestsInput, ProfileUncheckedUpdateWithoutRedeemInvitationRequestsInput>
  }

  export type InvitationUpdateOneRequiredWithoutIndexedTransactionsInput = {
    create?: XOR<InvitationCreateWithoutIndexedTransactionsInput, InvitationUncheckedCreateWithoutIndexedTransactionsInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutIndexedTransactionsInput
    upsert?: InvitationUpsertWithoutIndexedTransactionsInput
    connect?: InvitationWhereUniqueInput
    update?: XOR<InvitationUpdateWithoutIndexedTransactionsInput, InvitationUncheckedUpdateWithoutIndexedTransactionsInput>
  }

  export type SessionCreateNestedManyWithoutProfileInput = {
    create?: XOR<Enumerable<SessionCreateWithoutProfileInput>, Enumerable<SessionUncheckedCreateWithoutProfileInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutProfileInput>
    createMany?: SessionCreateManyProfileInputEnvelope
    connect?: Enumerable<SessionWhereUniqueInput>
  }

  export type TagCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<Enumerable<TagCreateWithoutCreatedByInput>, Enumerable<TagUncheckedCreateWithoutCreatedByInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutCreatedByInput>
    createMany?: TagCreateManyCreatedByInputEnvelope
    connect?: Enumerable<TagWhereUniqueInput>
  }

  export type OfferCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<Enumerable<OfferCreateWithoutCreatedByInput>, Enumerable<OfferUncheckedCreateWithoutCreatedByInput>>
    connectOrCreate?: Enumerable<OfferCreateOrConnectWithoutCreatedByInput>
    createMany?: OfferCreateManyCreatedByInputEnvelope
    connect?: Enumerable<OfferWhereUniqueInput>
  }

  export type PurchaseCreateNestedManyWithoutPurchasedByInput = {
    create?: XOR<Enumerable<PurchaseCreateWithoutPurchasedByInput>, Enumerable<PurchaseUncheckedCreateWithoutPurchasedByInput>>
    connectOrCreate?: Enumerable<PurchaseCreateOrConnectWithoutPurchasedByInput>
    createMany?: PurchaseCreateManyPurchasedByInputEnvelope
    connect?: Enumerable<PurchaseWhereUniqueInput>
  }

  export type InvitationCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<Enumerable<InvitationCreateWithoutCreatedByInput>, Enumerable<InvitationUncheckedCreateWithoutCreatedByInput>>
    connectOrCreate?: Enumerable<InvitationCreateOrConnectWithoutCreatedByInput>
    createMany?: InvitationCreateManyCreatedByInputEnvelope
    connect?: Enumerable<InvitationWhereUniqueInput>
  }

  export type RedeemInvitationRequestCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<Enumerable<RedeemInvitationRequestCreateWithoutCreatedByInput>, Enumerable<RedeemInvitationRequestUncheckedCreateWithoutCreatedByInput>>
    connectOrCreate?: Enumerable<RedeemInvitationRequestCreateOrConnectWithoutCreatedByInput>
    createMany?: RedeemInvitationRequestCreateManyCreatedByInputEnvelope
    connect?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
  }

  export type InvitationCreateNestedManyWithoutRedeemedByInput = {
    create?: XOR<Enumerable<InvitationCreateWithoutRedeemedByInput>, Enumerable<InvitationUncheckedCreateWithoutRedeemedByInput>>
    connectOrCreate?: Enumerable<InvitationCreateOrConnectWithoutRedeemedByInput>
    createMany?: InvitationCreateManyRedeemedByInputEnvelope
    connect?: Enumerable<InvitationWhereUniqueInput>
  }

  export type InvitationCreateNestedManyWithoutClaimedByInput = {
    create?: XOR<Enumerable<InvitationCreateWithoutClaimedByInput>, Enumerable<InvitationUncheckedCreateWithoutClaimedByInput>>
    connectOrCreate?: Enumerable<InvitationCreateOrConnectWithoutClaimedByInput>
    createMany?: InvitationCreateManyClaimedByInputEnvelope
    connect?: Enumerable<InvitationWhereUniqueInput>
  }

  export type SubscriptionCreateNestedManyWithoutSubscribingToProfileInput = {
    create?: XOR<Enumerable<SubscriptionCreateWithoutSubscribingToProfileInput>, Enumerable<SubscriptionUncheckedCreateWithoutSubscribingToProfileInput>>
    connectOrCreate?: Enumerable<SubscriptionCreateOrConnectWithoutSubscribingToProfileInput>
    createMany?: SubscriptionCreateManySubscribingToProfileInputEnvelope
    connect?: Enumerable<SubscriptionWhereUniqueInput>
  }

  export type SubscriptionCreateNestedManyWithoutSubscriberInput = {
    create?: XOR<Enumerable<SubscriptionCreateWithoutSubscriberInput>, Enumerable<SubscriptionUncheckedCreateWithoutSubscriberInput>>
    connectOrCreate?: Enumerable<SubscriptionCreateOrConnectWithoutSubscriberInput>
    createMany?: SubscriptionCreateManySubscriberInputEnvelope
    connect?: Enumerable<SubscriptionWhereUniqueInput>
  }

  export type MembershipCreateNestedManyWithoutMemberInput = {
    create?: XOR<Enumerable<MembershipCreateWithoutMemberInput>, Enumerable<MembershipUncheckedCreateWithoutMemberInput>>
    connectOrCreate?: Enumerable<MembershipCreateOrConnectWithoutMemberInput>
    createMany?: MembershipCreateManyMemberInputEnvelope
    connect?: Enumerable<MembershipWhereUniqueInput>
  }

  export type MembershipCreateNestedManyWithoutMemberAtInput = {
    create?: XOR<Enumerable<MembershipCreateWithoutMemberAtInput>, Enumerable<MembershipUncheckedCreateWithoutMemberAtInput>>
    connectOrCreate?: Enumerable<MembershipCreateOrConnectWithoutMemberAtInput>
    createMany?: MembershipCreateManyMemberAtInputEnvelope
    connect?: Enumerable<MembershipWhereUniqueInput>
  }

  export type SessionUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<Enumerable<SessionCreateWithoutProfileInput>, Enumerable<SessionUncheckedCreateWithoutProfileInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutProfileInput>
    createMany?: SessionCreateManyProfileInputEnvelope
    connect?: Enumerable<SessionWhereUniqueInput>
  }

  export type TagUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<Enumerable<TagCreateWithoutCreatedByInput>, Enumerable<TagUncheckedCreateWithoutCreatedByInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutCreatedByInput>
    createMany?: TagCreateManyCreatedByInputEnvelope
    connect?: Enumerable<TagWhereUniqueInput>
  }

  export type OfferUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<Enumerable<OfferCreateWithoutCreatedByInput>, Enumerable<OfferUncheckedCreateWithoutCreatedByInput>>
    connectOrCreate?: Enumerable<OfferCreateOrConnectWithoutCreatedByInput>
    createMany?: OfferCreateManyCreatedByInputEnvelope
    connect?: Enumerable<OfferWhereUniqueInput>
  }

  export type PurchaseUncheckedCreateNestedManyWithoutPurchasedByInput = {
    create?: XOR<Enumerable<PurchaseCreateWithoutPurchasedByInput>, Enumerable<PurchaseUncheckedCreateWithoutPurchasedByInput>>
    connectOrCreate?: Enumerable<PurchaseCreateOrConnectWithoutPurchasedByInput>
    createMany?: PurchaseCreateManyPurchasedByInputEnvelope
    connect?: Enumerable<PurchaseWhereUniqueInput>
  }

  export type InvitationUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<Enumerable<InvitationCreateWithoutCreatedByInput>, Enumerable<InvitationUncheckedCreateWithoutCreatedByInput>>
    connectOrCreate?: Enumerable<InvitationCreateOrConnectWithoutCreatedByInput>
    createMany?: InvitationCreateManyCreatedByInputEnvelope
    connect?: Enumerable<InvitationWhereUniqueInput>
  }

  export type RedeemInvitationRequestUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<Enumerable<RedeemInvitationRequestCreateWithoutCreatedByInput>, Enumerable<RedeemInvitationRequestUncheckedCreateWithoutCreatedByInput>>
    connectOrCreate?: Enumerable<RedeemInvitationRequestCreateOrConnectWithoutCreatedByInput>
    createMany?: RedeemInvitationRequestCreateManyCreatedByInputEnvelope
    connect?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
  }

  export type InvitationUncheckedCreateNestedManyWithoutRedeemedByInput = {
    create?: XOR<Enumerable<InvitationCreateWithoutRedeemedByInput>, Enumerable<InvitationUncheckedCreateWithoutRedeemedByInput>>
    connectOrCreate?: Enumerable<InvitationCreateOrConnectWithoutRedeemedByInput>
    createMany?: InvitationCreateManyRedeemedByInputEnvelope
    connect?: Enumerable<InvitationWhereUniqueInput>
  }

  export type InvitationUncheckedCreateNestedManyWithoutClaimedByInput = {
    create?: XOR<Enumerable<InvitationCreateWithoutClaimedByInput>, Enumerable<InvitationUncheckedCreateWithoutClaimedByInput>>
    connectOrCreate?: Enumerable<InvitationCreateOrConnectWithoutClaimedByInput>
    createMany?: InvitationCreateManyClaimedByInputEnvelope
    connect?: Enumerable<InvitationWhereUniqueInput>
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutSubscribingToProfileInput = {
    create?: XOR<Enumerable<SubscriptionCreateWithoutSubscribingToProfileInput>, Enumerable<SubscriptionUncheckedCreateWithoutSubscribingToProfileInput>>
    connectOrCreate?: Enumerable<SubscriptionCreateOrConnectWithoutSubscribingToProfileInput>
    createMany?: SubscriptionCreateManySubscribingToProfileInputEnvelope
    connect?: Enumerable<SubscriptionWhereUniqueInput>
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutSubscriberInput = {
    create?: XOR<Enumerable<SubscriptionCreateWithoutSubscriberInput>, Enumerable<SubscriptionUncheckedCreateWithoutSubscriberInput>>
    connectOrCreate?: Enumerable<SubscriptionCreateOrConnectWithoutSubscriberInput>
    createMany?: SubscriptionCreateManySubscriberInputEnvelope
    connect?: Enumerable<SubscriptionWhereUniqueInput>
  }

  export type MembershipUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<Enumerable<MembershipCreateWithoutMemberInput>, Enumerable<MembershipUncheckedCreateWithoutMemberInput>>
    connectOrCreate?: Enumerable<MembershipCreateOrConnectWithoutMemberInput>
    createMany?: MembershipCreateManyMemberInputEnvelope
    connect?: Enumerable<MembershipWhereUniqueInput>
  }

  export type MembershipUncheckedCreateNestedManyWithoutMemberAtInput = {
    create?: XOR<Enumerable<MembershipCreateWithoutMemberAtInput>, Enumerable<MembershipUncheckedCreateWithoutMemberAtInput>>
    connectOrCreate?: Enumerable<MembershipCreateOrConnectWithoutMemberAtInput>
    createMany?: MembershipCreateManyMemberAtInputEnvelope
    connect?: Enumerable<MembershipWhereUniqueInput>
  }

  export type NullableEnumProfileTypeFieldUpdateOperationsInput = {
    set?: ProfileType | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type SessionUpdateManyWithoutProfileInput = {
    create?: XOR<Enumerable<SessionCreateWithoutProfileInput>, Enumerable<SessionUncheckedCreateWithoutProfileInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutProfileInput>
    upsert?: Enumerable<SessionUpsertWithWhereUniqueWithoutProfileInput>
    createMany?: SessionCreateManyProfileInputEnvelope
    connect?: Enumerable<SessionWhereUniqueInput>
    set?: Enumerable<SessionWhereUniqueInput>
    disconnect?: Enumerable<SessionWhereUniqueInput>
    delete?: Enumerable<SessionWhereUniqueInput>
    update?: Enumerable<SessionUpdateWithWhereUniqueWithoutProfileInput>
    updateMany?: Enumerable<SessionUpdateManyWithWhereWithoutProfileInput>
    deleteMany?: Enumerable<SessionScalarWhereInput>
  }

  export type TagUpdateManyWithoutCreatedByInput = {
    create?: XOR<Enumerable<TagCreateWithoutCreatedByInput>, Enumerable<TagUncheckedCreateWithoutCreatedByInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutCreatedByInput>
    upsert?: Enumerable<TagUpsertWithWhereUniqueWithoutCreatedByInput>
    createMany?: TagCreateManyCreatedByInputEnvelope
    connect?: Enumerable<TagWhereUniqueInput>
    set?: Enumerable<TagWhereUniqueInput>
    disconnect?: Enumerable<TagWhereUniqueInput>
    delete?: Enumerable<TagWhereUniqueInput>
    update?: Enumerable<TagUpdateWithWhereUniqueWithoutCreatedByInput>
    updateMany?: Enumerable<TagUpdateManyWithWhereWithoutCreatedByInput>
    deleteMany?: Enumerable<TagScalarWhereInput>
  }

  export type OfferUpdateManyWithoutCreatedByInput = {
    create?: XOR<Enumerable<OfferCreateWithoutCreatedByInput>, Enumerable<OfferUncheckedCreateWithoutCreatedByInput>>
    connectOrCreate?: Enumerable<OfferCreateOrConnectWithoutCreatedByInput>
    upsert?: Enumerable<OfferUpsertWithWhereUniqueWithoutCreatedByInput>
    createMany?: OfferCreateManyCreatedByInputEnvelope
    connect?: Enumerable<OfferWhereUniqueInput>
    set?: Enumerable<OfferWhereUniqueInput>
    disconnect?: Enumerable<OfferWhereUniqueInput>
    delete?: Enumerable<OfferWhereUniqueInput>
    update?: Enumerable<OfferUpdateWithWhereUniqueWithoutCreatedByInput>
    updateMany?: Enumerable<OfferUpdateManyWithWhereWithoutCreatedByInput>
    deleteMany?: Enumerable<OfferScalarWhereInput>
  }

  export type PurchaseUpdateManyWithoutPurchasedByInput = {
    create?: XOR<Enumerable<PurchaseCreateWithoutPurchasedByInput>, Enumerable<PurchaseUncheckedCreateWithoutPurchasedByInput>>
    connectOrCreate?: Enumerable<PurchaseCreateOrConnectWithoutPurchasedByInput>
    upsert?: Enumerable<PurchaseUpsertWithWhereUniqueWithoutPurchasedByInput>
    createMany?: PurchaseCreateManyPurchasedByInputEnvelope
    connect?: Enumerable<PurchaseWhereUniqueInput>
    set?: Enumerable<PurchaseWhereUniqueInput>
    disconnect?: Enumerable<PurchaseWhereUniqueInput>
    delete?: Enumerable<PurchaseWhereUniqueInput>
    update?: Enumerable<PurchaseUpdateWithWhereUniqueWithoutPurchasedByInput>
    updateMany?: Enumerable<PurchaseUpdateManyWithWhereWithoutPurchasedByInput>
    deleteMany?: Enumerable<PurchaseScalarWhereInput>
  }

  export type InvitationUpdateManyWithoutCreatedByInput = {
    create?: XOR<Enumerable<InvitationCreateWithoutCreatedByInput>, Enumerable<InvitationUncheckedCreateWithoutCreatedByInput>>
    connectOrCreate?: Enumerable<InvitationCreateOrConnectWithoutCreatedByInput>
    upsert?: Enumerable<InvitationUpsertWithWhereUniqueWithoutCreatedByInput>
    createMany?: InvitationCreateManyCreatedByInputEnvelope
    connect?: Enumerable<InvitationWhereUniqueInput>
    set?: Enumerable<InvitationWhereUniqueInput>
    disconnect?: Enumerable<InvitationWhereUniqueInput>
    delete?: Enumerable<InvitationWhereUniqueInput>
    update?: Enumerable<InvitationUpdateWithWhereUniqueWithoutCreatedByInput>
    updateMany?: Enumerable<InvitationUpdateManyWithWhereWithoutCreatedByInput>
    deleteMany?: Enumerable<InvitationScalarWhereInput>
  }

  export type RedeemInvitationRequestUpdateManyWithoutCreatedByInput = {
    create?: XOR<Enumerable<RedeemInvitationRequestCreateWithoutCreatedByInput>, Enumerable<RedeemInvitationRequestUncheckedCreateWithoutCreatedByInput>>
    connectOrCreate?: Enumerable<RedeemInvitationRequestCreateOrConnectWithoutCreatedByInput>
    upsert?: Enumerable<RedeemInvitationRequestUpsertWithWhereUniqueWithoutCreatedByInput>
    createMany?: RedeemInvitationRequestCreateManyCreatedByInputEnvelope
    connect?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
    set?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
    disconnect?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
    delete?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
    update?: Enumerable<RedeemInvitationRequestUpdateWithWhereUniqueWithoutCreatedByInput>
    updateMany?: Enumerable<RedeemInvitationRequestUpdateManyWithWhereWithoutCreatedByInput>
    deleteMany?: Enumerable<RedeemInvitationRequestScalarWhereInput>
  }

  export type InvitationUpdateManyWithoutRedeemedByInput = {
    create?: XOR<Enumerable<InvitationCreateWithoutRedeemedByInput>, Enumerable<InvitationUncheckedCreateWithoutRedeemedByInput>>
    connectOrCreate?: Enumerable<InvitationCreateOrConnectWithoutRedeemedByInput>
    upsert?: Enumerable<InvitationUpsertWithWhereUniqueWithoutRedeemedByInput>
    createMany?: InvitationCreateManyRedeemedByInputEnvelope
    connect?: Enumerable<InvitationWhereUniqueInput>
    set?: Enumerable<InvitationWhereUniqueInput>
    disconnect?: Enumerable<InvitationWhereUniqueInput>
    delete?: Enumerable<InvitationWhereUniqueInput>
    update?: Enumerable<InvitationUpdateWithWhereUniqueWithoutRedeemedByInput>
    updateMany?: Enumerable<InvitationUpdateManyWithWhereWithoutRedeemedByInput>
    deleteMany?: Enumerable<InvitationScalarWhereInput>
  }

  export type InvitationUpdateManyWithoutClaimedByInput = {
    create?: XOR<Enumerable<InvitationCreateWithoutClaimedByInput>, Enumerable<InvitationUncheckedCreateWithoutClaimedByInput>>
    connectOrCreate?: Enumerable<InvitationCreateOrConnectWithoutClaimedByInput>
    upsert?: Enumerable<InvitationUpsertWithWhereUniqueWithoutClaimedByInput>
    createMany?: InvitationCreateManyClaimedByInputEnvelope
    connect?: Enumerable<InvitationWhereUniqueInput>
    set?: Enumerable<InvitationWhereUniqueInput>
    disconnect?: Enumerable<InvitationWhereUniqueInput>
    delete?: Enumerable<InvitationWhereUniqueInput>
    update?: Enumerable<InvitationUpdateWithWhereUniqueWithoutClaimedByInput>
    updateMany?: Enumerable<InvitationUpdateManyWithWhereWithoutClaimedByInput>
    deleteMany?: Enumerable<InvitationScalarWhereInput>
  }

  export type SubscriptionUpdateManyWithoutSubscribingToProfileInput = {
    create?: XOR<Enumerable<SubscriptionCreateWithoutSubscribingToProfileInput>, Enumerable<SubscriptionUncheckedCreateWithoutSubscribingToProfileInput>>
    connectOrCreate?: Enumerable<SubscriptionCreateOrConnectWithoutSubscribingToProfileInput>
    upsert?: Enumerable<SubscriptionUpsertWithWhereUniqueWithoutSubscribingToProfileInput>
    createMany?: SubscriptionCreateManySubscribingToProfileInputEnvelope
    connect?: Enumerable<SubscriptionWhereUniqueInput>
    set?: Enumerable<SubscriptionWhereUniqueInput>
    disconnect?: Enumerable<SubscriptionWhereUniqueInput>
    delete?: Enumerable<SubscriptionWhereUniqueInput>
    update?: Enumerable<SubscriptionUpdateWithWhereUniqueWithoutSubscribingToProfileInput>
    updateMany?: Enumerable<SubscriptionUpdateManyWithWhereWithoutSubscribingToProfileInput>
    deleteMany?: Enumerable<SubscriptionScalarWhereInput>
  }

  export type SubscriptionUpdateManyWithoutSubscriberInput = {
    create?: XOR<Enumerable<SubscriptionCreateWithoutSubscriberInput>, Enumerable<SubscriptionUncheckedCreateWithoutSubscriberInput>>
    connectOrCreate?: Enumerable<SubscriptionCreateOrConnectWithoutSubscriberInput>
    upsert?: Enumerable<SubscriptionUpsertWithWhereUniqueWithoutSubscriberInput>
    createMany?: SubscriptionCreateManySubscriberInputEnvelope
    connect?: Enumerable<SubscriptionWhereUniqueInput>
    set?: Enumerable<SubscriptionWhereUniqueInput>
    disconnect?: Enumerable<SubscriptionWhereUniqueInput>
    delete?: Enumerable<SubscriptionWhereUniqueInput>
    update?: Enumerable<SubscriptionUpdateWithWhereUniqueWithoutSubscriberInput>
    updateMany?: Enumerable<SubscriptionUpdateManyWithWhereWithoutSubscriberInput>
    deleteMany?: Enumerable<SubscriptionScalarWhereInput>
  }

  export type MembershipUpdateManyWithoutMemberInput = {
    create?: XOR<Enumerable<MembershipCreateWithoutMemberInput>, Enumerable<MembershipUncheckedCreateWithoutMemberInput>>
    connectOrCreate?: Enumerable<MembershipCreateOrConnectWithoutMemberInput>
    upsert?: Enumerable<MembershipUpsertWithWhereUniqueWithoutMemberInput>
    createMany?: MembershipCreateManyMemberInputEnvelope
    connect?: Enumerable<MembershipWhereUniqueInput>
    set?: Enumerable<MembershipWhereUniqueInput>
    disconnect?: Enumerable<MembershipWhereUniqueInput>
    delete?: Enumerable<MembershipWhereUniqueInput>
    update?: Enumerable<MembershipUpdateWithWhereUniqueWithoutMemberInput>
    updateMany?: Enumerable<MembershipUpdateManyWithWhereWithoutMemberInput>
    deleteMany?: Enumerable<MembershipScalarWhereInput>
  }

  export type MembershipUpdateManyWithoutMemberAtInput = {
    create?: XOR<Enumerable<MembershipCreateWithoutMemberAtInput>, Enumerable<MembershipUncheckedCreateWithoutMemberAtInput>>
    connectOrCreate?: Enumerable<MembershipCreateOrConnectWithoutMemberAtInput>
    upsert?: Enumerable<MembershipUpsertWithWhereUniqueWithoutMemberAtInput>
    createMany?: MembershipCreateManyMemberAtInputEnvelope
    connect?: Enumerable<MembershipWhereUniqueInput>
    set?: Enumerable<MembershipWhereUniqueInput>
    disconnect?: Enumerable<MembershipWhereUniqueInput>
    delete?: Enumerable<MembershipWhereUniqueInput>
    update?: Enumerable<MembershipUpdateWithWhereUniqueWithoutMemberAtInput>
    updateMany?: Enumerable<MembershipUpdateManyWithWhereWithoutMemberAtInput>
    deleteMany?: Enumerable<MembershipScalarWhereInput>
  }

  export type SessionUncheckedUpdateManyWithoutProfileInput = {
    create?: XOR<Enumerable<SessionCreateWithoutProfileInput>, Enumerable<SessionUncheckedCreateWithoutProfileInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutProfileInput>
    upsert?: Enumerable<SessionUpsertWithWhereUniqueWithoutProfileInput>
    createMany?: SessionCreateManyProfileInputEnvelope
    connect?: Enumerable<SessionWhereUniqueInput>
    set?: Enumerable<SessionWhereUniqueInput>
    disconnect?: Enumerable<SessionWhereUniqueInput>
    delete?: Enumerable<SessionWhereUniqueInput>
    update?: Enumerable<SessionUpdateWithWhereUniqueWithoutProfileInput>
    updateMany?: Enumerable<SessionUpdateManyWithWhereWithoutProfileInput>
    deleteMany?: Enumerable<SessionScalarWhereInput>
  }

  export type TagUncheckedUpdateManyWithoutCreatedByInput = {
    create?: XOR<Enumerable<TagCreateWithoutCreatedByInput>, Enumerable<TagUncheckedCreateWithoutCreatedByInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutCreatedByInput>
    upsert?: Enumerable<TagUpsertWithWhereUniqueWithoutCreatedByInput>
    createMany?: TagCreateManyCreatedByInputEnvelope
    connect?: Enumerable<TagWhereUniqueInput>
    set?: Enumerable<TagWhereUniqueInput>
    disconnect?: Enumerable<TagWhereUniqueInput>
    delete?: Enumerable<TagWhereUniqueInput>
    update?: Enumerable<TagUpdateWithWhereUniqueWithoutCreatedByInput>
    updateMany?: Enumerable<TagUpdateManyWithWhereWithoutCreatedByInput>
    deleteMany?: Enumerable<TagScalarWhereInput>
  }

  export type OfferUncheckedUpdateManyWithoutCreatedByInput = {
    create?: XOR<Enumerable<OfferCreateWithoutCreatedByInput>, Enumerable<OfferUncheckedCreateWithoutCreatedByInput>>
    connectOrCreate?: Enumerable<OfferCreateOrConnectWithoutCreatedByInput>
    upsert?: Enumerable<OfferUpsertWithWhereUniqueWithoutCreatedByInput>
    createMany?: OfferCreateManyCreatedByInputEnvelope
    connect?: Enumerable<OfferWhereUniqueInput>
    set?: Enumerable<OfferWhereUniqueInput>
    disconnect?: Enumerable<OfferWhereUniqueInput>
    delete?: Enumerable<OfferWhereUniqueInput>
    update?: Enumerable<OfferUpdateWithWhereUniqueWithoutCreatedByInput>
    updateMany?: Enumerable<OfferUpdateManyWithWhereWithoutCreatedByInput>
    deleteMany?: Enumerable<OfferScalarWhereInput>
  }

  export type PurchaseUncheckedUpdateManyWithoutPurchasedByInput = {
    create?: XOR<Enumerable<PurchaseCreateWithoutPurchasedByInput>, Enumerable<PurchaseUncheckedCreateWithoutPurchasedByInput>>
    connectOrCreate?: Enumerable<PurchaseCreateOrConnectWithoutPurchasedByInput>
    upsert?: Enumerable<PurchaseUpsertWithWhereUniqueWithoutPurchasedByInput>
    createMany?: PurchaseCreateManyPurchasedByInputEnvelope
    connect?: Enumerable<PurchaseWhereUniqueInput>
    set?: Enumerable<PurchaseWhereUniqueInput>
    disconnect?: Enumerable<PurchaseWhereUniqueInput>
    delete?: Enumerable<PurchaseWhereUniqueInput>
    update?: Enumerable<PurchaseUpdateWithWhereUniqueWithoutPurchasedByInput>
    updateMany?: Enumerable<PurchaseUpdateManyWithWhereWithoutPurchasedByInput>
    deleteMany?: Enumerable<PurchaseScalarWhereInput>
  }

  export type InvitationUncheckedUpdateManyWithoutCreatedByInput = {
    create?: XOR<Enumerable<InvitationCreateWithoutCreatedByInput>, Enumerable<InvitationUncheckedCreateWithoutCreatedByInput>>
    connectOrCreate?: Enumerable<InvitationCreateOrConnectWithoutCreatedByInput>
    upsert?: Enumerable<InvitationUpsertWithWhereUniqueWithoutCreatedByInput>
    createMany?: InvitationCreateManyCreatedByInputEnvelope
    connect?: Enumerable<InvitationWhereUniqueInput>
    set?: Enumerable<InvitationWhereUniqueInput>
    disconnect?: Enumerable<InvitationWhereUniqueInput>
    delete?: Enumerable<InvitationWhereUniqueInput>
    update?: Enumerable<InvitationUpdateWithWhereUniqueWithoutCreatedByInput>
    updateMany?: Enumerable<InvitationUpdateManyWithWhereWithoutCreatedByInput>
    deleteMany?: Enumerable<InvitationScalarWhereInput>
  }

  export type RedeemInvitationRequestUncheckedUpdateManyWithoutCreatedByInput = {
    create?: XOR<Enumerable<RedeemInvitationRequestCreateWithoutCreatedByInput>, Enumerable<RedeemInvitationRequestUncheckedCreateWithoutCreatedByInput>>
    connectOrCreate?: Enumerable<RedeemInvitationRequestCreateOrConnectWithoutCreatedByInput>
    upsert?: Enumerable<RedeemInvitationRequestUpsertWithWhereUniqueWithoutCreatedByInput>
    createMany?: RedeemInvitationRequestCreateManyCreatedByInputEnvelope
    connect?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
    set?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
    disconnect?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
    delete?: Enumerable<RedeemInvitationRequestWhereUniqueInput>
    update?: Enumerable<RedeemInvitationRequestUpdateWithWhereUniqueWithoutCreatedByInput>
    updateMany?: Enumerable<RedeemInvitationRequestUpdateManyWithWhereWithoutCreatedByInput>
    deleteMany?: Enumerable<RedeemInvitationRequestScalarWhereInput>
  }

  export type InvitationUncheckedUpdateManyWithoutRedeemedByInput = {
    create?: XOR<Enumerable<InvitationCreateWithoutRedeemedByInput>, Enumerable<InvitationUncheckedCreateWithoutRedeemedByInput>>
    connectOrCreate?: Enumerable<InvitationCreateOrConnectWithoutRedeemedByInput>
    upsert?: Enumerable<InvitationUpsertWithWhereUniqueWithoutRedeemedByInput>
    createMany?: InvitationCreateManyRedeemedByInputEnvelope
    connect?: Enumerable<InvitationWhereUniqueInput>
    set?: Enumerable<InvitationWhereUniqueInput>
    disconnect?: Enumerable<InvitationWhereUniqueInput>
    delete?: Enumerable<InvitationWhereUniqueInput>
    update?: Enumerable<InvitationUpdateWithWhereUniqueWithoutRedeemedByInput>
    updateMany?: Enumerable<InvitationUpdateManyWithWhereWithoutRedeemedByInput>
    deleteMany?: Enumerable<InvitationScalarWhereInput>
  }

  export type InvitationUncheckedUpdateManyWithoutClaimedByInput = {
    create?: XOR<Enumerable<InvitationCreateWithoutClaimedByInput>, Enumerable<InvitationUncheckedCreateWithoutClaimedByInput>>
    connectOrCreate?: Enumerable<InvitationCreateOrConnectWithoutClaimedByInput>
    upsert?: Enumerable<InvitationUpsertWithWhereUniqueWithoutClaimedByInput>
    createMany?: InvitationCreateManyClaimedByInputEnvelope
    connect?: Enumerable<InvitationWhereUniqueInput>
    set?: Enumerable<InvitationWhereUniqueInput>
    disconnect?: Enumerable<InvitationWhereUniqueInput>
    delete?: Enumerable<InvitationWhereUniqueInput>
    update?: Enumerable<InvitationUpdateWithWhereUniqueWithoutClaimedByInput>
    updateMany?: Enumerable<InvitationUpdateManyWithWhereWithoutClaimedByInput>
    deleteMany?: Enumerable<InvitationScalarWhereInput>
  }

  export type SubscriptionUncheckedUpdateManyWithoutSubscribingToProfileInput = {
    create?: XOR<Enumerable<SubscriptionCreateWithoutSubscribingToProfileInput>, Enumerable<SubscriptionUncheckedCreateWithoutSubscribingToProfileInput>>
    connectOrCreate?: Enumerable<SubscriptionCreateOrConnectWithoutSubscribingToProfileInput>
    upsert?: Enumerable<SubscriptionUpsertWithWhereUniqueWithoutSubscribingToProfileInput>
    createMany?: SubscriptionCreateManySubscribingToProfileInputEnvelope
    connect?: Enumerable<SubscriptionWhereUniqueInput>
    set?: Enumerable<SubscriptionWhereUniqueInput>
    disconnect?: Enumerable<SubscriptionWhereUniqueInput>
    delete?: Enumerable<SubscriptionWhereUniqueInput>
    update?: Enumerable<SubscriptionUpdateWithWhereUniqueWithoutSubscribingToProfileInput>
    updateMany?: Enumerable<SubscriptionUpdateManyWithWhereWithoutSubscribingToProfileInput>
    deleteMany?: Enumerable<SubscriptionScalarWhereInput>
  }

  export type SubscriptionUncheckedUpdateManyWithoutSubscriberInput = {
    create?: XOR<Enumerable<SubscriptionCreateWithoutSubscriberInput>, Enumerable<SubscriptionUncheckedCreateWithoutSubscriberInput>>
    connectOrCreate?: Enumerable<SubscriptionCreateOrConnectWithoutSubscriberInput>
    upsert?: Enumerable<SubscriptionUpsertWithWhereUniqueWithoutSubscriberInput>
    createMany?: SubscriptionCreateManySubscriberInputEnvelope
    connect?: Enumerable<SubscriptionWhereUniqueInput>
    set?: Enumerable<SubscriptionWhereUniqueInput>
    disconnect?: Enumerable<SubscriptionWhereUniqueInput>
    delete?: Enumerable<SubscriptionWhereUniqueInput>
    update?: Enumerable<SubscriptionUpdateWithWhereUniqueWithoutSubscriberInput>
    updateMany?: Enumerable<SubscriptionUpdateManyWithWhereWithoutSubscriberInput>
    deleteMany?: Enumerable<SubscriptionScalarWhereInput>
  }

  export type MembershipUncheckedUpdateManyWithoutMemberInput = {
    create?: XOR<Enumerable<MembershipCreateWithoutMemberInput>, Enumerable<MembershipUncheckedCreateWithoutMemberInput>>
    connectOrCreate?: Enumerable<MembershipCreateOrConnectWithoutMemberInput>
    upsert?: Enumerable<MembershipUpsertWithWhereUniqueWithoutMemberInput>
    createMany?: MembershipCreateManyMemberInputEnvelope
    connect?: Enumerable<MembershipWhereUniqueInput>
    set?: Enumerable<MembershipWhereUniqueInput>
    disconnect?: Enumerable<MembershipWhereUniqueInput>
    delete?: Enumerable<MembershipWhereUniqueInput>
    update?: Enumerable<MembershipUpdateWithWhereUniqueWithoutMemberInput>
    updateMany?: Enumerable<MembershipUpdateManyWithWhereWithoutMemberInput>
    deleteMany?: Enumerable<MembershipScalarWhereInput>
  }

  export type MembershipUncheckedUpdateManyWithoutMemberAtInput = {
    create?: XOR<Enumerable<MembershipCreateWithoutMemberAtInput>, Enumerable<MembershipUncheckedCreateWithoutMemberAtInput>>
    connectOrCreate?: Enumerable<MembershipCreateOrConnectWithoutMemberAtInput>
    upsert?: Enumerable<MembershipUpsertWithWhereUniqueWithoutMemberAtInput>
    createMany?: MembershipCreateManyMemberAtInputEnvelope
    connect?: Enumerable<MembershipWhereUniqueInput>
    set?: Enumerable<MembershipWhereUniqueInput>
    disconnect?: Enumerable<MembershipWhereUniqueInput>
    delete?: Enumerable<MembershipWhereUniqueInput>
    update?: Enumerable<MembershipUpdateWithWhereUniqueWithoutMemberAtInput>
    updateMany?: Enumerable<MembershipUpdateManyWithWhereWithoutMemberAtInput>
    deleteMany?: Enumerable<MembershipScalarWhereInput>
  }

  export type ProfileCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<ProfileCreateWithoutMembershipsInput, ProfileUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutMembershipsInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileCreateNestedOneWithoutMembersInput = {
    create?: XOR<ProfileCreateWithoutMembersInput, ProfileUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutMembersInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutMembershipsInput = {
    create?: XOR<ProfileCreateWithoutMembershipsInput, ProfileUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutMembershipsInput
    upsert?: ProfileUpsertWithoutMembershipsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<ProfileUpdateWithoutMembershipsInput, ProfileUncheckedUpdateWithoutMembershipsInput>
  }

  export type ProfileUpdateOneRequiredWithoutMembersInput = {
    create?: XOR<ProfileCreateWithoutMembersInput, ProfileUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutMembersInput
    upsert?: ProfileUpsertWithoutMembersInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<ProfileUpdateWithoutMembersInput, ProfileUncheckedUpdateWithoutMembersInput>
  }

  export type ProfileCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<ProfileCreateWithoutSubscriptionsInput, ProfileUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutSubscriptionsInput
    connect?: ProfileWhereUniqueInput
  }

  export type OfferCreateNestedOneWithoutSubscribersInput = {
    create?: XOR<OfferCreateWithoutSubscribersInput, OfferUncheckedCreateWithoutSubscribersInput>
    connectOrCreate?: OfferCreateOrConnectWithoutSubscribersInput
    connect?: OfferWhereUniqueInput
  }

  export type ProfileCreateNestedOneWithoutSubscribersInput = {
    create?: XOR<ProfileCreateWithoutSubscribersInput, ProfileUncheckedCreateWithoutSubscribersInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutSubscribersInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutSubscriptionsInput = {
    create?: XOR<ProfileCreateWithoutSubscriptionsInput, ProfileUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutSubscriptionsInput
    upsert?: ProfileUpsertWithoutSubscriptionsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<ProfileUpdateWithoutSubscriptionsInput, ProfileUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type OfferUpdateOneWithoutSubscribersInput = {
    create?: XOR<OfferCreateWithoutSubscribersInput, OfferUncheckedCreateWithoutSubscribersInput>
    connectOrCreate?: OfferCreateOrConnectWithoutSubscribersInput
    upsert?: OfferUpsertWithoutSubscribersInput
    connect?: OfferWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<OfferUpdateWithoutSubscribersInput, OfferUncheckedUpdateWithoutSubscribersInput>
  }

  export type ProfileUpdateOneWithoutSubscribersInput = {
    create?: XOR<ProfileCreateWithoutSubscribersInput, ProfileUncheckedCreateWithoutSubscribersInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutSubscribersInput
    upsert?: ProfileUpsertWithoutSubscribersInput
    connect?: ProfileWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<ProfileUpdateWithoutSubscribersInput, ProfileUncheckedUpdateWithoutSubscribersInput>
  }

  export type TagCreateNestedManyWithoutChatMessageInput = {
    create?: XOR<Enumerable<TagCreateWithoutChatMessageInput>, Enumerable<TagUncheckedCreateWithoutChatMessageInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutChatMessageInput>
    createMany?: TagCreateManyChatMessageInputEnvelope
    connect?: Enumerable<TagWhereUniqueInput>
  }

  export type TagUncheckedCreateNestedManyWithoutChatMessageInput = {
    create?: XOR<Enumerable<TagCreateWithoutChatMessageInput>, Enumerable<TagUncheckedCreateWithoutChatMessageInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutChatMessageInput>
    createMany?: TagCreateManyChatMessageInputEnvelope
    connect?: Enumerable<TagWhereUniqueInput>
  }

  export type TagUpdateManyWithoutChatMessageInput = {
    create?: XOR<Enumerable<TagCreateWithoutChatMessageInput>, Enumerable<TagUncheckedCreateWithoutChatMessageInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutChatMessageInput>
    upsert?: Enumerable<TagUpsertWithWhereUniqueWithoutChatMessageInput>
    createMany?: TagCreateManyChatMessageInputEnvelope
    connect?: Enumerable<TagWhereUniqueInput>
    set?: Enumerable<TagWhereUniqueInput>
    disconnect?: Enumerable<TagWhereUniqueInput>
    delete?: Enumerable<TagWhereUniqueInput>
    update?: Enumerable<TagUpdateWithWhereUniqueWithoutChatMessageInput>
    updateMany?: Enumerable<TagUpdateManyWithWhereWithoutChatMessageInput>
    deleteMany?: Enumerable<TagScalarWhereInput>
  }

  export type TagUncheckedUpdateManyWithoutChatMessageInput = {
    create?: XOR<Enumerable<TagCreateWithoutChatMessageInput>, Enumerable<TagUncheckedCreateWithoutChatMessageInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutChatMessageInput>
    upsert?: Enumerable<TagUpsertWithWhereUniqueWithoutChatMessageInput>
    createMany?: TagCreateManyChatMessageInputEnvelope
    connect?: Enumerable<TagWhereUniqueInput>
    set?: Enumerable<TagWhereUniqueInput>
    disconnect?: Enumerable<TagWhereUniqueInput>
    delete?: Enumerable<TagWhereUniqueInput>
    update?: Enumerable<TagUpdateWithWhereUniqueWithoutChatMessageInput>
    updateMany?: Enumerable<TagUpdateManyWithWhereWithoutChatMessageInput>
    deleteMany?: Enumerable<TagScalarWhereInput>
  }

  export type ProfileCreateNestedOneWithoutOffersInput = {
    create?: XOR<ProfileCreateWithoutOffersInput, ProfileUncheckedCreateWithoutOffersInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutOffersInput
    connect?: ProfileWhereUniqueInput
  }

  export type PurchaseCreateNestedManyWithoutPurchasedItemInput = {
    create?: XOR<Enumerable<PurchaseCreateWithoutPurchasedItemInput>, Enumerable<PurchaseUncheckedCreateWithoutPurchasedItemInput>>
    connectOrCreate?: Enumerable<PurchaseCreateOrConnectWithoutPurchasedItemInput>
    createMany?: PurchaseCreateManyPurchasedItemInputEnvelope
    connect?: Enumerable<PurchaseWhereUniqueInput>
  }

  export type TagCreateNestedOneWithoutOfferCategoryInput = {
    create?: XOR<TagCreateWithoutOfferCategoryInput, TagUncheckedCreateWithoutOfferCategoryInput>
    connectOrCreate?: TagCreateOrConnectWithoutOfferCategoryInput
    connect?: TagWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutOfferUnitInput = {
    create?: XOR<TagCreateWithoutOfferUnitInput, TagUncheckedCreateWithoutOfferUnitInput>
    connectOrCreate?: TagCreateOrConnectWithoutOfferUnitInput
    connect?: TagWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutOfferDeliveryTermsInput = {
    create?: XOR<TagCreateWithoutOfferDeliveryTermsInput, TagUncheckedCreateWithoutOfferDeliveryTermsInput>
    connectOrCreate?: TagCreateOrConnectWithoutOfferDeliveryTermsInput
    connect?: TagWhereUniqueInput
  }

  export type SubscriptionCreateNestedManyWithoutSubscribingToOfferInput = {
    create?: XOR<Enumerable<SubscriptionCreateWithoutSubscribingToOfferInput>, Enumerable<SubscriptionUncheckedCreateWithoutSubscribingToOfferInput>>
    connectOrCreate?: Enumerable<SubscriptionCreateOrConnectWithoutSubscribingToOfferInput>
    createMany?: SubscriptionCreateManySubscribingToOfferInputEnvelope
    connect?: Enumerable<SubscriptionWhereUniqueInput>
  }

  export type PurchaseUncheckedCreateNestedManyWithoutPurchasedItemInput = {
    create?: XOR<Enumerable<PurchaseCreateWithoutPurchasedItemInput>, Enumerable<PurchaseUncheckedCreateWithoutPurchasedItemInput>>
    connectOrCreate?: Enumerable<PurchaseCreateOrConnectWithoutPurchasedItemInput>
    createMany?: PurchaseCreateManyPurchasedItemInputEnvelope
    connect?: Enumerable<PurchaseWhereUniqueInput>
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutSubscribingToOfferInput = {
    create?: XOR<Enumerable<SubscriptionCreateWithoutSubscribingToOfferInput>, Enumerable<SubscriptionUncheckedCreateWithoutSubscribingToOfferInput>>
    connectOrCreate?: Enumerable<SubscriptionCreateOrConnectWithoutSubscribingToOfferInput>
    createMany?: SubscriptionCreateManySubscribingToOfferInputEnvelope
    connect?: Enumerable<SubscriptionWhereUniqueInput>
  }

  export type ProfileUpdateOneRequiredWithoutOffersInput = {
    create?: XOR<ProfileCreateWithoutOffersInput, ProfileUncheckedCreateWithoutOffersInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutOffersInput
    upsert?: ProfileUpsertWithoutOffersInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<ProfileUpdateWithoutOffersInput, ProfileUncheckedUpdateWithoutOffersInput>
  }

  export type PurchaseUpdateManyWithoutPurchasedItemInput = {
    create?: XOR<Enumerable<PurchaseCreateWithoutPurchasedItemInput>, Enumerable<PurchaseUncheckedCreateWithoutPurchasedItemInput>>
    connectOrCreate?: Enumerable<PurchaseCreateOrConnectWithoutPurchasedItemInput>
    upsert?: Enumerable<PurchaseUpsertWithWhereUniqueWithoutPurchasedItemInput>
    createMany?: PurchaseCreateManyPurchasedItemInputEnvelope
    connect?: Enumerable<PurchaseWhereUniqueInput>
    set?: Enumerable<PurchaseWhereUniqueInput>
    disconnect?: Enumerable<PurchaseWhereUniqueInput>
    delete?: Enumerable<PurchaseWhereUniqueInput>
    update?: Enumerable<PurchaseUpdateWithWhereUniqueWithoutPurchasedItemInput>
    updateMany?: Enumerable<PurchaseUpdateManyWithWhereWithoutPurchasedItemInput>
    deleteMany?: Enumerable<PurchaseScalarWhereInput>
  }

  export type TagUpdateOneRequiredWithoutOfferCategoryInput = {
    create?: XOR<TagCreateWithoutOfferCategoryInput, TagUncheckedCreateWithoutOfferCategoryInput>
    connectOrCreate?: TagCreateOrConnectWithoutOfferCategoryInput
    upsert?: TagUpsertWithoutOfferCategoryInput
    connect?: TagWhereUniqueInput
    update?: XOR<TagUpdateWithoutOfferCategoryInput, TagUncheckedUpdateWithoutOfferCategoryInput>
  }

  export type TagUpdateOneRequiredWithoutOfferUnitInput = {
    create?: XOR<TagCreateWithoutOfferUnitInput, TagUncheckedCreateWithoutOfferUnitInput>
    connectOrCreate?: TagCreateOrConnectWithoutOfferUnitInput
    upsert?: TagUpsertWithoutOfferUnitInput
    connect?: TagWhereUniqueInput
    update?: XOR<TagUpdateWithoutOfferUnitInput, TagUncheckedUpdateWithoutOfferUnitInput>
  }

  export type TagUpdateOneRequiredWithoutOfferDeliveryTermsInput = {
    create?: XOR<TagCreateWithoutOfferDeliveryTermsInput, TagUncheckedCreateWithoutOfferDeliveryTermsInput>
    connectOrCreate?: TagCreateOrConnectWithoutOfferDeliveryTermsInput
    upsert?: TagUpsertWithoutOfferDeliveryTermsInput
    connect?: TagWhereUniqueInput
    update?: XOR<TagUpdateWithoutOfferDeliveryTermsInput, TagUncheckedUpdateWithoutOfferDeliveryTermsInput>
  }

  export type SubscriptionUpdateManyWithoutSubscribingToOfferInput = {
    create?: XOR<Enumerable<SubscriptionCreateWithoutSubscribingToOfferInput>, Enumerable<SubscriptionUncheckedCreateWithoutSubscribingToOfferInput>>
    connectOrCreate?: Enumerable<SubscriptionCreateOrConnectWithoutSubscribingToOfferInput>
    upsert?: Enumerable<SubscriptionUpsertWithWhereUniqueWithoutSubscribingToOfferInput>
    createMany?: SubscriptionCreateManySubscribingToOfferInputEnvelope
    connect?: Enumerable<SubscriptionWhereUniqueInput>
    set?: Enumerable<SubscriptionWhereUniqueInput>
    disconnect?: Enumerable<SubscriptionWhereUniqueInput>
    delete?: Enumerable<SubscriptionWhereUniqueInput>
    update?: Enumerable<SubscriptionUpdateWithWhereUniqueWithoutSubscribingToOfferInput>
    updateMany?: Enumerable<SubscriptionUpdateManyWithWhereWithoutSubscribingToOfferInput>
    deleteMany?: Enumerable<SubscriptionScalarWhereInput>
  }

  export type PurchaseUncheckedUpdateManyWithoutPurchasedItemInput = {
    create?: XOR<Enumerable<PurchaseCreateWithoutPurchasedItemInput>, Enumerable<PurchaseUncheckedCreateWithoutPurchasedItemInput>>
    connectOrCreate?: Enumerable<PurchaseCreateOrConnectWithoutPurchasedItemInput>
    upsert?: Enumerable<PurchaseUpsertWithWhereUniqueWithoutPurchasedItemInput>
    createMany?: PurchaseCreateManyPurchasedItemInputEnvelope
    connect?: Enumerable<PurchaseWhereUniqueInput>
    set?: Enumerable<PurchaseWhereUniqueInput>
    disconnect?: Enumerable<PurchaseWhereUniqueInput>
    delete?: Enumerable<PurchaseWhereUniqueInput>
    update?: Enumerable<PurchaseUpdateWithWhereUniqueWithoutPurchasedItemInput>
    updateMany?: Enumerable<PurchaseUpdateManyWithWhereWithoutPurchasedItemInput>
    deleteMany?: Enumerable<PurchaseScalarWhereInput>
  }

  export type SubscriptionUncheckedUpdateManyWithoutSubscribingToOfferInput = {
    create?: XOR<Enumerable<SubscriptionCreateWithoutSubscribingToOfferInput>, Enumerable<SubscriptionUncheckedCreateWithoutSubscribingToOfferInput>>
    connectOrCreate?: Enumerable<SubscriptionCreateOrConnectWithoutSubscribingToOfferInput>
    upsert?: Enumerable<SubscriptionUpsertWithWhereUniqueWithoutSubscribingToOfferInput>
    createMany?: SubscriptionCreateManySubscribingToOfferInputEnvelope
    connect?: Enumerable<SubscriptionWhereUniqueInput>
    set?: Enumerable<SubscriptionWhereUniqueInput>
    disconnect?: Enumerable<SubscriptionWhereUniqueInput>
    delete?: Enumerable<SubscriptionWhereUniqueInput>
    update?: Enumerable<SubscriptionUpdateWithWhereUniqueWithoutSubscribingToOfferInput>
    updateMany?: Enumerable<SubscriptionUpdateManyWithWhereWithoutSubscribingToOfferInput>
    deleteMany?: Enumerable<SubscriptionScalarWhereInput>
  }

  export type ProfileCreateNestedOneWithoutPurchasesInput = {
    create?: XOR<ProfileCreateWithoutPurchasesInput, ProfileUncheckedCreateWithoutPurchasesInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutPurchasesInput
    connect?: ProfileWhereUniqueInput
  }

  export type OfferCreateNestedOneWithoutPurchasesInput = {
    create?: XOR<OfferCreateWithoutPurchasesInput, OfferUncheckedCreateWithoutPurchasesInput>
    connectOrCreate?: OfferCreateOrConnectWithoutPurchasesInput
    connect?: OfferWhereUniqueInput
  }

  export type TransactionJobsCreateNestedManyWithoutPurchaseInput = {
    create?: XOR<Enumerable<TransactionJobsCreateWithoutPurchaseInput>, Enumerable<TransactionJobsUncheckedCreateWithoutPurchaseInput>>
    connectOrCreate?: Enumerable<TransactionJobsCreateOrConnectWithoutPurchaseInput>
    createMany?: TransactionJobsCreateManyPurchaseInputEnvelope
    connect?: Enumerable<TransactionJobsWhereUniqueInput>
  }

  export type TransactionJobsUncheckedCreateNestedManyWithoutPurchaseInput = {
    create?: XOR<Enumerable<TransactionJobsCreateWithoutPurchaseInput>, Enumerable<TransactionJobsUncheckedCreateWithoutPurchaseInput>>
    connectOrCreate?: Enumerable<TransactionJobsCreateOrConnectWithoutPurchaseInput>
    createMany?: TransactionJobsCreateManyPurchaseInputEnvelope
    connect?: Enumerable<TransactionJobsWhereUniqueInput>
  }

  export type EnumPurchaseStatusFieldUpdateOperationsInput = {
    set?: PurchaseStatus
  }

  export type ProfileUpdateOneRequiredWithoutPurchasesInput = {
    create?: XOR<ProfileCreateWithoutPurchasesInput, ProfileUncheckedCreateWithoutPurchasesInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutPurchasesInput
    upsert?: ProfileUpsertWithoutPurchasesInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<ProfileUpdateWithoutPurchasesInput, ProfileUncheckedUpdateWithoutPurchasesInput>
  }

  export type OfferUpdateOneRequiredWithoutPurchasesInput = {
    create?: XOR<OfferCreateWithoutPurchasesInput, OfferUncheckedCreateWithoutPurchasesInput>
    connectOrCreate?: OfferCreateOrConnectWithoutPurchasesInput
    upsert?: OfferUpsertWithoutPurchasesInput
    connect?: OfferWhereUniqueInput
    update?: XOR<OfferUpdateWithoutPurchasesInput, OfferUncheckedUpdateWithoutPurchasesInput>
  }

  export type TransactionJobsUpdateManyWithoutPurchaseInput = {
    create?: XOR<Enumerable<TransactionJobsCreateWithoutPurchaseInput>, Enumerable<TransactionJobsUncheckedCreateWithoutPurchaseInput>>
    connectOrCreate?: Enumerable<TransactionJobsCreateOrConnectWithoutPurchaseInput>
    upsert?: Enumerable<TransactionJobsUpsertWithWhereUniqueWithoutPurchaseInput>
    createMany?: TransactionJobsCreateManyPurchaseInputEnvelope
    connect?: Enumerable<TransactionJobsWhereUniqueInput>
    set?: Enumerable<TransactionJobsWhereUniqueInput>
    disconnect?: Enumerable<TransactionJobsWhereUniqueInput>
    delete?: Enumerable<TransactionJobsWhereUniqueInput>
    update?: Enumerable<TransactionJobsUpdateWithWhereUniqueWithoutPurchaseInput>
    updateMany?: Enumerable<TransactionJobsUpdateManyWithWhereWithoutPurchaseInput>
    deleteMany?: Enumerable<TransactionJobsScalarWhereInput>
  }

  export type TransactionJobsUncheckedUpdateManyWithoutPurchaseInput = {
    create?: XOR<Enumerable<TransactionJobsCreateWithoutPurchaseInput>, Enumerable<TransactionJobsUncheckedCreateWithoutPurchaseInput>>
    connectOrCreate?: Enumerable<TransactionJobsCreateOrConnectWithoutPurchaseInput>
    upsert?: Enumerable<TransactionJobsUpsertWithWhereUniqueWithoutPurchaseInput>
    createMany?: TransactionJobsCreateManyPurchaseInputEnvelope
    connect?: Enumerable<TransactionJobsWhereUniqueInput>
    set?: Enumerable<TransactionJobsWhereUniqueInput>
    disconnect?: Enumerable<TransactionJobsWhereUniqueInput>
    delete?: Enumerable<TransactionJobsWhereUniqueInput>
    update?: Enumerable<TransactionJobsUpdateWithWhereUniqueWithoutPurchaseInput>
    updateMany?: Enumerable<TransactionJobsUpdateManyWithWhereWithoutPurchaseInput>
    deleteMany?: Enumerable<TransactionJobsScalarWhereInput>
  }

  export type PurchaseCreateNestedOneWithoutJobsInput = {
    create?: XOR<PurchaseCreateWithoutJobsInput, PurchaseUncheckedCreateWithoutJobsInput>
    connectOrCreate?: PurchaseCreateOrConnectWithoutJobsInput
    connect?: PurchaseWhereUniqueInput
  }

  export type PurchaseUpdateOneRequiredWithoutJobsInput = {
    create?: XOR<PurchaseCreateWithoutJobsInput, PurchaseUncheckedCreateWithoutJobsInput>
    connectOrCreate?: PurchaseCreateOrConnectWithoutJobsInput
    upsert?: PurchaseUpsertWithoutJobsInput
    connect?: PurchaseWhereUniqueInput
    update?: XOR<PurchaseUpdateWithoutJobsInput, PurchaseUncheckedUpdateWithoutJobsInput>
  }

  export type TagCreateNestedManyWithoutTypeInput = {
    create?: XOR<Enumerable<TagCreateWithoutTypeInput>, Enumerable<TagUncheckedCreateWithoutTypeInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutTypeInput>
    createMany?: TagCreateManyTypeInputEnvelope
    connect?: Enumerable<TagWhereUniqueInput>
  }

  export type TagUncheckedCreateNestedManyWithoutTypeInput = {
    create?: XOR<Enumerable<TagCreateWithoutTypeInput>, Enumerable<TagUncheckedCreateWithoutTypeInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutTypeInput>
    createMany?: TagCreateManyTypeInputEnvelope
    connect?: Enumerable<TagWhereUniqueInput>
  }

  export type TagUpdateManyWithoutTypeInput = {
    create?: XOR<Enumerable<TagCreateWithoutTypeInput>, Enumerable<TagUncheckedCreateWithoutTypeInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutTypeInput>
    upsert?: Enumerable<TagUpsertWithWhereUniqueWithoutTypeInput>
    createMany?: TagCreateManyTypeInputEnvelope
    connect?: Enumerable<TagWhereUniqueInput>
    set?: Enumerable<TagWhereUniqueInput>
    disconnect?: Enumerable<TagWhereUniqueInput>
    delete?: Enumerable<TagWhereUniqueInput>
    update?: Enumerable<TagUpdateWithWhereUniqueWithoutTypeInput>
    updateMany?: Enumerable<TagUpdateManyWithWhereWithoutTypeInput>
    deleteMany?: Enumerable<TagScalarWhereInput>
  }

  export type TagUncheckedUpdateManyWithoutTypeInput = {
    create?: XOR<Enumerable<TagCreateWithoutTypeInput>, Enumerable<TagUncheckedCreateWithoutTypeInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutTypeInput>
    upsert?: Enumerable<TagUpsertWithWhereUniqueWithoutTypeInput>
    createMany?: TagCreateManyTypeInputEnvelope
    connect?: Enumerable<TagWhereUniqueInput>
    set?: Enumerable<TagWhereUniqueInput>
    disconnect?: Enumerable<TagWhereUniqueInput>
    delete?: Enumerable<TagWhereUniqueInput>
    update?: Enumerable<TagUpdateWithWhereUniqueWithoutTypeInput>
    updateMany?: Enumerable<TagUpdateManyWithWhereWithoutTypeInput>
    deleteMany?: Enumerable<TagScalarWhereInput>
  }

  export type TagCreateNestedManyWithoutTransactionInput = {
    create?: XOR<Enumerable<TagCreateWithoutTransactionInput>, Enumerable<TagUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutTransactionInput>
    createMany?: TagCreateManyTransactionInputEnvelope
    connect?: Enumerable<TagWhereUniqueInput>
  }

  export type TagUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<Enumerable<TagCreateWithoutTransactionInput>, Enumerable<TagUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutTransactionInput>
    createMany?: TagCreateManyTransactionInputEnvelope
    connect?: Enumerable<TagWhereUniqueInput>
  }

  export type TagUpdateManyWithoutTransactionInput = {
    create?: XOR<Enumerable<TagCreateWithoutTransactionInput>, Enumerable<TagUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutTransactionInput>
    upsert?: Enumerable<TagUpsertWithWhereUniqueWithoutTransactionInput>
    createMany?: TagCreateManyTransactionInputEnvelope
    connect?: Enumerable<TagWhereUniqueInput>
    set?: Enumerable<TagWhereUniqueInput>
    disconnect?: Enumerable<TagWhereUniqueInput>
    delete?: Enumerable<TagWhereUniqueInput>
    update?: Enumerable<TagUpdateWithWhereUniqueWithoutTransactionInput>
    updateMany?: Enumerable<TagUpdateManyWithWhereWithoutTransactionInput>
    deleteMany?: Enumerable<TagScalarWhereInput>
  }

  export type TagUncheckedUpdateManyWithoutTransactionInput = {
    create?: XOR<Enumerable<TagCreateWithoutTransactionInput>, Enumerable<TagUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutTransactionInput>
    upsert?: Enumerable<TagUpsertWithWhereUniqueWithoutTransactionInput>
    createMany?: TagCreateManyTransactionInputEnvelope
    connect?: Enumerable<TagWhereUniqueInput>
    set?: Enumerable<TagWhereUniqueInput>
    disconnect?: Enumerable<TagWhereUniqueInput>
    delete?: Enumerable<TagWhereUniqueInput>
    update?: Enumerable<TagUpdateWithWhereUniqueWithoutTransactionInput>
    updateMany?: Enumerable<TagUpdateManyWithWhereWithoutTransactionInput>
    deleteMany?: Enumerable<TagScalarWhereInput>
  }

  export type ProfileCreateNestedOneWithoutTagsInput = {
    create?: XOR<ProfileCreateWithoutTagsInput, ProfileUncheckedCreateWithoutTagsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutTagsInput
    connect?: ProfileWhereUniqueInput
  }

  export type TransactionCreateNestedOneWithoutTagsInput = {
    create?: XOR<TransactionCreateWithoutTagsInput, TransactionUncheckedCreateWithoutTagsInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutTagsInput
    connect?: TransactionWhereUniqueInput
  }

  export type TagTypeCreateNestedOneWithoutTagsInput = {
    create?: XOR<TagTypeCreateWithoutTagsInput, TagTypeUncheckedCreateWithoutTagsInput>
    connectOrCreate?: TagTypeCreateOrConnectWithoutTagsInput
    connect?: TagTypeWhereUniqueInput
  }

  export type ChatMessageCreateNestedOneWithoutTagsInput = {
    create?: XOR<ChatMessageCreateWithoutTagsInput, ChatMessageUncheckedCreateWithoutTagsInput>
    connectOrCreate?: ChatMessageCreateOrConnectWithoutTagsInput
    connect?: ChatMessageWhereUniqueInput
  }

  export type OfferCreateNestedManyWithoutCategoryTagInput = {
    create?: XOR<Enumerable<OfferCreateWithoutCategoryTagInput>, Enumerable<OfferUncheckedCreateWithoutCategoryTagInput>>
    connectOrCreate?: Enumerable<OfferCreateOrConnectWithoutCategoryTagInput>
    createMany?: OfferCreateManyCategoryTagInputEnvelope
    connect?: Enumerable<OfferWhereUniqueInput>
  }

  export type OfferCreateNestedManyWithoutUnitTagInput = {
    create?: XOR<Enumerable<OfferCreateWithoutUnitTagInput>, Enumerable<OfferUncheckedCreateWithoutUnitTagInput>>
    connectOrCreate?: Enumerable<OfferCreateOrConnectWithoutUnitTagInput>
    createMany?: OfferCreateManyUnitTagInputEnvelope
    connect?: Enumerable<OfferWhereUniqueInput>
  }

  export type OfferCreateNestedManyWithoutDeliveryTermsTagInput = {
    create?: XOR<Enumerable<OfferCreateWithoutDeliveryTermsTagInput>, Enumerable<OfferUncheckedCreateWithoutDeliveryTermsTagInput>>
    connectOrCreate?: Enumerable<OfferCreateOrConnectWithoutDeliveryTermsTagInput>
    createMany?: OfferCreateManyDeliveryTermsTagInputEnvelope
    connect?: Enumerable<OfferWhereUniqueInput>
  }

  export type OfferUncheckedCreateNestedManyWithoutCategoryTagInput = {
    create?: XOR<Enumerable<OfferCreateWithoutCategoryTagInput>, Enumerable<OfferUncheckedCreateWithoutCategoryTagInput>>
    connectOrCreate?: Enumerable<OfferCreateOrConnectWithoutCategoryTagInput>
    createMany?: OfferCreateManyCategoryTagInputEnvelope
    connect?: Enumerable<OfferWhereUniqueInput>
  }

  export type OfferUncheckedCreateNestedManyWithoutUnitTagInput = {
    create?: XOR<Enumerable<OfferCreateWithoutUnitTagInput>, Enumerable<OfferUncheckedCreateWithoutUnitTagInput>>
    connectOrCreate?: Enumerable<OfferCreateOrConnectWithoutUnitTagInput>
    createMany?: OfferCreateManyUnitTagInputEnvelope
    connect?: Enumerable<OfferWhereUniqueInput>
  }

  export type OfferUncheckedCreateNestedManyWithoutDeliveryTermsTagInput = {
    create?: XOR<Enumerable<OfferCreateWithoutDeliveryTermsTagInput>, Enumerable<OfferUncheckedCreateWithoutDeliveryTermsTagInput>>
    connectOrCreate?: Enumerable<OfferCreateOrConnectWithoutDeliveryTermsTagInput>
    createMany?: OfferCreateManyDeliveryTermsTagInputEnvelope
    connect?: Enumerable<OfferWhereUniqueInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ProfileUpdateOneRequiredWithoutTagsInput = {
    create?: XOR<ProfileCreateWithoutTagsInput, ProfileUncheckedCreateWithoutTagsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutTagsInput
    upsert?: ProfileUpsertWithoutTagsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<ProfileUpdateWithoutTagsInput, ProfileUncheckedUpdateWithoutTagsInput>
  }

  export type TransactionUpdateOneWithoutTagsInput = {
    create?: XOR<TransactionCreateWithoutTagsInput, TransactionUncheckedCreateWithoutTagsInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutTagsInput
    upsert?: TransactionUpsertWithoutTagsInput
    connect?: TransactionWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<TransactionUpdateWithoutTagsInput, TransactionUncheckedUpdateWithoutTagsInput>
  }

  export type TagTypeUpdateOneRequiredWithoutTagsInput = {
    create?: XOR<TagTypeCreateWithoutTagsInput, TagTypeUncheckedCreateWithoutTagsInput>
    connectOrCreate?: TagTypeCreateOrConnectWithoutTagsInput
    upsert?: TagTypeUpsertWithoutTagsInput
    connect?: TagTypeWhereUniqueInput
    update?: XOR<TagTypeUpdateWithoutTagsInput, TagTypeUncheckedUpdateWithoutTagsInput>
  }

  export type ChatMessageUpdateOneWithoutTagsInput = {
    create?: XOR<ChatMessageCreateWithoutTagsInput, ChatMessageUncheckedCreateWithoutTagsInput>
    connectOrCreate?: ChatMessageCreateOrConnectWithoutTagsInput
    upsert?: ChatMessageUpsertWithoutTagsInput
    connect?: ChatMessageWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<ChatMessageUpdateWithoutTagsInput, ChatMessageUncheckedUpdateWithoutTagsInput>
  }

  export type OfferUpdateManyWithoutCategoryTagInput = {
    create?: XOR<Enumerable<OfferCreateWithoutCategoryTagInput>, Enumerable<OfferUncheckedCreateWithoutCategoryTagInput>>
    connectOrCreate?: Enumerable<OfferCreateOrConnectWithoutCategoryTagInput>
    upsert?: Enumerable<OfferUpsertWithWhereUniqueWithoutCategoryTagInput>
    createMany?: OfferCreateManyCategoryTagInputEnvelope
    connect?: Enumerable<OfferWhereUniqueInput>
    set?: Enumerable<OfferWhereUniqueInput>
    disconnect?: Enumerable<OfferWhereUniqueInput>
    delete?: Enumerable<OfferWhereUniqueInput>
    update?: Enumerable<OfferUpdateWithWhereUniqueWithoutCategoryTagInput>
    updateMany?: Enumerable<OfferUpdateManyWithWhereWithoutCategoryTagInput>
    deleteMany?: Enumerable<OfferScalarWhereInput>
  }

  export type OfferUpdateManyWithoutUnitTagInput = {
    create?: XOR<Enumerable<OfferCreateWithoutUnitTagInput>, Enumerable<OfferUncheckedCreateWithoutUnitTagInput>>
    connectOrCreate?: Enumerable<OfferCreateOrConnectWithoutUnitTagInput>
    upsert?: Enumerable<OfferUpsertWithWhereUniqueWithoutUnitTagInput>
    createMany?: OfferCreateManyUnitTagInputEnvelope
    connect?: Enumerable<OfferWhereUniqueInput>
    set?: Enumerable<OfferWhereUniqueInput>
    disconnect?: Enumerable<OfferWhereUniqueInput>
    delete?: Enumerable<OfferWhereUniqueInput>
    update?: Enumerable<OfferUpdateWithWhereUniqueWithoutUnitTagInput>
    updateMany?: Enumerable<OfferUpdateManyWithWhereWithoutUnitTagInput>
    deleteMany?: Enumerable<OfferScalarWhereInput>
  }

  export type OfferUpdateManyWithoutDeliveryTermsTagInput = {
    create?: XOR<Enumerable<OfferCreateWithoutDeliveryTermsTagInput>, Enumerable<OfferUncheckedCreateWithoutDeliveryTermsTagInput>>
    connectOrCreate?: Enumerable<OfferCreateOrConnectWithoutDeliveryTermsTagInput>
    upsert?: Enumerable<OfferUpsertWithWhereUniqueWithoutDeliveryTermsTagInput>
    createMany?: OfferCreateManyDeliveryTermsTagInputEnvelope
    connect?: Enumerable<OfferWhereUniqueInput>
    set?: Enumerable<OfferWhereUniqueInput>
    disconnect?: Enumerable<OfferWhereUniqueInput>
    delete?: Enumerable<OfferWhereUniqueInput>
    update?: Enumerable<OfferUpdateWithWhereUniqueWithoutDeliveryTermsTagInput>
    updateMany?: Enumerable<OfferUpdateManyWithWhereWithoutDeliveryTermsTagInput>
    deleteMany?: Enumerable<OfferScalarWhereInput>
  }

  export type OfferUncheckedUpdateManyWithoutCategoryTagInput = {
    create?: XOR<Enumerable<OfferCreateWithoutCategoryTagInput>, Enumerable<OfferUncheckedCreateWithoutCategoryTagInput>>
    connectOrCreate?: Enumerable<OfferCreateOrConnectWithoutCategoryTagInput>
    upsert?: Enumerable<OfferUpsertWithWhereUniqueWithoutCategoryTagInput>
    createMany?: OfferCreateManyCategoryTagInputEnvelope
    connect?: Enumerable<OfferWhereUniqueInput>
    set?: Enumerable<OfferWhereUniqueInput>
    disconnect?: Enumerable<OfferWhereUniqueInput>
    delete?: Enumerable<OfferWhereUniqueInput>
    update?: Enumerable<OfferUpdateWithWhereUniqueWithoutCategoryTagInput>
    updateMany?: Enumerable<OfferUpdateManyWithWhereWithoutCategoryTagInput>
    deleteMany?: Enumerable<OfferScalarWhereInput>
  }

  export type OfferUncheckedUpdateManyWithoutUnitTagInput = {
    create?: XOR<Enumerable<OfferCreateWithoutUnitTagInput>, Enumerable<OfferUncheckedCreateWithoutUnitTagInput>>
    connectOrCreate?: Enumerable<OfferCreateOrConnectWithoutUnitTagInput>
    upsert?: Enumerable<OfferUpsertWithWhereUniqueWithoutUnitTagInput>
    createMany?: OfferCreateManyUnitTagInputEnvelope
    connect?: Enumerable<OfferWhereUniqueInput>
    set?: Enumerable<OfferWhereUniqueInput>
    disconnect?: Enumerable<OfferWhereUniqueInput>
    delete?: Enumerable<OfferWhereUniqueInput>
    update?: Enumerable<OfferUpdateWithWhereUniqueWithoutUnitTagInput>
    updateMany?: Enumerable<OfferUpdateManyWithWhereWithoutUnitTagInput>
    deleteMany?: Enumerable<OfferScalarWhereInput>
  }

  export type OfferUncheckedUpdateManyWithoutDeliveryTermsTagInput = {
    create?: XOR<Enumerable<OfferCreateWithoutDeliveryTermsTagInput>, Enumerable<OfferUncheckedCreateWithoutDeliveryTermsTagInput>>
    connectOrCreate?: Enumerable<OfferCreateOrConnectWithoutDeliveryTermsTagInput>
    upsert?: Enumerable<OfferUpsertWithWhereUniqueWithoutDeliveryTermsTagInput>
    createMany?: OfferCreateManyDeliveryTermsTagInputEnvelope
    connect?: Enumerable<OfferWhereUniqueInput>
    set?: Enumerable<OfferWhereUniqueInput>
    disconnect?: Enumerable<OfferWhereUniqueInput>
    delete?: Enumerable<OfferWhereUniqueInput>
    update?: Enumerable<OfferUpdateWithWhereUniqueWithoutDeliveryTermsTagInput>
    updateMany?: Enumerable<OfferUpdateManyWithWhereWithoutDeliveryTermsTagInput>
    deleteMany?: Enumerable<OfferScalarWhereInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedStringFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedStringFilter
    _max?: NestedStringFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedStringFilter
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedStringNullableFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedDateTimeFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedDateTimeNullableFilter
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _avg?: NestedFloatFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    sum?: NestedIntFilter
    _min?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedIntFilter
    _max?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedEnumProfileTypeNullableFilter = {
    equals?: ProfileType | null
    in?: Enumerable<ProfileType> | null
    notIn?: Enumerable<ProfileType> | null
    not?: NestedEnumProfileTypeNullableFilter | ProfileType | null
  }

  export type NestedBoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type NestedEnumProfileTypeNullableWithAggregatesFilter = {
    equals?: ProfileType | null
    in?: Enumerable<ProfileType> | null
    notIn?: Enumerable<ProfileType> | null
    not?: NestedEnumProfileTypeNullableWithAggregatesFilter | ProfileType | null
    _count?: NestedIntNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntNullableFilter
    _min?: NestedEnumProfileTypeNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedEnumProfileTypeNullableFilter
    _max?: NestedEnumProfileTypeNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedEnumProfileTypeNullableFilter
  }

  export type NestedBoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedBoolNullableFilter
  }

  export type NestedEnumPurchaseStatusFilter = {
    equals?: PurchaseStatus
    in?: Enumerable<PurchaseStatus>
    notIn?: Enumerable<PurchaseStatus>
    not?: NestedEnumPurchaseStatusFilter | PurchaseStatus
  }

  export type NestedEnumPurchaseStatusWithAggregatesFilter = {
    equals?: PurchaseStatus
    in?: Enumerable<PurchaseStatus>
    notIn?: Enumerable<PurchaseStatus>
    not?: NestedEnumPurchaseStatusWithAggregatesFilter | PurchaseStatus
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedEnumPurchaseStatusFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedEnumPurchaseStatusFilter
    _max?: NestedEnumPurchaseStatusFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedEnumPurchaseStatusFilter
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedBoolFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedBoolFilter
    _max?: NestedBoolFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedBoolFilter
  }

  export type ProfileCreateWithoutSessionsInput = {
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    tags?: TagCreateNestedManyWithoutCreatedByInput
    offers?: OfferCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipCreateNestedManyWithoutMemberInput
    members?: MembershipCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileUncheckedCreateWithoutSessionsInput = {
    id?: number
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    tags?: TagUncheckedCreateNestedManyWithoutCreatedByInput
    offers?: OfferUncheckedCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutMemberInput
    members?: MembershipUncheckedCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileCreateOrConnectWithoutSessionsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutSessionsInput, ProfileUncheckedCreateWithoutSessionsInput>
  }

  export type ProfileUpsertWithoutSessionsInput = {
    update: XOR<ProfileUpdateWithoutSessionsInput, ProfileUncheckedUpdateWithoutSessionsInput>
    create: XOR<ProfileCreateWithoutSessionsInput, ProfileUncheckedCreateWithoutSessionsInput>
  }

  export type ProfileUpdateWithoutSessionsInput = {
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: TagUpdateManyWithoutCreatedByInput
    offers?: OfferUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUpdateManyWithoutSubscriberInput
    memberships?: MembershipUpdateManyWithoutMemberInput
    members?: MembershipUpdateManyWithoutMemberAtInput
  }

  export type ProfileUncheckedUpdateWithoutSessionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: TagUncheckedUpdateManyWithoutCreatedByInput
    offers?: OfferUncheckedUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutSubscriberInput
    memberships?: MembershipUncheckedUpdateManyWithoutMemberInput
    members?: MembershipUncheckedUpdateManyWithoutMemberAtInput
  }

  export type ProfileCreateWithoutInvitationsInput = {
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionCreateNestedManyWithoutProfileInput
    tags?: TagCreateNestedManyWithoutCreatedByInput
    offers?: OfferCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseCreateNestedManyWithoutPurchasedByInput
    redeemInvitationRequests?: RedeemInvitationRequestCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipCreateNestedManyWithoutMemberInput
    members?: MembershipCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileUncheckedCreateWithoutInvitationsInput = {
    id?: number
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutProfileInput
    tags?: TagUncheckedCreateNestedManyWithoutCreatedByInput
    offers?: OfferUncheckedCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedCreateNestedManyWithoutPurchasedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutMemberInput
    members?: MembershipUncheckedCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileCreateOrConnectWithoutInvitationsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutInvitationsInput, ProfileUncheckedCreateWithoutInvitationsInput>
  }

  export type ProfileCreateWithoutClaimedInvitationsInput = {
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionCreateNestedManyWithoutProfileInput
    tags?: TagCreateNestedManyWithoutCreatedByInput
    offers?: OfferCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationCreateNestedManyWithoutRedeemedByInput
    subscribers?: SubscriptionCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipCreateNestedManyWithoutMemberInput
    members?: MembershipCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileUncheckedCreateWithoutClaimedInvitationsInput = {
    id?: number
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutProfileInput
    tags?: TagUncheckedCreateNestedManyWithoutCreatedByInput
    offers?: OfferUncheckedCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedCreateNestedManyWithoutRedeemedByInput
    subscribers?: SubscriptionUncheckedCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutMemberInput
    members?: MembershipUncheckedCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileCreateOrConnectWithoutClaimedInvitationsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutClaimedInvitationsInput, ProfileUncheckedCreateWithoutClaimedInvitationsInput>
  }

  export type ProfileCreateWithoutRedeemedInvitationsInput = {
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionCreateNestedManyWithoutProfileInput
    tags?: TagCreateNestedManyWithoutCreatedByInput
    offers?: OfferCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestCreateNestedManyWithoutCreatedByInput
    claimedInvitations?: InvitationCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipCreateNestedManyWithoutMemberInput
    members?: MembershipCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileUncheckedCreateWithoutRedeemedInvitationsInput = {
    id?: number
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutProfileInput
    tags?: TagUncheckedCreateNestedManyWithoutCreatedByInput
    offers?: OfferUncheckedCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedCreateNestedManyWithoutCreatedByInput
    claimedInvitations?: InvitationUncheckedCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutMemberInput
    members?: MembershipUncheckedCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileCreateOrConnectWithoutRedeemedInvitationsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutRedeemedInvitationsInput, ProfileUncheckedCreateWithoutRedeemedInvitationsInput>
  }

  export type RedeemInvitationRequestCreateWithoutInvitationToRedeemInput = {
    createdAt: Date | string
    workerProcess?: string | null
    pickedAt?: Date | string | null
    createdBy: ProfileCreateNestedOneWithoutRedeemInvitationRequestsInput
  }

  export type RedeemInvitationRequestUncheckedCreateWithoutInvitationToRedeemInput = {
    id?: number
    createdAt: Date | string
    createdByProfileId: number
    workerProcess?: string | null
    pickedAt?: Date | string | null
  }

  export type RedeemInvitationRequestCreateOrConnectWithoutInvitationToRedeemInput = {
    where: RedeemInvitationRequestWhereUniqueInput
    create: XOR<RedeemInvitationRequestCreateWithoutInvitationToRedeemInput, RedeemInvitationRequestUncheckedCreateWithoutInvitationToRedeemInput>
  }

  export type RedeemInvitationRequestCreateManyInvitationToRedeemInputEnvelope = {
    data: Enumerable<RedeemInvitationRequestCreateManyInvitationToRedeemInput>
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutInvitationsInput = {
    update: XOR<ProfileUpdateWithoutInvitationsInput, ProfileUncheckedUpdateWithoutInvitationsInput>
    create: XOR<ProfileCreateWithoutInvitationsInput, ProfileUncheckedCreateWithoutInvitationsInput>
  }

  export type ProfileUpdateWithoutInvitationsInput = {
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutProfileInput
    tags?: TagUpdateManyWithoutCreatedByInput
    offers?: OfferUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUpdateManyWithoutPurchasedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUpdateManyWithoutSubscriberInput
    memberships?: MembershipUpdateManyWithoutMemberInput
    members?: MembershipUpdateManyWithoutMemberAtInput
  }

  export type ProfileUncheckedUpdateWithoutInvitationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutProfileInput
    tags?: TagUncheckedUpdateManyWithoutCreatedByInput
    offers?: OfferUncheckedUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedUpdateManyWithoutPurchasedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutSubscriberInput
    memberships?: MembershipUncheckedUpdateManyWithoutMemberInput
    members?: MembershipUncheckedUpdateManyWithoutMemberAtInput
  }

  export type ProfileUpsertWithoutClaimedInvitationsInput = {
    update: XOR<ProfileUpdateWithoutClaimedInvitationsInput, ProfileUncheckedUpdateWithoutClaimedInvitationsInput>
    create: XOR<ProfileCreateWithoutClaimedInvitationsInput, ProfileUncheckedCreateWithoutClaimedInvitationsInput>
  }

  export type ProfileUpdateWithoutClaimedInvitationsInput = {
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutProfileInput
    tags?: TagUpdateManyWithoutCreatedByInput
    offers?: OfferUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUpdateManyWithoutRedeemedByInput
    subscribers?: SubscriptionUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUpdateManyWithoutSubscriberInput
    memberships?: MembershipUpdateManyWithoutMemberInput
    members?: MembershipUpdateManyWithoutMemberAtInput
  }

  export type ProfileUncheckedUpdateWithoutClaimedInvitationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutProfileInput
    tags?: TagUncheckedUpdateManyWithoutCreatedByInput
    offers?: OfferUncheckedUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedUpdateManyWithoutRedeemedByInput
    subscribers?: SubscriptionUncheckedUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutSubscriberInput
    memberships?: MembershipUncheckedUpdateManyWithoutMemberInput
    members?: MembershipUncheckedUpdateManyWithoutMemberAtInput
  }

  export type ProfileUpsertWithoutRedeemedInvitationsInput = {
    update: XOR<ProfileUpdateWithoutRedeemedInvitationsInput, ProfileUncheckedUpdateWithoutRedeemedInvitationsInput>
    create: XOR<ProfileCreateWithoutRedeemedInvitationsInput, ProfileUncheckedCreateWithoutRedeemedInvitationsInput>
  }

  export type ProfileUpdateWithoutRedeemedInvitationsInput = {
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutProfileInput
    tags?: TagUpdateManyWithoutCreatedByInput
    offers?: OfferUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUpdateManyWithoutCreatedByInput
    claimedInvitations?: InvitationUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUpdateManyWithoutSubscriberInput
    memberships?: MembershipUpdateManyWithoutMemberInput
    members?: MembershipUpdateManyWithoutMemberAtInput
  }

  export type ProfileUncheckedUpdateWithoutRedeemedInvitationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutProfileInput
    tags?: TagUncheckedUpdateManyWithoutCreatedByInput
    offers?: OfferUncheckedUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedUpdateManyWithoutCreatedByInput
    claimedInvitations?: InvitationUncheckedUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutSubscriberInput
    memberships?: MembershipUncheckedUpdateManyWithoutMemberInput
    members?: MembershipUncheckedUpdateManyWithoutMemberAtInput
  }

  export type RedeemInvitationRequestUpsertWithWhereUniqueWithoutInvitationToRedeemInput = {
    where: RedeemInvitationRequestWhereUniqueInput
    update: XOR<RedeemInvitationRequestUpdateWithoutInvitationToRedeemInput, RedeemInvitationRequestUncheckedUpdateWithoutInvitationToRedeemInput>
    create: XOR<RedeemInvitationRequestCreateWithoutInvitationToRedeemInput, RedeemInvitationRequestUncheckedCreateWithoutInvitationToRedeemInput>
  }

  export type RedeemInvitationRequestUpdateWithWhereUniqueWithoutInvitationToRedeemInput = {
    where: RedeemInvitationRequestWhereUniqueInput
    data: XOR<RedeemInvitationRequestUpdateWithoutInvitationToRedeemInput, RedeemInvitationRequestUncheckedUpdateWithoutInvitationToRedeemInput>
  }

  export type RedeemInvitationRequestUpdateManyWithWhereWithoutInvitationToRedeemInput = {
    where: RedeemInvitationRequestScalarWhereInput
    data: XOR<RedeemInvitationRequestUpdateManyMutationInput, RedeemInvitationRequestUncheckedUpdateManyWithoutIndexedTransactionsInput>
  }

  export type RedeemInvitationRequestScalarWhereInput = {
    AND?: Enumerable<RedeemInvitationRequestScalarWhereInput>
    OR?: Enumerable<RedeemInvitationRequestScalarWhereInput>
    NOT?: Enumerable<RedeemInvitationRequestScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    createdByProfileId?: IntFilter | number
    workerProcess?: StringNullableFilter | string | null
    pickedAt?: DateTimeNullableFilter | Date | string | null
    invitationToRedeemId?: IntFilter | number
  }

  export type ProfileCreateWithoutRedeemInvitationRequestsInput = {
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionCreateNestedManyWithoutProfileInput
    tags?: TagCreateNestedManyWithoutCreatedByInput
    offers?: OfferCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipCreateNestedManyWithoutMemberInput
    members?: MembershipCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileUncheckedCreateWithoutRedeemInvitationRequestsInput = {
    id?: number
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutProfileInput
    tags?: TagUncheckedCreateNestedManyWithoutCreatedByInput
    offers?: OfferUncheckedCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutMemberInput
    members?: MembershipUncheckedCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileCreateOrConnectWithoutRedeemInvitationRequestsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutRedeemInvitationRequestsInput, ProfileUncheckedCreateWithoutRedeemInvitationRequestsInput>
  }

  export type InvitationCreateWithoutIndexedTransactionsInput = {
    createdAt: Date | string
    name: string
    code: string
    claimedAt?: Date | string | null
    redeemedAt?: Date | string | null
    redeemTxHash?: string | null
    address: string
    key: string
    createdBy: ProfileCreateNestedOneWithoutInvitationsInput
    claimedBy?: ProfileCreateNestedOneWithoutClaimedInvitationsInput
    redeemedBy?: ProfileCreateNestedOneWithoutRedeemedInvitationsInput
  }

  export type InvitationUncheckedCreateWithoutIndexedTransactionsInput = {
    id?: number
    createdByProfileId: number
    createdAt: Date | string
    name: string
    code: string
    claimedByProfileId?: number | null
    claimedAt?: Date | string | null
    redeemedByProfileId?: number | null
    redeemedAt?: Date | string | null
    redeemTxHash?: string | null
    address: string
    key: string
  }

  export type InvitationCreateOrConnectWithoutIndexedTransactionsInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutIndexedTransactionsInput, InvitationUncheckedCreateWithoutIndexedTransactionsInput>
  }

  export type ProfileUpsertWithoutRedeemInvitationRequestsInput = {
    update: XOR<ProfileUpdateWithoutRedeemInvitationRequestsInput, ProfileUncheckedUpdateWithoutRedeemInvitationRequestsInput>
    create: XOR<ProfileCreateWithoutRedeemInvitationRequestsInput, ProfileUncheckedCreateWithoutRedeemInvitationRequestsInput>
  }

  export type ProfileUpdateWithoutRedeemInvitationRequestsInput = {
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutProfileInput
    tags?: TagUpdateManyWithoutCreatedByInput
    offers?: OfferUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUpdateManyWithoutSubscriberInput
    memberships?: MembershipUpdateManyWithoutMemberInput
    members?: MembershipUpdateManyWithoutMemberAtInput
  }

  export type ProfileUncheckedUpdateWithoutRedeemInvitationRequestsInput = {
    id?: IntFieldUpdateOperationsInput | number
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutProfileInput
    tags?: TagUncheckedUpdateManyWithoutCreatedByInput
    offers?: OfferUncheckedUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutSubscriberInput
    memberships?: MembershipUncheckedUpdateManyWithoutMemberInput
    members?: MembershipUncheckedUpdateManyWithoutMemberAtInput
  }

  export type InvitationUpsertWithoutIndexedTransactionsInput = {
    update: XOR<InvitationUpdateWithoutIndexedTransactionsInput, InvitationUncheckedUpdateWithoutIndexedTransactionsInput>
    create: XOR<InvitationCreateWithoutIndexedTransactionsInput, InvitationUncheckedCreateWithoutIndexedTransactionsInput>
  }

  export type InvitationUpdateWithoutIndexedTransactionsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    createdBy?: ProfileUpdateOneRequiredWithoutInvitationsInput
    claimedBy?: ProfileUpdateOneWithoutClaimedInvitationsInput
    redeemedBy?: ProfileUpdateOneWithoutRedeemedInvitationsInput
  }

  export type InvitationUncheckedUpdateWithoutIndexedTransactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    claimedByProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedByProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateWithoutProfileInput = {
    sessionId: string
    emailAddress?: string | null
    ethAddress?: string | null
    challengeHash?: string | null
    signature?: string | null
    issuedBy: string
    jti?: string | null
    createdAt: Date | string
    validFrom?: Date | string | null
    endedAt?: Date | string | null
    endReason?: string | null
    maxLifetime: number
  }

  export type SessionUncheckedCreateWithoutProfileInput = {
    sessionId: string
    emailAddress?: string | null
    ethAddress?: string | null
    challengeHash?: string | null
    signature?: string | null
    issuedBy: string
    jti?: string | null
    createdAt: Date | string
    validFrom?: Date | string | null
    endedAt?: Date | string | null
    endReason?: string | null
    maxLifetime: number
  }

  export type SessionCreateOrConnectWithoutProfileInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutProfileInput, SessionUncheckedCreateWithoutProfileInput>
  }

  export type SessionCreateManyProfileInputEnvelope = {
    data: Enumerable<SessionCreateManyProfileInput>
    skipDuplicates?: boolean
  }

  export type TagCreateWithoutCreatedByInput = {
    createdAt: Date | string
    isPrivate: boolean
    value?: string | null
    transaction?: TransactionCreateNestedOneWithoutTagsInput
    type: TagTypeCreateNestedOneWithoutTagsInput
    chatMessage?: ChatMessageCreateNestedOneWithoutTagsInput
    offerCategory?: OfferCreateNestedManyWithoutCategoryTagInput
    offerUnit?: OfferCreateNestedManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferCreateNestedManyWithoutDeliveryTermsTagInput
  }

  export type TagUncheckedCreateWithoutCreatedByInput = {
    id?: number
    createdAt: Date | string
    isPrivate: boolean
    transactionHash?: string | null
    typeId: string
    chatMessageId?: number | null
    value?: string | null
    offerCategory?: OfferUncheckedCreateNestedManyWithoutCategoryTagInput
    offerUnit?: OfferUncheckedCreateNestedManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferUncheckedCreateNestedManyWithoutDeliveryTermsTagInput
  }

  export type TagCreateOrConnectWithoutCreatedByInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutCreatedByInput, TagUncheckedCreateWithoutCreatedByInput>
  }

  export type TagCreateManyCreatedByInputEnvelope = {
    data: Enumerable<TagCreateManyCreatedByInput>
    skipDuplicates?: boolean
  }

  export type OfferCreateWithoutCreatedByInput = {
    publishedAt: Date | string
    unlistedAt?: Date | string | null
    title: string
    pictureUrl?: string | null
    pictureMimeType?: string | null
    description?: string | null
    geonameid: number
    pricePerUnit: string
    maxUnits?: number | null
    purchases?: PurchaseCreateNestedManyWithoutPurchasedItemInput
    categoryTag: TagCreateNestedOneWithoutOfferCategoryInput
    unitTag: TagCreateNestedOneWithoutOfferUnitInput
    deliveryTermsTag: TagCreateNestedOneWithoutOfferDeliveryTermsInput
    subscribers?: SubscriptionCreateNestedManyWithoutSubscribingToOfferInput
  }

  export type OfferUncheckedCreateWithoutCreatedByInput = {
    id?: number
    publishedAt: Date | string
    unlistedAt?: Date | string | null
    title: string
    pictureUrl?: string | null
    pictureMimeType?: string | null
    description?: string | null
    categoryTagId: number
    geonameid: number
    pricePerUnit: string
    unitTagId: number
    maxUnits?: number | null
    deliveryTermsTagId: number
    purchases?: PurchaseUncheckedCreateNestedManyWithoutPurchasedItemInput
    subscribers?: SubscriptionUncheckedCreateNestedManyWithoutSubscribingToOfferInput
  }

  export type OfferCreateOrConnectWithoutCreatedByInput = {
    where: OfferWhereUniqueInput
    create: XOR<OfferCreateWithoutCreatedByInput, OfferUncheckedCreateWithoutCreatedByInput>
  }

  export type OfferCreateManyCreatedByInputEnvelope = {
    data: Enumerable<OfferCreateManyCreatedByInput>
    skipDuplicates?: boolean
  }

  export type PurchaseCreateWithoutPurchasedByInput = {
    purchasedAt: Date | string
    purchasedProvenAt?: Date | string | null
    purchasedItemTitle: string
    pricePerUnit: string
    purchasedUnits: number
    grandTotal: string
    purchasedItemVat: number
    status: PurchaseStatus
    purchasedItem: OfferCreateNestedOneWithoutPurchasesInput
    jobs?: TransactionJobsCreateNestedManyWithoutPurchaseInput
  }

  export type PurchaseUncheckedCreateWithoutPurchasedByInput = {
    id?: number
    purchasedAt: Date | string
    purchasedProvenAt?: Date | string | null
    purchasedItemId: number
    purchasedItemTitle: string
    pricePerUnit: string
    purchasedUnits: number
    grandTotal: string
    purchasedItemVat: number
    status: PurchaseStatus
    jobs?: TransactionJobsUncheckedCreateNestedManyWithoutPurchaseInput
  }

  export type PurchaseCreateOrConnectWithoutPurchasedByInput = {
    where: PurchaseWhereUniqueInput
    create: XOR<PurchaseCreateWithoutPurchasedByInput, PurchaseUncheckedCreateWithoutPurchasedByInput>
  }

  export type PurchaseCreateManyPurchasedByInputEnvelope = {
    data: Enumerable<PurchaseCreateManyPurchasedByInput>
    skipDuplicates?: boolean
  }

  export type InvitationCreateWithoutCreatedByInput = {
    createdAt: Date | string
    name: string
    code: string
    claimedAt?: Date | string | null
    redeemedAt?: Date | string | null
    redeemTxHash?: string | null
    address: string
    key: string
    claimedBy?: ProfileCreateNestedOneWithoutClaimedInvitationsInput
    redeemedBy?: ProfileCreateNestedOneWithoutRedeemedInvitationsInput
    indexedTransactions?: RedeemInvitationRequestCreateNestedManyWithoutInvitationToRedeemInput
  }

  export type InvitationUncheckedCreateWithoutCreatedByInput = {
    id?: number
    createdAt: Date | string
    name: string
    code: string
    claimedByProfileId?: number | null
    claimedAt?: Date | string | null
    redeemedByProfileId?: number | null
    redeemedAt?: Date | string | null
    redeemTxHash?: string | null
    address: string
    key: string
    indexedTransactions?: RedeemInvitationRequestUncheckedCreateNestedManyWithoutInvitationToRedeemInput
  }

  export type InvitationCreateOrConnectWithoutCreatedByInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutCreatedByInput, InvitationUncheckedCreateWithoutCreatedByInput>
  }

  export type InvitationCreateManyCreatedByInputEnvelope = {
    data: Enumerable<InvitationCreateManyCreatedByInput>
    skipDuplicates?: boolean
  }

  export type RedeemInvitationRequestCreateWithoutCreatedByInput = {
    createdAt: Date | string
    workerProcess?: string | null
    pickedAt?: Date | string | null
    invitationToRedeem: InvitationCreateNestedOneWithoutIndexedTransactionsInput
  }

  export type RedeemInvitationRequestUncheckedCreateWithoutCreatedByInput = {
    id?: number
    createdAt: Date | string
    workerProcess?: string | null
    pickedAt?: Date | string | null
    invitationToRedeemId: number
  }

  export type RedeemInvitationRequestCreateOrConnectWithoutCreatedByInput = {
    where: RedeemInvitationRequestWhereUniqueInput
    create: XOR<RedeemInvitationRequestCreateWithoutCreatedByInput, RedeemInvitationRequestUncheckedCreateWithoutCreatedByInput>
  }

  export type RedeemInvitationRequestCreateManyCreatedByInputEnvelope = {
    data: Enumerable<RedeemInvitationRequestCreateManyCreatedByInput>
    skipDuplicates?: boolean
  }

  export type InvitationCreateWithoutRedeemedByInput = {
    createdAt: Date | string
    name: string
    code: string
    claimedAt?: Date | string | null
    redeemedAt?: Date | string | null
    redeemTxHash?: string | null
    address: string
    key: string
    createdBy: ProfileCreateNestedOneWithoutInvitationsInput
    claimedBy?: ProfileCreateNestedOneWithoutClaimedInvitationsInput
    indexedTransactions?: RedeemInvitationRequestCreateNestedManyWithoutInvitationToRedeemInput
  }

  export type InvitationUncheckedCreateWithoutRedeemedByInput = {
    id?: number
    createdByProfileId: number
    createdAt: Date | string
    name: string
    code: string
    claimedByProfileId?: number | null
    claimedAt?: Date | string | null
    redeemedAt?: Date | string | null
    redeemTxHash?: string | null
    address: string
    key: string
    indexedTransactions?: RedeemInvitationRequestUncheckedCreateNestedManyWithoutInvitationToRedeemInput
  }

  export type InvitationCreateOrConnectWithoutRedeemedByInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutRedeemedByInput, InvitationUncheckedCreateWithoutRedeemedByInput>
  }

  export type InvitationCreateManyRedeemedByInputEnvelope = {
    data: Enumerable<InvitationCreateManyRedeemedByInput>
    skipDuplicates?: boolean
  }

  export type InvitationCreateWithoutClaimedByInput = {
    createdAt: Date | string
    name: string
    code: string
    claimedAt?: Date | string | null
    redeemedAt?: Date | string | null
    redeemTxHash?: string | null
    address: string
    key: string
    createdBy: ProfileCreateNestedOneWithoutInvitationsInput
    redeemedBy?: ProfileCreateNestedOneWithoutRedeemedInvitationsInput
    indexedTransactions?: RedeemInvitationRequestCreateNestedManyWithoutInvitationToRedeemInput
  }

  export type InvitationUncheckedCreateWithoutClaimedByInput = {
    id?: number
    createdByProfileId: number
    createdAt: Date | string
    name: string
    code: string
    claimedAt?: Date | string | null
    redeemedByProfileId?: number | null
    redeemedAt?: Date | string | null
    redeemTxHash?: string | null
    address: string
    key: string
    indexedTransactions?: RedeemInvitationRequestUncheckedCreateNestedManyWithoutInvitationToRedeemInput
  }

  export type InvitationCreateOrConnectWithoutClaimedByInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutClaimedByInput, InvitationUncheckedCreateWithoutClaimedByInput>
  }

  export type InvitationCreateManyClaimedByInputEnvelope = {
    data: Enumerable<InvitationCreateManyClaimedByInput>
    skipDuplicates?: boolean
  }

  export type SubscriptionCreateWithoutSubscribingToProfileInput = {
    createdAt: Date | string
    subscribingToOfferId?: number | null
    subscribingToProfileId?: number | null
    subscriber: ProfileCreateNestedOneWithoutSubscriptionsInput
    subscribingToOffer?: OfferCreateNestedOneWithoutSubscribersInput
  }

  export type SubscriptionUncheckedCreateWithoutSubscribingToProfileInput = {
    id?: number
    createdAt: Date | string
    subscribingToOfferId?: number | null
    subscribingToProfileId?: number | null
  }

  export type SubscriptionCreateOrConnectWithoutSubscribingToProfileInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutSubscribingToProfileInput, SubscriptionUncheckedCreateWithoutSubscribingToProfileInput>
  }

  export type SubscriptionCreateManySubscribingToProfileInputEnvelope = {
    data: Enumerable<SubscriptionCreateManySubscribingToProfileInput>
    skipDuplicates?: boolean
  }

  export type SubscriptionCreateWithoutSubscriberInput = {
    createdAt: Date | string
    subscribingToOfferId?: number | null
    subscribingToProfileId?: number | null
    subscribingToOffer?: OfferCreateNestedOneWithoutSubscribersInput
    subscribingToProfile?: ProfileCreateNestedOneWithoutSubscribersInput
  }

  export type SubscriptionUncheckedCreateWithoutSubscriberInput = {
    id?: number
    createdAt: Date | string
    subscribingToOfferId?: number | null
    subscribingToProfileId?: number | null
  }

  export type SubscriptionCreateOrConnectWithoutSubscriberInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutSubscriberInput, SubscriptionUncheckedCreateWithoutSubscriberInput>
  }

  export type SubscriptionCreateManySubscriberInputEnvelope = {
    data: Enumerable<SubscriptionCreateManySubscriberInput>
    skipDuplicates?: boolean
  }

  export type MembershipCreateWithoutMemberInput = {
    createdAt?: Date | string
    memberAt: ProfileCreateNestedOneWithoutMembersInput
  }

  export type MembershipUncheckedCreateWithoutMemberInput = {
    id?: number
    createdAt?: Date | string
    memberAtId: number
  }

  export type MembershipCreateOrConnectWithoutMemberInput = {
    where: MembershipWhereUniqueInput
    create: XOR<MembershipCreateWithoutMemberInput, MembershipUncheckedCreateWithoutMemberInput>
  }

  export type MembershipCreateManyMemberInputEnvelope = {
    data: Enumerable<MembershipCreateManyMemberInput>
    skipDuplicates?: boolean
  }

  export type MembershipCreateWithoutMemberAtInput = {
    createdAt?: Date | string
    member: ProfileCreateNestedOneWithoutMembershipsInput
  }

  export type MembershipUncheckedCreateWithoutMemberAtInput = {
    id?: number
    createdAt?: Date | string
    memberId: number
  }

  export type MembershipCreateOrConnectWithoutMemberAtInput = {
    where: MembershipWhereUniqueInput
    create: XOR<MembershipCreateWithoutMemberAtInput, MembershipUncheckedCreateWithoutMemberAtInput>
  }

  export type MembershipCreateManyMemberAtInputEnvelope = {
    data: Enumerable<MembershipCreateManyMemberAtInput>
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutProfileInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutProfileInput, SessionUncheckedUpdateWithoutProfileInput>
    create: XOR<SessionCreateWithoutProfileInput, SessionUncheckedCreateWithoutProfileInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutProfileInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutProfileInput, SessionUncheckedUpdateWithoutProfileInput>
  }

  export type SessionUpdateManyWithWhereWithoutProfileInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutSessionsInput>
  }

  export type SessionScalarWhereInput = {
    AND?: Enumerable<SessionScalarWhereInput>
    OR?: Enumerable<SessionScalarWhereInput>
    NOT?: Enumerable<SessionScalarWhereInput>
    sessionId?: StringFilter | string
    emailAddress?: StringNullableFilter | string | null
    ethAddress?: StringNullableFilter | string | null
    challengeHash?: StringNullableFilter | string | null
    signature?: StringNullableFilter | string | null
    profileId?: IntNullableFilter | number | null
    issuedBy?: StringFilter | string
    jti?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    validFrom?: DateTimeNullableFilter | Date | string | null
    endedAt?: DateTimeNullableFilter | Date | string | null
    endReason?: StringNullableFilter | string | null
    maxLifetime?: IntFilter | number
  }

  export type TagUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutCreatedByInput, TagUncheckedUpdateWithoutCreatedByInput>
    create: XOR<TagCreateWithoutCreatedByInput, TagUncheckedCreateWithoutCreatedByInput>
  }

  export type TagUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutCreatedByInput, TagUncheckedUpdateWithoutCreatedByInput>
  }

  export type TagUpdateManyWithWhereWithoutCreatedByInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutTagsInput>
  }

  export type TagScalarWhereInput = {
    AND?: Enumerable<TagScalarWhereInput>
    OR?: Enumerable<TagScalarWhereInput>
    NOT?: Enumerable<TagScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    createdByProfileId?: IntFilter | number
    isPrivate?: BoolFilter | boolean
    transactionHash?: StringNullableFilter | string | null
    typeId?: StringFilter | string
    chatMessageId?: IntNullableFilter | number | null
    value?: StringNullableFilter | string | null
  }

  export type OfferUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: OfferWhereUniqueInput
    update: XOR<OfferUpdateWithoutCreatedByInput, OfferUncheckedUpdateWithoutCreatedByInput>
    create: XOR<OfferCreateWithoutCreatedByInput, OfferUncheckedCreateWithoutCreatedByInput>
  }

  export type OfferUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: OfferWhereUniqueInput
    data: XOR<OfferUpdateWithoutCreatedByInput, OfferUncheckedUpdateWithoutCreatedByInput>
  }

  export type OfferUpdateManyWithWhereWithoutCreatedByInput = {
    where: OfferScalarWhereInput
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyWithoutOffersInput>
  }

  export type OfferScalarWhereInput = {
    AND?: Enumerable<OfferScalarWhereInput>
    OR?: Enumerable<OfferScalarWhereInput>
    NOT?: Enumerable<OfferScalarWhereInput>
    id?: IntFilter | number
    createdByProfileId?: IntFilter | number
    publishedAt?: DateTimeFilter | Date | string
    unlistedAt?: DateTimeNullableFilter | Date | string | null
    title?: StringFilter | string
    pictureUrl?: StringNullableFilter | string | null
    pictureMimeType?: StringNullableFilter | string | null
    description?: StringNullableFilter | string | null
    categoryTagId?: IntFilter | number
    geonameid?: IntFilter | number
    pricePerUnit?: StringFilter | string
    unitTagId?: IntFilter | number
    maxUnits?: IntNullableFilter | number | null
    deliveryTermsTagId?: IntFilter | number
  }

  export type PurchaseUpsertWithWhereUniqueWithoutPurchasedByInput = {
    where: PurchaseWhereUniqueInput
    update: XOR<PurchaseUpdateWithoutPurchasedByInput, PurchaseUncheckedUpdateWithoutPurchasedByInput>
    create: XOR<PurchaseCreateWithoutPurchasedByInput, PurchaseUncheckedCreateWithoutPurchasedByInput>
  }

  export type PurchaseUpdateWithWhereUniqueWithoutPurchasedByInput = {
    where: PurchaseWhereUniqueInput
    data: XOR<PurchaseUpdateWithoutPurchasedByInput, PurchaseUncheckedUpdateWithoutPurchasedByInput>
  }

  export type PurchaseUpdateManyWithWhereWithoutPurchasedByInput = {
    where: PurchaseScalarWhereInput
    data: XOR<PurchaseUpdateManyMutationInput, PurchaseUncheckedUpdateManyWithoutPurchasesInput>
  }

  export type PurchaseScalarWhereInput = {
    AND?: Enumerable<PurchaseScalarWhereInput>
    OR?: Enumerable<PurchaseScalarWhereInput>
    NOT?: Enumerable<PurchaseScalarWhereInput>
    id?: IntFilter | number
    purchasedByProfileId?: IntFilter | number
    purchasedAt?: DateTimeFilter | Date | string
    purchasedProvenAt?: DateTimeNullableFilter | Date | string | null
    purchasedItemId?: IntFilter | number
    purchasedItemTitle?: StringFilter | string
    pricePerUnit?: StringFilter | string
    purchasedUnits?: IntFilter | number
    grandTotal?: StringFilter | string
    purchasedItemVat?: IntFilter | number
    status?: EnumPurchaseStatusFilter | PurchaseStatus
  }

  export type InvitationUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: InvitationWhereUniqueInput
    update: XOR<InvitationUpdateWithoutCreatedByInput, InvitationUncheckedUpdateWithoutCreatedByInput>
    create: XOR<InvitationCreateWithoutCreatedByInput, InvitationUncheckedCreateWithoutCreatedByInput>
  }

  export type InvitationUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: InvitationWhereUniqueInput
    data: XOR<InvitationUpdateWithoutCreatedByInput, InvitationUncheckedUpdateWithoutCreatedByInput>
  }

  export type InvitationUpdateManyWithWhereWithoutCreatedByInput = {
    where: InvitationScalarWhereInput
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyWithoutInvitationsInput>
  }

  export type InvitationScalarWhereInput = {
    AND?: Enumerable<InvitationScalarWhereInput>
    OR?: Enumerable<InvitationScalarWhereInput>
    NOT?: Enumerable<InvitationScalarWhereInput>
    id?: IntFilter | number
    createdByProfileId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    name?: StringFilter | string
    code?: StringFilter | string
    claimedByProfileId?: IntNullableFilter | number | null
    claimedAt?: DateTimeNullableFilter | Date | string | null
    redeemedByProfileId?: IntNullableFilter | number | null
    redeemedAt?: DateTimeNullableFilter | Date | string | null
    redeemTxHash?: StringNullableFilter | string | null
    address?: StringFilter | string
    key?: StringFilter | string
  }

  export type RedeemInvitationRequestUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: RedeemInvitationRequestWhereUniqueInput
    update: XOR<RedeemInvitationRequestUpdateWithoutCreatedByInput, RedeemInvitationRequestUncheckedUpdateWithoutCreatedByInput>
    create: XOR<RedeemInvitationRequestCreateWithoutCreatedByInput, RedeemInvitationRequestUncheckedCreateWithoutCreatedByInput>
  }

  export type RedeemInvitationRequestUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: RedeemInvitationRequestWhereUniqueInput
    data: XOR<RedeemInvitationRequestUpdateWithoutCreatedByInput, RedeemInvitationRequestUncheckedUpdateWithoutCreatedByInput>
  }

  export type RedeemInvitationRequestUpdateManyWithWhereWithoutCreatedByInput = {
    where: RedeemInvitationRequestScalarWhereInput
    data: XOR<RedeemInvitationRequestUpdateManyMutationInput, RedeemInvitationRequestUncheckedUpdateManyWithoutRedeemInvitationRequestsInput>
  }

  export type InvitationUpsertWithWhereUniqueWithoutRedeemedByInput = {
    where: InvitationWhereUniqueInput
    update: XOR<InvitationUpdateWithoutRedeemedByInput, InvitationUncheckedUpdateWithoutRedeemedByInput>
    create: XOR<InvitationCreateWithoutRedeemedByInput, InvitationUncheckedCreateWithoutRedeemedByInput>
  }

  export type InvitationUpdateWithWhereUniqueWithoutRedeemedByInput = {
    where: InvitationWhereUniqueInput
    data: XOR<InvitationUpdateWithoutRedeemedByInput, InvitationUncheckedUpdateWithoutRedeemedByInput>
  }

  export type InvitationUpdateManyWithWhereWithoutRedeemedByInput = {
    where: InvitationScalarWhereInput
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyWithoutRedeemedInvitationsInput>
  }

  export type InvitationUpsertWithWhereUniqueWithoutClaimedByInput = {
    where: InvitationWhereUniqueInput
    update: XOR<InvitationUpdateWithoutClaimedByInput, InvitationUncheckedUpdateWithoutClaimedByInput>
    create: XOR<InvitationCreateWithoutClaimedByInput, InvitationUncheckedCreateWithoutClaimedByInput>
  }

  export type InvitationUpdateWithWhereUniqueWithoutClaimedByInput = {
    where: InvitationWhereUniqueInput
    data: XOR<InvitationUpdateWithoutClaimedByInput, InvitationUncheckedUpdateWithoutClaimedByInput>
  }

  export type InvitationUpdateManyWithWhereWithoutClaimedByInput = {
    where: InvitationScalarWhereInput
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyWithoutClaimedInvitationsInput>
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutSubscribingToProfileInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutSubscribingToProfileInput, SubscriptionUncheckedUpdateWithoutSubscribingToProfileInput>
    create: XOR<SubscriptionCreateWithoutSubscribingToProfileInput, SubscriptionUncheckedCreateWithoutSubscribingToProfileInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutSubscribingToProfileInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutSubscribingToProfileInput, SubscriptionUncheckedUpdateWithoutSubscribingToProfileInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutSubscribingToProfileInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutSubscribersInput>
  }

  export type SubscriptionScalarWhereInput = {
    AND?: Enumerable<SubscriptionScalarWhereInput>
    OR?: Enumerable<SubscriptionScalarWhereInput>
    NOT?: Enumerable<SubscriptionScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    subscriberProfileId?: IntFilter | number
    subscribingToOfferId?: IntNullableFilter | number | null
    subscribingToProfileId?: IntNullableFilter | number | null
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutSubscriberInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutSubscriberInput, SubscriptionUncheckedUpdateWithoutSubscriberInput>
    create: XOR<SubscriptionCreateWithoutSubscriberInput, SubscriptionUncheckedCreateWithoutSubscriberInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutSubscriberInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutSubscriberInput, SubscriptionUncheckedUpdateWithoutSubscriberInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutSubscriberInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutSubscriptionsInput>
  }

  export type MembershipUpsertWithWhereUniqueWithoutMemberInput = {
    where: MembershipWhereUniqueInput
    update: XOR<MembershipUpdateWithoutMemberInput, MembershipUncheckedUpdateWithoutMemberInput>
    create: XOR<MembershipCreateWithoutMemberInput, MembershipUncheckedCreateWithoutMemberInput>
  }

  export type MembershipUpdateWithWhereUniqueWithoutMemberInput = {
    where: MembershipWhereUniqueInput
    data: XOR<MembershipUpdateWithoutMemberInput, MembershipUncheckedUpdateWithoutMemberInput>
  }

  export type MembershipUpdateManyWithWhereWithoutMemberInput = {
    where: MembershipScalarWhereInput
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyWithoutMembershipsInput>
  }

  export type MembershipScalarWhereInput = {
    AND?: Enumerable<MembershipScalarWhereInput>
    OR?: Enumerable<MembershipScalarWhereInput>
    NOT?: Enumerable<MembershipScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    memberId?: IntFilter | number
    memberAtId?: IntFilter | number
  }

  export type MembershipUpsertWithWhereUniqueWithoutMemberAtInput = {
    where: MembershipWhereUniqueInput
    update: XOR<MembershipUpdateWithoutMemberAtInput, MembershipUncheckedUpdateWithoutMemberAtInput>
    create: XOR<MembershipCreateWithoutMemberAtInput, MembershipUncheckedCreateWithoutMemberAtInput>
  }

  export type MembershipUpdateWithWhereUniqueWithoutMemberAtInput = {
    where: MembershipWhereUniqueInput
    data: XOR<MembershipUpdateWithoutMemberAtInput, MembershipUncheckedUpdateWithoutMemberAtInput>
  }

  export type MembershipUpdateManyWithWhereWithoutMemberAtInput = {
    where: MembershipScalarWhereInput
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyWithoutMembersInput>
  }

  export type ProfileCreateWithoutMembershipsInput = {
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionCreateNestedManyWithoutProfileInput
    tags?: TagCreateNestedManyWithoutCreatedByInput
    offers?: OfferCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionCreateNestedManyWithoutSubscriberInput
    members?: MembershipCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileUncheckedCreateWithoutMembershipsInput = {
    id?: number
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutProfileInput
    tags?: TagUncheckedCreateNestedManyWithoutCreatedByInput
    offers?: OfferUncheckedCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutSubscriberInput
    members?: MembershipUncheckedCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileCreateOrConnectWithoutMembershipsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutMembershipsInput, ProfileUncheckedCreateWithoutMembershipsInput>
  }

  export type ProfileCreateWithoutMembersInput = {
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionCreateNestedManyWithoutProfileInput
    tags?: TagCreateNestedManyWithoutCreatedByInput
    offers?: OfferCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipCreateNestedManyWithoutMemberInput
  }

  export type ProfileUncheckedCreateWithoutMembersInput = {
    id?: number
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutProfileInput
    tags?: TagUncheckedCreateNestedManyWithoutCreatedByInput
    offers?: OfferUncheckedCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutMemberInput
  }

  export type ProfileCreateOrConnectWithoutMembersInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutMembersInput, ProfileUncheckedCreateWithoutMembersInput>
  }

  export type ProfileUpsertWithoutMembershipsInput = {
    update: XOR<ProfileUpdateWithoutMembershipsInput, ProfileUncheckedUpdateWithoutMembershipsInput>
    create: XOR<ProfileCreateWithoutMembershipsInput, ProfileUncheckedCreateWithoutMembershipsInput>
  }

  export type ProfileUpdateWithoutMembershipsInput = {
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutProfileInput
    tags?: TagUpdateManyWithoutCreatedByInput
    offers?: OfferUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUpdateManyWithoutSubscriberInput
    members?: MembershipUpdateManyWithoutMemberAtInput
  }

  export type ProfileUncheckedUpdateWithoutMembershipsInput = {
    id?: IntFieldUpdateOperationsInput | number
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutProfileInput
    tags?: TagUncheckedUpdateManyWithoutCreatedByInput
    offers?: OfferUncheckedUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutSubscriberInput
    members?: MembershipUncheckedUpdateManyWithoutMemberAtInput
  }

  export type ProfileUpsertWithoutMembersInput = {
    update: XOR<ProfileUpdateWithoutMembersInput, ProfileUncheckedUpdateWithoutMembersInput>
    create: XOR<ProfileCreateWithoutMembersInput, ProfileUncheckedCreateWithoutMembersInput>
  }

  export type ProfileUpdateWithoutMembersInput = {
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutProfileInput
    tags?: TagUpdateManyWithoutCreatedByInput
    offers?: OfferUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUpdateManyWithoutSubscriberInput
    memberships?: MembershipUpdateManyWithoutMemberInput
  }

  export type ProfileUncheckedUpdateWithoutMembersInput = {
    id?: IntFieldUpdateOperationsInput | number
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutProfileInput
    tags?: TagUncheckedUpdateManyWithoutCreatedByInput
    offers?: OfferUncheckedUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutSubscriberInput
    memberships?: MembershipUncheckedUpdateManyWithoutMemberInput
  }

  export type ProfileCreateWithoutSubscriptionsInput = {
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionCreateNestedManyWithoutProfileInput
    tags?: TagCreateNestedManyWithoutCreatedByInput
    offers?: OfferCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionCreateNestedManyWithoutSubscribingToProfileInput
    memberships?: MembershipCreateNestedManyWithoutMemberInput
    members?: MembershipCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileUncheckedCreateWithoutSubscriptionsInput = {
    id?: number
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutProfileInput
    tags?: TagUncheckedCreateNestedManyWithoutCreatedByInput
    offers?: OfferUncheckedCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedCreateNestedManyWithoutSubscribingToProfileInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutMemberInput
    members?: MembershipUncheckedCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileCreateOrConnectWithoutSubscriptionsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutSubscriptionsInput, ProfileUncheckedCreateWithoutSubscriptionsInput>
  }

  export type OfferCreateWithoutSubscribersInput = {
    publishedAt: Date | string
    unlistedAt?: Date | string | null
    title: string
    pictureUrl?: string | null
    pictureMimeType?: string | null
    description?: string | null
    geonameid: number
    pricePerUnit: string
    maxUnits?: number | null
    createdBy: ProfileCreateNestedOneWithoutOffersInput
    purchases?: PurchaseCreateNestedManyWithoutPurchasedItemInput
    categoryTag: TagCreateNestedOneWithoutOfferCategoryInput
    unitTag: TagCreateNestedOneWithoutOfferUnitInput
    deliveryTermsTag: TagCreateNestedOneWithoutOfferDeliveryTermsInput
  }

  export type OfferUncheckedCreateWithoutSubscribersInput = {
    id?: number
    createdByProfileId: number
    publishedAt: Date | string
    unlistedAt?: Date | string | null
    title: string
    pictureUrl?: string | null
    pictureMimeType?: string | null
    description?: string | null
    categoryTagId: number
    geonameid: number
    pricePerUnit: string
    unitTagId: number
    maxUnits?: number | null
    deliveryTermsTagId: number
    purchases?: PurchaseUncheckedCreateNestedManyWithoutPurchasedItemInput
  }

  export type OfferCreateOrConnectWithoutSubscribersInput = {
    where: OfferWhereUniqueInput
    create: XOR<OfferCreateWithoutSubscribersInput, OfferUncheckedCreateWithoutSubscribersInput>
  }

  export type ProfileCreateWithoutSubscribersInput = {
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionCreateNestedManyWithoutProfileInput
    tags?: TagCreateNestedManyWithoutCreatedByInput
    offers?: OfferCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationCreateNestedManyWithoutClaimedByInput
    subscriptions?: SubscriptionCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipCreateNestedManyWithoutMemberInput
    members?: MembershipCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileUncheckedCreateWithoutSubscribersInput = {
    id?: number
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutProfileInput
    tags?: TagUncheckedCreateNestedManyWithoutCreatedByInput
    offers?: OfferUncheckedCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedCreateNestedManyWithoutClaimedByInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutMemberInput
    members?: MembershipUncheckedCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileCreateOrConnectWithoutSubscribersInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutSubscribersInput, ProfileUncheckedCreateWithoutSubscribersInput>
  }

  export type ProfileUpsertWithoutSubscriptionsInput = {
    update: XOR<ProfileUpdateWithoutSubscriptionsInput, ProfileUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<ProfileCreateWithoutSubscriptionsInput, ProfileUncheckedCreateWithoutSubscriptionsInput>
  }

  export type ProfileUpdateWithoutSubscriptionsInput = {
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutProfileInput
    tags?: TagUpdateManyWithoutCreatedByInput
    offers?: OfferUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUpdateManyWithoutSubscribingToProfileInput
    memberships?: MembershipUpdateManyWithoutMemberInput
    members?: MembershipUpdateManyWithoutMemberAtInput
  }

  export type ProfileUncheckedUpdateWithoutSubscriptionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutProfileInput
    tags?: TagUncheckedUpdateManyWithoutCreatedByInput
    offers?: OfferUncheckedUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedUpdateManyWithoutSubscribingToProfileInput
    memberships?: MembershipUncheckedUpdateManyWithoutMemberInput
    members?: MembershipUncheckedUpdateManyWithoutMemberAtInput
  }

  export type OfferUpsertWithoutSubscribersInput = {
    update: XOR<OfferUpdateWithoutSubscribersInput, OfferUncheckedUpdateWithoutSubscribersInput>
    create: XOR<OfferCreateWithoutSubscribersInput, OfferUncheckedCreateWithoutSubscribersInput>
  }

  export type OfferUpdateWithoutSubscribersInput = {
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
    createdBy?: ProfileUpdateOneRequiredWithoutOffersInput
    purchases?: PurchaseUpdateManyWithoutPurchasedItemInput
    categoryTag?: TagUpdateOneRequiredWithoutOfferCategoryInput
    unitTag?: TagUpdateOneRequiredWithoutOfferUnitInput
    deliveryTermsTag?: TagUpdateOneRequiredWithoutOfferDeliveryTermsInput
  }

  export type OfferUncheckedUpdateWithoutSubscribersInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryTagId?: IntFieldUpdateOperationsInput | number
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    unitTagId?: IntFieldUpdateOperationsInput | number
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryTermsTagId?: IntFieldUpdateOperationsInput | number
    purchases?: PurchaseUncheckedUpdateManyWithoutPurchasedItemInput
  }

  export type ProfileUpsertWithoutSubscribersInput = {
    update: XOR<ProfileUpdateWithoutSubscribersInput, ProfileUncheckedUpdateWithoutSubscribersInput>
    create: XOR<ProfileCreateWithoutSubscribersInput, ProfileUncheckedCreateWithoutSubscribersInput>
  }

  export type ProfileUpdateWithoutSubscribersInput = {
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutProfileInput
    tags?: TagUpdateManyWithoutCreatedByInput
    offers?: OfferUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUpdateManyWithoutClaimedByInput
    subscriptions?: SubscriptionUpdateManyWithoutSubscriberInput
    memberships?: MembershipUpdateManyWithoutMemberInput
    members?: MembershipUpdateManyWithoutMemberAtInput
  }

  export type ProfileUncheckedUpdateWithoutSubscribersInput = {
    id?: IntFieldUpdateOperationsInput | number
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutProfileInput
    tags?: TagUncheckedUpdateManyWithoutCreatedByInput
    offers?: OfferUncheckedUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedUpdateManyWithoutClaimedByInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutSubscriberInput
    memberships?: MembershipUncheckedUpdateManyWithoutMemberInput
    members?: MembershipUncheckedUpdateManyWithoutMemberAtInput
  }

  export type TagCreateWithoutChatMessageInput = {
    createdAt: Date | string
    isPrivate: boolean
    value?: string | null
    createdBy: ProfileCreateNestedOneWithoutTagsInput
    transaction?: TransactionCreateNestedOneWithoutTagsInput
    type: TagTypeCreateNestedOneWithoutTagsInput
    offerCategory?: OfferCreateNestedManyWithoutCategoryTagInput
    offerUnit?: OfferCreateNestedManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferCreateNestedManyWithoutDeliveryTermsTagInput
  }

  export type TagUncheckedCreateWithoutChatMessageInput = {
    id?: number
    createdAt: Date | string
    createdByProfileId: number
    isPrivate: boolean
    transactionHash?: string | null
    typeId: string
    value?: string | null
    offerCategory?: OfferUncheckedCreateNestedManyWithoutCategoryTagInput
    offerUnit?: OfferUncheckedCreateNestedManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferUncheckedCreateNestedManyWithoutDeliveryTermsTagInput
  }

  export type TagCreateOrConnectWithoutChatMessageInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutChatMessageInput, TagUncheckedCreateWithoutChatMessageInput>
  }

  export type TagCreateManyChatMessageInputEnvelope = {
    data: Enumerable<TagCreateManyChatMessageInput>
    skipDuplicates?: boolean
  }

  export type TagUpsertWithWhereUniqueWithoutChatMessageInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutChatMessageInput, TagUncheckedUpdateWithoutChatMessageInput>
    create: XOR<TagCreateWithoutChatMessageInput, TagUncheckedCreateWithoutChatMessageInput>
  }

  export type TagUpdateWithWhereUniqueWithoutChatMessageInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutChatMessageInput, TagUncheckedUpdateWithoutChatMessageInput>
  }

  export type TagUpdateManyWithWhereWithoutChatMessageInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutTagsInput>
  }

  export type ProfileCreateWithoutOffersInput = {
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionCreateNestedManyWithoutProfileInput
    tags?: TagCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipCreateNestedManyWithoutMemberInput
    members?: MembershipCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileUncheckedCreateWithoutOffersInput = {
    id?: number
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutProfileInput
    tags?: TagUncheckedCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutMemberInput
    members?: MembershipUncheckedCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileCreateOrConnectWithoutOffersInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutOffersInput, ProfileUncheckedCreateWithoutOffersInput>
  }

  export type PurchaseCreateWithoutPurchasedItemInput = {
    purchasedAt: Date | string
    purchasedProvenAt?: Date | string | null
    purchasedItemTitle: string
    pricePerUnit: string
    purchasedUnits: number
    grandTotal: string
    purchasedItemVat: number
    status: PurchaseStatus
    purchasedBy: ProfileCreateNestedOneWithoutPurchasesInput
    jobs?: TransactionJobsCreateNestedManyWithoutPurchaseInput
  }

  export type PurchaseUncheckedCreateWithoutPurchasedItemInput = {
    id?: number
    purchasedByProfileId: number
    purchasedAt: Date | string
    purchasedProvenAt?: Date | string | null
    purchasedItemTitle: string
    pricePerUnit: string
    purchasedUnits: number
    grandTotal: string
    purchasedItemVat: number
    status: PurchaseStatus
    jobs?: TransactionJobsUncheckedCreateNestedManyWithoutPurchaseInput
  }

  export type PurchaseCreateOrConnectWithoutPurchasedItemInput = {
    where: PurchaseWhereUniqueInput
    create: XOR<PurchaseCreateWithoutPurchasedItemInput, PurchaseUncheckedCreateWithoutPurchasedItemInput>
  }

  export type PurchaseCreateManyPurchasedItemInputEnvelope = {
    data: Enumerable<PurchaseCreateManyPurchasedItemInput>
    skipDuplicates?: boolean
  }

  export type TagCreateWithoutOfferCategoryInput = {
    createdAt: Date | string
    isPrivate: boolean
    value?: string | null
    createdBy: ProfileCreateNestedOneWithoutTagsInput
    transaction?: TransactionCreateNestedOneWithoutTagsInput
    type: TagTypeCreateNestedOneWithoutTagsInput
    chatMessage?: ChatMessageCreateNestedOneWithoutTagsInput
    offerUnit?: OfferCreateNestedManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferCreateNestedManyWithoutDeliveryTermsTagInput
  }

  export type TagUncheckedCreateWithoutOfferCategoryInput = {
    id?: number
    createdAt: Date | string
    createdByProfileId: number
    isPrivate: boolean
    transactionHash?: string | null
    typeId: string
    chatMessageId?: number | null
    value?: string | null
    offerUnit?: OfferUncheckedCreateNestedManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferUncheckedCreateNestedManyWithoutDeliveryTermsTagInput
  }

  export type TagCreateOrConnectWithoutOfferCategoryInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutOfferCategoryInput, TagUncheckedCreateWithoutOfferCategoryInput>
  }

  export type TagCreateWithoutOfferUnitInput = {
    createdAt: Date | string
    isPrivate: boolean
    value?: string | null
    createdBy: ProfileCreateNestedOneWithoutTagsInput
    transaction?: TransactionCreateNestedOneWithoutTagsInput
    type: TagTypeCreateNestedOneWithoutTagsInput
    chatMessage?: ChatMessageCreateNestedOneWithoutTagsInput
    offerCategory?: OfferCreateNestedManyWithoutCategoryTagInput
    offerDeliveryTerms?: OfferCreateNestedManyWithoutDeliveryTermsTagInput
  }

  export type TagUncheckedCreateWithoutOfferUnitInput = {
    id?: number
    createdAt: Date | string
    createdByProfileId: number
    isPrivate: boolean
    transactionHash?: string | null
    typeId: string
    chatMessageId?: number | null
    value?: string | null
    offerCategory?: OfferUncheckedCreateNestedManyWithoutCategoryTagInput
    offerDeliveryTerms?: OfferUncheckedCreateNestedManyWithoutDeliveryTermsTagInput
  }

  export type TagCreateOrConnectWithoutOfferUnitInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutOfferUnitInput, TagUncheckedCreateWithoutOfferUnitInput>
  }

  export type TagCreateWithoutOfferDeliveryTermsInput = {
    createdAt: Date | string
    isPrivate: boolean
    value?: string | null
    createdBy: ProfileCreateNestedOneWithoutTagsInput
    transaction?: TransactionCreateNestedOneWithoutTagsInput
    type: TagTypeCreateNestedOneWithoutTagsInput
    chatMessage?: ChatMessageCreateNestedOneWithoutTagsInput
    offerCategory?: OfferCreateNestedManyWithoutCategoryTagInput
    offerUnit?: OfferCreateNestedManyWithoutUnitTagInput
  }

  export type TagUncheckedCreateWithoutOfferDeliveryTermsInput = {
    id?: number
    createdAt: Date | string
    createdByProfileId: number
    isPrivate: boolean
    transactionHash?: string | null
    typeId: string
    chatMessageId?: number | null
    value?: string | null
    offerCategory?: OfferUncheckedCreateNestedManyWithoutCategoryTagInput
    offerUnit?: OfferUncheckedCreateNestedManyWithoutUnitTagInput
  }

  export type TagCreateOrConnectWithoutOfferDeliveryTermsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutOfferDeliveryTermsInput, TagUncheckedCreateWithoutOfferDeliveryTermsInput>
  }

  export type SubscriptionCreateWithoutSubscribingToOfferInput = {
    createdAt: Date | string
    subscribingToOfferId?: number | null
    subscribingToProfileId?: number | null
    subscriber: ProfileCreateNestedOneWithoutSubscriptionsInput
    subscribingToProfile?: ProfileCreateNestedOneWithoutSubscribersInput
  }

  export type SubscriptionUncheckedCreateWithoutSubscribingToOfferInput = {
    id?: number
    createdAt: Date | string
    subscribingToOfferId?: number | null
    subscribingToProfileId?: number | null
  }

  export type SubscriptionCreateOrConnectWithoutSubscribingToOfferInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutSubscribingToOfferInput, SubscriptionUncheckedCreateWithoutSubscribingToOfferInput>
  }

  export type SubscriptionCreateManySubscribingToOfferInputEnvelope = {
    data: Enumerable<SubscriptionCreateManySubscribingToOfferInput>
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutOffersInput = {
    update: XOR<ProfileUpdateWithoutOffersInput, ProfileUncheckedUpdateWithoutOffersInput>
    create: XOR<ProfileCreateWithoutOffersInput, ProfileUncheckedCreateWithoutOffersInput>
  }

  export type ProfileUpdateWithoutOffersInput = {
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutProfileInput
    tags?: TagUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUpdateManyWithoutSubscriberInput
    memberships?: MembershipUpdateManyWithoutMemberInput
    members?: MembershipUpdateManyWithoutMemberAtInput
  }

  export type ProfileUncheckedUpdateWithoutOffersInput = {
    id?: IntFieldUpdateOperationsInput | number
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutProfileInput
    tags?: TagUncheckedUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutSubscriberInput
    memberships?: MembershipUncheckedUpdateManyWithoutMemberInput
    members?: MembershipUncheckedUpdateManyWithoutMemberAtInput
  }

  export type PurchaseUpsertWithWhereUniqueWithoutPurchasedItemInput = {
    where: PurchaseWhereUniqueInput
    update: XOR<PurchaseUpdateWithoutPurchasedItemInput, PurchaseUncheckedUpdateWithoutPurchasedItemInput>
    create: XOR<PurchaseCreateWithoutPurchasedItemInput, PurchaseUncheckedCreateWithoutPurchasedItemInput>
  }

  export type PurchaseUpdateWithWhereUniqueWithoutPurchasedItemInput = {
    where: PurchaseWhereUniqueInput
    data: XOR<PurchaseUpdateWithoutPurchasedItemInput, PurchaseUncheckedUpdateWithoutPurchasedItemInput>
  }

  export type PurchaseUpdateManyWithWhereWithoutPurchasedItemInput = {
    where: PurchaseScalarWhereInput
    data: XOR<PurchaseUpdateManyMutationInput, PurchaseUncheckedUpdateManyWithoutPurchasesInput>
  }

  export type TagUpsertWithoutOfferCategoryInput = {
    update: XOR<TagUpdateWithoutOfferCategoryInput, TagUncheckedUpdateWithoutOfferCategoryInput>
    create: XOR<TagCreateWithoutOfferCategoryInput, TagUncheckedCreateWithoutOfferCategoryInput>
  }

  export type TagUpdateWithoutOfferCategoryInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    value?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: ProfileUpdateOneRequiredWithoutTagsInput
    transaction?: TransactionUpdateOneWithoutTagsInput
    type?: TagTypeUpdateOneRequiredWithoutTagsInput
    chatMessage?: ChatMessageUpdateOneWithoutTagsInput
    offerUnit?: OfferUpdateManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferUpdateManyWithoutDeliveryTermsTagInput
  }

  export type TagUncheckedUpdateWithoutOfferCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    typeId?: StringFieldUpdateOperationsInput | string
    chatMessageId?: NullableIntFieldUpdateOperationsInput | number | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    offerUnit?: OfferUncheckedUpdateManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferUncheckedUpdateManyWithoutDeliveryTermsTagInput
  }

  export type TagUpsertWithoutOfferUnitInput = {
    update: XOR<TagUpdateWithoutOfferUnitInput, TagUncheckedUpdateWithoutOfferUnitInput>
    create: XOR<TagCreateWithoutOfferUnitInput, TagUncheckedCreateWithoutOfferUnitInput>
  }

  export type TagUpdateWithoutOfferUnitInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    value?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: ProfileUpdateOneRequiredWithoutTagsInput
    transaction?: TransactionUpdateOneWithoutTagsInput
    type?: TagTypeUpdateOneRequiredWithoutTagsInput
    chatMessage?: ChatMessageUpdateOneWithoutTagsInput
    offerCategory?: OfferUpdateManyWithoutCategoryTagInput
    offerDeliveryTerms?: OfferUpdateManyWithoutDeliveryTermsTagInput
  }

  export type TagUncheckedUpdateWithoutOfferUnitInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    typeId?: StringFieldUpdateOperationsInput | string
    chatMessageId?: NullableIntFieldUpdateOperationsInput | number | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    offerCategory?: OfferUncheckedUpdateManyWithoutCategoryTagInput
    offerDeliveryTerms?: OfferUncheckedUpdateManyWithoutDeliveryTermsTagInput
  }

  export type TagUpsertWithoutOfferDeliveryTermsInput = {
    update: XOR<TagUpdateWithoutOfferDeliveryTermsInput, TagUncheckedUpdateWithoutOfferDeliveryTermsInput>
    create: XOR<TagCreateWithoutOfferDeliveryTermsInput, TagUncheckedCreateWithoutOfferDeliveryTermsInput>
  }

  export type TagUpdateWithoutOfferDeliveryTermsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    value?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: ProfileUpdateOneRequiredWithoutTagsInput
    transaction?: TransactionUpdateOneWithoutTagsInput
    type?: TagTypeUpdateOneRequiredWithoutTagsInput
    chatMessage?: ChatMessageUpdateOneWithoutTagsInput
    offerCategory?: OfferUpdateManyWithoutCategoryTagInput
    offerUnit?: OfferUpdateManyWithoutUnitTagInput
  }

  export type TagUncheckedUpdateWithoutOfferDeliveryTermsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    typeId?: StringFieldUpdateOperationsInput | string
    chatMessageId?: NullableIntFieldUpdateOperationsInput | number | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    offerCategory?: OfferUncheckedUpdateManyWithoutCategoryTagInput
    offerUnit?: OfferUncheckedUpdateManyWithoutUnitTagInput
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutSubscribingToOfferInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutSubscribingToOfferInput, SubscriptionUncheckedUpdateWithoutSubscribingToOfferInput>
    create: XOR<SubscriptionCreateWithoutSubscribingToOfferInput, SubscriptionUncheckedCreateWithoutSubscribingToOfferInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutSubscribingToOfferInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutSubscribingToOfferInput, SubscriptionUncheckedUpdateWithoutSubscribingToOfferInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutSubscribingToOfferInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutSubscribersInput>
  }

  export type ProfileCreateWithoutPurchasesInput = {
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionCreateNestedManyWithoutProfileInput
    tags?: TagCreateNestedManyWithoutCreatedByInput
    offers?: OfferCreateNestedManyWithoutCreatedByInput
    invitations?: InvitationCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipCreateNestedManyWithoutMemberInput
    members?: MembershipCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileUncheckedCreateWithoutPurchasesInput = {
    id?: number
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutProfileInput
    tags?: TagUncheckedCreateNestedManyWithoutCreatedByInput
    offers?: OfferUncheckedCreateNestedManyWithoutCreatedByInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutMemberInput
    members?: MembershipUncheckedCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileCreateOrConnectWithoutPurchasesInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutPurchasesInput, ProfileUncheckedCreateWithoutPurchasesInput>
  }

  export type OfferCreateWithoutPurchasesInput = {
    publishedAt: Date | string
    unlistedAt?: Date | string | null
    title: string
    pictureUrl?: string | null
    pictureMimeType?: string | null
    description?: string | null
    geonameid: number
    pricePerUnit: string
    maxUnits?: number | null
    createdBy: ProfileCreateNestedOneWithoutOffersInput
    categoryTag: TagCreateNestedOneWithoutOfferCategoryInput
    unitTag: TagCreateNestedOneWithoutOfferUnitInput
    deliveryTermsTag: TagCreateNestedOneWithoutOfferDeliveryTermsInput
    subscribers?: SubscriptionCreateNestedManyWithoutSubscribingToOfferInput
  }

  export type OfferUncheckedCreateWithoutPurchasesInput = {
    id?: number
    createdByProfileId: number
    publishedAt: Date | string
    unlistedAt?: Date | string | null
    title: string
    pictureUrl?: string | null
    pictureMimeType?: string | null
    description?: string | null
    categoryTagId: number
    geonameid: number
    pricePerUnit: string
    unitTagId: number
    maxUnits?: number | null
    deliveryTermsTagId: number
    subscribers?: SubscriptionUncheckedCreateNestedManyWithoutSubscribingToOfferInput
  }

  export type OfferCreateOrConnectWithoutPurchasesInput = {
    where: OfferWhereUniqueInput
    create: XOR<OfferCreateWithoutPurchasesInput, OfferUncheckedCreateWithoutPurchasesInput>
  }

  export type TransactionJobsCreateWithoutPurchaseInput = {
    transactionhash: string
    status: string
    user: string
  }

  export type TransactionJobsUncheckedCreateWithoutPurchaseInput = {
    id?: number
    transactionhash: string
    status: string
    user: string
  }

  export type TransactionJobsCreateOrConnectWithoutPurchaseInput = {
    where: TransactionJobsWhereUniqueInput
    create: XOR<TransactionJobsCreateWithoutPurchaseInput, TransactionJobsUncheckedCreateWithoutPurchaseInput>
  }

  export type TransactionJobsCreateManyPurchaseInputEnvelope = {
    data: Enumerable<TransactionJobsCreateManyPurchaseInput>
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutPurchasesInput = {
    update: XOR<ProfileUpdateWithoutPurchasesInput, ProfileUncheckedUpdateWithoutPurchasesInput>
    create: XOR<ProfileCreateWithoutPurchasesInput, ProfileUncheckedCreateWithoutPurchasesInput>
  }

  export type ProfileUpdateWithoutPurchasesInput = {
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutProfileInput
    tags?: TagUpdateManyWithoutCreatedByInput
    offers?: OfferUpdateManyWithoutCreatedByInput
    invitations?: InvitationUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUpdateManyWithoutSubscriberInput
    memberships?: MembershipUpdateManyWithoutMemberInput
    members?: MembershipUpdateManyWithoutMemberAtInput
  }

  export type ProfileUncheckedUpdateWithoutPurchasesInput = {
    id?: IntFieldUpdateOperationsInput | number
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutProfileInput
    tags?: TagUncheckedUpdateManyWithoutCreatedByInput
    offers?: OfferUncheckedUpdateManyWithoutCreatedByInput
    invitations?: InvitationUncheckedUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutSubscriberInput
    memberships?: MembershipUncheckedUpdateManyWithoutMemberInput
    members?: MembershipUncheckedUpdateManyWithoutMemberAtInput
  }

  export type OfferUpsertWithoutPurchasesInput = {
    update: XOR<OfferUpdateWithoutPurchasesInput, OfferUncheckedUpdateWithoutPurchasesInput>
    create: XOR<OfferCreateWithoutPurchasesInput, OfferUncheckedCreateWithoutPurchasesInput>
  }

  export type OfferUpdateWithoutPurchasesInput = {
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
    createdBy?: ProfileUpdateOneRequiredWithoutOffersInput
    categoryTag?: TagUpdateOneRequiredWithoutOfferCategoryInput
    unitTag?: TagUpdateOneRequiredWithoutOfferUnitInput
    deliveryTermsTag?: TagUpdateOneRequiredWithoutOfferDeliveryTermsInput
    subscribers?: SubscriptionUpdateManyWithoutSubscribingToOfferInput
  }

  export type OfferUncheckedUpdateWithoutPurchasesInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryTagId?: IntFieldUpdateOperationsInput | number
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    unitTagId?: IntFieldUpdateOperationsInput | number
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryTermsTagId?: IntFieldUpdateOperationsInput | number
    subscribers?: SubscriptionUncheckedUpdateManyWithoutSubscribingToOfferInput
  }

  export type TransactionJobsUpsertWithWhereUniqueWithoutPurchaseInput = {
    where: TransactionJobsWhereUniqueInput
    update: XOR<TransactionJobsUpdateWithoutPurchaseInput, TransactionJobsUncheckedUpdateWithoutPurchaseInput>
    create: XOR<TransactionJobsCreateWithoutPurchaseInput, TransactionJobsUncheckedCreateWithoutPurchaseInput>
  }

  export type TransactionJobsUpdateWithWhereUniqueWithoutPurchaseInput = {
    where: TransactionJobsWhereUniqueInput
    data: XOR<TransactionJobsUpdateWithoutPurchaseInput, TransactionJobsUncheckedUpdateWithoutPurchaseInput>
  }

  export type TransactionJobsUpdateManyWithWhereWithoutPurchaseInput = {
    where: TransactionJobsScalarWhereInput
    data: XOR<TransactionJobsUpdateManyMutationInput, TransactionJobsUncheckedUpdateManyWithoutJobsInput>
  }

  export type TransactionJobsScalarWhereInput = {
    AND?: Enumerable<TransactionJobsScalarWhereInput>
    OR?: Enumerable<TransactionJobsScalarWhereInput>
    NOT?: Enumerable<TransactionJobsScalarWhereInput>
    id?: IntFilter | number
    transactionhash?: StringFilter | string
    status?: StringFilter | string
    user?: StringFilter | string
    purchaseId?: IntFilter | number
  }

  export type PurchaseCreateWithoutJobsInput = {
    purchasedAt: Date | string
    purchasedProvenAt?: Date | string | null
    purchasedItemTitle: string
    pricePerUnit: string
    purchasedUnits: number
    grandTotal: string
    purchasedItemVat: number
    status: PurchaseStatus
    purchasedBy: ProfileCreateNestedOneWithoutPurchasesInput
    purchasedItem: OfferCreateNestedOneWithoutPurchasesInput
  }

  export type PurchaseUncheckedCreateWithoutJobsInput = {
    id?: number
    purchasedByProfileId: number
    purchasedAt: Date | string
    purchasedProvenAt?: Date | string | null
    purchasedItemId: number
    purchasedItemTitle: string
    pricePerUnit: string
    purchasedUnits: number
    grandTotal: string
    purchasedItemVat: number
    status: PurchaseStatus
  }

  export type PurchaseCreateOrConnectWithoutJobsInput = {
    where: PurchaseWhereUniqueInput
    create: XOR<PurchaseCreateWithoutJobsInput, PurchaseUncheckedCreateWithoutJobsInput>
  }

  export type PurchaseUpsertWithoutJobsInput = {
    update: XOR<PurchaseUpdateWithoutJobsInput, PurchaseUncheckedUpdateWithoutJobsInput>
    create: XOR<PurchaseCreateWithoutJobsInput, PurchaseUncheckedCreateWithoutJobsInput>
  }

  export type PurchaseUpdateWithoutJobsInput = {
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasedProvenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchasedItemTitle?: StringFieldUpdateOperationsInput | string
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    purchasedUnits?: IntFieldUpdateOperationsInput | number
    grandTotal?: StringFieldUpdateOperationsInput | string
    purchasedItemVat?: IntFieldUpdateOperationsInput | number
    status?: EnumPurchaseStatusFieldUpdateOperationsInput | PurchaseStatus
    purchasedBy?: ProfileUpdateOneRequiredWithoutPurchasesInput
    purchasedItem?: OfferUpdateOneRequiredWithoutPurchasesInput
  }

  export type PurchaseUncheckedUpdateWithoutJobsInput = {
    id?: IntFieldUpdateOperationsInput | number
    purchasedByProfileId?: IntFieldUpdateOperationsInput | number
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasedProvenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchasedItemId?: IntFieldUpdateOperationsInput | number
    purchasedItemTitle?: StringFieldUpdateOperationsInput | string
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    purchasedUnits?: IntFieldUpdateOperationsInput | number
    grandTotal?: StringFieldUpdateOperationsInput | string
    purchasedItemVat?: IntFieldUpdateOperationsInput | number
    status?: EnumPurchaseStatusFieldUpdateOperationsInput | PurchaseStatus
  }

  export type TagCreateWithoutTypeInput = {
    createdAt: Date | string
    isPrivate: boolean
    value?: string | null
    createdBy: ProfileCreateNestedOneWithoutTagsInput
    transaction?: TransactionCreateNestedOneWithoutTagsInput
    chatMessage?: ChatMessageCreateNestedOneWithoutTagsInput
    offerCategory?: OfferCreateNestedManyWithoutCategoryTagInput
    offerUnit?: OfferCreateNestedManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferCreateNestedManyWithoutDeliveryTermsTagInput
  }

  export type TagUncheckedCreateWithoutTypeInput = {
    id?: number
    createdAt: Date | string
    createdByProfileId: number
    isPrivate: boolean
    transactionHash?: string | null
    chatMessageId?: number | null
    value?: string | null
    offerCategory?: OfferUncheckedCreateNestedManyWithoutCategoryTagInput
    offerUnit?: OfferUncheckedCreateNestedManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferUncheckedCreateNestedManyWithoutDeliveryTermsTagInput
  }

  export type TagCreateOrConnectWithoutTypeInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutTypeInput, TagUncheckedCreateWithoutTypeInput>
  }

  export type TagCreateManyTypeInputEnvelope = {
    data: Enumerable<TagCreateManyTypeInput>
    skipDuplicates?: boolean
  }

  export type TagUpsertWithWhereUniqueWithoutTypeInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutTypeInput, TagUncheckedUpdateWithoutTypeInput>
    create: XOR<TagCreateWithoutTypeInput, TagUncheckedCreateWithoutTypeInput>
  }

  export type TagUpdateWithWhereUniqueWithoutTypeInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutTypeInput, TagUncheckedUpdateWithoutTypeInput>
  }

  export type TagUpdateManyWithWhereWithoutTypeInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutTagsInput>
  }

  export type TagCreateWithoutTransactionInput = {
    createdAt: Date | string
    isPrivate: boolean
    value?: string | null
    createdBy: ProfileCreateNestedOneWithoutTagsInput
    type: TagTypeCreateNestedOneWithoutTagsInput
    chatMessage?: ChatMessageCreateNestedOneWithoutTagsInput
    offerCategory?: OfferCreateNestedManyWithoutCategoryTagInput
    offerUnit?: OfferCreateNestedManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferCreateNestedManyWithoutDeliveryTermsTagInput
  }

  export type TagUncheckedCreateWithoutTransactionInput = {
    id?: number
    createdAt: Date | string
    createdByProfileId: number
    isPrivate: boolean
    typeId: string
    chatMessageId?: number | null
    value?: string | null
    offerCategory?: OfferUncheckedCreateNestedManyWithoutCategoryTagInput
    offerUnit?: OfferUncheckedCreateNestedManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferUncheckedCreateNestedManyWithoutDeliveryTermsTagInput
  }

  export type TagCreateOrConnectWithoutTransactionInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutTransactionInput, TagUncheckedCreateWithoutTransactionInput>
  }

  export type TagCreateManyTransactionInputEnvelope = {
    data: Enumerable<TagCreateManyTransactionInput>
    skipDuplicates?: boolean
  }

  export type TagUpsertWithWhereUniqueWithoutTransactionInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutTransactionInput, TagUncheckedUpdateWithoutTransactionInput>
    create: XOR<TagCreateWithoutTransactionInput, TagUncheckedCreateWithoutTransactionInput>
  }

  export type TagUpdateWithWhereUniqueWithoutTransactionInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutTransactionInput, TagUncheckedUpdateWithoutTransactionInput>
  }

  export type TagUpdateManyWithWhereWithoutTransactionInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutTagsInput>
  }

  export type ProfileCreateWithoutTagsInput = {
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionCreateNestedManyWithoutProfileInput
    offers?: OfferCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipCreateNestedManyWithoutMemberInput
    members?: MembershipCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileUncheckedCreateWithoutTagsInput = {
    id?: number
    lastUpdateAt?: Date | string
    emailAddress?: string | null
    status?: string | null
    type?: ProfileType | null
    circlesAddress?: string | null
    circlesSafeOwner?: string | null
    circlesTokenAddress?: string | null
    firstName: string
    lastName?: string | null
    avatarUrl?: string | null
    avatarCid?: string | null
    avatarMimeType?: string | null
    dream?: string | null
    country?: string | null
    newsletter?: boolean | null
    displayTimeCircles?: boolean | null
    cityGeonameid?: number | null
    lastAcknowledged?: Date | string | null
    verifySafeChallenge?: string | null
    newSafeAddress?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutProfileInput
    offers?: OfferUncheckedCreateNestedManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedCreateNestedManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedCreateNestedManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedCreateNestedManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedCreateNestedManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedCreateNestedManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutSubscriberInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutMemberInput
    members?: MembershipUncheckedCreateNestedManyWithoutMemberAtInput
  }

  export type ProfileCreateOrConnectWithoutTagsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutTagsInput, ProfileUncheckedCreateWithoutTagsInput>
  }

  export type TransactionCreateWithoutTagsInput = {
    transactionHash: string
  }

  export type TransactionUncheckedCreateWithoutTagsInput = {
    transactionHash: string
  }

  export type TransactionCreateOrConnectWithoutTagsInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutTagsInput, TransactionUncheckedCreateWithoutTagsInput>
  }

  export type TagTypeCreateWithoutTagsInput = {
    id: string
  }

  export type TagTypeUncheckedCreateWithoutTagsInput = {
    id: string
  }

  export type TagTypeCreateOrConnectWithoutTagsInput = {
    where: TagTypeWhereUniqueInput
    create: XOR<TagTypeCreateWithoutTagsInput, TagTypeUncheckedCreateWithoutTagsInput>
  }

  export type ChatMessageCreateWithoutTagsInput = {
    createdAt: Date | string
    from: string
    to: string
    text: string
  }

  export type ChatMessageUncheckedCreateWithoutTagsInput = {
    id?: number
    createdAt: Date | string
    from: string
    to: string
    text: string
  }

  export type ChatMessageCreateOrConnectWithoutTagsInput = {
    where: ChatMessageWhereUniqueInput
    create: XOR<ChatMessageCreateWithoutTagsInput, ChatMessageUncheckedCreateWithoutTagsInput>
  }

  export type OfferCreateWithoutCategoryTagInput = {
    publishedAt: Date | string
    unlistedAt?: Date | string | null
    title: string
    pictureUrl?: string | null
    pictureMimeType?: string | null
    description?: string | null
    geonameid: number
    pricePerUnit: string
    maxUnits?: number | null
    createdBy: ProfileCreateNestedOneWithoutOffersInput
    purchases?: PurchaseCreateNestedManyWithoutPurchasedItemInput
    unitTag: TagCreateNestedOneWithoutOfferUnitInput
    deliveryTermsTag: TagCreateNestedOneWithoutOfferDeliveryTermsInput
    subscribers?: SubscriptionCreateNestedManyWithoutSubscribingToOfferInput
  }

  export type OfferUncheckedCreateWithoutCategoryTagInput = {
    id?: number
    createdByProfileId: number
    publishedAt: Date | string
    unlistedAt?: Date | string | null
    title: string
    pictureUrl?: string | null
    pictureMimeType?: string | null
    description?: string | null
    geonameid: number
    pricePerUnit: string
    unitTagId: number
    maxUnits?: number | null
    deliveryTermsTagId: number
    purchases?: PurchaseUncheckedCreateNestedManyWithoutPurchasedItemInput
    subscribers?: SubscriptionUncheckedCreateNestedManyWithoutSubscribingToOfferInput
  }

  export type OfferCreateOrConnectWithoutCategoryTagInput = {
    where: OfferWhereUniqueInput
    create: XOR<OfferCreateWithoutCategoryTagInput, OfferUncheckedCreateWithoutCategoryTagInput>
  }

  export type OfferCreateManyCategoryTagInputEnvelope = {
    data: Enumerable<OfferCreateManyCategoryTagInput>
    skipDuplicates?: boolean
  }

  export type OfferCreateWithoutUnitTagInput = {
    publishedAt: Date | string
    unlistedAt?: Date | string | null
    title: string
    pictureUrl?: string | null
    pictureMimeType?: string | null
    description?: string | null
    geonameid: number
    pricePerUnit: string
    maxUnits?: number | null
    createdBy: ProfileCreateNestedOneWithoutOffersInput
    purchases?: PurchaseCreateNestedManyWithoutPurchasedItemInput
    categoryTag: TagCreateNestedOneWithoutOfferCategoryInput
    deliveryTermsTag: TagCreateNestedOneWithoutOfferDeliveryTermsInput
    subscribers?: SubscriptionCreateNestedManyWithoutSubscribingToOfferInput
  }

  export type OfferUncheckedCreateWithoutUnitTagInput = {
    id?: number
    createdByProfileId: number
    publishedAt: Date | string
    unlistedAt?: Date | string | null
    title: string
    pictureUrl?: string | null
    pictureMimeType?: string | null
    description?: string | null
    categoryTagId: number
    geonameid: number
    pricePerUnit: string
    maxUnits?: number | null
    deliveryTermsTagId: number
    purchases?: PurchaseUncheckedCreateNestedManyWithoutPurchasedItemInput
    subscribers?: SubscriptionUncheckedCreateNestedManyWithoutSubscribingToOfferInput
  }

  export type OfferCreateOrConnectWithoutUnitTagInput = {
    where: OfferWhereUniqueInput
    create: XOR<OfferCreateWithoutUnitTagInput, OfferUncheckedCreateWithoutUnitTagInput>
  }

  export type OfferCreateManyUnitTagInputEnvelope = {
    data: Enumerable<OfferCreateManyUnitTagInput>
    skipDuplicates?: boolean
  }

  export type OfferCreateWithoutDeliveryTermsTagInput = {
    publishedAt: Date | string
    unlistedAt?: Date | string | null
    title: string
    pictureUrl?: string | null
    pictureMimeType?: string | null
    description?: string | null
    geonameid: number
    pricePerUnit: string
    maxUnits?: number | null
    createdBy: ProfileCreateNestedOneWithoutOffersInput
    purchases?: PurchaseCreateNestedManyWithoutPurchasedItemInput
    categoryTag: TagCreateNestedOneWithoutOfferCategoryInput
    unitTag: TagCreateNestedOneWithoutOfferUnitInput
    subscribers?: SubscriptionCreateNestedManyWithoutSubscribingToOfferInput
  }

  export type OfferUncheckedCreateWithoutDeliveryTermsTagInput = {
    id?: number
    createdByProfileId: number
    publishedAt: Date | string
    unlistedAt?: Date | string | null
    title: string
    pictureUrl?: string | null
    pictureMimeType?: string | null
    description?: string | null
    categoryTagId: number
    geonameid: number
    pricePerUnit: string
    unitTagId: number
    maxUnits?: number | null
    purchases?: PurchaseUncheckedCreateNestedManyWithoutPurchasedItemInput
    subscribers?: SubscriptionUncheckedCreateNestedManyWithoutSubscribingToOfferInput
  }

  export type OfferCreateOrConnectWithoutDeliveryTermsTagInput = {
    where: OfferWhereUniqueInput
    create: XOR<OfferCreateWithoutDeliveryTermsTagInput, OfferUncheckedCreateWithoutDeliveryTermsTagInput>
  }

  export type OfferCreateManyDeliveryTermsTagInputEnvelope = {
    data: Enumerable<OfferCreateManyDeliveryTermsTagInput>
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutTagsInput = {
    update: XOR<ProfileUpdateWithoutTagsInput, ProfileUncheckedUpdateWithoutTagsInput>
    create: XOR<ProfileCreateWithoutTagsInput, ProfileUncheckedCreateWithoutTagsInput>
  }

  export type ProfileUpdateWithoutTagsInput = {
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutProfileInput
    offers?: OfferUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUpdateManyWithoutSubscriberInput
    memberships?: MembershipUpdateManyWithoutMemberInput
    members?: MembershipUpdateManyWithoutMemberAtInput
  }

  export type ProfileUncheckedUpdateWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    lastUpdateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumProfileTypeFieldUpdateOperationsInput | ProfileType | null
    circlesAddress?: NullableStringFieldUpdateOperationsInput | string | null
    circlesSafeOwner?: NullableStringFieldUpdateOperationsInput | string | null
    circlesTokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarCid?: NullableStringFieldUpdateOperationsInput | string | null
    avatarMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    dream?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    newsletter?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayTimeCircles?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cityGeonameid?: NullableIntFieldUpdateOperationsInput | number | null
    lastAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifySafeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    newSafeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutProfileInput
    offers?: OfferUncheckedUpdateManyWithoutCreatedByInput
    purchases?: PurchaseUncheckedUpdateManyWithoutPurchasedByInput
    invitations?: InvitationUncheckedUpdateManyWithoutCreatedByInput
    redeemInvitationRequests?: RedeemInvitationRequestUncheckedUpdateManyWithoutCreatedByInput
    redeemedInvitations?: InvitationUncheckedUpdateManyWithoutRedeemedByInput
    claimedInvitations?: InvitationUncheckedUpdateManyWithoutClaimedByInput
    subscribers?: SubscriptionUncheckedUpdateManyWithoutSubscribingToProfileInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutSubscriberInput
    memberships?: MembershipUncheckedUpdateManyWithoutMemberInput
    members?: MembershipUncheckedUpdateManyWithoutMemberAtInput
  }

  export type TransactionUpsertWithoutTagsInput = {
    update: XOR<TransactionUpdateWithoutTagsInput, TransactionUncheckedUpdateWithoutTagsInput>
    create: XOR<TransactionCreateWithoutTagsInput, TransactionUncheckedCreateWithoutTagsInput>
  }

  export type TransactionUpdateWithoutTagsInput = {
    transactionHash?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionUncheckedUpdateWithoutTagsInput = {
    transactionHash?: StringFieldUpdateOperationsInput | string
  }

  export type TagTypeUpsertWithoutTagsInput = {
    update: XOR<TagTypeUpdateWithoutTagsInput, TagTypeUncheckedUpdateWithoutTagsInput>
    create: XOR<TagTypeCreateWithoutTagsInput, TagTypeUncheckedCreateWithoutTagsInput>
  }

  export type TagTypeUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type TagTypeUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type ChatMessageUpsertWithoutTagsInput = {
    update: XOR<ChatMessageUpdateWithoutTagsInput, ChatMessageUncheckedUpdateWithoutTagsInput>
    create: XOR<ChatMessageCreateWithoutTagsInput, ChatMessageUncheckedCreateWithoutTagsInput>
  }

  export type ChatMessageUpdateWithoutTagsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type ChatMessageUncheckedUpdateWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type OfferUpsertWithWhereUniqueWithoutCategoryTagInput = {
    where: OfferWhereUniqueInput
    update: XOR<OfferUpdateWithoutCategoryTagInput, OfferUncheckedUpdateWithoutCategoryTagInput>
    create: XOR<OfferCreateWithoutCategoryTagInput, OfferUncheckedCreateWithoutCategoryTagInput>
  }

  export type OfferUpdateWithWhereUniqueWithoutCategoryTagInput = {
    where: OfferWhereUniqueInput
    data: XOR<OfferUpdateWithoutCategoryTagInput, OfferUncheckedUpdateWithoutCategoryTagInput>
  }

  export type OfferUpdateManyWithWhereWithoutCategoryTagInput = {
    where: OfferScalarWhereInput
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyWithoutOfferCategoryInput>
  }

  export type OfferUpsertWithWhereUniqueWithoutUnitTagInput = {
    where: OfferWhereUniqueInput
    update: XOR<OfferUpdateWithoutUnitTagInput, OfferUncheckedUpdateWithoutUnitTagInput>
    create: XOR<OfferCreateWithoutUnitTagInput, OfferUncheckedCreateWithoutUnitTagInput>
  }

  export type OfferUpdateWithWhereUniqueWithoutUnitTagInput = {
    where: OfferWhereUniqueInput
    data: XOR<OfferUpdateWithoutUnitTagInput, OfferUncheckedUpdateWithoutUnitTagInput>
  }

  export type OfferUpdateManyWithWhereWithoutUnitTagInput = {
    where: OfferScalarWhereInput
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyWithoutOfferUnitInput>
  }

  export type OfferUpsertWithWhereUniqueWithoutDeliveryTermsTagInput = {
    where: OfferWhereUniqueInput
    update: XOR<OfferUpdateWithoutDeliveryTermsTagInput, OfferUncheckedUpdateWithoutDeliveryTermsTagInput>
    create: XOR<OfferCreateWithoutDeliveryTermsTagInput, OfferUncheckedCreateWithoutDeliveryTermsTagInput>
  }

  export type OfferUpdateWithWhereUniqueWithoutDeliveryTermsTagInput = {
    where: OfferWhereUniqueInput
    data: XOR<OfferUpdateWithoutDeliveryTermsTagInput, OfferUncheckedUpdateWithoutDeliveryTermsTagInput>
  }

  export type OfferUpdateManyWithWhereWithoutDeliveryTermsTagInput = {
    where: OfferScalarWhereInput
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyWithoutOfferDeliveryTermsInput>
  }

  export type RedeemInvitationRequestCreateManyInvitationToRedeemInput = {
    id?: number
    createdAt: Date | string
    createdByProfileId: number
    workerProcess?: string | null
    pickedAt?: Date | string | null
  }

  export type RedeemInvitationRequestUpdateWithoutInvitationToRedeemInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workerProcess?: NullableStringFieldUpdateOperationsInput | string | null
    pickedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: ProfileUpdateOneRequiredWithoutRedeemInvitationRequestsInput
  }

  export type RedeemInvitationRequestUncheckedUpdateWithoutInvitationToRedeemInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    workerProcess?: NullableStringFieldUpdateOperationsInput | string | null
    pickedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RedeemInvitationRequestUncheckedUpdateManyWithoutIndexedTransactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    workerProcess?: NullableStringFieldUpdateOperationsInput | string | null
    pickedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionCreateManyProfileInput = {
    sessionId: string
    emailAddress?: string | null
    ethAddress?: string | null
    challengeHash?: string | null
    signature?: string | null
    issuedBy: string
    jti?: string | null
    createdAt: Date | string
    validFrom?: Date | string | null
    endedAt?: Date | string | null
    endReason?: string | null
    maxLifetime: number
  }

  export type TagCreateManyCreatedByInput = {
    id?: number
    createdAt: Date | string
    isPrivate: boolean
    transactionHash?: string | null
    typeId: string
    chatMessageId?: number | null
    value?: string | null
  }

  export type OfferCreateManyCreatedByInput = {
    id?: number
    publishedAt: Date | string
    unlistedAt?: Date | string | null
    title: string
    pictureUrl?: string | null
    pictureMimeType?: string | null
    description?: string | null
    categoryTagId: number
    geonameid: number
    pricePerUnit: string
    unitTagId: number
    maxUnits?: number | null
    deliveryTermsTagId: number
  }

  export type PurchaseCreateManyPurchasedByInput = {
    id?: number
    purchasedAt: Date | string
    purchasedProvenAt?: Date | string | null
    purchasedItemId: number
    purchasedItemTitle: string
    pricePerUnit: string
    purchasedUnits: number
    grandTotal: string
    purchasedItemVat: number
    status: PurchaseStatus
  }

  export type InvitationCreateManyCreatedByInput = {
    id?: number
    createdAt: Date | string
    name: string
    code: string
    claimedByProfileId?: number | null
    claimedAt?: Date | string | null
    redeemedByProfileId?: number | null
    redeemedAt?: Date | string | null
    redeemTxHash?: string | null
    address: string
    key: string
  }

  export type RedeemInvitationRequestCreateManyCreatedByInput = {
    id?: number
    createdAt: Date | string
    workerProcess?: string | null
    pickedAt?: Date | string | null
    invitationToRedeemId: number
  }

  export type InvitationCreateManyRedeemedByInput = {
    id?: number
    createdByProfileId: number
    createdAt: Date | string
    name: string
    code: string
    claimedByProfileId?: number | null
    claimedAt?: Date | string | null
    redeemedAt?: Date | string | null
    redeemTxHash?: string | null
    address: string
    key: string
  }

  export type InvitationCreateManyClaimedByInput = {
    id?: number
    createdByProfileId: number
    createdAt: Date | string
    name: string
    code: string
    claimedAt?: Date | string | null
    redeemedByProfileId?: number | null
    redeemedAt?: Date | string | null
    redeemTxHash?: string | null
    address: string
    key: string
  }

  export type SubscriptionCreateManySubscribingToProfileInput = {
    id?: number
    createdAt: Date | string
    subscribingToOfferId?: number | null
    subscribingToProfileId?: number | null
  }

  export type SubscriptionCreateManySubscriberInput = {
    id?: number
    createdAt: Date | string
    subscribingToOfferId?: number | null
    subscribingToProfileId?: number | null
  }

  export type MembershipCreateManyMemberInput = {
    id?: number
    createdAt?: Date | string
    memberAtId: number
  }

  export type MembershipCreateManyMemberAtInput = {
    id?: number
    createdAt?: Date | string
    memberId: number
  }

  export type SessionUpdateWithoutProfileInput = {
    sessionId?: StringFieldUpdateOperationsInput | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    ethAddress?: NullableStringFieldUpdateOperationsInput | string | null
    challengeHash?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    issuedBy?: StringFieldUpdateOperationsInput | string
    jti?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    validFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    maxLifetime?: IntFieldUpdateOperationsInput | number
  }

  export type SessionUncheckedUpdateWithoutProfileInput = {
    sessionId?: StringFieldUpdateOperationsInput | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    ethAddress?: NullableStringFieldUpdateOperationsInput | string | null
    challengeHash?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    issuedBy?: StringFieldUpdateOperationsInput | string
    jti?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    validFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    maxLifetime?: IntFieldUpdateOperationsInput | number
  }

  export type SessionUncheckedUpdateManyWithoutSessionsInput = {
    sessionId?: StringFieldUpdateOperationsInput | string
    emailAddress?: NullableStringFieldUpdateOperationsInput | string | null
    ethAddress?: NullableStringFieldUpdateOperationsInput | string | null
    challengeHash?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    issuedBy?: StringFieldUpdateOperationsInput | string
    jti?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    validFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    maxLifetime?: IntFieldUpdateOperationsInput | number
  }

  export type TagUpdateWithoutCreatedByInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    value?: NullableStringFieldUpdateOperationsInput | string | null
    transaction?: TransactionUpdateOneWithoutTagsInput
    type?: TagTypeUpdateOneRequiredWithoutTagsInput
    chatMessage?: ChatMessageUpdateOneWithoutTagsInput
    offerCategory?: OfferUpdateManyWithoutCategoryTagInput
    offerUnit?: OfferUpdateManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferUpdateManyWithoutDeliveryTermsTagInput
  }

  export type TagUncheckedUpdateWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    typeId?: StringFieldUpdateOperationsInput | string
    chatMessageId?: NullableIntFieldUpdateOperationsInput | number | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    offerCategory?: OfferUncheckedUpdateManyWithoutCategoryTagInput
    offerUnit?: OfferUncheckedUpdateManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferUncheckedUpdateManyWithoutDeliveryTermsTagInput
  }

  export type TagUncheckedUpdateManyWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    typeId?: StringFieldUpdateOperationsInput | string
    chatMessageId?: NullableIntFieldUpdateOperationsInput | number | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OfferUpdateWithoutCreatedByInput = {
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
    purchases?: PurchaseUpdateManyWithoutPurchasedItemInput
    categoryTag?: TagUpdateOneRequiredWithoutOfferCategoryInput
    unitTag?: TagUpdateOneRequiredWithoutOfferUnitInput
    deliveryTermsTag?: TagUpdateOneRequiredWithoutOfferDeliveryTermsInput
    subscribers?: SubscriptionUpdateManyWithoutSubscribingToOfferInput
  }

  export type OfferUncheckedUpdateWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryTagId?: IntFieldUpdateOperationsInput | number
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    unitTagId?: IntFieldUpdateOperationsInput | number
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryTermsTagId?: IntFieldUpdateOperationsInput | number
    purchases?: PurchaseUncheckedUpdateManyWithoutPurchasedItemInput
    subscribers?: SubscriptionUncheckedUpdateManyWithoutSubscribingToOfferInput
  }

  export type OfferUncheckedUpdateManyWithoutOffersInput = {
    id?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryTagId?: IntFieldUpdateOperationsInput | number
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    unitTagId?: IntFieldUpdateOperationsInput | number
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryTermsTagId?: IntFieldUpdateOperationsInput | number
  }

  export type PurchaseUpdateWithoutPurchasedByInput = {
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasedProvenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchasedItemTitle?: StringFieldUpdateOperationsInput | string
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    purchasedUnits?: IntFieldUpdateOperationsInput | number
    grandTotal?: StringFieldUpdateOperationsInput | string
    purchasedItemVat?: IntFieldUpdateOperationsInput | number
    status?: EnumPurchaseStatusFieldUpdateOperationsInput | PurchaseStatus
    purchasedItem?: OfferUpdateOneRequiredWithoutPurchasesInput
    jobs?: TransactionJobsUpdateManyWithoutPurchaseInput
  }

  export type PurchaseUncheckedUpdateWithoutPurchasedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasedProvenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchasedItemId?: IntFieldUpdateOperationsInput | number
    purchasedItemTitle?: StringFieldUpdateOperationsInput | string
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    purchasedUnits?: IntFieldUpdateOperationsInput | number
    grandTotal?: StringFieldUpdateOperationsInput | string
    purchasedItemVat?: IntFieldUpdateOperationsInput | number
    status?: EnumPurchaseStatusFieldUpdateOperationsInput | PurchaseStatus
    jobs?: TransactionJobsUncheckedUpdateManyWithoutPurchaseInput
  }

  export type PurchaseUncheckedUpdateManyWithoutPurchasesInput = {
    id?: IntFieldUpdateOperationsInput | number
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasedProvenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchasedItemId?: IntFieldUpdateOperationsInput | number
    purchasedItemTitle?: StringFieldUpdateOperationsInput | string
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    purchasedUnits?: IntFieldUpdateOperationsInput | number
    grandTotal?: StringFieldUpdateOperationsInput | string
    purchasedItemVat?: IntFieldUpdateOperationsInput | number
    status?: EnumPurchaseStatusFieldUpdateOperationsInput | PurchaseStatus
  }

  export type InvitationUpdateWithoutCreatedByInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    claimedBy?: ProfileUpdateOneWithoutClaimedInvitationsInput
    redeemedBy?: ProfileUpdateOneWithoutRedeemedInvitationsInput
    indexedTransactions?: RedeemInvitationRequestUpdateManyWithoutInvitationToRedeemInput
  }

  export type InvitationUncheckedUpdateWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    claimedByProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedByProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    indexedTransactions?: RedeemInvitationRequestUncheckedUpdateManyWithoutInvitationToRedeemInput
  }

  export type InvitationUncheckedUpdateManyWithoutInvitationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    claimedByProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedByProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
  }

  export type RedeemInvitationRequestUpdateWithoutCreatedByInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workerProcess?: NullableStringFieldUpdateOperationsInput | string | null
    pickedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitationToRedeem?: InvitationUpdateOneRequiredWithoutIndexedTransactionsInput
  }

  export type RedeemInvitationRequestUncheckedUpdateWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workerProcess?: NullableStringFieldUpdateOperationsInput | string | null
    pickedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitationToRedeemId?: IntFieldUpdateOperationsInput | number
  }

  export type RedeemInvitationRequestUncheckedUpdateManyWithoutRedeemInvitationRequestsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workerProcess?: NullableStringFieldUpdateOperationsInput | string | null
    pickedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitationToRedeemId?: IntFieldUpdateOperationsInput | number
  }

  export type InvitationUpdateWithoutRedeemedByInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    createdBy?: ProfileUpdateOneRequiredWithoutInvitationsInput
    claimedBy?: ProfileUpdateOneWithoutClaimedInvitationsInput
    indexedTransactions?: RedeemInvitationRequestUpdateManyWithoutInvitationToRedeemInput
  }

  export type InvitationUncheckedUpdateWithoutRedeemedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    claimedByProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    indexedTransactions?: RedeemInvitationRequestUncheckedUpdateManyWithoutInvitationToRedeemInput
  }

  export type InvitationUncheckedUpdateManyWithoutRedeemedInvitationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    claimedByProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
  }

  export type InvitationUpdateWithoutClaimedByInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    createdBy?: ProfileUpdateOneRequiredWithoutInvitationsInput
    redeemedBy?: ProfileUpdateOneWithoutRedeemedInvitationsInput
    indexedTransactions?: RedeemInvitationRequestUpdateManyWithoutInvitationToRedeemInput
  }

  export type InvitationUncheckedUpdateWithoutClaimedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedByProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    indexedTransactions?: RedeemInvitationRequestUncheckedUpdateManyWithoutInvitationToRedeemInput
  }

  export type InvitationUncheckedUpdateManyWithoutClaimedInvitationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedByProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
  }

  export type SubscriptionUpdateWithoutSubscribingToProfileInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribingToOfferId?: NullableIntFieldUpdateOperationsInput | number | null
    subscribingToProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    subscriber?: ProfileUpdateOneRequiredWithoutSubscriptionsInput
    subscribingToOffer?: OfferUpdateOneWithoutSubscribersInput
  }

  export type SubscriptionUncheckedUpdateWithoutSubscribingToProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribingToOfferId?: NullableIntFieldUpdateOperationsInput | number | null
    subscribingToProfileId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SubscriptionUncheckedUpdateManyWithoutSubscribersInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribingToOfferId?: NullableIntFieldUpdateOperationsInput | number | null
    subscribingToProfileId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SubscriptionUpdateWithoutSubscriberInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribingToOfferId?: NullableIntFieldUpdateOperationsInput | number | null
    subscribingToProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    subscribingToOffer?: OfferUpdateOneWithoutSubscribersInput
    subscribingToProfile?: ProfileUpdateOneWithoutSubscribersInput
  }

  export type SubscriptionUncheckedUpdateWithoutSubscriberInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribingToOfferId?: NullableIntFieldUpdateOperationsInput | number | null
    subscribingToProfileId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SubscriptionUncheckedUpdateManyWithoutSubscriptionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribingToOfferId?: NullableIntFieldUpdateOperationsInput | number | null
    subscribingToProfileId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MembershipUpdateWithoutMemberInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberAt?: ProfileUpdateOneRequiredWithoutMembersInput
  }

  export type MembershipUncheckedUpdateWithoutMemberInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberAtId?: IntFieldUpdateOperationsInput | number
  }

  export type MembershipUncheckedUpdateManyWithoutMembershipsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberAtId?: IntFieldUpdateOperationsInput | number
  }

  export type MembershipUpdateWithoutMemberAtInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: ProfileUpdateOneRequiredWithoutMembershipsInput
  }

  export type MembershipUncheckedUpdateWithoutMemberAtInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberId?: IntFieldUpdateOperationsInput | number
  }

  export type MembershipUncheckedUpdateManyWithoutMembersInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberId?: IntFieldUpdateOperationsInput | number
  }

  export type TagCreateManyChatMessageInput = {
    id?: number
    createdAt: Date | string
    createdByProfileId: number
    isPrivate: boolean
    transactionHash?: string | null
    typeId: string
    value?: string | null
  }

  export type TagUpdateWithoutChatMessageInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    value?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: ProfileUpdateOneRequiredWithoutTagsInput
    transaction?: TransactionUpdateOneWithoutTagsInput
    type?: TagTypeUpdateOneRequiredWithoutTagsInput
    offerCategory?: OfferUpdateManyWithoutCategoryTagInput
    offerUnit?: OfferUpdateManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferUpdateManyWithoutDeliveryTermsTagInput
  }

  export type TagUncheckedUpdateWithoutChatMessageInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    typeId?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
    offerCategory?: OfferUncheckedUpdateManyWithoutCategoryTagInput
    offerUnit?: OfferUncheckedUpdateManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferUncheckedUpdateManyWithoutDeliveryTermsTagInput
  }

  export type PurchaseCreateManyPurchasedItemInput = {
    id?: number
    purchasedByProfileId: number
    purchasedAt: Date | string
    purchasedProvenAt?: Date | string | null
    purchasedItemTitle: string
    pricePerUnit: string
    purchasedUnits: number
    grandTotal: string
    purchasedItemVat: number
    status: PurchaseStatus
  }

  export type SubscriptionCreateManySubscribingToOfferInput = {
    id?: number
    createdAt: Date | string
    subscribingToOfferId?: number | null
    subscribingToProfileId?: number | null
  }

  export type PurchaseUpdateWithoutPurchasedItemInput = {
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasedProvenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchasedItemTitle?: StringFieldUpdateOperationsInput | string
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    purchasedUnits?: IntFieldUpdateOperationsInput | number
    grandTotal?: StringFieldUpdateOperationsInput | string
    purchasedItemVat?: IntFieldUpdateOperationsInput | number
    status?: EnumPurchaseStatusFieldUpdateOperationsInput | PurchaseStatus
    purchasedBy?: ProfileUpdateOneRequiredWithoutPurchasesInput
    jobs?: TransactionJobsUpdateManyWithoutPurchaseInput
  }

  export type PurchaseUncheckedUpdateWithoutPurchasedItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    purchasedByProfileId?: IntFieldUpdateOperationsInput | number
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasedProvenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchasedItemTitle?: StringFieldUpdateOperationsInput | string
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    purchasedUnits?: IntFieldUpdateOperationsInput | number
    grandTotal?: StringFieldUpdateOperationsInput | string
    purchasedItemVat?: IntFieldUpdateOperationsInput | number
    status?: EnumPurchaseStatusFieldUpdateOperationsInput | PurchaseStatus
    jobs?: TransactionJobsUncheckedUpdateManyWithoutPurchaseInput
  }

  export type SubscriptionUpdateWithoutSubscribingToOfferInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribingToOfferId?: NullableIntFieldUpdateOperationsInput | number | null
    subscribingToProfileId?: NullableIntFieldUpdateOperationsInput | number | null
    subscriber?: ProfileUpdateOneRequiredWithoutSubscriptionsInput
    subscribingToProfile?: ProfileUpdateOneWithoutSubscribersInput
  }

  export type SubscriptionUncheckedUpdateWithoutSubscribingToOfferInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribingToOfferId?: NullableIntFieldUpdateOperationsInput | number | null
    subscribingToProfileId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TransactionJobsCreateManyPurchaseInput = {
    id?: number
    transactionhash: string
    status: string
    user: string
  }

  export type TransactionJobsUpdateWithoutPurchaseInput = {
    transactionhash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    user?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionJobsUncheckedUpdateWithoutPurchaseInput = {
    id?: IntFieldUpdateOperationsInput | number
    transactionhash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    user?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionJobsUncheckedUpdateManyWithoutJobsInput = {
    id?: IntFieldUpdateOperationsInput | number
    transactionhash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    user?: StringFieldUpdateOperationsInput | string
  }

  export type TagCreateManyTypeInput = {
    id?: number
    createdAt: Date | string
    createdByProfileId: number
    isPrivate: boolean
    transactionHash?: string | null
    chatMessageId?: number | null
    value?: string | null
  }

  export type TagUpdateWithoutTypeInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    value?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: ProfileUpdateOneRequiredWithoutTagsInput
    transaction?: TransactionUpdateOneWithoutTagsInput
    chatMessage?: ChatMessageUpdateOneWithoutTagsInput
    offerCategory?: OfferUpdateManyWithoutCategoryTagInput
    offerUnit?: OfferUpdateManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferUpdateManyWithoutDeliveryTermsTagInput
  }

  export type TagUncheckedUpdateWithoutTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    chatMessageId?: NullableIntFieldUpdateOperationsInput | number | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    offerCategory?: OfferUncheckedUpdateManyWithoutCategoryTagInput
    offerUnit?: OfferUncheckedUpdateManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferUncheckedUpdateManyWithoutDeliveryTermsTagInput
  }

  export type TagCreateManyTransactionInput = {
    id?: number
    createdAt: Date | string
    createdByProfileId: number
    isPrivate: boolean
    typeId: string
    chatMessageId?: number | null
    value?: string | null
  }

  export type TagUpdateWithoutTransactionInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    value?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: ProfileUpdateOneRequiredWithoutTagsInput
    type?: TagTypeUpdateOneRequiredWithoutTagsInput
    chatMessage?: ChatMessageUpdateOneWithoutTagsInput
    offerCategory?: OfferUpdateManyWithoutCategoryTagInput
    offerUnit?: OfferUpdateManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferUpdateManyWithoutDeliveryTermsTagInput
  }

  export type TagUncheckedUpdateWithoutTransactionInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    typeId?: StringFieldUpdateOperationsInput | string
    chatMessageId?: NullableIntFieldUpdateOperationsInput | number | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    offerCategory?: OfferUncheckedUpdateManyWithoutCategoryTagInput
    offerUnit?: OfferUncheckedUpdateManyWithoutUnitTagInput
    offerDeliveryTerms?: OfferUncheckedUpdateManyWithoutDeliveryTermsTagInput
  }

  export type OfferCreateManyCategoryTagInput = {
    id?: number
    createdByProfileId: number
    publishedAt: Date | string
    unlistedAt?: Date | string | null
    title: string
    pictureUrl?: string | null
    pictureMimeType?: string | null
    description?: string | null
    geonameid: number
    pricePerUnit: string
    unitTagId: number
    maxUnits?: number | null
    deliveryTermsTagId: number
  }

  export type OfferCreateManyUnitTagInput = {
    id?: number
    createdByProfileId: number
    publishedAt: Date | string
    unlistedAt?: Date | string | null
    title: string
    pictureUrl?: string | null
    pictureMimeType?: string | null
    description?: string | null
    categoryTagId: number
    geonameid: number
    pricePerUnit: string
    maxUnits?: number | null
    deliveryTermsTagId: number
  }

  export type OfferCreateManyDeliveryTermsTagInput = {
    id?: number
    createdByProfileId: number
    publishedAt: Date | string
    unlistedAt?: Date | string | null
    title: string
    pictureUrl?: string | null
    pictureMimeType?: string | null
    description?: string | null
    categoryTagId: number
    geonameid: number
    pricePerUnit: string
    unitTagId: number
    maxUnits?: number | null
  }

  export type OfferUpdateWithoutCategoryTagInput = {
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
    createdBy?: ProfileUpdateOneRequiredWithoutOffersInput
    purchases?: PurchaseUpdateManyWithoutPurchasedItemInput
    unitTag?: TagUpdateOneRequiredWithoutOfferUnitInput
    deliveryTermsTag?: TagUpdateOneRequiredWithoutOfferDeliveryTermsInput
    subscribers?: SubscriptionUpdateManyWithoutSubscribingToOfferInput
  }

  export type OfferUncheckedUpdateWithoutCategoryTagInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    unitTagId?: IntFieldUpdateOperationsInput | number
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryTermsTagId?: IntFieldUpdateOperationsInput | number
    purchases?: PurchaseUncheckedUpdateManyWithoutPurchasedItemInput
    subscribers?: SubscriptionUncheckedUpdateManyWithoutSubscribingToOfferInput
  }

  export type OfferUncheckedUpdateManyWithoutOfferCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    unitTagId?: IntFieldUpdateOperationsInput | number
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryTermsTagId?: IntFieldUpdateOperationsInput | number
  }

  export type OfferUpdateWithoutUnitTagInput = {
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
    createdBy?: ProfileUpdateOneRequiredWithoutOffersInput
    purchases?: PurchaseUpdateManyWithoutPurchasedItemInput
    categoryTag?: TagUpdateOneRequiredWithoutOfferCategoryInput
    deliveryTermsTag?: TagUpdateOneRequiredWithoutOfferDeliveryTermsInput
    subscribers?: SubscriptionUpdateManyWithoutSubscribingToOfferInput
  }

  export type OfferUncheckedUpdateWithoutUnitTagInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryTagId?: IntFieldUpdateOperationsInput | number
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryTermsTagId?: IntFieldUpdateOperationsInput | number
    purchases?: PurchaseUncheckedUpdateManyWithoutPurchasedItemInput
    subscribers?: SubscriptionUncheckedUpdateManyWithoutSubscribingToOfferInput
  }

  export type OfferUncheckedUpdateManyWithoutOfferUnitInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryTagId?: IntFieldUpdateOperationsInput | number
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryTermsTagId?: IntFieldUpdateOperationsInput | number
  }

  export type OfferUpdateWithoutDeliveryTermsTagInput = {
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
    createdBy?: ProfileUpdateOneRequiredWithoutOffersInput
    purchases?: PurchaseUpdateManyWithoutPurchasedItemInput
    categoryTag?: TagUpdateOneRequiredWithoutOfferCategoryInput
    unitTag?: TagUpdateOneRequiredWithoutOfferUnitInput
    subscribers?: SubscriptionUpdateManyWithoutSubscribingToOfferInput
  }

  export type OfferUncheckedUpdateWithoutDeliveryTermsTagInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryTagId?: IntFieldUpdateOperationsInput | number
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    unitTagId?: IntFieldUpdateOperationsInput | number
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
    purchases?: PurchaseUncheckedUpdateManyWithoutPurchasedItemInput
    subscribers?: SubscriptionUncheckedUpdateManyWithoutSubscribingToOfferInput
  }

  export type OfferUncheckedUpdateManyWithoutOfferDeliveryTermsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdByProfileId?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unlistedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pictureMimeType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryTagId?: IntFieldUpdateOperationsInput | number
    geonameid?: IntFieldUpdateOperationsInput | number
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    unitTagId?: IntFieldUpdateOperationsInput | number
    maxUnits?: NullableIntFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}