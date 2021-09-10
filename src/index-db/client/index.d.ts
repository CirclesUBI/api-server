
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
 * Model block
 */

export type block = {
  number: bigint
  hash: string
  timestamp: Date
  total_transaction_count: number
  indexed_transaction_count: number
}

/**
 * Model crc_hub_transfer
 */

export type crc_hub_transfer = {
  id: bigint
  transaction_id: bigint
  from: string
  to: string
  value: string
}

/**
 * Model crc_organisation_signup
 */

export type crc_organisation_signup = {
  id: bigint
  transaction_id: bigint
  organisation: string
}

/**
 * Model crc_signup
 */

export type crc_signup = {
  id: bigint
  transaction_id: bigint
  user: string
  token: string
}

/**
 * Model crc_trust
 */

export type crc_trust = {
  id: bigint
  transaction_id: bigint
  address: string
  can_send_to: string
  limit: bigint
}

/**
 * Model erc20_transfer
 */

export type erc20_transfer = {
  id: bigint
  transaction_id: bigint
  from: string
  to: string
  token: string
  value: string
}

/**
 * Model eth_transfer
 */

export type eth_transfer = {
  id: bigint
  transaction_id: bigint
  from: string
  to: string
  value: string
}

/**
 * Model gnosis_safe_eth_transfer
 */

export type gnosis_safe_eth_transfer = {
  id: bigint
  transaction_id: bigint
  initiator: string
  from: string
  to: string
  value: string
}

/**
 * Model transaction
 */

