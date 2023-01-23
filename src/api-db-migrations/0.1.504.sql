create sequence "Link_id_seq"
    as integer;



create type "ProfileType" as enum ('PERSON', 'ORGANISATION', 'REGION');



create type "ProductListingType" as enum ('TILES', 'LIST');



create type "ShopListingStyle" as enum ('REGULAR', 'FEATURED');



create type "Gender" as enum ('MALE', 'FEMALE', 'DIVERS');



-- Unknown how to generate base type type



-- Unknown how to generate base type type

comment on type geometry is 'postgis type: The type representing spatial features with planar coordinate systems.';



-- Unknown how to generate base type type

comment on type box3d is 'postgis type: The type representing a 3-dimensional bounding box.';



-- Unknown how to generate base type type

comment on type box2d is 'postgis type: The type representing a 2-dimensional bounding box.';



-- Unknown how to generate base type type



-- Unknown how to generate base type type



create type geometry_dump as
(
    path integer[],
    geom geometry
);

comment on type geometry_dump is 'postgis type: A composite type used to describe the parts of complex geometry.';



create type valid_detail as
(
    valid    boolean,
    reason   varchar,
    location geometry
);



-- Unknown how to generate base type type

comment on type geography is 'postgis type: The type representing spatial features with geodetic (ellipsoidal) coordinate systems.';



create table if not exists "ChatMessage"
(
    id          serial
        primary key,
    "createdAt" timestamp(3) not null,
    "from"      text         not null,
    "to"        text         not null,
    text        text         not null,
    "openedAt"  timestamp(3)
);



create index if not exists "ChatMessage_from_idx"
    on "ChatMessage" ("from");

create index if not exists "ChatMessage_to_idx"
    on "ChatMessage" ("to");

create index if not exists "ChatMessage_createdAt_idx"
    on "ChatMessage" ("createdAt");

create table if not exists "ExternalProfiles"
(
    "circlesAddress" text not null,
    name             text not null,
    "avatarUrl"      text
);



create unique index if not exists "ExternalProfiles_circlesAddress_key"
    on "ExternalProfiles" ("circlesAddress");

create table if not exists "TagType"
(
    id text not null
        primary key
);



create table if not exists "Transaction"
(
    "transactionHash" text not null
        primary key
);



create unique index if not exists "Transaction_transactionHash_key"
    on "Transaction" ("transactionHash");

create table if not exists "Job"
(
    id           serial
        primary key,
    hash         text                                   not null,
    "createdAt"  timestamp(3) default CURRENT_TIMESTAMP not null,
    topic        text                                   not null,
    payload      text                                   not null,
    "finishedAt" timestamp(3),
    error        text,
    warning      text,
    info         text,
    kind         text         default 'atMostOnce'::text,
    "timeoutAt"  timestamp(3)
);



create unique index if not exists "Job_hash_key"
    on "Job" (hash);

create index if not exists "Job_createdAt_idx"
    on "Job" ("createdAt");

create table if not exists "Jwks"
(
    id          serial
        primary key,
    "createdAt" timestamp(3) default CURRENT_TIMESTAMP not null,
    kid         text                                   not null,
    kty         text                                   not null,
    use         text                                   not null,
    alg         text                                   not null,
    e           text                                   not null,
    n           text                                   not null,
    d           text                                   not null,
    p           text                                   not null,
    q           text                                   not null,
    dp          text                                   not null,
    dq          text                                   not null,
    qi          text                                   not null
);



create index if not exists "Jwks_kid_idx"
    on "Jwks" (kid);

create table if not exists "HumanodeVerifications"
(
    "circlesAddress" text                                   not null
        primary key,
    "createdAt"      timestamp(3) default CURRENT_TIMESTAMP not null,
    sub              text                                   not null,
    token            text                                   not null
);



create unique index if not exists "HumanodeVerifications_sub_key"
    on "HumanodeVerifications" (sub);

create index if not exists "HumanodeVerifications_createdAt_idx"
    on "HumanodeVerifications" ("createdAt");

create table if not exists "DeliveryMethod"
(
    id   serial
        primary key,
    name text not null
);



create table if not exists "Agent"
(
    id                 serial
        primary key,
    topic              text                  not null,
    "ownerSafeAddress" text                  not null,
    "agentSafeAddress" text,
    "privateKey"       text                  not null,
    "contractAddress"  text,
    "contractAbi"      text,
    "contractMethod"   text,
    enabled            boolean default false not null
);



