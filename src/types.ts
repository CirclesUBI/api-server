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

export type AggregatePayload = Contacts | CrcBalances | Erc20Balances | Erc721Tokens | Members | Memberships | Offers | Purchases | Sales;

export enum AggregateType {
  Contacts = 'Contacts',
  CrcBalances = 'CrcBalances',
  Erc20Balances = 'Erc20Balances',
  Erc721Tokens = 'Erc721Tokens',
  Members = 'Members',
  Memberships = 'Memberships',
  Offers = 'Offers',
  Purchases = 'Purchases',
  Sales = 'Sales'
}

export type AnnouncePaymentResult = {
  __typename?: 'AnnouncePaymentResult';
  invoiceId: Scalars['Int'];
  pickupCode: Scalars['String'];
  simplePickupCode?: Maybe<Scalars['String']>;
  transactionHash: Scalars['String'];
};

export type AssetBalance = {
  __typename?: 'AssetBalance';
  token_address: Scalars['String'];
  token_balance: Scalars['String'];
  token_owner_address: Scalars['String'];
  token_owner_profile?: Maybe<Profile>;
  token_symbol?: Maybe<Scalars['String']>;
};

export type Capability = {
  __typename?: 'Capability';
  type?: Maybe<CapabilityType>;
};

export enum CapabilityType {
  Invite = 'Invite',
  PreviewFeatures = 'PreviewFeatures',
  Translate = 'Translate',
  Verify = 'Verify'
}

export type ChatMessage = IEventPayload & {
  __typename?: 'ChatMessage';
  from: Scalars['String'];
  from_profile?: Maybe<Profile>;
  id: Scalars['Int'];
  text: Scalars['String'];
  to: Scalars['String'];
  to_profile?: Maybe<Profile>;
  transaction_hash?: Maybe<Scalars['String']>;
};

export type ChatMessageEventFilter = {
  id: Scalars['Int'];
};