export type transaction = {
  id: bigint
  block_number: bigint
  from: string
  to: string | null
  index: number
  gas: string
  hash: string
  value: string
  input: string | null
  nonce: string | null
  type: string | null
  gas_price: string | null
  classification: string[]
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Blocks
 * const blocks = await prisma.block.findMany()
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
   * // Fetch zero or more Blocks
   * const blocks = await prisma.block.findMany()
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
   * `prisma.block`: Exposes CRUD operations for the **block** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Blocks
    * const blocks = await prisma.block.findMany()
    * ```
    */
  get block(): Prisma.blockDelegate<GlobalReject>;

  /**
   * `prisma.crc_hub_transfer`: Exposes CRUD operations for the **crc_hub_transfer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Crc_hub_transfers
    * const crc_hub_transfers = await prisma.crc_hub_transfer.findMany()
    * ```
    */
  get crc_hub_transfer(): Prisma.crc_hub_transferDelegate<GlobalReject>;

  /**
   * `prisma.crc_organisation_signup`: Exposes CRUD operations for the **crc_organisation_signup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Crc_organisation_signups
    * const crc_organisation_signups = await prisma.crc_organisation_signup.findMany()
    * ```
    */
  get crc_organisation_signup(): Prisma.crc_organisation_signupDelegate<GlobalReject>;

  /**
   * `prisma.crc_signup`: Exposes CRUD operations for the **crc_signup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Crc_signups
    * const crc_signups = await prisma.crc_signup.findMany()
    * ```
    */
  get crc_signup(): Prisma.crc_signupDelegate<GlobalReject>;

  /**
   * `prisma.crc_trust`: Exposes CRUD operations for the **crc_trust** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Crc_trusts
    * const crc_trusts = await prisma.crc_trust.findMany()
    * ```
    */
  get crc_trust(): Prisma.crc_trustDelegate<GlobalReject>;

  /**
   * `prisma.erc20_transfer`: Exposes CRUD operations for the **erc20_transfer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Erc20_transfers
    * const erc20_transfers = await prisma.erc20_transfer.findMany()
    * ```
    */
  get erc20_transfer(): Prisma.erc20_transferDelegate<GlobalReject>;

  /**
   * `prisma.eth_transfer`: Exposes CRUD operations for the **eth_transfer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Eth_transfers
    * const eth_transfers = await prisma.eth_transfer.findMany()
    * ```
    */
  get eth_transfer(): Prisma.eth_transferDelegate<GlobalReject>;

  /**
   * `prisma.gnosis_safe_eth_transfer`: Exposes CRUD operations for the **gnosis_safe_eth_transfer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Gnosis_safe_eth_transfers
    * const gnosis_safe_eth_transfers = await prisma.gnosis_safe_eth_transfer.findMany()
    * ```
    */
  get gnosis_safe_eth_transfer(): Prisma.gnosis_safe_eth_transferDelegate<GlobalReject>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.transactionDelegate<GlobalReject>;
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
    block: 'block',
    crc_hub_transfer: 'crc_hub_transfer',
    crc_organisation_signup: 'crc_organisation_signup',
    crc_signup: 'crc_signup',
    crc_trust: 'crc_trust',
    erc20_transfer: 'erc20_transfer',
    eth_transfer: 'eth_transfer',
    gnosis_safe_eth_transfer: 'gnosis_safe_eth_transfer',
    transaction: 'transaction'
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
   * Model block
   */


  export type AggregateBlock = {
    _count: BlockCountAggregateOutputType | null
    count: BlockCountAggregateOutputType | null
    _avg: BlockAvgAggregateOutputType | null
    avg: BlockAvgAggregateOutputType | null
    _sum: BlockSumAggregateOutputType | null
    sum: BlockSumAggregateOutputType | null
    _min: BlockMinAggregateOutputType | null
    min: BlockMinAggregateOutputType | null
    _max: BlockMaxAggregateOutputType | null
    max: BlockMaxAggregateOutputType | null
  }

  export type BlockAvgAggregateOutputType = {
    number: number | null
    total_transaction_count: number | null
    indexed_transaction_count: number | null
  }

  export type BlockSumAggregateOutputType = {
    number: bigint | null
    total_transaction_count: number | null
    indexed_transaction_count: number | null
  }

  export type BlockMinAggregateOutputType = {
    number: bigint | null
    hash: string | null
    timestamp: Date | null
    total_transaction_count: number | null
    indexed_transaction_count: number | null
  }

  export type BlockMaxAggregateOutputType = {
    number: bigint | null
    hash: string | null
    timestamp: Date | null
    total_transaction_count: number | null
    indexed_transaction_count: number | null
  }

  export type BlockCountAggregateOutputType = {
    number: number
    hash: number
    timestamp: number
    total_transaction_count: number
    indexed_transaction_count: number
    _all: number
  }


  export type BlockAvgAggregateInputType = {
    number?: true
    total_transaction_count?: true
    indexed_transaction_count?: true
  }

  export type BlockSumAggregateInputType = {
    number?: true
    total_transaction_count?: true
    indexed_transaction_count?: true
  }

  export type BlockMinAggregateInputType = {
    number?: true
    hash?: true
    timestamp?: true
    total_transaction_count?: true
    indexed_transaction_count?: true
  }

  export type BlockMaxAggregateInputType = {
    number?: true
    hash?: true
    timestamp?: true
    total_transaction_count?: true
    indexed_transaction_count?: true
  }

  export type BlockCountAggregateInputType = {
    number?: true
    hash?: true
    timestamp?: true
    total_transaction_count?: true
    indexed_transaction_count?: true
    _all?: true
  }

  export type BlockAggregateArgs = {
    /**
     * Filter which block to aggregate.
     * 
    **/
    where?: blockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of blocks to fetch.
     * 
    **/
    orderBy?: Enumerable<blockOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: blockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` blocks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` blocks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned blocks
    **/
    _count?: true | BlockCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | BlockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BlockAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: BlockAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BlockSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: BlockSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlockMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: BlockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlockMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: BlockMaxAggregateInputType
  }

  export type GetBlockAggregateType<T extends BlockAggregateArgs> = {
        [P in keyof T & keyof AggregateBlock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlock[P]>
      : GetScalarType<T[P], AggregateBlock[P]>
  }


    
    
  export type BlockGroupByArgs = {
    where?: blockWhereInput
    orderBy?: Enumerable<blockOrderByInput>
    by: Array<BlockScalarFieldEnum>
    having?: blockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlockCountAggregateInputType | true
    _avg?: BlockAvgAggregateInputType
    _sum?: BlockSumAggregateInputType
    _min?: BlockMinAggregateInputType
    _max?: BlockMaxAggregateInputType
  }


  export type BlockGroupByOutputType = {
    number: bigint
    hash: string
    timestamp: Date
    total_transaction_count: number
    indexed_transaction_count: number
    _count: BlockCountAggregateOutputType | null
    _avg: BlockAvgAggregateOutputType | null
    _sum: BlockSumAggregateOutputType | null
    _min: BlockMinAggregateOutputType | null
    _max: BlockMaxAggregateOutputType | null
  }

  type GetBlockGroupByPayload<T extends BlockGroupByArgs> = Promise<
    Array<
      PickArray<BlockGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof BlockGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], BlockGroupByOutputType[P]> 
            : GetScalarType<T[P], BlockGroupByOutputType[P]>
        }
      > 
    >


  export type blockSelect = {
    number?: boolean
    hash?: boolean
    timestamp?: boolean
    total_transaction_count?: boolean
    indexed_transaction_count?: boolean
    transaction?: boolean | transactionFindManyArgs
  }

  export type blockInclude = {
    transaction?: boolean | transactionFindManyArgs
  }

  export type blockGetPayload<
    S extends boolean | null | undefined | blockArgs,
    U = keyof S
      > = S extends true
        ? block
    : S extends undefined
    ? never
    : S extends blockArgs | blockFindManyArgs
    ?'include' extends U
    ? block  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'transaction'
        ? Array < transactionGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof block ?block [P]
  : 
          P extends 'transaction'
        ? Array < transactionGetPayload<S['select'][P]>>  : never
  } 
    : block
  : block


  type blockCountArgs = Merge<
    Omit<blockFindManyArgs, 'select' | 'include'> & {
      select?: BlockCountAggregateInputType | true
    }
  >

  export interface blockDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Block that matches the filter.
     * @param {blockFindUniqueArgs} args - Arguments to find a Block
     * @example
     * // Get one Block
     * const block = await prisma.block.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends blockFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, blockFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'block'> extends True ? CheckSelect<T, Prisma__blockClient<block>, Prisma__blockClient<blockGetPayload<T>>> : CheckSelect<T, Prisma__blockClient<block | null >, Prisma__blockClient<blockGetPayload<T> | null >>

    /**
     * Find the first Block that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {blockFindFirstArgs} args - Arguments to find a Block
     * @example
     * // Get one Block
     * const block = await prisma.block.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends blockFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, blockFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'block'> extends True ? CheckSelect<T, Prisma__blockClient<block>, Prisma__blockClient<blockGetPayload<T>>> : CheckSelect<T, Prisma__blockClient<block | null >, Prisma__blockClient<blockGetPayload<T> | null >>

    /**
     * Find zero or more Blocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {blockFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Blocks
     * const blocks = await prisma.block.findMany()
     * 
     * // Get first 10 Blocks
     * const blocks = await prisma.block.findMany({ take: 10 })
     * 
     * // Only select the `number`
     * const blockWithNumberOnly = await prisma.block.findMany({ select: { number: true } })
     * 
    **/
    findMany<T extends blockFindManyArgs>(
      args?: SelectSubset<T, blockFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<block>>, PrismaPromise<Array<blockGetPayload<T>>>>

    /**
     * Create a Block.
     * @param {blockCreateArgs} args - Arguments to create a Block.
     * @example
     * // Create one Block
     * const Block = await prisma.block.create({
     *   data: {
     *     // ... data to create a Block
     *   }
     * })
     * 
    **/
    create<T extends blockCreateArgs>(
      args: SelectSubset<T, blockCreateArgs>
    ): CheckSelect<T, Prisma__blockClient<block>, Prisma__blockClient<blockGetPayload<T>>>

    /**
     * Create many Blocks.
     *     @param {blockCreateManyArgs} args - Arguments to create many Blocks.
     *     @example
     *     // Create many Blocks
     *     const block = await prisma.block.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends blockCreateManyArgs>(
      args?: SelectSubset<T, blockCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Block.
     * @param {blockDeleteArgs} args - Arguments to delete one Block.
     * @example
     * // Delete one Block
     * const Block = await prisma.block.delete({
     *   where: {
     *     // ... filter to delete one Block
     *   }
     * })
     * 
    **/
    delete<T extends blockDeleteArgs>(
      args: SelectSubset<T, blockDeleteArgs>
    ): CheckSelect<T, Prisma__blockClient<block>, Prisma__blockClient<blockGetPayload<T>>>

    /**
     * Update one Block.
     * @param {blockUpdateArgs} args - Arguments to update one Block.
     * @example
     * // Update one Block
     * const block = await prisma.block.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends blockUpdateArgs>(
      args: SelectSubset<T, blockUpdateArgs>
    ): CheckSelect<T, Prisma__blockClient<block>, Prisma__blockClient<blockGetPayload<T>>>

    /**
     * Delete zero or more Blocks.
     * @param {blockDeleteManyArgs} args - Arguments to filter Blocks to delete.
     * @example
     * // Delete a few Blocks
     * const { count } = await prisma.block.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends blockDeleteManyArgs>(
      args?: SelectSubset<T, blockDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Blocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {blockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Blocks
     * const block = await prisma.block.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends blockUpdateManyArgs>(
      args: SelectSubset<T, blockUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Block.
     * @param {blockUpsertArgs} args - Arguments to update or create a Block.
     * @example
     * // Update or create a Block
     * const block = await prisma.block.upsert({
     *   create: {
     *     // ... data to create a Block
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Block we want to update
     *   }
     * })
    **/
    upsert<T extends blockUpsertArgs>(
      args: SelectSubset<T, blockUpsertArgs>
    ): CheckSelect<T, Prisma__blockClient<block>, Prisma__blockClient<blockGetPayload<T>>>

    /**
     * Count the number of Blocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {blockCountArgs} args - Arguments to filter Blocks to count.
     * @example
     * // Count the number of Blocks
     * const count = await prisma.block.count({
     *   where: {
     *     // ... the filter for the Blocks we want to count
     *   }
     * })
    **/
    count<T extends blockCountArgs>(
      args?: Subset<T, blockCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Block.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BlockAggregateArgs>(args: Subset<T, BlockAggregateArgs>): PrismaPromise<GetBlockAggregateType<T>>

    /**
     * Group by Block.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockGroupByArgs} args - Group by arguments.
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
      T extends BlockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlockGroupByArgs['orderBy'] }
        : { orderBy?: BlockGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BlockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlockGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for block.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__blockClient<T> implements PrismaPromise<T> {
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

    transaction<T extends transactionFindManyArgs = {}>(args?: Subset<T, transactionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<transaction>>, PrismaPromise<Array<transactionGetPayload<T>>>>;

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
   * block findUnique
   */
  export type blockFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the block
     * 
    **/
    select?: blockSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: blockInclude | null
    /**
     * Throw an Error if a block can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which block to fetch.
     * 
    **/
    where: blockWhereUniqueInput
  }


  /**
   * block findFirst
   */
  export type blockFindFirstArgs = {
    /**
     * Select specific fields to fetch from the block
     * 
    **/
    select?: blockSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: blockInclude | null
    /**
     * Throw an Error if a block can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which block to fetch.
     * 
    **/
    where?: blockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of blocks to fetch.
     * 
    **/
    orderBy?: Enumerable<blockOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for blocks.
     * 
    **/
    cursor?: blockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` blocks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` blocks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of blocks.
     * 
    **/
    distinct?: Enumerable<BlockScalarFieldEnum>
  }


  /**
   * block findMany
   */
  export type blockFindManyArgs = {
    /**
     * Select specific fields to fetch from the block
     * 
    **/
    select?: blockSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: blockInclude | null
    /**
     * Filter, which blocks to fetch.
     * 
    **/
    where?: blockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of blocks to fetch.
     * 
    **/
    orderBy?: Enumerable<blockOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing blocks.
     * 
    **/
    cursor?: blockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` blocks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` blocks.
     * 
    **/
    skip?: number
    distinct?: Enumerable<BlockScalarFieldEnum>
  }


  /**
   * block create
   */
  export type blockCreateArgs = {
    /**
     * Select specific fields to fetch from the block
     * 
    **/
    select?: blockSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: blockInclude | null
    /**
     * The data needed to create a block.
     * 
    **/
    data: XOR<blockCreateInput, blockUncheckedCreateInput>
  }


  /**
   * block createMany
   */
  export type blockCreateManyArgs = {
    data: Enumerable<blockCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * block update
   */
  export type blockUpdateArgs = {
    /**
     * Select specific fields to fetch from the block
     * 
    **/
    select?: blockSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: blockInclude | null
    /**
     * The data needed to update a block.
     * 
    **/
    data: XOR<blockUpdateInput, blockUncheckedUpdateInput>
    /**
     * Choose, which block to update.
     * 
    **/
    where: blockWhereUniqueInput
  }


  /**
   * block updateMany
   */
  export type blockUpdateManyArgs = {
    data: XOR<blockUpdateManyMutationInput, blockUncheckedUpdateManyInput>
    where?: blockWhereInput
  }


  /**
   * block upsert
   */
  export type blockUpsertArgs = {
    /**
     * Select specific fields to fetch from the block
     * 
    **/
    select?: blockSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: blockInclude | null
    /**
     * The filter to search for the block to update in case it exists.
     * 
    **/
    where: blockWhereUniqueInput
    /**
     * In case the block found by the `where` argument doesn't exist, create a new block with this data.
     * 
    **/
    create: XOR<blockCreateInput, blockUncheckedCreateInput>
    /**
     * In case the block was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<blockUpdateInput, blockUncheckedUpdateInput>
  }


  /**
   * block delete
   */
  export type blockDeleteArgs = {
    /**
     * Select specific fields to fetch from the block
     * 
    **/
    select?: blockSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: blockInclude | null
    /**
     * Filter which block to delete.
     * 
    **/
    where: blockWhereUniqueInput
  }


  /**
   * block deleteMany
   */
  export type blockDeleteManyArgs = {
    where?: blockWhereInput
  }


  /**
   * block without action
   */
  export type blockArgs = {
    /**
     * Select specific fields to fetch from the block
     * 
    **/
    select?: blockSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: blockInclude | null
  }



  /**
   * Model crc_hub_transfer
   */


  export type AggregateCrc_hub_transfer = {
    _count: Crc_hub_transferCountAggregateOutputType | null
    count: Crc_hub_transferCountAggregateOutputType | null
    _avg: Crc_hub_transferAvgAggregateOutputType | null
    avg: Crc_hub_transferAvgAggregateOutputType | null
    _sum: Crc_hub_transferSumAggregateOutputType | null
    sum: Crc_hub_transferSumAggregateOutputType | null
    _min: Crc_hub_transferMinAggregateOutputType | null
    min: Crc_hub_transferMinAggregateOutputType | null
    _max: Crc_hub_transferMaxAggregateOutputType | null
    max: Crc_hub_transferMaxAggregateOutputType | null
  }

  export type Crc_hub_transferAvgAggregateOutputType = {
    id: number | null
    transaction_id: number | null
  }

  export type Crc_hub_transferSumAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
  }

  export type Crc_hub_transferMinAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
    from: string | null
    to: string | null
    value: string | null
  }

  export type Crc_hub_transferMaxAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
    from: string | null
    to: string | null
    value: string | null
  }

  export type Crc_hub_transferCountAggregateOutputType = {
    id: number
    transaction_id: number
    from: number
    to: number
    value: number
    _all: number
  }


  export type Crc_hub_transferAvgAggregateInputType = {
    id?: true
    transaction_id?: true
  }

  export type Crc_hub_transferSumAggregateInputType = {
    id?: true
    transaction_id?: true
  }

  export type Crc_hub_transferMinAggregateInputType = {
    id?: true
    transaction_id?: true
    from?: true
    to?: true
    value?: true
  }

  export type Crc_hub_transferMaxAggregateInputType = {
    id?: true
    transaction_id?: true
    from?: true
    to?: true
    value?: true
  }

  export type Crc_hub_transferCountAggregateInputType = {
    id?: true
    transaction_id?: true
    from?: true
    to?: true
    value?: true
    _all?: true
  }

  export type Crc_hub_transferAggregateArgs = {
    /**
     * Filter which crc_hub_transfer to aggregate.
     * 
    **/
    where?: crc_hub_transferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of crc_hub_transfers to fetch.
     * 
    **/
    orderBy?: Enumerable<crc_hub_transferOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: crc_hub_transferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` crc_hub_transfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` crc_hub_transfers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned crc_hub_transfers
    **/
    _count?: true | Crc_hub_transferCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | Crc_hub_transferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Crc_hub_transferAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: Crc_hub_transferAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Crc_hub_transferSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: Crc_hub_transferSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Crc_hub_transferMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: Crc_hub_transferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Crc_hub_transferMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: Crc_hub_transferMaxAggregateInputType
  }

  export type GetCrc_hub_transferAggregateType<T extends Crc_hub_transferAggregateArgs> = {
        [P in keyof T & keyof AggregateCrc_hub_transfer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCrc_hub_transfer[P]>
      : GetScalarType<T[P], AggregateCrc_hub_transfer[P]>
  }


    
    
  export type Crc_hub_transferGroupByArgs = {
    where?: crc_hub_transferWhereInput
    orderBy?: Enumerable<crc_hub_transferOrderByInput>
    by: Array<Crc_hub_transferScalarFieldEnum>
    having?: crc_hub_transferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Crc_hub_transferCountAggregateInputType | true
    _avg?: Crc_hub_transferAvgAggregateInputType
    _sum?: Crc_hub_transferSumAggregateInputType
    _min?: Crc_hub_transferMinAggregateInputType
    _max?: Crc_hub_transferMaxAggregateInputType
  }


  export type Crc_hub_transferGroupByOutputType = {
    id: bigint
    transaction_id: bigint
    from: string
    to: string
    value: string
    _count: Crc_hub_transferCountAggregateOutputType | null
    _avg: Crc_hub_transferAvgAggregateOutputType | null
    _sum: Crc_hub_transferSumAggregateOutputType | null
    _min: Crc_hub_transferMinAggregateOutputType | null
    _max: Crc_hub_transferMaxAggregateOutputType | null
  }

  type GetCrc_hub_transferGroupByPayload<T extends Crc_hub_transferGroupByArgs> = Promise<
    Array<
      PickArray<Crc_hub_transferGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof Crc_hub_transferGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], Crc_hub_transferGroupByOutputType[P]> 
            : GetScalarType<T[P], Crc_hub_transferGroupByOutputType[P]>
        }
      > 
    >


  export type crc_hub_transferSelect = {
    id?: boolean
    transaction_id?: boolean
    from?: boolean
    to?: boolean
    value?: boolean
    transaction?: boolean | transactionArgs
  }

  export type crc_hub_transferInclude = {
    transaction?: boolean | transactionArgs
  }

  export type crc_hub_transferGetPayload<
    S extends boolean | null | undefined | crc_hub_transferArgs,
    U = keyof S
      > = S extends true
        ? crc_hub_transfer
    : S extends undefined
    ? never
    : S extends crc_hub_transferArgs | crc_hub_transferFindManyArgs
    ?'include' extends U
    ? crc_hub_transfer  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'transaction'
        ? transactionGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof crc_hub_transfer ?crc_hub_transfer [P]
  : 
          P extends 'transaction'
        ? transactionGetPayload<S['select'][P]> : never
  } 
    : crc_hub_transfer
  : crc_hub_transfer


  type crc_hub_transferCountArgs = Merge<
    Omit<crc_hub_transferFindManyArgs, 'select' | 'include'> & {
      select?: Crc_hub_transferCountAggregateInputType | true
    }
  >

  export interface crc_hub_transferDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Crc_hub_transfer that matches the filter.
     * @param {crc_hub_transferFindUniqueArgs} args - Arguments to find a Crc_hub_transfer
     * @example
     * // Get one Crc_hub_transfer
     * const crc_hub_transfer = await prisma.crc_hub_transfer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends crc_hub_transferFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, crc_hub_transferFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'crc_hub_transfer'> extends True ? CheckSelect<T, Prisma__crc_hub_transferClient<crc_hub_transfer>, Prisma__crc_hub_transferClient<crc_hub_transferGetPayload<T>>> : CheckSelect<T, Prisma__crc_hub_transferClient<crc_hub_transfer | null >, Prisma__crc_hub_transferClient<crc_hub_transferGetPayload<T> | null >>

    /**
     * Find the first Crc_hub_transfer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crc_hub_transferFindFirstArgs} args - Arguments to find a Crc_hub_transfer
     * @example
     * // Get one Crc_hub_transfer
     * const crc_hub_transfer = await prisma.crc_hub_transfer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends crc_hub_transferFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, crc_hub_transferFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'crc_hub_transfer'> extends True ? CheckSelect<T, Prisma__crc_hub_transferClient<crc_hub_transfer>, Prisma__crc_hub_transferClient<crc_hub_transferGetPayload<T>>> : CheckSelect<T, Prisma__crc_hub_transferClient<crc_hub_transfer | null >, Prisma__crc_hub_transferClient<crc_hub_transferGetPayload<T> | null >>

    /**
     * Find zero or more Crc_hub_transfers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crc_hub_transferFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Crc_hub_transfers
     * const crc_hub_transfers = await prisma.crc_hub_transfer.findMany()
     * 
     * // Get first 10 Crc_hub_transfers
     * const crc_hub_transfers = await prisma.crc_hub_transfer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const crc_hub_transferWithIdOnly = await prisma.crc_hub_transfer.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends crc_hub_transferFindManyArgs>(
      args?: SelectSubset<T, crc_hub_transferFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<crc_hub_transfer>>, PrismaPromise<Array<crc_hub_transferGetPayload<T>>>>

    /**
     * Create a Crc_hub_transfer.
     * @param {crc_hub_transferCreateArgs} args - Arguments to create a Crc_hub_transfer.
     * @example
     * // Create one Crc_hub_transfer
     * const Crc_hub_transfer = await prisma.crc_hub_transfer.create({
     *   data: {
     *     // ... data to create a Crc_hub_transfer
     *   }
     * })
     * 
    **/
    create<T extends crc_hub_transferCreateArgs>(
      args: SelectSubset<T, crc_hub_transferCreateArgs>
    ): CheckSelect<T, Prisma__crc_hub_transferClient<crc_hub_transfer>, Prisma__crc_hub_transferClient<crc_hub_transferGetPayload<T>>>

    /**
     * Create many Crc_hub_transfers.
     *     @param {crc_hub_transferCreateManyArgs} args - Arguments to create many Crc_hub_transfers.
     *     @example
     *     // Create many Crc_hub_transfers
     *     const crc_hub_transfer = await prisma.crc_hub_transfer.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends crc_hub_transferCreateManyArgs>(
      args?: SelectSubset<T, crc_hub_transferCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Crc_hub_transfer.
     * @param {crc_hub_transferDeleteArgs} args - Arguments to delete one Crc_hub_transfer.
     * @example
     * // Delete one Crc_hub_transfer
     * const Crc_hub_transfer = await prisma.crc_hub_transfer.delete({
     *   where: {
     *     // ... filter to delete one Crc_hub_transfer
     *   }
     * })
     * 
    **/
    delete<T extends crc_hub_transferDeleteArgs>(
      args: SelectSubset<T, crc_hub_transferDeleteArgs>
    ): CheckSelect<T, Prisma__crc_hub_transferClient<crc_hub_transfer>, Prisma__crc_hub_transferClient<crc_hub_transferGetPayload<T>>>

    /**
     * Update one Crc_hub_transfer.
     * @param {crc_hub_transferUpdateArgs} args - Arguments to update one Crc_hub_transfer.
     * @example
     * // Update one Crc_hub_transfer
     * const crc_hub_transfer = await prisma.crc_hub_transfer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends crc_hub_transferUpdateArgs>(
      args: SelectSubset<T, crc_hub_transferUpdateArgs>
    ): CheckSelect<T, Prisma__crc_hub_transferClient<crc_hub_transfer>, Prisma__crc_hub_transferClient<crc_hub_transferGetPayload<T>>>

    /**
     * Delete zero or more Crc_hub_transfers.
     * @param {crc_hub_transferDeleteManyArgs} args - Arguments to filter Crc_hub_transfers to delete.
     * @example
     * // Delete a few Crc_hub_transfers
     * const { count } = await prisma.crc_hub_transfer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends crc_hub_transferDeleteManyArgs>(
      args?: SelectSubset<T, crc_hub_transferDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Crc_hub_transfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crc_hub_transferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Crc_hub_transfers
     * const crc_hub_transfer = await prisma.crc_hub_transfer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends crc_hub_transferUpdateManyArgs>(
      args: SelectSubset<T, crc_hub_transferUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Crc_hub_transfer.
     * @param {crc_hub_transferUpsertArgs} args - Arguments to update or create a Crc_hub_transfer.
     * @example
     * // Update or create a Crc_hub_transfer
     * const crc_hub_transfer = await prisma.crc_hub_transfer.upsert({
     *   create: {
     *     // ... data to create a Crc_hub_transfer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Crc_hub_transfer we want to update
     *   }
     * })
    **/
    upsert<T extends crc_hub_transferUpsertArgs>(
      args: SelectSubset<T, crc_hub_transferUpsertArgs>
    ): CheckSelect<T, Prisma__crc_hub_transferClient<crc_hub_transfer>, Prisma__crc_hub_transferClient<crc_hub_transferGetPayload<T>>>

    /**
     * Count the number of Crc_hub_transfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crc_hub_transferCountArgs} args - Arguments to filter Crc_hub_transfers to count.
     * @example
     * // Count the number of Crc_hub_transfers
     * const count = await prisma.crc_hub_transfer.count({
     *   where: {
     *     // ... the filter for the Crc_hub_transfers we want to count
     *   }
     * })
    **/
    count<T extends crc_hub_transferCountArgs>(
      args?: Subset<T, crc_hub_transferCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Crc_hub_transferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Crc_hub_transfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Crc_hub_transferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Crc_hub_transferAggregateArgs>(args: Subset<T, Crc_hub_transferAggregateArgs>): PrismaPromise<GetCrc_hub_transferAggregateType<T>>

    /**
     * Group by Crc_hub_transfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Crc_hub_transferGroupByArgs} args - Group by arguments.
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
      T extends Crc_hub_transferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Crc_hub_transferGroupByArgs['orderBy'] }
        : { orderBy?: Crc_hub_transferGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, Crc_hub_transferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCrc_hub_transferGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for crc_hub_transfer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__crc_hub_transferClient<T> implements PrismaPromise<T> {
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

    transaction<T extends transactionArgs = {}>(args?: Subset<T, transactionArgs>): CheckSelect<T, Prisma__transactionClient<transaction | null >, Prisma__transactionClient<transactionGetPayload<T> | null >>;

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
   * crc_hub_transfer findUnique
   */
  export type crc_hub_transferFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the crc_hub_transfer
     * 
    **/
    select?: crc_hub_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_hub_transferInclude | null
    /**
     * Throw an Error if a crc_hub_transfer can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which crc_hub_transfer to fetch.
     * 
    **/
    where: crc_hub_transferWhereUniqueInput
  }


  /**
   * crc_hub_transfer findFirst
   */
  export type crc_hub_transferFindFirstArgs = {
    /**
     * Select specific fields to fetch from the crc_hub_transfer
     * 
    **/
    select?: crc_hub_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_hub_transferInclude | null
    /**
     * Throw an Error if a crc_hub_transfer can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which crc_hub_transfer to fetch.
     * 
    **/
    where?: crc_hub_transferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of crc_hub_transfers to fetch.
     * 
    **/
    orderBy?: Enumerable<crc_hub_transferOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for crc_hub_transfers.
     * 
    **/
    cursor?: crc_hub_transferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` crc_hub_transfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` crc_hub_transfers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of crc_hub_transfers.
     * 
    **/
    distinct?: Enumerable<Crc_hub_transferScalarFieldEnum>
  }


  /**
   * crc_hub_transfer findMany
   */
  export type crc_hub_transferFindManyArgs = {
    /**
     * Select specific fields to fetch from the crc_hub_transfer
     * 
    **/
    select?: crc_hub_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_hub_transferInclude | null
    /**
     * Filter, which crc_hub_transfers to fetch.
     * 
    **/
    where?: crc_hub_transferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of crc_hub_transfers to fetch.
     * 
    **/
    orderBy?: Enumerable<crc_hub_transferOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing crc_hub_transfers.
     * 
    **/
    cursor?: crc_hub_transferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` crc_hub_transfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` crc_hub_transfers.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Crc_hub_transferScalarFieldEnum>
  }


  /**
   * crc_hub_transfer create
   */
  export type crc_hub_transferCreateArgs = {
    /**
     * Select specific fields to fetch from the crc_hub_transfer
     * 
    **/
    select?: crc_hub_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_hub_transferInclude | null
    /**
     * The data needed to create a crc_hub_transfer.
     * 
    **/
    data: XOR<crc_hub_transferCreateInput, crc_hub_transferUncheckedCreateInput>
  }


  /**
   * crc_hub_transfer createMany
   */
  export type crc_hub_transferCreateManyArgs = {
    data: Enumerable<crc_hub_transferCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * crc_hub_transfer update
   */
  export type crc_hub_transferUpdateArgs = {
    /**
     * Select specific fields to fetch from the crc_hub_transfer
     * 
    **/
    select?: crc_hub_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_hub_transferInclude | null
    /**
     * The data needed to update a crc_hub_transfer.
     * 
    **/
    data: XOR<crc_hub_transferUpdateInput, crc_hub_transferUncheckedUpdateInput>
    /**
     * Choose, which crc_hub_transfer to update.
     * 
    **/
    where: crc_hub_transferWhereUniqueInput
  }


  /**
   * crc_hub_transfer updateMany
   */
  export type crc_hub_transferUpdateManyArgs = {
    data: XOR<crc_hub_transferUpdateManyMutationInput, crc_hub_transferUncheckedUpdateManyInput>
    where?: crc_hub_transferWhereInput
  }


  /**
   * crc_hub_transfer upsert
   */
  export type crc_hub_transferUpsertArgs = {
    /**
     * Select specific fields to fetch from the crc_hub_transfer
     * 
    **/
    select?: crc_hub_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_hub_transferInclude | null
    /**
     * The filter to search for the crc_hub_transfer to update in case it exists.
     * 
    **/
    where: crc_hub_transferWhereUniqueInput
    /**
     * In case the crc_hub_transfer found by the `where` argument doesn't exist, create a new crc_hub_transfer with this data.
     * 
    **/
    create: XOR<crc_hub_transferCreateInput, crc_hub_transferUncheckedCreateInput>
    /**
     * In case the crc_hub_transfer was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<crc_hub_transferUpdateInput, crc_hub_transferUncheckedUpdateInput>
  }


  /**
   * crc_hub_transfer delete
   */
  export type crc_hub_transferDeleteArgs = {
    /**
     * Select specific fields to fetch from the crc_hub_transfer
     * 
    **/
    select?: crc_hub_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_hub_transferInclude | null
    /**
     * Filter which crc_hub_transfer to delete.
     * 
    **/
    where: crc_hub_transferWhereUniqueInput
  }


  /**
   * crc_hub_transfer deleteMany
   */
  export type crc_hub_transferDeleteManyArgs = {
    where?: crc_hub_transferWhereInput
  }


  /**
   * crc_hub_transfer without action
   */
  export type crc_hub_transferArgs = {
    /**
     * Select specific fields to fetch from the crc_hub_transfer
     * 
    **/
    select?: crc_hub_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_hub_transferInclude | null
  }



  /**
   * Model crc_organisation_signup
   */


  export type AggregateCrc_organisation_signup = {
    _count: Crc_organisation_signupCountAggregateOutputType | null
    count: Crc_organisation_signupCountAggregateOutputType | null
    _avg: Crc_organisation_signupAvgAggregateOutputType | null
    avg: Crc_organisation_signupAvgAggregateOutputType | null
    _sum: Crc_organisation_signupSumAggregateOutputType | null
    sum: Crc_organisation_signupSumAggregateOutputType | null
    _min: Crc_organisation_signupMinAggregateOutputType | null
    min: Crc_organisation_signupMinAggregateOutputType | null
    _max: Crc_organisation_signupMaxAggregateOutputType | null
    max: Crc_organisation_signupMaxAggregateOutputType | null
  }

  export type Crc_organisation_signupAvgAggregateOutputType = {
    id: number | null
    transaction_id: number | null
  }

  export type Crc_organisation_signupSumAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
  }

  export type Crc_organisation_signupMinAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
    organisation: string | null
  }

  export type Crc_organisation_signupMaxAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
    organisation: string | null
  }

  export type Crc_organisation_signupCountAggregateOutputType = {
    id: number
    transaction_id: number
    organisation: number
    _all: number
  }


  export type Crc_organisation_signupAvgAggregateInputType = {
    id?: true
    transaction_id?: true
  }

  export type Crc_organisation_signupSumAggregateInputType = {
    id?: true
    transaction_id?: true
  }

  export type Crc_organisation_signupMinAggregateInputType = {
    id?: true
    transaction_id?: true
    organisation?: true
  }

  export type Crc_organisation_signupMaxAggregateInputType = {
    id?: true
    transaction_id?: true
    organisation?: true
  }

  export type Crc_organisation_signupCountAggregateInputType = {
    id?: true
    transaction_id?: true
    organisation?: true
    _all?: true
  }

  export type Crc_organisation_signupAggregateArgs = {
    /**
     * Filter which crc_organisation_signup to aggregate.
     * 
    **/
    where?: crc_organisation_signupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of crc_organisation_signups to fetch.
     * 
    **/
    orderBy?: Enumerable<crc_organisation_signupOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: crc_organisation_signupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` crc_organisation_signups from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` crc_organisation_signups.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned crc_organisation_signups
    **/
    _count?: true | Crc_organisation_signupCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | Crc_organisation_signupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Crc_organisation_signupAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: Crc_organisation_signupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Crc_organisation_signupSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: Crc_organisation_signupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Crc_organisation_signupMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: Crc_organisation_signupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Crc_organisation_signupMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: Crc_organisation_signupMaxAggregateInputType
  }

  export type GetCrc_organisation_signupAggregateType<T extends Crc_organisation_signupAggregateArgs> = {
        [P in keyof T & keyof AggregateCrc_organisation_signup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCrc_organisation_signup[P]>
      : GetScalarType<T[P], AggregateCrc_organisation_signup[P]>
  }


    
    
  export type Crc_organisation_signupGroupByArgs = {
    where?: crc_organisation_signupWhereInput
    orderBy?: Enumerable<crc_organisation_signupOrderByInput>
    by: Array<Crc_organisation_signupScalarFieldEnum>
    having?: crc_organisation_signupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Crc_organisation_signupCountAggregateInputType | true
    _avg?: Crc_organisation_signupAvgAggregateInputType
    _sum?: Crc_organisation_signupSumAggregateInputType
    _min?: Crc_organisation_signupMinAggregateInputType
    _max?: Crc_organisation_signupMaxAggregateInputType
  }


  export type Crc_organisation_signupGroupByOutputType = {
    id: bigint
    transaction_id: bigint
    organisation: string
    _count: Crc_organisation_signupCountAggregateOutputType | null
    _avg: Crc_organisation_signupAvgAggregateOutputType | null
    _sum: Crc_organisation_signupSumAggregateOutputType | null
    _min: Crc_organisation_signupMinAggregateOutputType | null
    _max: Crc_organisation_signupMaxAggregateOutputType | null
  }

  type GetCrc_organisation_signupGroupByPayload<T extends Crc_organisation_signupGroupByArgs> = Promise<
    Array<
      PickArray<Crc_organisation_signupGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof Crc_organisation_signupGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], Crc_organisation_signupGroupByOutputType[P]> 
            : GetScalarType<T[P], Crc_organisation_signupGroupByOutputType[P]>
        }
      > 
    >


  export type crc_organisation_signupSelect = {
    id?: boolean
    transaction_id?: boolean
    organisation?: boolean
    transaction?: boolean | transactionArgs
  }

  export type crc_organisation_signupInclude = {
    transaction?: boolean | transactionArgs
  }

  export type crc_organisation_signupGetPayload<
    S extends boolean | null | undefined | crc_organisation_signupArgs,
    U = keyof S
      > = S extends true
        ? crc_organisation_signup
    : S extends undefined
    ? never
    : S extends crc_organisation_signupArgs | crc_organisation_signupFindManyArgs
    ?'include' extends U
    ? crc_organisation_signup  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'transaction'
        ? transactionGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof crc_organisation_signup ?crc_organisation_signup [P]
  : 
          P extends 'transaction'
        ? transactionGetPayload<S['select'][P]> : never
  } 
    : crc_organisation_signup
  : crc_organisation_signup


  type crc_organisation_signupCountArgs = Merge<
    Omit<crc_organisation_signupFindManyArgs, 'select' | 'include'> & {
      select?: Crc_organisation_signupCountAggregateInputType | true
    }
  >

  export interface crc_organisation_signupDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Crc_organisation_signup that matches the filter.
     * @param {crc_organisation_signupFindUniqueArgs} args - Arguments to find a Crc_organisation_signup
     * @example
     * // Get one Crc_organisation_signup
     * const crc_organisation_signup = await prisma.crc_organisation_signup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends crc_organisation_signupFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, crc_organisation_signupFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'crc_organisation_signup'> extends True ? CheckSelect<T, Prisma__crc_organisation_signupClient<crc_organisation_signup>, Prisma__crc_organisation_signupClient<crc_organisation_signupGetPayload<T>>> : CheckSelect<T, Prisma__crc_organisation_signupClient<crc_organisation_signup | null >, Prisma__crc_organisation_signupClient<crc_organisation_signupGetPayload<T> | null >>

    /**
     * Find the first Crc_organisation_signup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crc_organisation_signupFindFirstArgs} args - Arguments to find a Crc_organisation_signup
     * @example
     * // Get one Crc_organisation_signup
     * const crc_organisation_signup = await prisma.crc_organisation_signup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends crc_organisation_signupFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, crc_organisation_signupFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'crc_organisation_signup'> extends True ? CheckSelect<T, Prisma__crc_organisation_signupClient<crc_organisation_signup>, Prisma__crc_organisation_signupClient<crc_organisation_signupGetPayload<T>>> : CheckSelect<T, Prisma__crc_organisation_signupClient<crc_organisation_signup | null >, Prisma__crc_organisation_signupClient<crc_organisation_signupGetPayload<T> | null >>

    /**
     * Find zero or more Crc_organisation_signups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crc_organisation_signupFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Crc_organisation_signups
     * const crc_organisation_signups = await prisma.crc_organisation_signup.findMany()
     * 
     * // Get first 10 Crc_organisation_signups
     * const crc_organisation_signups = await prisma.crc_organisation_signup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const crc_organisation_signupWithIdOnly = await prisma.crc_organisation_signup.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends crc_organisation_signupFindManyArgs>(
      args?: SelectSubset<T, crc_organisation_signupFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<crc_organisation_signup>>, PrismaPromise<Array<crc_organisation_signupGetPayload<T>>>>

    /**
     * Create a Crc_organisation_signup.
     * @param {crc_organisation_signupCreateArgs} args - Arguments to create a Crc_organisation_signup.
     * @example
     * // Create one Crc_organisation_signup
     * const Crc_organisation_signup = await prisma.crc_organisation_signup.create({
     *   data: {
     *     // ... data to create a Crc_organisation_signup
     *   }
     * })
     * 
    **/
    create<T extends crc_organisation_signupCreateArgs>(
      args: SelectSubset<T, crc_organisation_signupCreateArgs>
    ): CheckSelect<T, Prisma__crc_organisation_signupClient<crc_organisation_signup>, Prisma__crc_organisation_signupClient<crc_organisation_signupGetPayload<T>>>

    /**
     * Create many Crc_organisation_signups.
     *     @param {crc_organisation_signupCreateManyArgs} args - Arguments to create many Crc_organisation_signups.
     *     @example
     *     // Create many Crc_organisation_signups
     *     const crc_organisation_signup = await prisma.crc_organisation_signup.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends crc_organisation_signupCreateManyArgs>(
      args?: SelectSubset<T, crc_organisation_signupCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Crc_organisation_signup.
     * @param {crc_organisation_signupDeleteArgs} args - Arguments to delete one Crc_organisation_signup.
     * @example
     * // Delete one Crc_organisation_signup
     * const Crc_organisation_signup = await prisma.crc_organisation_signup.delete({
     *   where: {
     *     // ... filter to delete one Crc_organisation_signup
     *   }
     * })
     * 
    **/
    delete<T extends crc_organisation_signupDeleteArgs>(
      args: SelectSubset<T, crc_organisation_signupDeleteArgs>
    ): CheckSelect<T, Prisma__crc_organisation_signupClient<crc_organisation_signup>, Prisma__crc_organisation_signupClient<crc_organisation_signupGetPayload<T>>>

    /**
     * Update one Crc_organisation_signup.
     * @param {crc_organisation_signupUpdateArgs} args - Arguments to update one Crc_organisation_signup.
     * @example
     * // Update one Crc_organisation_signup
     * const crc_organisation_signup = await prisma.crc_organisation_signup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends crc_organisation_signupUpdateArgs>(
      args: SelectSubset<T, crc_organisation_signupUpdateArgs>
    ): CheckSelect<T, Prisma__crc_organisation_signupClient<crc_organisation_signup>, Prisma__crc_organisation_signupClient<crc_organisation_signupGetPayload<T>>>

    /**
     * Delete zero or more Crc_organisation_signups.
     * @param {crc_organisation_signupDeleteManyArgs} args - Arguments to filter Crc_organisation_signups to delete.
     * @example
     * // Delete a few Crc_organisation_signups
     * const { count } = await prisma.crc_organisation_signup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends crc_organisation_signupDeleteManyArgs>(
      args?: SelectSubset<T, crc_organisation_signupDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Crc_organisation_signups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crc_organisation_signupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Crc_organisation_signups
     * const crc_organisation_signup = await prisma.crc_organisation_signup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends crc_organisation_signupUpdateManyArgs>(
      args: SelectSubset<T, crc_organisation_signupUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Crc_organisation_signup.
     * @param {crc_organisation_signupUpsertArgs} args - Arguments to update or create a Crc_organisation_signup.
     * @example
     * // Update or create a Crc_organisation_signup
     * const crc_organisation_signup = await prisma.crc_organisation_signup.upsert({
     *   create: {
     *     // ... data to create a Crc_organisation_signup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Crc_organisation_signup we want to update
     *   }
     * })
    **/
    upsert<T extends crc_organisation_signupUpsertArgs>(
      args: SelectSubset<T, crc_organisation_signupUpsertArgs>
    ): CheckSelect<T, Prisma__crc_organisation_signupClient<crc_organisation_signup>, Prisma__crc_organisation_signupClient<crc_organisation_signupGetPayload<T>>>

    /**
     * Count the number of Crc_organisation_signups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crc_organisation_signupCountArgs} args - Arguments to filter Crc_organisation_signups to count.
     * @example
     * // Count the number of Crc_organisation_signups
     * const count = await prisma.crc_organisation_signup.count({
     *   where: {
     *     // ... the filter for the Crc_organisation_signups we want to count
     *   }
     * })
    **/
    count<T extends crc_organisation_signupCountArgs>(
      args?: Subset<T, crc_organisation_signupCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Crc_organisation_signupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Crc_organisation_signup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Crc_organisation_signupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Crc_organisation_signupAggregateArgs>(args: Subset<T, Crc_organisation_signupAggregateArgs>): PrismaPromise<GetCrc_organisation_signupAggregateType<T>>

    /**
     * Group by Crc_organisation_signup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Crc_organisation_signupGroupByArgs} args - Group by arguments.
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
      T extends Crc_organisation_signupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Crc_organisation_signupGroupByArgs['orderBy'] }
        : { orderBy?: Crc_organisation_signupGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, Crc_organisation_signupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCrc_organisation_signupGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for crc_organisation_signup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__crc_organisation_signupClient<T> implements PrismaPromise<T> {
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

    transaction<T extends transactionArgs = {}>(args?: Subset<T, transactionArgs>): CheckSelect<T, Prisma__transactionClient<transaction | null >, Prisma__transactionClient<transactionGetPayload<T> | null >>;

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
   * crc_organisation_signup findUnique
   */
  export type crc_organisation_signupFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the crc_organisation_signup
     * 
    **/
    select?: crc_organisation_signupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_organisation_signupInclude | null
    /**
     * Throw an Error if a crc_organisation_signup can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which crc_organisation_signup to fetch.
     * 
    **/
    where: crc_organisation_signupWhereUniqueInput
  }


  /**
   * crc_organisation_signup findFirst
   */
  export type crc_organisation_signupFindFirstArgs = {
    /**
     * Select specific fields to fetch from the crc_organisation_signup
     * 
    **/
    select?: crc_organisation_signupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_organisation_signupInclude | null
    /**
     * Throw an Error if a crc_organisation_signup can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which crc_organisation_signup to fetch.
     * 
    **/
    where?: crc_organisation_signupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of crc_organisation_signups to fetch.
     * 
    **/
    orderBy?: Enumerable<crc_organisation_signupOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for crc_organisation_signups.
     * 
    **/
    cursor?: crc_organisation_signupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` crc_organisation_signups from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` crc_organisation_signups.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of crc_organisation_signups.
     * 
    **/
    distinct?: Enumerable<Crc_organisation_signupScalarFieldEnum>
  }


  /**
   * crc_organisation_signup findMany
   */
  export type crc_organisation_signupFindManyArgs = {
    /**
     * Select specific fields to fetch from the crc_organisation_signup
     * 
    **/
    select?: crc_organisation_signupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_organisation_signupInclude | null
    /**
     * Filter, which crc_organisation_signups to fetch.
     * 
    **/
    where?: crc_organisation_signupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of crc_organisation_signups to fetch.
     * 
    **/
    orderBy?: Enumerable<crc_organisation_signupOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing crc_organisation_signups.
     * 
    **/
    cursor?: crc_organisation_signupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` crc_organisation_signups from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` crc_organisation_signups.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Crc_organisation_signupScalarFieldEnum>
  }


  /**
   * crc_organisation_signup create
   */
  export type crc_organisation_signupCreateArgs = {
    /**
     * Select specific fields to fetch from the crc_organisation_signup
     * 
    **/
    select?: crc_organisation_signupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_organisation_signupInclude | null
    /**
     * The data needed to create a crc_organisation_signup.
     * 
    **/
    data: XOR<crc_organisation_signupCreateInput, crc_organisation_signupUncheckedCreateInput>
  }


  /**
   * crc_organisation_signup createMany
   */
  export type crc_organisation_signupCreateManyArgs = {
    data: Enumerable<crc_organisation_signupCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * crc_organisation_signup update
   */
  export type crc_organisation_signupUpdateArgs = {
    /**
     * Select specific fields to fetch from the crc_organisation_signup
     * 
    **/
    select?: crc_organisation_signupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_organisation_signupInclude | null
    /**
     * The data needed to update a crc_organisation_signup.
     * 
    **/
    data: XOR<crc_organisation_signupUpdateInput, crc_organisation_signupUncheckedUpdateInput>
    /**
     * Choose, which crc_organisation_signup to update.
     * 
    **/
    where: crc_organisation_signupWhereUniqueInput
  }


  /**
   * crc_organisation_signup updateMany
   */
  export type crc_organisation_signupUpdateManyArgs = {
    data: XOR<crc_organisation_signupUpdateManyMutationInput, crc_organisation_signupUncheckedUpdateManyInput>
    where?: crc_organisation_signupWhereInput
  }


  /**
   * crc_organisation_signup upsert
   */
  export type crc_organisation_signupUpsertArgs = {
    /**
     * Select specific fields to fetch from the crc_organisation_signup
     * 
    **/
    select?: crc_organisation_signupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_organisation_signupInclude | null
    /**
     * The filter to search for the crc_organisation_signup to update in case it exists.
     * 
    **/
    where: crc_organisation_signupWhereUniqueInput
    /**
     * In case the crc_organisation_signup found by the `where` argument doesn't exist, create a new crc_organisation_signup with this data.
     * 
    **/
    create: XOR<crc_organisation_signupCreateInput, crc_organisation_signupUncheckedCreateInput>
    /**
     * In case the crc_organisation_signup was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<crc_organisation_signupUpdateInput, crc_organisation_signupUncheckedUpdateInput>
  }


  /**
   * crc_organisation_signup delete
   */
  export type crc_organisation_signupDeleteArgs = {
    /**
     * Select specific fields to fetch from the crc_organisation_signup
     * 
    **/
    select?: crc_organisation_signupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_organisation_signupInclude | null
    /**
     * Filter which crc_organisation_signup to delete.
     * 
    **/
    where: crc_organisation_signupWhereUniqueInput
  }


  /**
   * crc_organisation_signup deleteMany
   */
  export type crc_organisation_signupDeleteManyArgs = {
    where?: crc_organisation_signupWhereInput
  }


  /**
   * crc_organisation_signup without action
   */
  export type crc_organisation_signupArgs = {
    /**
     * Select specific fields to fetch from the crc_organisation_signup
     * 
    **/
    select?: crc_organisation_signupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_organisation_signupInclude | null
  }



  /**
   * Model crc_signup
   */


  export type AggregateCrc_signup = {
    _count: Crc_signupCountAggregateOutputType | null
    count: Crc_signupCountAggregateOutputType | null
    _avg: Crc_signupAvgAggregateOutputType | null
    avg: Crc_signupAvgAggregateOutputType | null
    _sum: Crc_signupSumAggregateOutputType | null
    sum: Crc_signupSumAggregateOutputType | null
    _min: Crc_signupMinAggregateOutputType | null
    min: Crc_signupMinAggregateOutputType | null
    _max: Crc_signupMaxAggregateOutputType | null
    max: Crc_signupMaxAggregateOutputType | null
  }

  export type Crc_signupAvgAggregateOutputType = {
    id: number | null
    transaction_id: number | null
  }

  export type Crc_signupSumAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
  }

  export type Crc_signupMinAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
    user: string | null
    token: string | null
  }

  export type Crc_signupMaxAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
    user: string | null
    token: string | null
  }

  export type Crc_signupCountAggregateOutputType = {
    id: number
    transaction_id: number
    user: number
    token: number
    _all: number
  }


  export type Crc_signupAvgAggregateInputType = {
    id?: true
    transaction_id?: true
  }

  export type Crc_signupSumAggregateInputType = {
    id?: true
    transaction_id?: true
  }

  export type Crc_signupMinAggregateInputType = {
    id?: true
    transaction_id?: true
    user?: true
    token?: true
  }

  export type Crc_signupMaxAggregateInputType = {
    id?: true
    transaction_id?: true
    user?: true
    token?: true
  }

  export type Crc_signupCountAggregateInputType = {
    id?: true
    transaction_id?: true
    user?: true
    token?: true
    _all?: true
  }

  export type Crc_signupAggregateArgs = {
    /**
     * Filter which crc_signup to aggregate.
     * 
    **/
    where?: crc_signupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of crc_signups to fetch.
     * 
    **/
    orderBy?: Enumerable<crc_signupOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: crc_signupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` crc_signups from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` crc_signups.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned crc_signups
    **/
    _count?: true | Crc_signupCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | Crc_signupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Crc_signupAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: Crc_signupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Crc_signupSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: Crc_signupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Crc_signupMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: Crc_signupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Crc_signupMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: Crc_signupMaxAggregateInputType
  }

  export type GetCrc_signupAggregateType<T extends Crc_signupAggregateArgs> = {
        [P in keyof T & keyof AggregateCrc_signup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCrc_signup[P]>
      : GetScalarType<T[P], AggregateCrc_signup[P]>
  }


    
    
  export type Crc_signupGroupByArgs = {
    where?: crc_signupWhereInput
    orderBy?: Enumerable<crc_signupOrderByInput>
    by: Array<Crc_signupScalarFieldEnum>
    having?: crc_signupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Crc_signupCountAggregateInputType | true
    _avg?: Crc_signupAvgAggregateInputType
    _sum?: Crc_signupSumAggregateInputType
    _min?: Crc_signupMinAggregateInputType
    _max?: Crc_signupMaxAggregateInputType
  }


  export type Crc_signupGroupByOutputType = {
    id: bigint
    transaction_id: bigint
    user: string
    token: string
    _count: Crc_signupCountAggregateOutputType | null
    _avg: Crc_signupAvgAggregateOutputType | null
    _sum: Crc_signupSumAggregateOutputType | null
    _min: Crc_signupMinAggregateOutputType | null
    _max: Crc_signupMaxAggregateOutputType | null
  }

  type GetCrc_signupGroupByPayload<T extends Crc_signupGroupByArgs> = Promise<
    Array<
      PickArray<Crc_signupGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof Crc_signupGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], Crc_signupGroupByOutputType[P]> 
            : GetScalarType<T[P], Crc_signupGroupByOutputType[P]>
        }
      > 
    >


  export type crc_signupSelect = {
    id?: boolean
    transaction_id?: boolean
    user?: boolean
    token?: boolean
    transaction?: boolean | transactionArgs
  }

  export type crc_signupInclude = {
    transaction?: boolean | transactionArgs
  }

  export type crc_signupGetPayload<
    S extends boolean | null | undefined | crc_signupArgs,
    U = keyof S
      > = S extends true
        ? crc_signup
    : S extends undefined
    ? never
    : S extends crc_signupArgs | crc_signupFindManyArgs
    ?'include' extends U
    ? crc_signup  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'transaction'
        ? transactionGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof crc_signup ?crc_signup [P]
  : 
          P extends 'transaction'
        ? transactionGetPayload<S['select'][P]> : never
  } 
    : crc_signup
  : crc_signup


  type crc_signupCountArgs = Merge<
    Omit<crc_signupFindManyArgs, 'select' | 'include'> & {
      select?: Crc_signupCountAggregateInputType | true
    }
  >

  export interface crc_signupDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Crc_signup that matches the filter.
     * @param {crc_signupFindUniqueArgs} args - Arguments to find a Crc_signup
     * @example
     * // Get one Crc_signup
     * const crc_signup = await prisma.crc_signup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends crc_signupFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, crc_signupFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'crc_signup'> extends True ? CheckSelect<T, Prisma__crc_signupClient<crc_signup>, Prisma__crc_signupClient<crc_signupGetPayload<T>>> : CheckSelect<T, Prisma__crc_signupClient<crc_signup | null >, Prisma__crc_signupClient<crc_signupGetPayload<T> | null >>

    /**
     * Find the first Crc_signup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crc_signupFindFirstArgs} args - Arguments to find a Crc_signup
     * @example
     * // Get one Crc_signup
     * const crc_signup = await prisma.crc_signup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends crc_signupFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, crc_signupFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'crc_signup'> extends True ? CheckSelect<T, Prisma__crc_signupClient<crc_signup>, Prisma__crc_signupClient<crc_signupGetPayload<T>>> : CheckSelect<T, Prisma__crc_signupClient<crc_signup | null >, Prisma__crc_signupClient<crc_signupGetPayload<T> | null >>

    /**
     * Find zero or more Crc_signups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crc_signupFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Crc_signups
     * const crc_signups = await prisma.crc_signup.findMany()
     * 
     * // Get first 10 Crc_signups
     * const crc_signups = await prisma.crc_signup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const crc_signupWithIdOnly = await prisma.crc_signup.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends crc_signupFindManyArgs>(
      args?: SelectSubset<T, crc_signupFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<crc_signup>>, PrismaPromise<Array<crc_signupGetPayload<T>>>>

    /**
     * Create a Crc_signup.
     * @param {crc_signupCreateArgs} args - Arguments to create a Crc_signup.
     * @example
     * // Create one Crc_signup
     * const Crc_signup = await prisma.crc_signup.create({
     *   data: {
     *     // ... data to create a Crc_signup
     *   }
     * })
     * 
    **/
    create<T extends crc_signupCreateArgs>(
      args: SelectSubset<T, crc_signupCreateArgs>
    ): CheckSelect<T, Prisma__crc_signupClient<crc_signup>, Prisma__crc_signupClient<crc_signupGetPayload<T>>>

    /**
     * Create many Crc_signups.
     *     @param {crc_signupCreateManyArgs} args - Arguments to create many Crc_signups.
     *     @example
     *     // Create many Crc_signups
     *     const crc_signup = await prisma.crc_signup.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends crc_signupCreateManyArgs>(
      args?: SelectSubset<T, crc_signupCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Crc_signup.
     * @param {crc_signupDeleteArgs} args - Arguments to delete one Crc_signup.
     * @example
     * // Delete one Crc_signup
     * const Crc_signup = await prisma.crc_signup.delete({
     *   where: {
     *     // ... filter to delete one Crc_signup
     *   }
     * })
     * 
    **/
    delete<T extends crc_signupDeleteArgs>(
      args: SelectSubset<T, crc_signupDeleteArgs>
    ): CheckSelect<T, Prisma__crc_signupClient<crc_signup>, Prisma__crc_signupClient<crc_signupGetPayload<T>>>

    /**
     * Update one Crc_signup.
     * @param {crc_signupUpdateArgs} args - Arguments to update one Crc_signup.
     * @example
     * // Update one Crc_signup
     * const crc_signup = await prisma.crc_signup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends crc_signupUpdateArgs>(
      args: SelectSubset<T, crc_signupUpdateArgs>
    ): CheckSelect<T, Prisma__crc_signupClient<crc_signup>, Prisma__crc_signupClient<crc_signupGetPayload<T>>>

    /**
     * Delete zero or more Crc_signups.
     * @param {crc_signupDeleteManyArgs} args - Arguments to filter Crc_signups to delete.
     * @example
     * // Delete a few Crc_signups
     * const { count } = await prisma.crc_signup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends crc_signupDeleteManyArgs>(
      args?: SelectSubset<T, crc_signupDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Crc_signups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crc_signupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Crc_signups
     * const crc_signup = await prisma.crc_signup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends crc_signupUpdateManyArgs>(
      args: SelectSubset<T, crc_signupUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Crc_signup.
     * @param {crc_signupUpsertArgs} args - Arguments to update or create a Crc_signup.
     * @example
     * // Update or create a Crc_signup
     * const crc_signup = await prisma.crc_signup.upsert({
     *   create: {
     *     // ... data to create a Crc_signup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Crc_signup we want to update
     *   }
     * })
    **/
    upsert<T extends crc_signupUpsertArgs>(
      args: SelectSubset<T, crc_signupUpsertArgs>
    ): CheckSelect<T, Prisma__crc_signupClient<crc_signup>, Prisma__crc_signupClient<crc_signupGetPayload<T>>>

    /**
     * Count the number of Crc_signups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crc_signupCountArgs} args - Arguments to filter Crc_signups to count.
     * @example
     * // Count the number of Crc_signups
     * const count = await prisma.crc_signup.count({
     *   where: {
     *     // ... the filter for the Crc_signups we want to count
     *   }
     * })
    **/
    count<T extends crc_signupCountArgs>(
      args?: Subset<T, crc_signupCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Crc_signupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Crc_signup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Crc_signupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Crc_signupAggregateArgs>(args: Subset<T, Crc_signupAggregateArgs>): PrismaPromise<GetCrc_signupAggregateType<T>>

    /**
     * Group by Crc_signup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Crc_signupGroupByArgs} args - Group by arguments.
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
      T extends Crc_signupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Crc_signupGroupByArgs['orderBy'] }
        : { orderBy?: Crc_signupGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, Crc_signupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCrc_signupGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for crc_signup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__crc_signupClient<T> implements PrismaPromise<T> {
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

    transaction<T extends transactionArgs = {}>(args?: Subset<T, transactionArgs>): CheckSelect<T, Prisma__transactionClient<transaction | null >, Prisma__transactionClient<transactionGetPayload<T> | null >>;

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
   * crc_signup findUnique
   */
  export type crc_signupFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the crc_signup
     * 
    **/
    select?: crc_signupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_signupInclude | null
    /**
     * Throw an Error if a crc_signup can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which crc_signup to fetch.
     * 
    **/
    where: crc_signupWhereUniqueInput
  }


  /**
   * crc_signup findFirst
   */
  export type crc_signupFindFirstArgs = {
    /**
     * Select specific fields to fetch from the crc_signup
     * 
    **/
    select?: crc_signupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_signupInclude | null
    /**
     * Throw an Error if a crc_signup can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which crc_signup to fetch.
     * 
    **/
    where?: crc_signupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of crc_signups to fetch.
     * 
    **/
    orderBy?: Enumerable<crc_signupOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for crc_signups.
     * 
    **/
    cursor?: crc_signupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` crc_signups from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` crc_signups.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of crc_signups.
     * 
    **/
    distinct?: Enumerable<Crc_signupScalarFieldEnum>
  }


  /**
   * crc_signup findMany
   */
  export type crc_signupFindManyArgs = {
    /**
     * Select specific fields to fetch from the crc_signup
     * 
    **/
    select?: crc_signupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_signupInclude | null
    /**
     * Filter, which crc_signups to fetch.
     * 
    **/
    where?: crc_signupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of crc_signups to fetch.
     * 
    **/
    orderBy?: Enumerable<crc_signupOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing crc_signups.
     * 
    **/
    cursor?: crc_signupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` crc_signups from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` crc_signups.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Crc_signupScalarFieldEnum>
  }


  /**
   * crc_signup create
   */
  export type crc_signupCreateArgs = {
    /**
     * Select specific fields to fetch from the crc_signup
     * 
    **/
    select?: crc_signupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_signupInclude | null
    /**
     * The data needed to create a crc_signup.
     * 
    **/
    data: XOR<crc_signupCreateInput, crc_signupUncheckedCreateInput>
  }


  /**
   * crc_signup createMany
   */
  export type crc_signupCreateManyArgs = {
    data: Enumerable<crc_signupCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * crc_signup update
   */
  export type crc_signupUpdateArgs = {
    /**
     * Select specific fields to fetch from the crc_signup
     * 
    **/
    select?: crc_signupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_signupInclude | null
    /**
     * The data needed to update a crc_signup.
     * 
    **/
    data: XOR<crc_signupUpdateInput, crc_signupUncheckedUpdateInput>
    /**
     * Choose, which crc_signup to update.
     * 
    **/
    where: crc_signupWhereUniqueInput
  }


  /**
   * crc_signup updateMany
   */
  export type crc_signupUpdateManyArgs = {
    data: XOR<crc_signupUpdateManyMutationInput, crc_signupUncheckedUpdateManyInput>
    where?: crc_signupWhereInput
  }


  /**
   * crc_signup upsert
   */
  export type crc_signupUpsertArgs = {
    /**
     * Select specific fields to fetch from the crc_signup
     * 
    **/
    select?: crc_signupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_signupInclude | null
    /**
     * The filter to search for the crc_signup to update in case it exists.
     * 
    **/
    where: crc_signupWhereUniqueInput
    /**
     * In case the crc_signup found by the `where` argument doesn't exist, create a new crc_signup with this data.
     * 
    **/
    create: XOR<crc_signupCreateInput, crc_signupUncheckedCreateInput>
    /**
     * In case the crc_signup was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<crc_signupUpdateInput, crc_signupUncheckedUpdateInput>
  }


  /**
   * crc_signup delete
   */
  export type crc_signupDeleteArgs = {
    /**
     * Select specific fields to fetch from the crc_signup
     * 
    **/
    select?: crc_signupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_signupInclude | null
    /**
     * Filter which crc_signup to delete.
     * 
    **/
    where: crc_signupWhereUniqueInput
  }


  /**
   * crc_signup deleteMany
   */
  export type crc_signupDeleteManyArgs = {
    where?: crc_signupWhereInput
  }


  /**
   * crc_signup without action
   */
  export type crc_signupArgs = {
    /**
     * Select specific fields to fetch from the crc_signup
     * 
    **/
    select?: crc_signupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_signupInclude | null
  }



  /**
   * Model crc_trust
   */


  export type AggregateCrc_trust = {
    _count: Crc_trustCountAggregateOutputType | null
    count: Crc_trustCountAggregateOutputType | null
    _avg: Crc_trustAvgAggregateOutputType | null
    avg: Crc_trustAvgAggregateOutputType | null
    _sum: Crc_trustSumAggregateOutputType | null
    sum: Crc_trustSumAggregateOutputType | null
    _min: Crc_trustMinAggregateOutputType | null
    min: Crc_trustMinAggregateOutputType | null
    _max: Crc_trustMaxAggregateOutputType | null
    max: Crc_trustMaxAggregateOutputType | null
  }

  export type Crc_trustAvgAggregateOutputType = {
    id: number | null
    transaction_id: number | null
    limit: number | null
  }

  export type Crc_trustSumAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
    limit: bigint | null
  }

  export type Crc_trustMinAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
    address: string | null
    can_send_to: string | null
    limit: bigint | null
  }

  export type Crc_trustMaxAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
    address: string | null
    can_send_to: string | null
    limit: bigint | null
  }

  export type Crc_trustCountAggregateOutputType = {
    id: number
    transaction_id: number
    address: number
    can_send_to: number
    limit: number
    _all: number
  }


  export type Crc_trustAvgAggregateInputType = {
    id?: true
    transaction_id?: true
    limit?: true
  }

  export type Crc_trustSumAggregateInputType = {
    id?: true
    transaction_id?: true
    limit?: true
  }

  export type Crc_trustMinAggregateInputType = {
    id?: true
    transaction_id?: true
    address?: true
    can_send_to?: true
    limit?: true
  }

  export type Crc_trustMaxAggregateInputType = {
    id?: true
    transaction_id?: true
    address?: true
    can_send_to?: true
    limit?: true
  }

  export type Crc_trustCountAggregateInputType = {
    id?: true
    transaction_id?: true
    address?: true
    can_send_to?: true
    limit?: true
    _all?: true
  }

  export type Crc_trustAggregateArgs = {
    /**
     * Filter which crc_trust to aggregate.
     * 
    **/
    where?: crc_trustWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of crc_trusts to fetch.
     * 
    **/
    orderBy?: Enumerable<crc_trustOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: crc_trustWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` crc_trusts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` crc_trusts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned crc_trusts
    **/
    _count?: true | Crc_trustCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | Crc_trustCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Crc_trustAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: Crc_trustAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Crc_trustSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: Crc_trustSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Crc_trustMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: Crc_trustMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Crc_trustMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: Crc_trustMaxAggregateInputType
  }

  export type GetCrc_trustAggregateType<T extends Crc_trustAggregateArgs> = {
        [P in keyof T & keyof AggregateCrc_trust]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCrc_trust[P]>
      : GetScalarType<T[P], AggregateCrc_trust[P]>
  }


    
    
  export type Crc_trustGroupByArgs = {
    where?: crc_trustWhereInput
    orderBy?: Enumerable<crc_trustOrderByInput>
    by: Array<Crc_trustScalarFieldEnum>
    having?: crc_trustScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Crc_trustCountAggregateInputType | true
    _avg?: Crc_trustAvgAggregateInputType
    _sum?: Crc_trustSumAggregateInputType
    _min?: Crc_trustMinAggregateInputType
    _max?: Crc_trustMaxAggregateInputType
  }


  export type Crc_trustGroupByOutputType = {
    id: bigint
    transaction_id: bigint
    address: string
    can_send_to: string
    limit: bigint
    _count: Crc_trustCountAggregateOutputType | null
    _avg: Crc_trustAvgAggregateOutputType | null
    _sum: Crc_trustSumAggregateOutputType | null
    _min: Crc_trustMinAggregateOutputType | null
    _max: Crc_trustMaxAggregateOutputType | null
  }

  type GetCrc_trustGroupByPayload<T extends Crc_trustGroupByArgs> = Promise<
    Array<
      PickArray<Crc_trustGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof Crc_trustGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], Crc_trustGroupByOutputType[P]> 
            : GetScalarType<T[P], Crc_trustGroupByOutputType[P]>
        }
      > 
    >


  export type crc_trustSelect = {
    id?: boolean
    transaction_id?: boolean
    address?: boolean
    can_send_to?: boolean
    limit?: boolean
    transaction?: boolean | transactionArgs
  }

  export type crc_trustInclude = {
    transaction?: boolean | transactionArgs
  }

  export type crc_trustGetPayload<
    S extends boolean | null | undefined | crc_trustArgs,
    U = keyof S
      > = S extends true
        ? crc_trust
    : S extends undefined
    ? never
    : S extends crc_trustArgs | crc_trustFindManyArgs
    ?'include' extends U
    ? crc_trust  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'transaction'
        ? transactionGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof crc_trust ?crc_trust [P]
  : 
          P extends 'transaction'
        ? transactionGetPayload<S['select'][P]> : never
  } 
    : crc_trust
  : crc_trust


  type crc_trustCountArgs = Merge<
    Omit<crc_trustFindManyArgs, 'select' | 'include'> & {
      select?: Crc_trustCountAggregateInputType | true
    }
  >

  export interface crc_trustDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Crc_trust that matches the filter.
     * @param {crc_trustFindUniqueArgs} args - Arguments to find a Crc_trust
     * @example
     * // Get one Crc_trust
     * const crc_trust = await prisma.crc_trust.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends crc_trustFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, crc_trustFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'crc_trust'> extends True ? CheckSelect<T, Prisma__crc_trustClient<crc_trust>, Prisma__crc_trustClient<crc_trustGetPayload<T>>> : CheckSelect<T, Prisma__crc_trustClient<crc_trust | null >, Prisma__crc_trustClient<crc_trustGetPayload<T> | null >>

    /**
     * Find the first Crc_trust that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crc_trustFindFirstArgs} args - Arguments to find a Crc_trust
     * @example
     * // Get one Crc_trust
     * const crc_trust = await prisma.crc_trust.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends crc_trustFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, crc_trustFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'crc_trust'> extends True ? CheckSelect<T, Prisma__crc_trustClient<crc_trust>, Prisma__crc_trustClient<crc_trustGetPayload<T>>> : CheckSelect<T, Prisma__crc_trustClient<crc_trust | null >, Prisma__crc_trustClient<crc_trustGetPayload<T> | null >>

    /**
     * Find zero or more Crc_trusts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crc_trustFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Crc_trusts
     * const crc_trusts = await prisma.crc_trust.findMany()
     * 
     * // Get first 10 Crc_trusts
     * const crc_trusts = await prisma.crc_trust.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const crc_trustWithIdOnly = await prisma.crc_trust.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends crc_trustFindManyArgs>(
      args?: SelectSubset<T, crc_trustFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<crc_trust>>, PrismaPromise<Array<crc_trustGetPayload<T>>>>

    /**
     * Create a Crc_trust.
     * @param {crc_trustCreateArgs} args - Arguments to create a Crc_trust.
     * @example
     * // Create one Crc_trust
     * const Crc_trust = await prisma.crc_trust.create({
     *   data: {
     *     // ... data to create a Crc_trust
     *   }
     * })
     * 
    **/
    create<T extends crc_trustCreateArgs>(
      args: SelectSubset<T, crc_trustCreateArgs>
    ): CheckSelect<T, Prisma__crc_trustClient<crc_trust>, Prisma__crc_trustClient<crc_trustGetPayload<T>>>

    /**
     * Create many Crc_trusts.
     *     @param {crc_trustCreateManyArgs} args - Arguments to create many Crc_trusts.
     *     @example
     *     // Create many Crc_trusts
     *     const crc_trust = await prisma.crc_trust.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends crc_trustCreateManyArgs>(
      args?: SelectSubset<T, crc_trustCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Crc_trust.
     * @param {crc_trustDeleteArgs} args - Arguments to delete one Crc_trust.
     * @example
     * // Delete one Crc_trust
     * const Crc_trust = await prisma.crc_trust.delete({
     *   where: {
     *     // ... filter to delete one Crc_trust
     *   }
     * })
     * 
    **/
    delete<T extends crc_trustDeleteArgs>(
      args: SelectSubset<T, crc_trustDeleteArgs>
    ): CheckSelect<T, Prisma__crc_trustClient<crc_trust>, Prisma__crc_trustClient<crc_trustGetPayload<T>>>

    /**
     * Update one Crc_trust.
     * @param {crc_trustUpdateArgs} args - Arguments to update one Crc_trust.
     * @example
     * // Update one Crc_trust
     * const crc_trust = await prisma.crc_trust.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends crc_trustUpdateArgs>(
      args: SelectSubset<T, crc_trustUpdateArgs>
    ): CheckSelect<T, Prisma__crc_trustClient<crc_trust>, Prisma__crc_trustClient<crc_trustGetPayload<T>>>

    /**
     * Delete zero or more Crc_trusts.
     * @param {crc_trustDeleteManyArgs} args - Arguments to filter Crc_trusts to delete.
     * @example
     * // Delete a few Crc_trusts
     * const { count } = await prisma.crc_trust.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends crc_trustDeleteManyArgs>(
      args?: SelectSubset<T, crc_trustDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Crc_trusts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crc_trustUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Crc_trusts
     * const crc_trust = await prisma.crc_trust.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends crc_trustUpdateManyArgs>(
      args: SelectSubset<T, crc_trustUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Crc_trust.
     * @param {crc_trustUpsertArgs} args - Arguments to update or create a Crc_trust.
     * @example
     * // Update or create a Crc_trust
     * const crc_trust = await prisma.crc_trust.upsert({
     *   create: {
     *     // ... data to create a Crc_trust
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Crc_trust we want to update
     *   }
     * })
    **/
    upsert<T extends crc_trustUpsertArgs>(
      args: SelectSubset<T, crc_trustUpsertArgs>
    ): CheckSelect<T, Prisma__crc_trustClient<crc_trust>, Prisma__crc_trustClient<crc_trustGetPayload<T>>>

    /**
     * Count the number of Crc_trusts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crc_trustCountArgs} args - Arguments to filter Crc_trusts to count.
     * @example
     * // Count the number of Crc_trusts
     * const count = await prisma.crc_trust.count({
     *   where: {
     *     // ... the filter for the Crc_trusts we want to count
     *   }
     * })
    **/
    count<T extends crc_trustCountArgs>(
      args?: Subset<T, crc_trustCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Crc_trustCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Crc_trust.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Crc_trustAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Crc_trustAggregateArgs>(args: Subset<T, Crc_trustAggregateArgs>): PrismaPromise<GetCrc_trustAggregateType<T>>

    /**
     * Group by Crc_trust.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Crc_trustGroupByArgs} args - Group by arguments.
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
      T extends Crc_trustGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Crc_trustGroupByArgs['orderBy'] }
        : { orderBy?: Crc_trustGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, Crc_trustGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCrc_trustGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for crc_trust.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__crc_trustClient<T> implements PrismaPromise<T> {
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

    transaction<T extends transactionArgs = {}>(args?: Subset<T, transactionArgs>): CheckSelect<T, Prisma__transactionClient<transaction | null >, Prisma__transactionClient<transactionGetPayload<T> | null >>;

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
   * crc_trust findUnique
   */
  export type crc_trustFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the crc_trust
     * 
    **/
    select?: crc_trustSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_trustInclude | null
    /**
     * Throw an Error if a crc_trust can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which crc_trust to fetch.
     * 
    **/
    where: crc_trustWhereUniqueInput
  }


  /**
   * crc_trust findFirst
   */
  export type crc_trustFindFirstArgs = {
    /**
     * Select specific fields to fetch from the crc_trust
     * 
    **/
    select?: crc_trustSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_trustInclude | null
    /**
     * Throw an Error if a crc_trust can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which crc_trust to fetch.
     * 
    **/
    where?: crc_trustWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of crc_trusts to fetch.
     * 
    **/
    orderBy?: Enumerable<crc_trustOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for crc_trusts.
     * 
    **/
    cursor?: crc_trustWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` crc_trusts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` crc_trusts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of crc_trusts.
     * 
    **/
    distinct?: Enumerable<Crc_trustScalarFieldEnum>
  }


  /**
   * crc_trust findMany
   */
  export type crc_trustFindManyArgs = {
    /**
     * Select specific fields to fetch from the crc_trust
     * 
    **/
    select?: crc_trustSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_trustInclude | null
    /**
     * Filter, which crc_trusts to fetch.
     * 
    **/
    where?: crc_trustWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of crc_trusts to fetch.
     * 
    **/
    orderBy?: Enumerable<crc_trustOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing crc_trusts.
     * 
    **/
    cursor?: crc_trustWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` crc_trusts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` crc_trusts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Crc_trustScalarFieldEnum>
  }


  /**
   * crc_trust create
   */
  export type crc_trustCreateArgs = {
    /**
     * Select specific fields to fetch from the crc_trust
     * 
    **/
    select?: crc_trustSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_trustInclude | null
    /**
     * The data needed to create a crc_trust.
     * 
    **/
    data: XOR<crc_trustCreateInput, crc_trustUncheckedCreateInput>
  }


  /**
   * crc_trust createMany
   */
  export type crc_trustCreateManyArgs = {
    data: Enumerable<crc_trustCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * crc_trust update
   */
  export type crc_trustUpdateArgs = {
    /**
     * Select specific fields to fetch from the crc_trust
     * 
    **/
    select?: crc_trustSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_trustInclude | null
    /**
     * The data needed to update a crc_trust.
     * 
    **/
    data: XOR<crc_trustUpdateInput, crc_trustUncheckedUpdateInput>
    /**
     * Choose, which crc_trust to update.
     * 
    **/
    where: crc_trustWhereUniqueInput
  }


  /**
   * crc_trust updateMany
   */
  export type crc_trustUpdateManyArgs = {
    data: XOR<crc_trustUpdateManyMutationInput, crc_trustUncheckedUpdateManyInput>
    where?: crc_trustWhereInput
  }


  /**
   * crc_trust upsert
   */
  export type crc_trustUpsertArgs = {
    /**
     * Select specific fields to fetch from the crc_trust
     * 
    **/
    select?: crc_trustSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_trustInclude | null
    /**
     * The filter to search for the crc_trust to update in case it exists.
     * 
    **/
    where: crc_trustWhereUniqueInput
    /**
     * In case the crc_trust found by the `where` argument doesn't exist, create a new crc_trust with this data.
     * 
    **/
    create: XOR<crc_trustCreateInput, crc_trustUncheckedCreateInput>
    /**
     * In case the crc_trust was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<crc_trustUpdateInput, crc_trustUncheckedUpdateInput>
  }


  /**
   * crc_trust delete
   */
  export type crc_trustDeleteArgs = {
    /**
     * Select specific fields to fetch from the crc_trust
     * 
    **/
    select?: crc_trustSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_trustInclude | null
    /**
     * Filter which crc_trust to delete.
     * 
    **/
    where: crc_trustWhereUniqueInput
  }


  /**
   * crc_trust deleteMany
   */
  export type crc_trustDeleteManyArgs = {
    where?: crc_trustWhereInput
  }


  /**
   * crc_trust without action
   */
  export type crc_trustArgs = {
    /**
     * Select specific fields to fetch from the crc_trust
     * 
    **/
    select?: crc_trustSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: crc_trustInclude | null
  }



  /**
   * Model erc20_transfer
   */


  export type AggregateErc20_transfer = {
    _count: Erc20_transferCountAggregateOutputType | null
    count: Erc20_transferCountAggregateOutputType | null
    _avg: Erc20_transferAvgAggregateOutputType | null
    avg: Erc20_transferAvgAggregateOutputType | null
    _sum: Erc20_transferSumAggregateOutputType | null
    sum: Erc20_transferSumAggregateOutputType | null
    _min: Erc20_transferMinAggregateOutputType | null
    min: Erc20_transferMinAggregateOutputType | null
    _max: Erc20_transferMaxAggregateOutputType | null
    max: Erc20_transferMaxAggregateOutputType | null
  }

  export type Erc20_transferAvgAggregateOutputType = {
    id: number | null
    transaction_id: number | null
  }

  export type Erc20_transferSumAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
  }

  export type Erc20_transferMinAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
    from: string | null
    to: string | null
    token: string | null
    value: string | null
  }

  export type Erc20_transferMaxAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
    from: string | null
    to: string | null
    token: string | null
    value: string | null
  }

  export type Erc20_transferCountAggregateOutputType = {
    id: number
    transaction_id: number
    from: number
    to: number
    token: number
    value: number
    _all: number
  }


  export type Erc20_transferAvgAggregateInputType = {
    id?: true
    transaction_id?: true
  }

  export type Erc20_transferSumAggregateInputType = {
    id?: true
    transaction_id?: true
  }

  export type Erc20_transferMinAggregateInputType = {
    id?: true
    transaction_id?: true
    from?: true
    to?: true
    token?: true
    value?: true
  }

  export type Erc20_transferMaxAggregateInputType = {
    id?: true
    transaction_id?: true
    from?: true
    to?: true
    token?: true
    value?: true
  }

  export type Erc20_transferCountAggregateInputType = {
    id?: true
    transaction_id?: true
    from?: true
    to?: true
    token?: true
    value?: true
    _all?: true
  }

  export type Erc20_transferAggregateArgs = {
    /**
     * Filter which erc20_transfer to aggregate.
     * 
    **/
    where?: erc20_transferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of erc20_transfers to fetch.
     * 
    **/
    orderBy?: Enumerable<erc20_transferOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: erc20_transferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` erc20_transfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` erc20_transfers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned erc20_transfers
    **/
    _count?: true | Erc20_transferCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | Erc20_transferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Erc20_transferAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: Erc20_transferAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Erc20_transferSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: Erc20_transferSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Erc20_transferMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: Erc20_transferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Erc20_transferMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: Erc20_transferMaxAggregateInputType
  }

  export type GetErc20_transferAggregateType<T extends Erc20_transferAggregateArgs> = {
        [P in keyof T & keyof AggregateErc20_transfer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateErc20_transfer[P]>
      : GetScalarType<T[P], AggregateErc20_transfer[P]>
  }


    
    
  export type Erc20_transferGroupByArgs = {
    where?: erc20_transferWhereInput
    orderBy?: Enumerable<erc20_transferOrderByInput>
    by: Array<Erc20_transferScalarFieldEnum>
    having?: erc20_transferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Erc20_transferCountAggregateInputType | true
    _avg?: Erc20_transferAvgAggregateInputType
    _sum?: Erc20_transferSumAggregateInputType
    _min?: Erc20_transferMinAggregateInputType
    _max?: Erc20_transferMaxAggregateInputType
  }


  export type Erc20_transferGroupByOutputType = {
    id: bigint
    transaction_id: bigint
    from: string
    to: string
    token: string
    value: string
    _count: Erc20_transferCountAggregateOutputType | null
    _avg: Erc20_transferAvgAggregateOutputType | null
    _sum: Erc20_transferSumAggregateOutputType | null
    _min: Erc20_transferMinAggregateOutputType | null
    _max: Erc20_transferMaxAggregateOutputType | null
  }

  type GetErc20_transferGroupByPayload<T extends Erc20_transferGroupByArgs> = Promise<
    Array<
      PickArray<Erc20_transferGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof Erc20_transferGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], Erc20_transferGroupByOutputType[P]> 
            : GetScalarType<T[P], Erc20_transferGroupByOutputType[P]>
        }
      > 
    >


  export type erc20_transferSelect = {
    id?: boolean
    transaction_id?: boolean
    from?: boolean
    to?: boolean
    token?: boolean
    value?: boolean
    transaction?: boolean | transactionArgs
  }

  export type erc20_transferInclude = {
    transaction?: boolean | transactionArgs
  }

  export type erc20_transferGetPayload<
    S extends boolean | null | undefined | erc20_transferArgs,
    U = keyof S
      > = S extends true
        ? erc20_transfer
    : S extends undefined
    ? never
    : S extends erc20_transferArgs | erc20_transferFindManyArgs
    ?'include' extends U
    ? erc20_transfer  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'transaction'
        ? transactionGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof erc20_transfer ?erc20_transfer [P]
  : 
          P extends 'transaction'
        ? transactionGetPayload<S['select'][P]> : never
  } 
    : erc20_transfer
  : erc20_transfer


  type erc20_transferCountArgs = Merge<
    Omit<erc20_transferFindManyArgs, 'select' | 'include'> & {
      select?: Erc20_transferCountAggregateInputType | true
    }
  >

  export interface erc20_transferDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Erc20_transfer that matches the filter.
     * @param {erc20_transferFindUniqueArgs} args - Arguments to find a Erc20_transfer
     * @example
     * // Get one Erc20_transfer
     * const erc20_transfer = await prisma.erc20_transfer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends erc20_transferFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, erc20_transferFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'erc20_transfer'> extends True ? CheckSelect<T, Prisma__erc20_transferClient<erc20_transfer>, Prisma__erc20_transferClient<erc20_transferGetPayload<T>>> : CheckSelect<T, Prisma__erc20_transferClient<erc20_transfer | null >, Prisma__erc20_transferClient<erc20_transferGetPayload<T> | null >>

    /**
     * Find the first Erc20_transfer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {erc20_transferFindFirstArgs} args - Arguments to find a Erc20_transfer
     * @example
     * // Get one Erc20_transfer
     * const erc20_transfer = await prisma.erc20_transfer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends erc20_transferFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, erc20_transferFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'erc20_transfer'> extends True ? CheckSelect<T, Prisma__erc20_transferClient<erc20_transfer>, Prisma__erc20_transferClient<erc20_transferGetPayload<T>>> : CheckSelect<T, Prisma__erc20_transferClient<erc20_transfer | null >, Prisma__erc20_transferClient<erc20_transferGetPayload<T> | null >>

    /**
     * Find zero or more Erc20_transfers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {erc20_transferFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Erc20_transfers
     * const erc20_transfers = await prisma.erc20_transfer.findMany()
     * 
     * // Get first 10 Erc20_transfers
     * const erc20_transfers = await prisma.erc20_transfer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const erc20_transferWithIdOnly = await prisma.erc20_transfer.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends erc20_transferFindManyArgs>(
      args?: SelectSubset<T, erc20_transferFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<erc20_transfer>>, PrismaPromise<Array<erc20_transferGetPayload<T>>>>

    /**
     * Create a Erc20_transfer.
     * @param {erc20_transferCreateArgs} args - Arguments to create a Erc20_transfer.
     * @example
     * // Create one Erc20_transfer
     * const Erc20_transfer = await prisma.erc20_transfer.create({
     *   data: {
     *     // ... data to create a Erc20_transfer
     *   }
     * })
     * 
    **/
    create<T extends erc20_transferCreateArgs>(
      args: SelectSubset<T, erc20_transferCreateArgs>
    ): CheckSelect<T, Prisma__erc20_transferClient<erc20_transfer>, Prisma__erc20_transferClient<erc20_transferGetPayload<T>>>

    /**
     * Create many Erc20_transfers.
     *     @param {erc20_transferCreateManyArgs} args - Arguments to create many Erc20_transfers.
     *     @example
     *     // Create many Erc20_transfers
     *     const erc20_transfer = await prisma.erc20_transfer.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends erc20_transferCreateManyArgs>(
      args?: SelectSubset<T, erc20_transferCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Erc20_transfer.
     * @param {erc20_transferDeleteArgs} args - Arguments to delete one Erc20_transfer.
     * @example
     * // Delete one Erc20_transfer
     * const Erc20_transfer = await prisma.erc20_transfer.delete({
     *   where: {
     *     // ... filter to delete one Erc20_transfer
     *   }
     * })
     * 
    **/
    delete<T extends erc20_transferDeleteArgs>(
      args: SelectSubset<T, erc20_transferDeleteArgs>
    ): CheckSelect<T, Prisma__erc20_transferClient<erc20_transfer>, Prisma__erc20_transferClient<erc20_transferGetPayload<T>>>

    /**
     * Update one Erc20_transfer.
     * @param {erc20_transferUpdateArgs} args - Arguments to update one Erc20_transfer.
     * @example
     * // Update one Erc20_transfer
     * const erc20_transfer = await prisma.erc20_transfer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends erc20_transferUpdateArgs>(
      args: SelectSubset<T, erc20_transferUpdateArgs>
    ): CheckSelect<T, Prisma__erc20_transferClient<erc20_transfer>, Prisma__erc20_transferClient<erc20_transferGetPayload<T>>>

    /**
     * Delete zero or more Erc20_transfers.
     * @param {erc20_transferDeleteManyArgs} args - Arguments to filter Erc20_transfers to delete.
     * @example
     * // Delete a few Erc20_transfers
     * const { count } = await prisma.erc20_transfer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends erc20_transferDeleteManyArgs>(
      args?: SelectSubset<T, erc20_transferDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Erc20_transfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {erc20_transferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Erc20_transfers
     * const erc20_transfer = await prisma.erc20_transfer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends erc20_transferUpdateManyArgs>(
      args: SelectSubset<T, erc20_transferUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Erc20_transfer.
     * @param {erc20_transferUpsertArgs} args - Arguments to update or create a Erc20_transfer.
     * @example
     * // Update or create a Erc20_transfer
     * const erc20_transfer = await prisma.erc20_transfer.upsert({
     *   create: {
     *     // ... data to create a Erc20_transfer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Erc20_transfer we want to update
     *   }
     * })
    **/
    upsert<T extends erc20_transferUpsertArgs>(
      args: SelectSubset<T, erc20_transferUpsertArgs>
    ): CheckSelect<T, Prisma__erc20_transferClient<erc20_transfer>, Prisma__erc20_transferClient<erc20_transferGetPayload<T>>>

    /**
     * Count the number of Erc20_transfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {erc20_transferCountArgs} args - Arguments to filter Erc20_transfers to count.
     * @example
     * // Count the number of Erc20_transfers
     * const count = await prisma.erc20_transfer.count({
     *   where: {
     *     // ... the filter for the Erc20_transfers we want to count
     *   }
     * })
    **/
    count<T extends erc20_transferCountArgs>(
      args?: Subset<T, erc20_transferCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Erc20_transferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Erc20_transfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Erc20_transferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Erc20_transferAggregateArgs>(args: Subset<T, Erc20_transferAggregateArgs>): PrismaPromise<GetErc20_transferAggregateType<T>>

    /**
     * Group by Erc20_transfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Erc20_transferGroupByArgs} args - Group by arguments.
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
      T extends Erc20_transferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Erc20_transferGroupByArgs['orderBy'] }
        : { orderBy?: Erc20_transferGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, Erc20_transferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetErc20_transferGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for erc20_transfer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__erc20_transferClient<T> implements PrismaPromise<T> {
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

    transaction<T extends transactionArgs = {}>(args?: Subset<T, transactionArgs>): CheckSelect<T, Prisma__transactionClient<transaction | null >, Prisma__transactionClient<transactionGetPayload<T> | null >>;

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
   * erc20_transfer findUnique
   */
  export type erc20_transferFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the erc20_transfer
     * 
    **/
    select?: erc20_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: erc20_transferInclude | null
    /**
     * Throw an Error if a erc20_transfer can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which erc20_transfer to fetch.
     * 
    **/
    where: erc20_transferWhereUniqueInput
  }


  /**
   * erc20_transfer findFirst
   */
  export type erc20_transferFindFirstArgs = {
    /**
     * Select specific fields to fetch from the erc20_transfer
     * 
    **/
    select?: erc20_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: erc20_transferInclude | null
    /**
     * Throw an Error if a erc20_transfer can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which erc20_transfer to fetch.
     * 
    **/
    where?: erc20_transferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of erc20_transfers to fetch.
     * 
    **/
    orderBy?: Enumerable<erc20_transferOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for erc20_transfers.
     * 
    **/
    cursor?: erc20_transferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` erc20_transfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` erc20_transfers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of erc20_transfers.
     * 
    **/
    distinct?: Enumerable<Erc20_transferScalarFieldEnum>
  }


  /**
   * erc20_transfer findMany
   */
  export type erc20_transferFindManyArgs = {
    /**
     * Select specific fields to fetch from the erc20_transfer
     * 
    **/
    select?: erc20_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: erc20_transferInclude | null
    /**
     * Filter, which erc20_transfers to fetch.
     * 
    **/
    where?: erc20_transferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of erc20_transfers to fetch.
     * 
    **/
    orderBy?: Enumerable<erc20_transferOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing erc20_transfers.
     * 
    **/
    cursor?: erc20_transferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` erc20_transfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` erc20_transfers.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Erc20_transferScalarFieldEnum>
  }


  /**
   * erc20_transfer create
   */
  export type erc20_transferCreateArgs = {
    /**
     * Select specific fields to fetch from the erc20_transfer
     * 
    **/
    select?: erc20_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: erc20_transferInclude | null
    /**
     * The data needed to create a erc20_transfer.
     * 
    **/
    data: XOR<erc20_transferCreateInput, erc20_transferUncheckedCreateInput>
  }


  /**
   * erc20_transfer createMany
   */
  export type erc20_transferCreateManyArgs = {
    data: Enumerable<erc20_transferCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * erc20_transfer update
   */
  export type erc20_transferUpdateArgs = {
    /**
     * Select specific fields to fetch from the erc20_transfer
     * 
    **/
    select?: erc20_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: erc20_transferInclude | null
    /**
     * The data needed to update a erc20_transfer.
     * 
    **/
    data: XOR<erc20_transferUpdateInput, erc20_transferUncheckedUpdateInput>
    /**
     * Choose, which erc20_transfer to update.
     * 
    **/
    where: erc20_transferWhereUniqueInput
  }


  /**
   * erc20_transfer updateMany
   */
  export type erc20_transferUpdateManyArgs = {
    data: XOR<erc20_transferUpdateManyMutationInput, erc20_transferUncheckedUpdateManyInput>
    where?: erc20_transferWhereInput
  }


  /**
   * erc20_transfer upsert
   */
  export type erc20_transferUpsertArgs = {
    /**
     * Select specific fields to fetch from the erc20_transfer
     * 
    **/
    select?: erc20_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: erc20_transferInclude | null
    /**
     * The filter to search for the erc20_transfer to update in case it exists.
     * 
    **/
    where: erc20_transferWhereUniqueInput
    /**
     * In case the erc20_transfer found by the `where` argument doesn't exist, create a new erc20_transfer with this data.
     * 
    **/
    create: XOR<erc20_transferCreateInput, erc20_transferUncheckedCreateInput>
    /**
     * In case the erc20_transfer was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<erc20_transferUpdateInput, erc20_transferUncheckedUpdateInput>
  }


  /**
   * erc20_transfer delete
   */
  export type erc20_transferDeleteArgs = {
    /**
     * Select specific fields to fetch from the erc20_transfer
     * 
    **/
    select?: erc20_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: erc20_transferInclude | null
    /**
     * Filter which erc20_transfer to delete.
     * 
    **/
    where: erc20_transferWhereUniqueInput
  }


  /**
   * erc20_transfer deleteMany
   */
  export type erc20_transferDeleteManyArgs = {
    where?: erc20_transferWhereInput
  }


  /**
   * erc20_transfer without action
   */
  export type erc20_transferArgs = {
    /**
     * Select specific fields to fetch from the erc20_transfer
     * 
    **/
    select?: erc20_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: erc20_transferInclude | null
  }



  /**
   * Model eth_transfer
   */


  export type AggregateEth_transfer = {
    _count: Eth_transferCountAggregateOutputType | null
    count: Eth_transferCountAggregateOutputType | null
    _avg: Eth_transferAvgAggregateOutputType | null
    avg: Eth_transferAvgAggregateOutputType | null
    _sum: Eth_transferSumAggregateOutputType | null
    sum: Eth_transferSumAggregateOutputType | null
    _min: Eth_transferMinAggregateOutputType | null
    min: Eth_transferMinAggregateOutputType | null
    _max: Eth_transferMaxAggregateOutputType | null
    max: Eth_transferMaxAggregateOutputType | null
  }

  export type Eth_transferAvgAggregateOutputType = {
    id: number | null
    transaction_id: number | null
  }

  export type Eth_transferSumAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
  }

  export type Eth_transferMinAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
    from: string | null
    to: string | null
    value: string | null
  }

  export type Eth_transferMaxAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
    from: string | null
    to: string | null
    value: string | null
  }

  export type Eth_transferCountAggregateOutputType = {
    id: number
    transaction_id: number
    from: number
    to: number
    value: number
    _all: number
  }


  export type Eth_transferAvgAggregateInputType = {
    id?: true
    transaction_id?: true
  }

  export type Eth_transferSumAggregateInputType = {
    id?: true
    transaction_id?: true
  }

  export type Eth_transferMinAggregateInputType = {
    id?: true
    transaction_id?: true
    from?: true
    to?: true
    value?: true
  }

  export type Eth_transferMaxAggregateInputType = {
    id?: true
    transaction_id?: true
    from?: true
    to?: true
    value?: true
  }

  export type Eth_transferCountAggregateInputType = {
    id?: true
    transaction_id?: true
    from?: true
    to?: true
    value?: true
    _all?: true
  }

  export type Eth_transferAggregateArgs = {
    /**
     * Filter which eth_transfer to aggregate.
     * 
    **/
    where?: eth_transferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of eth_transfers to fetch.
     * 
    **/
    orderBy?: Enumerable<eth_transferOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: eth_transferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` eth_transfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` eth_transfers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned eth_transfers
    **/
    _count?: true | Eth_transferCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | Eth_transferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Eth_transferAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: Eth_transferAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Eth_transferSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: Eth_transferSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Eth_transferMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: Eth_transferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Eth_transferMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: Eth_transferMaxAggregateInputType
  }

  export type GetEth_transferAggregateType<T extends Eth_transferAggregateArgs> = {
        [P in keyof T & keyof AggregateEth_transfer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEth_transfer[P]>
      : GetScalarType<T[P], AggregateEth_transfer[P]>
  }


    
    
  export type Eth_transferGroupByArgs = {
    where?: eth_transferWhereInput
    orderBy?: Enumerable<eth_transferOrderByInput>
    by: Array<Eth_transferScalarFieldEnum>
    having?: eth_transferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Eth_transferCountAggregateInputType | true
    _avg?: Eth_transferAvgAggregateInputType
    _sum?: Eth_transferSumAggregateInputType
    _min?: Eth_transferMinAggregateInputType
    _max?: Eth_transferMaxAggregateInputType
  }


  export type Eth_transferGroupByOutputType = {
    id: bigint
    transaction_id: bigint
    from: string
    to: string
    value: string
    _count: Eth_transferCountAggregateOutputType | null
    _avg: Eth_transferAvgAggregateOutputType | null
    _sum: Eth_transferSumAggregateOutputType | null
    _min: Eth_transferMinAggregateOutputType | null
    _max: Eth_transferMaxAggregateOutputType | null
  }

  type GetEth_transferGroupByPayload<T extends Eth_transferGroupByArgs> = Promise<
    Array<
      PickArray<Eth_transferGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof Eth_transferGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], Eth_transferGroupByOutputType[P]> 
            : GetScalarType<T[P], Eth_transferGroupByOutputType[P]>
        }
      > 
    >


  export type eth_transferSelect = {
    id?: boolean
    transaction_id?: boolean
    from?: boolean
    to?: boolean
    value?: boolean
    transaction?: boolean | transactionArgs
  }

  export type eth_transferInclude = {
    transaction?: boolean | transactionArgs
  }

  export type eth_transferGetPayload<
    S extends boolean | null | undefined | eth_transferArgs,
    U = keyof S
      > = S extends true
        ? eth_transfer
    : S extends undefined
    ? never
    : S extends eth_transferArgs | eth_transferFindManyArgs
    ?'include' extends U
    ? eth_transfer  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'transaction'
        ? transactionGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof eth_transfer ?eth_transfer [P]
  : 
          P extends 'transaction'
        ? transactionGetPayload<S['select'][P]> : never
  } 
    : eth_transfer
  : eth_transfer


  type eth_transferCountArgs = Merge<
    Omit<eth_transferFindManyArgs, 'select' | 'include'> & {
      select?: Eth_transferCountAggregateInputType | true
    }
  >

  export interface eth_transferDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Eth_transfer that matches the filter.
     * @param {eth_transferFindUniqueArgs} args - Arguments to find a Eth_transfer
     * @example
     * // Get one Eth_transfer
     * const eth_transfer = await prisma.eth_transfer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends eth_transferFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, eth_transferFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'eth_transfer'> extends True ? CheckSelect<T, Prisma__eth_transferClient<eth_transfer>, Prisma__eth_transferClient<eth_transferGetPayload<T>>> : CheckSelect<T, Prisma__eth_transferClient<eth_transfer | null >, Prisma__eth_transferClient<eth_transferGetPayload<T> | null >>

    /**
     * Find the first Eth_transfer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eth_transferFindFirstArgs} args - Arguments to find a Eth_transfer
     * @example
     * // Get one Eth_transfer
     * const eth_transfer = await prisma.eth_transfer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends eth_transferFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, eth_transferFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'eth_transfer'> extends True ? CheckSelect<T, Prisma__eth_transferClient<eth_transfer>, Prisma__eth_transferClient<eth_transferGetPayload<T>>> : CheckSelect<T, Prisma__eth_transferClient<eth_transfer | null >, Prisma__eth_transferClient<eth_transferGetPayload<T> | null >>

    /**
     * Find zero or more Eth_transfers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eth_transferFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Eth_transfers
     * const eth_transfers = await prisma.eth_transfer.findMany()
     * 
     * // Get first 10 Eth_transfers
     * const eth_transfers = await prisma.eth_transfer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eth_transferWithIdOnly = await prisma.eth_transfer.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends eth_transferFindManyArgs>(
      args?: SelectSubset<T, eth_transferFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<eth_transfer>>, PrismaPromise<Array<eth_transferGetPayload<T>>>>

    /**
     * Create a Eth_transfer.
     * @param {eth_transferCreateArgs} args - Arguments to create a Eth_transfer.
     * @example
     * // Create one Eth_transfer
     * const Eth_transfer = await prisma.eth_transfer.create({
     *   data: {
     *     // ... data to create a Eth_transfer
     *   }
     * })
     * 
    **/
    create<T extends eth_transferCreateArgs>(
      args: SelectSubset<T, eth_transferCreateArgs>
    ): CheckSelect<T, Prisma__eth_transferClient<eth_transfer>, Prisma__eth_transferClient<eth_transferGetPayload<T>>>

    /**
     * Create many Eth_transfers.
     *     @param {eth_transferCreateManyArgs} args - Arguments to create many Eth_transfers.
     *     @example
     *     // Create many Eth_transfers
     *     const eth_transfer = await prisma.eth_transfer.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends eth_transferCreateManyArgs>(
      args?: SelectSubset<T, eth_transferCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Eth_transfer.
     * @param {eth_transferDeleteArgs} args - Arguments to delete one Eth_transfer.
     * @example
     * // Delete one Eth_transfer
     * const Eth_transfer = await prisma.eth_transfer.delete({
     *   where: {
     *     // ... filter to delete one Eth_transfer
     *   }
     * })
     * 
    **/
    delete<T extends eth_transferDeleteArgs>(
      args: SelectSubset<T, eth_transferDeleteArgs>
    ): CheckSelect<T, Prisma__eth_transferClient<eth_transfer>, Prisma__eth_transferClient<eth_transferGetPayload<T>>>

    /**
     * Update one Eth_transfer.
     * @param {eth_transferUpdateArgs} args - Arguments to update one Eth_transfer.
     * @example
     * // Update one Eth_transfer
     * const eth_transfer = await prisma.eth_transfer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends eth_transferUpdateArgs>(
      args: SelectSubset<T, eth_transferUpdateArgs>
    ): CheckSelect<T, Prisma__eth_transferClient<eth_transfer>, Prisma__eth_transferClient<eth_transferGetPayload<T>>>

    /**
     * Delete zero or more Eth_transfers.
     * @param {eth_transferDeleteManyArgs} args - Arguments to filter Eth_transfers to delete.
     * @example
     * // Delete a few Eth_transfers
     * const { count } = await prisma.eth_transfer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends eth_transferDeleteManyArgs>(
      args?: SelectSubset<T, eth_transferDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Eth_transfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eth_transferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Eth_transfers
     * const eth_transfer = await prisma.eth_transfer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends eth_transferUpdateManyArgs>(
      args: SelectSubset<T, eth_transferUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Eth_transfer.
     * @param {eth_transferUpsertArgs} args - Arguments to update or create a Eth_transfer.
     * @example
     * // Update or create a Eth_transfer
     * const eth_transfer = await prisma.eth_transfer.upsert({
     *   create: {
     *     // ... data to create a Eth_transfer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Eth_transfer we want to update
     *   }
     * })
    **/
    upsert<T extends eth_transferUpsertArgs>(
      args: SelectSubset<T, eth_transferUpsertArgs>
    ): CheckSelect<T, Prisma__eth_transferClient<eth_transfer>, Prisma__eth_transferClient<eth_transferGetPayload<T>>>

    /**
     * Count the number of Eth_transfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eth_transferCountArgs} args - Arguments to filter Eth_transfers to count.
     * @example
     * // Count the number of Eth_transfers
     * const count = await prisma.eth_transfer.count({
     *   where: {
     *     // ... the filter for the Eth_transfers we want to count
     *   }
     * })
    **/
    count<T extends eth_transferCountArgs>(
      args?: Subset<T, eth_transferCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Eth_transferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Eth_transfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Eth_transferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Eth_transferAggregateArgs>(args: Subset<T, Eth_transferAggregateArgs>): PrismaPromise<GetEth_transferAggregateType<T>>

    /**
     * Group by Eth_transfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Eth_transferGroupByArgs} args - Group by arguments.
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
      T extends Eth_transferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Eth_transferGroupByArgs['orderBy'] }
        : { orderBy?: Eth_transferGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, Eth_transferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEth_transferGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for eth_transfer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__eth_transferClient<T> implements PrismaPromise<T> {
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

    transaction<T extends transactionArgs = {}>(args?: Subset<T, transactionArgs>): CheckSelect<T, Prisma__transactionClient<transaction | null >, Prisma__transactionClient<transactionGetPayload<T> | null >>;

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
   * eth_transfer findUnique
   */
  export type eth_transferFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the eth_transfer
     * 
    **/
    select?: eth_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: eth_transferInclude | null
    /**
     * Throw an Error if a eth_transfer can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which eth_transfer to fetch.
     * 
    **/
    where: eth_transferWhereUniqueInput
  }


  /**
   * eth_transfer findFirst
   */
  export type eth_transferFindFirstArgs = {
    /**
     * Select specific fields to fetch from the eth_transfer
     * 
    **/
    select?: eth_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: eth_transferInclude | null
    /**
     * Throw an Error if a eth_transfer can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which eth_transfer to fetch.
     * 
    **/
    where?: eth_transferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of eth_transfers to fetch.
     * 
    **/
    orderBy?: Enumerable<eth_transferOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for eth_transfers.
     * 
    **/
    cursor?: eth_transferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` eth_transfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` eth_transfers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of eth_transfers.
     * 
    **/
    distinct?: Enumerable<Eth_transferScalarFieldEnum>
  }


  /**
   * eth_transfer findMany
   */
  export type eth_transferFindManyArgs = {
    /**
     * Select specific fields to fetch from the eth_transfer
     * 
    **/
    select?: eth_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: eth_transferInclude | null
    /**
     * Filter, which eth_transfers to fetch.
     * 
    **/
    where?: eth_transferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of eth_transfers to fetch.
     * 
    **/
    orderBy?: Enumerable<eth_transferOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing eth_transfers.
     * 
    **/
    cursor?: eth_transferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` eth_transfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` eth_transfers.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Eth_transferScalarFieldEnum>
  }


  /**
   * eth_transfer create
   */
  export type eth_transferCreateArgs = {
    /**
     * Select specific fields to fetch from the eth_transfer
     * 
    **/
    select?: eth_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: eth_transferInclude | null
    /**
     * The data needed to create a eth_transfer.
     * 
    **/
    data: XOR<eth_transferCreateInput, eth_transferUncheckedCreateInput>
  }


  /**
   * eth_transfer createMany
   */
  export type eth_transferCreateManyArgs = {
    data: Enumerable<eth_transferCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * eth_transfer update
   */
  export type eth_transferUpdateArgs = {
    /**
     * Select specific fields to fetch from the eth_transfer
     * 
    **/
    select?: eth_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: eth_transferInclude | null
    /**
     * The data needed to update a eth_transfer.
     * 
    **/
    data: XOR<eth_transferUpdateInput, eth_transferUncheckedUpdateInput>
    /**
     * Choose, which eth_transfer to update.
     * 
    **/
    where: eth_transferWhereUniqueInput
  }


  /**
   * eth_transfer updateMany
   */
  export type eth_transferUpdateManyArgs = {
    data: XOR<eth_transferUpdateManyMutationInput, eth_transferUncheckedUpdateManyInput>
    where?: eth_transferWhereInput
  }


  /**
   * eth_transfer upsert
   */
  export type eth_transferUpsertArgs = {
    /**
     * Select specific fields to fetch from the eth_transfer
     * 
    **/
    select?: eth_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: eth_transferInclude | null
    /**
     * The filter to search for the eth_transfer to update in case it exists.
     * 
    **/
    where: eth_transferWhereUniqueInput
    /**
     * In case the eth_transfer found by the `where` argument doesn't exist, create a new eth_transfer with this data.
     * 
    **/
    create: XOR<eth_transferCreateInput, eth_transferUncheckedCreateInput>
    /**
     * In case the eth_transfer was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<eth_transferUpdateInput, eth_transferUncheckedUpdateInput>
  }


  /**
   * eth_transfer delete
   */
  export type eth_transferDeleteArgs = {
    /**
     * Select specific fields to fetch from the eth_transfer
     * 
    **/
    select?: eth_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: eth_transferInclude | null
    /**
     * Filter which eth_transfer to delete.
     * 
    **/
    where: eth_transferWhereUniqueInput
  }


  /**
   * eth_transfer deleteMany
   */
  export type eth_transferDeleteManyArgs = {
    where?: eth_transferWhereInput
  }


  /**
   * eth_transfer without action
   */
  export type eth_transferArgs = {
    /**
     * Select specific fields to fetch from the eth_transfer
     * 
    **/
    select?: eth_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: eth_transferInclude | null
  }



  /**
   * Model gnosis_safe_eth_transfer
   */


  export type AggregateGnosis_safe_eth_transfer = {
    _count: Gnosis_safe_eth_transferCountAggregateOutputType | null
    count: Gnosis_safe_eth_transferCountAggregateOutputType | null
    _avg: Gnosis_safe_eth_transferAvgAggregateOutputType | null
    avg: Gnosis_safe_eth_transferAvgAggregateOutputType | null
    _sum: Gnosis_safe_eth_transferSumAggregateOutputType | null
    sum: Gnosis_safe_eth_transferSumAggregateOutputType | null
    _min: Gnosis_safe_eth_transferMinAggregateOutputType | null
    min: Gnosis_safe_eth_transferMinAggregateOutputType | null
    _max: Gnosis_safe_eth_transferMaxAggregateOutputType | null
    max: Gnosis_safe_eth_transferMaxAggregateOutputType | null
  }

  export type Gnosis_safe_eth_transferAvgAggregateOutputType = {
    id: number | null
    transaction_id: number | null
  }

  export type Gnosis_safe_eth_transferSumAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
  }

  export type Gnosis_safe_eth_transferMinAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
    initiator: string | null
    from: string | null
    to: string | null
    value: string | null
  }

  export type Gnosis_safe_eth_transferMaxAggregateOutputType = {
    id: bigint | null
    transaction_id: bigint | null
    initiator: string | null
    from: string | null
    to: string | null
    value: string | null
  }

  export type Gnosis_safe_eth_transferCountAggregateOutputType = {
    id: number
    transaction_id: number
    initiator: number
    from: number
    to: number
    value: number
    _all: number
  }


  export type Gnosis_safe_eth_transferAvgAggregateInputType = {
    id?: true
    transaction_id?: true
  }

  export type Gnosis_safe_eth_transferSumAggregateInputType = {
    id?: true
    transaction_id?: true
  }

  export type Gnosis_safe_eth_transferMinAggregateInputType = {
    id?: true
    transaction_id?: true
    initiator?: true
    from?: true
    to?: true
    value?: true
  }

  export type Gnosis_safe_eth_transferMaxAggregateInputType = {
    id?: true
    transaction_id?: true
    initiator?: true
    from?: true
    to?: true
    value?: true
  }

  export type Gnosis_safe_eth_transferCountAggregateInputType = {
    id?: true
    transaction_id?: true
    initiator?: true
    from?: true
    to?: true
    value?: true
    _all?: true
  }

  export type Gnosis_safe_eth_transferAggregateArgs = {
    /**
     * Filter which gnosis_safe_eth_transfer to aggregate.
     * 
    **/
    where?: gnosis_safe_eth_transferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of gnosis_safe_eth_transfers to fetch.
     * 
    **/
    orderBy?: Enumerable<gnosis_safe_eth_transferOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: gnosis_safe_eth_transferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` gnosis_safe_eth_transfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` gnosis_safe_eth_transfers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned gnosis_safe_eth_transfers
    **/
    _count?: true | Gnosis_safe_eth_transferCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | Gnosis_safe_eth_transferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Gnosis_safe_eth_transferAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: Gnosis_safe_eth_transferAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Gnosis_safe_eth_transferSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: Gnosis_safe_eth_transferSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Gnosis_safe_eth_transferMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: Gnosis_safe_eth_transferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Gnosis_safe_eth_transferMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: Gnosis_safe_eth_transferMaxAggregateInputType
  }

  export type GetGnosis_safe_eth_transferAggregateType<T extends Gnosis_safe_eth_transferAggregateArgs> = {
        [P in keyof T & keyof AggregateGnosis_safe_eth_transfer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGnosis_safe_eth_transfer[P]>
      : GetScalarType<T[P], AggregateGnosis_safe_eth_transfer[P]>
  }


    
    
  export type Gnosis_safe_eth_transferGroupByArgs = {
    where?: gnosis_safe_eth_transferWhereInput
    orderBy?: Enumerable<gnosis_safe_eth_transferOrderByInput>
    by: Array<Gnosis_safe_eth_transferScalarFieldEnum>
    having?: gnosis_safe_eth_transferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Gnosis_safe_eth_transferCountAggregateInputType | true
    _avg?: Gnosis_safe_eth_transferAvgAggregateInputType
    _sum?: Gnosis_safe_eth_transferSumAggregateInputType
    _min?: Gnosis_safe_eth_transferMinAggregateInputType
    _max?: Gnosis_safe_eth_transferMaxAggregateInputType
  }


  export type Gnosis_safe_eth_transferGroupByOutputType = {
    id: bigint
    transaction_id: bigint
    initiator: string
    from: string
    to: string
    value: string
    _count: Gnosis_safe_eth_transferCountAggregateOutputType | null
    _avg: Gnosis_safe_eth_transferAvgAggregateOutputType | null
    _sum: Gnosis_safe_eth_transferSumAggregateOutputType | null
    _min: Gnosis_safe_eth_transferMinAggregateOutputType | null
    _max: Gnosis_safe_eth_transferMaxAggregateOutputType | null
  }

  type GetGnosis_safe_eth_transferGroupByPayload<T extends Gnosis_safe_eth_transferGroupByArgs> = Promise<
    Array<
      PickArray<Gnosis_safe_eth_transferGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof Gnosis_safe_eth_transferGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], Gnosis_safe_eth_transferGroupByOutputType[P]> 
            : GetScalarType<T[P], Gnosis_safe_eth_transferGroupByOutputType[P]>
        }
      > 
    >


  export type gnosis_safe_eth_transferSelect = {
    id?: boolean
    transaction_id?: boolean
    initiator?: boolean
    from?: boolean
    to?: boolean
    value?: boolean
    transaction?: boolean | transactionArgs
  }

  export type gnosis_safe_eth_transferInclude = {
    transaction?: boolean | transactionArgs
  }

  export type gnosis_safe_eth_transferGetPayload<
    S extends boolean | null | undefined | gnosis_safe_eth_transferArgs,
    U = keyof S
      > = S extends true
        ? gnosis_safe_eth_transfer
    : S extends undefined
    ? never
    : S extends gnosis_safe_eth_transferArgs | gnosis_safe_eth_transferFindManyArgs
    ?'include' extends U
    ? gnosis_safe_eth_transfer  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'transaction'
        ? transactionGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof gnosis_safe_eth_transfer ?gnosis_safe_eth_transfer [P]
  : 
          P extends 'transaction'
        ? transactionGetPayload<S['select'][P]> : never
  } 
    : gnosis_safe_eth_transfer
  : gnosis_safe_eth_transfer


  type gnosis_safe_eth_transferCountArgs = Merge<
    Omit<gnosis_safe_eth_transferFindManyArgs, 'select' | 'include'> & {
      select?: Gnosis_safe_eth_transferCountAggregateInputType | true
    }
  >

  export interface gnosis_safe_eth_transferDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Gnosis_safe_eth_transfer that matches the filter.
     * @param {gnosis_safe_eth_transferFindUniqueArgs} args - Arguments to find a Gnosis_safe_eth_transfer
     * @example
     * // Get one Gnosis_safe_eth_transfer
     * const gnosis_safe_eth_transfer = await prisma.gnosis_safe_eth_transfer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends gnosis_safe_eth_transferFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, gnosis_safe_eth_transferFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'gnosis_safe_eth_transfer'> extends True ? CheckSelect<T, Prisma__gnosis_safe_eth_transferClient<gnosis_safe_eth_transfer>, Prisma__gnosis_safe_eth_transferClient<gnosis_safe_eth_transferGetPayload<T>>> : CheckSelect<T, Prisma__gnosis_safe_eth_transferClient<gnosis_safe_eth_transfer | null >, Prisma__gnosis_safe_eth_transferClient<gnosis_safe_eth_transferGetPayload<T> | null >>

    /**
     * Find the first Gnosis_safe_eth_transfer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gnosis_safe_eth_transferFindFirstArgs} args - Arguments to find a Gnosis_safe_eth_transfer
     * @example
     * // Get one Gnosis_safe_eth_transfer
     * const gnosis_safe_eth_transfer = await prisma.gnosis_safe_eth_transfer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends gnosis_safe_eth_transferFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, gnosis_safe_eth_transferFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'gnosis_safe_eth_transfer'> extends True ? CheckSelect<T, Prisma__gnosis_safe_eth_transferClient<gnosis_safe_eth_transfer>, Prisma__gnosis_safe_eth_transferClient<gnosis_safe_eth_transferGetPayload<T>>> : CheckSelect<T, Prisma__gnosis_safe_eth_transferClient<gnosis_safe_eth_transfer | null >, Prisma__gnosis_safe_eth_transferClient<gnosis_safe_eth_transferGetPayload<T> | null >>

    /**
     * Find zero or more Gnosis_safe_eth_transfers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gnosis_safe_eth_transferFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Gnosis_safe_eth_transfers
     * const gnosis_safe_eth_transfers = await prisma.gnosis_safe_eth_transfer.findMany()
     * 
     * // Get first 10 Gnosis_safe_eth_transfers
     * const gnosis_safe_eth_transfers = await prisma.gnosis_safe_eth_transfer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gnosis_safe_eth_transferWithIdOnly = await prisma.gnosis_safe_eth_transfer.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends gnosis_safe_eth_transferFindManyArgs>(
      args?: SelectSubset<T, gnosis_safe_eth_transferFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<gnosis_safe_eth_transfer>>, PrismaPromise<Array<gnosis_safe_eth_transferGetPayload<T>>>>

    /**
     * Create a Gnosis_safe_eth_transfer.
     * @param {gnosis_safe_eth_transferCreateArgs} args - Arguments to create a Gnosis_safe_eth_transfer.
     * @example
     * // Create one Gnosis_safe_eth_transfer
     * const Gnosis_safe_eth_transfer = await prisma.gnosis_safe_eth_transfer.create({
     *   data: {
     *     // ... data to create a Gnosis_safe_eth_transfer
     *   }
     * })
     * 
    **/
    create<T extends gnosis_safe_eth_transferCreateArgs>(
      args: SelectSubset<T, gnosis_safe_eth_transferCreateArgs>
    ): CheckSelect<T, Prisma__gnosis_safe_eth_transferClient<gnosis_safe_eth_transfer>, Prisma__gnosis_safe_eth_transferClient<gnosis_safe_eth_transferGetPayload<T>>>

    /**
     * Create many Gnosis_safe_eth_transfers.
     *     @param {gnosis_safe_eth_transferCreateManyArgs} args - Arguments to create many Gnosis_safe_eth_transfers.
     *     @example
     *     // Create many Gnosis_safe_eth_transfers
     *     const gnosis_safe_eth_transfer = await prisma.gnosis_safe_eth_transfer.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends gnosis_safe_eth_transferCreateManyArgs>(
      args?: SelectSubset<T, gnosis_safe_eth_transferCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Gnosis_safe_eth_transfer.
     * @param {gnosis_safe_eth_transferDeleteArgs} args - Arguments to delete one Gnosis_safe_eth_transfer.
     * @example
     * // Delete one Gnosis_safe_eth_transfer
     * const Gnosis_safe_eth_transfer = await prisma.gnosis_safe_eth_transfer.delete({
     *   where: {
     *     // ... filter to delete one Gnosis_safe_eth_transfer
     *   }
     * })
     * 
    **/
    delete<T extends gnosis_safe_eth_transferDeleteArgs>(
      args: SelectSubset<T, gnosis_safe_eth_transferDeleteArgs>
    ): CheckSelect<T, Prisma__gnosis_safe_eth_transferClient<gnosis_safe_eth_transfer>, Prisma__gnosis_safe_eth_transferClient<gnosis_safe_eth_transferGetPayload<T>>>

    /**
     * Update one Gnosis_safe_eth_transfer.
     * @param {gnosis_safe_eth_transferUpdateArgs} args - Arguments to update one Gnosis_safe_eth_transfer.
     * @example
     * // Update one Gnosis_safe_eth_transfer
     * const gnosis_safe_eth_transfer = await prisma.gnosis_safe_eth_transfer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends gnosis_safe_eth_transferUpdateArgs>(
      args: SelectSubset<T, gnosis_safe_eth_transferUpdateArgs>
    ): CheckSelect<T, Prisma__gnosis_safe_eth_transferClient<gnosis_safe_eth_transfer>, Prisma__gnosis_safe_eth_transferClient<gnosis_safe_eth_transferGetPayload<T>>>

    /**
     * Delete zero or more Gnosis_safe_eth_transfers.
     * @param {gnosis_safe_eth_transferDeleteManyArgs} args - Arguments to filter Gnosis_safe_eth_transfers to delete.
     * @example
     * // Delete a few Gnosis_safe_eth_transfers
     * const { count } = await prisma.gnosis_safe_eth_transfer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends gnosis_safe_eth_transferDeleteManyArgs>(
      args?: SelectSubset<T, gnosis_safe_eth_transferDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gnosis_safe_eth_transfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gnosis_safe_eth_transferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Gnosis_safe_eth_transfers
     * const gnosis_safe_eth_transfer = await prisma.gnosis_safe_eth_transfer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends gnosis_safe_eth_transferUpdateManyArgs>(
      args: SelectSubset<T, gnosis_safe_eth_transferUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Gnosis_safe_eth_transfer.
     * @param {gnosis_safe_eth_transferUpsertArgs} args - Arguments to update or create a Gnosis_safe_eth_transfer.
     * @example
     * // Update or create a Gnosis_safe_eth_transfer
     * const gnosis_safe_eth_transfer = await prisma.gnosis_safe_eth_transfer.upsert({
     *   create: {
     *     // ... data to create a Gnosis_safe_eth_transfer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Gnosis_safe_eth_transfer we want to update
     *   }
     * })
    **/
    upsert<T extends gnosis_safe_eth_transferUpsertArgs>(
      args: SelectSubset<T, gnosis_safe_eth_transferUpsertArgs>
    ): CheckSelect<T, Prisma__gnosis_safe_eth_transferClient<gnosis_safe_eth_transfer>, Prisma__gnosis_safe_eth_transferClient<gnosis_safe_eth_transferGetPayload<T>>>

    /**
     * Count the number of Gnosis_safe_eth_transfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gnosis_safe_eth_transferCountArgs} args - Arguments to filter Gnosis_safe_eth_transfers to count.
     * @example
     * // Count the number of Gnosis_safe_eth_transfers
     * const count = await prisma.gnosis_safe_eth_transfer.count({
     *   where: {
     *     // ... the filter for the Gnosis_safe_eth_transfers we want to count
     *   }
     * })
    **/
    count<T extends gnosis_safe_eth_transferCountArgs>(
      args?: Subset<T, gnosis_safe_eth_transferCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Gnosis_safe_eth_transferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Gnosis_safe_eth_transfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Gnosis_safe_eth_transferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Gnosis_safe_eth_transferAggregateArgs>(args: Subset<T, Gnosis_safe_eth_transferAggregateArgs>): PrismaPromise<GetGnosis_safe_eth_transferAggregateType<T>>

    /**
     * Group by Gnosis_safe_eth_transfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Gnosis_safe_eth_transferGroupByArgs} args - Group by arguments.
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
      T extends Gnosis_safe_eth_transferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Gnosis_safe_eth_transferGroupByArgs['orderBy'] }
        : { orderBy?: Gnosis_safe_eth_transferGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, Gnosis_safe_eth_transferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGnosis_safe_eth_transferGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for gnosis_safe_eth_transfer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__gnosis_safe_eth_transferClient<T> implements PrismaPromise<T> {
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

    transaction<T extends transactionArgs = {}>(args?: Subset<T, transactionArgs>): CheckSelect<T, Prisma__transactionClient<transaction | null >, Prisma__transactionClient<transactionGetPayload<T> | null >>;

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
   * gnosis_safe_eth_transfer findUnique
   */
  export type gnosis_safe_eth_transferFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the gnosis_safe_eth_transfer
     * 
    **/
    select?: gnosis_safe_eth_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: gnosis_safe_eth_transferInclude | null
    /**
     * Throw an Error if a gnosis_safe_eth_transfer can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which gnosis_safe_eth_transfer to fetch.
     * 
    **/
    where: gnosis_safe_eth_transferWhereUniqueInput
  }


  /**
   * gnosis_safe_eth_transfer findFirst
   */
  export type gnosis_safe_eth_transferFindFirstArgs = {
    /**
     * Select specific fields to fetch from the gnosis_safe_eth_transfer
     * 
    **/
    select?: gnosis_safe_eth_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: gnosis_safe_eth_transferInclude | null
    /**
     * Throw an Error if a gnosis_safe_eth_transfer can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which gnosis_safe_eth_transfer to fetch.
     * 
    **/
    where?: gnosis_safe_eth_transferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of gnosis_safe_eth_transfers to fetch.
     * 
    **/
    orderBy?: Enumerable<gnosis_safe_eth_transferOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for gnosis_safe_eth_transfers.
     * 
    **/
    cursor?: gnosis_safe_eth_transferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` gnosis_safe_eth_transfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` gnosis_safe_eth_transfers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of gnosis_safe_eth_transfers.
     * 
    **/
    distinct?: Enumerable<Gnosis_safe_eth_transferScalarFieldEnum>
  }


  /**
   * gnosis_safe_eth_transfer findMany
   */
  export type gnosis_safe_eth_transferFindManyArgs = {
    /**
     * Select specific fields to fetch from the gnosis_safe_eth_transfer
     * 
    **/
    select?: gnosis_safe_eth_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: gnosis_safe_eth_transferInclude | null
    /**
     * Filter, which gnosis_safe_eth_transfers to fetch.
     * 
    **/
    where?: gnosis_safe_eth_transferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of gnosis_safe_eth_transfers to fetch.
     * 
    **/
    orderBy?: Enumerable<gnosis_safe_eth_transferOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing gnosis_safe_eth_transfers.
     * 
    **/
    cursor?: gnosis_safe_eth_transferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` gnosis_safe_eth_transfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` gnosis_safe_eth_transfers.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Gnosis_safe_eth_transferScalarFieldEnum>
  }


  /**
   * gnosis_safe_eth_transfer create
   */
  export type gnosis_safe_eth_transferCreateArgs = {
    /**
     * Select specific fields to fetch from the gnosis_safe_eth_transfer
     * 
    **/
    select?: gnosis_safe_eth_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: gnosis_safe_eth_transferInclude | null
    /**
     * The data needed to create a gnosis_safe_eth_transfer.
     * 
    **/
    data: XOR<gnosis_safe_eth_transferCreateInput, gnosis_safe_eth_transferUncheckedCreateInput>
  }


  /**
   * gnosis_safe_eth_transfer createMany
   */
  export type gnosis_safe_eth_transferCreateManyArgs = {
    data: Enumerable<gnosis_safe_eth_transferCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * gnosis_safe_eth_transfer update
   */
  export type gnosis_safe_eth_transferUpdateArgs = {
    /**
     * Select specific fields to fetch from the gnosis_safe_eth_transfer
     * 
    **/
    select?: gnosis_safe_eth_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: gnosis_safe_eth_transferInclude | null
    /**
     * The data needed to update a gnosis_safe_eth_transfer.
     * 
    **/
    data: XOR<gnosis_safe_eth_transferUpdateInput, gnosis_safe_eth_transferUncheckedUpdateInput>
    /**
     * Choose, which gnosis_safe_eth_transfer to update.
     * 
    **/
    where: gnosis_safe_eth_transferWhereUniqueInput
  }


  /**
   * gnosis_safe_eth_transfer updateMany
   */
  export type gnosis_safe_eth_transferUpdateManyArgs = {
    data: XOR<gnosis_safe_eth_transferUpdateManyMutationInput, gnosis_safe_eth_transferUncheckedUpdateManyInput>
    where?: gnosis_safe_eth_transferWhereInput
  }


  /**
   * gnosis_safe_eth_transfer upsert
   */
  export type gnosis_safe_eth_transferUpsertArgs = {
    /**
     * Select specific fields to fetch from the gnosis_safe_eth_transfer
     * 
    **/
    select?: gnosis_safe_eth_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: gnosis_safe_eth_transferInclude | null
    /**
     * The filter to search for the gnosis_safe_eth_transfer to update in case it exists.
     * 
    **/
    where: gnosis_safe_eth_transferWhereUniqueInput
    /**
     * In case the gnosis_safe_eth_transfer found by the `where` argument doesn't exist, create a new gnosis_safe_eth_transfer with this data.
     * 
    **/
    create: XOR<gnosis_safe_eth_transferCreateInput, gnosis_safe_eth_transferUncheckedCreateInput>
    /**
     * In case the gnosis_safe_eth_transfer was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<gnosis_safe_eth_transferUpdateInput, gnosis_safe_eth_transferUncheckedUpdateInput>
  }


  /**
   * gnosis_safe_eth_transfer delete
   */
  export type gnosis_safe_eth_transferDeleteArgs = {
    /**
     * Select specific fields to fetch from the gnosis_safe_eth_transfer
     * 
    **/
    select?: gnosis_safe_eth_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: gnosis_safe_eth_transferInclude | null
    /**
     * Filter which gnosis_safe_eth_transfer to delete.
     * 
    **/
    where: gnosis_safe_eth_transferWhereUniqueInput
  }


  /**
   * gnosis_safe_eth_transfer deleteMany
   */
  export type gnosis_safe_eth_transferDeleteManyArgs = {
    where?: gnosis_safe_eth_transferWhereInput
  }


  /**
   * gnosis_safe_eth_transfer without action
   */
  export type gnosis_safe_eth_transferArgs = {
    /**
     * Select specific fields to fetch from the gnosis_safe_eth_transfer
     * 
    **/
    select?: gnosis_safe_eth_transferSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: gnosis_safe_eth_transferInclude | null
  }



  /**
   * Model transaction
   */


  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
    max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    id: number | null
    block_number: number | null
    index: number | null
  }

  export type TransactionSumAggregateOutputType = {
    id: bigint | null
    block_number: bigint | null
    index: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: bigint | null
    block_number: bigint | null
    from: string | null
    to: string | null
    index: number | null
    gas: string | null
    hash: string | null
    value: string | null
    input: string | null
    nonce: string | null
    type: string | null
    gas_price: string | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: bigint | null
    block_number: bigint | null
    from: string | null
    to: string | null
    index: number | null
    gas: string | null
    hash: string | null
    value: string | null
    input: string | null
    nonce: string | null
    type: string | null
    gas_price: string | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    block_number: number
    from: number
    to: number
    index: number
    gas: number
    hash: number
    value: number
    input: number
    nonce: number
    type: number
    gas_price: number
    classification: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    id?: true
    block_number?: true
    index?: true
  }

  export type TransactionSumAggregateInputType = {
    id?: true
    block_number?: true
    index?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    block_number?: true
    from?: true
    to?: true
    index?: true
    gas?: true
    hash?: true
    value?: true
    input?: true
    nonce?: true
    type?: true
    gas_price?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    block_number?: true
    from?: true
    to?: true
    index?: true
    gas?: true
    hash?: true
    value?: true
    input?: true
    nonce?: true
    type?: true
    gas_price?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    block_number?: true
    from?: true
    to?: true
    index?: true
    gas?: true
    hash?: true
    value?: true
    input?: true
    nonce?: true
    type?: true
    gas_price?: true
    classification?: true
    _all?: true
  }

  export type TransactionAggregateArgs = {
    /**
     * Filter which transaction to aggregate.
     * 
    **/
    where?: transactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transactions to fetch.
     * 
    **/
    orderBy?: Enumerable<transactionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: transactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transactions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transactions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: TransactionSumAggregateInputType
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
    where?: transactionWhereInput
    orderBy?: Enumerable<transactionOrderByInput>
    by: Array<TransactionScalarFieldEnum>
    having?: transactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }


  export type TransactionGroupByOutputType = {
    id: bigint
    block_number: bigint
    from: string
    to: string | null
    index: number
    gas: string
    hash: string
    value: string
    input: string | null
    nonce: string | null
    type: string | null
    gas_price: string | null
    classification: string[]
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
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


  export type transactionSelect = {
    id?: boolean
    block_number?: boolean
    from?: boolean
    to?: boolean
    index?: boolean
    gas?: boolean
    hash?: boolean
    value?: boolean
    input?: boolean
    nonce?: boolean
    type?: boolean
    gas_price?: boolean
    classification?: boolean
    block?: boolean | blockArgs
    crc_hub_transfer?: boolean | crc_hub_transferFindManyArgs
    crc_organisation_signup?: boolean | crc_organisation_signupFindManyArgs
    crc_signup?: boolean | crc_signupFindManyArgs
    crc_trust?: boolean | crc_trustFindManyArgs
    erc20_transfer?: boolean | erc20_transferFindManyArgs
    eth_transfer?: boolean | eth_transferFindManyArgs
    gnosis_safe_eth_transfer?: boolean | gnosis_safe_eth_transferFindManyArgs
  }

  export type transactionInclude = {
    block?: boolean | blockArgs
    crc_hub_transfer?: boolean | crc_hub_transferFindManyArgs
    crc_organisation_signup?: boolean | crc_organisation_signupFindManyArgs
    crc_signup?: boolean | crc_signupFindManyArgs
    crc_trust?: boolean | crc_trustFindManyArgs
    erc20_transfer?: boolean | erc20_transferFindManyArgs
    eth_transfer?: boolean | eth_transferFindManyArgs
    gnosis_safe_eth_transfer?: boolean | gnosis_safe_eth_transferFindManyArgs
  }

  export type transactionGetPayload<
    S extends boolean | null | undefined | transactionArgs,
    U = keyof S
      > = S extends true
        ? transaction
    : S extends undefined
    ? never
    : S extends transactionArgs | transactionFindManyArgs
    ?'include' extends U
    ? transaction  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'block'
        ? blockGetPayload<S['include'][P]> :
        P extends 'crc_hub_transfer'
        ? Array < crc_hub_transferGetPayload<S['include'][P]>>  :
        P extends 'crc_organisation_signup'
        ? Array < crc_organisation_signupGetPayload<S['include'][P]>>  :
        P extends 'crc_signup'
        ? Array < crc_signupGetPayload<S['include'][P]>>  :
        P extends 'crc_trust'
        ? Array < crc_trustGetPayload<S['include'][P]>>  :
        P extends 'erc20_transfer'
        ? Array < erc20_transferGetPayload<S['include'][P]>>  :
        P extends 'eth_transfer'
        ? Array < eth_transferGetPayload<S['include'][P]>>  :
        P extends 'gnosis_safe_eth_transfer'
        ? Array < gnosis_safe_eth_transferGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof transaction ?transaction [P]
  : 
          P extends 'block'
        ? blockGetPayload<S['select'][P]> :
        P extends 'crc_hub_transfer'
        ? Array < crc_hub_transferGetPayload<S['select'][P]>>  :
        P extends 'crc_organisation_signup'
        ? Array < crc_organisation_signupGetPayload<S['select'][P]>>  :
        P extends 'crc_signup'
        ? Array < crc_signupGetPayload<S['select'][P]>>  :
        P extends 'crc_trust'
        ? Array < crc_trustGetPayload<S['select'][P]>>  :
        P extends 'erc20_transfer'
        ? Array < erc20_transferGetPayload<S['select'][P]>>  :
        P extends 'eth_transfer'
        ? Array < eth_transferGetPayload<S['select'][P]>>  :
        P extends 'gnosis_safe_eth_transfer'
        ? Array < gnosis_safe_eth_transferGetPayload<S['select'][P]>>  : never
  } 
    : transaction
  : transaction


  type transactionCountArgs = Merge<
    Omit<transactionFindManyArgs, 'select' | 'include'> & {
      select?: TransactionCountAggregateInputType | true
    }
  >

  export interface transactionDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {transactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends transactionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, transactionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'transaction'> extends True ? CheckSelect<T, Prisma__transactionClient<transaction>, Prisma__transactionClient<transactionGetPayload<T>>> : CheckSelect<T, Prisma__transactionClient<transaction | null >, Prisma__transactionClient<transactionGetPayload<T> | null >>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends transactionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, transactionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'transaction'> extends True ? CheckSelect<T, Prisma__transactionClient<transaction>, Prisma__transactionClient<transactionGetPayload<T>>> : CheckSelect<T, Prisma__transactionClient<transaction | null >, Prisma__transactionClient<transactionGetPayload<T> | null >>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends transactionFindManyArgs>(
      args?: SelectSubset<T, transactionFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<transaction>>, PrismaPromise<Array<transactionGetPayload<T>>>>

    /**
     * Create a Transaction.
     * @param {transactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
    **/
    create<T extends transactionCreateArgs>(
      args: SelectSubset<T, transactionCreateArgs>
    ): CheckSelect<T, Prisma__transactionClient<transaction>, Prisma__transactionClient<transactionGetPayload<T>>>

    /**
     * Create many Transactions.
     *     @param {transactionCreateManyArgs} args - Arguments to create many Transactions.
     *     @example
     *     // Create many Transactions
     *     const transaction = await prisma.transaction.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends transactionCreateManyArgs>(
      args?: SelectSubset<T, transactionCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Transaction.
     * @param {transactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
    **/
    delete<T extends transactionDeleteArgs>(
      args: SelectSubset<T, transactionDeleteArgs>
    ): CheckSelect<T, Prisma__transactionClient<transaction>, Prisma__transactionClient<transactionGetPayload<T>>>

    /**
     * Update one Transaction.
     * @param {transactionUpdateArgs} args - Arguments to update one Transaction.
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
    update<T extends transactionUpdateArgs>(
      args: SelectSubset<T, transactionUpdateArgs>
    ): CheckSelect<T, Prisma__transactionClient<transaction>, Prisma__transactionClient<transactionGetPayload<T>>>

    /**
     * Delete zero or more Transactions.
     * @param {transactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends transactionDeleteManyArgs>(
      args?: SelectSubset<T, transactionDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionUpdateManyArgs} args - Arguments to update one or more rows.
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
    updateMany<T extends transactionUpdateManyArgs>(
      args: SelectSubset<T, transactionUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Transaction.
     * @param {transactionUpsertArgs} args - Arguments to update or create a Transaction.
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
    upsert<T extends transactionUpsertArgs>(
      args: SelectSubset<T, transactionUpsertArgs>
    ): CheckSelect<T, Prisma__transactionClient<transaction>, Prisma__transactionClient<transactionGetPayload<T>>>

    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends transactionCountArgs>(
      args?: Subset<T, transactionCountArgs>,
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
   * The delegate class that acts as a "Promise-like" for transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__transactionClient<T> implements PrismaPromise<T> {
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

    block<T extends blockArgs = {}>(args?: Subset<T, blockArgs>): CheckSelect<T, Prisma__blockClient<block | null >, Prisma__blockClient<blockGetPayload<T> | null >>;

    crc_hub_transfer<T extends crc_hub_transferFindManyArgs = {}>(args?: Subset<T, crc_hub_transferFindManyArgs>): CheckSelect<T, PrismaPromise<Array<crc_hub_transfer>>, PrismaPromise<Array<crc_hub_transferGetPayload<T>>>>;

    crc_organisation_signup<T extends crc_organisation_signupFindManyArgs = {}>(args?: Subset<T, crc_organisation_signupFindManyArgs>): CheckSelect<T, PrismaPromise<Array<crc_organisation_signup>>, PrismaPromise<Array<crc_organisation_signupGetPayload<T>>>>;

    crc_signup<T extends crc_signupFindManyArgs = {}>(args?: Subset<T, crc_signupFindManyArgs>): CheckSelect<T, PrismaPromise<Array<crc_signup>>, PrismaPromise<Array<crc_signupGetPayload<T>>>>;

    crc_trust<T extends crc_trustFindManyArgs = {}>(args?: Subset<T, crc_trustFindManyArgs>): CheckSelect<T, PrismaPromise<Array<crc_trust>>, PrismaPromise<Array<crc_trustGetPayload<T>>>>;

    erc20_transfer<T extends erc20_transferFindManyArgs = {}>(args?: Subset<T, erc20_transferFindManyArgs>): CheckSelect<T, PrismaPromise<Array<erc20_transfer>>, PrismaPromise<Array<erc20_transferGetPayload<T>>>>;

    eth_transfer<T extends eth_transferFindManyArgs = {}>(args?: Subset<T, eth_transferFindManyArgs>): CheckSelect<T, PrismaPromise<Array<eth_transfer>>, PrismaPromise<Array<eth_transferGetPayload<T>>>>;

    gnosis_safe_eth_transfer<T extends gnosis_safe_eth_transferFindManyArgs = {}>(args?: Subset<T, gnosis_safe_eth_transferFindManyArgs>): CheckSelect<T, PrismaPromise<Array<gnosis_safe_eth_transfer>>, PrismaPromise<Array<gnosis_safe_eth_transferGetPayload<T>>>>;

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
   * transaction findUnique
   */
  export type transactionFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the transaction
     * 
    **/
    select?: transactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: transactionInclude | null
    /**
     * Throw an Error if a transaction can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which transaction to fetch.
     * 
    **/
    where: transactionWhereUniqueInput
  }


  /**
   * transaction findFirst
   */
  export type transactionFindFirstArgs = {
    /**
     * Select specific fields to fetch from the transaction
     * 
    **/
    select?: transactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: transactionInclude | null
    /**
     * Throw an Error if a transaction can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which transaction to fetch.
     * 
    **/
    where?: transactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transactions to fetch.
     * 
    **/
    orderBy?: Enumerable<transactionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for transactions.
     * 
    **/
    cursor?: transactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transactions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transactions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of transactions.
     * 
    **/
    distinct?: Enumerable<TransactionScalarFieldEnum>
  }


  /**
   * transaction findMany
   */
  export type transactionFindManyArgs = {
    /**
     * Select specific fields to fetch from the transaction
     * 
    **/
    select?: transactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: transactionInclude | null
    /**
     * Filter, which transactions to fetch.
     * 
    **/
    where?: transactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transactions to fetch.
     * 
    **/
    orderBy?: Enumerable<transactionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing transactions.
     * 
    **/
    cursor?: transactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transactions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transactions.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TransactionScalarFieldEnum>
  }


  /**
   * transaction create
   */
  export type transactionCreateArgs = {
    /**
     * Select specific fields to fetch from the transaction
     * 
    **/
    select?: transactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: transactionInclude | null
    /**
     * The data needed to create a transaction.
     * 
    **/
    data: XOR<transactionCreateInput, transactionUncheckedCreateInput>
  }


  /**
   * transaction createMany
   */
  export type transactionCreateManyArgs = {
    data: Enumerable<transactionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * transaction update
   */
  export type transactionUpdateArgs = {
    /**
     * Select specific fields to fetch from the transaction
     * 
    **/
    select?: transactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: transactionInclude | null
    /**
     * The data needed to update a transaction.
     * 
    **/
    data: XOR<transactionUpdateInput, transactionUncheckedUpdateInput>
    /**
     * Choose, which transaction to update.
     * 
    **/
    where: transactionWhereUniqueInput
  }


  /**
   * transaction updateMany
   */
  export type transactionUpdateManyArgs = {
    data: XOR<transactionUpdateManyMutationInput, transactionUncheckedUpdateManyInput>
    where?: transactionWhereInput
  }


  /**
   * transaction upsert
   */
  export type transactionUpsertArgs = {
    /**
     * Select specific fields to fetch from the transaction
     * 
    **/
    select?: transactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: transactionInclude | null
    /**
     * The filter to search for the transaction to update in case it exists.
     * 
    **/
    where: transactionWhereUniqueInput
    /**
     * In case the transaction found by the `where` argument doesn't exist, create a new transaction with this data.
     * 
    **/
    create: XOR<transactionCreateInput, transactionUncheckedCreateInput>
    /**
     * In case the transaction was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<transactionUpdateInput, transactionUncheckedUpdateInput>
  }


  /**
   * transaction delete
   */
  export type transactionDeleteArgs = {
    /**
     * Select specific fields to fetch from the transaction
     * 
    **/
    select?: transactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: transactionInclude | null
    /**
     * Filter which transaction to delete.
     * 
    **/
    where: transactionWhereUniqueInput
  }


  /**
   * transaction deleteMany
   */
  export type transactionDeleteManyArgs = {
    where?: transactionWhereInput
  }


  /**
   * transaction without action
   */
  export type transactionArgs = {
    /**
     * Select specific fields to fetch from the transaction
     * 
    **/
    select?: transactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: transactionInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const BlockScalarFieldEnum: {
    number: 'number',
    hash: 'hash',
    timestamp: 'timestamp',
    total_transaction_count: 'total_transaction_count',
    indexed_transaction_count: 'indexed_transaction_count'
  };

  export type BlockScalarFieldEnum = (typeof BlockScalarFieldEnum)[keyof typeof BlockScalarFieldEnum]


  export const Crc_hub_transferScalarFieldEnum: {
    id: 'id',
    transaction_id: 'transaction_id',
    from: 'from',
    to: 'to',
    value: 'value'
  };

  export type Crc_hub_transferScalarFieldEnum = (typeof Crc_hub_transferScalarFieldEnum)[keyof typeof Crc_hub_transferScalarFieldEnum]


  export const Crc_organisation_signupScalarFieldEnum: {
    id: 'id',
    transaction_id: 'transaction_id',
    organisation: 'organisation'
  };

  export type Crc_organisation_signupScalarFieldEnum = (typeof Crc_organisation_signupScalarFieldEnum)[keyof typeof Crc_organisation_signupScalarFieldEnum]


  export const Crc_signupScalarFieldEnum: {
    id: 'id',
    transaction_id: 'transaction_id',
    user: 'user',
    token: 'token'
  };

  export type Crc_signupScalarFieldEnum = (typeof Crc_signupScalarFieldEnum)[keyof typeof Crc_signupScalarFieldEnum]


  export const Crc_trustScalarFieldEnum: {
    id: 'id',
    transaction_id: 'transaction_id',
    address: 'address',
    can_send_to: 'can_send_to',
    limit: 'limit'
  };

  export type Crc_trustScalarFieldEnum = (typeof Crc_trustScalarFieldEnum)[keyof typeof Crc_trustScalarFieldEnum]


  export const Erc20_transferScalarFieldEnum: {
    id: 'id',
    transaction_id: 'transaction_id',
    from: 'from',
    to: 'to',
    token: 'token',
    value: 'value'
  };

  export type Erc20_transferScalarFieldEnum = (typeof Erc20_transferScalarFieldEnum)[keyof typeof Erc20_transferScalarFieldEnum]


  export const Eth_transferScalarFieldEnum: {
    id: 'id',
    transaction_id: 'transaction_id',
    from: 'from',
    to: 'to',
    value: 'value'
  };

  export type Eth_transferScalarFieldEnum = (typeof Eth_transferScalarFieldEnum)[keyof typeof Eth_transferScalarFieldEnum]


  export const Gnosis_safe_eth_transferScalarFieldEnum: {
    id: 'id',
    transaction_id: 'transaction_id',
    initiator: 'initiator',
    from: 'from',
    to: 'to',
    value: 'value'
  };

  export type Gnosis_safe_eth_transferScalarFieldEnum = (typeof Gnosis_safe_eth_transferScalarFieldEnum)[keyof typeof Gnosis_safe_eth_transferScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
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
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


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


  export type blockWhereInput = {
    AND?: Enumerable<blockWhereInput>
    OR?: Enumerable<blockWhereInput>
    NOT?: Enumerable<blockWhereInput>
    number?: BigIntFilter | bigint | number
    hash?: StringFilter | string
    timestamp?: DateTimeFilter | Date | string
    total_transaction_count?: IntFilter | number
    indexed_transaction_count?: IntFilter | number
    transaction?: TransactionListRelationFilter
  }

  export type blockOrderByInput = {
    number?: SortOrder
    hash?: SortOrder
    timestamp?: SortOrder
    total_transaction_count?: SortOrder
    indexed_transaction_count?: SortOrder
  }

  export type blockWhereUniqueInput = {
    number?: bigint | number
    hash?: string
    idx_block_timestamp?: blockIdx_block_timestampCompoundUniqueInput
  }

  export type blockScalarWhereWithAggregatesInput = {
    AND?: Enumerable<blockScalarWhereWithAggregatesInput>
    OR?: Enumerable<blockScalarWhereWithAggregatesInput>
    NOT?: Enumerable<blockScalarWhereWithAggregatesInput>
    number?: BigIntWithAggregatesFilter | bigint | number
    hash?: StringWithAggregatesFilter | string
    timestamp?: DateTimeWithAggregatesFilter | Date | string
    total_transaction_count?: IntWithAggregatesFilter | number
    indexed_transaction_count?: IntWithAggregatesFilter | number
  }

  export type crc_hub_transferWhereInput = {
    AND?: Enumerable<crc_hub_transferWhereInput>
    OR?: Enumerable<crc_hub_transferWhereInput>
    NOT?: Enumerable<crc_hub_transferWhereInput>
    id?: BigIntFilter | bigint | number
    transaction_id?: BigIntFilter | bigint | number
    from?: StringFilter | string
    to?: StringFilter | string
    value?: StringFilter | string
    transaction?: XOR<TransactionRelationFilter, transactionWhereInput>
  }

  export type crc_hub_transferOrderByInput = {
    id?: SortOrder
    transaction_id?: SortOrder
    from?: SortOrder
    to?: SortOrder
    value?: SortOrder
  }

  export type crc_hub_transferWhereUniqueInput = {
    id?: bigint | number
  }

  export type crc_hub_transferScalarWhereWithAggregatesInput = {
    AND?: Enumerable<crc_hub_transferScalarWhereWithAggregatesInput>
    OR?: Enumerable<crc_hub_transferScalarWhereWithAggregatesInput>
    NOT?: Enumerable<crc_hub_transferScalarWhereWithAggregatesInput>
    id?: BigIntWithAggregatesFilter | bigint | number
    transaction_id?: BigIntWithAggregatesFilter | bigint | number
    from?: StringWithAggregatesFilter | string
    to?: StringWithAggregatesFilter | string
    value?: StringWithAggregatesFilter | string
  }

  export type crc_organisation_signupWhereInput = {
    AND?: Enumerable<crc_organisation_signupWhereInput>
    OR?: Enumerable<crc_organisation_signupWhereInput>
    NOT?: Enumerable<crc_organisation_signupWhereInput>
    id?: BigIntFilter | bigint | number
    transaction_id?: BigIntFilter | bigint | number
    organisation?: StringFilter | string
    transaction?: XOR<TransactionRelationFilter, transactionWhereInput>
  }

  export type crc_organisation_signupOrderByInput = {
    id?: SortOrder
    transaction_id?: SortOrder
    organisation?: SortOrder
  }

  export type crc_organisation_signupWhereUniqueInput = {
    id?: bigint | number
    idx_crc_organisation_signup_organisation?: crc_organisation_signupIdx_crc_organisation_signup_organisationCompoundUniqueInput
  }

  export type crc_organisation_signupScalarWhereWithAggregatesInput = {
    AND?: Enumerable<crc_organisation_signupScalarWhereWithAggregatesInput>
    OR?: Enumerable<crc_organisation_signupScalarWhereWithAggregatesInput>
    NOT?: Enumerable<crc_organisation_signupScalarWhereWithAggregatesInput>
    id?: BigIntWithAggregatesFilter | bigint | number
    transaction_id?: BigIntWithAggregatesFilter | bigint | number
    organisation?: StringWithAggregatesFilter | string
  }

  export type crc_signupWhereInput = {
    AND?: Enumerable<crc_signupWhereInput>
    OR?: Enumerable<crc_signupWhereInput>
    NOT?: Enumerable<crc_signupWhereInput>
    id?: BigIntFilter | bigint | number
    transaction_id?: BigIntFilter | bigint | number
    user?: StringFilter | string
    token?: StringFilter | string
    transaction?: XOR<TransactionRelationFilter, transactionWhereInput>
  }

  export type crc_signupOrderByInput = {
    id?: SortOrder
    transaction_id?: SortOrder
    user?: SortOrder
    token?: SortOrder
  }

  export type crc_signupWhereUniqueInput = {
    id?: bigint | number
    user?: string
    token?: string
    idx_crc_signup_token?: crc_signupIdx_crc_signup_tokenCompoundUniqueInput
    idx_crc_signup_user?: crc_signupIdx_crc_signup_userCompoundUniqueInput
  }

  export type crc_signupScalarWhereWithAggregatesInput = {
    AND?: Enumerable<crc_signupScalarWhereWithAggregatesInput>
    OR?: Enumerable<crc_signupScalarWhereWithAggregatesInput>
    NOT?: Enumerable<crc_signupScalarWhereWithAggregatesInput>
    id?: BigIntWithAggregatesFilter | bigint | number
    transaction_id?: BigIntWithAggregatesFilter | bigint | number
    user?: StringWithAggregatesFilter | string
    token?: StringWithAggregatesFilter | string
  }

  export type crc_trustWhereInput = {
    AND?: Enumerable<crc_trustWhereInput>
    OR?: Enumerable<crc_trustWhereInput>
    NOT?: Enumerable<crc_trustWhereInput>
    id?: BigIntFilter | bigint | number
    transaction_id?: BigIntFilter | bigint | number
    address?: StringFilter | string
    can_send_to?: StringFilter | string
    limit?: BigIntFilter | bigint | number
    transaction?: XOR<TransactionRelationFilter, transactionWhereInput>
  }

  export type crc_trustOrderByInput = {
    id?: SortOrder
    transaction_id?: SortOrder
    address?: SortOrder
    can_send_to?: SortOrder
    limit?: SortOrder
  }

  export type crc_trustWhereUniqueInput = {
    id?: bigint | number
  }

  export type crc_trustScalarWhereWithAggregatesInput = {
    AND?: Enumerable<crc_trustScalarWhereWithAggregatesInput>
    OR?: Enumerable<crc_trustScalarWhereWithAggregatesInput>
    NOT?: Enumerable<crc_trustScalarWhereWithAggregatesInput>
    id?: BigIntWithAggregatesFilter | bigint | number
    transaction_id?: BigIntWithAggregatesFilter | bigint | number
    address?: StringWithAggregatesFilter | string
    can_send_to?: StringWithAggregatesFilter | string
    limit?: BigIntWithAggregatesFilter | bigint | number
  }

  export type erc20_transferWhereInput = {
    AND?: Enumerable<erc20_transferWhereInput>
    OR?: Enumerable<erc20_transferWhereInput>
    NOT?: Enumerable<erc20_transferWhereInput>
    id?: BigIntFilter | bigint | number
    transaction_id?: BigIntFilter | bigint | number
    from?: StringFilter | string
    to?: StringFilter | string
    token?: StringFilter | string
    value?: StringFilter | string
    transaction?: XOR<TransactionRelationFilter, transactionWhereInput>
  }

  export type erc20_transferOrderByInput = {
    id?: SortOrder
    transaction_id?: SortOrder
    from?: SortOrder
    to?: SortOrder
    token?: SortOrder
    value?: SortOrder
  }

  export type erc20_transferWhereUniqueInput = {
    id?: bigint | number
  }

  export type erc20_transferScalarWhereWithAggregatesInput = {
    AND?: Enumerable<erc20_transferScalarWhereWithAggregatesInput>
    OR?: Enumerable<erc20_transferScalarWhereWithAggregatesInput>
    NOT?: Enumerable<erc20_transferScalarWhereWithAggregatesInput>
    id?: BigIntWithAggregatesFilter | bigint | number
    transaction_id?: BigIntWithAggregatesFilter | bigint | number
    from?: StringWithAggregatesFilter | string
    to?: StringWithAggregatesFilter | string
    token?: StringWithAggregatesFilter | string
    value?: StringWithAggregatesFilter | string
  }

  export type eth_transferWhereInput = {
    AND?: Enumerable<eth_transferWhereInput>
    OR?: Enumerable<eth_transferWhereInput>
    NOT?: Enumerable<eth_transferWhereInput>
    id?: BigIntFilter | bigint | number
    transaction_id?: BigIntFilter | bigint | number
    from?: StringFilter | string
    to?: StringFilter | string
    value?: StringFilter | string
    transaction?: XOR<TransactionRelationFilter, transactionWhereInput>
  }

  export type eth_transferOrderByInput = {
    id?: SortOrder
    transaction_id?: SortOrder
    from?: SortOrder
    to?: SortOrder
    value?: SortOrder
  }

  export type eth_transferWhereUniqueInput = {
    id?: bigint | number
  }

  export type eth_transferScalarWhereWithAggregatesInput = {
    AND?: Enumerable<eth_transferScalarWhereWithAggregatesInput>
    OR?: Enumerable<eth_transferScalarWhereWithAggregatesInput>
    NOT?: Enumerable<eth_transferScalarWhereWithAggregatesInput>
    id?: BigIntWithAggregatesFilter | bigint | number
    transaction_id?: BigIntWithAggregatesFilter | bigint | number
    from?: StringWithAggregatesFilter | string
    to?: StringWithAggregatesFilter | string
    value?: StringWithAggregatesFilter | string
  }

  export type gnosis_safe_eth_transferWhereInput = {
    AND?: Enumerable<gnosis_safe_eth_transferWhereInput>
    OR?: Enumerable<gnosis_safe_eth_transferWhereInput>
    NOT?: Enumerable<gnosis_safe_eth_transferWhereInput>
    id?: BigIntFilter | bigint | number
    transaction_id?: BigIntFilter | bigint | number
    initiator?: StringFilter | string
    from?: StringFilter | string
    to?: StringFilter | string
    value?: StringFilter | string
    transaction?: XOR<TransactionRelationFilter, transactionWhereInput>
  }

  export type gnosis_safe_eth_transferOrderByInput = {
    id?: SortOrder
    transaction_id?: SortOrder
    initiator?: SortOrder
    from?: SortOrder
    to?: SortOrder
    value?: SortOrder
  }

  export type gnosis_safe_eth_transferWhereUniqueInput = {
    id?: bigint | number
  }

  export type gnosis_safe_eth_transferScalarWhereWithAggregatesInput = {
    AND?: Enumerable<gnosis_safe_eth_transferScalarWhereWithAggregatesInput>
    OR?: Enumerable<gnosis_safe_eth_transferScalarWhereWithAggregatesInput>
    NOT?: Enumerable<gnosis_safe_eth_transferScalarWhereWithAggregatesInput>
    id?: BigIntWithAggregatesFilter | bigint | number
    transaction_id?: BigIntWithAggregatesFilter | bigint | number
    initiator?: StringWithAggregatesFilter | string
    from?: StringWithAggregatesFilter | string
    to?: StringWithAggregatesFilter | string
    value?: StringWithAggregatesFilter | string
  }

  export type transactionWhereInput = {
    AND?: Enumerable<transactionWhereInput>
    OR?: Enumerable<transactionWhereInput>
    NOT?: Enumerable<transactionWhereInput>
    id?: BigIntFilter | bigint | number
    block_number?: BigIntFilter | bigint | number
    from?: StringFilter | string
    to?: StringNullableFilter | string | null
    index?: IntFilter | number
    gas?: StringFilter | string
    hash?: StringFilter | string
    value?: StringFilter | string
    input?: StringNullableFilter | string | null
    nonce?: StringNullableFilter | string | null
    type?: StringNullableFilter | string | null
    gas_price?: StringNullableFilter | string | null
    classification?: StringNullableListFilter
    block?: XOR<BlockRelationFilter, blockWhereInput>
    crc_hub_transfer?: Crc_hub_transferListRelationFilter
    crc_organisation_signup?: Crc_organisation_signupListRelationFilter
    crc_signup?: Crc_signupListRelationFilter
    crc_trust?: Crc_trustListRelationFilter
    erc20_transfer?: Erc20_transferListRelationFilter
    eth_transfer?: Eth_transferListRelationFilter
    gnosis_safe_eth_transfer?: Gnosis_safe_eth_transferListRelationFilter
  }

  export type transactionOrderByInput = {
    id?: SortOrder
    block_number?: SortOrder
    from?: SortOrder
    to?: SortOrder
    index?: SortOrder
    gas?: SortOrder
    hash?: SortOrder
    value?: SortOrder
    input?: SortOrder
    nonce?: SortOrder
    type?: SortOrder
    gas_price?: SortOrder
    classification?: SortOrder
  }

  export type transactionWhereUniqueInput = {
    id?: bigint | number
    hash?: string
  }

  export type transactionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<transactionScalarWhereWithAggregatesInput>
    OR?: Enumerable<transactionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<transactionScalarWhereWithAggregatesInput>
    id?: BigIntWithAggregatesFilter | bigint | number
    block_number?: BigIntWithAggregatesFilter | bigint | number
    from?: StringWithAggregatesFilter | string
    to?: StringNullableWithAggregatesFilter | string | null
    index?: IntWithAggregatesFilter | number
    gas?: StringWithAggregatesFilter | string
    hash?: StringWithAggregatesFilter | string
    value?: StringWithAggregatesFilter | string
    input?: StringNullableWithAggregatesFilter | string | null
    nonce?: StringNullableWithAggregatesFilter | string | null
    type?: StringNullableWithAggregatesFilter | string | null
    gas_price?: StringNullableWithAggregatesFilter | string | null
    classification?: StringNullableListFilter
  }

  export type blockCreateInput = {
    number?: bigint | number
    hash: string
    timestamp: Date | string
    total_transaction_count: number
    indexed_transaction_count: number
    transaction?: transactionCreateNestedManyWithoutBlockInput
  }

  export type blockUncheckedCreateInput = {
    number?: bigint | number
    hash: string
    timestamp: Date | string
    total_transaction_count: number
    indexed_transaction_count: number
    transaction?: transactionUncheckedCreateNestedManyWithoutBlockInput
  }

  export type blockUpdateInput = {
    number?: BigIntFieldUpdateOperationsInput | bigint | number
    hash?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    total_transaction_count?: IntFieldUpdateOperationsInput | number
    indexed_transaction_count?: IntFieldUpdateOperationsInput | number
    transaction?: transactionUpdateManyWithoutBlockInput
  }

  export type blockUncheckedUpdateInput = {
    number?: BigIntFieldUpdateOperationsInput | bigint | number
    hash?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    total_transaction_count?: IntFieldUpdateOperationsInput | number
    indexed_transaction_count?: IntFieldUpdateOperationsInput | number
    transaction?: transactionUncheckedUpdateManyWithoutBlockInput
  }

  export type blockCreateManyInput = {
    number?: bigint | number
    hash: string
    timestamp: Date | string
    total_transaction_count: number
    indexed_transaction_count: number
  }

  export type blockUpdateManyMutationInput = {
    number?: BigIntFieldUpdateOperationsInput | bigint | number
    hash?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    total_transaction_count?: IntFieldUpdateOperationsInput | number
    indexed_transaction_count?: IntFieldUpdateOperationsInput | number
  }

  export type blockUncheckedUpdateManyInput = {
    number?: BigIntFieldUpdateOperationsInput | bigint | number
    hash?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    total_transaction_count?: IntFieldUpdateOperationsInput | number
    indexed_transaction_count?: IntFieldUpdateOperationsInput | number
  }

  export type crc_hub_transferCreateInput = {
    id?: bigint | number
    from: string
    to: string
    value: string
    transaction: transactionCreateNestedOneWithoutCrc_hub_transferInput
  }

  export type crc_hub_transferUncheckedCreateInput = {
    id?: bigint | number
    transaction_id: bigint | number
    from: string
    to: string
    value: string
  }

  export type crc_hub_transferUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    transaction?: transactionUpdateOneRequiredWithoutCrc_hub_transferInput
  }

  export type crc_hub_transferUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type crc_hub_transferCreateManyInput = {
    id?: bigint | number
    transaction_id: bigint | number
    from: string
    to: string
    value: string
  }

  export type crc_hub_transferUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type crc_hub_transferUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type crc_organisation_signupCreateInput = {
    id?: bigint | number
    organisation: string
    transaction: transactionCreateNestedOneWithoutCrc_organisation_signupInput
  }

  export type crc_organisation_signupUncheckedCreateInput = {
    id?: bigint | number
    transaction_id: bigint | number
    organisation: string
  }

  export type crc_organisation_signupUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    organisation?: StringFieldUpdateOperationsInput | string
    transaction?: transactionUpdateOneRequiredWithoutCrc_organisation_signupInput
  }

  export type crc_organisation_signupUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_id?: BigIntFieldUpdateOperationsInput | bigint | number
    organisation?: StringFieldUpdateOperationsInput | string
  }

  export type crc_organisation_signupCreateManyInput = {
    id?: bigint | number
    transaction_id: bigint | number
    organisation: string
  }

  export type crc_organisation_signupUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    organisation?: StringFieldUpdateOperationsInput | string
  }

  export type crc_organisation_signupUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_id?: BigIntFieldUpdateOperationsInput | bigint | number
    organisation?: StringFieldUpdateOperationsInput | string
  }

  export type crc_signupCreateInput = {
    id?: bigint | number
    user: string
    token: string
    transaction: transactionCreateNestedOneWithoutCrc_signupInput
  }

  export type crc_signupUncheckedCreateInput = {
    id?: bigint | number
    transaction_id: bigint | number
    user: string
    token: string
  }

  export type crc_signupUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    transaction?: transactionUpdateOneRequiredWithoutCrc_signupInput
  }

  export type crc_signupUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_id?: BigIntFieldUpdateOperationsInput | bigint | number
    user?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type crc_signupCreateManyInput = {
    id?: bigint | number
    transaction_id: bigint | number
    user: string
    token: string
  }

  export type crc_signupUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type crc_signupUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_id?: BigIntFieldUpdateOperationsInput | bigint | number
    user?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type crc_trustCreateInput = {
    id?: bigint | number
    address: string
    can_send_to: string
    limit: bigint | number
    transaction: transactionCreateNestedOneWithoutCrc_trustInput
  }

  export type crc_trustUncheckedCreateInput = {
    id?: bigint | number
    transaction_id: bigint | number
    address: string
    can_send_to: string
    limit: bigint | number
  }

  export type crc_trustUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    address?: StringFieldUpdateOperationsInput | string
    can_send_to?: StringFieldUpdateOperationsInput | string
    limit?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction?: transactionUpdateOneRequiredWithoutCrc_trustInput
  }

  export type crc_trustUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_id?: BigIntFieldUpdateOperationsInput | bigint | number
    address?: StringFieldUpdateOperationsInput | string
    can_send_to?: StringFieldUpdateOperationsInput | string
    limit?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type crc_trustCreateManyInput = {
    id?: bigint | number
    transaction_id: bigint | number
    address: string
    can_send_to: string
    limit: bigint | number
  }

  export type crc_trustUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    address?: StringFieldUpdateOperationsInput | string
    can_send_to?: StringFieldUpdateOperationsInput | string
    limit?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type crc_trustUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_id?: BigIntFieldUpdateOperationsInput | bigint | number
    address?: StringFieldUpdateOperationsInput | string
    can_send_to?: StringFieldUpdateOperationsInput | string
    limit?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type erc20_transferCreateInput = {
    id?: bigint | number
    from: string
    to: string
    token: string
    value: string
    transaction: transactionCreateNestedOneWithoutErc20_transferInput
  }

  export type erc20_transferUncheckedCreateInput = {
    id?: bigint | number
    transaction_id: bigint | number
    from: string
    to: string
    token: string
    value: string
  }

  export type erc20_transferUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    transaction?: transactionUpdateOneRequiredWithoutErc20_transferInput
  }

  export type erc20_transferUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type erc20_transferCreateManyInput = {
    id?: bigint | number
    transaction_id: bigint | number
    from: string
    to: string
    token: string
    value: string
  }

  export type erc20_transferUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type erc20_transferUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type eth_transferCreateInput = {
    id?: bigint | number
    from: string
    to: string
    value: string
    transaction: transactionCreateNestedOneWithoutEth_transferInput
  }

  export type eth_transferUncheckedCreateInput = {
    id?: bigint | number
    transaction_id: bigint | number
    from: string
    to: string
    value: string
  }

  export type eth_transferUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    transaction?: transactionUpdateOneRequiredWithoutEth_transferInput
  }

  export type eth_transferUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type eth_transferCreateManyInput = {
    id?: bigint | number
    transaction_id: bigint | number
    from: string
    to: string
    value: string
  }

  export type eth_transferUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type eth_transferUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type gnosis_safe_eth_transferCreateInput = {
    id?: bigint | number
    initiator: string
    from: string
    to: string
    value: string
    transaction: transactionCreateNestedOneWithoutGnosis_safe_eth_transferInput
  }

  export type gnosis_safe_eth_transferUncheckedCreateInput = {
    id?: bigint | number
    transaction_id: bigint | number
    initiator: string
    from: string
    to: string
    value: string
  }

  export type gnosis_safe_eth_transferUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    initiator?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    transaction?: transactionUpdateOneRequiredWithoutGnosis_safe_eth_transferInput
  }

  export type gnosis_safe_eth_transferUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_id?: BigIntFieldUpdateOperationsInput | bigint | number
    initiator?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type gnosis_safe_eth_transferCreateManyInput = {
    id?: bigint | number
    transaction_id: bigint | number
    initiator: string
    from: string
    to: string
    value: string
  }

  export type gnosis_safe_eth_transferUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    initiator?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type gnosis_safe_eth_transferUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_id?: BigIntFieldUpdateOperationsInput | bigint | number
    initiator?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type transactionCreateInput = {
    id?: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateclassificationInput | Enumerable<string>
    block: blockCreateNestedOneWithoutTransactionInput
    crc_hub_transfer?: crc_hub_transferCreateNestedManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupCreateNestedManyWithoutTransactionInput
    crc_signup?: crc_signupCreateNestedManyWithoutTransactionInput
    crc_trust?: crc_trustCreateNestedManyWithoutTransactionInput
    erc20_transfer?: erc20_transferCreateNestedManyWithoutTransactionInput
    eth_transfer?: eth_transferCreateNestedManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferCreateNestedManyWithoutTransactionInput
  }

  export type transactionUncheckedCreateInput = {
    id?: bigint | number
    block_number: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateclassificationInput | Enumerable<string>
    crc_hub_transfer?: crc_hub_transferUncheckedCreateNestedManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUncheckedCreateNestedManyWithoutTransactionInput
    crc_signup?: crc_signupUncheckedCreateNestedManyWithoutTransactionInput
    crc_trust?: crc_trustUncheckedCreateNestedManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUncheckedCreateNestedManyWithoutTransactionInput
    eth_transfer?: eth_transferUncheckedCreateNestedManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type transactionUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
    block?: blockUpdateOneRequiredWithoutTransactionInput
    crc_hub_transfer?: crc_hub_transferUpdateManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUpdateManyWithoutTransactionInput
    crc_signup?: crc_signupUpdateManyWithoutTransactionInput
    crc_trust?: crc_trustUpdateManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUpdateManyWithoutTransactionInput
    eth_transfer?: eth_transferUpdateManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUpdateManyWithoutTransactionInput
  }

  export type transactionUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    block_number?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
    crc_hub_transfer?: crc_hub_transferUncheckedUpdateManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUncheckedUpdateManyWithoutTransactionInput
    crc_signup?: crc_signupUncheckedUpdateManyWithoutTransactionInput
    crc_trust?: crc_trustUncheckedUpdateManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUncheckedUpdateManyWithoutTransactionInput
    eth_transfer?: eth_transferUncheckedUpdateManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUncheckedUpdateManyWithoutTransactionInput
  }

  export type transactionCreateManyInput = {
    id?: bigint | number
    block_number: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateManyclassificationInput | Enumerable<string>
  }

  export type transactionUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
  }

  export type transactionUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    block_number?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
  }

  export type BigIntFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntFilter | bigint | number
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

  export type TransactionListRelationFilter = {
    every?: transactionWhereInput
    some?: transactionWhereInput
    none?: transactionWhereInput
  }

  export type blockIdx_block_timestampCompoundUniqueInput = {
    timestamp: Date | string
    number: bigint | number
  }

  export type BigIntWithAggregatesFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntWithAggregatesFilter | bigint | number
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
    _sum?: NestedBigIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    sum?: NestedBigIntFilter
    _min?: NestedBigIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedBigIntFilter
    _max?: NestedBigIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedBigIntFilter
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

  export type TransactionRelationFilter = {
    is?: transactionWhereInput
    isNot?: transactionWhereInput
  }

  export type crc_organisation_signupIdx_crc_organisation_signup_organisationCompoundUniqueInput = {
    organisation: string
    transaction_id: bigint | number
  }

  export type crc_signupIdx_crc_signup_tokenCompoundUniqueInput = {
    token: string
    transaction_id: bigint | number
    user: string
  }

  export type crc_signupIdx_crc_signup_userCompoundUniqueInput = {
    user: string
    transaction_id: bigint | number
    token: string
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

  export type StringNullableListFilter = {
    equals?: Enumerable<string> | null
    has?: string | null
    hasEvery?: Enumerable<string>
    hasSome?: Enumerable<string>
    isEmpty?: boolean
  }

  export type BlockRelationFilter = {
    is?: blockWhereInput
    isNot?: blockWhereInput
  }

  export type Crc_hub_transferListRelationFilter = {
    every?: crc_hub_transferWhereInput
    some?: crc_hub_transferWhereInput
    none?: crc_hub_transferWhereInput
  }

  export type Crc_organisation_signupListRelationFilter = {
    every?: crc_organisation_signupWhereInput
    some?: crc_organisation_signupWhereInput
    none?: crc_organisation_signupWhereInput
  }

  export type Crc_signupListRelationFilter = {
    every?: crc_signupWhereInput
    some?: crc_signupWhereInput
    none?: crc_signupWhereInput
  }

  export type Crc_trustListRelationFilter = {
    every?: crc_trustWhereInput
    some?: crc_trustWhereInput
    none?: crc_trustWhereInput
  }

  export type Erc20_transferListRelationFilter = {
    every?: erc20_transferWhereInput
    some?: erc20_transferWhereInput
    none?: erc20_transferWhereInput
  }

  export type Eth_transferListRelationFilter = {
    every?: eth_transferWhereInput
    some?: eth_transferWhereInput
    none?: eth_transferWhereInput
  }

  export type Gnosis_safe_eth_transferListRelationFilter = {
    every?: gnosis_safe_eth_transferWhereInput
    some?: gnosis_safe_eth_transferWhereInput
    none?: gnosis_safe_eth_transferWhereInput
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

  export type transactionCreateNestedManyWithoutBlockInput = {
    create?: XOR<Enumerable<transactionCreateWithoutBlockInput>, Enumerable<transactionUncheckedCreateWithoutBlockInput>>
    connectOrCreate?: Enumerable<transactionCreateOrConnectWithoutBlockInput>
    createMany?: transactionCreateManyBlockInputEnvelope
    connect?: Enumerable<transactionWhereUniqueInput>
  }

  export type transactionUncheckedCreateNestedManyWithoutBlockInput = {
    create?: XOR<Enumerable<transactionCreateWithoutBlockInput>, Enumerable<transactionUncheckedCreateWithoutBlockInput>>
    connectOrCreate?: Enumerable<transactionCreateOrConnectWithoutBlockInput>
    createMany?: transactionCreateManyBlockInputEnvelope
    connect?: Enumerable<transactionWhereUniqueInput>
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type transactionUpdateManyWithoutBlockInput = {
    create?: XOR<Enumerable<transactionCreateWithoutBlockInput>, Enumerable<transactionUncheckedCreateWithoutBlockInput>>
    connectOrCreate?: Enumerable<transactionCreateOrConnectWithoutBlockInput>
    upsert?: Enumerable<transactionUpsertWithWhereUniqueWithoutBlockInput>
    createMany?: transactionCreateManyBlockInputEnvelope
    connect?: Enumerable<transactionWhereUniqueInput>
    set?: Enumerable<transactionWhereUniqueInput>
    disconnect?: Enumerable<transactionWhereUniqueInput>
    delete?: Enumerable<transactionWhereUniqueInput>
    update?: Enumerable<transactionUpdateWithWhereUniqueWithoutBlockInput>
    updateMany?: Enumerable<transactionUpdateManyWithWhereWithoutBlockInput>
    deleteMany?: Enumerable<transactionScalarWhereInput>
  }

  export type transactionUncheckedUpdateManyWithoutBlockInput = {
    create?: XOR<Enumerable<transactionCreateWithoutBlockInput>, Enumerable<transactionUncheckedCreateWithoutBlockInput>>
    connectOrCreate?: Enumerable<transactionCreateOrConnectWithoutBlockInput>
    upsert?: Enumerable<transactionUpsertWithWhereUniqueWithoutBlockInput>
    createMany?: transactionCreateManyBlockInputEnvelope
    connect?: Enumerable<transactionWhereUniqueInput>
    set?: Enumerable<transactionWhereUniqueInput>
    disconnect?: Enumerable<transactionWhereUniqueInput>
    delete?: Enumerable<transactionWhereUniqueInput>
    update?: Enumerable<transactionUpdateWithWhereUniqueWithoutBlockInput>
    updateMany?: Enumerable<transactionUpdateManyWithWhereWithoutBlockInput>
    deleteMany?: Enumerable<transactionScalarWhereInput>
  }

  export type transactionCreateNestedOneWithoutCrc_hub_transferInput = {
    create?: XOR<transactionCreateWithoutCrc_hub_transferInput, transactionUncheckedCreateWithoutCrc_hub_transferInput>
    connectOrCreate?: transactionCreateOrConnectWithoutCrc_hub_transferInput
    connect?: transactionWhereUniqueInput
  }

  export type transactionUpdateOneRequiredWithoutCrc_hub_transferInput = {
    create?: XOR<transactionCreateWithoutCrc_hub_transferInput, transactionUncheckedCreateWithoutCrc_hub_transferInput>
    connectOrCreate?: transactionCreateOrConnectWithoutCrc_hub_transferInput
    upsert?: transactionUpsertWithoutCrc_hub_transferInput
    connect?: transactionWhereUniqueInput
    update?: XOR<transactionUpdateWithoutCrc_hub_transferInput, transactionUncheckedUpdateWithoutCrc_hub_transferInput>
  }

  export type transactionCreateNestedOneWithoutCrc_organisation_signupInput = {
    create?: XOR<transactionCreateWithoutCrc_organisation_signupInput, transactionUncheckedCreateWithoutCrc_organisation_signupInput>
    connectOrCreate?: transactionCreateOrConnectWithoutCrc_organisation_signupInput
    connect?: transactionWhereUniqueInput
  }

  export type transactionUpdateOneRequiredWithoutCrc_organisation_signupInput = {
    create?: XOR<transactionCreateWithoutCrc_organisation_signupInput, transactionUncheckedCreateWithoutCrc_organisation_signupInput>
    connectOrCreate?: transactionCreateOrConnectWithoutCrc_organisation_signupInput
    upsert?: transactionUpsertWithoutCrc_organisation_signupInput
    connect?: transactionWhereUniqueInput
    update?: XOR<transactionUpdateWithoutCrc_organisation_signupInput, transactionUncheckedUpdateWithoutCrc_organisation_signupInput>
  }

  export type transactionCreateNestedOneWithoutCrc_signupInput = {
    create?: XOR<transactionCreateWithoutCrc_signupInput, transactionUncheckedCreateWithoutCrc_signupInput>
    connectOrCreate?: transactionCreateOrConnectWithoutCrc_signupInput
    connect?: transactionWhereUniqueInput
  }

  export type transactionUpdateOneRequiredWithoutCrc_signupInput = {
    create?: XOR<transactionCreateWithoutCrc_signupInput, transactionUncheckedCreateWithoutCrc_signupInput>
    connectOrCreate?: transactionCreateOrConnectWithoutCrc_signupInput
    upsert?: transactionUpsertWithoutCrc_signupInput
    connect?: transactionWhereUniqueInput
    update?: XOR<transactionUpdateWithoutCrc_signupInput, transactionUncheckedUpdateWithoutCrc_signupInput>
  }

  export type transactionCreateNestedOneWithoutCrc_trustInput = {
    create?: XOR<transactionCreateWithoutCrc_trustInput, transactionUncheckedCreateWithoutCrc_trustInput>
    connectOrCreate?: transactionCreateOrConnectWithoutCrc_trustInput
    connect?: transactionWhereUniqueInput
  }

  export type transactionUpdateOneRequiredWithoutCrc_trustInput = {
    create?: XOR<transactionCreateWithoutCrc_trustInput, transactionUncheckedCreateWithoutCrc_trustInput>
    connectOrCreate?: transactionCreateOrConnectWithoutCrc_trustInput
    upsert?: transactionUpsertWithoutCrc_trustInput
    connect?: transactionWhereUniqueInput
    update?: XOR<transactionUpdateWithoutCrc_trustInput, transactionUncheckedUpdateWithoutCrc_trustInput>
  }

  export type transactionCreateNestedOneWithoutErc20_transferInput = {
    create?: XOR<transactionCreateWithoutErc20_transferInput, transactionUncheckedCreateWithoutErc20_transferInput>
    connectOrCreate?: transactionCreateOrConnectWithoutErc20_transferInput
    connect?: transactionWhereUniqueInput
  }

  export type transactionUpdateOneRequiredWithoutErc20_transferInput = {
    create?: XOR<transactionCreateWithoutErc20_transferInput, transactionUncheckedCreateWithoutErc20_transferInput>
    connectOrCreate?: transactionCreateOrConnectWithoutErc20_transferInput
    upsert?: transactionUpsertWithoutErc20_transferInput
    connect?: transactionWhereUniqueInput
    update?: XOR<transactionUpdateWithoutErc20_transferInput, transactionUncheckedUpdateWithoutErc20_transferInput>
  }

  export type transactionCreateNestedOneWithoutEth_transferInput = {
    create?: XOR<transactionCreateWithoutEth_transferInput, transactionUncheckedCreateWithoutEth_transferInput>
    connectOrCreate?: transactionCreateOrConnectWithoutEth_transferInput
    connect?: transactionWhereUniqueInput
  }

  export type transactionUpdateOneRequiredWithoutEth_transferInput = {
    create?: XOR<transactionCreateWithoutEth_transferInput, transactionUncheckedCreateWithoutEth_transferInput>
    connectOrCreate?: transactionCreateOrConnectWithoutEth_transferInput
    upsert?: transactionUpsertWithoutEth_transferInput
    connect?: transactionWhereUniqueInput
    update?: XOR<transactionUpdateWithoutEth_transferInput, transactionUncheckedUpdateWithoutEth_transferInput>
  }

  export type transactionCreateNestedOneWithoutGnosis_safe_eth_transferInput = {
    create?: XOR<transactionCreateWithoutGnosis_safe_eth_transferInput, transactionUncheckedCreateWithoutGnosis_safe_eth_transferInput>
    connectOrCreate?: transactionCreateOrConnectWithoutGnosis_safe_eth_transferInput
    connect?: transactionWhereUniqueInput
  }

  export type transactionUpdateOneRequiredWithoutGnosis_safe_eth_transferInput = {
    create?: XOR<transactionCreateWithoutGnosis_safe_eth_transferInput, transactionUncheckedCreateWithoutGnosis_safe_eth_transferInput>
    connectOrCreate?: transactionCreateOrConnectWithoutGnosis_safe_eth_transferInput
    upsert?: transactionUpsertWithoutGnosis_safe_eth_transferInput
    connect?: transactionWhereUniqueInput
    update?: XOR<transactionUpdateWithoutGnosis_safe_eth_transferInput, transactionUncheckedUpdateWithoutGnosis_safe_eth_transferInput>
  }

  export type transactionCreateclassificationInput = {
    set: Enumerable<string>
  }

  export type blockCreateNestedOneWithoutTransactionInput = {
    create?: XOR<blockCreateWithoutTransactionInput, blockUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: blockCreateOrConnectWithoutTransactionInput
    connect?: blockWhereUniqueInput
  }

  export type crc_hub_transferCreateNestedManyWithoutTransactionInput = {
    create?: XOR<Enumerable<crc_hub_transferCreateWithoutTransactionInput>, Enumerable<crc_hub_transferUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<crc_hub_transferCreateOrConnectWithoutTransactionInput>
    createMany?: crc_hub_transferCreateManyTransactionInputEnvelope
    connect?: Enumerable<crc_hub_transferWhereUniqueInput>
  }

  export type crc_organisation_signupCreateNestedManyWithoutTransactionInput = {
    create?: XOR<Enumerable<crc_organisation_signupCreateWithoutTransactionInput>, Enumerable<crc_organisation_signupUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<crc_organisation_signupCreateOrConnectWithoutTransactionInput>
    createMany?: crc_organisation_signupCreateManyTransactionInputEnvelope
    connect?: Enumerable<crc_organisation_signupWhereUniqueInput>
  }

  export type crc_signupCreateNestedManyWithoutTransactionInput = {
    create?: XOR<Enumerable<crc_signupCreateWithoutTransactionInput>, Enumerable<crc_signupUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<crc_signupCreateOrConnectWithoutTransactionInput>
    createMany?: crc_signupCreateManyTransactionInputEnvelope
    connect?: Enumerable<crc_signupWhereUniqueInput>
  }

  export type crc_trustCreateNestedManyWithoutTransactionInput = {
    create?: XOR<Enumerable<crc_trustCreateWithoutTransactionInput>, Enumerable<crc_trustUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<crc_trustCreateOrConnectWithoutTransactionInput>
    createMany?: crc_trustCreateManyTransactionInputEnvelope
    connect?: Enumerable<crc_trustWhereUniqueInput>
  }

  export type erc20_transferCreateNestedManyWithoutTransactionInput = {
    create?: XOR<Enumerable<erc20_transferCreateWithoutTransactionInput>, Enumerable<erc20_transferUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<erc20_transferCreateOrConnectWithoutTransactionInput>
    createMany?: erc20_transferCreateManyTransactionInputEnvelope
    connect?: Enumerable<erc20_transferWhereUniqueInput>
  }

  export type eth_transferCreateNestedManyWithoutTransactionInput = {
    create?: XOR<Enumerable<eth_transferCreateWithoutTransactionInput>, Enumerable<eth_transferUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<eth_transferCreateOrConnectWithoutTransactionInput>
    createMany?: eth_transferCreateManyTransactionInputEnvelope
    connect?: Enumerable<eth_transferWhereUniqueInput>
  }

  export type gnosis_safe_eth_transferCreateNestedManyWithoutTransactionInput = {
    create?: XOR<Enumerable<gnosis_safe_eth_transferCreateWithoutTransactionInput>, Enumerable<gnosis_safe_eth_transferUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<gnosis_safe_eth_transferCreateOrConnectWithoutTransactionInput>
    createMany?: gnosis_safe_eth_transferCreateManyTransactionInputEnvelope
    connect?: Enumerable<gnosis_safe_eth_transferWhereUniqueInput>
  }

  export type crc_hub_transferUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<Enumerable<crc_hub_transferCreateWithoutTransactionInput>, Enumerable<crc_hub_transferUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<crc_hub_transferCreateOrConnectWithoutTransactionInput>
    createMany?: crc_hub_transferCreateManyTransactionInputEnvelope
    connect?: Enumerable<crc_hub_transferWhereUniqueInput>
  }

  export type crc_organisation_signupUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<Enumerable<crc_organisation_signupCreateWithoutTransactionInput>, Enumerable<crc_organisation_signupUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<crc_organisation_signupCreateOrConnectWithoutTransactionInput>
    createMany?: crc_organisation_signupCreateManyTransactionInputEnvelope
    connect?: Enumerable<crc_organisation_signupWhereUniqueInput>
  }

  export type crc_signupUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<Enumerable<crc_signupCreateWithoutTransactionInput>, Enumerable<crc_signupUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<crc_signupCreateOrConnectWithoutTransactionInput>
    createMany?: crc_signupCreateManyTransactionInputEnvelope
    connect?: Enumerable<crc_signupWhereUniqueInput>
  }

  export type crc_trustUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<Enumerable<crc_trustCreateWithoutTransactionInput>, Enumerable<crc_trustUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<crc_trustCreateOrConnectWithoutTransactionInput>
    createMany?: crc_trustCreateManyTransactionInputEnvelope
    connect?: Enumerable<crc_trustWhereUniqueInput>
  }

  export type erc20_transferUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<Enumerable<erc20_transferCreateWithoutTransactionInput>, Enumerable<erc20_transferUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<erc20_transferCreateOrConnectWithoutTransactionInput>
    createMany?: erc20_transferCreateManyTransactionInputEnvelope
    connect?: Enumerable<erc20_transferWhereUniqueInput>
  }

  export type eth_transferUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<Enumerable<eth_transferCreateWithoutTransactionInput>, Enumerable<eth_transferUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<eth_transferCreateOrConnectWithoutTransactionInput>
    createMany?: eth_transferCreateManyTransactionInputEnvelope
    connect?: Enumerable<eth_transferWhereUniqueInput>
  }

  export type gnosis_safe_eth_transferUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<Enumerable<gnosis_safe_eth_transferCreateWithoutTransactionInput>, Enumerable<gnosis_safe_eth_transferUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<gnosis_safe_eth_transferCreateOrConnectWithoutTransactionInput>
    createMany?: gnosis_safe_eth_transferCreateManyTransactionInputEnvelope
    connect?: Enumerable<gnosis_safe_eth_transferWhereUniqueInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type transactionUpdateclassificationInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type blockUpdateOneRequiredWithoutTransactionInput = {
    create?: XOR<blockCreateWithoutTransactionInput, blockUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: blockCreateOrConnectWithoutTransactionInput
    upsert?: blockUpsertWithoutTransactionInput
    connect?: blockWhereUniqueInput
    update?: XOR<blockUpdateWithoutTransactionInput, blockUncheckedUpdateWithoutTransactionInput>
  }

  export type crc_hub_transferUpdateManyWithoutTransactionInput = {
    create?: XOR<Enumerable<crc_hub_transferCreateWithoutTransactionInput>, Enumerable<crc_hub_transferUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<crc_hub_transferCreateOrConnectWithoutTransactionInput>
    upsert?: Enumerable<crc_hub_transferUpsertWithWhereUniqueWithoutTransactionInput>
    createMany?: crc_hub_transferCreateManyTransactionInputEnvelope
    connect?: Enumerable<crc_hub_transferWhereUniqueInput>
    set?: Enumerable<crc_hub_transferWhereUniqueInput>
    disconnect?: Enumerable<crc_hub_transferWhereUniqueInput>
    delete?: Enumerable<crc_hub_transferWhereUniqueInput>
    update?: Enumerable<crc_hub_transferUpdateWithWhereUniqueWithoutTransactionInput>
    updateMany?: Enumerable<crc_hub_transferUpdateManyWithWhereWithoutTransactionInput>
    deleteMany?: Enumerable<crc_hub_transferScalarWhereInput>
  }

  export type crc_organisation_signupUpdateManyWithoutTransactionInput = {
    create?: XOR<Enumerable<crc_organisation_signupCreateWithoutTransactionInput>, Enumerable<crc_organisation_signupUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<crc_organisation_signupCreateOrConnectWithoutTransactionInput>
    upsert?: Enumerable<crc_organisation_signupUpsertWithWhereUniqueWithoutTransactionInput>
    createMany?: crc_organisation_signupCreateManyTransactionInputEnvelope
    connect?: Enumerable<crc_organisation_signupWhereUniqueInput>
    set?: Enumerable<crc_organisation_signupWhereUniqueInput>
    disconnect?: Enumerable<crc_organisation_signupWhereUniqueInput>
    delete?: Enumerable<crc_organisation_signupWhereUniqueInput>
    update?: Enumerable<crc_organisation_signupUpdateWithWhereUniqueWithoutTransactionInput>
    updateMany?: Enumerable<crc_organisation_signupUpdateManyWithWhereWithoutTransactionInput>
    deleteMany?: Enumerable<crc_organisation_signupScalarWhereInput>
  }

  export type crc_signupUpdateManyWithoutTransactionInput = {
    create?: XOR<Enumerable<crc_signupCreateWithoutTransactionInput>, Enumerable<crc_signupUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<crc_signupCreateOrConnectWithoutTransactionInput>
    upsert?: Enumerable<crc_signupUpsertWithWhereUniqueWithoutTransactionInput>
    createMany?: crc_signupCreateManyTransactionInputEnvelope
    connect?: Enumerable<crc_signupWhereUniqueInput>
    set?: Enumerable<crc_signupWhereUniqueInput>
    disconnect?: Enumerable<crc_signupWhereUniqueInput>
    delete?: Enumerable<crc_signupWhereUniqueInput>
    update?: Enumerable<crc_signupUpdateWithWhereUniqueWithoutTransactionInput>
    updateMany?: Enumerable<crc_signupUpdateManyWithWhereWithoutTransactionInput>
    deleteMany?: Enumerable<crc_signupScalarWhereInput>
  }

  export type crc_trustUpdateManyWithoutTransactionInput = {
    create?: XOR<Enumerable<crc_trustCreateWithoutTransactionInput>, Enumerable<crc_trustUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<crc_trustCreateOrConnectWithoutTransactionInput>
    upsert?: Enumerable<crc_trustUpsertWithWhereUniqueWithoutTransactionInput>
    createMany?: crc_trustCreateManyTransactionInputEnvelope
    connect?: Enumerable<crc_trustWhereUniqueInput>
    set?: Enumerable<crc_trustWhereUniqueInput>
    disconnect?: Enumerable<crc_trustWhereUniqueInput>
    delete?: Enumerable<crc_trustWhereUniqueInput>
    update?: Enumerable<crc_trustUpdateWithWhereUniqueWithoutTransactionInput>
    updateMany?: Enumerable<crc_trustUpdateManyWithWhereWithoutTransactionInput>
    deleteMany?: Enumerable<crc_trustScalarWhereInput>
  }

  export type erc20_transferUpdateManyWithoutTransactionInput = {
    create?: XOR<Enumerable<erc20_transferCreateWithoutTransactionInput>, Enumerable<erc20_transferUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<erc20_transferCreateOrConnectWithoutTransactionInput>
    upsert?: Enumerable<erc20_transferUpsertWithWhereUniqueWithoutTransactionInput>
    createMany?: erc20_transferCreateManyTransactionInputEnvelope
    connect?: Enumerable<erc20_transferWhereUniqueInput>
    set?: Enumerable<erc20_transferWhereUniqueInput>
    disconnect?: Enumerable<erc20_transferWhereUniqueInput>
    delete?: Enumerable<erc20_transferWhereUniqueInput>
    update?: Enumerable<erc20_transferUpdateWithWhereUniqueWithoutTransactionInput>
    updateMany?: Enumerable<erc20_transferUpdateManyWithWhereWithoutTransactionInput>
    deleteMany?: Enumerable<erc20_transferScalarWhereInput>
  }

  export type eth_transferUpdateManyWithoutTransactionInput = {
    create?: XOR<Enumerable<eth_transferCreateWithoutTransactionInput>, Enumerable<eth_transferUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<eth_transferCreateOrConnectWithoutTransactionInput>
    upsert?: Enumerable<eth_transferUpsertWithWhereUniqueWithoutTransactionInput>
    createMany?: eth_transferCreateManyTransactionInputEnvelope
    connect?: Enumerable<eth_transferWhereUniqueInput>
    set?: Enumerable<eth_transferWhereUniqueInput>
    disconnect?: Enumerable<eth_transferWhereUniqueInput>
    delete?: Enumerable<eth_transferWhereUniqueInput>
    update?: Enumerable<eth_transferUpdateWithWhereUniqueWithoutTransactionInput>
    updateMany?: Enumerable<eth_transferUpdateManyWithWhereWithoutTransactionInput>
    deleteMany?: Enumerable<eth_transferScalarWhereInput>
  }

  export type gnosis_safe_eth_transferUpdateManyWithoutTransactionInput = {
    create?: XOR<Enumerable<gnosis_safe_eth_transferCreateWithoutTransactionInput>, Enumerable<gnosis_safe_eth_transferUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<gnosis_safe_eth_transferCreateOrConnectWithoutTransactionInput>
    upsert?: Enumerable<gnosis_safe_eth_transferUpsertWithWhereUniqueWithoutTransactionInput>
    createMany?: gnosis_safe_eth_transferCreateManyTransactionInputEnvelope
    connect?: Enumerable<gnosis_safe_eth_transferWhereUniqueInput>
    set?: Enumerable<gnosis_safe_eth_transferWhereUniqueInput>
    disconnect?: Enumerable<gnosis_safe_eth_transferWhereUniqueInput>
    delete?: Enumerable<gnosis_safe_eth_transferWhereUniqueInput>
    update?: Enumerable<gnosis_safe_eth_transferUpdateWithWhereUniqueWithoutTransactionInput>
    updateMany?: Enumerable<gnosis_safe_eth_transferUpdateManyWithWhereWithoutTransactionInput>
    deleteMany?: Enumerable<gnosis_safe_eth_transferScalarWhereInput>
  }

  export type crc_hub_transferUncheckedUpdateManyWithoutTransactionInput = {
    create?: XOR<Enumerable<crc_hub_transferCreateWithoutTransactionInput>, Enumerable<crc_hub_transferUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<crc_hub_transferCreateOrConnectWithoutTransactionInput>
    upsert?: Enumerable<crc_hub_transferUpsertWithWhereUniqueWithoutTransactionInput>
    createMany?: crc_hub_transferCreateManyTransactionInputEnvelope
    connect?: Enumerable<crc_hub_transferWhereUniqueInput>
    set?: Enumerable<crc_hub_transferWhereUniqueInput>
    disconnect?: Enumerable<crc_hub_transferWhereUniqueInput>
    delete?: Enumerable<crc_hub_transferWhereUniqueInput>
    update?: Enumerable<crc_hub_transferUpdateWithWhereUniqueWithoutTransactionInput>
    updateMany?: Enumerable<crc_hub_transferUpdateManyWithWhereWithoutTransactionInput>
    deleteMany?: Enumerable<crc_hub_transferScalarWhereInput>
  }

  export type crc_organisation_signupUncheckedUpdateManyWithoutTransactionInput = {
    create?: XOR<Enumerable<crc_organisation_signupCreateWithoutTransactionInput>, Enumerable<crc_organisation_signupUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<crc_organisation_signupCreateOrConnectWithoutTransactionInput>
    upsert?: Enumerable<crc_organisation_signupUpsertWithWhereUniqueWithoutTransactionInput>
    createMany?: crc_organisation_signupCreateManyTransactionInputEnvelope
    connect?: Enumerable<crc_organisation_signupWhereUniqueInput>
    set?: Enumerable<crc_organisation_signupWhereUniqueInput>
    disconnect?: Enumerable<crc_organisation_signupWhereUniqueInput>
    delete?: Enumerable<crc_organisation_signupWhereUniqueInput>
    update?: Enumerable<crc_organisation_signupUpdateWithWhereUniqueWithoutTransactionInput>
    updateMany?: Enumerable<crc_organisation_signupUpdateManyWithWhereWithoutTransactionInput>
    deleteMany?: Enumerable<crc_organisation_signupScalarWhereInput>
  }

  export type crc_signupUncheckedUpdateManyWithoutTransactionInput = {
    create?: XOR<Enumerable<crc_signupCreateWithoutTransactionInput>, Enumerable<crc_signupUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<crc_signupCreateOrConnectWithoutTransactionInput>
    upsert?: Enumerable<crc_signupUpsertWithWhereUniqueWithoutTransactionInput>
    createMany?: crc_signupCreateManyTransactionInputEnvelope
    connect?: Enumerable<crc_signupWhereUniqueInput>
    set?: Enumerable<crc_signupWhereUniqueInput>
    disconnect?: Enumerable<crc_signupWhereUniqueInput>
    delete?: Enumerable<crc_signupWhereUniqueInput>
    update?: Enumerable<crc_signupUpdateWithWhereUniqueWithoutTransactionInput>
    updateMany?: Enumerable<crc_signupUpdateManyWithWhereWithoutTransactionInput>
    deleteMany?: Enumerable<crc_signupScalarWhereInput>
  }

  export type crc_trustUncheckedUpdateManyWithoutTransactionInput = {
    create?: XOR<Enumerable<crc_trustCreateWithoutTransactionInput>, Enumerable<crc_trustUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<crc_trustCreateOrConnectWithoutTransactionInput>
    upsert?: Enumerable<crc_trustUpsertWithWhereUniqueWithoutTransactionInput>
    createMany?: crc_trustCreateManyTransactionInputEnvelope
    connect?: Enumerable<crc_trustWhereUniqueInput>
    set?: Enumerable<crc_trustWhereUniqueInput>
    disconnect?: Enumerable<crc_trustWhereUniqueInput>
    delete?: Enumerable<crc_trustWhereUniqueInput>
    update?: Enumerable<crc_trustUpdateWithWhereUniqueWithoutTransactionInput>
    updateMany?: Enumerable<crc_trustUpdateManyWithWhereWithoutTransactionInput>
    deleteMany?: Enumerable<crc_trustScalarWhereInput>
  }

  export type erc20_transferUncheckedUpdateManyWithoutTransactionInput = {
    create?: XOR<Enumerable<erc20_transferCreateWithoutTransactionInput>, Enumerable<erc20_transferUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<erc20_transferCreateOrConnectWithoutTransactionInput>
    upsert?: Enumerable<erc20_transferUpsertWithWhereUniqueWithoutTransactionInput>
    createMany?: erc20_transferCreateManyTransactionInputEnvelope
    connect?: Enumerable<erc20_transferWhereUniqueInput>
    set?: Enumerable<erc20_transferWhereUniqueInput>
    disconnect?: Enumerable<erc20_transferWhereUniqueInput>
    delete?: Enumerable<erc20_transferWhereUniqueInput>
    update?: Enumerable<erc20_transferUpdateWithWhereUniqueWithoutTransactionInput>
    updateMany?: Enumerable<erc20_transferUpdateManyWithWhereWithoutTransactionInput>
    deleteMany?: Enumerable<erc20_transferScalarWhereInput>
  }

  export type eth_transferUncheckedUpdateManyWithoutTransactionInput = {
    create?: XOR<Enumerable<eth_transferCreateWithoutTransactionInput>, Enumerable<eth_transferUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<eth_transferCreateOrConnectWithoutTransactionInput>
    upsert?: Enumerable<eth_transferUpsertWithWhereUniqueWithoutTransactionInput>
    createMany?: eth_transferCreateManyTransactionInputEnvelope
    connect?: Enumerable<eth_transferWhereUniqueInput>
    set?: Enumerable<eth_transferWhereUniqueInput>
    disconnect?: Enumerable<eth_transferWhereUniqueInput>
    delete?: Enumerable<eth_transferWhereUniqueInput>
    update?: Enumerable<eth_transferUpdateWithWhereUniqueWithoutTransactionInput>
    updateMany?: Enumerable<eth_transferUpdateManyWithWhereWithoutTransactionInput>
    deleteMany?: Enumerable<eth_transferScalarWhereInput>
  }

  export type gnosis_safe_eth_transferUncheckedUpdateManyWithoutTransactionInput = {
    create?: XOR<Enumerable<gnosis_safe_eth_transferCreateWithoutTransactionInput>, Enumerable<gnosis_safe_eth_transferUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<gnosis_safe_eth_transferCreateOrConnectWithoutTransactionInput>
    upsert?: Enumerable<gnosis_safe_eth_transferUpsertWithWhereUniqueWithoutTransactionInput>
    createMany?: gnosis_safe_eth_transferCreateManyTransactionInputEnvelope
    connect?: Enumerable<gnosis_safe_eth_transferWhereUniqueInput>
    set?: Enumerable<gnosis_safe_eth_transferWhereUniqueInput>
    disconnect?: Enumerable<gnosis_safe_eth_transferWhereUniqueInput>
    delete?: Enumerable<gnosis_safe_eth_transferWhereUniqueInput>
    update?: Enumerable<gnosis_safe_eth_transferUpdateWithWhereUniqueWithoutTransactionInput>
    updateMany?: Enumerable<gnosis_safe_eth_transferUpdateManyWithWhereWithoutTransactionInput>
    deleteMany?: Enumerable<gnosis_safe_eth_transferScalarWhereInput>
  }

  export type transactionCreateManyclassificationInput = {
    set: Enumerable<string>
  }

  export type NestedBigIntFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntFilter | bigint | number
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

  export type NestedBigIntWithAggregatesFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntWithAggregatesFilter | bigint | number
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
    _sum?: NestedBigIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    sum?: NestedBigIntFilter
    _min?: NestedBigIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedBigIntFilter
    _max?: NestedBigIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedBigIntFilter
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

  export type transactionCreateWithoutBlockInput = {
    id?: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateclassificationInput | Enumerable<string>
    crc_hub_transfer?: crc_hub_transferCreateNestedManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupCreateNestedManyWithoutTransactionInput
    crc_signup?: crc_signupCreateNestedManyWithoutTransactionInput
    crc_trust?: crc_trustCreateNestedManyWithoutTransactionInput
    erc20_transfer?: erc20_transferCreateNestedManyWithoutTransactionInput
    eth_transfer?: eth_transferCreateNestedManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferCreateNestedManyWithoutTransactionInput
  }

  export type transactionUncheckedCreateWithoutBlockInput = {
    id?: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateclassificationInput | Enumerable<string>
    crc_hub_transfer?: crc_hub_transferUncheckedCreateNestedManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUncheckedCreateNestedManyWithoutTransactionInput
    crc_signup?: crc_signupUncheckedCreateNestedManyWithoutTransactionInput
    crc_trust?: crc_trustUncheckedCreateNestedManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUncheckedCreateNestedManyWithoutTransactionInput
    eth_transfer?: eth_transferUncheckedCreateNestedManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type transactionCreateOrConnectWithoutBlockInput = {
    where: transactionWhereUniqueInput
    create: XOR<transactionCreateWithoutBlockInput, transactionUncheckedCreateWithoutBlockInput>
  }

  export type transactionCreateManyBlockInputEnvelope = {
    data: Enumerable<transactionCreateManyBlockInput>
    skipDuplicates?: boolean
  }

  export type transactionUpsertWithWhereUniqueWithoutBlockInput = {
    where: transactionWhereUniqueInput
    update: XOR<transactionUpdateWithoutBlockInput, transactionUncheckedUpdateWithoutBlockInput>
    create: XOR<transactionCreateWithoutBlockInput, transactionUncheckedCreateWithoutBlockInput>
  }

  export type transactionUpdateWithWhereUniqueWithoutBlockInput = {
    where: transactionWhereUniqueInput
    data: XOR<transactionUpdateWithoutBlockInput, transactionUncheckedUpdateWithoutBlockInput>
  }

  export type transactionUpdateManyWithWhereWithoutBlockInput = {
    where: transactionScalarWhereInput
    data: XOR<transactionUpdateManyMutationInput, transactionUncheckedUpdateManyWithoutTransactionInput>
  }

  export type transactionScalarWhereInput = {
    AND?: Enumerable<transactionScalarWhereInput>
    OR?: Enumerable<transactionScalarWhereInput>
    NOT?: Enumerable<transactionScalarWhereInput>
    id?: BigIntFilter | bigint | number
    block_number?: BigIntFilter | bigint | number
    from?: StringFilter | string
    to?: StringNullableFilter | string | null
    index?: IntFilter | number
    gas?: StringFilter | string
    hash?: StringFilter | string
    value?: StringFilter | string
    input?: StringNullableFilter | string | null
    nonce?: StringNullableFilter | string | null
    type?: StringNullableFilter | string | null
    gas_price?: StringNullableFilter | string | null
    classification?: StringNullableListFilter
  }

  export type transactionCreateWithoutCrc_hub_transferInput = {
    id?: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateclassificationInput | Enumerable<string>
    block: blockCreateNestedOneWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupCreateNestedManyWithoutTransactionInput
    crc_signup?: crc_signupCreateNestedManyWithoutTransactionInput
    crc_trust?: crc_trustCreateNestedManyWithoutTransactionInput
    erc20_transfer?: erc20_transferCreateNestedManyWithoutTransactionInput
    eth_transfer?: eth_transferCreateNestedManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferCreateNestedManyWithoutTransactionInput
  }

  export type transactionUncheckedCreateWithoutCrc_hub_transferInput = {
    id?: bigint | number
    block_number: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateclassificationInput | Enumerable<string>
    crc_organisation_signup?: crc_organisation_signupUncheckedCreateNestedManyWithoutTransactionInput
    crc_signup?: crc_signupUncheckedCreateNestedManyWithoutTransactionInput
    crc_trust?: crc_trustUncheckedCreateNestedManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUncheckedCreateNestedManyWithoutTransactionInput
    eth_transfer?: eth_transferUncheckedCreateNestedManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type transactionCreateOrConnectWithoutCrc_hub_transferInput = {
    where: transactionWhereUniqueInput
    create: XOR<transactionCreateWithoutCrc_hub_transferInput, transactionUncheckedCreateWithoutCrc_hub_transferInput>
  }

  export type transactionUpsertWithoutCrc_hub_transferInput = {
    update: XOR<transactionUpdateWithoutCrc_hub_transferInput, transactionUncheckedUpdateWithoutCrc_hub_transferInput>
    create: XOR<transactionCreateWithoutCrc_hub_transferInput, transactionUncheckedCreateWithoutCrc_hub_transferInput>
  }

  export type transactionUpdateWithoutCrc_hub_transferInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
    block?: blockUpdateOneRequiredWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUpdateManyWithoutTransactionInput
    crc_signup?: crc_signupUpdateManyWithoutTransactionInput
    crc_trust?: crc_trustUpdateManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUpdateManyWithoutTransactionInput
    eth_transfer?: eth_transferUpdateManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUpdateManyWithoutTransactionInput
  }

  export type transactionUncheckedUpdateWithoutCrc_hub_transferInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    block_number?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
    crc_organisation_signup?: crc_organisation_signupUncheckedUpdateManyWithoutTransactionInput
    crc_signup?: crc_signupUncheckedUpdateManyWithoutTransactionInput
    crc_trust?: crc_trustUncheckedUpdateManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUncheckedUpdateManyWithoutTransactionInput
    eth_transfer?: eth_transferUncheckedUpdateManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUncheckedUpdateManyWithoutTransactionInput
  }

  export type transactionCreateWithoutCrc_organisation_signupInput = {
    id?: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateclassificationInput | Enumerable<string>
    block: blockCreateNestedOneWithoutTransactionInput
    crc_hub_transfer?: crc_hub_transferCreateNestedManyWithoutTransactionInput
    crc_signup?: crc_signupCreateNestedManyWithoutTransactionInput
    crc_trust?: crc_trustCreateNestedManyWithoutTransactionInput
    erc20_transfer?: erc20_transferCreateNestedManyWithoutTransactionInput
    eth_transfer?: eth_transferCreateNestedManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferCreateNestedManyWithoutTransactionInput
  }

  export type transactionUncheckedCreateWithoutCrc_organisation_signupInput = {
    id?: bigint | number
    block_number: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateclassificationInput | Enumerable<string>
    crc_hub_transfer?: crc_hub_transferUncheckedCreateNestedManyWithoutTransactionInput
    crc_signup?: crc_signupUncheckedCreateNestedManyWithoutTransactionInput
    crc_trust?: crc_trustUncheckedCreateNestedManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUncheckedCreateNestedManyWithoutTransactionInput
    eth_transfer?: eth_transferUncheckedCreateNestedManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type transactionCreateOrConnectWithoutCrc_organisation_signupInput = {
    where: transactionWhereUniqueInput
    create: XOR<transactionCreateWithoutCrc_organisation_signupInput, transactionUncheckedCreateWithoutCrc_organisation_signupInput>
  }

  export type transactionUpsertWithoutCrc_organisation_signupInput = {
    update: XOR<transactionUpdateWithoutCrc_organisation_signupInput, transactionUncheckedUpdateWithoutCrc_organisation_signupInput>
    create: XOR<transactionCreateWithoutCrc_organisation_signupInput, transactionUncheckedCreateWithoutCrc_organisation_signupInput>
  }

  export type transactionUpdateWithoutCrc_organisation_signupInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
    block?: blockUpdateOneRequiredWithoutTransactionInput
    crc_hub_transfer?: crc_hub_transferUpdateManyWithoutTransactionInput
    crc_signup?: crc_signupUpdateManyWithoutTransactionInput
    crc_trust?: crc_trustUpdateManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUpdateManyWithoutTransactionInput
    eth_transfer?: eth_transferUpdateManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUpdateManyWithoutTransactionInput
  }

  export type transactionUncheckedUpdateWithoutCrc_organisation_signupInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    block_number?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
    crc_hub_transfer?: crc_hub_transferUncheckedUpdateManyWithoutTransactionInput
    crc_signup?: crc_signupUncheckedUpdateManyWithoutTransactionInput
    crc_trust?: crc_trustUncheckedUpdateManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUncheckedUpdateManyWithoutTransactionInput
    eth_transfer?: eth_transferUncheckedUpdateManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUncheckedUpdateManyWithoutTransactionInput
  }

  export type transactionCreateWithoutCrc_signupInput = {
    id?: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateclassificationInput | Enumerable<string>
    block: blockCreateNestedOneWithoutTransactionInput
    crc_hub_transfer?: crc_hub_transferCreateNestedManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupCreateNestedManyWithoutTransactionInput
    crc_trust?: crc_trustCreateNestedManyWithoutTransactionInput
    erc20_transfer?: erc20_transferCreateNestedManyWithoutTransactionInput
    eth_transfer?: eth_transferCreateNestedManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferCreateNestedManyWithoutTransactionInput
  }

  export type transactionUncheckedCreateWithoutCrc_signupInput = {
    id?: bigint | number
    block_number: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateclassificationInput | Enumerable<string>
    crc_hub_transfer?: crc_hub_transferUncheckedCreateNestedManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUncheckedCreateNestedManyWithoutTransactionInput
    crc_trust?: crc_trustUncheckedCreateNestedManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUncheckedCreateNestedManyWithoutTransactionInput
    eth_transfer?: eth_transferUncheckedCreateNestedManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type transactionCreateOrConnectWithoutCrc_signupInput = {
    where: transactionWhereUniqueInput
    create: XOR<transactionCreateWithoutCrc_signupInput, transactionUncheckedCreateWithoutCrc_signupInput>
  }

  export type transactionUpsertWithoutCrc_signupInput = {
    update: XOR<transactionUpdateWithoutCrc_signupInput, transactionUncheckedUpdateWithoutCrc_signupInput>
    create: XOR<transactionCreateWithoutCrc_signupInput, transactionUncheckedCreateWithoutCrc_signupInput>
  }

  export type transactionUpdateWithoutCrc_signupInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
    block?: blockUpdateOneRequiredWithoutTransactionInput
    crc_hub_transfer?: crc_hub_transferUpdateManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUpdateManyWithoutTransactionInput
    crc_trust?: crc_trustUpdateManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUpdateManyWithoutTransactionInput
    eth_transfer?: eth_transferUpdateManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUpdateManyWithoutTransactionInput
  }

  export type transactionUncheckedUpdateWithoutCrc_signupInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    block_number?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
    crc_hub_transfer?: crc_hub_transferUncheckedUpdateManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUncheckedUpdateManyWithoutTransactionInput
    crc_trust?: crc_trustUncheckedUpdateManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUncheckedUpdateManyWithoutTransactionInput
    eth_transfer?: eth_transferUncheckedUpdateManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUncheckedUpdateManyWithoutTransactionInput
  }

  export type transactionCreateWithoutCrc_trustInput = {
    id?: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateclassificationInput | Enumerable<string>
    block: blockCreateNestedOneWithoutTransactionInput
    crc_hub_transfer?: crc_hub_transferCreateNestedManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupCreateNestedManyWithoutTransactionInput
    crc_signup?: crc_signupCreateNestedManyWithoutTransactionInput
    erc20_transfer?: erc20_transferCreateNestedManyWithoutTransactionInput
    eth_transfer?: eth_transferCreateNestedManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferCreateNestedManyWithoutTransactionInput
  }

  export type transactionUncheckedCreateWithoutCrc_trustInput = {
    id?: bigint | number
    block_number: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateclassificationInput | Enumerable<string>
    crc_hub_transfer?: crc_hub_transferUncheckedCreateNestedManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUncheckedCreateNestedManyWithoutTransactionInput
    crc_signup?: crc_signupUncheckedCreateNestedManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUncheckedCreateNestedManyWithoutTransactionInput
    eth_transfer?: eth_transferUncheckedCreateNestedManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type transactionCreateOrConnectWithoutCrc_trustInput = {
    where: transactionWhereUniqueInput
    create: XOR<transactionCreateWithoutCrc_trustInput, transactionUncheckedCreateWithoutCrc_trustInput>
  }

  export type transactionUpsertWithoutCrc_trustInput = {
    update: XOR<transactionUpdateWithoutCrc_trustInput, transactionUncheckedUpdateWithoutCrc_trustInput>
    create: XOR<transactionCreateWithoutCrc_trustInput, transactionUncheckedCreateWithoutCrc_trustInput>
  }

  export type transactionUpdateWithoutCrc_trustInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
    block?: blockUpdateOneRequiredWithoutTransactionInput
    crc_hub_transfer?: crc_hub_transferUpdateManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUpdateManyWithoutTransactionInput
    crc_signup?: crc_signupUpdateManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUpdateManyWithoutTransactionInput
    eth_transfer?: eth_transferUpdateManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUpdateManyWithoutTransactionInput
  }

  export type transactionUncheckedUpdateWithoutCrc_trustInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    block_number?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
    crc_hub_transfer?: crc_hub_transferUncheckedUpdateManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUncheckedUpdateManyWithoutTransactionInput
    crc_signup?: crc_signupUncheckedUpdateManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUncheckedUpdateManyWithoutTransactionInput
    eth_transfer?: eth_transferUncheckedUpdateManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUncheckedUpdateManyWithoutTransactionInput
  }

  export type transactionCreateWithoutErc20_transferInput = {
    id?: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateclassificationInput | Enumerable<string>
    block: blockCreateNestedOneWithoutTransactionInput
    crc_hub_transfer?: crc_hub_transferCreateNestedManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupCreateNestedManyWithoutTransactionInput
    crc_signup?: crc_signupCreateNestedManyWithoutTransactionInput
    crc_trust?: crc_trustCreateNestedManyWithoutTransactionInput
    eth_transfer?: eth_transferCreateNestedManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferCreateNestedManyWithoutTransactionInput
  }

  export type transactionUncheckedCreateWithoutErc20_transferInput = {
    id?: bigint | number
    block_number: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateclassificationInput | Enumerable<string>
    crc_hub_transfer?: crc_hub_transferUncheckedCreateNestedManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUncheckedCreateNestedManyWithoutTransactionInput
    crc_signup?: crc_signupUncheckedCreateNestedManyWithoutTransactionInput
    crc_trust?: crc_trustUncheckedCreateNestedManyWithoutTransactionInput
    eth_transfer?: eth_transferUncheckedCreateNestedManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type transactionCreateOrConnectWithoutErc20_transferInput = {
    where: transactionWhereUniqueInput
    create: XOR<transactionCreateWithoutErc20_transferInput, transactionUncheckedCreateWithoutErc20_transferInput>
  }

  export type transactionUpsertWithoutErc20_transferInput = {
    update: XOR<transactionUpdateWithoutErc20_transferInput, transactionUncheckedUpdateWithoutErc20_transferInput>
    create: XOR<transactionCreateWithoutErc20_transferInput, transactionUncheckedCreateWithoutErc20_transferInput>
  }

  export type transactionUpdateWithoutErc20_transferInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
    block?: blockUpdateOneRequiredWithoutTransactionInput
    crc_hub_transfer?: crc_hub_transferUpdateManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUpdateManyWithoutTransactionInput
    crc_signup?: crc_signupUpdateManyWithoutTransactionInput
    crc_trust?: crc_trustUpdateManyWithoutTransactionInput
    eth_transfer?: eth_transferUpdateManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUpdateManyWithoutTransactionInput
  }

  export type transactionUncheckedUpdateWithoutErc20_transferInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    block_number?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
    crc_hub_transfer?: crc_hub_transferUncheckedUpdateManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUncheckedUpdateManyWithoutTransactionInput
    crc_signup?: crc_signupUncheckedUpdateManyWithoutTransactionInput
    crc_trust?: crc_trustUncheckedUpdateManyWithoutTransactionInput
    eth_transfer?: eth_transferUncheckedUpdateManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUncheckedUpdateManyWithoutTransactionInput
  }

  export type transactionCreateWithoutEth_transferInput = {
    id?: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateclassificationInput | Enumerable<string>
    block: blockCreateNestedOneWithoutTransactionInput
    crc_hub_transfer?: crc_hub_transferCreateNestedManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupCreateNestedManyWithoutTransactionInput
    crc_signup?: crc_signupCreateNestedManyWithoutTransactionInput
    crc_trust?: crc_trustCreateNestedManyWithoutTransactionInput
    erc20_transfer?: erc20_transferCreateNestedManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferCreateNestedManyWithoutTransactionInput
  }

  export type transactionUncheckedCreateWithoutEth_transferInput = {
    id?: bigint | number
    block_number: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateclassificationInput | Enumerable<string>
    crc_hub_transfer?: crc_hub_transferUncheckedCreateNestedManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUncheckedCreateNestedManyWithoutTransactionInput
    crc_signup?: crc_signupUncheckedCreateNestedManyWithoutTransactionInput
    crc_trust?: crc_trustUncheckedCreateNestedManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUncheckedCreateNestedManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type transactionCreateOrConnectWithoutEth_transferInput = {
    where: transactionWhereUniqueInput
    create: XOR<transactionCreateWithoutEth_transferInput, transactionUncheckedCreateWithoutEth_transferInput>
  }

  export type transactionUpsertWithoutEth_transferInput = {
    update: XOR<transactionUpdateWithoutEth_transferInput, transactionUncheckedUpdateWithoutEth_transferInput>
    create: XOR<transactionCreateWithoutEth_transferInput, transactionUncheckedCreateWithoutEth_transferInput>
  }

  export type transactionUpdateWithoutEth_transferInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
    block?: blockUpdateOneRequiredWithoutTransactionInput
    crc_hub_transfer?: crc_hub_transferUpdateManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUpdateManyWithoutTransactionInput
    crc_signup?: crc_signupUpdateManyWithoutTransactionInput
    crc_trust?: crc_trustUpdateManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUpdateManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUpdateManyWithoutTransactionInput
  }

  export type transactionUncheckedUpdateWithoutEth_transferInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    block_number?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
    crc_hub_transfer?: crc_hub_transferUncheckedUpdateManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUncheckedUpdateManyWithoutTransactionInput
    crc_signup?: crc_signupUncheckedUpdateManyWithoutTransactionInput
    crc_trust?: crc_trustUncheckedUpdateManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUncheckedUpdateManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUncheckedUpdateManyWithoutTransactionInput
  }

  export type transactionCreateWithoutGnosis_safe_eth_transferInput = {
    id?: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateclassificationInput | Enumerable<string>
    block: blockCreateNestedOneWithoutTransactionInput
    crc_hub_transfer?: crc_hub_transferCreateNestedManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupCreateNestedManyWithoutTransactionInput
    crc_signup?: crc_signupCreateNestedManyWithoutTransactionInput
    crc_trust?: crc_trustCreateNestedManyWithoutTransactionInput
    erc20_transfer?: erc20_transferCreateNestedManyWithoutTransactionInput
    eth_transfer?: eth_transferCreateNestedManyWithoutTransactionInput
  }

  export type transactionUncheckedCreateWithoutGnosis_safe_eth_transferInput = {
    id?: bigint | number
    block_number: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateclassificationInput | Enumerable<string>
    crc_hub_transfer?: crc_hub_transferUncheckedCreateNestedManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUncheckedCreateNestedManyWithoutTransactionInput
    crc_signup?: crc_signupUncheckedCreateNestedManyWithoutTransactionInput
    crc_trust?: crc_trustUncheckedCreateNestedManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUncheckedCreateNestedManyWithoutTransactionInput
    eth_transfer?: eth_transferUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type transactionCreateOrConnectWithoutGnosis_safe_eth_transferInput = {
    where: transactionWhereUniqueInput
    create: XOR<transactionCreateWithoutGnosis_safe_eth_transferInput, transactionUncheckedCreateWithoutGnosis_safe_eth_transferInput>
  }

  export type transactionUpsertWithoutGnosis_safe_eth_transferInput = {
    update: XOR<transactionUpdateWithoutGnosis_safe_eth_transferInput, transactionUncheckedUpdateWithoutGnosis_safe_eth_transferInput>
    create: XOR<transactionCreateWithoutGnosis_safe_eth_transferInput, transactionUncheckedCreateWithoutGnosis_safe_eth_transferInput>
  }

  export type transactionUpdateWithoutGnosis_safe_eth_transferInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
    block?: blockUpdateOneRequiredWithoutTransactionInput
    crc_hub_transfer?: crc_hub_transferUpdateManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUpdateManyWithoutTransactionInput
    crc_signup?: crc_signupUpdateManyWithoutTransactionInput
    crc_trust?: crc_trustUpdateManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUpdateManyWithoutTransactionInput
    eth_transfer?: eth_transferUpdateManyWithoutTransactionInput
  }

  export type transactionUncheckedUpdateWithoutGnosis_safe_eth_transferInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    block_number?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
    crc_hub_transfer?: crc_hub_transferUncheckedUpdateManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUncheckedUpdateManyWithoutTransactionInput
    crc_signup?: crc_signupUncheckedUpdateManyWithoutTransactionInput
    crc_trust?: crc_trustUncheckedUpdateManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUncheckedUpdateManyWithoutTransactionInput
    eth_transfer?: eth_transferUncheckedUpdateManyWithoutTransactionInput
  }

  export type blockCreateWithoutTransactionInput = {
    number?: bigint | number
    hash: string
    timestamp: Date | string
    total_transaction_count: number
    indexed_transaction_count: number
  }

  export type blockUncheckedCreateWithoutTransactionInput = {
    number?: bigint | number
    hash: string
    timestamp: Date | string
    total_transaction_count: number
    indexed_transaction_count: number
  }

  export type blockCreateOrConnectWithoutTransactionInput = {
    where: blockWhereUniqueInput
    create: XOR<blockCreateWithoutTransactionInput, blockUncheckedCreateWithoutTransactionInput>
  }

  export type crc_hub_transferCreateWithoutTransactionInput = {
    id?: bigint | number
    from: string
    to: string
    value: string
  }

  export type crc_hub_transferUncheckedCreateWithoutTransactionInput = {
    id?: bigint | number
    from: string
    to: string
    value: string
  }

  export type crc_hub_transferCreateOrConnectWithoutTransactionInput = {
    where: crc_hub_transferWhereUniqueInput
    create: XOR<crc_hub_transferCreateWithoutTransactionInput, crc_hub_transferUncheckedCreateWithoutTransactionInput>
  }

  export type crc_hub_transferCreateManyTransactionInputEnvelope = {
    data: Enumerable<crc_hub_transferCreateManyTransactionInput>
    skipDuplicates?: boolean
  }

  export type crc_organisation_signupCreateWithoutTransactionInput = {
    id?: bigint | number
    organisation: string
  }

  export type crc_organisation_signupUncheckedCreateWithoutTransactionInput = {
    id?: bigint | number
    organisation: string
  }

  export type crc_organisation_signupCreateOrConnectWithoutTransactionInput = {
    where: crc_organisation_signupWhereUniqueInput
    create: XOR<crc_organisation_signupCreateWithoutTransactionInput, crc_organisation_signupUncheckedCreateWithoutTransactionInput>
  }

  export type crc_organisation_signupCreateManyTransactionInputEnvelope = {
    data: Enumerable<crc_organisation_signupCreateManyTransactionInput>
    skipDuplicates?: boolean
  }

  export type crc_signupCreateWithoutTransactionInput = {
    id?: bigint | number
    user: string
    token: string
  }

  export type crc_signupUncheckedCreateWithoutTransactionInput = {
    id?: bigint | number
    user: string
    token: string
  }

  export type crc_signupCreateOrConnectWithoutTransactionInput = {
    where: crc_signupWhereUniqueInput
    create: XOR<crc_signupCreateWithoutTransactionInput, crc_signupUncheckedCreateWithoutTransactionInput>
  }

  export type crc_signupCreateManyTransactionInputEnvelope = {
    data: Enumerable<crc_signupCreateManyTransactionInput>
    skipDuplicates?: boolean
  }

  export type crc_trustCreateWithoutTransactionInput = {
    id?: bigint | number
    address: string
    can_send_to: string
    limit: bigint | number
  }

  export type crc_trustUncheckedCreateWithoutTransactionInput = {
    id?: bigint | number
    address: string
    can_send_to: string
    limit: bigint | number
  }

  export type crc_trustCreateOrConnectWithoutTransactionInput = {
    where: crc_trustWhereUniqueInput
    create: XOR<crc_trustCreateWithoutTransactionInput, crc_trustUncheckedCreateWithoutTransactionInput>
  }

  export type crc_trustCreateManyTransactionInputEnvelope = {
    data: Enumerable<crc_trustCreateManyTransactionInput>
    skipDuplicates?: boolean
  }

  export type erc20_transferCreateWithoutTransactionInput = {
    id?: bigint | number
    from: string
    to: string
    token: string
    value: string
  }

  export type erc20_transferUncheckedCreateWithoutTransactionInput = {
    id?: bigint | number
    from: string
    to: string
    token: string
    value: string
  }

  export type erc20_transferCreateOrConnectWithoutTransactionInput = {
    where: erc20_transferWhereUniqueInput
    create: XOR<erc20_transferCreateWithoutTransactionInput, erc20_transferUncheckedCreateWithoutTransactionInput>
  }

  export type erc20_transferCreateManyTransactionInputEnvelope = {
    data: Enumerable<erc20_transferCreateManyTransactionInput>
    skipDuplicates?: boolean
  }

  export type eth_transferCreateWithoutTransactionInput = {
    id?: bigint | number
    from: string
    to: string
    value: string
  }

  export type eth_transferUncheckedCreateWithoutTransactionInput = {
    id?: bigint | number
    from: string
    to: string
    value: string
  }

  export type eth_transferCreateOrConnectWithoutTransactionInput = {
    where: eth_transferWhereUniqueInput
    create: XOR<eth_transferCreateWithoutTransactionInput, eth_transferUncheckedCreateWithoutTransactionInput>
  }

  export type eth_transferCreateManyTransactionInputEnvelope = {
    data: Enumerable<eth_transferCreateManyTransactionInput>
    skipDuplicates?: boolean
  }

  export type gnosis_safe_eth_transferCreateWithoutTransactionInput = {
    id?: bigint | number
    initiator: string
    from: string
    to: string
    value: string
  }

  export type gnosis_safe_eth_transferUncheckedCreateWithoutTransactionInput = {
    id?: bigint | number
    initiator: string
    from: string
    to: string
    value: string
  }

  export type gnosis_safe_eth_transferCreateOrConnectWithoutTransactionInput = {
    where: gnosis_safe_eth_transferWhereUniqueInput
    create: XOR<gnosis_safe_eth_transferCreateWithoutTransactionInput, gnosis_safe_eth_transferUncheckedCreateWithoutTransactionInput>
  }

  export type gnosis_safe_eth_transferCreateManyTransactionInputEnvelope = {
    data: Enumerable<gnosis_safe_eth_transferCreateManyTransactionInput>
    skipDuplicates?: boolean
  }

  export type blockUpsertWithoutTransactionInput = {
    update: XOR<blockUpdateWithoutTransactionInput, blockUncheckedUpdateWithoutTransactionInput>
    create: XOR<blockCreateWithoutTransactionInput, blockUncheckedCreateWithoutTransactionInput>
  }

  export type blockUpdateWithoutTransactionInput = {
    number?: BigIntFieldUpdateOperationsInput | bigint | number
    hash?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    total_transaction_count?: IntFieldUpdateOperationsInput | number
    indexed_transaction_count?: IntFieldUpdateOperationsInput | number
  }

  export type blockUncheckedUpdateWithoutTransactionInput = {
    number?: BigIntFieldUpdateOperationsInput | bigint | number
    hash?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    total_transaction_count?: IntFieldUpdateOperationsInput | number
    indexed_transaction_count?: IntFieldUpdateOperationsInput | number
  }

  export type crc_hub_transferUpsertWithWhereUniqueWithoutTransactionInput = {
    where: crc_hub_transferWhereUniqueInput
    update: XOR<crc_hub_transferUpdateWithoutTransactionInput, crc_hub_transferUncheckedUpdateWithoutTransactionInput>
    create: XOR<crc_hub_transferCreateWithoutTransactionInput, crc_hub_transferUncheckedCreateWithoutTransactionInput>
  }

  export type crc_hub_transferUpdateWithWhereUniqueWithoutTransactionInput = {
    where: crc_hub_transferWhereUniqueInput
    data: XOR<crc_hub_transferUpdateWithoutTransactionInput, crc_hub_transferUncheckedUpdateWithoutTransactionInput>
  }

  export type crc_hub_transferUpdateManyWithWhereWithoutTransactionInput = {
    where: crc_hub_transferScalarWhereInput
    data: XOR<crc_hub_transferUpdateManyMutationInput, crc_hub_transferUncheckedUpdateManyWithoutCrc_hub_transferInput>
  }

  export type crc_hub_transferScalarWhereInput = {
    AND?: Enumerable<crc_hub_transferScalarWhereInput>
    OR?: Enumerable<crc_hub_transferScalarWhereInput>
    NOT?: Enumerable<crc_hub_transferScalarWhereInput>
    id?: BigIntFilter | bigint | number
    transaction_id?: BigIntFilter | bigint | number
    from?: StringFilter | string
    to?: StringFilter | string
    value?: StringFilter | string
  }

  export type crc_organisation_signupUpsertWithWhereUniqueWithoutTransactionInput = {
    where: crc_organisation_signupWhereUniqueInput
    update: XOR<crc_organisation_signupUpdateWithoutTransactionInput, crc_organisation_signupUncheckedUpdateWithoutTransactionInput>
    create: XOR<crc_organisation_signupCreateWithoutTransactionInput, crc_organisation_signupUncheckedCreateWithoutTransactionInput>
  }

  export type crc_organisation_signupUpdateWithWhereUniqueWithoutTransactionInput = {
    where: crc_organisation_signupWhereUniqueInput
    data: XOR<crc_organisation_signupUpdateWithoutTransactionInput, crc_organisation_signupUncheckedUpdateWithoutTransactionInput>
  }

  export type crc_organisation_signupUpdateManyWithWhereWithoutTransactionInput = {
    where: crc_organisation_signupScalarWhereInput
    data: XOR<crc_organisation_signupUpdateManyMutationInput, crc_organisation_signupUncheckedUpdateManyWithoutCrc_organisation_signupInput>
  }

  export type crc_organisation_signupScalarWhereInput = {
    AND?: Enumerable<crc_organisation_signupScalarWhereInput>
    OR?: Enumerable<crc_organisation_signupScalarWhereInput>
    NOT?: Enumerable<crc_organisation_signupScalarWhereInput>
    id?: BigIntFilter | bigint | number
    transaction_id?: BigIntFilter | bigint | number
    organisation?: StringFilter | string
  }

  export type crc_signupUpsertWithWhereUniqueWithoutTransactionInput = {
    where: crc_signupWhereUniqueInput
    update: XOR<crc_signupUpdateWithoutTransactionInput, crc_signupUncheckedUpdateWithoutTransactionInput>
    create: XOR<crc_signupCreateWithoutTransactionInput, crc_signupUncheckedCreateWithoutTransactionInput>
  }

  export type crc_signupUpdateWithWhereUniqueWithoutTransactionInput = {
    where: crc_signupWhereUniqueInput
    data: XOR<crc_signupUpdateWithoutTransactionInput, crc_signupUncheckedUpdateWithoutTransactionInput>
  }

  export type crc_signupUpdateManyWithWhereWithoutTransactionInput = {
    where: crc_signupScalarWhereInput
    data: XOR<crc_signupUpdateManyMutationInput, crc_signupUncheckedUpdateManyWithoutCrc_signupInput>
  }

  export type crc_signupScalarWhereInput = {
    AND?: Enumerable<crc_signupScalarWhereInput>
    OR?: Enumerable<crc_signupScalarWhereInput>
    NOT?: Enumerable<crc_signupScalarWhereInput>
    id?: BigIntFilter | bigint | number
    transaction_id?: BigIntFilter | bigint | number
    user?: StringFilter | string
    token?: StringFilter | string
  }

  export type crc_trustUpsertWithWhereUniqueWithoutTransactionInput = {
    where: crc_trustWhereUniqueInput
    update: XOR<crc_trustUpdateWithoutTransactionInput, crc_trustUncheckedUpdateWithoutTransactionInput>
    create: XOR<crc_trustCreateWithoutTransactionInput, crc_trustUncheckedCreateWithoutTransactionInput>
  }

  export type crc_trustUpdateWithWhereUniqueWithoutTransactionInput = {
    where: crc_trustWhereUniqueInput
    data: XOR<crc_trustUpdateWithoutTransactionInput, crc_trustUncheckedUpdateWithoutTransactionInput>
  }

  export type crc_trustUpdateManyWithWhereWithoutTransactionInput = {
    where: crc_trustScalarWhereInput
    data: XOR<crc_trustUpdateManyMutationInput, crc_trustUncheckedUpdateManyWithoutCrc_trustInput>
  }

  export type crc_trustScalarWhereInput = {
    AND?: Enumerable<crc_trustScalarWhereInput>
    OR?: Enumerable<crc_trustScalarWhereInput>
    NOT?: Enumerable<crc_trustScalarWhereInput>
    id?: BigIntFilter | bigint | number
    transaction_id?: BigIntFilter | bigint | number
    address?: StringFilter | string
    can_send_to?: StringFilter | string
    limit?: BigIntFilter | bigint | number
  }

  export type erc20_transferUpsertWithWhereUniqueWithoutTransactionInput = {
    where: erc20_transferWhereUniqueInput
    update: XOR<erc20_transferUpdateWithoutTransactionInput, erc20_transferUncheckedUpdateWithoutTransactionInput>
    create: XOR<erc20_transferCreateWithoutTransactionInput, erc20_transferUncheckedCreateWithoutTransactionInput>
  }

  export type erc20_transferUpdateWithWhereUniqueWithoutTransactionInput = {
    where: erc20_transferWhereUniqueInput
    data: XOR<erc20_transferUpdateWithoutTransactionInput, erc20_transferUncheckedUpdateWithoutTransactionInput>
  }

  export type erc20_transferUpdateManyWithWhereWithoutTransactionInput = {
    where: erc20_transferScalarWhereInput
    data: XOR<erc20_transferUpdateManyMutationInput, erc20_transferUncheckedUpdateManyWithoutErc20_transferInput>
  }

  export type erc20_transferScalarWhereInput = {
    AND?: Enumerable<erc20_transferScalarWhereInput>
    OR?: Enumerable<erc20_transferScalarWhereInput>
    NOT?: Enumerable<erc20_transferScalarWhereInput>
    id?: BigIntFilter | bigint | number
    transaction_id?: BigIntFilter | bigint | number
    from?: StringFilter | string
    to?: StringFilter | string
    token?: StringFilter | string
    value?: StringFilter | string
  }

  export type eth_transferUpsertWithWhereUniqueWithoutTransactionInput = {
    where: eth_transferWhereUniqueInput
    update: XOR<eth_transferUpdateWithoutTransactionInput, eth_transferUncheckedUpdateWithoutTransactionInput>
    create: XOR<eth_transferCreateWithoutTransactionInput, eth_transferUncheckedCreateWithoutTransactionInput>
  }

  export type eth_transferUpdateWithWhereUniqueWithoutTransactionInput = {
    where: eth_transferWhereUniqueInput
    data: XOR<eth_transferUpdateWithoutTransactionInput, eth_transferUncheckedUpdateWithoutTransactionInput>
  }

  export type eth_transferUpdateManyWithWhereWithoutTransactionInput = {
    where: eth_transferScalarWhereInput
    data: XOR<eth_transferUpdateManyMutationInput, eth_transferUncheckedUpdateManyWithoutEth_transferInput>
  }

  export type eth_transferScalarWhereInput = {
    AND?: Enumerable<eth_transferScalarWhereInput>
    OR?: Enumerable<eth_transferScalarWhereInput>
    NOT?: Enumerable<eth_transferScalarWhereInput>
    id?: BigIntFilter | bigint | number
    transaction_id?: BigIntFilter | bigint | number
    from?: StringFilter | string
    to?: StringFilter | string
    value?: StringFilter | string
  }

  export type gnosis_safe_eth_transferUpsertWithWhereUniqueWithoutTransactionInput = {
    where: gnosis_safe_eth_transferWhereUniqueInput
    update: XOR<gnosis_safe_eth_transferUpdateWithoutTransactionInput, gnosis_safe_eth_transferUncheckedUpdateWithoutTransactionInput>
    create: XOR<gnosis_safe_eth_transferCreateWithoutTransactionInput, gnosis_safe_eth_transferUncheckedCreateWithoutTransactionInput>
  }

  export type gnosis_safe_eth_transferUpdateWithWhereUniqueWithoutTransactionInput = {
    where: gnosis_safe_eth_transferWhereUniqueInput
    data: XOR<gnosis_safe_eth_transferUpdateWithoutTransactionInput, gnosis_safe_eth_transferUncheckedUpdateWithoutTransactionInput>
  }

  export type gnosis_safe_eth_transferUpdateManyWithWhereWithoutTransactionInput = {
    where: gnosis_safe_eth_transferScalarWhereInput
    data: XOR<gnosis_safe_eth_transferUpdateManyMutationInput, gnosis_safe_eth_transferUncheckedUpdateManyWithoutGnosis_safe_eth_transferInput>
  }

  export type gnosis_safe_eth_transferScalarWhereInput = {
    AND?: Enumerable<gnosis_safe_eth_transferScalarWhereInput>
    OR?: Enumerable<gnosis_safe_eth_transferScalarWhereInput>
    NOT?: Enumerable<gnosis_safe_eth_transferScalarWhereInput>
    id?: BigIntFilter | bigint | number
    transaction_id?: BigIntFilter | bigint | number
    initiator?: StringFilter | string
    from?: StringFilter | string
    to?: StringFilter | string
    value?: StringFilter | string
  }

  export type transactionCreateManyBlockInput = {
    id?: bigint | number
    from: string
    to?: string | null
    index: number
    gas: string
    hash: string
    value: string
    input?: string | null
    nonce?: string | null
    type?: string | null
    gas_price?: string | null
    classification?: transactionCreateManyclassificationInput | Enumerable<string>
  }

  export type transactionUpdateWithoutBlockInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
    crc_hub_transfer?: crc_hub_transferUpdateManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUpdateManyWithoutTransactionInput
    crc_signup?: crc_signupUpdateManyWithoutTransactionInput
    crc_trust?: crc_trustUpdateManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUpdateManyWithoutTransactionInput
    eth_transfer?: eth_transferUpdateManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUpdateManyWithoutTransactionInput
  }

  export type transactionUncheckedUpdateWithoutBlockInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
    crc_hub_transfer?: crc_hub_transferUncheckedUpdateManyWithoutTransactionInput
    crc_organisation_signup?: crc_organisation_signupUncheckedUpdateManyWithoutTransactionInput
    crc_signup?: crc_signupUncheckedUpdateManyWithoutTransactionInput
    crc_trust?: crc_trustUncheckedUpdateManyWithoutTransactionInput
    erc20_transfer?: erc20_transferUncheckedUpdateManyWithoutTransactionInput
    eth_transfer?: eth_transferUncheckedUpdateManyWithoutTransactionInput
    gnosis_safe_eth_transfer?: gnosis_safe_eth_transferUncheckedUpdateManyWithoutTransactionInput
  }

  export type transactionUncheckedUpdateManyWithoutTransactionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: NullableStringFieldUpdateOperationsInput | string | null
    index?: IntFieldUpdateOperationsInput | number
    gas?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    gas_price?: NullableStringFieldUpdateOperationsInput | string | null
    classification?: transactionUpdateclassificationInput | Enumerable<string>
  }

  export type crc_hub_transferCreateManyTransactionInput = {
    id?: bigint | number
    from: string
    to: string
    value: string
  }

  export type crc_organisation_signupCreateManyTransactionInput = {
    id?: bigint | number
    organisation: string
  }

  export type crc_signupCreateManyTransactionInput = {
    id?: bigint | number
    user: string
    token: string
  }

  export type crc_trustCreateManyTransactionInput = {
    id?: bigint | number
    address: string
    can_send_to: string
    limit: bigint | number
  }

  export type erc20_transferCreateManyTransactionInput = {
    id?: bigint | number
    from: string
    to: string
    token: string
    value: string
  }

  export type eth_transferCreateManyTransactionInput = {
    id?: bigint | number
    from: string
    to: string
    value: string
  }

  export type gnosis_safe_eth_transferCreateManyTransactionInput = {
    id?: bigint | number
    initiator: string
    from: string
    to: string
    value: string
  }

  export type crc_hub_transferUpdateWithoutTransactionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type crc_hub_transferUncheckedUpdateWithoutTransactionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type crc_hub_transferUncheckedUpdateManyWithoutCrc_hub_transferInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type crc_organisation_signupUpdateWithoutTransactionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    organisation?: StringFieldUpdateOperationsInput | string
  }

  export type crc_organisation_signupUncheckedUpdateWithoutTransactionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    organisation?: StringFieldUpdateOperationsInput | string
  }

  export type crc_organisation_signupUncheckedUpdateManyWithoutCrc_organisation_signupInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    organisation?: StringFieldUpdateOperationsInput | string
  }

  export type crc_signupUpdateWithoutTransactionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type crc_signupUncheckedUpdateWithoutTransactionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type crc_signupUncheckedUpdateManyWithoutCrc_signupInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type crc_trustUpdateWithoutTransactionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    address?: StringFieldUpdateOperationsInput | string
    can_send_to?: StringFieldUpdateOperationsInput | string
    limit?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type crc_trustUncheckedUpdateWithoutTransactionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    address?: StringFieldUpdateOperationsInput | string
    can_send_to?: StringFieldUpdateOperationsInput | string
    limit?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type crc_trustUncheckedUpdateManyWithoutCrc_trustInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    address?: StringFieldUpdateOperationsInput | string
    can_send_to?: StringFieldUpdateOperationsInput | string
    limit?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type erc20_transferUpdateWithoutTransactionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type erc20_transferUncheckedUpdateWithoutTransactionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type erc20_transferUncheckedUpdateManyWithoutErc20_transferInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type eth_transferUpdateWithoutTransactionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type eth_transferUncheckedUpdateWithoutTransactionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type eth_transferUncheckedUpdateManyWithoutEth_transferInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type gnosis_safe_eth_transferUpdateWithoutTransactionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    initiator?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type gnosis_safe_eth_transferUncheckedUpdateWithoutTransactionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    initiator?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type gnosis_safe_eth_transferUncheckedUpdateManyWithoutGnosis_safe_eth_transferInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    initiator?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
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