create table if not exists "i18nReleases"
(
    "releaseVersion" integer not null,
    lang             text    not null
);



create table if not exists i18n
(
    "createdAt"      timestamp(3) default CURRENT_TIMESTAMP not null,
    "createdBy"      text                                   not null,
    lang             text                                   not null,
    key              text                                   not null,
    version          integer                                not null,
    value            text                                   not null,
    "releaseVersion" integer,
    "needsUpdate"    boolean                                not null,
    foreign key ("releaseVersion", lang) references "i18nReleases" ("releaseVersion", lang)
        on update cascade on delete restrict
);



create unique index if not exists i18n_lang_key_version_key
    on i18n (lang, key, version);

create index if not exists idx_deinemudda
    on i18n ((key || lang));

create unique index if not exists "i18nReleases_releaseVersion_lang_key"
    on "i18nReleases" ("releaseVersion", lang);

create table if not exists "Businesses"
(
    id          serial
        primary key,
    name        text not null,
    description text not null,
    picture     text not null
);



create table if not exists "BusinessCategory"
(
    id   serial
        primary key,
    name text not null
);



create table if not exists "Profile"
(
    id                             serial
        primary key,
    "emailAddress"                 text,
    status                         text,
    "circlesAddress"               text,
    "circlesSafeOwner"             text,
    "circlesTokenAddress"          text,
    "firstName"                    text                                    not null,
    "lastName"                     text,
    "avatarUrl"                    text,
    "avatarCid"                    text,
    "avatarMimeType"               text,
    dream                          text,
    country                        text,
    newsletter                     boolean,
    "cityGeonameid"                integer,
    "verifySafeChallenge"          text,
    "newSafeAddress"               text,
    "lastUpdateAt"                 timestamp(3)  default now()             not null,
    "lastAcknowledged"             timestamp(3),
    "displayTimeCircles"           boolean       default true,
    type                           "ProfileType" default 'PERSON'::"ProfileType",
    "lastInvoiceNo"                integer,
    "lastRefundNo"                 integer,
    "displayCurrency"              text          default 'EURS'::text      not null,
    "invoiceNoPrefix"              text          default 'I-'::text,
    "refundNoPrefix"               text,
    "successorOfCirclesAddress"    text,
    "createdAt"                    timestamp(3)  default CURRENT_TIMESTAMP not null,
    "emailAddressVerified"         boolean,
    "verifyEmailChallenge"         text,
    "askedForEmailAddress"         boolean       default false             not null,
    "currentSimplePickupCodeRound" integer,
    "lastSimplePickupCode"         integer,
    "largeBannerUrl"               text,
    "smallBannerUrl"               text,
    "productListingType"           "ProductListingType",
    "inviteTriggerId"              integer
                                                                           references "Job"
                                                                               on update cascade on delete set null,
    "shopEnabled"                  boolean,
    "confirmedLegalAge"            integer,
    age                            integer,
    gender                         "Gender",
    location                       text,
    "businessCategoryId"           integer
                                                                           references "BusinessCategory"
                                                                               on update cascade on delete set null,
    "businessHoursFriday"          text,
    "businessHoursMonday"          text,
    "businessHoursSaturday"        text,
    "businessHoursSunday"          text,
    "businessHoursThursday"        text,
    "businessHoursTuesday"         text,
    "businessHoursWednesday"       text,
    "phoneNumber"                  text,
    lat                            double precision,
    lon                            double precision,
    "locationName"                 text,
    "canInvite"                    boolean       default false
);



create table if not exists "Invitation"
(
    id                    serial
        primary key,
    "createdByProfileId"  integer      not null
        references "Profile"
            on update cascade on delete restrict,
    "createdAt"           timestamp(3) not null,
    code                  text         not null,
    "claimedByProfileId"  integer
                                       references "Profile"
                                           on update cascade on delete set null,
    "claimedAt"           timestamp(3),
    "redeemedByProfileId" integer
                                       references "Profile"
                                           on update cascade on delete set null,
    "redeemedAt"          timestamp(3),
    key                   text         not null,
    address               text         not null,
    name                  text         not null,
    "redeemTxHash"        text,
    "fundedAt"            timestamp(3),
    "forSafeAddress"      text
);



create index if not exists "Invitation_code_idx"
    on "Invitation" (code);

create index if not exists "Invitation_createdAt_idx"
    on "Invitation" ("createdAt");

create index if not exists "Invitation_createdByProfileId_idx"
    on "Invitation" ("createdByProfileId");

