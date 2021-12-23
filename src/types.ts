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

export enum AccountType {
  Person = 'Person',
  Organisation = 'Organisation'
}

export type AddMemberResult = {
  __typename?: 'AddMemberResult';
  success: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type AggregatePayload = CrcBalances | Erc20Balances | Contacts | Memberships | Members | Offers | Sales | Purchases;

export enum AggregateType {
  CrcBalances = 'CrcBalances',
  Erc20Balances = 'Erc20Balances',
  Contacts = 'Contacts',
  Memberships = 'Memberships',
  Members = 'Members',
  Offers = 'Offers',
  Purchases = 'Purchases',
  Sales = 'Sales'
}

export type AssetBalance = {
  __typename?: 'AssetBalance';
  token_symbol?: Maybe<Scalars['String']>;
  token_address: Scalars['String'];
  token_owner_address: Scalars['String'];
  token_owner_profile?: Maybe<Profile>;
  token_balance: Scalars['String'];
};

export type Capability = {
  __typename?: 'Capability';
  type?: Maybe<CapabilityType>;
};

export enum CapabilityType {
  Verify = 'Verify',
  Invite = 'Invite'
}

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
  metadata: Array<ContactPoint>;
  lastContactAt: Scalars['String'];
  contactAddress: Scalars['String'];
  contactAddress_Profile?: Maybe<Profile>;
};

export type ContactAggregateFilter = {
  addresses: Array<Scalars['String']>;
};

export enum ContactDirection {
  In = 'In',
  Out = 'Out'
}

export type ContactPoint = {
  __typename?: 'ContactPoint';
  name: Scalars['String'];
  directions: Array<ContactDirection>;
  values: Array<Scalars['String']>;
  timestamps: Array<Scalars['String']>;
};

export type Contacts = IAggregatePayload & {
  __typename?: 'Contacts';
  lastUpdatedAt: Scalars['String'];
  contacts: Array<Contact>;
};

export type CrcBalanceAggregateFilter = {
  tokenAddresses: Array<Scalars['String']>;
};

export type CrcBalances = IAggregatePayload & {
  __typename?: 'CrcBalances';
  lastUpdatedAt: Scalars['String'];
  balances: Array<AssetBalance>;
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
  tags: Array<Tag>;
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

export enum Direction {
  In = 'in',
  Out = 'out'
}

export enum DisplayCurrency {
  Crc = 'CRC',
  TimeCrc = 'TIME_CRC',
  Eurs = 'EURS'
}

export type Erc20Balances = IAggregatePayload & {
  __typename?: 'Erc20Balances';
  lastUpdatedAt: Scalars['String'];
  balances: Array<AssetBalance>;
};

export type Erc20Transfer = IEventPayload & {
  __typename?: 'Erc20Transfer';
  transaction_hash: Scalars['String'];
  from: Scalars['String'];
  from_profile?: Maybe<Profile>;
  to: Scalars['String'];
  to_profile?: Maybe<Profile>;
  token: Scalars['String'];
  value: Scalars['String'];
};

export type EthTransfer = IEventPayload & {
  __typename?: 'EthTransfer';
  transaction_hash: Scalars['String'];
  from: Scalars['String'];
  from_profile?: Maybe<Profile>;
  to: Scalars['String'];
  to_profile?: Maybe<Profile>;
  value: Scalars['String'];
  tags: Array<Tag>;
};

export type EventPayload = CrcSignup | CrcTrust | CrcTokenTransfer | CrcHubTransfer | CrcMinting | EthTransfer | Erc20Transfer | GnosisSafeEthTransfer | ChatMessage | MembershipOffer | MembershipAccepted | MembershipRejected | WelcomeMessage | InvitationCreated | InvitationRedeemed | OrganisationCreated | MemberAdded | SaleEvent | SafeVerified;

export enum EventType {
  CrcSignup = 'CrcSignup',
  CrcTrust = 'CrcTrust',
  CrcTokenTransfer = 'CrcTokenTransfer',
  CrcHubTransfer = 'CrcHubTransfer',
  Erc20Transfer = 'Erc20Transfer',
  CrcMinting = 'CrcMinting',
  EthTransfer = 'EthTransfer',
  GnosisSafeEthTransfer = 'GnosisSafeEthTransfer',
  ChatMessage = 'ChatMessage',
  MembershipOffer = 'MembershipOffer',
  MembershipAccepted = 'MembershipAccepted',
  MembershipRejected = 'MembershipRejected',
  WelcomeMessage = 'WelcomeMessage',
  InvitationCreated = 'InvitationCreated',
  InvitationRedeemed = 'InvitationRedeemed',
  OrganisationCreated = 'OrganisationCreated',
  MemberAdded = 'MemberAdded',
  SaleEvent = 'SaleEvent',
  SafeVerified = 'SafeVerified'
}

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
  tags: Array<Tag>;
};