export type City = ICity & {
  __typename?: 'City';
  country: Scalars['String'];
  feature_code: Scalars['String'];
  geonameid: Scalars['Int'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Scalars['String'];
  population: Scalars['Int'];
};

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

export type DeliveryMethod = {
  __typename?: 'DeliveryMethod';
  id: Scalars['Int'];
  name: Scalars['String'];
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

export type Erc721Token = {
  __typename?: 'Erc721Token';
  token_address: Scalars['String'];
  token_name?: Maybe<Scalars['String']>;
  token_no: Scalars['String'];
  token_owner_address: Scalars['String'];
  token_owner_profile?: Maybe<Profile>;
  token_symbol?: Maybe<Scalars['String']>;
  token_url: Scalars['String'];
};

export type Erc721Tokens = IAggregatePayload & {
  __typename?: 'Erc721Tokens';
  balances: Array<Erc721Token>;
  lastUpdatedAt: Scalars['String'];
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

export type EventPayload = ChatMessage | CrcHubTransfer | CrcMinting | CrcSignup | CrcTokenTransfer | CrcTrust | Erc20Transfer | EthTransfer | GnosisSafeEthTransfer | InvitationCreated | InvitationRedeemed | MemberAdded | MembershipAccepted | MembershipOffer | MembershipRejected | NewUser | OrganisationCreated | Purchased | SafeVerified | SaleEvent | WelcomeMessage;

export enum EventType {
  ChatMessage = 'ChatMessage',
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
  Purchased = 'Purchased',
  SafeVerified = 'SafeVerified',
  SaleEvent = 'SaleEvent',
  WelcomeMessage = 'WelcomeMessage'
}

export type ExchangeTokenResponse = {
  __typename?: 'ExchangeTokenResponse';
  errorMessage?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type FibonacciGoals = {
  __typename?: 'FibonacciGoals';
  currentValue: Scalars['Int'];
  lastGoal: Scalars['Int'];
  nextGoal: Scalars['Int'];
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

export type ICity = {
  country: Scalars['String'];
  feature_code: Scalars['String'];
  geonameid: Scalars['Int'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Scalars['String'];
  population: Scalars['Int'];
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

export type Invoice = {
  __typename?: 'Invoice';
  buyerAddress: Scalars['String'];
  buyerProfile?: Maybe<Profile>;
  buyerSignature?: Maybe<Scalars['Boolean']>;
  buyerSignedDate?: Maybe<Scalars['String']>;
  cancelReason?: Maybe<Scalars['String']>;
  cancelledAt?: Maybe<Scalars['String']>;
  cancelledBy?: Maybe<Profile>;
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  invoiceNo: Scalars['String'];
  lines?: Maybe<Array<InvoiceLine>>;
  paymentTransaction?: Maybe<ProfileEvent>;
  paymentTransactionHash?: Maybe<Scalars['String']>;
  pickupCode?: Maybe<Scalars['String']>;
  purchase?: Maybe<Purchase>;
  purchaseId: Scalars['Int'];
  sellerAddress: Scalars['String'];
  sellerProfile?: Maybe<Profile>;
  sellerSignature?: Maybe<Scalars['Boolean']>;
  sellerSignedDate?: Maybe<Scalars['String']>;
  simplePickupCode?: Maybe<Scalars['String']>;
};

export type InvoiceLine = {
  __typename?: 'InvoiceLine';
  amount: Scalars['Int'];
  id: Scalars['Int'];
  metadata?: Maybe<Scalars['String']>;
  offer?: Maybe<Offer>;
};

export type LeaderboardEntry = {
  __typename?: 'LeaderboardEntry';
  createdByCirclesAddress: Scalars['String'];
  createdByProfile?: Maybe<Profile>;
  inviteCount: Scalars['Int'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  errorMessage?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
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
  announcePayment: AnnouncePaymentResult;
  claimInvitation: ClaimInvitationResult;
  completePurchase: Invoice;
  completeSale: Invoice;
  createTestInvitation: CreateInvitationResult;
  deleteShippingAddress?: Maybe<PostAddress>;
  importOrganisationsOfAccount: Array<Organisation>;
  logout: LogoutResponse;
  proofUniqueness: ProofUniquenessResult;
  purchase: Array<Invoice>;
  redeemClaimedInvitation: RedeemClaimedInvitationResult;
  rejectMembership?: Maybe<RejectMembershipResult>;
  removeMember?: Maybe<RemoveMemberResult>;
  requestSessionChallenge: Scalars['String'];
  requestUpdateSafe: RequestUpdateSafeResponse;
  revokeSafeVerification: VerifySafeResult;
  sendMessage: SendMessageResult;
  tagTransaction: TagTransactionResult;
  updateSafe: UpdateSafeResponse;
  upsertOffer: Offer;
  upsertOrganisation: CreateOrganisationResult;
  upsertProfile: Profile;
  upsertRegion: CreateOrganisationResult;
  upsertShippingAddress?: Maybe<PostAddress>;
  upsertShop: Shop;
  upsertShopCategories: UpsertShopCategoriesResult;
  upsertShopCategoryEntries: UpsertShopCategoryEntriesResult;
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


export type MutationAnnouncePaymentArgs = {
  invoiceId: Scalars['Int'];
  transactionHash: Scalars['String'];
};


export type MutationClaimInvitationArgs = {
  code: Scalars['String'];
};


export type MutationCompletePurchaseArgs = {
  invoiceId: Scalars['Int'];
  revoke?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCompleteSaleArgs = {
  invoiceId: Scalars['Int'];
  revoke?: InputMaybe<Scalars['Boolean']>;
};


export type MutationDeleteShippingAddressArgs = {
  id: Scalars['Int'];
};


export type MutationProofUniquenessArgs = {
  humanodeToken: Scalars['String'];
};


export type MutationPurchaseArgs = {
  deliveryMethodId: Scalars['Int'];
  lines: Array<PurchaseLineInput>;
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


export type MutationTagTransactionArgs = {
  tag: CreateTagInput;
  transactionHash: Scalars['String'];
};


export type MutationUpdateSafeArgs = {
  data: UpdateSafeInput;
};


export type MutationUpsertOfferArgs = {
  offer: OfferInput;
};


export type MutationUpsertOrganisationArgs = {
  organisation: UpsertOrganisationInput;
};


export type MutationUpsertProfileArgs = {
  data: UpsertProfileInput;
};


export type MutationUpsertRegionArgs = {
  organisation: UpsertOrganisationInput;
};


export type MutationUpsertShippingAddressArgs = {
  data: PostAddressInput;
};


export type MutationUpsertShopArgs = {
  shop: ShopInput;
};


export type MutationUpsertShopCategoriesArgs = {
  shopCategories: Array<ShopCategoryInput>;
};


export type MutationUpsertShopCategoryEntriesArgs = {
  shopCategoryEntries: Array<ShopCategoryEntryInput>;
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

export type NotificationEvent = {
  __typename?: 'NotificationEvent';
  from: Scalars['String'];
  itemId?: Maybe<Scalars['Int']>;
  to: Scalars['String'];
  transaction_hash?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type Offer = {
  __typename?: 'Offer';
  allergens?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  createdByAddress: Scalars['String'];
  createdByProfile?: Maybe<Profile>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  pictureMimeType: Scalars['String'];
  pictureUrl: Scalars['String'];
  pricePerUnit: Scalars['String'];
  tags?: Maybe<Array<Tag>>;
  timeCirclesPriceShare: Scalars['Int'];
  title: Scalars['String'];
  version: Scalars['Int'];
};

export type OfferByIdAndVersionInput = {
  offerId: Scalars['Int'];
  offerVersion?: InputMaybe<Scalars['Int']>;
};

export type OfferInput = {
  allergens?: InputMaybe<Scalars['String']>;
  createdByProfileId: Scalars['Int'];
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  pictureMimeType: Scalars['String'];
  pictureUrl: Scalars['String'];
  pricePerUnit: Scalars['String'];
  timeCirclesPriceShare: Scalars['Int'];
  title: Scalars['String'];
};

export type Offers = IAggregatePayload & {
  __typename?: 'Offers';
  lastUpdatedAt: Scalars['String'];
  offers: Array<Offer>;
};

export type OffersAggregateFilter = {
  createdByAddresses?: InputMaybe<Array<Scalars['String']>>;
  offerIds?: InputMaybe<Array<Scalars['Int']>>;
};

export type Organisation = {
  __typename?: 'Organisation';
  avatarMimeType?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  circlesAddress?: Maybe<Scalars['String']>;
  circlesSafeOwner?: Maybe<Scalars['String']>;
  city?: Maybe<City>;
  cityGeonameid?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  displayCurrency?: Maybe<DisplayCurrency>;
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  largeBannerUrl?: Maybe<Scalars['String']>;
  members?: Maybe<Array<ProfileOrOrganisation>>;
  name: Scalars['String'];
  offers?: Maybe<Array<Offer>>;
  productListingType?: Maybe<ProductListingType>;
  shopEnabled?: Maybe<Scalars['Boolean']>;
  shops?: Maybe<Array<Shop>>;
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

export type PostAddress = {
  __typename?: 'PostAddress';
  city: Scalars['String'];
  cityGeonameid?: Maybe<Scalars['Int']>;
  country: Scalars['String'];
  house: Scalars['String'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street: Scalars['String'];
  zip: Scalars['String'];
};

export type PostAddressInput = {
  cityGeonameid: Scalars['Int'];
  house: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  street: Scalars['String'];
  zip: Scalars['String'];
};

export enum ProductListingType {
  List = 'LIST',
  Tiles = 'TILES'
}

export type Profile = {
  __typename?: 'Profile';
  askedForEmailAddress: Scalars['Boolean'];
  avatarCid?: Maybe<Scalars['String']>;
  avatarMimeType?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  balances?: Maybe<ProfileBalances>;
  circlesAddress?: Maybe<Scalars['String']>;
  circlesSafeOwner?: Maybe<Scalars['String']>;
  circlesTokenAddress?: Maybe<Scalars['String']>;
  city?: Maybe<City>;
  cityGeonameid?: Maybe<Scalars['Int']>;
  claimedInvitation?: Maybe<ClaimedInvitation>;
  contacts?: Maybe<Array<Contact>>;
  country?: Maybe<Scalars['String']>;
  displayCurrency?: Maybe<DisplayCurrency>;
  displayName?: Maybe<Scalars['String']>;
  displayTimeCircles?: Maybe<Scalars['Boolean']>;
  dream?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['Int'];
  invitationLink?: Maybe<Scalars['String']>;
  invitationTransaction?: Maybe<ProfileEvent>;
  largeBannerUrl?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Profile>>;
  memberships?: Maybe<Array<Membership>>;
  newsletter?: Maybe<Scalars['Boolean']>;
  offers?: Maybe<Array<Offer>>;
  origin?: Maybe<ProfileOrigin>;
  productListingType?: Maybe<ProductListingType>;
  purchases?: Maybe<Array<Purchase>>;
  sales?: Maybe<Array<Sale>>;
  shippingAddresses?: Maybe<Array<PostAddress>>;
  shops?: Maybe<Array<Shop>>;
  smallBannerUrl?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  successorOfCirclesAddress?: Maybe<Scalars['String']>;
  type?: Maybe<ProfileType>;
  verifications?: Maybe<Array<Verification>>;
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
  offers?: InputMaybe<OffersAggregateFilter>;
  purchases?: InputMaybe<PurchasesAggregateFilter>;
  sales?: InputMaybe<SalesAggregateFilter>;
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
  value?: Maybe<Scalars['String']>;
};

export type ProfileEventFilter = {
  chatMessage?: InputMaybe<ChatMessageEventFilter>;
  direction?: InputMaybe<Direction>;
  from?: InputMaybe<Scalars['String']>;
  purchased?: InputMaybe<PurchasedEventFilter>;
  sale?: InputMaybe<SaleEventFilter>;
  to?: InputMaybe<Scalars['String']>;
  transactionHash?: InputMaybe<Scalars['String']>;
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

export type ProofPaymentResult = {
  __typename?: 'ProofPaymentResult';
  acknowledged: Scalars['Boolean'];
};

export type ProofUniquenessResult = {
  __typename?: 'ProofUniquenessResult';
  existingSafe?: Maybe<Scalars['String']>;
};

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

export type Purchase = {
  __typename?: 'Purchase';
  createdAt: Scalars['String'];
  createdByAddress: Scalars['String'];
  createdByProfile?: Maybe<Profile>;
  deliveryMethod: DeliveryMethod;
  id: Scalars['Int'];
  invoices?: Maybe<Array<Invoice>>;
  lines?: Maybe<Array<PurchaseLine>>;
  total: Scalars['String'];
};

export type PurchaseLine = {
  __typename?: 'PurchaseLine';
  amount: Scalars['Int'];
  id: Scalars['Int'];
  metadata?: Maybe<Scalars['String']>;
  offer?: Maybe<Offer>;
};

export type PurchaseLineInput = {
  amount: Scalars['Int'];
  metadata?: InputMaybe<Scalars['String']>;
  offerId: Scalars['Int'];
};

export type Purchased = IEventPayload & {
  __typename?: 'Purchased';
  purchase: Purchase;
  seller: Scalars['String'];
  seller_profile?: Maybe<Profile>;
  transaction_hash?: Maybe<Scalars['String']>;
};

export type PurchasedEventFilter = {
  id: Scalars['Int'];
};

export type Purchases = IAggregatePayload & {
  __typename?: 'Purchases';
  lastUpdatedAt: Scalars['String'];
  purchases: Array<Purchase>;
};

export type PurchasesAggregateFilter = {
  createdByAddresses?: InputMaybe<Array<Scalars['String']>>;
  pickupCode?: InputMaybe<Scalars['String']>;
  purchaseIds?: InputMaybe<Array<Scalars['Int']>>;
};

export type Query = {
  __typename?: 'Query';
  aggregates: Array<ProfileAggregate>;
  cities: Array<City>;
  claimedInvitation?: Maybe<ClaimedInvitation>;
  clientAssertionJwt: Scalars['String'];
  commonTrust: Array<CommonTrust>;
  directPath: TransitivePath;
  events: Array<ProfileEvent>;
  findInvitationCreator?: Maybe<Profile>;
  findSafesByOwner: Array<SafeInfo>;
  hubSignupTransaction?: Maybe<ProfileEvent>;
  init: SessionInfo;
  invitationTransaction?: Maybe<ProfileEvent>;
  invoice?: Maybe<Scalars['String']>;
  lastAcknowledgedAt?: Maybe<Scalars['Date']>;
  myInvitations: Array<CreatedInvitation>;
  myProfile?: Maybe<Profile>;
  offersByIdAndVersion: Array<Offer>;
  organisations: Array<Organisation>;
  organisationsByAddress: Array<Organisation>;
  profilesById: Array<Profile>;
  profilesBySafeAddress: Array<Profile>;
  recentProfiles: Array<Profile>;
  regions: Array<Organisation>;
  safeInfo?: Maybe<SafeInfo>;
  search: Array<Profile>;
  sessionInfo: SessionInfo;
  shop?: Maybe<Shop>;
  shops: Array<Shop>;
  shopsById: Array<Shop>;
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


export type QueryCitiesArgs = {
  query: QueryCitiesInput;
};


export type QueryCommonTrustArgs = {
  safeAddress1: Scalars['String'];
  safeAddress2: Scalars['String'];
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


export type QueryInvoiceArgs = {
  invoiceId: Scalars['Int'];
};


export type QueryLastAcknowledgedAtArgs = {
  safeAddress: Scalars['String'];
};


export type QueryOffersByIdAndVersionArgs = {
  query: Array<OfferByIdAndVersionInput>;
};


export type QueryOrganisationsArgs = {
  pagination?: InputMaybe<PaginationArgs>;
};


export type QueryOrganisationsByAddressArgs = {
  addresses: Array<Scalars['String']>;
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


export type QueryShopArgs = {
  id: Scalars['Int'];
};


export type QueryShopsArgs = {
  ownerId?: InputMaybe<Scalars['Int']>;
};


export type QueryShopsByIdArgs = {
  ids: Array<Scalars['Int']>;
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

export type QueryCitiesByGeonameIdInput = {
  geonameid: Array<Scalars['Int']>;
};

export type QueryCitiesByNameInput = {
  languageCode?: InputMaybe<Scalars['String']>;
  name_like: Scalars['String'];
};

export type QueryCitiesInput = {
  byId?: InputMaybe<QueryCitiesByGeonameIdInput>;
  byName?: InputMaybe<QueryCitiesByNameInput>;
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

export type Sale = {
  __typename?: 'Sale';
  buyerAddress: Scalars['String'];
  buyerProfile?: Maybe<Profile>;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  invoices?: Maybe<Array<Invoice>>;
  lines?: Maybe<Array<SalesLine>>;
  paymentTransaction?: Maybe<ProfileEvent>;
  sellerAddress: Scalars['String'];
  sellerProfile?: Maybe<Profile>;
  total: Scalars['String'];
};

export type SaleEvent = IEventPayload & {
  __typename?: 'SaleEvent';
  buyer: Scalars['String'];
  buyer_profile?: Maybe<Profile>;
  invoice?: Maybe<Invoice>;
  transaction_hash?: Maybe<Scalars['String']>;
};

export type SaleEventFilter = {
  invoiceId?: InputMaybe<Scalars['Int']>;
  pickupCode?: InputMaybe<Scalars['String']>;
};

export type Sales = IAggregatePayload & {
  __typename?: 'Sales';
  lastUpdatedAt: Scalars['String'];
  sales: Array<Sale>;
};

export type SalesAggregateFilter = {
  createdByAddresses?: InputMaybe<Array<Scalars['String']>>;
  pickupCode?: InputMaybe<Scalars['String']>;
  salesIds?: InputMaybe<Array<Scalars['Int']>>;
};

export type SalesLine = {
  __typename?: 'SalesLine';
  amount: Scalars['Int'];
  id: Scalars['Int'];
  metadata?: Maybe<Scalars['String']>;
  offer: Offer;
};

export type SearchInput = {
  searchString: Scalars['String'];
};

export type SendMessageResult = {
  __typename?: 'SendMessageResult';
  error?: Maybe<Scalars['String']>;
  event?: Maybe<ProfileEvent>;
  success: Scalars['Boolean'];
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
  useShortSignup?: Maybe<Scalars['Boolean']>;
};

export type Shop = {
  __typename?: 'Shop';
  categories?: Maybe<Array<ShopCategory>>;
  createdAt: Scalars['Date'];
  deliveryMethods?: Maybe<Array<DeliveryMethod>>;
  description: Scalars['String'];
  enabled?: Maybe<Scalars['Boolean']>;
  healthInfosLink?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  largeBannerUrl: Scalars['String'];
  name: Scalars['String'];
  openingHours?: Maybe<Scalars['String']>;
  owner: Organisation;
  ownerId?: Maybe<Scalars['Int']>;
  pickupAddress?: Maybe<PostAddress>;
  privacyPolicyLink?: Maybe<Scalars['String']>;
  private?: Maybe<Scalars['Boolean']>;
  productListingStyle: ProductListingType;
  purchaseMetaDataKeys?: Maybe<Scalars['String']>;
  shopListingStyle: ShopListingStyle;
  smallBannerUrl: Scalars['String'];
  sortOrder?: Maybe<Scalars['Int']>;
  tosLink?: Maybe<Scalars['String']>;
};

export type ShopCategory = {
  __typename?: 'ShopCategory';
  createdAt?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  entries?: Maybe<Array<ShopCategoryEntry>>;
  id: Scalars['Int'];
  largeBannerUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  private?: Maybe<Scalars['Boolean']>;
  productListingStyle?: Maybe<ProductListingType>;
  shop?: Maybe<Shop>;
  shopId: Scalars['Int'];
  smallBannerUrl?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<Scalars['Int']>;
};

export type ShopCategoryEntry = {
  __typename?: 'ShopCategoryEntry';
  createdAt: Scalars['Date'];
  enabled?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  private?: Maybe<Scalars['Boolean']>;
  product?: Maybe<Offer>;
  productId: Scalars['Int'];
  productVersion: Scalars['Int'];
  shopCategory?: Maybe<ShopCategory>;
  shopCategoryId: Scalars['Int'];
  sortOrder?: Maybe<Scalars['Int']>;
};

export type ShopCategoryEntryInput = {
  enabled?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  private?: InputMaybe<Scalars['Boolean']>;
  productId: Scalars['Int'];
  productVersion: Scalars['Int'];
  shopCategoryId: Scalars['Int'];
  sortOrder?: InputMaybe<Scalars['Int']>;
};

export type ShopCategoryInput = {
  description?: InputMaybe<Scalars['String']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['Int']>;
  largeBannerUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  private?: InputMaybe<Scalars['Boolean']>;
  productListingStyle?: InputMaybe<ProductListingType>;
  shopId: Scalars['Int'];
  smallBannerUrl?: InputMaybe<Scalars['String']>;
  sortOrder?: InputMaybe<Scalars['Int']>;
};

export type ShopInput = {
  description: Scalars['String'];
  enabled: Scalars['Boolean'];
  healthInfosLink?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  largeBannerUrl: Scalars['String'];
  name: Scalars['String'];
  openingHours?: InputMaybe<Scalars['String']>;
  ownerId: Scalars['Int'];
  privacyPolicyLink?: InputMaybe<Scalars['String']>;
  private?: InputMaybe<Scalars['Boolean']>;
  productListingStyle: ProductListingType;
  shopListingStyle: ShopListingStyle;
  smallBannerUrl: Scalars['String'];
  sortOrder?: InputMaybe<Scalars['Int']>;
  tosLink?: InputMaybe<Scalars['String']>;
};

export enum ShopListingStyle {
  Featured = 'FEATURED',
  Regular = 'REGULAR'
}

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
  requestedAmount: Scalars['String'];
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
  circlesAddress?: InputMaybe<Scalars['String']>;
  cityGeonameid?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  displayCurrency?: InputMaybe<DisplayCurrency>;
  id?: InputMaybe<Scalars['Int']>;
  largeBannerUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  productListingType?: InputMaybe<ProductListingType>;
  smallBannerUrl?: InputMaybe<Scalars['String']>;
};

export type UpsertProfileInput = {
  askedForEmailAddress?: InputMaybe<Scalars['Boolean']>;
  avatarCid?: InputMaybe<Scalars['String']>;
  avatarMimeType?: InputMaybe<Scalars['String']>;
  avatarUrl?: InputMaybe<Scalars['String']>;
  circlesAddress?: InputMaybe<Scalars['String']>;
  circlesSafeOwner?: InputMaybe<Scalars['String']>;
  circlesTokenAddress?: InputMaybe<Scalars['String']>;
  cityGeonameid?: InputMaybe<Scalars['Int']>;
  country?: InputMaybe<Scalars['String']>;
  displayCurrency?: InputMaybe<DisplayCurrency>;
  displayTimeCircles?: InputMaybe<Scalars['Boolean']>;
  dream?: InputMaybe<Scalars['String']>;
  emailAddress?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  lastName?: InputMaybe<Scalars['String']>;
  newsletter?: InputMaybe<Scalars['Boolean']>;
  status: Scalars['String'];
  successorOfCirclesAddress?: InputMaybe<Scalars['String']>;
};

export type UpsertShopCategoriesResult = {
  __typename?: 'UpsertShopCategoriesResult';
  inserted: Scalars['Int'];
  updated: Scalars['Int'];
};

export type UpsertShopCategoryEntriesResult = {
  __typename?: 'UpsertShopCategoryEntriesResult';
  inserted: Scalars['Int'];
  updated: Scalars['Int'];
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
  AggregatePayload: ResolversTypes['Contacts'] | ResolversTypes['CrcBalances'] | ResolversTypes['Erc20Balances'] | ResolversTypes['Erc721Tokens'] | ResolversTypes['Members'] | ResolversTypes['Memberships'] | ResolversTypes['Offers'] | ResolversTypes['Purchases'] | ResolversTypes['Sales'];
  AggregateType: AggregateType;
  AnnouncePaymentResult: ResolverTypeWrapper<AnnouncePaymentResult>;
  AssetBalance: ResolverTypeWrapper<AssetBalance>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Capability: ResolverTypeWrapper<Capability>;
  CapabilityType: CapabilityType;
  ChatMessage: ResolverTypeWrapper<ChatMessage>;
  ChatMessageEventFilter: ChatMessageEventFilter;
  City: ResolverTypeWrapper<City>;
  ClaimInvitationResult: ResolverTypeWrapper<ClaimInvitationResult>;
  ClaimedInvitation: ResolverTypeWrapper<ClaimedInvitation>;
  CommonTrust: ResolverTypeWrapper<CommonTrust>;
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
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DeliveryMethod: ResolverTypeWrapper<DeliveryMethod>;
  Direction: Direction;
  DisplayCurrency: DisplayCurrency;
  Erc20Balances: ResolverTypeWrapper<Erc20Balances>;
  Erc20Transfer: ResolverTypeWrapper<Erc20Transfer>;
  Erc721Token: ResolverTypeWrapper<Erc721Token>;
  Erc721Tokens: ResolverTypeWrapper<Erc721Tokens>;
  EthTransfer: ResolverTypeWrapper<EthTransfer>;
  EventPayload: ResolversTypes['ChatMessage'] | ResolversTypes['CrcHubTransfer'] | ResolversTypes['CrcMinting'] | ResolversTypes['CrcSignup'] | ResolversTypes['CrcTokenTransfer'] | ResolversTypes['CrcTrust'] | ResolversTypes['Erc20Transfer'] | ResolversTypes['EthTransfer'] | ResolversTypes['GnosisSafeEthTransfer'] | ResolversTypes['InvitationCreated'] | ResolversTypes['InvitationRedeemed'] | ResolversTypes['MemberAdded'] | ResolversTypes['MembershipAccepted'] | ResolversTypes['MembershipOffer'] | ResolversTypes['MembershipRejected'] | ResolversTypes['NewUser'] | ResolversTypes['OrganisationCreated'] | ResolversTypes['Purchased'] | ResolversTypes['SafeVerified'] | ResolversTypes['SaleEvent'] | ResolversTypes['WelcomeMessage'];
  EventType: EventType;
  ExchangeTokenResponse: ResolverTypeWrapper<ExchangeTokenResponse>;
  FibonacciGoals: ResolverTypeWrapper<FibonacciGoals>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GnosisSafeEthTransfer: ResolverTypeWrapper<GnosisSafeEthTransfer>;
  IAggregatePayload: ResolversTypes['Contacts'] | ResolversTypes['CrcBalances'] | ResolversTypes['Erc20Balances'] | ResolversTypes['Erc721Tokens'] | ResolversTypes['Members'] | ResolversTypes['Memberships'] | ResolversTypes['Offers'] | ResolversTypes['Purchases'] | ResolversTypes['Sales'];
  ICity: ResolversTypes['City'];
  IEventPayload: ResolversTypes['ChatMessage'] | ResolversTypes['CrcHubTransfer'] | ResolversTypes['CrcMinting'] | ResolversTypes['CrcSignup'] | ResolversTypes['CrcTokenTransfer'] | ResolversTypes['CrcTrust'] | ResolversTypes['Erc20Transfer'] | ResolversTypes['EthTransfer'] | ResolversTypes['GnosisSafeEthTransfer'] | ResolversTypes['InvitationCreated'] | ResolversTypes['InvitationRedeemed'] | ResolversTypes['MemberAdded'] | ResolversTypes['MembershipAccepted'] | ResolversTypes['MembershipOffer'] | ResolversTypes['MembershipRejected'] | ResolversTypes['NewUser'] | ResolversTypes['OrganisationCreated'] | ResolversTypes['Purchased'] | ResolversTypes['SafeVerified'] | ResolversTypes['SaleEvent'] | ResolversTypes['WelcomeMessage'];
  Int: ResolverTypeWrapper<Scalars['Int']>;
  InvitationCreated: ResolverTypeWrapper<InvitationCreated>;
  InvitationRedeemed: ResolverTypeWrapper<InvitationRedeemed>;
  Invoice: ResolverTypeWrapper<Invoice>;
  InvoiceLine: ResolverTypeWrapper<InvoiceLine>;
  LeaderboardEntry: ResolverTypeWrapper<LeaderboardEntry>;
  LogoutResponse: ResolverTypeWrapper<LogoutResponse>;
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
  NotificationEvent: ResolverTypeWrapper<NotificationEvent>;
  Offer: ResolverTypeWrapper<Offer>;
  OfferByIdAndVersionInput: OfferByIdAndVersionInput;
  OfferInput: OfferInput;
  Offers: ResolverTypeWrapper<Offers>;
  OffersAggregateFilter: OffersAggregateFilter;
  Organisation: ResolverTypeWrapper<Omit<Organisation, 'members'> & { members?: Maybe<Array<ResolversTypes['ProfileOrOrganisation']>> }>;
  OrganisationCreated: ResolverTypeWrapper<OrganisationCreated>;
  PaginationArgs: PaginationArgs;
  PostAddress: ResolverTypeWrapper<PostAddress>;
  PostAddressInput: PostAddressInput;
  ProductListingType: ProductListingType;
  Profile: ResolverTypeWrapper<Profile>;
  ProfileAggregate: ResolverTypeWrapper<Omit<ProfileAggregate, 'payload'> & { payload: ResolversTypes['AggregatePayload'] }>;
  ProfileAggregateFilter: ProfileAggregateFilter;
  ProfileBalances: ResolverTypeWrapper<ProfileBalances>;
  ProfileEvent: ResolverTypeWrapper<Omit<ProfileEvent, 'payload'> & { payload?: Maybe<ResolversTypes['EventPayload']> }>;
  ProfileEventFilter: ProfileEventFilter;
  ProfileOrOrganisation: ResolversTypes['Organisation'] | ResolversTypes['Profile'];
  ProfileOrigin: ProfileOrigin;
  ProfileType: ProfileType;
  ProofPaymentResult: ResolverTypeWrapper<ProofPaymentResult>;
  ProofUniquenessResult: ResolverTypeWrapper<ProofUniquenessResult>;
  PublicEvent: ResolverTypeWrapper<Omit<PublicEvent, 'payload'> & { payload?: Maybe<ResolversTypes['EventPayload']> }>;
  Purchase: ResolverTypeWrapper<Purchase>;
  PurchaseLine: ResolverTypeWrapper<PurchaseLine>;
  PurchaseLineInput: PurchaseLineInput;
  Purchased: ResolverTypeWrapper<Purchased>;
  PurchasedEventFilter: PurchasedEventFilter;
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
  SaleEventFilter: SaleEventFilter;
  Sales: ResolverTypeWrapper<Sales>;
  SalesAggregateFilter: SalesAggregateFilter;
  SalesLine: ResolverTypeWrapper<SalesLine>;
  SearchInput: SearchInput;
  SendMessageResult: ResolverTypeWrapper<SendMessageResult>;
  Server: ResolverTypeWrapper<Server>;
  SessionInfo: ResolverTypeWrapper<SessionInfo>;
  Shop: ResolverTypeWrapper<Shop>;
  ShopCategory: ResolverTypeWrapper<ShopCategory>;
  ShopCategoryEntry: ResolverTypeWrapper<ShopCategoryEntry>;
  ShopCategoryEntryInput: ShopCategoryEntryInput;
  ShopCategoryInput: ShopCategoryInput;
  ShopInput: ShopInput;
  ShopListingStyle: ShopListingStyle;
  SortOrder: SortOrder;
  Stats: ResolverTypeWrapper<Stats>;
  String: ResolverTypeWrapper<Scalars['String']>;
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
  UpsertShopCategoriesResult: ResolverTypeWrapper<UpsertShopCategoriesResult>;
  UpsertShopCategoryEntriesResult: ResolverTypeWrapper<UpsertShopCategoryEntriesResult>;
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
  AddMemberResult: AddMemberResult;
  AggregatePayload: ResolversParentTypes['Contacts'] | ResolversParentTypes['CrcBalances'] | ResolversParentTypes['Erc20Balances'] | ResolversParentTypes['Erc721Tokens'] | ResolversParentTypes['Members'] | ResolversParentTypes['Memberships'] | ResolversParentTypes['Offers'] | ResolversParentTypes['Purchases'] | ResolversParentTypes['Sales'];
  AnnouncePaymentResult: AnnouncePaymentResult;
  AssetBalance: AssetBalance;
  Boolean: Scalars['Boolean'];
  Capability: Capability;
  ChatMessage: ChatMessage;
  ChatMessageEventFilter: ChatMessageEventFilter;
  City: City;
  ClaimInvitationResult: ClaimInvitationResult;
  ClaimedInvitation: ClaimedInvitation;
  CommonTrust: CommonTrust;
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
  Date: Scalars['Date'];
  DeliveryMethod: DeliveryMethod;
  Erc20Balances: Erc20Balances;
  Erc20Transfer: Erc20Transfer;
  Erc721Token: Erc721Token;
  Erc721Tokens: Erc721Tokens;
  EthTransfer: EthTransfer;
  EventPayload: ResolversParentTypes['ChatMessage'] | ResolversParentTypes['CrcHubTransfer'] | ResolversParentTypes['CrcMinting'] | ResolversParentTypes['CrcSignup'] | ResolversParentTypes['CrcTokenTransfer'] | ResolversParentTypes['CrcTrust'] | ResolversParentTypes['Erc20Transfer'] | ResolversParentTypes['EthTransfer'] | ResolversParentTypes['GnosisSafeEthTransfer'] | ResolversParentTypes['InvitationCreated'] | ResolversParentTypes['InvitationRedeemed'] | ResolversParentTypes['MemberAdded'] | ResolversParentTypes['MembershipAccepted'] | ResolversParentTypes['MembershipOffer'] | ResolversParentTypes['MembershipRejected'] | ResolversParentTypes['NewUser'] | ResolversParentTypes['OrganisationCreated'] | ResolversParentTypes['Purchased'] | ResolversParentTypes['SafeVerified'] | ResolversParentTypes['SaleEvent'] | ResolversParentTypes['WelcomeMessage'];
  ExchangeTokenResponse: ExchangeTokenResponse;
  FibonacciGoals: FibonacciGoals;
  Float: Scalars['Float'];
  GnosisSafeEthTransfer: GnosisSafeEthTransfer;
  IAggregatePayload: ResolversParentTypes['Contacts'] | ResolversParentTypes['CrcBalances'] | ResolversParentTypes['Erc20Balances'] | ResolversParentTypes['Erc721Tokens'] | ResolversParentTypes['Members'] | ResolversParentTypes['Memberships'] | ResolversParentTypes['Offers'] | ResolversParentTypes['Purchases'] | ResolversParentTypes['Sales'];
  ICity: ResolversParentTypes['City'];
  IEventPayload: ResolversParentTypes['ChatMessage'] | ResolversParentTypes['CrcHubTransfer'] | ResolversParentTypes['CrcMinting'] | ResolversParentTypes['CrcSignup'] | ResolversParentTypes['CrcTokenTransfer'] | ResolversParentTypes['CrcTrust'] | ResolversParentTypes['Erc20Transfer'] | ResolversParentTypes['EthTransfer'] | ResolversParentTypes['GnosisSafeEthTransfer'] | ResolversParentTypes['InvitationCreated'] | ResolversParentTypes['InvitationRedeemed'] | ResolversParentTypes['MemberAdded'] | ResolversParentTypes['MembershipAccepted'] | ResolversParentTypes['MembershipOffer'] | ResolversParentTypes['MembershipRejected'] | ResolversParentTypes['NewUser'] | ResolversParentTypes['OrganisationCreated'] | ResolversParentTypes['Purchased'] | ResolversParentTypes['SafeVerified'] | ResolversParentTypes['SaleEvent'] | ResolversParentTypes['WelcomeMessage'];
  Int: Scalars['Int'];
  InvitationCreated: InvitationCreated;
  InvitationRedeemed: InvitationRedeemed;
  Invoice: Invoice;
  InvoiceLine: InvoiceLine;
  LeaderboardEntry: LeaderboardEntry;
  LogoutResponse: LogoutResponse;
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
  NotificationEvent: NotificationEvent;
  Offer: Offer;
  OfferByIdAndVersionInput: OfferByIdAndVersionInput;
  OfferInput: OfferInput;
  Offers: Offers;
  OffersAggregateFilter: OffersAggregateFilter;
  Organisation: Omit<Organisation, 'members'> & { members?: Maybe<Array<ResolversParentTypes['ProfileOrOrganisation']>> };
  OrganisationCreated: OrganisationCreated;
  PaginationArgs: PaginationArgs;
  PostAddress: PostAddress;
  PostAddressInput: PostAddressInput;
  Profile: Profile;
  ProfileAggregate: Omit<ProfileAggregate, 'payload'> & { payload: ResolversParentTypes['AggregatePayload'] };
  ProfileAggregateFilter: ProfileAggregateFilter;
  ProfileBalances: ProfileBalances;
  ProfileEvent: Omit<ProfileEvent, 'payload'> & { payload?: Maybe<ResolversParentTypes['EventPayload']> };
  ProfileEventFilter: ProfileEventFilter;
  ProfileOrOrganisation: ResolversParentTypes['Organisation'] | ResolversParentTypes['Profile'];
  ProofPaymentResult: ProofPaymentResult;
  ProofUniquenessResult: ProofUniquenessResult;
  PublicEvent: Omit<PublicEvent, 'payload'> & { payload?: Maybe<ResolversParentTypes['EventPayload']> };
  Purchase: Purchase;
  PurchaseLine: PurchaseLine;
  PurchaseLineInput: PurchaseLineInput;
  Purchased: Purchased;
  PurchasedEventFilter: PurchasedEventFilter;
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
  SaleEventFilter: SaleEventFilter;
  Sales: Sales;
  SalesAggregateFilter: SalesAggregateFilter;
  SalesLine: SalesLine;
  SearchInput: SearchInput;
  SendMessageResult: SendMessageResult;
  Server: Server;
  SessionInfo: SessionInfo;
  Shop: Shop;
  ShopCategory: ShopCategory;
  ShopCategoryEntry: ShopCategoryEntry;
  ShopCategoryEntryInput: ShopCategoryEntryInput;
  ShopCategoryInput: ShopCategoryInput;
  ShopInput: ShopInput;
  Stats: Stats;
  String: Scalars['String'];
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
  UpsertShopCategoriesResult: UpsertShopCategoriesResult;
  UpsertShopCategoryEntriesResult: UpsertShopCategoryEntriesResult;
  UpsertTagInput: UpsertTagInput;
  Verification: Verification;
  VerifiedSafesFilter: VerifiedSafesFilter;
  VerifySafeResult: VerifySafeResult;
  Version: Version;
  WelcomeMessage: WelcomeMessage;
}>;

export type CostDirectiveArgs = {
  value?: Maybe<Scalars['Int']>;
};

export type CostDirectiveResolver<Result, Parent, ContextType = any, Args = CostDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CostFactorDirectiveArgs = {
  value?: Maybe<Scalars['Int']>;
};

export type CostFactorDirectiveResolver<Result, Parent, ContextType = any, Args = CostFactorDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

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
  __resolveType: TypeResolveFn<'Contacts' | 'CrcBalances' | 'Erc20Balances' | 'Erc721Tokens' | 'Members' | 'Memberships' | 'Offers' | 'Purchases' | 'Sales', ParentType, ContextType>;
}>;

export type AnnouncePaymentResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnnouncePaymentResult'] = ResolversParentTypes['AnnouncePaymentResult']> = ResolversObject<{
  invoiceId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pickupCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  simplePickupCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AssetBalanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['AssetBalance'] = ResolversParentTypes['AssetBalance']> = ResolversObject<{
  token_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token_balance?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token_owner_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token_owner_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  token_symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CapabilityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Capability'] = ResolversParentTypes['Capability']> = ResolversObject<{
  type?: Resolver<Maybe<ResolversTypes['CapabilityType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ChatMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatMessage'] = ResolversParentTypes['ChatMessage']> = ResolversObject<{
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CityResolvers<ContextType = any, ParentType extends ResolversParentTypes['City'] = ResolversParentTypes['City']> = ResolversObject<{
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  feature_code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  geonameid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  population?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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

export type DeliveryMethodResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeliveryMethod'] = ResolversParentTypes['DeliveryMethod']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

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

export type Erc721TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Erc721Token'] = ResolversParentTypes['Erc721Token']> = ResolversObject<{
  token_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token_no?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token_owner_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token_owner_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  token_symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Erc721TokensResolvers<ContextType = any, ParentType extends ResolversParentTypes['Erc721Tokens'] = ResolversParentTypes['Erc721Tokens']> = ResolversObject<{
  balances?: Resolver<Array<ResolversTypes['Erc721Token']>, ParentType, ContextType>;
  lastUpdatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  __resolveType: TypeResolveFn<'ChatMessage' | 'CrcHubTransfer' | 'CrcMinting' | 'CrcSignup' | 'CrcTokenTransfer' | 'CrcTrust' | 'Erc20Transfer' | 'EthTransfer' | 'GnosisSafeEthTransfer' | 'InvitationCreated' | 'InvitationRedeemed' | 'MemberAdded' | 'MembershipAccepted' | 'MembershipOffer' | 'MembershipRejected' | 'NewUser' | 'OrganisationCreated' | 'Purchased' | 'SafeVerified' | 'SaleEvent' | 'WelcomeMessage', ParentType, ContextType>;
}>;

export type ExchangeTokenResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExchangeTokenResponse'] = ResolversParentTypes['ExchangeTokenResponse']> = ResolversObject<{
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
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
  __resolveType: TypeResolveFn<'Contacts' | 'CrcBalances' | 'Erc20Balances' | 'Erc721Tokens' | 'Members' | 'Memberships' | 'Offers' | 'Purchases' | 'Sales', ParentType, ContextType>;
  lastUpdatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ICityResolvers<ContextType = any, ParentType extends ResolversParentTypes['ICity'] = ResolversParentTypes['ICity']> = ResolversObject<{
  __resolveType: TypeResolveFn<'City', ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  feature_code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  geonameid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  population?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type IEventPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['IEventPayload'] = ResolversParentTypes['IEventPayload']> = ResolversObject<{
  __resolveType: TypeResolveFn<'ChatMessage' | 'CrcHubTransfer' | 'CrcMinting' | 'CrcSignup' | 'CrcTokenTransfer' | 'CrcTrust' | 'Erc20Transfer' | 'EthTransfer' | 'GnosisSafeEthTransfer' | 'InvitationCreated' | 'InvitationRedeemed' | 'MemberAdded' | 'MembershipAccepted' | 'MembershipOffer' | 'MembershipRejected' | 'NewUser' | 'OrganisationCreated' | 'Purchased' | 'SafeVerified' | 'SaleEvent' | 'WelcomeMessage', ParentType, ContextType>;
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

export type InvoiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Invoice'] = ResolversParentTypes['Invoice']> = ResolversObject<{
  buyerAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  buyerProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  buyerSignature?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  buyerSignedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cancelReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cancelledAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cancelledBy?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  invoiceNo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lines?: Resolver<Maybe<Array<ResolversTypes['InvoiceLine']>>, ParentType, ContextType>;
  paymentTransaction?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  paymentTransactionHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pickupCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  purchase?: Resolver<Maybe<ResolversTypes['Purchase']>, ParentType, ContextType>;
  purchaseId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sellerAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sellerProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  sellerSignature?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sellerSignedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  simplePickupCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InvoiceLineResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvoiceLine'] = ResolversParentTypes['InvoiceLine']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  offer?: Resolver<Maybe<ResolversTypes['Offer']>, ParentType, ContextType>;
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
  announcePayment?: Resolver<ResolversTypes['AnnouncePaymentResult'], ParentType, ContextType, RequireFields<MutationAnnouncePaymentArgs, 'invoiceId' | 'transactionHash'>>;
  claimInvitation?: Resolver<ResolversTypes['ClaimInvitationResult'], ParentType, ContextType, RequireFields<MutationClaimInvitationArgs, 'code'>>;
  completePurchase?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationCompletePurchaseArgs, 'invoiceId'>>;
  completeSale?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationCompleteSaleArgs, 'invoiceId'>>;
  createTestInvitation?: Resolver<ResolversTypes['CreateInvitationResult'], ParentType, ContextType>;
  deleteShippingAddress?: Resolver<Maybe<ResolversTypes['PostAddress']>, ParentType, ContextType, RequireFields<MutationDeleteShippingAddressArgs, 'id'>>;
  importOrganisationsOfAccount?: Resolver<Array<ResolversTypes['Organisation']>, ParentType, ContextType>;
  logout?: Resolver<ResolversTypes['LogoutResponse'], ParentType, ContextType>;
  proofUniqueness?: Resolver<ResolversTypes['ProofUniquenessResult'], ParentType, ContextType, RequireFields<MutationProofUniquenessArgs, 'humanodeToken'>>;
  purchase?: Resolver<Array<ResolversTypes['Invoice']>, ParentType, ContextType, RequireFields<MutationPurchaseArgs, 'deliveryMethodId' | 'lines'>>;
  redeemClaimedInvitation?: Resolver<ResolversTypes['RedeemClaimedInvitationResult'], ParentType, ContextType>;
  rejectMembership?: Resolver<Maybe<ResolversTypes['RejectMembershipResult']>, ParentType, ContextType, RequireFields<MutationRejectMembershipArgs, 'membershipId'>>;
  removeMember?: Resolver<Maybe<ResolversTypes['RemoveMemberResult']>, ParentType, ContextType, RequireFields<MutationRemoveMemberArgs, 'groupId' | 'memberAddress'>>;
  requestSessionChallenge?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRequestSessionChallengeArgs, 'address'>>;
  requestUpdateSafe?: Resolver<ResolversTypes['RequestUpdateSafeResponse'], ParentType, ContextType, RequireFields<MutationRequestUpdateSafeArgs, 'data'>>;
  revokeSafeVerification?: Resolver<ResolversTypes['VerifySafeResult'], ParentType, ContextType, RequireFields<MutationRevokeSafeVerificationArgs, 'safeAddress'>>;
  sendMessage?: Resolver<ResolversTypes['SendMessageResult'], ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'content' | 'toSafeAddress'>>;
  tagTransaction?: Resolver<ResolversTypes['TagTransactionResult'], ParentType, ContextType, RequireFields<MutationTagTransactionArgs, 'tag' | 'transactionHash'>>;
  updateSafe?: Resolver<ResolversTypes['UpdateSafeResponse'], ParentType, ContextType, RequireFields<MutationUpdateSafeArgs, 'data'>>;
  upsertOffer?: Resolver<ResolversTypes['Offer'], ParentType, ContextType, RequireFields<MutationUpsertOfferArgs, 'offer'>>;
  upsertOrganisation?: Resolver<ResolversTypes['CreateOrganisationResult'], ParentType, ContextType, RequireFields<MutationUpsertOrganisationArgs, 'organisation'>>;
  upsertProfile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<MutationUpsertProfileArgs, 'data'>>;
  upsertRegion?: Resolver<ResolversTypes['CreateOrganisationResult'], ParentType, ContextType, RequireFields<MutationUpsertRegionArgs, 'organisation'>>;
  upsertShippingAddress?: Resolver<Maybe<ResolversTypes['PostAddress']>, ParentType, ContextType, RequireFields<MutationUpsertShippingAddressArgs, 'data'>>;
  upsertShop?: Resolver<ResolversTypes['Shop'], ParentType, ContextType, RequireFields<MutationUpsertShopArgs, 'shop'>>;
  upsertShopCategories?: Resolver<ResolversTypes['UpsertShopCategoriesResult'], ParentType, ContextType, RequireFields<MutationUpsertShopCategoriesArgs, 'shopCategories'>>;
  upsertShopCategoryEntries?: Resolver<ResolversTypes['UpsertShopCategoryEntriesResult'], ParentType, ContextType, RequireFields<MutationUpsertShopCategoryEntriesArgs, 'shopCategoryEntries'>>;
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

export type NotificationEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotificationEvent'] = ResolversParentTypes['NotificationEvent']> = ResolversObject<{
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  itemId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OfferResolvers<ContextType = any, ParentType extends ResolversParentTypes['Offer'] = ResolversParentTypes['Offer']> = ResolversObject<{
  allergens?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdByAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdByProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pictureMimeType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pictureUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pricePerUnit?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  timeCirclesPriceShare?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OffersResolvers<ContextType = any, ParentType extends ResolversParentTypes['Offers'] = ResolversParentTypes['Offers']> = ResolversObject<{
  lastUpdatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  offers?: Resolver<Array<ResolversTypes['Offer']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrganisationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organisation'] = ResolversParentTypes['Organisation']> = ResolversObject<{
  avatarMimeType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  circlesAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  circlesSafeOwner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['City']>, ParentType, ContextType>;
  cityGeonameid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayCurrency?: Resolver<Maybe<ResolversTypes['DisplayCurrency']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  largeBannerUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  members?: Resolver<Maybe<Array<ResolversTypes['ProfileOrOrganisation']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  offers?: Resolver<Maybe<Array<ResolversTypes['Offer']>>, ParentType, ContextType>;
  productListingType?: Resolver<Maybe<ResolversTypes['ProductListingType']>, ParentType, ContextType>;
  shopEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  shops?: Resolver<Maybe<Array<ResolversTypes['Shop']>>, ParentType, ContextType>;
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

export type PostAddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostAddress'] = ResolversParentTypes['PostAddress']> = ResolversObject<{
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cityGeonameid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  house?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zip?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = ResolversObject<{
  askedForEmailAddress?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  avatarCid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatarMimeType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  balances?: Resolver<Maybe<ResolversTypes['ProfileBalances']>, ParentType, ContextType>;
  circlesAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  circlesSafeOwner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  circlesTokenAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['City']>, ParentType, ContextType>;
  cityGeonameid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  claimedInvitation?: Resolver<Maybe<ResolversTypes['ClaimedInvitation']>, ParentType, ContextType>;
  contacts?: Resolver<Maybe<Array<ResolversTypes['Contact']>>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayCurrency?: Resolver<Maybe<ResolversTypes['DisplayCurrency']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayTimeCircles?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  dream?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  invitationLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  invitationTransaction?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  largeBannerUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  members?: Resolver<Maybe<Array<ResolversTypes['Profile']>>, ParentType, ContextType>;
  memberships?: Resolver<Maybe<Array<ResolversTypes['Membership']>>, ParentType, ContextType>;
  newsletter?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  offers?: Resolver<Maybe<Array<ResolversTypes['Offer']>>, ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['ProfileOrigin']>, ParentType, ContextType>;
  productListingType?: Resolver<Maybe<ResolversTypes['ProductListingType']>, ParentType, ContextType>;
  purchases?: Resolver<Maybe<Array<ResolversTypes['Purchase']>>, ParentType, ContextType>;
  sales?: Resolver<Maybe<Array<ResolversTypes['Sale']>>, ParentType, ContextType>;
  shippingAddresses?: Resolver<Maybe<Array<ResolversTypes['PostAddress']>>, ParentType, ContextType>;
  shops?: Resolver<Maybe<Array<ResolversTypes['Shop']>>, ParentType, ContextType>;
  smallBannerUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  successorOfCirclesAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileOrOrganisationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileOrOrganisation'] = ResolversParentTypes['ProfileOrOrganisation']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Organisation' | 'Profile', ParentType, ContextType>;
}>;

export type ProofPaymentResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProofPaymentResult'] = ResolversParentTypes['ProofPaymentResult']> = ResolversObject<{
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProofUniquenessResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProofUniquenessResult'] = ResolversParentTypes['ProofUniquenessResult']> = ResolversObject<{
  existingSafe?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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

export type PurchaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Purchase'] = ResolversParentTypes['Purchase']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdByAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdByProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  deliveryMethod?: Resolver<ResolversTypes['DeliveryMethod'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  invoices?: Resolver<Maybe<Array<ResolversTypes['Invoice']>>, ParentType, ContextType>;
  lines?: Resolver<Maybe<Array<ResolversTypes['PurchaseLine']>>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PurchaseLineResolvers<ContextType = any, ParentType extends ResolversParentTypes['PurchaseLine'] = ResolversParentTypes['PurchaseLine']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  offer?: Resolver<Maybe<ResolversTypes['Offer']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PurchasedResolvers<ContextType = any, ParentType extends ResolversParentTypes['Purchased'] = ResolversParentTypes['Purchased']> = ResolversObject<{
  purchase?: Resolver<ResolversTypes['Purchase'], ParentType, ContextType>;
  seller?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seller_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PurchasesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Purchases'] = ResolversParentTypes['Purchases']> = ResolversObject<{
  lastUpdatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  purchases?: Resolver<Array<ResolversTypes['Purchase']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  aggregates?: Resolver<Array<ResolversTypes['ProfileAggregate']>, ParentType, ContextType, RequireFields<QueryAggregatesArgs, 'safeAddress' | 'types'>>;
  cities?: Resolver<Array<ResolversTypes['City']>, ParentType, ContextType, RequireFields<QueryCitiesArgs, 'query'>>;
  claimedInvitation?: Resolver<Maybe<ResolversTypes['ClaimedInvitation']>, ParentType, ContextType>;
  clientAssertionJwt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  commonTrust?: Resolver<Array<ResolversTypes['CommonTrust']>, ParentType, ContextType, RequireFields<QueryCommonTrustArgs, 'safeAddress1' | 'safeAddress2'>>;
  directPath?: Resolver<ResolversTypes['TransitivePath'], ParentType, ContextType, RequireFields<QueryDirectPathArgs, 'amount' | 'from' | 'to'>>;
  events?: Resolver<Array<ResolversTypes['ProfileEvent']>, ParentType, ContextType, RequireFields<QueryEventsArgs, 'pagination' | 'safeAddress' | 'types'>>;
  findInvitationCreator?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryFindInvitationCreatorArgs, 'code'>>;
  findSafesByOwner?: Resolver<Array<ResolversTypes['SafeInfo']>, ParentType, ContextType, RequireFields<QueryFindSafesByOwnerArgs, 'owner'>>;
  hubSignupTransaction?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  init?: Resolver<ResolversTypes['SessionInfo'], ParentType, ContextType>;
  invitationTransaction?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  invoice?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryInvoiceArgs, 'invoiceId'>>;
  lastAcknowledgedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType, RequireFields<QueryLastAcknowledgedAtArgs, 'safeAddress'>>;
  myInvitations?: Resolver<Array<ResolversTypes['CreatedInvitation']>, ParentType, ContextType>;
  myProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  offersByIdAndVersion?: Resolver<Array<ResolversTypes['Offer']>, ParentType, ContextType, RequireFields<QueryOffersByIdAndVersionArgs, 'query'>>;
  organisations?: Resolver<Array<ResolversTypes['Organisation']>, ParentType, ContextType, Partial<QueryOrganisationsArgs>>;
  organisationsByAddress?: Resolver<Array<ResolversTypes['Organisation']>, ParentType, ContextType, RequireFields<QueryOrganisationsByAddressArgs, 'addresses'>>;
  profilesById?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryProfilesByIdArgs, 'ids'>>;
  profilesBySafeAddress?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryProfilesBySafeAddressArgs, 'safeAddresses'>>;
  recentProfiles?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType, Partial<QueryRecentProfilesArgs>>;
  regions?: Resolver<Array<ResolversTypes['Organisation']>, ParentType, ContextType, Partial<QueryRegionsArgs>>;
  safeInfo?: Resolver<Maybe<ResolversTypes['SafeInfo']>, ParentType, ContextType, Partial<QuerySafeInfoArgs>>;
  search?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QuerySearchArgs, 'query'>>;
  sessionInfo?: Resolver<ResolversTypes['SessionInfo'], ParentType, ContextType>;
  shop?: Resolver<Maybe<ResolversTypes['Shop']>, ParentType, ContextType, RequireFields<QueryShopArgs, 'id'>>;
  shops?: Resolver<Array<ResolversTypes['Shop']>, ParentType, ContextType, Partial<QueryShopsArgs>>;
  shopsById?: Resolver<Array<ResolversTypes['Shop']>, ParentType, ContextType, RequireFields<QueryShopsByIdArgs, 'ids'>>;
  stats?: Resolver<ResolversTypes['Stats'], ParentType, ContextType>;
  tagById?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagByIdArgs, 'id'>>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagsArgs, 'query'>>;
  trustRelations?: Resolver<Array<ResolversTypes['TrustRelation']>, ParentType, ContextType, RequireFields<QueryTrustRelationsArgs, 'safeAddress'>>;
  verifications?: Resolver<Array<ResolversTypes['Verification']>, ParentType, ContextType, Partial<QueryVerificationsArgs>>;
  version?: Resolver<ResolversTypes['Version'], ParentType, ContextType>;
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

export type SaleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sale'] = ResolversParentTypes['Sale']> = ResolversObject<{
  buyerAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  buyerProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  invoices?: Resolver<Maybe<Array<ResolversTypes['Invoice']>>, ParentType, ContextType>;
  lines?: Resolver<Maybe<Array<ResolversTypes['SalesLine']>>, ParentType, ContextType>;
  paymentTransaction?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  sellerAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sellerProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaleEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaleEvent'] = ResolversParentTypes['SaleEvent']> = ResolversObject<{
  buyer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  buyer_profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  invoice?: Resolver<Maybe<ResolversTypes['Invoice']>, ParentType, ContextType>;
  transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SalesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sales'] = ResolversParentTypes['Sales']> = ResolversObject<{
  lastUpdatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sales?: Resolver<Array<ResolversTypes['Sale']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SalesLineResolvers<ContextType = any, ParentType extends ResolversParentTypes['SalesLine'] = ResolversParentTypes['SalesLine']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  offer?: Resolver<ResolversTypes['Offer'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SendMessageResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendMessageResult'] = ResolversParentTypes['SendMessageResult']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  event?: Resolver<Maybe<ResolversTypes['ProfileEvent']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
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
  useShortSignup?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ShopResolvers<ContextType = any, ParentType extends ResolversParentTypes['Shop'] = ResolversParentTypes['Shop']> = ResolversObject<{
  categories?: Resolver<Maybe<Array<ResolversTypes['ShopCategory']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  deliveryMethods?: Resolver<Maybe<Array<ResolversTypes['DeliveryMethod']>>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  enabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  healthInfosLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  largeBannerUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  openingHours?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Organisation'], ParentType, ContextType>;
  ownerId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pickupAddress?: Resolver<Maybe<ResolversTypes['PostAddress']>, ParentType, ContextType>;
  privacyPolicyLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  private?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  productListingStyle?: Resolver<ResolversTypes['ProductListingType'], ParentType, ContextType>;
  purchaseMetaDataKeys?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shopListingStyle?: Resolver<ResolversTypes['ShopListingStyle'], ParentType, ContextType>;
  smallBannerUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sortOrder?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tosLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ShopCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShopCategory'] = ResolversParentTypes['ShopCategory']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  entries?: Resolver<Maybe<Array<ResolversTypes['ShopCategoryEntry']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  largeBannerUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  private?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  productListingStyle?: Resolver<Maybe<ResolversTypes['ProductListingType']>, ParentType, ContextType>;
  shop?: Resolver<Maybe<ResolversTypes['Shop']>, ParentType, ContextType>;
  shopId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  smallBannerUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sortOrder?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ShopCategoryEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShopCategoryEntry'] = ResolversParentTypes['ShopCategoryEntry']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  enabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  private?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Offer']>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  productVersion?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  shopCategory?: Resolver<Maybe<ResolversTypes['ShopCategory']>, ParentType, ContextType>;
  shopCategoryId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sortOrder?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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
  requestedAmount?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type UpsertShopCategoriesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpsertShopCategoriesResult'] = ResolversParentTypes['UpsertShopCategoriesResult']> = ResolversObject<{
  inserted?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updated?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpsertShopCategoryEntriesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpsertShopCategoryEntriesResult'] = ResolversParentTypes['UpsertShopCategoryEntriesResult']> = ResolversObject<{
  inserted?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updated?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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

export type Resolvers<ContextType = any> = ResolversObject<{
  AcceptMembershipResult?: AcceptMembershipResultResolvers<ContextType>;
  AddMemberResult?: AddMemberResultResolvers<ContextType>;
  AggregatePayload?: AggregatePayloadResolvers<ContextType>;
  AnnouncePaymentResult?: AnnouncePaymentResultResolvers<ContextType>;
  AssetBalance?: AssetBalanceResolvers<ContextType>;
  Capability?: CapabilityResolvers<ContextType>;
  ChatMessage?: ChatMessageResolvers<ContextType>;
  City?: CityResolvers<ContextType>;
  ClaimInvitationResult?: ClaimInvitationResultResolvers<ContextType>;
  ClaimedInvitation?: ClaimedInvitationResolvers<ContextType>;
  CommonTrust?: CommonTrustResolvers<ContextType>;
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
  DeliveryMethod?: DeliveryMethodResolvers<ContextType>;
  Erc20Balances?: Erc20BalancesResolvers<ContextType>;
  Erc20Transfer?: Erc20TransferResolvers<ContextType>;
  Erc721Token?: Erc721TokenResolvers<ContextType>;
  Erc721Tokens?: Erc721TokensResolvers<ContextType>;
  EthTransfer?: EthTransferResolvers<ContextType>;
  EventPayload?: EventPayloadResolvers<ContextType>;
  ExchangeTokenResponse?: ExchangeTokenResponseResolvers<ContextType>;
  FibonacciGoals?: FibonacciGoalsResolvers<ContextType>;
  GnosisSafeEthTransfer?: GnosisSafeEthTransferResolvers<ContextType>;
  IAggregatePayload?: IAggregatePayloadResolvers<ContextType>;
  ICity?: ICityResolvers<ContextType>;
  IEventPayload?: IEventPayloadResolvers<ContextType>;
  InvitationCreated?: InvitationCreatedResolvers<ContextType>;
  InvitationRedeemed?: InvitationRedeemedResolvers<ContextType>;
  Invoice?: InvoiceResolvers<ContextType>;
  InvoiceLine?: InvoiceLineResolvers<ContextType>;
  LeaderboardEntry?: LeaderboardEntryResolvers<ContextType>;
  LogoutResponse?: LogoutResponseResolvers<ContextType>;
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
  NotificationEvent?: NotificationEventResolvers<ContextType>;
  Offer?: OfferResolvers<ContextType>;
  Offers?: OffersResolvers<ContextType>;
  Organisation?: OrganisationResolvers<ContextType>;
  OrganisationCreated?: OrganisationCreatedResolvers<ContextType>;
  PostAddress?: PostAddressResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  ProfileAggregate?: ProfileAggregateResolvers<ContextType>;
  ProfileBalances?: ProfileBalancesResolvers<ContextType>;
  ProfileEvent?: ProfileEventResolvers<ContextType>;
  ProfileOrOrganisation?: ProfileOrOrganisationResolvers<ContextType>;
  ProofPaymentResult?: ProofPaymentResultResolvers<ContextType>;
  ProofUniquenessResult?: ProofUniquenessResultResolvers<ContextType>;
  PublicEvent?: PublicEventResolvers<ContextType>;
  Purchase?: PurchaseResolvers<ContextType>;
  PurchaseLine?: PurchaseLineResolvers<ContextType>;
  Purchased?: PurchasedResolvers<ContextType>;
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
  Shop?: ShopResolvers<ContextType>;
  ShopCategory?: ShopCategoryResolvers<ContextType>;
  ShopCategoryEntry?: ShopCategoryEntryResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TagTransactionResult?: TagTransactionResultResolvers<ContextType>;
  TransitivePath?: TransitivePathResolvers<ContextType>;
  TransitiveTransfer?: TransitiveTransferResolvers<ContextType>;
  TrustRelation?: TrustRelationResolvers<ContextType>;
  UpdateSafeResponse?: UpdateSafeResponseResolvers<ContextType>;
  UpsertShopCategoriesResult?: UpsertShopCategoriesResultResolvers<ContextType>;
  UpsertShopCategoryEntriesResult?: UpsertShopCategoryEntriesResultResolvers<ContextType>;
  Verification?: VerificationResolvers<ContextType>;
  VerifySafeResult?: VerifySafeResultResolvers<ContextType>;
  Version?: VersionResolvers<ContextType>;
  WelcomeMessage?: WelcomeMessageResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  cost?: CostDirectiveResolver<any, any, ContextType>;
  costFactor?: CostFactorDirectiveResolver<any, any, ContextType>;
}>;