create index if not exists "Invitation_claimedByProfileId_claimedAt_idx"
    on "Invitation" ("claimedByProfileId", "claimedAt");

create index if not exists "Invitation_redeemedByProfileId_redeemedAt_redeemTxHash_idx"
    on "Invitation" ("redeemedByProfileId", "redeemedAt", "redeemTxHash");

create table if not exists "InvitationFundsEOA"
(
    id           serial
        primary key,
    address      text    not null,
    "privateKey" text    not null,
    "profileId"  integer not null
        references "Profile"
            on update cascade on delete restrict
);



create unique index if not exists "InvitationFundsEOA_profileId_key"
    on "InvitationFundsEOA" ("profileId");

create index if not exists "InvitationFundsEOA_address_idx"
    on "InvitationFundsEOA" (address);

create table if not exists "Membership"
(
    id                   serial
        primary key,
    "createdAt"          timestamp(3) default CURRENT_TIMESTAMP not null,
    "memberAtId"         integer                                not null
        references "Profile"
            on update cascade on delete restrict,
    "isAdmin"            boolean,
    "acceptedAt"         timestamp(3),
    "createdByProfileId" integer                                not null
        references "Profile"
            on update cascade on delete restrict,
    "rejectedAt"         timestamp(3),
    "validTo"            timestamp(3),
    "memberAddress"      text                                   not null
);



create index if not exists "Membership_memberAddress_idx"
    on "Membership" ("memberAddress");

create index if not exists "Membership_createdAt_idx"
    on "Membership" ("createdAt");

create index if not exists "Membership_acceptedAt_idx"
    on "Membership" ("acceptedAt");

create index if not exists "Membership_rejectedAt_idx"
    on "Membership" ("rejectedAt");

create index if not exists "Membership_createdByProfileId_idx"
    on "Membership" ("createdByProfileId");

create index if not exists "Membership_memberAtId_idx"
    on "Membership" ("memberAtId");

create index if not exists "Profile_circlesAddress_idx"
    on "Profile" ("circlesAddress");

create index if not exists "Profile_createdAt_idx"
    on "Profile" ("createdAt");

create unique index if not exists "Profile_inviteTriggerId_key"
    on "Profile" ("inviteTriggerId");

create table if not exists "Session"
(
    "emailAddress"  text,
    "profileId"     integer
                                 references "Profile"
                                     on update cascade on delete set null,
    "issuedBy"      text         not null,
    jti             text,
    "createdAt"     timestamp(3) not null,
    "endedAt"       timestamp(3),
    "endReason"     text,
    "maxLifetime"   integer      not null,
    "challengeHash" text,
    "ethAddress"    text,
    signature       text,
    "validFrom"     timestamp(3),
    id              text         not null
        primary key,
    "sessionToken"  text         not null
);



create unique index if not exists "Session_sessionToken_key"
    on "Session" ("sessionToken");

create index if not exists "Session_createdAt_idx"
    on "Session" ("createdAt");

create index if not exists "Session_profileId_idx"
    on "Session" ("profileId");

create table if not exists "VerifiedSafe"
(
    "safeAddress"                  text                                   not null
        primary key,
    "createdAt"                    timestamp(3) default CURRENT_TIMESTAMP not null,
    "createdByProfileId"           integer                                not null
        references "Profile"
            on update cascade on delete restrict,
    "createdByOrganisationId"      integer                                not null
        references "Profile"
            on update cascade on delete restrict,
    "swapEoaAddress"               text                                   not null,
    "swapEoaKey"                   text                                   not null,
    "rewardProcessingStartedAt"    timestamp(3),
    "inviteeRewardTransactionHash" text
                                                                          references "Transaction"
                                                                              on update cascade on delete set null,
    "inviterRewardTransactionHash" text
                                                                          references "Transaction"
                                                                              on update cascade on delete set null,
    "swapFundingTransactionHash"   text
                                                                          references "Transaction"
                                                                              on update cascade on delete set null,
    "rewardProcessingWorker"       text,
    "revokedAt"                    timestamp(3),
    "revokedByProfileId"           integer
                                                                          references "Profile"
                                                                              on update cascade on delete set null,
    "inviteCount"                  integer      default 0                 not null
);



create unique index if not exists "VerifiedSafe_inviteeRewardTransactionHash_key"
    on "VerifiedSafe" ("inviteeRewardTransactionHash");

create unique index if not exists "VerifiedSafe_inviterRewardTransactionHash_key"
    on "VerifiedSafe" ("inviterRewardTransactionHash");

