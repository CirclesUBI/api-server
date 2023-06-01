import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type AcceptMembershipResult = {
  __typename?: 'AcceptMembershipResult';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export enum AccountType {
  Organisation = 'Organisation',
  Person = 'Person'
}

export type AddMemberResult = {
  __typename?: 'AddMemberResult';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type AggregatePayload = Contacts | CrcBalances | Erc20Balances | Members | Memberships;

export enum AggregateType {
  Contacts = 'Contacts',
  CrcBalances = 'CrcBalances',
  Erc20Balances = 'Erc20Balances',
  Members = 'Members',
  Memberships = 'Memberships',
  Sales = 'Sales'
}

export type AssetBalance = {
  __typename?: 'AssetBalance';
  token_address: Scalars['String'];
  token_balance: Scalars['String'];
  token_owner_address: Scalars['String'];
  token_owner_profile?: Maybe<Profile>;
  token_symbol?: Maybe<Scalars['String']>;
};

export type BaliVillage = {
  __typename?: 'BaliVillage';
  desa: Scalars['String'];
  id: Scalars['Int'];
  kabupaten: Scalars['String'];
  kecamatan: Scalars['String'];
};

export type BusinessCategory = {
  __typename?: 'BusinessCategory';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Businesses = {
  __typename?: 'Businesses';
  businessCategory?: Maybe<Scalars['String']>;
  businessCategoryId?: Maybe<Scalars['Int']>;
  businessHoursFriday?: Maybe<Scalars['String']>;
  businessHoursMonday?: Maybe<Scalars['String']>;
  businessHoursSaturday?: Maybe<Scalars['String']>;
  businessHoursSunday?: Maybe<Scalars['String']>;
  businessHoursThursday?: Maybe<Scalars['String']>;
  businessHoursTuesday?: Maybe<Scalars['String']>;
  businessHoursWednesday?: Maybe<Scalars['String']>;
  circlesAddress: Scalars['String'];
  createdAt: Scalars['Date'];
  cursor: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  favoriteCount?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  lat?: Maybe<Scalars['Float']>;
  location?: Maybe<Scalars['String']>;
  locationName?: Maybe<Scalars['String']>;
  lon?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};

export type Capability = {
  __typename?: 'Capability';
  type?: Maybe<CapabilityType>;
};

export enum CapabilityType {
  Invite = 'Invite',
  PreviewFeatures = 'PreviewFeatures',
  Tickets = 'Tickets',
  Translate = 'Translate',
  VerifiedByHumanode = 'VerifiedByHumanode',
  Verify = 'Verify'
}

export type ClaimInvitationResult = {
  __typename?: 'ClaimInvitationResult';
  claimedInvitation?: Maybe<ClaimedInvitation>;
  success: Scalars['Boolean'];
};

export type ClaimedInvitation = {
  __typename?: 'ClaimedInvitation';
  claimedAt: Scalars['String'];
  claimedBy?: Maybe<Profile>;
  claimedByProfileId: Scalars['Int'];
  createdAt: Scalars['String'];
  createdBy?: Maybe<Profile>;
  createdByProfileId: Scalars['Int'];
};

export type CommonTrust = {
  __typename?: 'CommonTrust';
  profile?: Maybe<Profile>;
  safeAddress1: Scalars['String'];
  safeAddress2: Scalars['String'];
  type: Scalars['String'];
};

export type CompareTrustRelationsInput = {
  canSendTo: Scalars['String'];
  compareWith: Array<Scalars['String']>;
};

export type CompareTrustRelationsResult = {
  __typename?: 'CompareTrustRelationsResult';
  canSendTo: Scalars['String'];
  diffs: Array<TrustComparison>;
};

export type Contact = {
  __typename?: 'Contact';
  contactAddress: Scalars['String'];
  contactAddress_Profile?: Maybe<Profile>;
  lastContactAt: Scalars['String'];
  metadata: Array<ContactPoint>;
};

export type ContactAggregateFilter = {
  addresses: Array<Scalars['String']>;
};

export enum ContactDirection {
  In = 'In',
  Out = 'Out'
}

export type ContactFilter = {
  contactSource: Array<Scalars['String']>;
};

export type ContactPoint = {
  __typename?: 'ContactPoint';
  directions: Array<ContactDirection>;
  name: Scalars['String'];
  timestamps: Array<Scalars['String']>;
  values: Array<Scalars['String']>;
};

export type Contacts = IAggregatePayload & {
  __typename?: 'Contacts';
  contacts: Array<Contact>;
  lastUpdatedAt: Scalars['String'];
};

export type CrcBalanceAggregateFilter = {
  tokenAddresses: Array<Scalars['String']>;
};

export type CrcBalanceFilter = {
  gt?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
};

export type CrcBalances = IAggregatePayload & {
  __typename?: 'CrcBalances';
  balances: Array<AssetBalance>;
  lastUpdatedAt: Scalars['String'];
  total?: Maybe<Scalars['String']>;
};

export type CrcHubTransfer = IEventPayload & {
  __typename?: 'CrcHubTransfer';
  flow: Scalars['String'];
  from: Scalars['String'];
  from_profile?: Maybe<Profile>;
  tags: Array<Tag>;
  to: Scalars['String'];
  to_profile?: Maybe<Profile>;
  transaction_hash: Scalars['String'];
  transfers: Array<CrcTokenTransfer>;
};

export type CrcMinting = IEventPayload & {
  __typename?: 'CrcMinting';
  from: Scalars['String'];
  from_profile?: Maybe<Profile>;
  to: Scalars['String'];
  to_profile?: Maybe<Profile>;
  token: Scalars['String'];
  transaction_hash: Scalars['String'];
  value: Scalars['String'];
};

export type CrcSignup = IEventPayload & {
  __typename?: 'CrcSignup';
  token: Scalars['String'];
  transaction_hash: Scalars['String'];
  user: Scalars['String'];
  user_profile?: Maybe<Profile>;
};

export type CrcTokenTransfer = IEventPayload & {
  __typename?: 'CrcTokenTransfer';
  from: Scalars['String'];
  from_profile?: Maybe<Profile>;
  to: Scalars['String'];
  to_profile?: Maybe<Profile>;
  token: Scalars['String'];
  transaction_hash: Scalars['String'];
  value: Scalars['String'];
};

export type CrcTrust = IEventPayload & {
  __typename?: 'CrcTrust';
  address: Scalars['String'];
  address_profile?: Maybe<Profile>;
  can_send_to: Scalars['String'];
  can_send_to_profile?: Maybe<Profile>;
  limit: Scalars['Int'];
  transaction_hash: Scalars['String'];
};

export type CreateInvitationResult = {
  __typename?: 'CreateInvitationResult';
  createdInviteEoas: Array<CreatedInvitation>;
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CreateOrganisationResult = {
  __typename?: 'CreateOrganisationResult';
  error?: Maybe<Scalars['String']>;
  organisation?: Maybe<Organisation>;
  success: Scalars['Boolean'];
};

export type CreateTagInput = {
  typeId: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type CreatedInvitation = {
  __typename?: 'CreatedInvitation';
  address: Scalars['String'];
  balance: Scalars['String'];
  claimedAt?: Maybe<Scalars['String']>;
  claimedBy?: Maybe<Profile>;
  claimedByProfileId?: Maybe<Scalars['Int']>;
  code: Scalars['String'];
  createdAt: Scalars['String'];
  createdBy?: Maybe<Profile>;
  createdByProfileId: Scalars['Int'];
  name: Scalars['String'];
};

export type CreatedInviteEoa = {
  __typename?: 'CreatedInviteEoa';
  address: Scalars['String'];
  fee: Scalars['String'];
  for: Scalars['String'];
};

export enum Direction {
  In = 'in',
  Out = 'out'
}

export enum DisplayCurrency {
  Crc = 'CRC',
  Eurs = 'EURS',
  TimeCrc = 'TIME_CRC'
}

export type Erc20Balances = IAggregatePayload & {
  __typename?: 'Erc20Balances';
  balances: Array<AssetBalance>;
  lastUpdatedAt: Scalars['String'];
};

export type Erc20Transfer = IEventPayload & {
  __typename?: 'Erc20Transfer';
  from: Scalars['String'];
  from_profile?: Maybe<Profile>;
  to: Scalars['String'];
  to_profile?: Maybe<Profile>;
  token: Scalars['String'];
  transaction_hash: Scalars['String'];
  value: Scalars['String'];
};

export type EthTransfer = IEventPayload & {
  __typename?: 'EthTransfer';
  from: Scalars['String'];
  from_profile?: Maybe<Profile>;
  tags: Array<Tag>;
  to: Scalars['String'];
  to_profile?: Maybe<Profile>;
  transaction_hash: Scalars['String'];
  value: Scalars['String'];
};

export type EventPayload = CrcHubTransfer | CrcMinting | CrcSignup | CrcTokenTransfer | CrcTrust | Erc20Transfer | EthTransfer | GnosisSafeEthTransfer | InvitationCreated | InvitationRedeemed | MemberAdded | MembershipAccepted | MembershipOffer | MembershipRejected | NewUser | OrganisationCreated | SafeVerified | WelcomeMessage;

export enum EventType {
  CrcHubTransfer = 'CrcHubTransfer',
  CrcMinting = 'CrcMinting',
  CrcSignup = 'CrcSignup',
  CrcTokenTransfer = 'CrcTokenTransfer',
  CrcTrust = 'CrcTrust',
  Erc20Transfer = 'Erc20Transfer',
  EthTransfer = 'EthTransfer',
  GnosisSafeEthTransfer = 'GnosisSafeEthTransfer',
  InvitationCreated = 'InvitationCreated',
  InvitationRedeemed = 'InvitationRedeemed',
  MemberAdded = 'MemberAdded',
  MembershipAccepted = 'MembershipAccepted',
  MembershipOffer = 'MembershipOffer',
  MembershipRejected = 'MembershipRejected',
  NewUser = 'NewUser',
  OrganisationCreated = 'OrganisationCreated',
  SafeVerified = 'SafeVerified',
  WelcomeMessage = 'WelcomeMessage'
}

export type ExchangeTokenResponse = {
  __typename?: 'ExchangeTokenResponse';
  errorMessage?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type ExportProfile = {
  __typename?: 'ExportProfile';
  avatarUrl?: Maybe<Scalars['String']>;
  circlesAddress: Scalars['String'];
  displayName: Scalars['String'];
  lastChange: Scalars['Date'];
};

export type ExportTrustRelation = {
  __typename?: 'ExportTrustRelation';
  lastChange: Scalars['Date'];
  trustLimit: Scalars['Int'];
  trusteeAddress: Scalars['String'];
  trusterAddress: Scalars['String'];
};

export type Favorite = {
  __typename?: 'Favorite';
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  createdByAddress: Scalars['String'];
  favorite?: Maybe<Profile>;
  favoriteAddress: Scalars['String'];
};

export type FibonacciGoals = {
  __typename?: 'FibonacciGoals';
  currentValue: Scalars['Int'];
  lastGoal: Scalars['Int'];
  nextGoal: Scalars['Int'];
};

export enum Gender {
  Divers = 'DIVERS',
  Female = 'FEMALE',
  Male = 'MALE'
}

export type Geolocation = {
  lat: Scalars['Float'];
  lon: Scalars['Float'];
};

export type GnosisSafeEthTransfer = IEventPayload & {
  __typename?: 'GnosisSafeEthTransfer';
  from: Scalars['String'];
  from_profile?: Maybe<Profile>;
  initiator: Scalars['String'];
  tags: Array<Tag>;
  to: Scalars['String'];
  to_profile?: Maybe<Profile>;
  transaction_hash: Scalars['String'];
  value: Scalars['String'];
};

export type IAggregatePayload = {
  lastUpdatedAt?: Maybe<Scalars['String']>;
};

export type IEventPayload = {
  transaction_hash?: Maybe<Scalars['String']>;
};

export type InvitationCreated = IEventPayload & {
  __typename?: 'InvitationCreated';
  code: Scalars['String'];
  name: Scalars['String'];
  transaction_hash?: Maybe<Scalars['String']>;
};

export type InvitationRedeemed = IEventPayload & {
  __typename?: 'InvitationRedeemed';
  code: Scalars['String'];
  name: Scalars['String'];
  redeemedBy?: Maybe<Scalars['String']>;
  redeemedBy_profile?: Maybe<Profile>;
  transaction_hash?: Maybe<Scalars['String']>;
};

export type LeaderboardEntry = {
  __typename?: 'LeaderboardEntry';
  createdByCirclesAddress: Scalars['String'];
  createdByProfile?: Maybe<Profile>;
  inviteCount: Scalars['Int'];
};

export enum LinkTargetType {
  Business = 'Business',
  Person = 'Person'
}

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  errorMessage?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type MarkAsReadResult = {
  __typename?: 'MarkAsReadResult';
  count: Scalars['Int'];
};

export type MemberAdded = IEventPayload & {
  __typename?: 'MemberAdded';
  createdBy: Scalars['String'];
  createdBy_profile?: Maybe<Profile>;
  isAdmin: Scalars['Boolean'];
  member: Scalars['String'];
  member_profile?: Maybe<Profile>;
  organisation: Scalars['String'];
  organisation_profile?: Maybe<Organisation>;
  transaction_hash?: Maybe<Scalars['String']>;
};

export type Members = IAggregatePayload & {
  __typename?: 'Members';
  lastUpdatedAt: Scalars['String'];
  members: Array<ProfileOrOrganisation>;
};

export type Membership = {
  __typename?: 'Membership';
  acceptedAt?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  createdBy?: Maybe<Profile>;
  createdByProfileId: Scalars['Int'];
  isAdmin: Scalars['Boolean'];
  organisation: Organisation;
  rejectedAt?: Maybe<Scalars['String']>;
  validTo?: Maybe<Scalars['String']>;
};

export type MembershipAccepted = IEventPayload & {
  __typename?: 'MembershipAccepted';
  createdBy: Scalars['String'];
  createdBy_profile?: Maybe<Profile>;
  member: Scalars['String'];
  member_profile?: Maybe<Profile>;
  organisation: Scalars['String'];
  organisation_profile?: Maybe<Organisation>;
  transaction_hash?: Maybe<Scalars['String']>;
};

export type MembershipOffer = IEventPayload & {
  __typename?: 'MembershipOffer';
  createdBy: Scalars['String'];
  createdBy_profile?: Maybe<Profile>;
  isAdmin: Scalars['Boolean'];
  organisation: Scalars['String'];
  organisation_profile?: Maybe<Organisation>;
  transaction_hash?: Maybe<Scalars['String']>;
};

export type MembershipRejected = IEventPayload & {
  __typename?: 'MembershipRejected';
  member: Scalars['String'];
  member_profile?: Maybe<Profile>;
  organisation: Scalars['String'];
  organisation_profile?: Maybe<Organisation>;
  transaction_hash?: Maybe<Scalars['String']>;
};

export type Memberships = IAggregatePayload & {
  __typename?: 'Memberships';
  lastUpdatedAt: Scalars['String'];
  organisations: Array<Organisation>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptMembership?: Maybe<AcceptMembershipResult>;
  acknowledge: Scalars['Boolean'];
  addMember?: Maybe<AddMemberResult>;
  addNewLang?: Maybe<Scalars['Int']>;
  claimInvitation: ClaimInvitationResult;
  createNewStringAndKey?: Maybe<I18n>;
  createTestInvitation: CreateInvitationResult;
  getNonce: Nonce;
  importOrganisationsOfAccount: Array<Organisation>;
  logout: LogoutResponse;
  markAllAsRead: MarkAsReadResult;
  markAsRead: MarkAsReadResult;
  redeemClaimedInvitation: RedeemClaimedInvitationResult;
  rejectMembership?: Maybe<RejectMembershipResult>;
  removeMember?: Maybe<RemoveMemberResult>;
  requestSessionChallenge: Scalars['String'];
  requestUpdateSafe: RequestUpdateSafeResponse;
  revokeSafeVerification: VerifySafeResult;
  sendMessage: SendMessageResult;
  sendSignedTransaction: SendSignedTransactionResult;
  setIsFavorite: Scalars['Boolean'];
  setStringUpdateState?: Maybe<I18n>;
  shareLink: Scalars['String'];
  surveyData: SurveyDataResult;
  tagTransaction: TagTransactionResult;
  updateSafe: UpdateSafeResponse;
  updateValue?: Maybe<I18n>;
  upsertOrganisation: CreateOrganisationResult;
  upsertProfile: Profile;
  upsertTag: Tag;
  verifySafe: VerifySafeResult;
  verifySessionChallenge?: Maybe<ExchangeTokenResponse>;
};


export type MutationAcceptMembershipArgs = {
  membershipId: Scalars['Int'];
};


export type MutationAcknowledgeArgs = {
  safeAddress?: InputMaybe<Scalars['String']>;
  until: Scalars['Date'];
};


export type MutationAddMemberArgs = {
  groupId: Scalars['String'];
  memberAddress: Scalars['String'];
};


export type MutationAddNewLangArgs = {
  langToCopyFrom?: InputMaybe<Scalars['String']>;
  langToCreate?: InputMaybe<Scalars['String']>;
};


export type MutationClaimInvitationArgs = {
  code: Scalars['String'];
};


export type MutationCreateNewStringAndKeyArgs = {
  createdBy?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
};


export type MutationGetNonceArgs = {
  data: NonceRequest;
};


export type MutationMarkAsReadArgs = {
  entries: Array<Scalars['Int']>;
};


export type MutationRejectMembershipArgs = {
  membershipId: Scalars['Int'];
};


export type MutationRemoveMemberArgs = {
  groupId: Scalars['String'];
  memberAddress: Scalars['String'];
};


export type MutationRequestSessionChallengeArgs = {
  address: Scalars['String'];
};


export type MutationRequestUpdateSafeArgs = {
  data: RequestUpdateSafeInput;
};


export type MutationRevokeSafeVerificationArgs = {
  safeAddress: Scalars['String'];
};


export type MutationSendMessageArgs = {
  content: Scalars['String'];
  fromSafeAddress?: InputMaybe<Scalars['String']>;
  toSafeAddress: Scalars['String'];
};


export type MutationSendSignedTransactionArgs = {
  data: SendSignedTransactionInput;
};


export type MutationSetIsFavoriteArgs = {
  circlesAddress: Scalars['String'];
  isFavorite: Scalars['Boolean'];
};


export type MutationSetStringUpdateStateArgs = {
  key?: InputMaybe<Scalars['String']>;
};


export type MutationShareLinkArgs = {
  targetKey: Scalars['String'];
  targetType: LinkTargetType;
};


export type MutationSurveyDataArgs = {
  data: SurveyDataInput;
};


export type MutationTagTransactionArgs = {
  tag: CreateTagInput;
  transactionHash: Scalars['String'];
};


export type MutationUpdateSafeArgs = {
  data: UpdateSafeInput;
};


export type MutationUpdateValueArgs = {
  createdBy?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};


export type MutationUpsertOrganisationArgs = {
  organisation: UpsertOrganisationInput;
};


export type MutationUpsertProfileArgs = {
  data: UpsertProfileInput;
};


export type MutationUpsertTagArgs = {
  data: UpsertTagInput;
};


export type MutationVerifySafeArgs = {
  safeAddress: Scalars['String'];
};


export type MutationVerifySessionChallengeArgs = {
  challenge: Scalars['String'];
  signature: Scalars['String'];
};

export type MyInviteRank = {
  __typename?: 'MyInviteRank';
  rank: Scalars['Int'];
  redeemedInvitationsCount: Scalars['Int'];
};

export type NewUser = IEventPayload & {
  __typename?: 'NewUser';
  profile: Profile;
  transaction_hash?: Maybe<Scalars['String']>;
};

export type Nonce = {
  __typename?: 'Nonce';
  nonce: Scalars['Int'];
};

export type NonceRequest = {
  address?: InputMaybe<Scalars['String']>;
  signature: Scalars['String'];
};

export type NotificationEvent = {
  __typename?: 'NotificationEvent';
  from: Scalars['String'];
  itemId?: Maybe<Scalars['Int']>;
  to: Scalars['String'];
  transaction_hash?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type Organisation = {
  __typename?: 'Organisation';
  avatarMimeType?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  circlesAddress?: Maybe<Scalars['String']>;
  circlesSafeOwner?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  displayCurrency?: Maybe<DisplayCurrency>;
  displayName?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['Int'];
  largeBannerUrl?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  location?: Maybe<Scalars['String']>;
  locationName?: Maybe<Scalars['String']>;
  lon?: Maybe<Scalars['Float']>;
  members?: Maybe<Array<ProfileOrOrganisation>>;
  smallBannerUrl?: Maybe<Scalars['String']>;
  trustsYou?: Maybe<Scalars['Int']>;
};

export type OrganisationCreated = IEventPayload & {
  __typename?: 'OrganisationCreated';
  organisation: Scalars['String'];
  organisation_profile?: Maybe<Organisation>;
  transaction_hash?: Maybe<Scalars['String']>;
};

export type PaginationArgs = {
  continueAt?: InputMaybe<Scalars['String']>;
  continueAtId?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
  order: SortOrder;
};

export type Profile = {
  __typename?: 'Profile';
  age?: Maybe<Scalars['Int']>;
  askedForEmailAddress: Scalars['Boolean'];
  avatarCid?: Maybe<Scalars['String']>;
  avatarMimeType?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  balances?: Maybe<ProfileBalances>;
  canInvite?: Maybe<Scalars['Boolean']>;
  category?: Maybe<BusinessCategory>;
  circlesAddress?: Maybe<Scalars['String']>;
  circlesSafeOwner?: Maybe<Scalars['String']>;
  circlesTokenAddress?: Maybe<Scalars['String']>;
  claimedInvitation?: Maybe<ClaimedInvitation>;
  confirmedLegalAge?: Maybe<Scalars['Int']>;
  contacts?: Maybe<Array<Contact>>;
  country?: Maybe<Scalars['String']>;
  displayCurrency?: Maybe<DisplayCurrency>;
  displayName?: Maybe<Scalars['String']>;
  displayTimeCircles?: Maybe<Scalars['Boolean']>;
  dream?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  gender?: Maybe<Gender>;
  id: Scalars['Int'];
  invitationLink?: Maybe<Scalars['String']>;
  invitationTransaction?: Maybe<ProfileEvent>;
  largeBannerUrl?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  location?: Maybe<Scalars['String']>;
  locationName?: Maybe<Scalars['String']>;
  lon?: Maybe<Scalars['Float']>;
  members?: Maybe<Array<Profile>>;
  memberships?: Maybe<Array<Membership>>;
  newsletter?: Maybe<Scalars['Boolean']>;
  origin?: Maybe<ProfileOrigin>;
  provenUniqueness?: Maybe<Scalars['Boolean']>;
  smallBannerUrl?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  successorOfCirclesAddress?: Maybe<Scalars['String']>;
  surveyDataSessionId?: Maybe<Scalars['String']>;
  type?: Maybe<ProfileType>;
  verifications?: Maybe<Array<Verification>>;
};


export type ProfileBalancesArgs = {
  filter?: InputMaybe<CrcBalanceFilter>;
};


export type ProfileContactsArgs = {
  filter?: InputMaybe<ContactFilter>;
};

export type ProfileAggregate = {
  __typename?: 'ProfileAggregate';
  payload: AggregatePayload;
  safe_address: Scalars['String'];
  safe_address_profile?: Maybe<Profile>;
  type: Scalars['String'];
};

export type ProfileAggregateFilter = {
  contacts?: InputMaybe<ContactAggregateFilter>;
  crcBalance?: InputMaybe<CrcBalanceAggregateFilter>;
};

export type ProfileBalances = {
  __typename?: 'ProfileBalances';
  crcBalances?: Maybe<CrcBalances>;
  erc20Balances?: Maybe<Erc20Balances>;
};

export type ProfileEvent = {
  __typename?: 'ProfileEvent';
  block_number?: Maybe<Scalars['Int']>;
  contact_address?: Maybe<Scalars['String']>;
  contact_address_profile?: Maybe<Profile>;
  direction: Scalars['String'];
  payload?: Maybe<EventPayload>;
  safe_address: Scalars['String'];
  safe_address_profile?: Maybe<Profile>;
  tags?: Maybe<Array<Tag>>;
  timestamp: Scalars['String'];
  transaction_hash?: Maybe<Scalars['String']>;
  transaction_index?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
  unread: Scalars['Boolean'];
  unread_marker_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['String']>;
};

export type ProfileEventFilter = {
  direction?: InputMaybe<Direction>;
  from?: InputMaybe<Scalars['String']>;
  readOnly?: InputMaybe<Scalars['Boolean']>;
  to?: InputMaybe<Scalars['String']>;
  transactionHash?: InputMaybe<Scalars['String']>;
  unreadOnly?: InputMaybe<Scalars['Boolean']>;
  with?: InputMaybe<Scalars['String']>;
};

export type ProfileOrOrganisation = Organisation | Profile;

export enum ProfileOrigin {
  CirclesGarden = 'CirclesGarden',
  CirclesLand = 'CirclesLand',
  Unknown = 'Unknown'
}

export enum ProfileType {
  Organisation = 'ORGANISATION',
  Person = 'PERSON',
  Region = 'REGION'
}

export type PublicEvent = {
  __typename?: 'PublicEvent';
  block_number?: Maybe<Scalars['Int']>;
  contact_address?: Maybe<Scalars['String']>;
  contact_address_profile?: Maybe<Profile>;
  payload?: Maybe<EventPayload>;
  timestamp: Scalars['String'];
  transaction_hash?: Maybe<Scalars['String']>;
  transaction_index?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  aggregates: Array<ProfileAggregate>;
  allBaliVillages: Array<BaliVillage>;
  allBusinessCategories: Array<BusinessCategory>;
  allBusinesses: Array<Businesses>;
  allProfiles: Array<Maybe<ExportProfile>>;
  allTrusts: Array<ExportTrustRelation>;
  claimedInvitation?: Maybe<ClaimedInvitation>;
  clientAssertionJwt: Scalars['String'];
  commonTrust: Array<CommonTrust>;
  compareTrustRelations: CompareTrustRelationsResult;
  directPath: TransitivePath;
  events: Array<ProfileEvent>;
  findInvitationCreator?: Maybe<Profile>;
  findSafesByOwner: Array<SafeInfo>;
  getAllStringsByMaxVersion?: Maybe<Array<Maybe<I18n>>>;
  getAllStringsByMaxVersionAndLang?: Maybe<Array<Maybe<I18n>>>;
  getAvailableLanguages?: Maybe<Array<Maybe<I18n>>>;
  getOlderVersionsByKeyAndLang?: Maybe<Array<Maybe<I18n>>>;
  getPaginatedStrings?: Maybe<Array<Maybe<I18n>>>;
  getPaginatedStringsToUpdate?: Maybe<Array<Maybe<I18n>>>;
  getRandomAccount?: Maybe<RandomAccount>;
  getStringByMaxVersion?: Maybe<I18n>;
  getStringsToBeUpdatedAmount?: Maybe<Scalars['Int']>;
  hubSignupTransaction?: Maybe<ProfileEvent>;
  init: SessionInfo;
  invitationTransaction?: Maybe<ProfileEvent>;
  lastAcknowledgedAt?: Maybe<Scalars['Date']>;
  myFavorites: Array<Favorite>;
  myInvitations: Array<CreatedInvitation>;
  myProfile?: Maybe<Profile>;
  organisations: Array<Organisation>;
  organisationsByAddress: Array<Organisation>;
  paymentPath: TransitivePath;
  profilesById: Array<Profile>;
  profilesBySafeAddress: Array<Profile>;
  recentProfiles: Array<Profile>;
  regions: Array<Organisation>;
  safeInfo?: Maybe<SafeInfo>;
  search: Array<Profile>;
  sessionInfo: SessionInfo;
  signMessage: Scalars['String'];
  stats: Stats;
  tagById?: Maybe<Tag>;
  tags: Array<Tag>;
  trustRelations: Array<TrustRelation>;
  verifications: Array<Verification>;
  version: Version;
};


export type QueryAggregatesArgs = {
  filter?: InputMaybe<ProfileAggregateFilter>;
  safeAddress: Scalars['String'];
  types: Array<AggregateType>;
};


export type QueryAllBusinessesArgs = {
  queryParams?: InputMaybe<QueryAllBusinessesParameters>;
};


export type QueryAllProfilesArgs = {
  sinceLastChange?: InputMaybe<Scalars['Date']>;
};


export type QueryAllTrustsArgs = {
  sinceLastChange?: InputMaybe<Scalars['Date']>;
};


export type QueryCommonTrustArgs = {
  safeAddress1: Scalars['String'];
  safeAddress2: Scalars['String'];
};


export type QueryCompareTrustRelationsArgs = {
  data: CompareTrustRelationsInput;
};


export type QueryDirectPathArgs = {
  amount: Scalars['String'];
  from: Scalars['String'];
  to: Scalars['String'];
};


export type QueryEventsArgs = {
  filter?: InputMaybe<ProfileEventFilter>;
  pagination: PaginationArgs;
  safeAddress: Scalars['String'];
  types: Array<EventType>;
};


export type QueryFindInvitationCreatorArgs = {
  code: Scalars['String'];
};


export type QueryFindSafesByOwnerArgs = {
  owner: Scalars['String'];
};


export type QueryGetAllStringsByMaxVersionAndLangArgs = {
  lang?: InputMaybe<Scalars['String']>;
};


export type QueryGetOlderVersionsByKeyAndLangArgs = {
  key?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Scalars['String']>;
};


export type QueryGetPaginatedStringsArgs = {
  key?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Scalars['String']>;
  pagination_key?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};


export type QueryGetPaginatedStringsToUpdateArgs = {
  key?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Scalars['String']>;
  needsUpdate?: InputMaybe<Scalars['Boolean']>;
  pagination_key?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};


export type QueryGetStringByMaxVersionArgs = {
  key?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Scalars['String']>;
};


export type QueryGetStringsToBeUpdatedAmountArgs = {
  key?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Scalars['String']>;
};


export type QueryLastAcknowledgedAtArgs = {
  safeAddress: Scalars['String'];
};


export type QueryOrganisationsArgs = {
  pagination?: InputMaybe<PaginationArgs>;
};


export type QueryOrganisationsByAddressArgs = {
  addresses: Array<Scalars['String']>;
};


export type QueryPaymentPathArgs = {
  amount: Scalars['String'];
  from: Scalars['String'];
  to: Scalars['String'];
};


export type QueryProfilesByIdArgs = {
  ids: Array<Scalars['Int']>;
};


export type QueryProfilesBySafeAddressArgs = {
  safeAddresses: Array<Scalars['String']>;
};


export type QueryRecentProfilesArgs = {
  pagination?: InputMaybe<PaginationArgs>;
};


export type QueryRegionsArgs = {
  pagination?: InputMaybe<PaginationArgs>;
};


export type QuerySafeInfoArgs = {
  safeAddress?: InputMaybe<Scalars['String']>;
};


export type QuerySearchArgs = {
  query: SearchInput;
};


export type QuerySignMessageArgs = {
  key: Scalars['String'];
  message: Scalars['String'];
};


export type QueryTagByIdArgs = {
  id: Scalars['Int'];
};


export type QueryTagsArgs = {
  query: QueryTagsInput;
};


export type QueryTrustRelationsArgs = {
  safeAddress: Scalars['String'];
};


export type QueryVerificationsArgs = {
  filter?: InputMaybe<VerifiedSafesFilter>;
  pagination?: InputMaybe<PaginationArgs>;
};

export type QueryAllBusinessesConditions = {
  inCategories?: InputMaybe<Array<Scalars['Int']>>;
  inCirclesAddress?: InputMaybe<Array<Scalars['String']>>;
};

export type QueryAllBusinessesOrder = {
  orderBy: QueryAllBusinessesOrderOptions;
};

export enum QueryAllBusinessesOrderOptions {
  Alphabetical = 'Alphabetical',
  Favorites = 'Favorites',
  MostPopular = 'MostPopular',
  Nearest = 'Nearest',
  Newest = 'Newest',
  Oldest = 'Oldest'
}

export type QueryAllBusinessesParameters = {
  cursor?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<QueryAllBusinessesOrder>;
  ownCoordinates?: InputMaybe<Geolocation>;
  where?: InputMaybe<QueryAllBusinessesConditions>;
};

export type QueryProfileInput = {
  circlesAddress?: InputMaybe<Array<Scalars['String']>>;
  country?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Array<Scalars['Int']>>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type QueryTagsInput = {
  typeId_in: Array<Scalars['String']>;
  value_like?: InputMaybe<Scalars['String']>;
};

export type QueryUniqueProfileInput = {
  id: Scalars['Int'];
};

export type RandomAccount = {
  __typename?: 'RandomAccount';
  address?: Maybe<Scalars['String']>;
  privateKey?: Maybe<Scalars['String']>;
};

export type RedeemClaimedInvitationResult = {
  __typename?: 'RedeemClaimedInvitationResult';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  transactionHash?: Maybe<Scalars['String']>;
};

export type RejectMembershipResult = {
  __typename?: 'RejectMembershipResult';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type RemoveMemberResult = {
  __typename?: 'RemoveMemberResult';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type RequestUpdateSafeInput = {
  newSafeAddress: Scalars['String'];
};

export type RequestUpdateSafeResponse = {
  __typename?: 'RequestUpdateSafeResponse';
  challenge?: Maybe<Scalars['String']>;
  errorMessage?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type SafeAddressByOwnerResult = {
  __typename?: 'SafeAddressByOwnerResult';
  safeAddress: Scalars['String'];
  type: Scalars['String'];
};

export type SafeInfo = {
  __typename?: 'SafeInfo';
  lastUbiAt?: Maybe<Scalars['String']>;
  randomValue?: Maybe<Scalars['String']>;
  safeAddress: Scalars['String'];
  safeProfile?: Maybe<Profile>;
  tokenAddress?: Maybe<Scalars['String']>;
  type: AccountType;
};

export type SafeVerified = IEventPayload & {
  __typename?: 'SafeVerified';
  organisation: Scalars['String'];
  organisation_profile?: Maybe<Organisation>;
  safe_address: Scalars['String'];
  transaction_hash?: Maybe<Scalars['String']>;
};

export type SearchInput = {
  profileType?: InputMaybe<ProfileType>;
  searchString: Scalars['String'];
};

export type SendMessageResult = {
  __typename?: 'SendMessageResult';
  error?: Maybe<Scalars['String']>;
  event?: Maybe<ProfileEvent>;
  success: Scalars['Boolean'];
};

export type SendSignedTransactionInput = {
  signedTransaction: Scalars['String'];
};

export type SendSignedTransactionResult = {
  __typename?: 'SendSignedTransactionResult';
  transactionHash: Scalars['String'];
};

export type Server = {
  __typename?: 'Server';
  version: Scalars['String'];
};

export type SessionInfo = {
  __typename?: 'SessionInfo';
  capabilities: Array<Capability>;
  hasProfile?: Maybe<Scalars['Boolean']>;
  isLoggedOn: Scalars['Boolean'];
  profile?: Maybe<Profile>;
  profileId?: Maybe<Scalars['Int']>;
  sessionId?: Maybe<Scalars['String']>;
  useShortSignup?: Maybe<Scalars['Boolean']>;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Stats = {
  __typename?: 'Stats';
  goals: FibonacciGoals;
  leaderboard: Array<LeaderboardEntry>;
  myRank: MyInviteRank;
  profilesCount: Scalars['Int'];
  verificationsCount: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  events: NotificationEvent;
};

export type SurveyData = {
  __typename?: 'SurveyData';
  allConsentsGiven: Scalars['Boolean'];
  dateOfBirth: Scalars['Date'];
  gender: Scalars['String'];
  id?: Maybe<Scalars['Int']>;
  sesssionId: Scalars['String'];
  villageId: Scalars['Int'];
};

export type SurveyDataInput = {
  allConsentsGiven: Scalars['Boolean'];
  dateOfBirth: Scalars['Date'];
  gender: Scalars['String'];
  sessionId: Scalars['String'];
  villageId: Scalars['Int'];
};

export type SurveyDataResult = {
  __typename?: 'SurveyDataResult';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  surveyData?: Maybe<SurveyData>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int'];
  order?: Maybe<Scalars['Int']>;
  typeId: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type TagTransactionResult = {
  __typename?: 'TagTransactionResult';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  tag?: Maybe<Tag>;
};

export type TransitivePath = {
  __typename?: 'TransitivePath';
  flow: Scalars['String'];
  isValid: Scalars['Boolean'];
  requestedAmount: Scalars['String'];
  transfers: Array<TransitiveTransfer>;
};

export type TransitiveTransfer = {
  __typename?: 'TransitiveTransfer';
  from: Scalars['String'];
  to: Scalars['String'];
  token?: Maybe<Scalars['String']>;
  tokenOwner: Scalars['String'];
  value: Scalars['String'];
};

export type TrustComparison = {
  __typename?: 'TrustComparison';
  canSendTo: Scalars['String'];
  differences: Array<TrustDifference>;
};

export type TrustDifference = {
  __typename?: 'TrustDifference';
  operation: Scalars['String'];
  user: Scalars['String'];
};

export enum TrustDirection {
  In = 'IN',
  Mutual = 'MUTUAL',
  Out = 'OUT'
}

export type TrustRelation = {
  __typename?: 'TrustRelation';
  direction: TrustDirection;
  otherSafeAddress: Scalars['String'];
  otherSafeAddressProfile?: Maybe<Profile>;
  safeAddress: Scalars['String'];
  safeAddressProfile?: Maybe<Profile>;
};

export type UpdateSafeInput = {
  signature: Scalars['String'];
};

export type UpdateSafeResponse = {
  __typename?: 'UpdateSafeResponse';
  errorMessage?: Maybe<Scalars['String']>;
  newSafeAddress?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type UpsertOrganisationInput = {
  avatarMimeType?: InputMaybe<Scalars['String']>;
  avatarUrl?: InputMaybe<Scalars['String']>;
  businessCategoryId?: InputMaybe<Scalars['Int']>;
  businessHoursFriday?: InputMaybe<Scalars['String']>;
  businessHoursMonday?: InputMaybe<Scalars['String']>;
  businessHoursSaturday?: InputMaybe<Scalars['String']>;
  businessHoursSunday?: InputMaybe<Scalars['String']>;
  businessHoursThursday?: InputMaybe<Scalars['String']>;
  businessHoursTuesday?: InputMaybe<Scalars['String']>;
  businessHoursWednesday?: InputMaybe<Scalars['String']>;
  circlesAddress?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  displayCurrency?: InputMaybe<DisplayCurrency>;
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  largeBannerUrl?: InputMaybe<Scalars['String']>;
  lat?: InputMaybe<Scalars['Float']>;
  location?: InputMaybe<Scalars['String']>;
  locationName?: InputMaybe<Scalars['String']>;
  lon?: InputMaybe<Scalars['Float']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  smallBannerUrl?: InputMaybe<Scalars['String']>;
};

export type UpsertProfileInput = {
  age?: InputMaybe<Scalars['Int']>;
  askedForEmailAddress?: InputMaybe<Scalars['Boolean']>;
  avatarCid?: InputMaybe<Scalars['String']>;
  avatarMimeType?: InputMaybe<Scalars['String']>;
  avatarUrl?: InputMaybe<Scalars['String']>;
  circlesAddress?: InputMaybe<Scalars['String']>;
  circlesSafeOwner?: InputMaybe<Scalars['String']>;
  circlesTokenAddress?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  displayCurrency?: InputMaybe<DisplayCurrency>;
  displayTimeCircles?: InputMaybe<Scalars['Boolean']>;
  dream?: InputMaybe<Scalars['String']>;
  emailAddress?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  gender?: InputMaybe<Gender>;
  id?: InputMaybe<Scalars['Int']>;
  lastName?: InputMaybe<Scalars['String']>;
  lat?: InputMaybe<Scalars['Float']>;
  location?: InputMaybe<Scalars['String']>;
  locationName?: InputMaybe<Scalars['String']>;
  lon?: InputMaybe<Scalars['Float']>;
  newsletter?: InputMaybe<Scalars['Boolean']>;
  status: Scalars['String'];
  successorOfCirclesAddress?: InputMaybe<Scalars['String']>;
  surveyDataSessionId?: InputMaybe<Scalars['String']>;
};

export type UpsertTagInput = {
  id?: InputMaybe<Scalars['Int']>;
  typeId: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type Verification = {
  __typename?: 'Verification';
  createdAt: Scalars['String'];
  revokedAt?: Maybe<Scalars['String']>;
  revokedProfile?: Maybe<Profile>;
  verificationRewardTransaction?: Maybe<ProfileEvent>;
  verificationRewardTransactionHash: Scalars['String'];
  verifiedProfile?: Maybe<Profile>;
  verifiedSafeAddress: Scalars['String'];
  verifierProfile?: Maybe<Organisation>;
  verifierSafeAddress: Scalars['String'];
};

export type VerifiedSafesFilter = {
  addresses?: InputMaybe<Array<Scalars['String']>>;
};

export type VerifySafeResult = {
  __typename?: 'VerifySafeResult';
  success: Scalars['Boolean'];
};

export type Version = {
  __typename?: 'Version';
  major: Scalars['Int'];
  minor: Scalars['Int'];
  revision: Scalars['Int'];
};

export type WelcomeMessage = IEventPayload & {
  __typename?: 'WelcomeMessage';
  invitedBy: Scalars['String'];
  invitedBy_profile?: Maybe<Profile>;
  transaction_hash?: Maybe<Scalars['String']>;
};

export type I18n = {
  __typename?: 'i18n';
  createdBy?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  lang?: Maybe<Scalars['String']>;
  needsUpdate?: Maybe<Scalars['Boolean']>;
  pagination_key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
  AccountType: AccountType;
  AddMemberResult: ResolverTypeWrapper<AddMemberResult>;
  AggregatePayload: ResolversTypes['Contacts'] | ResolversTypes['CrcBalances'] | ResolversTypes['Erc20Balances'] | ResolversTypes['Members'] | ResolversTypes['Memberships'];
  AggregateType: AggregateType;
  AssetBalance: ResolverTypeWrapper<AssetBalance>;
  BaliVillage: ResolverTypeWrapper<BaliVillage>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BusinessCategory: ResolverTypeWrapper<BusinessCategory>;
  Businesses: ResolverTypeWrapper<Businesses>;
  Capability: ResolverTypeWrapper<Capability>;
  CapabilityType: CapabilityType;
  ClaimInvitationResult: ResolverTypeWrapper<ClaimInvitationResult>;
  ClaimedInvitation: ResolverTypeWrapper<ClaimedInvitation>;
  CommonTrust: ResolverTypeWrapper<CommonTrust>;
  CompareTrustRelationsInput: CompareTrustRelationsInput;
  CompareTrustRelationsResult: ResolverTypeWrapper<CompareTrustRelationsResult>;
  Contact: ResolverTypeWrapper<Contact>;
  ContactAggregateFilter: ContactAggregateFilter;
  ContactDirection: ContactDirection;
  ContactFilter: ContactFilter;
  ContactPoint: ResolverTypeWrapper<ContactPoint>;
  Contacts: ResolverTypeWrapper<Contacts>;
  CrcBalanceAggregateFilter: CrcBalanceAggregateFilter;
  CrcBalanceFilter: CrcBalanceFilter;
  CrcBalances: ResolverTypeWrapper<CrcBalances>;
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
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Direction: Direction;
  DisplayCurrency: DisplayCurrency;
  Erc20Balances: ResolverTypeWrapper<Erc20Balances>;
  Erc20Transfer: ResolverTypeWrapper<Erc20Transfer>;
  EthTransfer: ResolverTypeWrapper<EthTransfer>;
  EventPayload: ResolversTypes['CrcHubTransfer'] | ResolversTypes['CrcMinting'] | ResolversTypes['CrcSignup'] | ResolversTypes['CrcTokenTransfer'] | ResolversTypes['CrcTrust'] | ResolversTypes['Erc20Transfer'] | ResolversTypes['EthTransfer'] | ResolversTypes['GnosisSafeEthTransfer'] | ResolversTypes['InvitationCreated'] | ResolversTypes['InvitationRedeemed'] | ResolversTypes['MemberAdded'] | ResolversTypes['MembershipAccepted'] | ResolversTypes['MembershipOffer'] | ResolversTypes['MembershipRejected'] | ResolversTypes['NewUser'] | ResolversTypes['OrganisationCreated'] | ResolversTypes['SafeVerified'] | ResolversTypes['WelcomeMessage'];
  EventType: EventType;
  ExchangeTokenResponse: ResolverTypeWrapper<ExchangeTokenResponse>;
  ExportProfile: ResolverTypeWrapper<ExportProfile>;
  ExportTrustRelation: ResolverTypeWrapper<ExportTrustRelation>;
  Favorite: ResolverTypeWrapper<Favorite>;
  FibonacciGoals: ResolverTypeWrapper<FibonacciGoals>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Gender: Gender;
  Geolocation: Geolocation;
  GnosisSafeEthTransfer: ResolverTypeWrapper<GnosisSafeEthTransfer>;
  IAggregatePayload: ResolversTypes['Contacts'] | ResolversTypes['CrcBalances'] | ResolversTypes['Erc20Balances'] | ResolversTypes['Members'] | ResolversTypes['Memberships'];
  IEventPayload: ResolversTypes['CrcHubTransfer'] | ResolversTypes['CrcMinting'] | ResolversTypes['CrcSignup'] | ResolversTypes['CrcTokenTransfer'] | ResolversTypes['CrcTrust'] | ResolversTypes['Erc20Transfer'] | ResolversTypes['EthTransfer'] | ResolversTypes['GnosisSafeEthTransfer'] | ResolversTypes['InvitationCreated'] | ResolversTypes['InvitationRedeemed'] | ResolversTypes['MemberAdded'] | ResolversTypes['MembershipAccepted'] | ResolversTypes['MembershipOffer'] | ResolversTypes['MembershipRejected'] | ResolversTypes['NewUser'] | ResolversTypes['OrganisationCreated'] | ResolversTypes['SafeVerified'] | ResolversTypes['WelcomeMessage'];
  Int: ResolverTypeWrapper<Scalars['Int']>;
  InvitationCreated: ResolverTypeWrapper<InvitationCreated>;
  InvitationRedeemed: ResolverTypeWrapper<InvitationRedeemed>;
  LeaderboardEntry: ResolverTypeWrapper<LeaderboardEntry>;
  LinkTargetType: LinkTargetType;
  LogoutResponse: ResolverTypeWrapper<LogoutResponse>;
  MarkAsReadResult: ResolverTypeWrapper<MarkAsReadResult>;
  MemberAdded: ResolverTypeWrapper<MemberAdded>;
  Members: ResolverTypeWrapper<Omit<Members, 'members'> & { members: Array<ResolversTypes['ProfileOrOrganisation']> }>;
  Membership: ResolverTypeWrapper<Membership>;
  MembershipAccepted: ResolverTypeWrapper<MembershipAccepted>;
  MembershipOffer: ResolverTypeWrapper<MembershipOffer>;
  MembershipRejected: ResolverTypeWrapper<MembershipRejected>;
  Memberships: ResolverTypeWrapper<Memberships>;
  Mutation: ResolverTypeWrapper<{}>;
  MyInviteRank: ResolverTypeWrapper<MyInviteRank>;
  NewUser: ResolverTypeWrapper<NewUser>;
  Nonce: ResolverTypeWrapper<Nonce>;
  NonceRequest: NonceRequest;
  NotificationEvent: ResolverTypeWrapper<NotificationEvent>;
  Organisation: ResolverTypeWrapper<Omit<Organisation, 'members'> & { members?: Maybe<Array<ResolversTypes['ProfileOrOrganisation']>> }>;
  OrganisationCreated: ResolverTypeWrapper<OrganisationCreated>;
  PaginationArgs: PaginationArgs;
  Profile: ResolverTypeWrapper<Profile>;
  ProfileAggregate: ResolverTypeWrapper<Omit<ProfileAggregate, 'payload'> & { payload: ResolversTypes['AggregatePayload'] }>;
  ProfileAggregateFilter: ProfileAggregateFilter;
  ProfileBalances: ResolverTypeWrapper<ProfileBalances>;
  ProfileEvent: ResolverTypeWrapper<Omit<ProfileEvent, 'payload'> & { payload?: Maybe<ResolversTypes['EventPayload']> }>;
  ProfileEventFilter: ProfileEventFilter;
  ProfileOrOrganisation: ResolversTypes['Organisation'] | ResolversTypes['Profile'];
  ProfileOrigin: ProfileOrigin;
  ProfileType: ProfileType;
  PublicEvent: ResolverTypeWrapper<Omit<PublicEvent, 'payload'> & { payload?: Maybe<ResolversTypes['EventPayload']> }>;
  Query: ResolverTypeWrapper<{}>;
  QueryAllBusinessesConditions: QueryAllBusinessesConditions;
  QueryAllBusinessesOrder: QueryAllBusinessesOrder;
  QueryAllBusinessesOrderOptions: QueryAllBusinessesOrderOptions;
  QueryAllBusinessesParameters: QueryAllBusinessesParameters;
  QueryProfileInput: QueryProfileInput;
  QueryTagsInput: QueryTagsInput;
  QueryUniqueProfileInput: QueryUniqueProfileInput;
  RandomAccount: ResolverTypeWrapper<RandomAccount>;
  RedeemClaimedInvitationResult: ResolverTypeWrapper<RedeemClaimedInvitationResult>;
  RejectMembershipResult: ResolverTypeWrapper<RejectMembershipResult>;
  RemoveMemberResult: ResolverTypeWrapper<RemoveMemberResult>;
  RequestUpdateSafeInput: RequestUpdateSafeInput;
  RequestUpdateSafeResponse: ResolverTypeWrapper<RequestUpdateSafeResponse>;
  SafeAddressByOwnerResult: ResolverTypeWrapper<SafeAddressByOwnerResult>;
  SafeInfo: ResolverTypeWrapper<SafeInfo>;
  SafeVerified: ResolverTypeWrapper<SafeVerified>;
  SearchInput: SearchInput;
  SendMessageResult: ResolverTypeWrapper<SendMessageResult>;
  SendSignedTransactionInput: SendSignedTransactionInput;
  SendSignedTransactionResult: ResolverTypeWrapper<SendSignedTransactionResult>;
  Server: ResolverTypeWrapper<Server>;
  SessionInfo: ResolverTypeWrapper<SessionInfo>;
  SortOrder: SortOrder;
  Stats: ResolverTypeWrapper<Stats>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  SurveyData: ResolverTypeWrapper<SurveyData>;
  SurveyDataInput: SurveyDataInput;
  SurveyDataResult: ResolverTypeWrapper<SurveyDataResult>;
  Tag: ResolverTypeWrapper<Tag>;
  TagTransactionResult: ResolverTypeWrapper<TagTransactionResult>;
  TransitivePath: ResolverTypeWrapper<TransitivePath>;
  TransitiveTransfer: ResolverTypeWrapper<TransitiveTransfer>;
  TrustComparison: ResolverTypeWrapper<TrustComparison>;
  TrustDifference: ResolverTypeWrapper<TrustDifference>;
  TrustDirection: TrustDirection;
  TrustRelation: ResolverTypeWrapper<TrustRelation>;
  UpdateSafeInput: UpdateSafeInput;
  UpdateSafeResponse: ResolverTypeWrapper<UpdateSafeResponse>;
  UpsertOrganisationInput: UpsertOrganisationInput;
  UpsertProfileInput: UpsertProfileInput;
  UpsertTagInput: UpsertTagInput;
  Verification: ResolverTypeWrapper<Verification>;
  VerifiedSafesFilter: VerifiedSafesFilter;
  VerifySafeResult: ResolverTypeWrapper<VerifySafeResult>;
  Version: ResolverTypeWrapper<Version>;
  WelcomeMessage: ResolverTypeWrapper<WelcomeMessage>;
  i18n: ResolverTypeWrapper<I18n>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AcceptMembershipResult: AcceptMembershipResult;
  AddMemberResult: AddMemberResult;
  AggregatePayload: ResolversParentTypes['Contacts'] | ResolversParentTypes['CrcBalances'] | ResolversParentTypes['Erc20Balances'] | ResolversParentTypes['Members'] | ResolversParentTypes['Memberships'];
  AssetBalance: AssetBalance;
  BaliVillage: BaliVillage;
  Boolean: Scalars['Boolean'];
  BusinessCategory: BusinessCategory;
  Businesses: Businesses;
  Capability: Capability;
  ClaimInvitationResult: ClaimInvitationResult;
  ClaimedInvitation: ClaimedInvitation;
  CommonTrust: CommonTrust;
  CompareTrustRelationsInput: CompareTrustRelationsInput;
  CompareTrustRelationsResult: CompareTrustRelationsResult;
  Contact: Contact;
  ContactAggregateFilter: ContactAggregateFilter;
  ContactFilter: ContactFilter;
  ContactPoint: ContactPoint;
  Contacts: Contacts;
  CrcBalanceAggregateFilter: CrcBalanceAggregateFilter;
  CrcBalanceFilter: CrcBalanceFilter;
  CrcBalances: CrcBalances;
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
  Date: Scalars['Date'];
  Erc20Balances: Erc20Balances;
  Erc20Transfer: Erc20Transfer;
  EthTransfer: EthTransfer;
  EventPayload: ResolversParentTypes['CrcHubTransfer'] | ResolversParentTypes['CrcMinting'] | ResolversParentTypes['CrcSignup'] | ResolversParentTypes['CrcTokenTransfer'] | ResolversParentTypes['CrcTrust'] | ResolversParentTypes['Erc20Transfer'] | ResolversParentTypes['EthTransfer'] | ResolversParentTypes['GnosisSafeEthTransfer'] | ResolversParentTypes['InvitationCreated'] | ResolversParentTypes['InvitationRedeemed'] | ResolversParentTypes['MemberAdded'] | ResolversParentTypes['MembershipAccepted'] | ResolversParentTypes['MembershipOffer'] | ResolversParentTypes['MembershipRejected'] | ResolversParentTypes['NewUser'] | ResolversParentTypes['OrganisationCreated'] | ResolversParentTypes['SafeVerified'] | ResolversParentTypes['WelcomeMessage'];
  ExchangeTokenResponse: ExchangeTokenResponse;
  ExportProfile: ExportProfile;
  ExportTrustRelation: ExportTrustRelation;
  Favorite: Favorite;
  FibonacciGoals: FibonacciGoals;
  Float: Scalars['Float'];
  Geolocation: Geolocation;
  GnosisSafeEthTransfer: GnosisSafeEthTransfer;
  IAggregatePayload: ResolversParentTypes['Contacts'] | ResolversParentTypes['CrcBalances'] | ResolversParentTypes['Erc20Balances'] | ResolversParentTypes['Members'] | ResolversParentTypes['Memberships'];
  IEventPayload: ResolversParentTypes['CrcHubTransfer'] | ResolversParentTypes['CrcMinting'] | ResolversParentTypes['CrcSignup'] | ResolversParentTypes['CrcTokenTransfer'] | ResolversParentTypes['CrcTrust'] | ResolversParentTypes['Erc20Transfer'] | ResolversParentTypes['EthTransfer'] | ResolversParentTypes['GnosisSafeEthTransfer'] | ResolversParentTypes['InvitationCreated'] | ResolversParentTypes['InvitationRedeemed'] | ResolversParentTypes['MemberAdded'] | ResolversParentTypes['MembershipAccepted'] | ResolversParentTypes['MembershipOffer'] | ResolversParentTypes['MembershipRejected'] | ResolversParentTypes['NewUser'] | ResolversParentTypes['OrganisationCreated'] | ResolversParentTypes['SafeVerified'] | ResolversParentTypes['WelcomeMessage'];
  Int: Scalars['Int'];
  InvitationCreated: InvitationCreated;
  InvitationRedeemed: InvitationRedeemed;
  LeaderboardEntry: LeaderboardEntry;
  LogoutResponse: LogoutResponse;
  MarkAsReadResult: MarkAsReadResult;
  MemberAdded: MemberAdded;
  Members: Omit<Members, 'members'> & { members: Array<ResolversParentTypes['ProfileOrOrganisation']> };
  Membership: Membership;
  MembershipAccepted: MembershipAccepted;
  MembershipOffer: MembershipOffer;
  MembershipRejected: MembershipRejected;
  Memberships: Memberships;
  Mutation: {};
  MyInviteRank: MyInviteRank;
  NewUser: NewUser;
  Nonce: Nonce;
  NonceRequest: NonceRequest;
  NotificationEvent: NotificationEvent;
  Organisation: Omit<Organisation, 'members'> & { members?: Maybe<Array<ResolversParentTypes['ProfileOrOrganisation']>> };
  OrganisationCreated: OrganisationCreated;
  PaginationArgs: PaginationArgs;
  Profile: Profile;
  ProfileAggregate: Omit<ProfileAggregate, 'payload'> & { payload: ResolversParentTypes['AggregatePayload'] };
  ProfileAggregateFilter: ProfileAggregateFilter;
  ProfileBalances: ProfileBalances;
  ProfileEvent: Omit<ProfileEvent, 'payload'> & { payload?: Maybe<ResolversParentTypes['EventPayload']> };
  ProfileEventFilter: ProfileEventFilter;
  ProfileOrOrganisation: ResolversParentTypes['Organisation'] | ResolversParentTypes['Profile'];
  PublicEvent: Omit<PublicEvent, 'payload'> & { payload?: Maybe<ResolversParentTypes['EventPayload']> };
  Query: {};
  QueryAllBusinessesConditions: QueryAllBusinessesConditions;
  QueryAllBusinessesOrder: QueryAllBusinessesOrder;
  QueryAllBusinessesParameters: QueryAllBusinessesParameters;
  QueryProfileInput: QueryProfileInput;
  QueryTagsInput: QueryTagsInput;
  QueryUniqueProfileInput: QueryUniqueProfileInput;
  RandomAccount: RandomAccount;
  RedeemClaimedInvitationResult: RedeemClaimedInvitationResult;
  RejectMembershipResult: RejectMembershipResult;
  RemoveMemberResult: RemoveMemberResult;
  RequestUpdateSafeInput: RequestUpdateSafeInput;
  RequestUpdateSafeResponse: RequestUpdateSafeResponse;
  SafeAddressByOwnerResult: SafeAddressByOwnerResult;
  SafeInfo: SafeInfo;
  SafeVerified: SafeVerified;
  SearchInput: SearchInput;
  SendMessageResult: SendMessageResult;
  SendSignedTransactionInput: SendSignedTransactionInput;
  SendSignedTransactionResult: SendSignedTransactionResult;
  Server: Server;
  SessionInfo: SessionInfo;
  Stats: Stats;
  String: Scalars['String'];
  Subscription: {};
  SurveyData: SurveyData;
  SurveyDataInput: SurveyDataInput;
  SurveyDataResult: SurveyDataResult;
  Tag: Tag;
  TagTransactionResult: TagTransactionResult;
  TransitivePath: TransitivePath;
  TransitiveTransfer: TransitiveTransfer;
  TrustComparison: TrustComparison;
  TrustDifference: TrustDifference;
  TrustRelation: TrustRelation;
  UpdateSafeInput: UpdateSafeInput;
  UpdateSafeResponse: UpdateSafeResponse;
  UpsertOrganisationInput: UpsertOrganisationInput;
  UpsertProfileInput: UpsertProfileInput;
  UpsertTagInput: UpsertTagInput;
  Verification: Verification;
  VerifiedSafesFilter: VerifiedSafesFilter;
  VerifySafeResult: VerifySafeResult;
  Version: Version;
  WelcomeMessage: WelcomeMessage;
  i18n: I18n;
}>;

export type AcceptMembershipResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AcceptMembershipResult'] = ResolversParentTypes['AcceptMembershipResult']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddMemberResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddMemberResult'] = ResolversParentTypes['AddMemberResult']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AggregatePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AggregatePayload'] = ResolversParentTypes['AggregatePayload']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Contacts' | 'CrcBalances' | 'Erc20Balances' | 'Members' | 'Memberships', ParentType, ContextType>;
}>;

export type AssetBalanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['AssetBalance'] = ResolversParentTypes['AssetBalance']> = ResolversObject<{
  token_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token_balance?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token_owner_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token_owner_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  token_symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BaliVillageResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaliVillage'] = ResolversParentTypes['BaliVillage']> = ResolversObject<{
  desa?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  kabupaten?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  kecamatan?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusinessCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['BusinessCategory'] = ResolversParentTypes['BusinessCategory']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusinessesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Businesses'] = ResolversParentTypes['Businesses']> = ResolversObject<{
  businessCategory?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  businessCategoryId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  businessHoursFriday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  businessHoursMonday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  businessHoursSaturday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  businessHoursSunday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  businessHoursThursday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  businessHoursTuesday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  businessHoursWednesday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  circlesAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favoriteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  locationName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lon?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CapabilityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Capability'] = ResolversParentTypes['Capability']> = ResolversObject<{
  type?: Resolver<Maybe<ResolversTypes['CapabilityType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClaimInvitationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClaimInvitationResult'] = ResolversParentTypes['ClaimInvitationResult']> = ResolversObject<{
  claimedInvitation?: Resolver<Maybe<ResolversTypes['ClaimedInvitation']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClaimedInvitationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClaimedInvitation'] = ResolversParentTypes['ClaimedInvitation']> = ResolversObject<{
  claimedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  claimedBy?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  claimedByProfileId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  createdByProfileId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommonTrustResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommonTrust'] = ResolversParentTypes['CommonTrust']> = ResolversObject<{
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  safeAddress1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  safeAddress2?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CompareTrustRelationsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompareTrustRelationsResult'] = ResolversParentTypes['CompareTrustRelationsResult']> = ResolversObject<{
  canSendTo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  diffs?: Resolver<Array<ResolversTypes['TrustComparison']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = ResolversObject<{
  contactAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contactAddress_Profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  lastContactAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['ContactPoint']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContactPointResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContactPoint'] = ResolversParentTypes['ContactPoint']> = ResolversObject<{
  directions?: Resolver<Array<ResolversTypes['ContactDirection']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamps?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  values?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContactsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contacts'] = ResolversParentTypes['Contacts']> = ResolversObject<{
  contacts?: Resolver<Array<ResolversTypes['Contact']>, ParentType, ContextType>;
  lastUpdatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CrcBalancesResolvers<ContextType = any, ParentType extends ResolversParentTypes['CrcBalances'] = ResolversParentTypes['CrcBalances']> = ResolversObject<{
  balances?: Resolver<Array<ResolversTypes['AssetBalance']>, ParentType, ContextType>;
  lastUpdatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CrcHubTransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['CrcHubTransfer'] = ResolversParentTypes['CrcHubTransfer']> = ResolversObject<{
  flow?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  transaction_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transfers?: Resolver<Array<ResolversTypes['CrcTokenTransfer']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CrcMintingResolvers<ContextType = any, ParentType extends ResolversParentTypes['CrcMinting'] = ResolversParentTypes['CrcMinting']> = ResolversObject<{
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CrcSignupResolvers<ContextType = any, ParentType extends ResolversParentTypes['CrcSignup'] = ResolversParentTypes['CrcSignup']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CrcTokenTransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['CrcTokenTransfer'] = ResolversParentTypes['CrcTokenTransfer']> = ResolversObject<{
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CrcTrustResolvers<ContextType = any, ParentType extends ResolversParentTypes['CrcTrust'] = ResolversParentTypes['CrcTrust']> = ResolversObject<{
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  can_send_to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  can_send_to_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  transaction_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateInvitationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateInvitationResult'] = ResolversParentTypes['CreateInvitationResult']> = ResolversObject<{
  createdInviteEoas?: Resolver<Array<ResolversTypes['CreatedInvitation']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateOrganisationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateOrganisationResult'] = ResolversParentTypes['CreateOrganisationResult']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  organisation?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreatedInvitationResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatedInvitation'] = ResolversParentTypes['CreatedInvitation']> = ResolversObject<{
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  claimedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  claimedBy?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  claimedByProfileId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  createdByProfileId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreatedInviteEoaResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatedInviteEoa'] = ResolversParentTypes['CreatedInviteEoa']> = ResolversObject<{
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fee?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  for?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type Erc20BalancesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Erc20Balances'] = ResolversParentTypes['Erc20Balances']> = ResolversObject<{
  balances?: Resolver<Array<ResolversTypes['AssetBalance']>, ParentType, ContextType>;
  lastUpdatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Erc20TransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['Erc20Transfer'] = ResolversParentTypes['Erc20Transfer']> = ResolversObject<{
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EthTransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['EthTransfer'] = ResolversParentTypes['EthTransfer']> = ResolversObject<{
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  transaction_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventPayload'] = ResolversParentTypes['EventPayload']> = ResolversObject<{
  __resolveType: TypeResolveFn<'CrcHubTransfer' | 'CrcMinting' | 'CrcSignup' | 'CrcTokenTransfer' | 'CrcTrust' | 'Erc20Transfer' | 'EthTransfer' | 'GnosisSafeEthTransfer' | 'InvitationCreated' | 'InvitationRedeemed' | 'MemberAdded' | 'MembershipAccepted' | 'MembershipOffer' | 'MembershipRejected' | 'NewUser' | 'OrganisationCreated' | 'SafeVerified' | 'WelcomeMessage', ParentType, ContextType>;
}>;

export type ExchangeTokenResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExchangeTokenResponse'] = ResolversParentTypes['ExchangeTokenResponse']> = ResolversObject<{
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ExportProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExportProfile'] = ResolversParentTypes['ExportProfile']> = ResolversObject<{
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  circlesAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastChange?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ExportTrustRelationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExportTrustRelation'] = ResolversParentTypes['ExportTrustRelation']> = ResolversObject<{
  lastChange?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  trustLimit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trusteeAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  trusterAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FavoriteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Favorite'] = ResolversParentTypes['Favorite']> = ResolversObject<{
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdByAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  favorite?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  favoriteAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FibonacciGoalsResolvers<ContextType = any, ParentType extends ResolversParentTypes['FibonacciGoals'] = ResolversParentTypes['FibonacciGoals']> = ResolversObject<{
  currentValue?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastGoal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  nextGoal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GnosisSafeEthTransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['GnosisSafeEthTransfer'] = ResolversParentTypes['GnosisSafeEthTransfer']> = ResolversObject<{
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  initiator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  transaction_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IAggregatePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['IAggregatePayload'] = ResolversParentTypes['IAggregatePayload']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Contacts' | 'CrcBalances' | 'Erc20Balances' | 'Members' | 'Memberships', ParentType, ContextType>;
  lastUpdatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type IEventPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['IEventPayload'] = ResolversParentTypes['IEventPayload']> = ResolversObject<{
  __resolveType: TypeResolveFn<'CrcHubTransfer' | 'CrcMinting' | 'CrcSignup' | 'CrcTokenTransfer' | 'CrcTrust' | 'Erc20Transfer' | 'EthTransfer' | 'GnosisSafeEthTransfer' | 'InvitationCreated' | 'InvitationRedeemed' | 'MemberAdded' | 'MembershipAccepted' | 'MembershipOffer' | 'MembershipRejected' | 'NewUser' | 'OrganisationCreated' | 'SafeVerified' | 'WelcomeMessage', ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type InvitationCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvitationCreated'] = ResolversParentTypes['InvitationCreated']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InvitationRedeemedResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvitationRedeemed'] = ResolversParentTypes['InvitationRedeemed']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  redeemedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  redeemedBy_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LeaderboardEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['LeaderboardEntry'] = ResolversParentTypes['LeaderboardEntry']> = ResolversObject<{
  createdByCirclesAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdByProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  inviteCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LogoutResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogoutResponse'] = ResolversParentTypes['LogoutResponse']> = ResolversObject<{
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MarkAsReadResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MarkAsReadResult'] = ResolversParentTypes['MarkAsReadResult']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemberAddedResolvers<ContextType = any, ParentType extends ResolversParentTypes['MemberAdded'] = ResolversParentTypes['MemberAdded']> = ResolversObject<{
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  member?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  member_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  organisation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organisation_profile?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MembersResolvers<ContextType = any, ParentType extends ResolversParentTypes['Members'] = ResolversParentTypes['Members']> = ResolversObject<{
  lastUpdatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['ProfileOrOrganisation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MembershipResolvers<ContextType = any, ParentType extends ResolversParentTypes['Membership'] = ResolversParentTypes['Membership']> = ResolversObject<{
  acceptedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  createdByProfileId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  organisation?: Resolver<ResolversTypes['Organisation'], ParentType, ContextType>;
  rejectedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MembershipAcceptedResolvers<ContextType = any, ParentType extends ResolversParentTypes['MembershipAccepted'] = ResolversParentTypes['MembershipAccepted']> = ResolversObject<{
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  member?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  member_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  organisation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organisation_profile?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MembershipOfferResolvers<ContextType = any, ParentType extends ResolversParentTypes['MembershipOffer'] = ResolversParentTypes['MembershipOffer']> = ResolversObject<{
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  organisation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organisation_profile?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MembershipRejectedResolvers<ContextType = any, ParentType extends ResolversParentTypes['MembershipRejected'] = ResolversParentTypes['MembershipRejected']> = ResolversObject<{
  member?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  member_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  organisation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organisation_profile?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MembershipsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Memberships'] = ResolversParentTypes['Memberships']> = ResolversObject<{
  lastUpdatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organisations?: Resolver<Array<ResolversTypes['Organisation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  acceptMembership?: Resolver<Maybe<ResolversTypes['AcceptMembershipResult']>, ParentType, ContextType, RequireFields<MutationAcceptMembershipArgs, 'membershipId'>>;
  acknowledge?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAcknowledgeArgs, 'until'>>;
  addMember?: Resolver<Maybe<ResolversTypes['AddMemberResult']>, ParentType, ContextType, RequireFields<MutationAddMemberArgs, 'groupId' | 'memberAddress'>>;
  addNewLang?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<MutationAddNewLangArgs>>;
  claimInvitation?: Resolver<ResolversTypes['ClaimInvitationResult'], ParentType, ContextType, RequireFields<MutationClaimInvitationArgs, 'code'>>;
  createNewStringAndKey?: Resolver<Maybe<ResolversTypes['i18n']>, ParentType, ContextType, Partial<MutationCreateNewStringAndKeyArgs>>;
  createTestInvitation?: Resolver<ResolversTypes['CreateInvitationResult'], ParentType, ContextType>;
  getNonce?: Resolver<ResolversTypes['Nonce'], ParentType, ContextType, RequireFields<MutationGetNonceArgs, 'data'>>;
  importOrganisationsOfAccount?: Resolver<Array<ResolversTypes['Organisation']>, ParentType, ContextType>;
  logout?: Resolver<ResolversTypes['LogoutResponse'], ParentType, ContextType>;
  markAllAsRead?: Resolver<ResolversTypes['MarkAsReadResult'], ParentType, ContextType>;
  markAsRead?: Resolver<ResolversTypes['MarkAsReadResult'], ParentType, ContextType, RequireFields<MutationMarkAsReadArgs, 'entries'>>;
  redeemClaimedInvitation?: Resolver<ResolversTypes['RedeemClaimedInvitationResult'], ParentType, ContextType>;
  rejectMembership?: Resolver<Maybe<ResolversTypes['RejectMembershipResult']>, ParentType, ContextType, RequireFields<MutationRejectMembershipArgs, 'membershipId'>>;
  removeMember?: Resolver<Maybe<ResolversTypes['RemoveMemberResult']>, ParentType, ContextType, RequireFields<MutationRemoveMemberArgs, 'groupId' | 'memberAddress'>>;
  requestSessionChallenge?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRequestSessionChallengeArgs, 'address'>>;
  requestUpdateSafe?: Resolver<ResolversTypes['RequestUpdateSafeResponse'], ParentType, ContextType, RequireFields<MutationRequestUpdateSafeArgs, 'data'>>;
  revokeSafeVerification?: Resolver<ResolversTypes['VerifySafeResult'], ParentType, ContextType, RequireFields<MutationRevokeSafeVerificationArgs, 'safeAddress'>>;
  sendMessage?: Resolver<ResolversTypes['SendMessageResult'], ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'content' | 'toSafeAddress'>>;
  sendSignedTransaction?: Resolver<ResolversTypes['SendSignedTransactionResult'], ParentType, ContextType, RequireFields<MutationSendSignedTransactionArgs, 'data'>>;
  setIsFavorite?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSetIsFavoriteArgs, 'circlesAddress' | 'isFavorite'>>;
  setStringUpdateState?: Resolver<Maybe<ResolversTypes['i18n']>, ParentType, ContextType, Partial<MutationSetStringUpdateStateArgs>>;
  shareLink?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationShareLinkArgs, 'targetKey' | 'targetType'>>;
  surveyData?: Resolver<ResolversTypes['SurveyDataResult'], ParentType, ContextType, RequireFields<MutationSurveyDataArgs, 'data'>>;
  tagTransaction?: Resolver<ResolversTypes['TagTransactionResult'], ParentType, ContextType, RequireFields<MutationTagTransactionArgs, 'tag' | 'transactionHash'>>;
  updateSafe?: Resolver<ResolversTypes['UpdateSafeResponse'], ParentType, ContextType, RequireFields<MutationUpdateSafeArgs, 'data'>>;
  updateValue?: Resolver<Maybe<ResolversTypes['i18n']>, ParentType, ContextType, Partial<MutationUpdateValueArgs>>;
  upsertOrganisation?: Resolver<ResolversTypes['CreateOrganisationResult'], ParentType, ContextType, RequireFields<MutationUpsertOrganisationArgs, 'organisation'>>;
  upsertProfile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<MutationUpsertProfileArgs, 'data'>>;
  upsertTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationUpsertTagArgs, 'data'>>;
  verifySafe?: Resolver<ResolversTypes['VerifySafeResult'], ParentType, ContextType, RequireFields<MutationVerifySafeArgs, 'safeAddress'>>;
  verifySessionChallenge?: Resolver<Maybe<ResolversTypes['ExchangeTokenResponse']>, ParentType, ContextType, RequireFields<MutationVerifySessionChallengeArgs, 'challenge' | 'signature'>>;
}>;

export type MyInviteRankResolvers<ContextType = any, ParentType extends ResolversParentTypes['MyInviteRank'] = ResolversParentTypes['MyInviteRank']> = ResolversObject<{
  rank?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  redeemedInvitationsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NewUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['NewUser'] = ResolversParentTypes['NewUser']> = ResolversObject<{
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NonceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Nonce'] = ResolversParentTypes['Nonce']> = ResolversObject<{
  nonce?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NotificationEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotificationEvent'] = ResolversParentTypes['NotificationEvent']> = ResolversObject<{
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  itemId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrganisationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organisation'] = ResolversParentTypes['Organisation']> = ResolversObject<{
  avatarMimeType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  circlesAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  circlesSafeOwner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayCurrency?: Resolver<Maybe<ResolversTypes['DisplayCurrency']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  largeBannerUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  locationName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lon?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  members?: Resolver<Maybe<Array<ResolversTypes['ProfileOrOrganisation']>>, ParentType, ContextType>;
  smallBannerUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trustsYou?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrganisationCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganisationCreated'] = ResolversParentTypes['OrganisationCreated']> = ResolversObject<{
  organisation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organisation_profile?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = ResolversObject<{
  age?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  askedForEmailAddress?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  avatarCid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatarMimeType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  balances?: Resolver<Maybe<ResolversTypes['ProfileBalances']>, ParentType, ContextType, Partial<ProfileBalancesArgs>>;
  canInvite?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['BusinessCategory']>, ParentType, ContextType>;
  circlesAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  circlesSafeOwner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  circlesTokenAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  claimedInvitation?: Resolver<Maybe<ResolversTypes['ClaimedInvitation']>, ParentType, ContextType>;
  confirmedLegalAge?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  contacts?: Resolver<Maybe<Array<ResolversTypes['Contact']>>, ParentType, ContextType, Partial<ProfileContactsArgs>>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayCurrency?: Resolver<Maybe<ResolversTypes['DisplayCurrency']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayTimeCircles?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  dream?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  invitationLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  invitationTransaction?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  largeBannerUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  locationName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lon?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  members?: Resolver<Maybe<Array<ResolversTypes['Profile']>>, ParentType, ContextType>;
  memberships?: Resolver<Maybe<Array<ResolversTypes['Membership']>>, ParentType, ContextType>;
  newsletter?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['ProfileOrigin']>, ParentType, ContextType>;
  provenUniqueness?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  smallBannerUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  successorOfCirclesAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  surveyDataSessionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['ProfileType']>, ParentType, ContextType>;
  verifications?: Resolver<Maybe<Array<ResolversTypes['Verification']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileAggregate'] = ResolversParentTypes['ProfileAggregate']> = ResolversObject<{
  payload?: Resolver<ResolversTypes['AggregatePayload'], ParentType, ContextType>;
  safe_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  safe_address_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileBalancesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileBalances'] = ResolversParentTypes['ProfileBalances']> = ResolversObject<{
  crcBalances?: Resolver<Maybe<ResolversTypes['CrcBalances']>, ParentType, ContextType>;
  erc20Balances?: Resolver<Maybe<ResolversTypes['Erc20Balances']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileEvent'] = ResolversParentTypes['ProfileEvent']> = ResolversObject<{
  block_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  contact_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contact_address_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  direction?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  payload?: Resolver<Maybe<ResolversTypes['EventPayload']>, ParentType, ContextType>;
  safe_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  safe_address_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transaction_index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  unread?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  unread_marker_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileOrOrganisationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileOrOrganisation'] = ResolversParentTypes['ProfileOrOrganisation']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Organisation' | 'Profile', ParentType, ContextType>;
}>;

export type PublicEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicEvent'] = ResolversParentTypes['PublicEvent']> = ResolversObject<{
  block_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  contact_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contact_address_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  payload?: Resolver<Maybe<ResolversTypes['EventPayload']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transaction_index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  aggregates?: Resolver<Array<ResolversTypes['ProfileAggregate']>, ParentType, ContextType, RequireFields<QueryAggregatesArgs, 'safeAddress' | 'types'>>;
  allBaliVillages?: Resolver<Array<ResolversTypes['BaliVillage']>, ParentType, ContextType>;
  allBusinessCategories?: Resolver<Array<ResolversTypes['BusinessCategory']>, ParentType, ContextType>;
  allBusinesses?: Resolver<Array<ResolversTypes['Businesses']>, ParentType, ContextType, Partial<QueryAllBusinessesArgs>>;
  allProfiles?: Resolver<Array<Maybe<ResolversTypes['ExportProfile']>>, ParentType, ContextType, Partial<QueryAllProfilesArgs>>;
  allTrusts?: Resolver<Array<ResolversTypes['ExportTrustRelation']>, ParentType, ContextType, Partial<QueryAllTrustsArgs>>;
  claimedInvitation?: Resolver<Maybe<ResolversTypes['ClaimedInvitation']>, ParentType, ContextType>;
  clientAssertionJwt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  commonTrust?: Resolver<Array<ResolversTypes['CommonTrust']>, ParentType, ContextType, RequireFields<QueryCommonTrustArgs, 'safeAddress1' | 'safeAddress2'>>;
  compareTrustRelations?: Resolver<ResolversTypes['CompareTrustRelationsResult'], ParentType, ContextType, RequireFields<QueryCompareTrustRelationsArgs, 'data'>>;
  directPath?: Resolver<ResolversTypes['TransitivePath'], ParentType, ContextType, RequireFields<QueryDirectPathArgs, 'amount' | 'from' | 'to'>>;
  events?: Resolver<Array<ResolversTypes['ProfileEvent']>, ParentType, ContextType, RequireFields<QueryEventsArgs, 'pagination' | 'safeAddress' | 'types'>>;
  findInvitationCreator?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryFindInvitationCreatorArgs, 'code'>>;
  findSafesByOwner?: Resolver<Array<ResolversTypes['SafeInfo']>, ParentType, ContextType, RequireFields<QueryFindSafesByOwnerArgs, 'owner'>>;
  getAllStringsByMaxVersion?: Resolver<Maybe<Array<Maybe<ResolversTypes['i18n']>>>, ParentType, ContextType>;
  getAllStringsByMaxVersionAndLang?: Resolver<Maybe<Array<Maybe<ResolversTypes['i18n']>>>, ParentType, ContextType, Partial<QueryGetAllStringsByMaxVersionAndLangArgs>>;
  getAvailableLanguages?: Resolver<Maybe<Array<Maybe<ResolversTypes['i18n']>>>, ParentType, ContextType>;
  getOlderVersionsByKeyAndLang?: Resolver<Maybe<Array<Maybe<ResolversTypes['i18n']>>>, ParentType, ContextType, Partial<QueryGetOlderVersionsByKeyAndLangArgs>>;
  getPaginatedStrings?: Resolver<Maybe<Array<Maybe<ResolversTypes['i18n']>>>, ParentType, ContextType, Partial<QueryGetPaginatedStringsArgs>>;
  getPaginatedStringsToUpdate?: Resolver<Maybe<Array<Maybe<ResolversTypes['i18n']>>>, ParentType, ContextType, Partial<QueryGetPaginatedStringsToUpdateArgs>>;
  getRandomAccount?: Resolver<Maybe<ResolversTypes['RandomAccount']>, ParentType, ContextType>;
  getStringByMaxVersion?: Resolver<Maybe<ResolversTypes['i18n']>, ParentType, ContextType, Partial<QueryGetStringByMaxVersionArgs>>;
  getStringsToBeUpdatedAmount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<QueryGetStringsToBeUpdatedAmountArgs>>;
  hubSignupTransaction?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  init?: Resolver<ResolversTypes['SessionInfo'], ParentType, ContextType>;
  invitationTransaction?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  lastAcknowledgedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType, RequireFields<QueryLastAcknowledgedAtArgs, 'safeAddress'>>;
  myFavorites?: Resolver<Array<ResolversTypes['Favorite']>, ParentType, ContextType>;
  myInvitations?: Resolver<Array<ResolversTypes['CreatedInvitation']>, ParentType, ContextType>;
  myProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  organisations?: Resolver<Array<ResolversTypes['Organisation']>, ParentType, ContextType, Partial<QueryOrganisationsArgs>>;
  organisationsByAddress?: Resolver<Array<ResolversTypes['Organisation']>, ParentType, ContextType, RequireFields<QueryOrganisationsByAddressArgs, 'addresses'>>;
  paymentPath?: Resolver<ResolversTypes['TransitivePath'], ParentType, ContextType, RequireFields<QueryPaymentPathArgs, 'amount' | 'from' | 'to'>>;
  profilesById?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryProfilesByIdArgs, 'ids'>>;
  profilesBySafeAddress?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryProfilesBySafeAddressArgs, 'safeAddresses'>>;
  recentProfiles?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType, Partial<QueryRecentProfilesArgs>>;
  regions?: Resolver<Array<ResolversTypes['Organisation']>, ParentType, ContextType, Partial<QueryRegionsArgs>>;
  safeInfo?: Resolver<Maybe<ResolversTypes['SafeInfo']>, ParentType, ContextType, Partial<QuerySafeInfoArgs>>;
  search?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QuerySearchArgs, 'query'>>;
  sessionInfo?: Resolver<ResolversTypes['SessionInfo'], ParentType, ContextType>;
  signMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QuerySignMessageArgs, 'key' | 'message'>>;
  stats?: Resolver<ResolversTypes['Stats'], ParentType, ContextType>;
  tagById?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagByIdArgs, 'id'>>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagsArgs, 'query'>>;
  trustRelations?: Resolver<Array<ResolversTypes['TrustRelation']>, ParentType, ContextType, RequireFields<QueryTrustRelationsArgs, 'safeAddress'>>;
  verifications?: Resolver<Array<ResolversTypes['Verification']>, ParentType, ContextType, Partial<QueryVerificationsArgs>>;
  version?: Resolver<ResolversTypes['Version'], ParentType, ContextType>;
}>;

export type RandomAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['RandomAccount'] = ResolversParentTypes['RandomAccount']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  privateKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RedeemClaimedInvitationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RedeemClaimedInvitationResult'] = ResolversParentTypes['RedeemClaimedInvitationResult']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  transactionHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RejectMembershipResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RejectMembershipResult'] = ResolversParentTypes['RejectMembershipResult']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RemoveMemberResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveMemberResult'] = ResolversParentTypes['RemoveMemberResult']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RequestUpdateSafeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RequestUpdateSafeResponse'] = ResolversParentTypes['RequestUpdateSafeResponse']> = ResolversObject<{
  challenge?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SafeAddressByOwnerResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SafeAddressByOwnerResult'] = ResolversParentTypes['SafeAddressByOwnerResult']> = ResolversObject<{
  safeAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SafeInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['SafeInfo'] = ResolversParentTypes['SafeInfo']> = ResolversObject<{
  lastUbiAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  randomValue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  safeAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  safeProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  tokenAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AccountType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SafeVerifiedResolvers<ContextType = any, ParentType extends ResolversParentTypes['SafeVerified'] = ResolversParentTypes['SafeVerified']> = ResolversObject<{
  organisation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organisation_profile?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType>;
  safe_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SendMessageResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendMessageResult'] = ResolversParentTypes['SendMessageResult']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  event?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SendSignedTransactionResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendSignedTransactionResult'] = ResolversParentTypes['SendSignedTransactionResult']> = ResolversObject<{
  transactionHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Server'] = ResolversParentTypes['Server']> = ResolversObject<{
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SessionInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['SessionInfo'] = ResolversParentTypes['SessionInfo']> = ResolversObject<{
  capabilities?: Resolver<Array<ResolversTypes['Capability']>, ParentType, ContextType>;
  hasProfile?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isLoggedOn?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  profileId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sessionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  useShortSignup?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Stats'] = ResolversParentTypes['Stats']> = ResolversObject<{
  goals?: Resolver<ResolversTypes['FibonacciGoals'], ParentType, ContextType>;
  leaderboard?: Resolver<Array<ResolversTypes['LeaderboardEntry']>, ParentType, ContextType>;
  myRank?: Resolver<ResolversTypes['MyInviteRank'], ParentType, ContextType>;
  profilesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  verificationsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  events?: SubscriptionResolver<ResolversTypes['NotificationEvent'], "events", ParentType, ContextType>;
}>;

export type SurveyDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['SurveyData'] = ResolversParentTypes['SurveyData']> = ResolversObject<{
  allConsentsGiven?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  dateOfBirth?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  gender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sesssionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  villageId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SurveyDataResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SurveyDataResult'] = ResolversParentTypes['SurveyDataResult']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  surveyData?: Resolver<Maybe<ResolversTypes['SurveyData']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  typeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TagTransactionResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagTransactionResult'] = ResolversParentTypes['TagTransactionResult']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransitivePathResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransitivePath'] = ResolversParentTypes['TransitivePath']> = ResolversObject<{
  flow?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isValid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  requestedAmount?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transfers?: Resolver<Array<ResolversTypes['TransitiveTransfer']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransitiveTransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransitiveTransfer'] = ResolversParentTypes['TransitiveTransfer']> = ResolversObject<{
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokenOwner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TrustComparisonResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrustComparison'] = ResolversParentTypes['TrustComparison']> = ResolversObject<{
  canSendTo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  differences?: Resolver<Array<ResolversTypes['TrustDifference']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TrustDifferenceResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrustDifference'] = ResolversParentTypes['TrustDifference']> = ResolversObject<{
  operation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TrustRelationResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrustRelation'] = ResolversParentTypes['TrustRelation']> = ResolversObject<{
  direction?: Resolver<ResolversTypes['TrustDirection'], ParentType, ContextType>;
  otherSafeAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  otherSafeAddressProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  safeAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  safeAddressProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateSafeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateSafeResponse'] = ResolversParentTypes['UpdateSafeResponse']> = ResolversObject<{
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newSafeAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VerificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Verification'] = ResolversParentTypes['Verification']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  revokedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  revokedProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  verificationRewardTransaction?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  verificationRewardTransactionHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verifiedProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  verifiedSafeAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verifierProfile?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType>;
  verifierSafeAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VerifySafeResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifySafeResult'] = ResolversParentTypes['VerifySafeResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VersionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Version'] = ResolversParentTypes['Version']> = ResolversObject<{
  major?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minor?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  revision?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WelcomeMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['WelcomeMessage'] = ResolversParentTypes['WelcomeMessage']> = ResolversObject<{
  invitedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  invitedBy_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type I18nResolvers<ContextType = any, ParentType extends ResolversParentTypes['i18n'] = ResolversParentTypes['i18n']> = ResolversObject<{
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lang?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  needsUpdate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  pagination_key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AcceptMembershipResult?: AcceptMembershipResultResolvers<ContextType>;
  AddMemberResult?: AddMemberResultResolvers<ContextType>;
  AggregatePayload?: AggregatePayloadResolvers<ContextType>;
  AssetBalance?: AssetBalanceResolvers<ContextType>;
  BaliVillage?: BaliVillageResolvers<ContextType>;
  BusinessCategory?: BusinessCategoryResolvers<ContextType>;
  Businesses?: BusinessesResolvers<ContextType>;
  Capability?: CapabilityResolvers<ContextType>;
  ClaimInvitationResult?: ClaimInvitationResultResolvers<ContextType>;
  ClaimedInvitation?: ClaimedInvitationResolvers<ContextType>;
  CommonTrust?: CommonTrustResolvers<ContextType>;
  CompareTrustRelationsResult?: CompareTrustRelationsResultResolvers<ContextType>;
  Contact?: ContactResolvers<ContextType>;
  ContactPoint?: ContactPointResolvers<ContextType>;
  Contacts?: ContactsResolvers<ContextType>;
  CrcBalances?: CrcBalancesResolvers<ContextType>;
  CrcHubTransfer?: CrcHubTransferResolvers<ContextType>;
  CrcMinting?: CrcMintingResolvers<ContextType>;
  CrcSignup?: CrcSignupResolvers<ContextType>;
  CrcTokenTransfer?: CrcTokenTransferResolvers<ContextType>;
  CrcTrust?: CrcTrustResolvers<ContextType>;
  CreateInvitationResult?: CreateInvitationResultResolvers<ContextType>;
  CreateOrganisationResult?: CreateOrganisationResultResolvers<ContextType>;
  CreatedInvitation?: CreatedInvitationResolvers<ContextType>;
  CreatedInviteEoa?: CreatedInviteEoaResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Erc20Balances?: Erc20BalancesResolvers<ContextType>;
  Erc20Transfer?: Erc20TransferResolvers<ContextType>;
  EthTransfer?: EthTransferResolvers<ContextType>;
  EventPayload?: EventPayloadResolvers<ContextType>;
  ExchangeTokenResponse?: ExchangeTokenResponseResolvers<ContextType>;
  ExportProfile?: ExportProfileResolvers<ContextType>;
  ExportTrustRelation?: ExportTrustRelationResolvers<ContextType>;
  Favorite?: FavoriteResolvers<ContextType>;
  FibonacciGoals?: FibonacciGoalsResolvers<ContextType>;
  GnosisSafeEthTransfer?: GnosisSafeEthTransferResolvers<ContextType>;
  IAggregatePayload?: IAggregatePayloadResolvers<ContextType>;
  IEventPayload?: IEventPayloadResolvers<ContextType>;
  InvitationCreated?: InvitationCreatedResolvers<ContextType>;
  InvitationRedeemed?: InvitationRedeemedResolvers<ContextType>;
  LeaderboardEntry?: LeaderboardEntryResolvers<ContextType>;
  LogoutResponse?: LogoutResponseResolvers<ContextType>;
  MarkAsReadResult?: MarkAsReadResultResolvers<ContextType>;
  MemberAdded?: MemberAddedResolvers<ContextType>;
  Members?: MembersResolvers<ContextType>;
  Membership?: MembershipResolvers<ContextType>;
  MembershipAccepted?: MembershipAcceptedResolvers<ContextType>;
  MembershipOffer?: MembershipOfferResolvers<ContextType>;
  MembershipRejected?: MembershipRejectedResolvers<ContextType>;
  Memberships?: MembershipsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MyInviteRank?: MyInviteRankResolvers<ContextType>;
  NewUser?: NewUserResolvers<ContextType>;
  Nonce?: NonceResolvers<ContextType>;
  NotificationEvent?: NotificationEventResolvers<ContextType>;
  Organisation?: OrganisationResolvers<ContextType>;
  OrganisationCreated?: OrganisationCreatedResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  ProfileAggregate?: ProfileAggregateResolvers<ContextType>;
  ProfileBalances?: ProfileBalancesResolvers<ContextType>;
  ProfileEvent?: ProfileEventResolvers<ContextType>;
  ProfileOrOrganisation?: ProfileOrOrganisationResolvers<ContextType>;
  PublicEvent?: PublicEventResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RandomAccount?: RandomAccountResolvers<ContextType>;
  RedeemClaimedInvitationResult?: RedeemClaimedInvitationResultResolvers<ContextType>;
  RejectMembershipResult?: RejectMembershipResultResolvers<ContextType>;
  RemoveMemberResult?: RemoveMemberResultResolvers<ContextType>;
  RequestUpdateSafeResponse?: RequestUpdateSafeResponseResolvers<ContextType>;
  SafeAddressByOwnerResult?: SafeAddressByOwnerResultResolvers<ContextType>;
  SafeInfo?: SafeInfoResolvers<ContextType>;
  SafeVerified?: SafeVerifiedResolvers<ContextType>;
  SendMessageResult?: SendMessageResultResolvers<ContextType>;
  SendSignedTransactionResult?: SendSignedTransactionResultResolvers<ContextType>;
  Server?: ServerResolvers<ContextType>;
  SessionInfo?: SessionInfoResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  SurveyData?: SurveyDataResolvers<ContextType>;
  SurveyDataResult?: SurveyDataResultResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TagTransactionResult?: TagTransactionResultResolvers<ContextType>;
  TransitivePath?: TransitivePathResolvers<ContextType>;
  TransitiveTransfer?: TransitiveTransferResolvers<ContextType>;
  TrustComparison?: TrustComparisonResolvers<ContextType>;
  TrustDifference?: TrustDifferenceResolvers<ContextType>;
  TrustRelation?: TrustRelationResolvers<ContextType>;
  UpdateSafeResponse?: UpdateSafeResponseResolvers<ContextType>;
  Verification?: VerificationResolvers<ContextType>;
  VerifySafeResult?: VerifySafeResultResolvers<ContextType>;
  Version?: VersionResolvers<ContextType>;
  WelcomeMessage?: WelcomeMessageResolvers<ContextType>;
  i18n?: I18nResolvers<ContextType>;
}>;