export type IAggregatePayload = {
  lastUpdatedAt?: Maybe<Scalars['String']>;
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

export type InvitationCreated = IEventPayload & {
  __typename?: 'InvitationCreated';
  transaction_hash?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  code: Scalars['String'];
};

export type InvitationRedeemed = IEventPayload & {
  __typename?: 'InvitationRedeemed';
  transaction_hash?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  code: Scalars['String'];
  redeemedBy?: Maybe<Scalars['String']>;
  redeemedBy_profile?: Maybe<Profile>;
};

export type Invoice = {
  __typename?: 'Invoice';
  id: Scalars['Int'];
  purchaseId: Scalars['Int'];
  purchase?: Maybe<Purchase>;
  sellerAddress: Scalars['String'];
  sellerProfile?: Maybe<Profile>;
  buyerAddress: Scalars['String'];
  buyerProfile?: Maybe<Profile>;
  lines: Array<InvoiceLine>;
  pickupCode?: Maybe<Scalars['String']>;
  buyerSignature?: Maybe<Scalars['Boolean']>;
  buyerSignedDate?: Maybe<Scalars['String']>;
  sellerSignature?: Maybe<Scalars['Boolean']>;
  sellerSignedDate?: Maybe<Scalars['String']>;
  paymentTransactionHash?: Maybe<Scalars['String']>;
  cancelledAt?: Maybe<Scalars['String']>;
  cancelReason?: Maybe<Scalars['String']>;
  cancelledBy?: Maybe<Profile>;
};

export type InvoiceLine = {
  __typename?: 'InvoiceLine';
  id: Scalars['Int'];
  amount: Scalars['Int'];
  offer: Offer;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
};

export type MemberAdded = IEventPayload & {
  __typename?: 'MemberAdded';
  transaction_hash?: Maybe<Scalars['String']>;
  createdBy: Scalars['String'];
  createdBy_profile?: Maybe<Profile>;
  member: Scalars['String'];
  member_profile?: Maybe<Profile>;
  isAdmin: Scalars['Boolean'];
  organisation: Scalars['String'];
  organisation_profile?: Maybe<Organisation>;
};

export type Members = IAggregatePayload & {
  __typename?: 'Members';
  lastUpdatedAt: Scalars['String'];
  members: Array<ProfileOrOrganisation>;
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
  createdBy: Scalars['String'];
  createdBy_profile?: Maybe<Profile>;
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

export type Memberships = IAggregatePayload & {
  __typename?: 'Memberships';
  lastUpdatedAt: Scalars['String'];
  organisations: Array<Organisation>;
};

export type Mutation = {
  __typename?: 'Mutation';
  purchase: Array<Invoice>;
  completePurchase: Invoice;
  completeSale: Invoice;
  exchangeToken: ExchangeTokenResponse;
  authenticateAt: DelegateAuthInit;
  depositChallenge: DepositChallengeResponse;
  consumeDepositedChallenge: ConsumeDepositedChallengeResponse;
  logout: LogoutResponse;
  upsertProfile: Profile;
  requestUpdateSafe: RequestUpdateSafeResponse;
  updateSafe: UpdateSafeResponse;
  upsertTag: Tag;
  upsertOrganisation: CreateOrganisationResult;
  upsertRegion: CreateOrganisationResult;
  addMember?: Maybe<AddMemberResult>;
  acceptMembership?: Maybe<AcceptMembershipResult>;
  removeMember?: Maybe<RemoveMemberResult>;
  rejectMembership?: Maybe<RejectMembershipResult>;
  acknowledge: Scalars['Boolean'];
  requestInvitationOffer: Offer;
  createTestInvitation: CreateInvitationResult;
  claimInvitation: ClaimInvitationResult;
  redeemClaimedInvitation: RedeemClaimedInvitationResult;
  tagTransaction: TagTransactionResult;
  sendMessage: SendMessageResult;
  requestSessionChallenge: Scalars['String'];
  verifySessionChallenge?: Maybe<ExchangeTokenResponse>;
  importOrganisationsOfAccount: Array<Organisation>;
  verifySafe: VerifySafeResult;
  revokeSafeVerification: VerifySafeResult;
};


export type MutationPurchaseArgs = {
  lines: Array<PurchaseLineInput>;
};


export type MutationCompletePurchaseArgs = {
  invoiceId: Scalars['Int'];
  revoke?: Maybe<Scalars['Boolean']>;
};


export type MutationCompleteSaleArgs = {
  invoiceId: Scalars['Int'];
  revoke?: Maybe<Scalars['Boolean']>;
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
  memberAddress: Scalars['String'];
};


export type MutationAcceptMembershipArgs = {
  membershipId: Scalars['Int'];
};


export type MutationRemoveMemberArgs = {
  groupId: Scalars['String'];
  memberAddress: Scalars['String'];
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


export type MutationClaimInvitationArgs = {
  code: Scalars['String'];
};


export type MutationTagTransactionArgs = {
  transactionHash: Scalars['String'];
  tag: CreateTagInput;
};


export type MutationSendMessageArgs = {
  fromSafeAddress?: Maybe<Scalars['String']>;
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


export type MutationVerifySafeArgs = {
  safeAddress: Scalars['String'];
};


export type MutationRevokeSafeVerificationArgs = {
  safeAddress: Scalars['String'];
};

export type NotificationEvent = {
  __typename?: 'NotificationEvent';
  type: Scalars['String'];
};

export type Offer = {
  __typename?: 'Offer';
  id: Scalars['Int'];
  version: Scalars['Int'];
  createdByProfile?: Maybe<Profile>;
  createdByAddress: Scalars['String'];
  createdAt: Scalars['String'];
  title: Scalars['String'];
  pictureUrl: Scalars['String'];
  pictureMimeType: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  pricePerUnit: Scalars['String'];
  timeCirclesPriceShare: Scalars['Int'];
};

export type Offers = IAggregatePayload & {
  __typename?: 'Offers';
  lastUpdatedAt: Scalars['String'];
  offers: Array<Offer>;
};

export type OffersAggregateFilter = {
  createdByAddresses?: Maybe<Array<Scalars['String']>>;
  offerIds?: Maybe<Array<Scalars['Int']>>;
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
  displayCurrency?: Maybe<DisplayCurrency>;
  city?: Maybe<City>;
  offers?: Maybe<Array<Offer>>;
  members?: Maybe<Array<ProfileOrOrganisation>>;
  trustsYou?: Maybe<Scalars['Int']>;
};

export type OrganisationCreated = IEventPayload & {
  __typename?: 'OrganisationCreated';
  transaction_hash?: Maybe<Scalars['String']>;
  organisation: Scalars['String'];
  organisation_profile?: Maybe<Organisation>;
};

export type PaginationArgs = {
  continueAt: Scalars['String'];
  order: SortOrder;
  limit: Scalars['Int'];
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['Int'];
  type?: Maybe<Scalars['String']>;
  origin?: Maybe<ProfileOrigin>;
  status?: Maybe<Scalars['String']>;
  circlesAddress?: Maybe<Scalars['String']>;
  successorOfCirclesAddress?: Maybe<Scalars['String']>;
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
  lastEvent?: Maybe<ProfileEvent>;
  claimedInvitation?: Maybe<ClaimedInvitation>;
  memberships?: Maybe<Array<Membership>>;
  displayCurrency?: Maybe<DisplayCurrency>;
  verifications?: Maybe<Array<Verification>>;
};

export type ProfileAggregate = {
  __typename?: 'ProfileAggregate';
  type: Scalars['String'];
  safe_address: Scalars['String'];
  safe_address_profile?: Maybe<Profile>;
  payload: AggregatePayload;
};

export type ProfileAggregateFilter = {
  contacts?: Maybe<ContactAggregateFilter>;
  crcBalance?: Maybe<CrcBalanceAggregateFilter>;
  offers?: Maybe<OffersAggregateFilter>;
  purchases?: Maybe<PurchasesAggregateFilter>;
  sales?: Maybe<SalesAggregateFilter>;
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
  contact_address?: Maybe<Scalars['String']>;
  contact_address_profile?: Maybe<Profile>;
  direction: Scalars['String'];
  value?: Maybe<Scalars['String']>;
  payload?: Maybe<EventPayload>;
  tags?: Maybe<Array<Tag>>;
};

export type ProfileEventFilter = {
  direction?: Maybe<Direction>;
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  with?: Maybe<Scalars['String']>;
  transactionHash?: Maybe<Scalars['String']>;
};

export type ProfileOrOrganisation = Profile | Organisation;

export enum ProfileOrigin {
  CirclesGarden = 'CirclesGarden',
  CirclesLand = 'CirclesLand',
  Unknown = 'Unknown'
}

export type ProofPaymentResult = {
  __typename?: 'ProofPaymentResult';
  acknowledged: Scalars['Boolean'];
};

export type PublicEvent = {
  __typename?: 'PublicEvent';
  timestamp: Scalars['String'];
  block_number?: Maybe<Scalars['Int']>;
  transaction_index?: Maybe<Scalars['Int']>;
  transaction_hash?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  contact_address?: Maybe<Scalars['String']>;
  contact_address_profile?: Maybe<Profile>;
  payload?: Maybe<EventPayload>;
};

export type Purchase = {
  __typename?: 'Purchase';
  id: Scalars['Int'];
  createdByProfile?: Maybe<Profile>;
  createdByAddress: Scalars['String'];
  createdAt: Scalars['String'];
  total: Scalars['String'];
  lines: Array<PurchaseLine>;
  paymentTransaction?: Maybe<ProfileEvent>;
  invoices: Array<Invoice>;
};

export type PurchaseLine = {
  __typename?: 'PurchaseLine';
  id: Scalars['Int'];
  amount: Scalars['Int'];
  offer: Offer;
};

export type PurchaseLineInput = {
  offerId: Scalars['Int'];
  amount: Scalars['Int'];
};

export type Purchases = IAggregatePayload & {
  __typename?: 'Purchases';
  lastUpdatedAt: Scalars['String'];
  purchases: Array<Purchase>;
};

export type PurchasesAggregateFilter = {
  createdByAddresses?: Maybe<Array<Scalars['String']>>;
  purchaseIds?: Maybe<Array<Scalars['Int']>>;
};

export type Query = {
  __typename?: 'Query';
  whoami?: Maybe<Scalars['String']>;
  version: Version;
  sessionInfo: SessionInfo;
  claimedInvitation?: Maybe<ClaimedInvitation>;
  invitationTransaction?: Maybe<ProfileEvent>;
  hubSignupTransaction?: Maybe<ProfileEvent>;
  safeInfo?: Maybe<SafeInfo>;
  verifications: Array<Verification>;
  events: Array<ProfileEvent>;
  aggregates: Array<ProfileAggregate>;
  organisations: Array<Organisation>;
  regions: Array<Organisation>;
  organisationsByAddress: Array<Organisation>;
  myInvitations: Array<CreatedInvitation>;
  commonTrust: Array<CommonTrust>;
  trustRelations: Array<TrustRelation>;
  myProfile?: Maybe<Profile>;
  profilesById: Array<Profile>;
  profilesBySafeAddress: Array<Profile>;
  findSafesByOwner: Array<SafeInfo>;
  search: Array<Profile>;
  profilesCount: Scalars['Int'];
  verificationsCount: Scalars['Int'];
  cities: Array<City>;
  tags: Array<Tag>;
  tagById?: Maybe<Tag>;
  directPath: TransitivePath;
  invoice?: Maybe<Scalars['String']>;
  findInvitationCreator?: Maybe<Profile>;
};


export type QuerySafeInfoArgs = {
  safeAddress?: Maybe<Scalars['String']>;
};


export type QueryVerificationsArgs = {
  pagination?: Maybe<PaginationArgs>;
  filter?: Maybe<VerifiedSafesFilter>;
};


export type QueryEventsArgs = {
  types: Array<EventType>;
  safeAddress: Scalars['String'];
  pagination: PaginationArgs;
  filter?: Maybe<ProfileEventFilter>;
};


export type QueryAggregatesArgs = {
  types: Array<AggregateType>;
  safeAddress: Scalars['String'];
  filter?: Maybe<ProfileAggregateFilter>;
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


export type QueryCommonTrustArgs = {
  safeAddress1: Scalars['String'];
  safeAddress2: Scalars['String'];
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


export type QueryFindSafesByOwnerArgs = {
  owner: Scalars['String'];
};


export type QuerySearchArgs = {
  query: SearchInput;
};


export type QueryCitiesArgs = {
  query: QueryCitiesInput;
};


export type QueryTagsArgs = {
  query: QueryTagsInput;
};


export type QueryTagByIdArgs = {
  id: Scalars['Int'];
};


export type QueryDirectPathArgs = {
  from: Scalars['String'];
  to: Scalars['String'];
  amount: Scalars['String'];
};


export type QueryInvoiceArgs = {
  invoiceId: Scalars['Int'];
};


export type QueryFindInvitationCreatorArgs = {
  code: Scalars['String'];
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

export type QueryProfileInput = {
  id?: Maybe<Array<Scalars['Int']>>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  circlesAddress?: Maybe<Array<Scalars['String']>>;
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

export type SafeAddressByOwnerResult = {
  __typename?: 'SafeAddressByOwnerResult';
  type: Scalars['String'];
  safeAddress: Scalars['String'];
};

export type SafeInfo = {
  __typename?: 'SafeInfo';
  type: AccountType;
  safeAddress: Scalars['String'];
  lastUbiAt?: Maybe<Scalars['String']>;
  tokenAddress: Scalars['String'];
  randomValue?: Maybe<Scalars['String']>;
  safeProfile?: Maybe<Profile>;
};

export type SafeVerified = IEventPayload & {
  __typename?: 'SafeVerified';
  transaction_hash?: Maybe<Scalars['String']>;
  organisation: Scalars['String'];
  organisation_profile?: Maybe<Organisation>;
  safe_address: Scalars['String'];
};

export type Sale = {
  __typename?: 'Sale';
  id: Scalars['Int'];
  sellerAddress: Scalars['String'];
  sellerProfile?: Maybe<Profile>;
  buyerAddress: Scalars['String'];
  buyerProfile?: Maybe<Profile>;
  createdAt: Scalars['String'];
  total: Scalars['String'];
  lines: Array<SalesLine>;
  paymentTransaction?: Maybe<ProfileEvent>;
  invoices: Array<Invoice>;
};

export type SaleEvent = IEventPayload & {
  __typename?: 'SaleEvent';
  transaction_hash?: Maybe<Scalars['String']>;
  buyer: Scalars['String'];
  buyer_profile?: Maybe<Profile>;
  invoice?: Maybe<Invoice>;
};

export type Sales = IAggregatePayload & {
  __typename?: 'Sales';
  lastUpdatedAt: Scalars['String'];
  sales: Array<Sale>;
};

export type SalesAggregateFilter = {
  createdByAddresses?: Maybe<Array<Scalars['String']>>;
  salesIds?: Maybe<Array<Scalars['Int']>>;
};

export type SalesLine = {
  __typename?: 'SalesLine';
  id: Scalars['Int'];
  amount: Scalars['Int'];
  offer: Offer;
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
  lastAcknowledgedAt?: Maybe<Scalars['String']>;
  profile?: Maybe<Profile>;
  capabilities: Array<Capability>;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

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

export type TransitivePath = {
  __typename?: 'TransitivePath';
  requestedAmount: Scalars['String'];
  flow: Scalars['String'];
  transfers: Array<TransitiveTransfer>;
};

export type TransitiveTransfer = {
  __typename?: 'TransitiveTransfer';
  from: Scalars['String'];
  to: Scalars['String'];
  token: Scalars['String'];
  tokenOwner: Scalars['String'];
  value: Scalars['String'];
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

export type UpsertOrganisationInput = {
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  circlesAddress?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  avatarMimeType?: Maybe<Scalars['String']>;
  cityGeonameid?: Maybe<Scalars['Int']>;
  displayCurrency?: Maybe<DisplayCurrency>;
};

export type UpsertProfileInput = {
  id?: Maybe<Scalars['Int']>;
  status: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  dream?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  successorOfCirclesAddress?: Maybe<Scalars['String']>;
  circlesAddress?: Maybe<Scalars['String']>;
  circlesSafeOwner?: Maybe<Scalars['String']>;
  circlesTokenAddress?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  avatarCid?: Maybe<Scalars['String']>;
  avatarMimeType?: Maybe<Scalars['String']>;
  newsletter?: Maybe<Scalars['Boolean']>;
  displayTimeCircles?: Maybe<Scalars['Boolean']>;
  cityGeonameid?: Maybe<Scalars['Int']>;
  displayCurrency?: Maybe<DisplayCurrency>;
};

export type UpsertTagInput = {
  id?: Maybe<Scalars['Int']>;
  typeId: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type Verification = {
  __typename?: 'Verification';
  createdAt: Scalars['String'];
  verifierSafeAddress: Scalars['String'];
  verifierProfile?: Maybe<Organisation>;
  verifiedSafeAddress: Scalars['String'];
  verifiedProfile?: Maybe<Profile>;
  revokedAt?: Maybe<Scalars['String']>;
  revokedProfile?: Maybe<Profile>;
  verificationRewardTransactionHash: Scalars['String'];
  verificationRewardTransaction?: Maybe<ProfileEvent>;
};

export type VerifiedSafesFilter = {
  addresses?: Maybe<Array<Scalars['String']>>;
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
  transaction_hash?: Maybe<Scalars['String']>;
  invitedBy: Scalars['String'];
  invitedBy_profile?: Maybe<Profile>;
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
  AccountType: AccountType;
  AddMemberResult: ResolverTypeWrapper<AddMemberResult>;
  AggregatePayload: ResolversTypes['CrcBalances'] | ResolversTypes['Erc20Balances'] | ResolversTypes['Contacts'] | ResolversTypes['Memberships'] | ResolversTypes['Members'] | ResolversTypes['Offers'] | ResolversTypes['Sales'] | ResolversTypes['Purchases'];
  AggregateType: AggregateType;
  AssetBalance: ResolverTypeWrapper<AssetBalance>;
  Capability: ResolverTypeWrapper<Capability>;
  CapabilityType: CapabilityType;
  ChatMessage: ResolverTypeWrapper<ChatMessage>;
  City: ResolverTypeWrapper<City>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ClaimInvitationResult: ResolverTypeWrapper<ClaimInvitationResult>;
  ClaimedInvitation: ResolverTypeWrapper<ClaimedInvitation>;
  CommonTrust: ResolverTypeWrapper<CommonTrust>;
  ConsumeDepositedChallengeResponse: ResolverTypeWrapper<ConsumeDepositedChallengeResponse>;
  Contact: ResolverTypeWrapper<Contact>;
  ContactAggregateFilter: ContactAggregateFilter;
  ContactDirection: ContactDirection;
  ContactPoint: ResolverTypeWrapper<ContactPoint>;
  Contacts: ResolverTypeWrapper<Contacts>;
  CrcBalanceAggregateFilter: CrcBalanceAggregateFilter;
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
  DelegateAuthInit: ResolverTypeWrapper<DelegateAuthInit>;
  DepositChallenge: DepositChallenge;
  DepositChallengeResponse: ResolverTypeWrapper<DepositChallengeResponse>;
  Direction: Direction;
  DisplayCurrency: DisplayCurrency;
  Erc20Balances: ResolverTypeWrapper<Erc20Balances>;
  Erc20Transfer: ResolverTypeWrapper<Erc20Transfer>;
  EthTransfer: ResolverTypeWrapper<EthTransfer>;
  EventPayload: ResolversTypes['CrcSignup'] | ResolversTypes['CrcTrust'] | ResolversTypes['CrcTokenTransfer'] | ResolversTypes['CrcHubTransfer'] | ResolversTypes['CrcMinting'] | ResolversTypes['EthTransfer'] | ResolversTypes['Erc20Transfer'] | ResolversTypes['GnosisSafeEthTransfer'] | ResolversTypes['ChatMessage'] | ResolversTypes['MembershipOffer'] | ResolversTypes['MembershipAccepted'] | ResolversTypes['MembershipRejected'] | ResolversTypes['WelcomeMessage'] | ResolversTypes['InvitationCreated'] | ResolversTypes['InvitationRedeemed'] | ResolversTypes['OrganisationCreated'] | ResolversTypes['MemberAdded'] | ResolversTypes['SaleEvent'] | ResolversTypes['SafeVerified'];
  EventType: EventType;
  ExchangeTokenResponse: ResolverTypeWrapper<ExchangeTokenResponse>;
  GnosisSafeEthTransfer: ResolverTypeWrapper<GnosisSafeEthTransfer>;
  IAggregatePayload: ResolversTypes['Contacts'] | ResolversTypes['CrcBalances'] | ResolversTypes['Erc20Balances'] | ResolversTypes['Members'] | ResolversTypes['Memberships'] | ResolversTypes['Offers'] | ResolversTypes['Purchases'] | ResolversTypes['Sales'];
  ICity: ResolversTypes['City'];
  IEventPayload: ResolversTypes['ChatMessage'] | ResolversTypes['CrcHubTransfer'] | ResolversTypes['CrcMinting'] | ResolversTypes['CrcSignup'] | ResolversTypes['CrcTokenTransfer'] | ResolversTypes['CrcTrust'] | ResolversTypes['Erc20Transfer'] | ResolversTypes['EthTransfer'] | ResolversTypes['GnosisSafeEthTransfer'] | ResolversTypes['InvitationCreated'] | ResolversTypes['InvitationRedeemed'] | ResolversTypes['MemberAdded'] | ResolversTypes['MembershipAccepted'] | ResolversTypes['MembershipOffer'] | ResolversTypes['MembershipRejected'] | ResolversTypes['OrganisationCreated'] | ResolversTypes['SafeVerified'] | ResolversTypes['SaleEvent'] | ResolversTypes['WelcomeMessage'];
  InvitationCreated: ResolverTypeWrapper<InvitationCreated>;
  InvitationRedeemed: ResolverTypeWrapper<InvitationRedeemed>;
  Invoice: ResolverTypeWrapper<Invoice>;
  InvoiceLine: ResolverTypeWrapper<InvoiceLine>;
  LogoutResponse: ResolverTypeWrapper<LogoutResponse>;
  MemberAdded: ResolverTypeWrapper<MemberAdded>;
  Members: ResolverTypeWrapper<Omit<Members, 'members'> & { members: Array<ResolversTypes['ProfileOrOrganisation']> }>;
  Membership: ResolverTypeWrapper<Membership>;
  MembershipAccepted: ResolverTypeWrapper<MembershipAccepted>;
  MembershipOffer: ResolverTypeWrapper<MembershipOffer>;
  MembershipRejected: ResolverTypeWrapper<MembershipRejected>;
  Memberships: ResolverTypeWrapper<Memberships>;
  Mutation: ResolverTypeWrapper<{}>;
  NotificationEvent: ResolverTypeWrapper<NotificationEvent>;
  Offer: ResolverTypeWrapper<Offer>;
  Offers: ResolverTypeWrapper<Offers>;
  OffersAggregateFilter: OffersAggregateFilter;
  Organisation: ResolverTypeWrapper<Omit<Organisation, 'members'> & { members?: Maybe<Array<ResolversTypes['ProfileOrOrganisation']>> }>;
  OrganisationCreated: ResolverTypeWrapper<OrganisationCreated>;
  PaginationArgs: PaginationArgs;
  Profile: ResolverTypeWrapper<Profile>;
  ProfileAggregate: ResolverTypeWrapper<Omit<ProfileAggregate, 'payload'> & { payload: ResolversTypes['AggregatePayload'] }>;
  ProfileAggregateFilter: ProfileAggregateFilter;
  ProfileEvent: ResolverTypeWrapper<Omit<ProfileEvent, 'payload'> & { payload?: Maybe<ResolversTypes['EventPayload']> }>;
  ProfileEventFilter: ProfileEventFilter;
  ProfileOrOrganisation: ResolversTypes['Profile'] | ResolversTypes['Organisation'];
  ProfileOrigin: ProfileOrigin;
  ProofPaymentResult: ResolverTypeWrapper<ProofPaymentResult>;
  PublicEvent: ResolverTypeWrapper<Omit<PublicEvent, 'payload'> & { payload?: Maybe<ResolversTypes['EventPayload']> }>;
  Purchase: ResolverTypeWrapper<Purchase>;
  PurchaseLine: ResolverTypeWrapper<PurchaseLine>;
  PurchaseLineInput: PurchaseLineInput;
  Purchases: ResolverTypeWrapper<Purchases>;
  PurchasesAggregateFilter: PurchasesAggregateFilter;
  Query: ResolverTypeWrapper<{}>;
  QueryCitiesByGeonameIdInput: QueryCitiesByGeonameIdInput;
  QueryCitiesByNameInput: QueryCitiesByNameInput;
  QueryCitiesInput: QueryCitiesInput;
  QueryProfileInput: QueryProfileInput;
  QueryTagsInput: QueryTagsInput;
  QueryUniqueProfileInput: QueryUniqueProfileInput;
  RedeemClaimedInvitationResult: ResolverTypeWrapper<RedeemClaimedInvitationResult>;
  RejectMembershipResult: ResolverTypeWrapper<RejectMembershipResult>;
  RemoveMemberResult: ResolverTypeWrapper<RemoveMemberResult>;
  RequestUpdateSafeInput: RequestUpdateSafeInput;
  RequestUpdateSafeResponse: ResolverTypeWrapper<RequestUpdateSafeResponse>;
  SafeAddressByOwnerResult: ResolverTypeWrapper<SafeAddressByOwnerResult>;
  SafeInfo: ResolverTypeWrapper<SafeInfo>;
  SafeVerified: ResolverTypeWrapper<SafeVerified>;
  Sale: ResolverTypeWrapper<Sale>;
  SaleEvent: ResolverTypeWrapper<SaleEvent>;
  Sales: ResolverTypeWrapper<Sales>;
  SalesAggregateFilter: SalesAggregateFilter;
  SalesLine: ResolverTypeWrapper<SalesLine>;
  SearchInput: SearchInput;
  SendMessageResult: ResolverTypeWrapper<SendMessageResult>;
  Server: ResolverTypeWrapper<Server>;
  SessionInfo: ResolverTypeWrapper<SessionInfo>;
  SortOrder: SortOrder;
  Subscription: ResolverTypeWrapper<{}>;
  Tag: ResolverTypeWrapper<Tag>;
  TagTransactionResult: ResolverTypeWrapper<TagTransactionResult>;
  TransitivePath: ResolverTypeWrapper<TransitivePath>;
  TransitiveTransfer: ResolverTypeWrapper<TransitiveTransfer>;
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
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AcceptMembershipResult: AcceptMembershipResult;
  Boolean: Scalars['Boolean'];
  String: Scalars['String'];
  AddMemberResult: AddMemberResult;
  AggregatePayload: ResolversParentTypes['CrcBalances'] | ResolversParentTypes['Erc20Balances'] | ResolversParentTypes['Contacts'] | ResolversParentTypes['Memberships'] | ResolversParentTypes['Members'] | ResolversParentTypes['Offers'] | ResolversParentTypes['Sales'] | ResolversParentTypes['Purchases'];
  AssetBalance: AssetBalance;
  Capability: Capability;
  ChatMessage: ChatMessage;
  City: City;
  Int: Scalars['Int'];
  Float: Scalars['Float'];
  ClaimInvitationResult: ClaimInvitationResult;
  ClaimedInvitation: ClaimedInvitation;
  CommonTrust: CommonTrust;
  ConsumeDepositedChallengeResponse: ConsumeDepositedChallengeResponse;
  Contact: Contact;
  ContactAggregateFilter: ContactAggregateFilter;
  ContactPoint: ContactPoint;
  Contacts: Contacts;
  CrcBalanceAggregateFilter: CrcBalanceAggregateFilter;
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
  DelegateAuthInit: DelegateAuthInit;
  DepositChallenge: DepositChallenge;
  DepositChallengeResponse: DepositChallengeResponse;
  Erc20Balances: Erc20Balances;
  Erc20Transfer: Erc20Transfer;
  EthTransfer: EthTransfer;
  EventPayload: ResolversParentTypes['CrcSignup'] | ResolversParentTypes['CrcTrust'] | ResolversParentTypes['CrcTokenTransfer'] | ResolversParentTypes['CrcHubTransfer'] | ResolversParentTypes['CrcMinting'] | ResolversParentTypes['EthTransfer'] | ResolversParentTypes['Erc20Transfer'] | ResolversParentTypes['GnosisSafeEthTransfer'] | ResolversParentTypes['ChatMessage'] | ResolversParentTypes['MembershipOffer'] | ResolversParentTypes['MembershipAccepted'] | ResolversParentTypes['MembershipRejected'] | ResolversParentTypes['WelcomeMessage'] | ResolversParentTypes['InvitationCreated'] | ResolversParentTypes['InvitationRedeemed'] | ResolversParentTypes['OrganisationCreated'] | ResolversParentTypes['MemberAdded'] | ResolversParentTypes['SaleEvent'] | ResolversParentTypes['SafeVerified'];
  ExchangeTokenResponse: ExchangeTokenResponse;
  GnosisSafeEthTransfer: GnosisSafeEthTransfer;
  IAggregatePayload: ResolversParentTypes['Contacts'] | ResolversParentTypes['CrcBalances'] | ResolversParentTypes['Erc20Balances'] | ResolversParentTypes['Members'] | ResolversParentTypes['Memberships'] | ResolversParentTypes['Offers'] | ResolversParentTypes['Purchases'] | ResolversParentTypes['Sales'];
  ICity: ResolversParentTypes['City'];
  IEventPayload: ResolversParentTypes['ChatMessage'] | ResolversParentTypes['CrcHubTransfer'] | ResolversParentTypes['CrcMinting'] | ResolversParentTypes['CrcSignup'] | ResolversParentTypes['CrcTokenTransfer'] | ResolversParentTypes['CrcTrust'] | ResolversParentTypes['Erc20Transfer'] | ResolversParentTypes['EthTransfer'] | ResolversParentTypes['GnosisSafeEthTransfer'] | ResolversParentTypes['InvitationCreated'] | ResolversParentTypes['InvitationRedeemed'] | ResolversParentTypes['MemberAdded'] | ResolversParentTypes['MembershipAccepted'] | ResolversParentTypes['MembershipOffer'] | ResolversParentTypes['MembershipRejected'] | ResolversParentTypes['OrganisationCreated'] | ResolversParentTypes['SafeVerified'] | ResolversParentTypes['SaleEvent'] | ResolversParentTypes['WelcomeMessage'];
  InvitationCreated: InvitationCreated;
  InvitationRedeemed: InvitationRedeemed;
  Invoice: Invoice;
  InvoiceLine: InvoiceLine;
  LogoutResponse: LogoutResponse;
  MemberAdded: MemberAdded;
  Members: Omit<Members, 'members'> & { members: Array<ResolversParentTypes['ProfileOrOrganisation']> };
  Membership: Membership;
  MembershipAccepted: MembershipAccepted;
  MembershipOffer: MembershipOffer;
  MembershipRejected: MembershipRejected;
  Memberships: Memberships;
  Mutation: {};
  NotificationEvent: NotificationEvent;
  Offer: Offer;
  Offers: Offers;
  OffersAggregateFilter: OffersAggregateFilter;
  Organisation: Omit<Organisation, 'members'> & { members?: Maybe<Array<ResolversParentTypes['ProfileOrOrganisation']>> };
  OrganisationCreated: OrganisationCreated;
  PaginationArgs: PaginationArgs;
  Profile: Profile;
  ProfileAggregate: Omit<ProfileAggregate, 'payload'> & { payload: ResolversParentTypes['AggregatePayload'] };
  ProfileAggregateFilter: ProfileAggregateFilter;
  ProfileEvent: Omit<ProfileEvent, 'payload'> & { payload?: Maybe<ResolversParentTypes['EventPayload']> };
  ProfileEventFilter: ProfileEventFilter;
  ProfileOrOrganisation: ResolversParentTypes['Profile'] | ResolversParentTypes['Organisation'];
  ProofPaymentResult: ProofPaymentResult;
  PublicEvent: Omit<PublicEvent, 'payload'> & { payload?: Maybe<ResolversParentTypes['EventPayload']> };
  Purchase: Purchase;
  PurchaseLine: PurchaseLine;
  PurchaseLineInput: PurchaseLineInput;
  Purchases: Purchases;
  PurchasesAggregateFilter: PurchasesAggregateFilter;
  Query: {};
  QueryCitiesByGeonameIdInput: QueryCitiesByGeonameIdInput;
  QueryCitiesByNameInput: QueryCitiesByNameInput;
  QueryCitiesInput: QueryCitiesInput;
  QueryProfileInput: QueryProfileInput;
  QueryTagsInput: QueryTagsInput;
  QueryUniqueProfileInput: QueryUniqueProfileInput;
  RedeemClaimedInvitationResult: RedeemClaimedInvitationResult;
  RejectMembershipResult: RejectMembershipResult;
  RemoveMemberResult: RemoveMemberResult;
  RequestUpdateSafeInput: RequestUpdateSafeInput;
  RequestUpdateSafeResponse: RequestUpdateSafeResponse;
  SafeAddressByOwnerResult: SafeAddressByOwnerResult;
  SafeInfo: SafeInfo;
  SafeVerified: SafeVerified;
  Sale: Sale;
  SaleEvent: SaleEvent;
  Sales: Sales;
  SalesAggregateFilter: SalesAggregateFilter;
  SalesLine: SalesLine;
  SearchInput: SearchInput;
  SendMessageResult: SendMessageResult;
  Server: Server;
  SessionInfo: SessionInfo;
  Subscription: {};
  Tag: Tag;
  TagTransactionResult: TagTransactionResult;
  TransitivePath: TransitivePath;
  TransitiveTransfer: TransitiveTransfer;
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

export type AggregatePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AggregatePayload'] = ResolversParentTypes['AggregatePayload']> = ResolversObject<{
  __resolveType: TypeResolveFn<'CrcBalances' | 'Erc20Balances' | 'Contacts' | 'Memberships' | 'Members' | 'Offers' | 'Sales' | 'Purchases', ParentType, ContextType>;
}>;

export type AssetBalanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['AssetBalance'] = ResolversParentTypes['AssetBalance']> = ResolversObject<{
  token_symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token_owner_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token_owner_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  token_balance?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CapabilityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Capability'] = ResolversParentTypes['Capability']> = ResolversObject<{
  type?: Resolver<Maybe<ResolversTypes['CapabilityType']>, ParentType, ContextType>;
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
  metadata?: Resolver<Array<ResolversTypes['ContactPoint']>, ParentType, ContextType>;
  lastContactAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contactAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contactAddress_Profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContactPointResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContactPoint'] = ResolversParentTypes['ContactPoint']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  directions?: Resolver<Array<ResolversTypes['ContactDirection']>, ParentType, ContextType>;
  values?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  timestamps?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContactsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contacts'] = ResolversParentTypes['Contacts']> = ResolversObject<{
  lastUpdatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contacts?: Resolver<Array<ResolversTypes['Contact']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CrcBalancesResolvers<ContextType = any, ParentType extends ResolversParentTypes['CrcBalances'] = ResolversParentTypes['CrcBalances']> = ResolversObject<{
  lastUpdatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  balances?: Resolver<Array<ResolversTypes['AssetBalance']>, ParentType, ContextType>;
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
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
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

export type Erc20BalancesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Erc20Balances'] = ResolversParentTypes['Erc20Balances']> = ResolversObject<{
  lastUpdatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  balances?: Resolver<Array<ResolversTypes['AssetBalance']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Erc20TransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['Erc20Transfer'] = ResolversParentTypes['Erc20Transfer']> = ResolversObject<{
  transaction_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EthTransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['EthTransfer'] = ResolversParentTypes['EthTransfer']> = ResolversObject<{
  transaction_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventPayload'] = ResolversParentTypes['EventPayload']> = ResolversObject<{
  __resolveType: TypeResolveFn<'CrcSignup' | 'CrcTrust' | 'CrcTokenTransfer' | 'CrcHubTransfer' | 'CrcMinting' | 'EthTransfer' | 'Erc20Transfer' | 'GnosisSafeEthTransfer' | 'ChatMessage' | 'MembershipOffer' | 'MembershipAccepted' | 'MembershipRejected' | 'WelcomeMessage' | 'InvitationCreated' | 'InvitationRedeemed' | 'OrganisationCreated' | 'MemberAdded' | 'SaleEvent' | 'SafeVerified', ParentType, ContextType>;
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
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IAggregatePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['IAggregatePayload'] = ResolversParentTypes['IAggregatePayload']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Contacts' | 'CrcBalances' | 'Erc20Balances' | 'Members' | 'Memberships' | 'Offers' | 'Purchases' | 'Sales', ParentType, ContextType>;
  lastUpdatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ICityResolvers<ContextType = any, ParentType extends ResolversParentTypes['ICity'] = ResolversParentTypes['ICity']> = ResolversObject<{
  __resolveType: TypeResolveFn<'City', ParentType, ContextType>;
  geonameid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  population?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  feature_code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type IEventPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['IEventPayload'] = ResolversParentTypes['IEventPayload']> = ResolversObject<{
  __resolveType: TypeResolveFn<'ChatMessage' | 'CrcHubTransfer' | 'CrcMinting' | 'CrcSignup' | 'CrcTokenTransfer' | 'CrcTrust' | 'Erc20Transfer' | 'EthTransfer' | 'GnosisSafeEthTransfer' | 'InvitationCreated' | 'InvitationRedeemed' | 'MemberAdded' | 'MembershipAccepted' | 'MembershipOffer' | 'MembershipRejected' | 'OrganisationCreated' | 'SafeVerified' | 'SaleEvent' | 'WelcomeMessage', ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type InvitationCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvitationCreated'] = ResolversParentTypes['InvitationCreated']> = ResolversObject<{
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InvitationRedeemedResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvitationRedeemed'] = ResolversParentTypes['InvitationRedeemed']> = ResolversObject<{
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  redeemedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  redeemedBy_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InvoiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Invoice'] = ResolversParentTypes['Invoice']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  purchaseId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  purchase?: Resolver<Maybe<ResolversTypes['Purchase']>, ParentType, ContextType>;
  sellerAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sellerProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  buyerAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  buyerProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  lines?: Resolver<Array<ResolversTypes['InvoiceLine']>, ParentType, ContextType>;
  pickupCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  buyerSignature?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  buyerSignedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sellerSignature?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sellerSignedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentTransactionHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cancelledAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cancelReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cancelledBy?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InvoiceLineResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvoiceLine'] = ResolversParentTypes['InvoiceLine']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offer?: Resolver<ResolversTypes['Offer'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LogoutResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogoutResponse'] = ResolversParentTypes['LogoutResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemberAddedResolvers<ContextType = any, ParentType extends ResolversParentTypes['MemberAdded'] = ResolversParentTypes['MemberAdded']> = ResolversObject<{
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  member?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  member_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  organisation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organisation_profile?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MembersResolvers<ContextType = any, ParentType extends ResolversParentTypes['Members'] = ResolversParentTypes['Members']> = ResolversObject<{
  lastUpdatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['ProfileOrOrganisation']>, ParentType, ContextType>;
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
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
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

export type MembershipsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Memberships'] = ResolversParentTypes['Memberships']> = ResolversObject<{
  lastUpdatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organisations?: Resolver<Array<ResolversTypes['Organisation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  purchase?: Resolver<Array<ResolversTypes['Invoice']>, ParentType, ContextType, RequireFields<MutationPurchaseArgs, 'lines'>>;
  completePurchase?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationCompletePurchaseArgs, 'invoiceId'>>;
  completeSale?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationCompleteSaleArgs, 'invoiceId'>>;
  exchangeToken?: Resolver<ResolversTypes['ExchangeTokenResponse'], ParentType, ContextType>;
  authenticateAt?: Resolver<ResolversTypes['DelegateAuthInit'], ParentType, ContextType, RequireFields<MutationAuthenticateAtArgs, 'appId'>>;
  depositChallenge?: Resolver<ResolversTypes['DepositChallengeResponse'], ParentType, ContextType, RequireFields<MutationDepositChallengeArgs, 'jwt'>>;
  consumeDepositedChallenge?: Resolver<ResolversTypes['ConsumeDepositedChallengeResponse'], ParentType, ContextType, RequireFields<MutationConsumeDepositedChallengeArgs, 'delegateAuthCode'>>;
  logout?: Resolver<ResolversTypes['LogoutResponse'], ParentType, ContextType>;
  upsertProfile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<MutationUpsertProfileArgs, 'data'>>;
  requestUpdateSafe?: Resolver<ResolversTypes['RequestUpdateSafeResponse'], ParentType, ContextType, RequireFields<MutationRequestUpdateSafeArgs, 'data'>>;
  updateSafe?: Resolver<ResolversTypes['UpdateSafeResponse'], ParentType, ContextType, RequireFields<MutationUpdateSafeArgs, 'data'>>;
  upsertTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationUpsertTagArgs, 'data'>>;
  upsertOrganisation?: Resolver<ResolversTypes['CreateOrganisationResult'], ParentType, ContextType, RequireFields<MutationUpsertOrganisationArgs, 'organisation'>>;
  upsertRegion?: Resolver<ResolversTypes['CreateOrganisationResult'], ParentType, ContextType, RequireFields<MutationUpsertRegionArgs, 'organisation'>>;
  addMember?: Resolver<Maybe<ResolversTypes['AddMemberResult']>, ParentType, ContextType, RequireFields<MutationAddMemberArgs, 'groupId' | 'memberAddress'>>;
  acceptMembership?: Resolver<Maybe<ResolversTypes['AcceptMembershipResult']>, ParentType, ContextType, RequireFields<MutationAcceptMembershipArgs, 'membershipId'>>;
  removeMember?: Resolver<Maybe<ResolversTypes['RemoveMemberResult']>, ParentType, ContextType, RequireFields<MutationRemoveMemberArgs, 'groupId' | 'memberAddress'>>;
  rejectMembership?: Resolver<Maybe<ResolversTypes['RejectMembershipResult']>, ParentType, ContextType, RequireFields<MutationRejectMembershipArgs, 'membershipId'>>;
  acknowledge?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAcknowledgeArgs, 'until'>>;
  requestInvitationOffer?: Resolver<ResolversTypes['Offer'], ParentType, ContextType, RequireFields<MutationRequestInvitationOfferArgs, 'for'>>;
  createTestInvitation?: Resolver<ResolversTypes['CreateInvitationResult'], ParentType, ContextType>;
  claimInvitation?: Resolver<ResolversTypes['ClaimInvitationResult'], ParentType, ContextType, RequireFields<MutationClaimInvitationArgs, 'code'>>;
  redeemClaimedInvitation?: Resolver<ResolversTypes['RedeemClaimedInvitationResult'], ParentType, ContextType>;
  tagTransaction?: Resolver<ResolversTypes['TagTransactionResult'], ParentType, ContextType, RequireFields<MutationTagTransactionArgs, 'transactionHash' | 'tag'>>;
  sendMessage?: Resolver<ResolversTypes['SendMessageResult'], ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'toSafeAddress' | 'content'>>;
  requestSessionChallenge?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRequestSessionChallengeArgs, 'address'>>;
  verifySessionChallenge?: Resolver<Maybe<ResolversTypes['ExchangeTokenResponse']>, ParentType, ContextType, RequireFields<MutationVerifySessionChallengeArgs, 'challenge' | 'signature'>>;
  importOrganisationsOfAccount?: Resolver<Array<ResolversTypes['Organisation']>, ParentType, ContextType>;
  verifySafe?: Resolver<ResolversTypes['VerifySafeResult'], ParentType, ContextType, RequireFields<MutationVerifySafeArgs, 'safeAddress'>>;
  revokeSafeVerification?: Resolver<ResolversTypes['VerifySafeResult'], ParentType, ContextType, RequireFields<MutationRevokeSafeVerificationArgs, 'safeAddress'>>;
}>;

export type NotificationEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotificationEvent'] = ResolversParentTypes['NotificationEvent']> = ResolversObject<{
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OfferResolvers<ContextType = any, ParentType extends ResolversParentTypes['Offer'] = ResolversParentTypes['Offer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdByProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  createdByAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pictureUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pictureMimeType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pricePerUnit?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timeCirclesPriceShare?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OffersResolvers<ContextType = any, ParentType extends ResolversParentTypes['Offers'] = ResolversParentTypes['Offers']> = ResolversObject<{
  lastUpdatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  offers?: Resolver<Array<ResolversTypes['Offer']>, ParentType, ContextType>;
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
  displayCurrency?: Resolver<Maybe<ResolversTypes['DisplayCurrency']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['City']>, ParentType, ContextType>;
  offers?: Resolver<Maybe<Array<ResolversTypes['Offer']>>, ParentType, ContextType>;
  members?: Resolver<Maybe<Array<ResolversTypes['ProfileOrOrganisation']>>, ParentType, ContextType>;
  trustsYou?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrganisationCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganisationCreated'] = ResolversParentTypes['OrganisationCreated']> = ResolversObject<{
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  organisation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organisation_profile?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['ProfileOrigin']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  circlesAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  successorOfCirclesAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  lastEvent?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  claimedInvitation?: Resolver<Maybe<ResolversTypes['ClaimedInvitation']>, ParentType, ContextType>;
  memberships?: Resolver<Maybe<Array<ResolversTypes['Membership']>>, ParentType, ContextType>;
  displayCurrency?: Resolver<Maybe<ResolversTypes['DisplayCurrency']>, ParentType, ContextType>;
  verifications?: Resolver<Maybe<Array<ResolversTypes['Verification']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileAggregate'] = ResolversParentTypes['ProfileAggregate']> = ResolversObject<{
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  safe_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  safe_address_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['AggregatePayload'], ParentType, ContextType>;
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
  contact_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contact_address_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  direction?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  payload?: Resolver<Maybe<ResolversTypes['EventPayload']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileOrOrganisationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileOrOrganisation'] = ResolversParentTypes['ProfileOrOrganisation']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Profile' | 'Organisation', ParentType, ContextType>;
}>;

export type ProofPaymentResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProofPaymentResult'] = ResolversParentTypes['ProofPaymentResult']> = ResolversObject<{
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PublicEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicEvent'] = ResolversParentTypes['PublicEvent']> = ResolversObject<{
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  block_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  transaction_index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contact_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contact_address_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  payload?: Resolver<Maybe<ResolversTypes['EventPayload']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PurchaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Purchase'] = ResolversParentTypes['Purchase']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdByProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  createdByAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lines?: Resolver<Array<ResolversTypes['PurchaseLine']>, ParentType, ContextType>;
  paymentTransaction?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  invoices?: Resolver<Array<ResolversTypes['Invoice']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PurchaseLineResolvers<ContextType = any, ParentType extends ResolversParentTypes['PurchaseLine'] = ResolversParentTypes['PurchaseLine']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offer?: Resolver<ResolversTypes['Offer'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PurchasesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Purchases'] = ResolversParentTypes['Purchases']> = ResolversObject<{
  lastUpdatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  purchases?: Resolver<Array<ResolversTypes['Purchase']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  whoami?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Version'], ParentType, ContextType>;
  sessionInfo?: Resolver<ResolversTypes['SessionInfo'], ParentType, ContextType>;
  claimedInvitation?: Resolver<Maybe<ResolversTypes['ClaimedInvitation']>, ParentType, ContextType>;
  invitationTransaction?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  hubSignupTransaction?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  safeInfo?: Resolver<Maybe<ResolversTypes['SafeInfo']>, ParentType, ContextType, RequireFields<QuerySafeInfoArgs, never>>;
  verifications?: Resolver<Array<ResolversTypes['Verification']>, ParentType, ContextType, RequireFields<QueryVerificationsArgs, never>>;
  events?: Resolver<Array<ResolversTypes['ProfileEvent']>, ParentType, ContextType, RequireFields<QueryEventsArgs, 'types' | 'safeAddress' | 'pagination'>>;
  aggregates?: Resolver<Array<ResolversTypes['ProfileAggregate']>, ParentType, ContextType, RequireFields<QueryAggregatesArgs, 'types' | 'safeAddress'>>;
  organisations?: Resolver<Array<ResolversTypes['Organisation']>, ParentType, ContextType, RequireFields<QueryOrganisationsArgs, never>>;
  regions?: Resolver<Array<ResolversTypes['Organisation']>, ParentType, ContextType, RequireFields<QueryRegionsArgs, never>>;
  organisationsByAddress?: Resolver<Array<ResolversTypes['Organisation']>, ParentType, ContextType, RequireFields<QueryOrganisationsByAddressArgs, 'addresses'>>;
  myInvitations?: Resolver<Array<ResolversTypes['CreatedInvitation']>, ParentType, ContextType>;
  commonTrust?: Resolver<Array<ResolversTypes['CommonTrust']>, ParentType, ContextType, RequireFields<QueryCommonTrustArgs, 'safeAddress1' | 'safeAddress2'>>;
  trustRelations?: Resolver<Array<ResolversTypes['TrustRelation']>, ParentType, ContextType, RequireFields<QueryTrustRelationsArgs, 'safeAddress'>>;
  myProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  profilesById?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryProfilesByIdArgs, 'ids'>>;
  profilesBySafeAddress?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryProfilesBySafeAddressArgs, 'safeAddresses'>>;
  findSafesByOwner?: Resolver<Array<ResolversTypes['SafeInfo']>, ParentType, ContextType, RequireFields<QueryFindSafesByOwnerArgs, 'owner'>>;
  search?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QuerySearchArgs, 'query'>>;
  profilesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  verificationsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  cities?: Resolver<Array<ResolversTypes['City']>, ParentType, ContextType, RequireFields<QueryCitiesArgs, 'query'>>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagsArgs, 'query'>>;
  tagById?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagByIdArgs, 'id'>>;
  directPath?: Resolver<ResolversTypes['TransitivePath'], ParentType, ContextType, RequireFields<QueryDirectPathArgs, 'from' | 'to' | 'amount'>>;
  invoice?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryInvoiceArgs, 'invoiceId'>>;
  findInvitationCreator?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryFindInvitationCreatorArgs, 'code'>>;
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

export type SafeAddressByOwnerResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SafeAddressByOwnerResult'] = ResolversParentTypes['SafeAddressByOwnerResult']> = ResolversObject<{
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  safeAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SafeInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['SafeInfo'] = ResolversParentTypes['SafeInfo']> = ResolversObject<{
  type?: Resolver<ResolversTypes['AccountType'], ParentType, ContextType>;
  safeAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastUbiAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokenAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  randomValue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  safeProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SafeVerifiedResolvers<ContextType = any, ParentType extends ResolversParentTypes['SafeVerified'] = ResolversParentTypes['SafeVerified']> = ResolversObject<{
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  organisation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organisation_profile?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType>;
  safe_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sale'] = ResolversParentTypes['Sale']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sellerAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sellerProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  buyerAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  buyerProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lines?: Resolver<Array<ResolversTypes['SalesLine']>, ParentType, ContextType>;
  paymentTransaction?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  invoices?: Resolver<Array<ResolversTypes['Invoice']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaleEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaleEvent'] = ResolversParentTypes['SaleEvent']> = ResolversObject<{
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  buyer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  buyer_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  invoice?: Resolver<Maybe<ResolversTypes['Invoice']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SalesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sales'] = ResolversParentTypes['Sales']> = ResolversObject<{
  lastUpdatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sales?: Resolver<Array<ResolversTypes['Sale']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SalesLineResolvers<ContextType = any, ParentType extends ResolversParentTypes['SalesLine'] = ResolversParentTypes['SalesLine']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offer?: Resolver<ResolversTypes['Offer'], ParentType, ContextType>;
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
  lastAcknowledgedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  capabilities?: Resolver<Array<ResolversTypes['Capability']>, ParentType, ContextType>;
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

export type TransitivePathResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransitivePath'] = ResolversParentTypes['TransitivePath']> = ResolversObject<{
  requestedAmount?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  flow?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transfers?: Resolver<Array<ResolversTypes['TransitiveTransfer']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransitiveTransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransitiveTransfer'] = ResolversParentTypes['TransitiveTransfer']> = ResolversObject<{
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenOwner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type VerificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Verification'] = ResolversParentTypes['Verification']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verifierSafeAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verifierProfile?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType>;
  verifiedSafeAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verifiedProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  revokedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  revokedProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  verificationRewardTransactionHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verificationRewardTransaction?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
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
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  invitedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  invitedBy_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AcceptMembershipResult?: AcceptMembershipResultResolvers<ContextType>;
  AddMemberResult?: AddMemberResultResolvers<ContextType>;
  AggregatePayload?: AggregatePayloadResolvers<ContextType>;
  AssetBalance?: AssetBalanceResolvers<ContextType>;
  Capability?: CapabilityResolvers<ContextType>;
  ChatMessage?: ChatMessageResolvers<ContextType>;
  City?: CityResolvers<ContextType>;
  ClaimInvitationResult?: ClaimInvitationResultResolvers<ContextType>;
  ClaimedInvitation?: ClaimedInvitationResolvers<ContextType>;
  CommonTrust?: CommonTrustResolvers<ContextType>;
  ConsumeDepositedChallengeResponse?: ConsumeDepositedChallengeResponseResolvers<ContextType>;
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
  DelegateAuthInit?: DelegateAuthInitResolvers<ContextType>;
  DepositChallengeResponse?: DepositChallengeResponseResolvers<ContextType>;
  Erc20Balances?: Erc20BalancesResolvers<ContextType>;
  Erc20Transfer?: Erc20TransferResolvers<ContextType>;
  EthTransfer?: EthTransferResolvers<ContextType>;
  EventPayload?: EventPayloadResolvers<ContextType>;
  ExchangeTokenResponse?: ExchangeTokenResponseResolvers<ContextType>;
  GnosisSafeEthTransfer?: GnosisSafeEthTransferResolvers<ContextType>;
  IAggregatePayload?: IAggregatePayloadResolvers<ContextType>;
  ICity?: ICityResolvers<ContextType>;
  IEventPayload?: IEventPayloadResolvers<ContextType>;
  InvitationCreated?: InvitationCreatedResolvers<ContextType>;
  InvitationRedeemed?: InvitationRedeemedResolvers<ContextType>;
  Invoice?: InvoiceResolvers<ContextType>;
  InvoiceLine?: InvoiceLineResolvers<ContextType>;
  LogoutResponse?: LogoutResponseResolvers<ContextType>;
  MemberAdded?: MemberAddedResolvers<ContextType>;
  Members?: MembersResolvers<ContextType>;
  Membership?: MembershipResolvers<ContextType>;
  MembershipAccepted?: MembershipAcceptedResolvers<ContextType>;
  MembershipOffer?: MembershipOfferResolvers<ContextType>;
  MembershipRejected?: MembershipRejectedResolvers<ContextType>;
  Memberships?: MembershipsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NotificationEvent?: NotificationEventResolvers<ContextType>;
  Offer?: OfferResolvers<ContextType>;
  Offers?: OffersResolvers<ContextType>;
  Organisation?: OrganisationResolvers<ContextType>;
  OrganisationCreated?: OrganisationCreatedResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  ProfileAggregate?: ProfileAggregateResolvers<ContextType>;
  ProfileEvent?: ProfileEventResolvers<ContextType>;
  ProfileOrOrganisation?: ProfileOrOrganisationResolvers<ContextType>;
  ProofPaymentResult?: ProofPaymentResultResolvers<ContextType>;
  PublicEvent?: PublicEventResolvers<ContextType>;
  Purchase?: PurchaseResolvers<ContextType>;
  PurchaseLine?: PurchaseLineResolvers<ContextType>;
  Purchases?: PurchasesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RedeemClaimedInvitationResult?: RedeemClaimedInvitationResultResolvers<ContextType>;
  RejectMembershipResult?: RejectMembershipResultResolvers<ContextType>;
  RemoveMemberResult?: RemoveMemberResultResolvers<ContextType>;
  RequestUpdateSafeResponse?: RequestUpdateSafeResponseResolvers<ContextType>;
  SafeAddressByOwnerResult?: SafeAddressByOwnerResultResolvers<ContextType>;
  SafeInfo?: SafeInfoResolvers<ContextType>;
  SafeVerified?: SafeVerifiedResolvers<ContextType>;
  Sale?: SaleResolvers<ContextType>;
  SaleEvent?: SaleEventResolvers<ContextType>;
  Sales?: SalesResolvers<ContextType>;
  SalesLine?: SalesLineResolvers<ContextType>;
  SendMessageResult?: SendMessageResultResolvers<ContextType>;
  Server?: ServerResolvers<ContextType>;
  SessionInfo?: SessionInfoResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TagTransactionResult?: TagTransactionResultResolvers<ContextType>;
  TransitivePath?: TransitivePathResolvers<ContextType>;
  TransitiveTransfer?: TransitiveTransferResolvers<ContextType>;
  TrustRelation?: TrustRelationResolvers<ContextType>;
  UpdateSafeResponse?: UpdateSafeResponseResolvers<ContextType>;
  Verification?: VerificationResolvers<ContextType>;
  VerifySafeResult?: VerifySafeResultResolvers<ContextType>;
  Version?: VersionResolvers<ContextType>;
  WelcomeMessage?: WelcomeMessageResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