create unique index if not exists "VerifiedSafe_swapFundingTransactionHash_key"
    on "VerifiedSafe" ("swapFundingTransactionHash");

create index if not exists "VerifiedSafe_createdAt_idx"
    on "VerifiedSafe" ("createdAt");

create index if not exists "VerifiedSafe_createdByProfileId_idx"
    on "VerifiedSafe" ("createdByProfileId");

create index if not exists "VerifiedSafe_createdByOrganisationId_idx"
    on "VerifiedSafe" ("createdByOrganisationId");

create table if not exists "PostAddress"
(
    id                           serial
        primary key,
    name                         text,
    street                       text not null,
    house                        text not null,
    zip                          text not null,
    state                        text,
    "cityGeonameid"              integer,
    "shippingAddressOfProfileId" integer
                                      references "Profile"
                                          on update cascade on delete set null,
    city                         text,
    country                      text,
    "hereLocationId"             text,
    "osmId"                      text,
    "notificationEmail"          text
);



create table if not exists "Purchase"
(
    id                   serial
        primary key,
    "createdAt"          timestamp(3) not null,
    "createdByProfileId" integer      not null
        references "Profile"
            on update cascade on delete restrict,
    "deliveryMethodId"   integer      not null
        references "DeliveryMethod"
            on update cascade on delete restrict,
    "deliveryAddressId"  integer
                                      references "PostAddress"
                                          on update cascade on delete set null
);



create table if not exists "Invoice"
(
    id                              serial
        primary key,
    "customerProfileId"             integer      not null
        references "Profile"
            on update cascade on delete restrict,
    "sellerProfileId"               integer      not null
        references "Profile"
            on update cascade on delete restrict,
    "paymentTransactionHash"        text
                                                 references "Transaction"
                                                     on update cascade on delete set null,
    "purchaseId"                    integer      not null
        references "Purchase"
            on update cascade on delete restrict,
    "buyerSignature"                boolean,
    "buyerSignedDate"               timestamp(3),
    "pickupCode"                    text,
    "sellerSignature"               boolean,
    "sellerSignedDate"              timestamp(3),
    "invoiceNo"                     text         not null,
    "createdAt"                     timestamp(3) not null,
    "cancelReason"                  text,
    "cancelledAt"                   timestamp(3),
    "cancelledByProfileId"          integer
                                                 references "Profile"
                                                     on update cascade on delete set null,
    "pendingPaymentTransactionHash" text,
    "simplePickupCode"              text,
    "deliveryMethodId"              integer      not null
        references "DeliveryMethod"
            on update cascade on delete restrict,
    "deliveryAddressId"             integer
                                                 references "PostAddress"
                                                     on update cascade on delete set null
);



create unique index if not exists "Invoice_paymentTransactionHash_key"
    on "Invoice" ("paymentTransactionHash");

create index if not exists "Invoice_invoiceNo_idx"
    on "Invoice" ("invoiceNo");

create index if not exists "Invoice_pickupCode_idx"
    on "Invoice" ("pickupCode");

create index if not exists "Invoice_createdAt_idx"
    on "Invoice" ("createdAt");

create index if not exists "Invoice_customerProfileId_idx"
    on "Invoice" ("customerProfileId");

create index if not exists "Invoice_sellerProfileId_idx"
    on "Invoice" ("sellerProfileId");

create index if not exists "Invoice_purchaseId_idx"
    on "Invoice" ("purchaseId");

create index if not exists "Invoice_paymentTransactionHash_idx"
    on "Invoice" ("paymentTransactionHash");

create index if not exists "Invoice_cancelledByProfileId_idx"
    on "Invoice" ("cancelledByProfileId");

create index if not exists "Purchase_createdAt_idx"
    on "Purchase" ("createdAt");

create index if not exists "Purchase_createdByProfileId_idx"
    on "Purchase" ("createdByProfileId");

create table if not exists "Shop"
(
    id                             serial
        primary key,
    "createdAt"                    timestamp(3)         default CURRENT_TIMESTAMP             not null,
    enabled                        boolean              default false                         not null,
    private                        boolean,
    name                           text                                                       not null,
    description                    text                                                       not null,
    "largeBannerUrl"               text                                                       not null,
    "smallBannerUrl"               text                                                       not null,
    "shopListingStyle"             "ShopListingStyle"   default 'REGULAR'::"ShopListingStyle" not null,
    "sortOrder"                    integer,
    "productListingStyle"          "ProductListingType" default 'TILES'::"ProductListingType" not null,
    "ownerId"                      integer                                                    not null
        references "Profile"
            on update cascade on delete restrict,
    "pickupAddressId"              integer
                                                                                              references "PostAddress"
                                                                                                  on update cascade on delete set null,
    "openingHours"                 text,
    "currentSimplePickupCodeRound" integer,
    "lastSimplePickupCode"         integer,
    "purchaseMetaDataKeys"         text,
    "healthInfosLink"              text,
    "privacyPolicyLink"            text,
    "tosLink"                      text,
    "legalText"                    text                 default ''::text,
    "adultOnly"                    boolean
);



