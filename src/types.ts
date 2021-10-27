import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AcceptMembershipResult = {
  __typename?: 'AcceptMembershipResult';
  success: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type AddMemberResult = {
  __typename?: 'AddMemberResult';
  success: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type AssetBalance = {
  __typename?: 'AssetBalance';
  token_address: Scalars['String'];
  token_owner_address: Scalars['String'];
  token_owner_profile?: Maybe<Profile>;
  token_balance: Scalars['String'];
};

export type ChatMessage = IEventPayload & {
  __typename?: 'ChatMessage';
  transaction_hash?: Maybe<Scalars['String']>;
  from: Scalars['String'];
  from_profile?: Maybe<Profile>;
  to: Scalars['String'];
  to_profile?: Maybe<Profile>;
  text: Scalars['String'];
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

export type ClaimInvitationResult = {
  __typename?: 'ClaimInvitationResult';
  success: Scalars['Boolean'];
  claimedInvitation?: Maybe<ClaimedInvitation>;
};

export type ClaimedInvitation = {
  __typename?: 'ClaimedInvitation';
  createdBy?: Maybe<Profile>;
  createdByProfileId: Scalars['Int'];
  createdAt: Scalars['String'];
  claimedBy?: Maybe<Profile>;
  claimedByProfileId: Scalars['Int'];
  claimedAt: Scalars['String'];
};

export type CommonTrust = {
  __typename?: 'CommonTrust';
  type: Scalars['String'];
  safeAddress1: Scalars['String'];
  safeAddress2: Scalars['String'];
  profile?: Maybe<Profile>;
};

export type ConsumeDepositedChallengeResponse = {
  __typename?: 'ConsumeDepositedChallengeResponse';
  success: Scalars['Boolean'];
  challenge?: Maybe<Scalars['String']>;
};

export type Contact = {
  __typename?: 'Contact';
  safeAddress: Scalars['String'];
  lastContactAt?: Maybe<Scalars['String']>;
  safeAddressProfile?: Maybe<Profile>;
  contactAddress: Scalars['String'];
  contactAddressProfile?: Maybe<Profile>;
  trustsYou?: Maybe<Scalars['Int']>;
  youTrust?: Maybe<Scalars['Int']>;
  lastEvent?: Maybe<ProfileEvent>;
};

export type CountryStats = {
  __typename?: 'CountryStats';
  name: Scalars['String'];
  citizenCount: Scalars['Int'];
};

export type CrcHubTransfer = IEventPayload & {
  __typename?: 'CrcHubTransfer';
  transaction_hash: Scalars['String'];
  from: Scalars['String'];
  from_profile?: Maybe<Profile>;
  to: Scalars['String'];
  to_profile?: Maybe<Profile>;
  flow: Scalars['String'];
  transfers: Array<CrcTokenTransfer>;
};

export type CrcMinting = IEventPayload & {
  __typename?: 'CrcMinting';
  transaction_hash: Scalars['String'];
  from: Scalars['String'];
  from_profile?: Maybe<Profile>;
  to: Scalars['String'];
  to_profile?: Maybe<Profile>;
  value: Scalars['String'];
  token: Scalars['String'];
};

export type CrcSignup = IEventPayload & {
  __typename?: 'CrcSignup';
  transaction_hash: Scalars['String'];
  user: Scalars['String'];
  user_profile?: Maybe<Profile>;
  token: Scalars['String'];
};

export type CrcTokenTransfer = IEventPayload & {
  __typename?: 'CrcTokenTransfer';
  transaction_hash: Scalars['String'];
  from: Scalars['String'];
  from_profile?: Maybe<Profile>;
  to: Scalars['String'];
  to_profile?: Maybe<Profile>;
  token: Scalars['String'];
  value: Scalars['String'];
};

export type CrcTrust = IEventPayload & {
  __typename?: 'CrcTrust';
  transaction_hash: Scalars['String'];
  address: Scalars['String'];
  address_profile?: Maybe<Profile>;
  can_send_to: Scalars['String'];
  can_send_to_profile?: Maybe<Profile>;
  limit: Scalars['Int'];
};

export type CreateInvitationResult = {
  __typename?: 'CreateInvitationResult';
  success: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  createdInviteEoas: Array<CreatedInvitation>;
};

export type CreateOrganisationResult = {
  __typename?: 'CreateOrganisationResult';
  success: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  organisation?: Maybe<Organisation>;
};

export type CreateTagInput = {
  typeId: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type CreatedInvitation = {
  __typename?: 'CreatedInvitation';
  createdBy?: Maybe<Profile>;
  createdByProfileId: Scalars['Int'];
  createdAt: Scalars['String'];
  claimedBy?: Maybe<Profile>;
  claimedByProfileId?: Maybe<Scalars['Int']>;
  claimedAt?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  address: Scalars['String'];
  balance: Scalars['String'];
  code: Scalars['String'];
};

export type CreatedInviteEoa = {
  __typename?: 'CreatedInviteEoa';
  for: Scalars['String'];
  address: Scalars['String'];
  fee: Scalars['String'];
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

export type EthTransfer = IEventPayload & {
  __typename?: 'EthTransfer';
  transaction_hash: Scalars['String'];
  from: Scalars['String'];
  from_profile?: Maybe<Profile>;
  to: Scalars['String'];
  to_profile?: Maybe<Profile>;
  value: Scalars['String'];
};

export type EventPayload = CrcSignup | CrcTrust | CrcTokenTransfer | CrcHubTransfer | CrcMinting | EthTransfer | GnosisSafeEthTransfer | ChatMessage | MembershipOffer | MembershipAccepted | MembershipRejected | WelcomeMessage;

export type ExchangeTokenResponse = {
  __typename?: 'ExchangeTokenResponse';
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
};

export type GnosisSafeEthTransfer = IEventPayload & {
  __typename?: 'GnosisSafeEthTransfer';
  transaction_hash: Scalars['String'];
  initiator: Scalars['String'];
  from: Scalars['String'];
  from_profile?: Maybe<Profile>;
  to: Scalars['String'];
  to_profile?: Maybe<Profile>;
  value: Scalars['String'];
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

export type IEventPayload = {
  transaction_hash?: Maybe<Scalars['String']>;
};

export type InitAggregateState = {
  __typename?: 'InitAggregateState';
  registration?: Maybe<Profile>;
  invitation?: Maybe<ClaimedInvitation>;
  invitationTransaction?: Maybe<Scalars['String']>;
  safeFundingTransaction?: Maybe<Scalars['String']>;
  hubSignupTransaction?: Maybe<Scalars['String']>;
};

export type LockOfferInput = {
  offerId: Scalars['String'];
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

export type Membership = {
  __typename?: 'Membership';
  createdAt: Scalars['String'];
  createdBy?: Maybe<Profile>;
  createdByProfileId: Scalars['Int'];
  acceptedAt?: Maybe<Scalars['String']>;
  rejectedAt?: Maybe<Scalars['String']>;
  validTo?: Maybe<Scalars['String']>;
  isAdmin: Scalars['Boolean'];
  organisation: Organisation;
};

export type MembershipAccepted = IEventPayload & {
  __typename?: 'MembershipAccepted';
  transaction_hash?: Maybe<Scalars['String']>;
  member: Scalars['String'];
  member_profile?: Maybe<Profile>;
  organisation: Scalars['String'];
  organisation_profile?: Maybe<Organisation>;
};

export type MembershipOffer = IEventPayload & {
  __typename?: 'MembershipOffer';
  transaction_hash?: Maybe<Scalars['String']>;
  createdBy: Scalars['String'];
  createdBy_profile?: Maybe<Profile>;
  isAdmin: Scalars['Boolean'];
  organisation: Scalars['String'];
  organisation_profile?: Maybe<Organisation>;
};

export type MembershipRejected = IEventPayload & {
  __typename?: 'MembershipRejected';
  transaction_hash?: Maybe<Scalars['String']>;
  member: Scalars['String'];
  member_profile?: Maybe<Profile>;
  organisation: Scalars['String'];
  organisation_profile?: Maybe<Organisation>;
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
  upsertOffer: Offer;
  unlistOffer: Scalars['Boolean'];
  lockOffer: LockOfferResult;
  provePayment: ProvePaymentResult;
  upsertTag: Tag;
  upsertOrganisation: CreateOrganisationResult;
  upsertRegion: CreateOrganisationResult;
  addMember?: Maybe<AddMemberResult>;
  acceptMembership?: Maybe<AcceptMembershipResult>;
  removeMember?: Maybe<RemoveMemberResult>;
  rejectMembership?: Maybe<RejectMembershipResult>;
  acknowledge: Scalars['Boolean'];
  requestInvitationOffer: Offer;
  createInvitations: CreateInvitationResult;
  createTestInvitation: CreateInvitationResult;
  claimInvitation: ClaimInvitationResult;
  redeemClaimedInvitation: RedeemClaimedInvitationResult;
  tagTransaction: TagTransactionResult;
  sendMessage: SendMessageResult;
  requestSessionChallenge: Scalars['String'];
  verifySessionChallenge?: Maybe<ExchangeTokenResponse>;
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


export type MutationUpsertOfferArgs = {
  data: UpsertOfferInput;
};


export type MutationUnlistOfferArgs = {
  offerId: LockOfferInput;
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


export type MutationUpsertOrganisationArgs = {
  organisation: UpsertOrganisationInput;
};


export type MutationUpsertRegionArgs = {
  organisation: UpsertOrganisationInput;
};


export type MutationAddMemberArgs = {
  groupId: Scalars['String'];
  memberId: Scalars['Int'];
};


export type MutationAcceptMembershipArgs = {
  membershipId: Scalars['Int'];
};


export type MutationRemoveMemberArgs = {
  groupId: Scalars['String'];
  memberId: Scalars['Int'];
};


export type MutationRejectMembershipArgs = {
  membershipId: Scalars['Int'];
};


export type MutationAcknowledgeArgs = {
  until: Scalars['String'];
};


export type MutationRequestInvitationOfferArgs = {
  for: Scalars['String'];
};


export type MutationCreateInvitationsArgs = {
  for: Array<Scalars['String']>;
};


export type MutationClaimInvitationArgs = {
  code: Scalars['String'];
};


export type MutationTagTransactionArgs = {
  transactionHash: Scalars['String'];
  tag: CreateTagInput;
};


export type MutationSendMessageArgs = {
  toSafeAddress: Scalars['String'];
  content: Scalars['String'];
};


export type MutationRequestSessionChallengeArgs = {
  address: Scalars['String'];
};


export type MutationVerifySessionChallengeArgs = {
  challenge: Scalars['String'];
  signature: Scalars['String'];
};

export type NotificationEvent = {
  __typename?: 'NotificationEvent';
  type: Scalars['String'];
};

export type Offer = {
  __typename?: 'Offer';
  id: Scalars['String'];
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

export type Organisation = {
  __typename?: 'Organisation';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  circlesAddress?: Maybe<Scalars['String']>;
  circlesSafeOwner?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  avatarMimeType?: Maybe<Scalars['String']>;
  cityGeonameid?: Maybe<Scalars['Int']>;
  city?: Maybe<City>;
  offers?: Maybe<Array<Offer>>;
  members?: Maybe<Array<ProfileOrOrganisation>>;
  trustsYou?: Maybe<Scalars['Int']>;
};

export type PaginationArgs = {
  continueAt: Scalars['String'];
  limit: Scalars['Int'];
};

export type PaymentProof = {
  forOfferId: LockOfferInput;
  transactionHash: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['Int'];
  status?: Maybe<Scalars['String']>;
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
  displayTimeCircles?: Maybe<Scalars['Boolean']>;
  cityGeonameid?: Maybe<Scalars['Int']>;
  city?: Maybe<City>;
  offers?: Maybe<Array<Offer>>;
  trustsYou?: Maybe<Scalars['Int']>;
  youTrust?: Maybe<Scalars['Int']>;
  lastEvent?: Maybe<ProfileEvent>;
  claimedInvitation?: Maybe<ClaimedInvitation>;
  memberships?: Maybe<Array<Membership>>;
};

export type ProfileEvent = {
  __typename?: 'ProfileEvent';
  timestamp: Scalars['String'];
  block_number?: Maybe<Scalars['Int']>;
  transaction_index?: Maybe<Scalars['Int']>;
  transaction_hash?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  safe_address: Scalars['String'];
  safe_address_profile?: Maybe<Profile>;
  direction: Scalars['String'];
  value?: Maybe<Scalars['String']>;
  payload?: Maybe<EventPayload>;
  tags?: Maybe<Array<Tag>>;
};

export type ProfileOrOrganisation = Profile | Organisation;

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
  purchasedOfferId: Scalars['String'];
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
  initAggregateState?: Maybe<InitAggregateState>;
  claimedInvitation?: Maybe<ClaimedInvitation>;
  invitationTransaction?: Maybe<ProfileEvent>;
  safeFundingTransaction?: Maybe<ProfileEvent>;
  hubSignupTransaction?: Maybe<ProfileEvent>;
  lastUBITransaction?: Maybe<Scalars['String']>;
  stats?: Maybe<Stats>;
  organisations: Array<Organisation>;
  regions: Array<Organisation>;
  organisationsByAddress: Array<Organisation>;
  myInvitations: Array<CreatedInvitation>;
  blockchainEvents: Array<ProfileEvent>;
  contacts: Array<Contact>;
  contact?: Maybe<Contact>;
  commonTrust: Array<CommonTrust>;
  chatHistory: Array<ProfileEvent>;
  blockchainEventsByTransactionHash: Array<ProfileEvent>;
  balance: Scalars['String'];
  balancesByAsset: Array<AssetBalance>;
  trustRelations: Array<TrustRelation>;
  myProfile?: Maybe<Profile>;
  inbox: Array<ProfileEvent>;
  profilesById: Array<Profile>;
  profilesBySafeAddress: Array<Profile>;
  findSafeAddressByOwner: Array<Scalars['String']>;
  search: Array<Profile>;
  cities: Array<City>;
  offers: Array<Offer>;
  tags: Array<Tag>;
  tagById?: Maybe<Tag>;
};


export type QueryOrganisationsArgs = {
  pagination?: Maybe<PaginationArgs>;
};


export type QueryRegionsArgs = {
  pagination?: Maybe<PaginationArgs>;
};


export type QueryOrganisationsByAddressArgs = {
  addresses: Array<Scalars['String']>;
};


export type QueryBlockchainEventsArgs = {
  safeAddress: Scalars['String'];
  types?: Maybe<Array<Scalars['String']>>;
  fromBlock?: Maybe<Scalars['Int']>;
  toBlock?: Maybe<Scalars['Int']>;
  pagination?: Maybe<PaginationArgs>;
};


export type QueryContactsArgs = {
  safeAddress: Scalars['String'];
};


export type QueryContactArgs = {
  safeAddress: Scalars['String'];
  contactAddress: Scalars['String'];
};


export type QueryCommonTrustArgs = {
  safeAddress1: Scalars['String'];
  safeAddress2: Scalars['String'];
};


export type QueryChatHistoryArgs = {
  safeAddress: Scalars['String'];
  contactSafeAddress: Scalars['String'];
  pagination?: Maybe<PaginationArgs>;
};


export type QueryBlockchainEventsByTransactionHashArgs = {
  safeAddress: Scalars['String'];
  transactionHash: Scalars['String'];
  types?: Maybe<Array<Scalars['String']>>;
};


export type QueryBalanceArgs = {
  safeAddress: Scalars['String'];
};


export type QueryBalancesByAssetArgs = {
  safeAddress: Scalars['String'];
};


export type QueryTrustRelationsArgs = {
  safeAddress: Scalars['String'];
};


export type QueryProfilesByIdArgs = {
  ids: Array<Scalars['Int']>;
};


export type QueryProfilesBySafeAddressArgs = {
  safeAddresses: Array<Scalars['String']>;
};


export type QueryFindSafeAddressByOwnerArgs = {
  owner: Scalars['String'];
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

export type QueryOfferInput = {
  id?: Maybe<Scalars['String']>;
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

export type RedeemClaimedInvitationResult = {
  __typename?: 'RedeemClaimedInvitationResult';
  success: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  transactionHash?: Maybe<Scalars['String']>;
};

export type RejectMembershipResult = {
  __typename?: 'RejectMembershipResult';
  success: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type RemoveMemberResult = {
  __typename?: 'RemoveMemberResult';
  success: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
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

export type SendMessageResult = {
  __typename?: 'SendMessageResult';
  success: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  event?: Maybe<ProfileEvent>;
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

export type Subscription = {
  __typename?: 'Subscription';
  events: NotificationEvent;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int'];
  typeId: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type TagTransactionResult = {
  __typename?: 'TagTransactionResult';
  success: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  tag?: Maybe<Tag>;
};

export enum TrustDirection {
  In = 'IN',
  Out = 'OUT',
  Mutual = 'MUTUAL'
}

export type TrustRelation = {
  __typename?: 'TrustRelation';
  safeAddress: Scalars['String'];
  safeAddressProfile?: Maybe<Profile>;
  otherSafeAddress: Scalars['String'];
  otherSafeAddressProfile?: Maybe<Profile>;
  direction: TrustDirection;
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
  id?: Maybe<Scalars['String']>;
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

export type UpsertOrganisationInput = {
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  circlesAddress?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  avatarMimeType?: Maybe<Scalars['String']>;
  cityGeonameid?: Maybe<Scalars['Int']>;
};

export type UpsertProfileInput = {
  id?: Maybe<Scalars['Int']>;
  status: Scalars['String'];
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
  displayTimeCircles?: Maybe<Scalars['Boolean']>;
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

export type WelcomeMessage = IEventPayload & {
  __typename?: 'WelcomeMessage';
  transaction_hash?: Maybe<Scalars['String']>;
  member: Scalars['String'];
  member_profile?: Maybe<Profile>;
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
  AcceptMembershipResult: ResolverTypeWrapper<AcceptMembershipResult>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  AddMemberResult: ResolverTypeWrapper<AddMemberResult>;
  AssetBalance: ResolverTypeWrapper<AssetBalance>;
  ChatMessage: ResolverTypeWrapper<ChatMessage>;
  City: ResolverTypeWrapper<City>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  CityStats: ResolverTypeWrapper<CityStats>;
  ClaimInvitationResult: ResolverTypeWrapper<ClaimInvitationResult>;
  ClaimedInvitation: ResolverTypeWrapper<ClaimedInvitation>;
  CommonTrust: ResolverTypeWrapper<CommonTrust>;
  ConsumeDepositedChallengeResponse: ResolverTypeWrapper<ConsumeDepositedChallengeResponse>;
  Contact: ResolverTypeWrapper<Contact>;
  CountryStats: ResolverTypeWrapper<CountryStats>;
  CrcHubTransfer: ResolverTypeWrapper<CrcHubTransfer>;
  CrcMinting: ResolverTypeWrapper<CrcMinting>;
  CrcSignup: ResolverTypeWrapper<CrcSignup>;
  CrcTokenTransfer: ResolverTypeWrapper<CrcTokenTransfer>;
  CrcTrust: ResolverTypeWrapper<CrcTrust>;
  CreateInvitationResult: ResolverTypeWrapper<CreateInvitationResult>;
  CreateOrganisationResult: ResolverTypeWrapper<CreateOrganisationResult>;
  CreateTagInput: CreateTagInput;
  CreatedInvitation: ResolverTypeWrapper<CreatedInvitation>;
  CreatedInviteEoa: ResolverTypeWrapper<CreatedInviteEoa>;
  DelegateAuthInit: ResolverTypeWrapper<DelegateAuthInit>;
  DepositChallenge: DepositChallenge;
  DepositChallengeResponse: ResolverTypeWrapper<DepositChallengeResponse>;
  EthTransfer: ResolverTypeWrapper<EthTransfer>;
  EventPayload: ResolversTypes['CrcSignup'] | ResolversTypes['CrcTrust'] | ResolversTypes['CrcTokenTransfer'] | ResolversTypes['CrcHubTransfer'] | ResolversTypes['CrcMinting'] | ResolversTypes['EthTransfer'] | ResolversTypes['GnosisSafeEthTransfer'] | ResolversTypes['ChatMessage'] | ResolversTypes['MembershipOffer'] | ResolversTypes['MembershipAccepted'] | ResolversTypes['MembershipRejected'] | ResolversTypes['WelcomeMessage'];
  ExchangeTokenResponse: ResolverTypeWrapper<ExchangeTokenResponse>;
  GnosisSafeEthTransfer: ResolverTypeWrapper<GnosisSafeEthTransfer>;
  Goal: ResolverTypeWrapper<Goal>;
  ICity: ResolversTypes['City'] | ResolversTypes['CityStats'];
  IEventPayload: ResolversTypes['ChatMessage'] | ResolversTypes['CrcHubTransfer'] | ResolversTypes['CrcMinting'] | ResolversTypes['CrcSignup'] | ResolversTypes['CrcTokenTransfer'] | ResolversTypes['CrcTrust'] | ResolversTypes['EthTransfer'] | ResolversTypes['GnosisSafeEthTransfer'] | ResolversTypes['MembershipAccepted'] | ResolversTypes['MembershipOffer'] | ResolversTypes['MembershipRejected'] | ResolversTypes['WelcomeMessage'];
  InitAggregateState: ResolverTypeWrapper<InitAggregateState>;
  LockOfferInput: LockOfferInput;
  LockOfferResult: ResolverTypeWrapper<LockOfferResult>;
  LogoutResponse: ResolverTypeWrapper<LogoutResponse>;
  Membership: ResolverTypeWrapper<Membership>;
  MembershipAccepted: ResolverTypeWrapper<MembershipAccepted>;
  MembershipOffer: ResolverTypeWrapper<MembershipOffer>;
  MembershipRejected: ResolverTypeWrapper<MembershipRejected>;
  Mutation: ResolverTypeWrapper<{}>;
  NotificationEvent: ResolverTypeWrapper<NotificationEvent>;
  Offer: ResolverTypeWrapper<Offer>;
  Organisation: ResolverTypeWrapper<Omit<Organisation, 'members'> & { members?: Maybe<Array<ResolversTypes['ProfileOrOrganisation']>> }>;
  PaginationArgs: PaginationArgs;
  PaymentProof: PaymentProof;
  Profile: ResolverTypeWrapper<Profile>;
  ProfileEvent: ResolverTypeWrapper<Omit<ProfileEvent, 'payload'> & { payload?: Maybe<ResolversTypes['EventPayload']> }>;
  ProfileOrOrganisation: ResolversTypes['Profile'] | ResolversTypes['Organisation'];
  ProvePaymentResult: ResolverTypeWrapper<ProvePaymentResult>;
  Purchase: ResolverTypeWrapper<Purchase>;
  PurchaseStatus: PurchaseStatus;
  Query: ResolverTypeWrapper<{}>;
  QueryCitiesByGeonameIdInput: QueryCitiesByGeonameIdInput;
  QueryCitiesByNameInput: QueryCitiesByNameInput;
  QueryCitiesInput: QueryCitiesInput;
  QueryOfferInput: QueryOfferInput;
  QueryProfileInput: QueryProfileInput;
  QueryPurchaseInput: QueryPurchaseInput;
  QueryTagsInput: QueryTagsInput;
  QueryUniqueProfileInput: QueryUniqueProfileInput;
  RedeemClaimedInvitationResult: ResolverTypeWrapper<RedeemClaimedInvitationResult>;
  RejectMembershipResult: ResolverTypeWrapper<RejectMembershipResult>;
  RemoveMemberResult: ResolverTypeWrapper<RemoveMemberResult>;
  RequestUpdateSafeInput: RequestUpdateSafeInput;
  RequestUpdateSafeResponse: ResolverTypeWrapper<RequestUpdateSafeResponse>;
  SearchInput: SearchInput;
  SendMessageResult: ResolverTypeWrapper<SendMessageResult>;
  Server: ResolverTypeWrapper<Server>;
  SessionInfo: ResolverTypeWrapper<SessionInfo>;
  Stats: ResolverTypeWrapper<Stats>;
  Subscription: ResolverTypeWrapper<{}>;
  Tag: ResolverTypeWrapper<Tag>;
  TagTransactionResult: ResolverTypeWrapper<TagTransactionResult>;
  TrustDirection: TrustDirection;
  TrustRelation: ResolverTypeWrapper<TrustRelation>;
  UpdateSafeInput: UpdateSafeInput;
  UpdateSafeResponse: ResolverTypeWrapper<UpdateSafeResponse>;
  UpsertOfferInput: UpsertOfferInput;
  UpsertOrganisationInput: UpsertOrganisationInput;
  UpsertProfileInput: UpsertProfileInput;
  UpsertTagInput: UpsertTagInput;
  Version: ResolverTypeWrapper<Version>;
  WelcomeMessage: ResolverTypeWrapper<WelcomeMessage>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AcceptMembershipResult: AcceptMembershipResult;
  Boolean: Scalars['Boolean'];
  String: Scalars['String'];
  AddMemberResult: AddMemberResult;
  AssetBalance: AssetBalance;
  ChatMessage: ChatMessage;
  City: City;
  Int: Scalars['Int'];
  Float: Scalars['Float'];
  CityStats: CityStats;
  ClaimInvitationResult: ClaimInvitationResult;
  ClaimedInvitation: ClaimedInvitation;
  CommonTrust: CommonTrust;
  ConsumeDepositedChallengeResponse: ConsumeDepositedChallengeResponse;
  Contact: Contact;
  CountryStats: CountryStats;
  CrcHubTransfer: CrcHubTransfer;
  CrcMinting: CrcMinting;
  CrcSignup: CrcSignup;
  CrcTokenTransfer: CrcTokenTransfer;
  CrcTrust: CrcTrust;
  CreateInvitationResult: CreateInvitationResult;
  CreateOrganisationResult: CreateOrganisationResult;
  CreateTagInput: CreateTagInput;
  CreatedInvitation: CreatedInvitation;
  CreatedInviteEoa: CreatedInviteEoa;
  DelegateAuthInit: DelegateAuthInit;
  DepositChallenge: DepositChallenge;
  DepositChallengeResponse: DepositChallengeResponse;
  EthTransfer: EthTransfer;
  EventPayload: ResolversParentTypes['CrcSignup'] | ResolversParentTypes['CrcTrust'] | ResolversParentTypes['CrcTokenTransfer'] | ResolversParentTypes['CrcHubTransfer'] | ResolversParentTypes['CrcMinting'] | ResolversParentTypes['EthTransfer'] | ResolversParentTypes['GnosisSafeEthTransfer'] | ResolversParentTypes['ChatMessage'] | ResolversParentTypes['MembershipOffer'] | ResolversParentTypes['MembershipAccepted'] | ResolversParentTypes['MembershipRejected'] | ResolversParentTypes['WelcomeMessage'];
  ExchangeTokenResponse: ExchangeTokenResponse;
  GnosisSafeEthTransfer: GnosisSafeEthTransfer;
  Goal: Goal;
  ICity: ResolversParentTypes['City'] | ResolversParentTypes['CityStats'];
  IEventPayload: ResolversParentTypes['ChatMessage'] | ResolversParentTypes['CrcHubTransfer'] | ResolversParentTypes['CrcMinting'] | ResolversParentTypes['CrcSignup'] | ResolversParentTypes['CrcTokenTransfer'] | ResolversParentTypes['CrcTrust'] | ResolversParentTypes['EthTransfer'] | ResolversParentTypes['GnosisSafeEthTransfer'] | ResolversParentTypes['MembershipAccepted'] | ResolversParentTypes['MembershipOffer'] | ResolversParentTypes['MembershipRejected'] | ResolversParentTypes['WelcomeMessage'];
  InitAggregateState: InitAggregateState;
  LockOfferInput: LockOfferInput;
  LockOfferResult: LockOfferResult;
  LogoutResponse: LogoutResponse;
  Membership: Membership;
  MembershipAccepted: MembershipAccepted;
  MembershipOffer: MembershipOffer;
  MembershipRejected: MembershipRejected;
  Mutation: {};
  NotificationEvent: NotificationEvent;
  Offer: Offer;
  Organisation: Omit<Organisation, 'members'> & { members?: Maybe<Array<ResolversParentTypes['ProfileOrOrganisation']>> };
  PaginationArgs: PaginationArgs;
  PaymentProof: PaymentProof;
  Profile: Profile;
  ProfileEvent: Omit<ProfileEvent, 'payload'> & { payload?: Maybe<ResolversParentTypes['EventPayload']> };
  ProfileOrOrganisation: ResolversParentTypes['Profile'] | ResolversParentTypes['Organisation'];
  ProvePaymentResult: ProvePaymentResult;
  Purchase: Purchase;
  Query: {};
  QueryCitiesByGeonameIdInput: QueryCitiesByGeonameIdInput;
  QueryCitiesByNameInput: QueryCitiesByNameInput;
  QueryCitiesInput: QueryCitiesInput;
  QueryOfferInput: QueryOfferInput;
  QueryProfileInput: QueryProfileInput;
  QueryPurchaseInput: QueryPurchaseInput;
  QueryTagsInput: QueryTagsInput;
  QueryUniqueProfileInput: QueryUniqueProfileInput;
  RedeemClaimedInvitationResult: RedeemClaimedInvitationResult;
  RejectMembershipResult: RejectMembershipResult;
  RemoveMemberResult: RemoveMemberResult;
  RequestUpdateSafeInput: RequestUpdateSafeInput;
  RequestUpdateSafeResponse: RequestUpdateSafeResponse;
  SearchInput: SearchInput;
  SendMessageResult: SendMessageResult;
  Server: Server;
  SessionInfo: SessionInfo;
  Stats: Stats;
  Subscription: {};
  Tag: Tag;
  TagTransactionResult: TagTransactionResult;
  TrustRelation: TrustRelation;
  UpdateSafeInput: UpdateSafeInput;
  UpdateSafeResponse: UpdateSafeResponse;
  UpsertOfferInput: UpsertOfferInput;
  UpsertOrganisationInput: UpsertOrganisationInput;
  UpsertProfileInput: UpsertProfileInput;
  UpsertTagInput: UpsertTagInput;
  Version: Version;
  WelcomeMessage: WelcomeMessage;
}>;

export type AcceptMembershipResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AcceptMembershipResult'] = ResolversParentTypes['AcceptMembershipResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddMemberResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddMemberResult'] = ResolversParentTypes['AddMemberResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AssetBalanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['AssetBalance'] = ResolversParentTypes['AssetBalance']> = ResolversObject<{
  token_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token_owner_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token_owner_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  token_balance?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ChatMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatMessage'] = ResolversParentTypes['ChatMessage']> = ResolversObject<{
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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

export type ClaimInvitationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClaimInvitationResult'] = ResolversParentTypes['ClaimInvitationResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  claimedInvitation?: Resolver<Maybe<ResolversTypes['ClaimedInvitation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClaimedInvitationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClaimedInvitation'] = ResolversParentTypes['ClaimedInvitation']> = ResolversObject<{
  createdBy?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  createdByProfileId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  claimedBy?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  claimedByProfileId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  claimedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommonTrustResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommonTrust'] = ResolversParentTypes['CommonTrust']> = ResolversObject<{
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  safeAddress1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  safeAddress2?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConsumeDepositedChallengeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConsumeDepositedChallengeResponse'] = ResolversParentTypes['ConsumeDepositedChallengeResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  challenge?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = ResolversObject<{
  safeAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastContactAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  safeAddressProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  contactAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contactAddressProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  trustsYou?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  youTrust?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastEvent?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CountryStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CountryStats'] = ResolversParentTypes['CountryStats']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  citizenCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CrcHubTransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['CrcHubTransfer'] = ResolversParentTypes['CrcHubTransfer']> = ResolversObject<{
  transaction_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  flow?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transfers?: Resolver<Array<ResolversTypes['CrcTokenTransfer']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CrcMintingResolvers<ContextType = any, ParentType extends ResolversParentTypes['CrcMinting'] = ResolversParentTypes['CrcMinting']> = ResolversObject<{
  transaction_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CrcSignupResolvers<ContextType = any, ParentType extends ResolversParentTypes['CrcSignup'] = ResolversParentTypes['CrcSignup']> = ResolversObject<{
  transaction_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CrcTokenTransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['CrcTokenTransfer'] = ResolversParentTypes['CrcTokenTransfer']> = ResolversObject<{
  transaction_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CrcTrustResolvers<ContextType = any, ParentType extends ResolversParentTypes['CrcTrust'] = ResolversParentTypes['CrcTrust']> = ResolversObject<{
  transaction_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  can_send_to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  can_send_to_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateInvitationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateInvitationResult'] = ResolversParentTypes['CreateInvitationResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdInviteEoas?: Resolver<Array<ResolversTypes['CreatedInvitation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateOrganisationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateOrganisationResult'] = ResolversParentTypes['CreateOrganisationResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  organisation?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreatedInvitationResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatedInvitation'] = ResolversParentTypes['CreatedInvitation']> = ResolversObject<{
  createdBy?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  createdByProfileId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  claimedBy?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  claimedByProfileId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  claimedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreatedInviteEoaResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatedInviteEoa'] = ResolversParentTypes['CreatedInviteEoa']> = ResolversObject<{
  for?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fee?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type EthTransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['EthTransfer'] = ResolversParentTypes['EthTransfer']> = ResolversObject<{
  transaction_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventPayload'] = ResolversParentTypes['EventPayload']> = ResolversObject<{
  __resolveType: TypeResolveFn<'CrcSignup' | 'CrcTrust' | 'CrcTokenTransfer' | 'CrcHubTransfer' | 'CrcMinting' | 'EthTransfer' | 'GnosisSafeEthTransfer' | 'ChatMessage' | 'MembershipOffer' | 'MembershipAccepted' | 'MembershipRejected' | 'WelcomeMessage', ParentType, ContextType>;
}>;

export type ExchangeTokenResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExchangeTokenResponse'] = ResolversParentTypes['ExchangeTokenResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GnosisSafeEthTransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['GnosisSafeEthTransfer'] = ResolversParentTypes['GnosisSafeEthTransfer']> = ResolversObject<{
  transaction_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  initiator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type IEventPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['IEventPayload'] = ResolversParentTypes['IEventPayload']> = ResolversObject<{
  __resolveType: TypeResolveFn<'ChatMessage' | 'CrcHubTransfer' | 'CrcMinting' | 'CrcSignup' | 'CrcTokenTransfer' | 'CrcTrust' | 'EthTransfer' | 'GnosisSafeEthTransfer' | 'MembershipAccepted' | 'MembershipOffer' | 'MembershipRejected' | 'WelcomeMessage', ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type InitAggregateStateResolvers<ContextType = any, ParentType extends ResolversParentTypes['InitAggregateState'] = ResolversParentTypes['InitAggregateState']> = ResolversObject<{
  registration?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  invitation?: Resolver<Maybe<ResolversTypes['ClaimedInvitation']>, ParentType, ContextType>;
  invitationTransaction?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  safeFundingTransaction?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hubSignupTransaction?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type MembershipResolvers<ContextType = any, ParentType extends ResolversParentTypes['Membership'] = ResolversParentTypes['Membership']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  createdByProfileId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  acceptedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rejectedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  organisation?: Resolver<ResolversTypes['Organisation'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MembershipAcceptedResolvers<ContextType = any, ParentType extends ResolversParentTypes['MembershipAccepted'] = ResolversParentTypes['MembershipAccepted']> = ResolversObject<{
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  member?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  member_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  organisation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organisation_profile?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MembershipOfferResolvers<ContextType = any, ParentType extends ResolversParentTypes['MembershipOffer'] = ResolversParentTypes['MembershipOffer']> = ResolversObject<{
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  organisation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organisation_profile?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MembershipRejectedResolvers<ContextType = any, ParentType extends ResolversParentTypes['MembershipRejected'] = ResolversParentTypes['MembershipRejected']> = ResolversObject<{
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  member?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  member_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  organisation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organisation_profile?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType>;
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
  upsertOffer?: Resolver<ResolversTypes['Offer'], ParentType, ContextType, RequireFields<MutationUpsertOfferArgs, 'data'>>;
  unlistOffer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUnlistOfferArgs, 'offerId'>>;
  lockOffer?: Resolver<ResolversTypes['LockOfferResult'], ParentType, ContextType, RequireFields<MutationLockOfferArgs, 'data'>>;
  provePayment?: Resolver<ResolversTypes['ProvePaymentResult'], ParentType, ContextType, RequireFields<MutationProvePaymentArgs, 'data'>>;
  upsertTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationUpsertTagArgs, 'data'>>;
  upsertOrganisation?: Resolver<ResolversTypes['CreateOrganisationResult'], ParentType, ContextType, RequireFields<MutationUpsertOrganisationArgs, 'organisation'>>;
  upsertRegion?: Resolver<ResolversTypes['CreateOrganisationResult'], ParentType, ContextType, RequireFields<MutationUpsertRegionArgs, 'organisation'>>;
  addMember?: Resolver<Maybe<ResolversTypes['AddMemberResult']>, ParentType, ContextType, RequireFields<MutationAddMemberArgs, 'groupId' | 'memberId'>>;
  acceptMembership?: Resolver<Maybe<ResolversTypes['AcceptMembershipResult']>, ParentType, ContextType, RequireFields<MutationAcceptMembershipArgs, 'membershipId'>>;
  removeMember?: Resolver<Maybe<ResolversTypes['RemoveMemberResult']>, ParentType, ContextType, RequireFields<MutationRemoveMemberArgs, 'groupId' | 'memberId'>>;
  rejectMembership?: Resolver<Maybe<ResolversTypes['RejectMembershipResult']>, ParentType, ContextType, RequireFields<MutationRejectMembershipArgs, 'membershipId'>>;
  acknowledge?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAcknowledgeArgs, 'until'>>;
  requestInvitationOffer?: Resolver<ResolversTypes['Offer'], ParentType, ContextType, RequireFields<MutationRequestInvitationOfferArgs, 'for'>>;
  createInvitations?: Resolver<ResolversTypes['CreateInvitationResult'], ParentType, ContextType, RequireFields<MutationCreateInvitationsArgs, 'for'>>;
  createTestInvitation?: Resolver<ResolversTypes['CreateInvitationResult'], ParentType, ContextType>;
  claimInvitation?: Resolver<ResolversTypes['ClaimInvitationResult'], ParentType, ContextType, RequireFields<MutationClaimInvitationArgs, 'code'>>;
  redeemClaimedInvitation?: Resolver<ResolversTypes['RedeemClaimedInvitationResult'], ParentType, ContextType>;
  tagTransaction?: Resolver<ResolversTypes['TagTransactionResult'], ParentType, ContextType, RequireFields<MutationTagTransactionArgs, 'transactionHash' | 'tag'>>;
  sendMessage?: Resolver<ResolversTypes['SendMessageResult'], ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'toSafeAddress' | 'content'>>;
  requestSessionChallenge?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRequestSessionChallengeArgs, 'address'>>;
  verifySessionChallenge?: Resolver<Maybe<ResolversTypes['ExchangeTokenResponse']>, ParentType, ContextType, RequireFields<MutationVerifySessionChallengeArgs, 'challenge' | 'signature'>>;
}>;

export type NotificationEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotificationEvent'] = ResolversParentTypes['NotificationEvent']> = ResolversObject<{
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OfferResolvers<ContextType = any, ParentType extends ResolversParentTypes['Offer'] = ResolversParentTypes['Offer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type OrganisationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organisation'] = ResolversParentTypes['Organisation']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  circlesAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  circlesSafeOwner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatarMimeType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cityGeonameid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['City']>, ParentType, ContextType>;
  offers?: Resolver<Maybe<Array<ResolversTypes['Offer']>>, ParentType, ContextType>;
  members?: Resolver<Maybe<Array<ResolversTypes['ProfileOrOrganisation']>>, ParentType, ContextType>;
  trustsYou?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  displayTimeCircles?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  cityGeonameid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['City']>, ParentType, ContextType>;
  offers?: Resolver<Maybe<Array<ResolversTypes['Offer']>>, ParentType, ContextType>;
  trustsYou?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  youTrust?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastEvent?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  claimedInvitation?: Resolver<Maybe<ResolversTypes['ClaimedInvitation']>, ParentType, ContextType>;
  memberships?: Resolver<Maybe<Array<ResolversTypes['Membership']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileEvent'] = ResolversParentTypes['ProfileEvent']> = ResolversObject<{
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  block_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  transaction_index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  safe_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  safe_address_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  direction?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  payload?: Resolver<Maybe<ResolversTypes['EventPayload']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileOrOrganisationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileOrOrganisation'] = ResolversParentTypes['ProfileOrOrganisation']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Profile' | 'Organisation', ParentType, ContextType>;
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
  purchasedOfferId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  whoami?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Version'], ParentType, ContextType>;
  sessionInfo?: Resolver<ResolversTypes['SessionInfo'], ParentType, ContextType>;
  initAggregateState?: Resolver<Maybe<ResolversTypes['InitAggregateState']>, ParentType, ContextType>;
  claimedInvitation?: Resolver<Maybe<ResolversTypes['ClaimedInvitation']>, ParentType, ContextType>;
  invitationTransaction?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  safeFundingTransaction?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  hubSignupTransaction?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  lastUBITransaction?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['Stats']>, ParentType, ContextType>;
  organisations?: Resolver<Array<ResolversTypes['Organisation']>, ParentType, ContextType, RequireFields<QueryOrganisationsArgs, never>>;
  regions?: Resolver<Array<ResolversTypes['Organisation']>, ParentType, ContextType, RequireFields<QueryRegionsArgs, never>>;
  organisationsByAddress?: Resolver<Array<ResolversTypes['Organisation']>, ParentType, ContextType, RequireFields<QueryOrganisationsByAddressArgs, 'addresses'>>;
  myInvitations?: Resolver<Array<ResolversTypes['CreatedInvitation']>, ParentType, ContextType>;
  blockchainEvents?: Resolver<Array<ResolversTypes['ProfileEvent']>, ParentType, ContextType, RequireFields<QueryBlockchainEventsArgs, 'safeAddress'>>;
  contacts?: Resolver<Array<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<QueryContactsArgs, 'safeAddress'>>;
  contact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<QueryContactArgs, 'safeAddress' | 'contactAddress'>>;
  commonTrust?: Resolver<Array<ResolversTypes['CommonTrust']>, ParentType, ContextType, RequireFields<QueryCommonTrustArgs, 'safeAddress1' | 'safeAddress2'>>;
  chatHistory?: Resolver<Array<ResolversTypes['ProfileEvent']>, ParentType, ContextType, RequireFields<QueryChatHistoryArgs, 'safeAddress' | 'contactSafeAddress'>>;
  blockchainEventsByTransactionHash?: Resolver<Array<ResolversTypes['ProfileEvent']>, ParentType, ContextType, RequireFields<QueryBlockchainEventsByTransactionHashArgs, 'safeAddress' | 'transactionHash'>>;
  balance?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryBalanceArgs, 'safeAddress'>>;
  balancesByAsset?: Resolver<Array<ResolversTypes['AssetBalance']>, ParentType, ContextType, RequireFields<QueryBalancesByAssetArgs, 'safeAddress'>>;
  trustRelations?: Resolver<Array<ResolversTypes['TrustRelation']>, ParentType, ContextType, RequireFields<QueryTrustRelationsArgs, 'safeAddress'>>;
  myProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  inbox?: Resolver<Array<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  profilesById?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryProfilesByIdArgs, 'ids'>>;
  profilesBySafeAddress?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryProfilesBySafeAddressArgs, 'safeAddresses'>>;
  findSafeAddressByOwner?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryFindSafeAddressByOwnerArgs, 'owner'>>;
  search?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QuerySearchArgs, 'query'>>;
  cities?: Resolver<Array<ResolversTypes['City']>, ParentType, ContextType, RequireFields<QueryCitiesArgs, 'query'>>;
  offers?: Resolver<Array<ResolversTypes['Offer']>, ParentType, ContextType, RequireFields<QueryOffersArgs, 'query'>>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagsArgs, 'query'>>;
  tagById?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagByIdArgs, 'id'>>;
}>;

export type RedeemClaimedInvitationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RedeemClaimedInvitationResult'] = ResolversParentTypes['RedeemClaimedInvitationResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transactionHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RejectMembershipResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RejectMembershipResult'] = ResolversParentTypes['RejectMembershipResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RemoveMemberResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveMemberResult'] = ResolversParentTypes['RemoveMemberResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RequestUpdateSafeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RequestUpdateSafeResponse'] = ResolversParentTypes['RequestUpdateSafeResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  challenge?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SendMessageResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendMessageResult'] = ResolversParentTypes['SendMessageResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  event?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
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

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  events?: SubscriptionResolver<ResolversTypes['NotificationEvent'], "events", ParentType, ContextType>;
}>;

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  typeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TagTransactionResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagTransactionResult'] = ResolversParentTypes['TagTransactionResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TrustRelationResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrustRelation'] = ResolversParentTypes['TrustRelation']> = ResolversObject<{
  safeAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  safeAddressProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  otherSafeAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  otherSafeAddressProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  direction?: Resolver<ResolversTypes['TrustDirection'], ParentType, ContextType>;
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

export type WelcomeMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['WelcomeMessage'] = ResolversParentTypes['WelcomeMessage']> = ResolversObject<{
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  member?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  member_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AcceptMembershipResult?: AcceptMembershipResultResolvers<ContextType>;
  AddMemberResult?: AddMemberResultResolvers<ContextType>;
  AssetBalance?: AssetBalanceResolvers<ContextType>;
  ChatMessage?: ChatMessageResolvers<ContextType>;
  City?: CityResolvers<ContextType>;
  CityStats?: CityStatsResolvers<ContextType>;
  ClaimInvitationResult?: ClaimInvitationResultResolvers<ContextType>;
  ClaimedInvitation?: ClaimedInvitationResolvers<ContextType>;
  CommonTrust?: CommonTrustResolvers<ContextType>;
  ConsumeDepositedChallengeResponse?: ConsumeDepositedChallengeResponseResolvers<ContextType>;
  Contact?: ContactResolvers<ContextType>;
  CountryStats?: CountryStatsResolvers<ContextType>;
  CrcHubTransfer?: CrcHubTransferResolvers<ContextType>;
  CrcMinting?: CrcMintingResolvers<ContextType>;
  CrcSignup?: CrcSignupResolvers<ContextType>;
  CrcTokenTransfer?: CrcTokenTransferResolvers<ContextType>;
  CrcTrust?: CrcTrustResolvers<ContextType>;
  CreateInvitationResult?: CreateInvitationResultResolvers<ContextType>;
  CreateOrganisationResult?: CreateOrganisationResultResolvers<ContextType>;
  CreatedInvitation?: CreatedInvitationResolvers<ContextType>;
  CreatedInviteEoa?: CreatedInviteEoaResolvers<ContextType>;
  DelegateAuthInit?: DelegateAuthInitResolvers<ContextType>;
  DepositChallengeResponse?: DepositChallengeResponseResolvers<ContextType>;
  EthTransfer?: EthTransferResolvers<ContextType>;
  EventPayload?: EventPayloadResolvers<ContextType>;
  ExchangeTokenResponse?: ExchangeTokenResponseResolvers<ContextType>;
  GnosisSafeEthTransfer?: GnosisSafeEthTransferResolvers<ContextType>;
  Goal?: GoalResolvers<ContextType>;
  ICity?: ICityResolvers<ContextType>;
  IEventPayload?: IEventPayloadResolvers<ContextType>;
  InitAggregateState?: InitAggregateStateResolvers<ContextType>;
  LockOfferResult?: LockOfferResultResolvers<ContextType>;
  LogoutResponse?: LogoutResponseResolvers<ContextType>;
  Membership?: MembershipResolvers<ContextType>;
  MembershipAccepted?: MembershipAcceptedResolvers<ContextType>;
  MembershipOffer?: MembershipOfferResolvers<ContextType>;
  MembershipRejected?: MembershipRejectedResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NotificationEvent?: NotificationEventResolvers<ContextType>;
  Offer?: OfferResolvers<ContextType>;
  Organisation?: OrganisationResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  ProfileEvent?: ProfileEventResolvers<ContextType>;
  ProfileOrOrganisation?: ProfileOrOrganisationResolvers<ContextType>;
  ProvePaymentResult?: ProvePaymentResultResolvers<ContextType>;
  Purchase?: PurchaseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RedeemClaimedInvitationResult?: RedeemClaimedInvitationResultResolvers<ContextType>;
  RejectMembershipResult?: RejectMembershipResultResolvers<ContextType>;
  RemoveMemberResult?: RemoveMemberResultResolvers<ContextType>;
  RequestUpdateSafeResponse?: RequestUpdateSafeResponseResolvers<ContextType>;
  SendMessageResult?: SendMessageResultResolvers<ContextType>;
  Server?: ServerResolvers<ContextType>;
  SessionInfo?: SessionInfoResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TagTransactionResult?: TagTransactionResultResolvers<ContextType>;
  TrustRelation?: TrustRelationResolvers<ContextType>;
  UpdateSafeResponse?: UpdateSafeResponseResolvers<ContextType>;
  Version?: VersionResolvers<ContextType>;
  WelcomeMessage?: WelcomeMessageResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
