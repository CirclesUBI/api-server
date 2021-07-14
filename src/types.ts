import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type City = ICity & {
  __typename?: 'City';
  geonameid: Scalars['Int'];
  name: Scalars['String'];
  country: Scalars['String'];
  population: Scalars['Int'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  feature_code: Scalars['String'];
};

export type CityStats = ICity & {
  __typename?: 'CityStats';
  citizenCount: Scalars['Int'];
  geonameid: Scalars['Int'];
  name: Scalars['String'];
  country: Scalars['String'];
  population: Scalars['Int'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  feature_code: Scalars['String'];
};

export type ConsumeDepositedChallengeResponse = {
  __typename?: 'ConsumeDepositedChallengeResponse';
  success: Scalars['Boolean'];
  challenge?: Maybe<Scalars['String']>;
};

export type CountryStats = {
  __typename?: 'CountryStats';
  name: Scalars['String'];
  citizenCount: Scalars['Int'];
};

export type CreateTagInput = {
  typeId: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type DelegateAuthInit = {
  __typename?: 'DelegateAuthInit';
  appId: Scalars['String'];
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
  challengeType?: Maybe<Scalars['String']>;
  delegateAuthCode?: Maybe<Scalars['String']>;
  validTo?: Maybe<Scalars['String']>;
};

export type DepositChallenge = {
  jwt: Scalars['String'];
};

export type DepositChallengeResponse = {
  __typename?: 'DepositChallengeResponse';
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
};

export type ExchangeTokenResponse = {
  __typename?: 'ExchangeTokenResponse';
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
};

export type Goal = {
  __typename?: 'Goal';
  totalCitizens: Scalars['Int'];
};

export type ICity = {
  geonameid: Scalars['Int'];
  name: Scalars['String'];
  country: Scalars['String'];
  population: Scalars['Int'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  feature_code: Scalars['String'];
};

export type IndexTransactionLog = {
  __typename?: 'IndexTransactionLog';
  id: Scalars['Int'];
  blockNumber: Scalars['Int'];
  blockHash: Scalars['String'];
  transactionIndex: Scalars['Int'];
  removed?: Maybe<Scalars['Boolean']>;
  address: Scalars['String'];
  data?: Maybe<Scalars['String']>;
  topics: Array<Scalars['String']>;
  transactionHash: Scalars['String'];
  logIndex: Scalars['Int'];
};

export type IndexTransactionRequest = {
  __typename?: 'IndexTransactionRequest';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  createdByProfileId: Scalars['Int'];
  createdBy?: Maybe<Profile>;
  blockNumber: Scalars['Int'];
  transactionIndex: Scalars['Int'];
  transactionHash: Scalars['String'];
  tags?: Maybe<Array<Tag>>;
};

export type IndexedTransaction = {
  __typename?: 'IndexedTransaction';
  id: Scalars['Int'];
  to: Scalars['String'];
  from: Scalars['String'];
  contractAddress?: Maybe<Scalars['String']>;
  transactionIndex: Scalars['Int'];
  root?: Maybe<Scalars['String']>;
  gasUsed: Scalars['String'];
  logsBloom: Scalars['String'];
  blockHash: Scalars['String'];
  transactionHash: Scalars['String'];
  blockNumber: Scalars['Int'];
  confirmations?: Maybe<Scalars['Int']>;
  cumulativeGasUsed: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  logs?: Maybe<Array<IndexTransactionLog>>;
  tags?: Maybe<Array<Tag>>;
};

export type LockOfferInput = {
  offerId: Scalars['Int'];
};

export type LockOfferResult = {
  __typename?: 'LockOfferResult';
  success: Scalars['Boolean'];
  lockedUntil?: Maybe<Scalars['String']>;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  exchangeToken: ExchangeTokenResponse;
  authenticateAt: DelegateAuthInit;
  depositChallenge: DepositChallengeResponse;
  consumeDepositedChallenge: ConsumeDepositedChallengeResponse;
  logout: LogoutResponse;
  upsertProfile: Profile;
  requestUpdateSafe: RequestUpdateSafeResponse;
  updateSafe: UpdateSafeResponse;
  requestIndexTransaction: IndexTransactionRequest;
  upsertOffer: Offer;
  unlistOffer: Scalars['Boolean'];
  lockOffer: LockOfferResult;
  provePayment: ProvePaymentResult;
  upsertTag: Tag;
  acknowledge: ProfileEvent;
};


export type MutationAuthenticateAtArgs = {
  appId: Scalars['String'];
};


export type MutationDepositChallengeArgs = {
  jwt: Scalars['String'];
};


export type MutationConsumeDepositedChallengeArgs = {
  delegateAuthCode: Scalars['String'];
};


export type MutationUpsertProfileArgs = {
  data: UpsertProfileInput;
};


export type MutationRequestUpdateSafeArgs = {
  data: RequestUpdateSafeInput;
};


export type MutationUpdateSafeArgs = {
  data: UpdateSafeInput;
};


export type MutationRequestIndexTransactionArgs = {
  data: RequestIndexTransactionInput;
};


export type MutationUpsertOfferArgs = {
  data: UpsertOfferInput;
};


export type MutationUnlistOfferArgs = {
  offerId: Scalars['Int'];
};


export type MutationLockOfferArgs = {
  data: LockOfferInput;
};


export type MutationProvePaymentArgs = {
  data: PaymentProof;
};


export type MutationUpsertTagArgs = {
  data: UpsertTagInput;
};


export type MutationAcknowledgeArgs = {
  eventId: Scalars['Int'];
};

export type Offer = {
  __typename?: 'Offer';
  id: Scalars['Int'];
  createdBy?: Maybe<Profile>;
  createdByProfileId: Scalars['Int'];
  publishedAt: Scalars['String'];
  unlistedAt?: Maybe<Scalars['String']>;
  purchasedAt?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  pictureUrl: Scalars['String'];
  pictureMimeType: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  categoryTag?: Maybe<Tag>;
  categoryTagId: Scalars['Int'];
  city?: Maybe<City>;
  geonameid: Scalars['Int'];
  pricePerUnit: Scalars['String'];
  unitTag?: Maybe<Tag>;
  unitTagId: Scalars['Int'];
  maxUnits?: Maybe<Scalars['Int']>;
  deliveryTermsTag?: Maybe<Tag>;
  deliveryTermsTagId: Scalars['Int'];
};

export type PaymentProof = {
  forOfferId: Scalars['Int'];
  tokenOwners: Array<Scalars['String']>;
  sources: Array<Scalars['String']>;
  destinations: Array<Scalars['String']>;
  values: Array<Scalars['String']>;
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['Int'];
  circlesAddress?: Maybe<Scalars['String']>;
  circlesSafeOwner?: Maybe<Scalars['String']>;
  circlesTokenAddress?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  dream?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  avatarCid?: Maybe<Scalars['String']>;
  avatarMimeType?: Maybe<Scalars['String']>;
  newsletter?: Maybe<Scalars['Boolean']>;
  cityGeonameid?: Maybe<Scalars['Int']>;
  city?: Maybe<City>;
  offers?: Maybe<Array<Offer>>;
};

export type ProfileEvent = {
  __typename?: 'ProfileEvent';
  id: Scalars['Int'];
  type: Scalars['String'];
  profileId: Scalars['Int'];
  createdAt: Scalars['String'];
  data: Scalars['String'];
};

export type ProvePaymentResult = {
  __typename?: 'ProvePaymentResult';
  success: Scalars['Boolean'];
};

export type Purchase = {
  __typename?: 'Purchase';
  id: Scalars['Int'];
  purchasedAt: Scalars['String'];
  status: PurchaseStatus;
  purchasedFrom: Profile;
  purchasedFromProfileId: Scalars['Int'];
  purchasedBy: Profile;
  purchasedByProfileId: Scalars['Int'];
  purchasedItem: Offer;
  purchasedOfferId: Scalars['Int'];
};

export enum PurchaseStatus {
  Invalid = 'INVALID',
  ItemLocked = 'ITEM_LOCKED',
  PaymentProven = 'PAYMENT_PROVEN'
}

export type Query = {
  __typename?: 'Query';
  whoami?: Maybe<Scalars['String']>;
  version: Version;
  sessionInfo: SessionInfo;
  profiles: Array<Profile>;
  search: Array<Profile>;
  cities: Array<City>;
  offers: Array<Offer>;
  tags: Array<Tag>;
  tagById?: Maybe<Tag>;
  events: Array<ProfileEvent>;
  transactions: Array<IndexedTransaction>;
  stats?: Maybe<Stats>;
};


export type QueryProfilesArgs = {
  query: QueryProfileInput;
};


export type QuerySearchArgs = {
  query: SearchInput;
};


export type QueryCitiesArgs = {
  query: QueryCitiesInput;
};


export type QueryOffersArgs = {
  query: QueryOfferInput;
};


export type QueryTagsArgs = {
  query: QueryTagsInput;
};


export type QueryTagByIdArgs = {
  id: Scalars['Int'];
};


export type QueryTransactionsArgs = {
  query?: Maybe<QueryIndexedTransactionInput>;
};

export type QueryCitiesByGeonameIdInput = {
  geonameid: Array<Scalars['Int']>;
};

export type QueryCitiesByNameInput = {
  name_like: Scalars['String'];
  languageCode?: Maybe<Scalars['String']>;
};

export type QueryCitiesInput = {
  byName?: Maybe<QueryCitiesByNameInput>;
  byId?: Maybe<QueryCitiesByGeonameIdInput>;
};

export type QueryIndexedTransactionInput = {
  fromBlockNo?: Maybe<Scalars['Int']>;
  toBlockNo?: Maybe<Scalars['Int']>;
};

export type QueryOfferInput = {
  id?: Maybe<Scalars['Int']>;
  categoryTagId?: Maybe<Scalars['Int']>;
  createdByProfileId?: Maybe<Scalars['Int']>;
  publishedAt_lt?: Maybe<Scalars['String']>;
  publishedAt_gt?: Maybe<Scalars['String']>;
};

export type QueryProfileInput = {
  id?: Maybe<Array<Scalars['Int']>>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  circlesAddress?: Maybe<Array<Scalars['String']>>;
};

export type QueryPurchaseInput = {
  purchasedByProfileId: Scalars['String'];
};

export type QueryTagsInput = {
  typeId_in: Array<Scalars['String']>;
  value_like?: Maybe<Scalars['String']>;
};

export type QueryUniqueProfileInput = {
  id: Scalars['Int'];
};

export type RequestIndexTransactionInput = {
  transactionHash: Scalars['String'];
  tags?: Maybe<Array<CreateTagInput>>;
};

export type RequestUpdateSafeInput = {
  newSafeAddress: Scalars['String'];
};

export type RequestUpdateSafeResponse = {
  __typename?: 'RequestUpdateSafeResponse';
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
  challenge?: Maybe<Scalars['String']>;
};

export type SearchInput = {
  searchString: Scalars['String'];
};

export type Server = {
  __typename?: 'Server';
  version: Scalars['String'];
};

export type SessionInfo = {
  __typename?: 'SessionInfo';
  isLoggedOn: Scalars['Boolean'];
  hasProfile?: Maybe<Scalars['Boolean']>;
  profileId?: Maybe<Scalars['Int']>;
};

export type Stats = {
  __typename?: 'Stats';
  totalCitizens: Scalars['Int'];
  currentGoalFrom: Scalars['Int'];
  currentGoal: Scalars['Int'];
  nextGoalAt: Scalars['Int'];
  inviteRank: Scalars['Int'];
  cityRank?: Maybe<Scalars['Int']>;
  goals: Array<Goal>;
  cities: Array<CityStats>;
  countries: Array<CountryStats>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int'];
  typeId: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type UpdateSafeInput = {
  signature: Scalars['String'];
};

export type UpdateSafeResponse = {
  __typename?: 'UpdateSafeResponse';
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
  newSafeAddress?: Maybe<Scalars['String']>;
};

export type UpsertOfferInput = {
  id?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  pictureUrl?: Maybe<Scalars['String']>;
  pictureMimeType?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  categoryTagId: Scalars['Int'];
  geonameid: Scalars['Int'];
  pricePerUnit: Scalars['String'];
  unitTagId: Scalars['Int'];
  maxUnits?: Maybe<Scalars['Int']>;
  deliveryTermsTagId: Scalars['Int'];
};

export type UpsertProfileInput = {
  id?: Maybe<Scalars['Int']>;
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  dream?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  circlesAddress?: Maybe<Scalars['String']>;
  circlesSafeOwner?: Maybe<Scalars['String']>;
  circlesTokenAddress?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  avatarCid?: Maybe<Scalars['String']>;
  avatarMimeType?: Maybe<Scalars['String']>;
  newsletter?: Maybe<Scalars['Boolean']>;
  cityGeonameid?: Maybe<Scalars['Int']>;
};

export type UpsertTagInput = {
  id?: Maybe<Scalars['Int']>;
  typeId: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type Version = {
  __typename?: 'Version';
  major: Scalars['Int'];
  minor: Scalars['Int'];
  revision: Scalars['Int'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  City: ResolverTypeWrapper<City>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  CityStats: ResolverTypeWrapper<CityStats>;
  ConsumeDepositedChallengeResponse: ResolverTypeWrapper<ConsumeDepositedChallengeResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CountryStats: ResolverTypeWrapper<CountryStats>;
  CreateTagInput: CreateTagInput;
  DelegateAuthInit: ResolverTypeWrapper<DelegateAuthInit>;
  DepositChallenge: DepositChallenge;
  DepositChallengeResponse: ResolverTypeWrapper<DepositChallengeResponse>;
  ExchangeTokenResponse: ResolverTypeWrapper<ExchangeTokenResponse>;
  Goal: ResolverTypeWrapper<Goal>;
  ICity: ResolversTypes['City'] | ResolversTypes['CityStats'];
  IndexTransactionLog: ResolverTypeWrapper<IndexTransactionLog>;
  IndexTransactionRequest: ResolverTypeWrapper<IndexTransactionRequest>;
  IndexedTransaction: ResolverTypeWrapper<IndexedTransaction>;
  LockOfferInput: LockOfferInput;
  LockOfferResult: ResolverTypeWrapper<LockOfferResult>;
  LogoutResponse: ResolverTypeWrapper<LogoutResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Offer: ResolverTypeWrapper<Offer>;
  PaymentProof: PaymentProof;
  Profile: ResolverTypeWrapper<Profile>;
  ProfileEvent: ResolverTypeWrapper<ProfileEvent>;
  ProvePaymentResult: ResolverTypeWrapper<ProvePaymentResult>;
  Purchase: ResolverTypeWrapper<Purchase>;
  PurchaseStatus: PurchaseStatus;
  Query: ResolverTypeWrapper<{}>;
  QueryCitiesByGeonameIdInput: QueryCitiesByGeonameIdInput;
  QueryCitiesByNameInput: QueryCitiesByNameInput;
  QueryCitiesInput: QueryCitiesInput;
  QueryIndexedTransactionInput: QueryIndexedTransactionInput;
  QueryOfferInput: QueryOfferInput;
  QueryProfileInput: QueryProfileInput;
  QueryPurchaseInput: QueryPurchaseInput;
  QueryTagsInput: QueryTagsInput;
  QueryUniqueProfileInput: QueryUniqueProfileInput;
  RequestIndexTransactionInput: RequestIndexTransactionInput;
  RequestUpdateSafeInput: RequestUpdateSafeInput;
  RequestUpdateSafeResponse: ResolverTypeWrapper<RequestUpdateSafeResponse>;
  SearchInput: SearchInput;
  Server: ResolverTypeWrapper<Server>;
  SessionInfo: ResolverTypeWrapper<SessionInfo>;
  Stats: ResolverTypeWrapper<Stats>;
  Tag: ResolverTypeWrapper<Tag>;
  UpdateSafeInput: UpdateSafeInput;
  UpdateSafeResponse: ResolverTypeWrapper<UpdateSafeResponse>;
  UpsertOfferInput: UpsertOfferInput;
  UpsertProfileInput: UpsertProfileInput;
  UpsertTagInput: UpsertTagInput;
  Version: ResolverTypeWrapper<Version>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  City: City;
  Int: Scalars['Int'];
  String: Scalars['String'];
  Float: Scalars['Float'];
  CityStats: CityStats;
  ConsumeDepositedChallengeResponse: ConsumeDepositedChallengeResponse;
  Boolean: Scalars['Boolean'];
  CountryStats: CountryStats;
  CreateTagInput: CreateTagInput;
  DelegateAuthInit: DelegateAuthInit;
  DepositChallenge: DepositChallenge;
  DepositChallengeResponse: DepositChallengeResponse;
  ExchangeTokenResponse: ExchangeTokenResponse;
  Goal: Goal;
  ICity: ResolversParentTypes['City'] | ResolversParentTypes['CityStats'];
  IndexTransactionLog: IndexTransactionLog;
  IndexTransactionRequest: IndexTransactionRequest;
  IndexedTransaction: IndexedTransaction;
  LockOfferInput: LockOfferInput;
  LockOfferResult: LockOfferResult;
  LogoutResponse: LogoutResponse;
  Mutation: {};
  Offer: Offer;
  PaymentProof: PaymentProof;
  Profile: Profile;
  ProfileEvent: ProfileEvent;
  ProvePaymentResult: ProvePaymentResult;
  Purchase: Purchase;
  Query: {};
  QueryCitiesByGeonameIdInput: QueryCitiesByGeonameIdInput;
  QueryCitiesByNameInput: QueryCitiesByNameInput;
  QueryCitiesInput: QueryCitiesInput;
  QueryIndexedTransactionInput: QueryIndexedTransactionInput;
  QueryOfferInput: QueryOfferInput;
  QueryProfileInput: QueryProfileInput;
  QueryPurchaseInput: QueryPurchaseInput;
  QueryTagsInput: QueryTagsInput;
  QueryUniqueProfileInput: QueryUniqueProfileInput;
  RequestIndexTransactionInput: RequestIndexTransactionInput;
  RequestUpdateSafeInput: RequestUpdateSafeInput;
  RequestUpdateSafeResponse: RequestUpdateSafeResponse;
  SearchInput: SearchInput;
  Server: Server;
  SessionInfo: SessionInfo;
  Stats: Stats;
  Tag: Tag;
  UpdateSafeInput: UpdateSafeInput;
  UpdateSafeResponse: UpdateSafeResponse;
  UpsertOfferInput: UpsertOfferInput;
  UpsertProfileInput: UpsertProfileInput;
  UpsertTagInput: UpsertTagInput;
  Version: Version;
}>;

export type CityResolvers<ContextType = any, ParentType extends ResolversParentTypes['City'] = ResolversParentTypes['City']> = ResolversObject<{
  geonameid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  population?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  feature_code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CityStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CityStats'] = ResolversParentTypes['CityStats']> = ResolversObject<{
  citizenCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  geonameid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  population?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  feature_code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConsumeDepositedChallengeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConsumeDepositedChallengeResponse'] = ResolversParentTypes['ConsumeDepositedChallengeResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  challenge?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CountryStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CountryStats'] = ResolversParentTypes['CountryStats']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  citizenCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DelegateAuthInitResolvers<ContextType = any, ParentType extends ResolversParentTypes['DelegateAuthInit'] = ResolversParentTypes['DelegateAuthInit']> = ResolversObject<{
  appId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  challengeType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  delegateAuthCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DepositChallengeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DepositChallengeResponse'] = ResolversParentTypes['DepositChallengeResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ExchangeTokenResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExchangeTokenResponse'] = ResolversParentTypes['ExchangeTokenResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GoalResolvers<ContextType = any, ParentType extends ResolversParentTypes['Goal'] = ResolversParentTypes['Goal']> = ResolversObject<{
  totalCitizens?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ICityResolvers<ContextType = any, ParentType extends ResolversParentTypes['ICity'] = ResolversParentTypes['ICity']> = ResolversObject<{
  __resolveType: TypeResolveFn<'City' | 'CityStats', ParentType, ContextType>;
  geonameid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  population?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  feature_code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type IndexTransactionLogResolvers<ContextType = any, ParentType extends ResolversParentTypes['IndexTransactionLog'] = ResolversParentTypes['IndexTransactionLog']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transactionIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  removed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topics?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  logIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IndexTransactionRequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['IndexTransactionRequest'] = ResolversParentTypes['IndexTransactionRequest']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdByProfileId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  transactionIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IndexedTransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['IndexedTransaction'] = ResolversParentTypes['IndexedTransaction']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contractAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transactionIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  root?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gasUsed?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  logsBloom?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  confirmations?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  cumulativeGasUsed?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  logs?: Resolver<Maybe<Array<ResolversTypes['IndexTransactionLog']>>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LockOfferResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['LockOfferResult'] = ResolversParentTypes['LockOfferResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lockedUntil?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LogoutResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogoutResponse'] = ResolversParentTypes['LogoutResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  exchangeToken?: Resolver<ResolversTypes['ExchangeTokenResponse'], ParentType, ContextType>;
  authenticateAt?: Resolver<ResolversTypes['DelegateAuthInit'], ParentType, ContextType, RequireFields<MutationAuthenticateAtArgs, 'appId'>>;
  depositChallenge?: Resolver<ResolversTypes['DepositChallengeResponse'], ParentType, ContextType, RequireFields<MutationDepositChallengeArgs, 'jwt'>>;
  consumeDepositedChallenge?: Resolver<ResolversTypes['ConsumeDepositedChallengeResponse'], ParentType, ContextType, RequireFields<MutationConsumeDepositedChallengeArgs, 'delegateAuthCode'>>;
  logout?: Resolver<ResolversTypes['LogoutResponse'], ParentType, ContextType>;
  upsertProfile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<MutationUpsertProfileArgs, 'data'>>;
  requestUpdateSafe?: Resolver<ResolversTypes['RequestUpdateSafeResponse'], ParentType, ContextType, RequireFields<MutationRequestUpdateSafeArgs, 'data'>>;
  updateSafe?: Resolver<ResolversTypes['UpdateSafeResponse'], ParentType, ContextType, RequireFields<MutationUpdateSafeArgs, 'data'>>;
  requestIndexTransaction?: Resolver<ResolversTypes['IndexTransactionRequest'], ParentType, ContextType, RequireFields<MutationRequestIndexTransactionArgs, 'data'>>;
  upsertOffer?: Resolver<ResolversTypes['Offer'], ParentType, ContextType, RequireFields<MutationUpsertOfferArgs, 'data'>>;
  unlistOffer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUnlistOfferArgs, 'offerId'>>;
  lockOffer?: Resolver<ResolversTypes['LockOfferResult'], ParentType, ContextType, RequireFields<MutationLockOfferArgs, 'data'>>;
  provePayment?: Resolver<ResolversTypes['ProvePaymentResult'], ParentType, ContextType, RequireFields<MutationProvePaymentArgs, 'data'>>;
  upsertTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationUpsertTagArgs, 'data'>>;
  acknowledge?: Resolver<ResolversTypes['ProfileEvent'], ParentType, ContextType, RequireFields<MutationAcknowledgeArgs, 'eventId'>>;
}>;

export type OfferResolvers<ContextType = any, ParentType extends ResolversParentTypes['Offer'] = ResolversParentTypes['Offer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  createdByProfileId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  publishedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  unlistedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  purchasedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pictureUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pictureMimeType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  categoryTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  categoryTagId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['City']>, ParentType, ContextType>;
  geonameid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pricePerUnit?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  unitTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  unitTagId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxUnits?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  deliveryTermsTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  deliveryTermsTagId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  circlesAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  circlesSafeOwner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  circlesTokenAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dream?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatarCid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatarMimeType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newsletter?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  cityGeonameid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['City']>, ParentType, ContextType>;
  offers?: Resolver<Maybe<Array<ResolversTypes['Offer']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileEvent'] = ResolversParentTypes['ProfileEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProvePaymentResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProvePaymentResult'] = ResolversParentTypes['ProvePaymentResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PurchaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Purchase'] = ResolversParentTypes['Purchase']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  purchasedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['PurchaseStatus'], ParentType, ContextType>;
  purchasedFrom?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  purchasedFromProfileId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  purchasedBy?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  purchasedByProfileId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  purchasedItem?: Resolver<ResolversTypes['Offer'], ParentType, ContextType>;
  purchasedOfferId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  whoami?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Version'], ParentType, ContextType>;
  sessionInfo?: Resolver<ResolversTypes['SessionInfo'], ParentType, ContextType>;
  profiles?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryProfilesArgs, 'query'>>;
  search?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QuerySearchArgs, 'query'>>;
  cities?: Resolver<Array<ResolversTypes['City']>, ParentType, ContextType, RequireFields<QueryCitiesArgs, 'query'>>;
  offers?: Resolver<Array<ResolversTypes['Offer']>, ParentType, ContextType, RequireFields<QueryOffersArgs, 'query'>>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagsArgs, 'query'>>;
  tagById?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagByIdArgs, 'id'>>;
  events?: Resolver<Array<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  transactions?: Resolver<Array<ResolversTypes['IndexedTransaction']>, ParentType, ContextType, RequireFields<QueryTransactionsArgs, never>>;
  stats?: Resolver<Maybe<ResolversTypes['Stats']>, ParentType, ContextType>;
}>;

export type RequestUpdateSafeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RequestUpdateSafeResponse'] = ResolversParentTypes['RequestUpdateSafeResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  challenge?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Server'] = ResolversParentTypes['Server']> = ResolversObject<{
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SessionInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['SessionInfo'] = ResolversParentTypes['SessionInfo']> = ResolversObject<{
  isLoggedOn?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasProfile?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  profileId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Stats'] = ResolversParentTypes['Stats']> = ResolversObject<{
  totalCitizens?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  currentGoalFrom?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  currentGoal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  nextGoalAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  inviteRank?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  cityRank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  goals?: Resolver<Array<ResolversTypes['Goal']>, ParentType, ContextType>;
  cities?: Resolver<Array<ResolversTypes['CityStats']>, ParentType, ContextType>;
  countries?: Resolver<Array<ResolversTypes['CountryStats']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  typeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateSafeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateSafeResponse'] = ResolversParentTypes['UpdateSafeResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newSafeAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VersionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Version'] = ResolversParentTypes['Version']> = ResolversObject<{
  major?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minor?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  revision?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  City?: CityResolvers<ContextType>;
  CityStats?: CityStatsResolvers<ContextType>;
  ConsumeDepositedChallengeResponse?: ConsumeDepositedChallengeResponseResolvers<ContextType>;
  CountryStats?: CountryStatsResolvers<ContextType>;
  DelegateAuthInit?: DelegateAuthInitResolvers<ContextType>;
  DepositChallengeResponse?: DepositChallengeResponseResolvers<ContextType>;
  ExchangeTokenResponse?: ExchangeTokenResponseResolvers<ContextType>;
  Goal?: GoalResolvers<ContextType>;
  ICity?: ICityResolvers<ContextType>;
  IndexTransactionLog?: IndexTransactionLogResolvers<ContextType>;
  IndexTransactionRequest?: IndexTransactionRequestResolvers<ContextType>;
  IndexedTransaction?: IndexedTransactionResolvers<ContextType>;
  LockOfferResult?: LockOfferResultResolvers<ContextType>;
  LogoutResponse?: LogoutResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Offer?: OfferResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  ProfileEvent?: ProfileEventResolvers<ContextType>;
  ProvePaymentResult?: ProvePaymentResultResolvers<ContextType>;
  Purchase?: PurchaseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RequestUpdateSafeResponse?: RequestUpdateSafeResponseResolvers<ContextType>;
  Server?: ServerResolvers<ContextType>;
  SessionInfo?: SessionInfoResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  UpdateSafeResponse?: UpdateSafeResponseResolvers<ContextType>;
  Version?: VersionResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