create unique index if not exists "Shop_pickupAddressId_key"
    on "Shop" ("pickupAddressId");

create table if not exists "ShopCategory"
(
    id                    serial
        primary key,
    "createdAt"           timestamp(3) default CURRENT_TIMESTAMP not null,
    enabled               boolean      default true              not null,
    private               boolean,
    name                  text                                   not null,
    description           text,
    "largeBannerUrl"      text,
    "smallBannerUrl"      text,
    "sortOrder"           integer,
    "productListingStyle" "ProductListingType",
    "shopId"              integer                                not null
        references "Shop"
            on update cascade on delete restrict
);



create table if not exists "ShopDeliveryMethod"
(
    id                 serial
        primary key,
    "shopId"           integer not null
        references "Shop"
            on update cascade on delete restrict,
    "deliveryMethodId" integer not null
        references "DeliveryMethod"
            on update cascade on delete restrict
);



create table if not exists "Event"
(
    id                    serial
        primary key,
    "beginAnnouncementAt" timestamp(3),
    begin                 timestamp(3) not null,
    "end"                 timestamp(3) not null,
    "locationId"          integer
                                       references "PostAddress"
                                           on update cascade on delete set null,
    "revealLocationAt"    timestamp(3),
    "shopId"              integer      not null
        references "Shop"
            on update cascade on delete restrict,
    "revealShopAt"        timestamp(3)
);



create table if not exists "Offer"
(
    "createdByProfileId"    integer      not null
        references "Profile"
            on update cascade on delete restrict,
    title                   text         not null,
    "pictureUrl"            text,
    "pictureMimeType"       text,
    description             text,
    "pricePerUnit"          text         not null,
    "createdAt"             timestamp(3) not null,
    version                 integer      not null,
    id                      serial,
    "timeCirclesPriceShare" integer      not null,
    allergens               text,
    "eventId"               integer
                                         references "Event"
                                             on update cascade on delete set null,
    "minAge"                integer,
    "currentInventory"      integer,
    primary key (id, version)
);



create table if not exists "InvoiceLine"
(
    id               serial
        primary key,
    "invoiceId"      integer not null
        references "Invoice"
            on update cascade on delete restrict,
    amount           integer not null,
    "productId"      integer not null,
    "productVersion" integer not null,
    metadata         text,
    "shopId"         integer
                             references "Shop"
                                 on update cascade on delete set null,
    foreign key ("productId", "productVersion") references "Offer"
        on update cascade on delete restrict
);



create index if not exists "InvoiceLine_invoiceId_idx"
    on "InvoiceLine" ("invoiceId");

create index if not exists "InvoiceLine_productId_productVersion_idx"
    on "InvoiceLine" ("productId", "productVersion");

create index if not exists "Offer_createdAt_idx"
    on "Offer" ("createdAt");

create index if not exists "Offer_createdByProfileId_idx"
    on "Offer" ("createdByProfileId");

create table if not exists "PurchaseLine"
(
    id               serial
        primary key,
    "purchaseId"     integer not null
        references "Purchase"
            on update cascade on delete restrict,
    amount           integer not null,
    "productId"      integer not null,
    "productVersion" integer not null,
    metadata         text,
    "shopId"         integer
                             references "Shop"
                                 on update cascade on delete set null,
    foreign key ("productId", "productVersion") references "Offer"
        on update cascade on delete restrict
);



create index if not exists "PurchaseLine_purchaseId_idx"
    on "PurchaseLine" ("purchaseId");

create index if not exists "PurchaseLine_productId_productVersion_idx"
    on "PurchaseLine" ("productId", "productVersion");

create table if not exists "Tag"
(
    id                   serial
        primary key,
    "createdAt"          timestamp(3) not null,
    "createdByProfileId" integer      not null
        references "Profile"
            on update cascade on delete restrict,
    "isPrivate"          boolean      not null,
    "typeId"             text         not null
        references "TagType"
            on update cascade on delete restrict,
    value                text,
    "transactionHash"    text
                                      references "Transaction"
                                          on update cascade on delete set null,
    "offerId"            integer,
    "offerVersion"       integer,
    "chatMessageId"      integer
                                      references "ChatMessage"
                                          on update cascade on delete set null,
    "order"              integer,
    foreign key ("offerId", "offerVersion") references "Offer"
        on update cascade on delete set null
);



create index if not exists "Tag_createdAt_idx"
    on "Tag" ("createdAt");

create index if not exists "Tag_createdByProfileId_idx"
    on "Tag" ("createdByProfileId");

create index if not exists "Tag_transactionHash_idx"
    on "Tag" ("transactionHash");

create index if not exists "Tag_typeId_idx"
    on "Tag" ("typeId");

create index if not exists "Tag_offerId_offerVersion_idx"
    on "Tag" ("offerId", "offerVersion");

create index if not exists "Tag_chatMessageId_idx"
    on "Tag" ("chatMessageId");

create index if not exists "Tag_offerId_idx"
    on "Tag" ("offerId");

create table if not exists "ShopCategoryEntry"
(
    id               serial
        primary key,
    "createdAt"      timestamp(3) default CURRENT_TIMESTAMP not null,
    enabled          boolean      default true              not null,
    private          boolean,
    "productId"      integer                                not null,
    "productVersion" integer                                not null,
    "sortOrder"      integer,
    "shopCategoryId" integer                                not null
        references "ShopCategory"
            on update cascade on delete restrict,
    foreign key ("productId", "productVersion") references "Offer"
        on update cascade on delete restrict
);



create index if not exists "ShopCategoryEntry_productId_productVersion_idx"
    on "ShopCategoryEntry" ("productId", "productVersion");

create unique index if not exists "Event_shopId_key"
    on "Event" ("shopId");

create table if not exists "Favorites"
(
    id                        serial
        primary key,
    "createdAt"               timestamp(3) default CURRENT_TIMESTAMP not null,
    "createdByCirclesAddress" text                                   not null,
    "favoriteCirclesAddress"  text                                   not null,
    comment                   text
);



create index if not exists "Favorites_createdAt_idx"
    on "Favorites" ("createdAt");

create index if not exists "Favorites_createdByCirclesAddress_idx"
    on "Favorites" ("createdByCirclesAddress");

create index if not exists "Favorites_favoriteCirclesAddress_idx"
    on "Favorites" ("favoriteCirclesAddress");

create table if not exists "UnreadEvent"
(
    id               serial
        primary key,
    type             text         not null,
    contact_address  text         not null,
    direction        text         not null,
    safe_address     text         not null,
    transaction_hash text,
    "readAt"         timestamp(3),
    timestamp        timestamp(3) not null
);



create table if not exists "Link"
(
    id                        text not null
        primary key,
    "createdAt"               text not null,
    "createdByCirclesAddress" text not null,
    "linkTargetType"          text not null,
    "linkTargetKeyField"      text not null,
    "linkTargetKey"           text not null
);



alter sequence "Link_id_seq" owned by "Link".id;

create table if not exists spatial_ref_sys
(
    srid      integer not null
        primary key
        constraint spatial_ref_sys_srid_check
            check ((srid > 0) AND (srid <= 998999)),
    auth_name varchar(256),
    auth_srid integer,
    srtext    varchar(2048),
    proj4text varchar(2048)
);



grant select on spatial_ref_sys to public;

grant delete, insert, update on spatial_ref_sys to doadmin with grant option;

create table if not exists "SurveyData"
(
    id                 serial
        primary key,
    "sesssionId"       text         not null,
    "allConsentsGiven" boolean      not null,
    "userType"         text         not null,
    gender             text         not null,
    "dateOfBirth"      timestamp(3) not null
);



create or replace view "latestVersions"(lang, key, "latestVersion", "needsUpdate") as
SELECT i18n.lang,
    i18n.key,
    max(i18n.version) AS "latestVersion",
    i18n."needsUpdate"
   FROM i18n
  GROUP BY i18n.key, i18n.lang, i18n."needsUpdate"
  ORDER BY i18n.key;



create or replace view "latestValues"(lang, key, version, value, "needsUpdate") as
SELECT l.lang,
    l.key,
    l."latestVersion" AS version,
    i.value,
    l."needsUpdate"
   FROM "latestVersions" l
     JOIN i18n i ON i.lang = l.lang AND i.key = l.key AND i.version = l."latestVersion"
  ORDER BY l.key;
