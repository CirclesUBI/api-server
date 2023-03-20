-- migrate:up

--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12
-- Dumped by pg_dump version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


CREATE TABLE IF NOT EXISTS db_version (
    version text NOT NULL,
    comment text
);


--
-- Name: Gender; Type: TYPE; Schema: public; Owner: doadmin
--

CREATE TYPE public."Gender" AS ENUM (
    'MALE',
    'FEMALE',
    'DIVERS'
);




--
-- Name: ProductListingType; Type: TYPE; Schema: public; Owner: doadmin
--

CREATE TYPE public."ProductListingType" AS ENUM (
    'TILES',
    'LIST'
);




--
-- Name: ProfileType; Type: TYPE; Schema: public; Owner: doadmin
--

CREATE TYPE public."ProfileType" AS ENUM (
    'PERSON',
    'ORGANISATION',
    'REGION'
);




--
-- Name: ShopListingStyle; Type: TYPE; Schema: public; Owner: doadmin
--

CREATE TYPE public."ShopListingStyle" AS ENUM (
    'REGULAR',
    'FEATURED'
);




--
-- Name: publish_event(text, text); Type: PROCEDURE; Schema: public; Owner: doadmin
--

CREATE PROCEDURE public.publish_event(topic text, message text)
    LANGUAGE plpgsql
    AS $$
begin
    perform pg_notify(topic, message::text);
end
$$;




--
-- Name: write_job_history(); Type: FUNCTION; Schema: public; Owner: doadmin
--

CREATE FUNCTION public.write_job_history() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO "Job_History"
        SELECT OLD.*;

    RETURN OLD;
END;
$$;




SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Agent; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."Agent" (
    id integer NOT NULL,
    topic text NOT NULL,
    "ownerSafeAddress" text NOT NULL,
    "agentSafeAddress" text,
    "privateKey" text NOT NULL,
    "contractAddress" text,
    "contractAbi" text,
    "contractMethod" text,
    enabled boolean DEFAULT false NOT NULL
);




--
-- Name: Agent_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."Agent_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: Agent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."Agent_id_seq" OWNED BY public."Agent".id;


--
-- Name: BusinessCategory; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."BusinessCategory" (
    id integer NOT NULL,
    name text NOT NULL
);




--
-- Name: BusinessCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."BusinessCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: BusinessCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."BusinessCategory_id_seq" OWNED BY public."BusinessCategory".id;


--
-- Name: Businesses; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."Businesses" (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    picture text NOT NULL
);




--
-- Name: Businesses_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."Businesses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: Businesses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."Businesses_id_seq" OWNED BY public."Businesses".id;


--
-- Name: ChatMessage; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."ChatMessage" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL,
    "from" text NOT NULL,
    "to" text NOT NULL,
    text text NOT NULL,
    "openedAt" timestamp(3) without time zone
);




--
-- Name: ChatMessage_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."ChatMessage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: ChatMessage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."ChatMessage_id_seq" OWNED BY public."ChatMessage".id;


--
-- Name: DeliveryMethod; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."DeliveryMethod" (
    id integer NOT NULL,
    name text NOT NULL
);




--
-- Name: DeliveryMethod_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."DeliveryMethod_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: DeliveryMethod_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."DeliveryMethod_id_seq" OWNED BY public."DeliveryMethod".id;


--
-- Name: Event; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."Event" (
    id integer NOT NULL,
    "beginAnnouncementAt" timestamp(3) without time zone,
    begin timestamp(3) without time zone NOT NULL,
    "end" timestamp(3) without time zone NOT NULL,
    "locationId" integer,
    "revealLocationAt" timestamp(3) without time zone,
    "shopId" integer NOT NULL,
    "revealShopAt" timestamp(3) without time zone
);




--
-- Name: Event_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."Event_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: Event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."Event_id_seq" OWNED BY public."Event".id;


--
-- Name: ExternalProfiles; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."ExternalProfiles" (
    "circlesAddress" text NOT NULL,
    name text NOT NULL,
    "avatarUrl" text
);




--
-- Name: Favorites; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."Favorites" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdByCirclesAddress" text NOT NULL,
    "favoriteCirclesAddress" text NOT NULL,
    comment text
);




--
-- Name: Favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."Favorites_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: Favorites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."Favorites_id_seq" OWNED BY public."Favorites".id;


--
-- Name: HumanodeVerifications; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."HumanodeVerifications" (
    "circlesAddress" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    sub text NOT NULL,
    token text NOT NULL
);




--
-- Name: Invitation; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."Invitation" (
    id integer NOT NULL,
    "createdByProfileId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL,
    code text NOT NULL,
    "claimedByProfileId" integer,
    "claimedAt" timestamp(3) without time zone,
    "redeemedByProfileId" integer,
    "redeemedAt" timestamp(3) without time zone,
    key text NOT NULL,
    address text NOT NULL,
    name text NOT NULL,
    "redeemTxHash" text,
    "fundedAt" timestamp(3) without time zone,
    "forSafeAddress" text
);




--
-- Name: InvitationFundsEOA; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."InvitationFundsEOA" (
    id integer NOT NULL,
    address text NOT NULL,
    "privateKey" text NOT NULL,
    "profileId" integer NOT NULL
);




--
-- Name: InvitationFundsEOA_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."InvitationFundsEOA_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: InvitationFundsEOA_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."InvitationFundsEOA_id_seq" OWNED BY public."InvitationFundsEOA".id;


--
-- Name: Invitation_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."Invitation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: Invitation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."Invitation_id_seq" OWNED BY public."Invitation".id;


--
-- Name: Invoice; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."Invoice" (
    id integer NOT NULL,
    "customerProfileId" integer NOT NULL,
    "sellerProfileId" integer NOT NULL,
    "paymentTransactionHash" text,
    "purchaseId" integer NOT NULL,
    "buyerSignature" boolean,
    "buyerSignedDate" timestamp(3) without time zone,
    "pickupCode" text,
    "sellerSignature" boolean,
    "sellerSignedDate" timestamp(3) without time zone,
    "invoiceNo" text NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL,
    "cancelReason" text,
    "cancelledAt" timestamp(3) without time zone,
    "cancelledByProfileId" integer,
    "pendingPaymentTransactionHash" text,
    "simplePickupCode" text,
    "deliveryMethodId" integer NOT NULL,
    "deliveryAddressId" integer
);




--
-- Name: InvoiceLine; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."InvoiceLine" (
    id integer NOT NULL,
    "invoiceId" integer NOT NULL,
    amount integer NOT NULL,
    "productId" integer NOT NULL,
    "productVersion" integer NOT NULL,
    metadata text,
    "shopId" integer
);




--
-- Name: InvoiceLine_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."InvoiceLine_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: InvoiceLine_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."InvoiceLine_id_seq" OWNED BY public."InvoiceLine".id;


--
-- Name: Invoice_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."Invoice_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: Invoice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."Invoice_id_seq" OWNED BY public."Invoice".id;


--
-- Name: Job; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."Job" (
    id integer NOT NULL,
    hash text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    topic text NOT NULL,
    payload text NOT NULL,
    "finishedAt" timestamp(3) without time zone,
    error text,
    warning text,
    info text,
    kind text DEFAULT 'atMostOnce'::text,
    "timeoutAt" timestamp(3) without time zone
);




--
-- Name: Job_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."Job_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: Job_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."Job_id_seq" OWNED BY public."Job".id;


--
-- Name: Jwks; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."Jwks" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    kid text NOT NULL,
    kty text NOT NULL,
    use text NOT NULL,
    alg text NOT NULL,
    e text NOT NULL,
    n text NOT NULL,
    d text NOT NULL,
    p text NOT NULL,
    q text NOT NULL,
    dp text NOT NULL,
    dq text NOT NULL,
    qi text NOT NULL
);




--
-- Name: Jwks_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."Jwks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: Jwks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."Jwks_id_seq" OWNED BY public."Jwks".id;


--
-- Name: Link; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."Link" (
    id text NOT NULL,
    "createdAt" text NOT NULL,
    "createdByCirclesAddress" text NOT NULL,
    "linkTargetType" text NOT NULL,
    "linkTargetKeyField" text NOT NULL,
    "linkTargetKey" text NOT NULL
);




--
-- Name: Link_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."Link_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: Link_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."Link_id_seq" OWNED BY public."Link".id;


--
-- Name: Membership; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."Membership" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "memberAtId" integer NOT NULL,
    "isAdmin" boolean,
    "acceptedAt" timestamp(3) without time zone,
    "createdByProfileId" integer NOT NULL,
    "rejectedAt" timestamp(3) without time zone,
    "validTo" timestamp(3) without time zone,
    "memberAddress" text NOT NULL
);




--
-- Name: Membership_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."Membership_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: Membership_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."Membership_id_seq" OWNED BY public."Membership".id;


--
-- Name: Offer; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."Offer" (
    "createdByProfileId" integer NOT NULL,
    title text NOT NULL,
    "pictureUrl" text,
    "pictureMimeType" text,
    description text,
    "pricePerUnit" text NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL,
    version integer NOT NULL,
    id integer NOT NULL,
    "timeCirclesPriceShare" integer NOT NULL,
    allergens text,
    "eventId" integer,
    "minAge" integer,
    "currentInventory" integer
);




--
-- Name: Offer_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."Offer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: Offer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."Offer_id_seq" OWNED BY public."Offer".id;


--
-- Name: PostAddress; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."PostAddress" (
    id integer NOT NULL,
    name text,
    street text NOT NULL,
    house text NOT NULL,
    zip text NOT NULL,
    state text,
    "cityGeonameid" integer,
    "shippingAddressOfProfileId" integer,
    city text,
    country text,
    "hereLocationId" text,
    "osmId" text,
    "notificationEmail" text
);




--
-- Name: PostAddress_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."PostAddress_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: PostAddress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."PostAddress_id_seq" OWNED BY public."PostAddress".id;


--
-- Name: Profile; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."Profile" (
    id integer NOT NULL,
    "emailAddress" text,
    status text,
    "circlesAddress" text,
    "circlesSafeOwner" text,
    "circlesTokenAddress" text,
    "firstName" text NOT NULL,
    "lastName" text,
    "avatarUrl" text,
    "avatarCid" text,
    "avatarMimeType" text,
    dream text,
    country text,
    newsletter boolean,
    "cityGeonameid" integer,
    "verifySafeChallenge" text,
    "newSafeAddress" text,
    "lastUpdateAt" timestamp(3) without time zone DEFAULT now() NOT NULL,
    "lastAcknowledged" timestamp(3) without time zone,
    "displayTimeCircles" boolean DEFAULT true,
    type public."ProfileType" DEFAULT 'PERSON'::public."ProfileType",
    "lastInvoiceNo" integer,
    "lastRefundNo" integer,
    "displayCurrency" text DEFAULT 'EURS'::text NOT NULL,
    "invoiceNoPrefix" text DEFAULT 'I-'::text,
    "refundNoPrefix" text,
    "successorOfCirclesAddress" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "emailAddressVerified" boolean,
    "verifyEmailChallenge" text,
    "askedForEmailAddress" boolean DEFAULT false NOT NULL,
    "currentSimplePickupCodeRound" integer,
    "lastSimplePickupCode" integer,
    "largeBannerUrl" text,
    "smallBannerUrl" text,
    "productListingType" public."ProductListingType",
    "inviteTriggerId" integer,
    "shopEnabled" boolean,
    "confirmedLegalAge" integer,
    age integer,
    gender public."Gender",
    location text,
    "businessCategoryId" integer,
    "businessHoursFriday" text,
    "businessHoursMonday" text,
    "businessHoursSaturday" text,
    "businessHoursSunday" text,
    "businessHoursThursday" text,
    "businessHoursTuesday" text,
    "businessHoursWednesday" text,
    "phoneNumber" text,
    lat double precision,
    lon double precision,
    "locationName" text,
    "canInvite" boolean DEFAULT false
);




--
-- Name: Profile_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."Profile_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: Profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."Profile_id_seq" OWNED BY public."Profile".id;


--
-- Name: Purchase; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."Purchase" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL,
    "createdByProfileId" integer NOT NULL,
    "deliveryMethodId" integer NOT NULL,
    "deliveryAddressId" integer
);




--
-- Name: PurchaseLine; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."PurchaseLine" (
    id integer NOT NULL,
    "purchaseId" integer NOT NULL,
    amount integer NOT NULL,
    "productId" integer NOT NULL,
    "productVersion" integer NOT NULL,
    metadata text,
    "shopId" integer
);




--
-- Name: PurchaseLine_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."PurchaseLine_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: PurchaseLine_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."PurchaseLine_id_seq" OWNED BY public."PurchaseLine".id;


--
-- Name: Purchase_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."Purchase_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: Purchase_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."Purchase_id_seq" OWNED BY public."Purchase".id;


--
-- Name: Session; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."Session" (
    "emailAddress" text,
    "profileId" integer,
    "issuedBy" text NOT NULL,
    jti text,
    "createdAt" timestamp(3) without time zone NOT NULL,
    "endedAt" timestamp(3) without time zone,
    "endReason" text,
    "maxLifetime" integer NOT NULL,
    "challengeHash" text,
    "ethAddress" text,
    signature text,
    "validFrom" timestamp(3) without time zone,
    id text NOT NULL,
    "sessionToken" text NOT NULL
);




--
-- Name: Shop; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."Shop" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    enabled boolean DEFAULT false NOT NULL,
    private boolean,
    name text NOT NULL,
    description text NOT NULL,
    "largeBannerUrl" text NOT NULL,
    "smallBannerUrl" text NOT NULL,
    "shopListingStyle" public."ShopListingStyle" DEFAULT 'REGULAR'::public."ShopListingStyle" NOT NULL,
    "sortOrder" integer,
    "productListingStyle" public."ProductListingType" DEFAULT 'TILES'::public."ProductListingType" NOT NULL,
    "ownerId" integer NOT NULL,
    "pickupAddressId" integer,
    "openingHours" text,
    "currentSimplePickupCodeRound" integer,
    "lastSimplePickupCode" integer,
    "purchaseMetaDataKeys" text,
    "healthInfosLink" text,
    "privacyPolicyLink" text,
    "tosLink" text,
    "legalText" text DEFAULT ''::text,
    "adultOnly" boolean
);




--
-- Name: ShopCategory; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."ShopCategory" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    private boolean,
    name text NOT NULL,
    description text,
    "largeBannerUrl" text,
    "smallBannerUrl" text,
    "sortOrder" integer,
    "productListingStyle" public."ProductListingType",
    "shopId" integer NOT NULL
);




--
-- Name: ShopCategoryEntry; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."ShopCategoryEntry" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    private boolean,
    "productId" integer NOT NULL,
    "productVersion" integer NOT NULL,
    "sortOrder" integer,
    "shopCategoryId" integer NOT NULL
);




--
-- Name: ShopCategoryEntry_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."ShopCategoryEntry_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: ShopCategoryEntry_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."ShopCategoryEntry_id_seq" OWNED BY public."ShopCategoryEntry".id;


--
-- Name: ShopCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."ShopCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: ShopCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."ShopCategory_id_seq" OWNED BY public."ShopCategory".id;


--
-- Name: ShopDeliveryMethod; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."ShopDeliveryMethod" (
    id integer NOT NULL,
    "shopId" integer NOT NULL,
    "deliveryMethodId" integer NOT NULL
);




--
-- Name: ShopDeliveryMethod_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."ShopDeliveryMethod_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: ShopDeliveryMethod_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."ShopDeliveryMethod_id_seq" OWNED BY public."ShopDeliveryMethod".id;


--
-- Name: Shop_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."Shop_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: Shop_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."Shop_id_seq" OWNED BY public."Shop".id;


--
-- Name: SurveyData; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."SurveyData" (
    id integer NOT NULL,
    "sesssionId" text NOT NULL,
    "allConsentsGiven" boolean NOT NULL,
    "userType" text NOT NULL,
    gender text NOT NULL,
    "dateOfBirth" timestamp(3) without time zone NOT NULL
);




--
-- Name: SurveyData_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."SurveyData_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: SurveyData_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."SurveyData_id_seq" OWNED BY public."SurveyData".id;


--
-- Name: Tag; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."Tag" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL,
    "createdByProfileId" integer NOT NULL,
    "isPrivate" boolean NOT NULL,
    "typeId" text NOT NULL,
    value text,
    "transactionHash" text,
    "offerId" integer,
    "offerVersion" integer,
    "chatMessageId" integer,
    "order" integer
);




--
-- Name: TagType; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."TagType" (
    id text NOT NULL
);




--
-- Name: Tag_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."Tag_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: Tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."Tag_id_seq" OWNED BY public."Tag".id;


--
-- Name: Transaction; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."Transaction" (
    "transactionHash" text NOT NULL
);




--
-- Name: UnreadEvent; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."UnreadEvent" (
    id integer NOT NULL,
    type text NOT NULL,
    contact_address text NOT NULL,
    direction text NOT NULL,
    safe_address text NOT NULL,
    transaction_hash text,
    "readAt" timestamp(3) without time zone,
    "timestamp" timestamp(3) without time zone NOT NULL
);




--
-- Name: UnreadEvent_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public."UnreadEvent_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: UnreadEvent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public."UnreadEvent_id_seq" OWNED BY public."UnreadEvent".id;


--
-- Name: VerifiedSafe; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."VerifiedSafe" (
    "safeAddress" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdByProfileId" integer NOT NULL,
    "createdByOrganisationId" integer NOT NULL,
    "swapEoaAddress" text NOT NULL,
    "swapEoaKey" text NOT NULL,
    "rewardProcessingStartedAt" timestamp(3) without time zone,
    "inviteeRewardTransactionHash" text,
    "inviterRewardTransactionHash" text,
    "swapFundingTransactionHash" text,
    "rewardProcessingWorker" text,
    "revokedAt" timestamp(3) without time zone,
    "revokedByProfileId" integer,
    "inviteCount" integer DEFAULT 0 NOT NULL
);




--
-- Name: i18n; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public.i18n (
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" text NOT NULL,
    lang text NOT NULL,
    key text NOT NULL,
    version integer NOT NULL,
    value text NOT NULL,
    "releaseVersion" integer,
    "needsUpdate" boolean NOT NULL
);




--
-- Name: i18nReleases; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public."i18nReleases" (
    "releaseVersion" integer NOT NULL,
    lang text NOT NULL
);




--
-- Name: latestVersions; Type: VIEW; Schema: public; Owner: doadmin
--

CREATE VIEW public."latestVersions" AS
 SELECT i18n.lang,
    i18n.key,
    max(i18n.version) AS "latestVersion",
    i18n."needsUpdate"
   FROM public.i18n
  GROUP BY i18n.key, i18n.lang, i18n."needsUpdate"
  ORDER BY i18n.key;




--
-- Name: latestValues; Type: VIEW; Schema: public; Owner: doadmin
--

CREATE VIEW public."latestValues" AS
 SELECT l.lang,
    l.key,
    l."latestVersion" AS version,
    i.value,
    l."needsUpdate"
   FROM (public."latestVersions" l
     JOIN public.i18n i ON (((i.lang = l.lang) AND (i.key = l.key) AND (i.version = l."latestVersion"))))
  ORDER BY l.key;




--
-- Name: Agent id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Agent" ALTER COLUMN id SET DEFAULT nextval('public."Agent_id_seq"'::regclass);


--
-- Name: BusinessCategory id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."BusinessCategory" ALTER COLUMN id SET DEFAULT nextval('public."BusinessCategory_id_seq"'::regclass);


--
-- Name: Businesses id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Businesses" ALTER COLUMN id SET DEFAULT nextval('public."Businesses_id_seq"'::regclass);


--
-- Name: ChatMessage id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."ChatMessage" ALTER COLUMN id SET DEFAULT nextval('public."ChatMessage_id_seq"'::regclass);


--
-- Name: DeliveryMethod id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."DeliveryMethod" ALTER COLUMN id SET DEFAULT nextval('public."DeliveryMethod_id_seq"'::regclass);


--
-- Name: Event id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Event" ALTER COLUMN id SET DEFAULT nextval('public."Event_id_seq"'::regclass);


--
-- Name: Favorites id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Favorites" ALTER COLUMN id SET DEFAULT nextval('public."Favorites_id_seq"'::regclass);


--
-- Name: Invitation id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Invitation" ALTER COLUMN id SET DEFAULT nextval('public."Invitation_id_seq"'::regclass);


--
-- Name: InvitationFundsEOA id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."InvitationFundsEOA" ALTER COLUMN id SET DEFAULT nextval('public."InvitationFundsEOA_id_seq"'::regclass);


--
-- Name: Invoice id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Invoice" ALTER COLUMN id SET DEFAULT nextval('public."Invoice_id_seq"'::regclass);


--
-- Name: InvoiceLine id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."InvoiceLine" ALTER COLUMN id SET DEFAULT nextval('public."InvoiceLine_id_seq"'::regclass);


--
-- Name: Job id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Job" ALTER COLUMN id SET DEFAULT nextval('public."Job_id_seq"'::regclass);


--
-- Name: Jwks id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Jwks" ALTER COLUMN id SET DEFAULT nextval('public."Jwks_id_seq"'::regclass);


--
-- Name: Membership id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Membership" ALTER COLUMN id SET DEFAULT nextval('public."Membership_id_seq"'::regclass);


--
-- Name: Offer id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Offer" ALTER COLUMN id SET DEFAULT nextval('public."Offer_id_seq"'::regclass);


--
-- Name: PostAddress id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."PostAddress" ALTER COLUMN id SET DEFAULT nextval('public."PostAddress_id_seq"'::regclass);


--
-- Name: Profile id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Profile" ALTER COLUMN id SET DEFAULT nextval('public."Profile_id_seq"'::regclass);


--
-- Name: Purchase id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Purchase" ALTER COLUMN id SET DEFAULT nextval('public."Purchase_id_seq"'::regclass);


--
-- Name: PurchaseLine id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."PurchaseLine" ALTER COLUMN id SET DEFAULT nextval('public."PurchaseLine_id_seq"'::regclass);


--
-- Name: Shop id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Shop" ALTER COLUMN id SET DEFAULT nextval('public."Shop_id_seq"'::regclass);


--
-- Name: ShopCategory id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."ShopCategory" ALTER COLUMN id SET DEFAULT nextval('public."ShopCategory_id_seq"'::regclass);


--
-- Name: ShopCategoryEntry id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."ShopCategoryEntry" ALTER COLUMN id SET DEFAULT nextval('public."ShopCategoryEntry_id_seq"'::regclass);


--
-- Name: ShopDeliveryMethod id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."ShopDeliveryMethod" ALTER COLUMN id SET DEFAULT nextval('public."ShopDeliveryMethod_id_seq"'::regclass);


--
-- Name: SurveyData id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."SurveyData" ALTER COLUMN id SET DEFAULT nextval('public."SurveyData_id_seq"'::regclass);


--
-- Name: Tag id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Tag" ALTER COLUMN id SET DEFAULT nextval('public."Tag_id_seq"'::regclass);


--
-- Name: UnreadEvent id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."UnreadEvent" ALTER COLUMN id SET DEFAULT nextval('public."UnreadEvent_id_seq"'::regclass);


--
-- Name: Agent Agent_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Agent"
    ADD CONSTRAINT "Agent_pkey" PRIMARY KEY (id);


--
-- Name: BusinessCategory BusinessCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."BusinessCategory"
    ADD CONSTRAINT "BusinessCategory_pkey" PRIMARY KEY (id);


--
-- Name: Businesses Businesses_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Businesses"
    ADD CONSTRAINT "Businesses_pkey" PRIMARY KEY (id);


--
-- Name: ChatMessage ChatMessage_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."ChatMessage"
    ADD CONSTRAINT "ChatMessage_pkey" PRIMARY KEY (id);


--
-- Name: DeliveryMethod DeliveryMethod_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."DeliveryMethod"
    ADD CONSTRAINT "DeliveryMethod_pkey" PRIMARY KEY (id);


--
-- Name: Event Event_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY (id);


--
-- Name: Favorites Favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Favorites"
    ADD CONSTRAINT "Favorites_pkey" PRIMARY KEY (id);


--
-- Name: HumanodeVerifications HumanodeVerifications_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."HumanodeVerifications"
    ADD CONSTRAINT "HumanodeVerifications_pkey" PRIMARY KEY ("circlesAddress");


--
-- Name: InvitationFundsEOA InvitationFundsEOA_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."InvitationFundsEOA"
    ADD CONSTRAINT "InvitationFundsEOA_pkey" PRIMARY KEY (id);


--
-- Name: Invitation Invitation_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Invitation"
    ADD CONSTRAINT "Invitation_pkey" PRIMARY KEY (id);


--
-- Name: InvoiceLine InvoiceLine_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."InvoiceLine"
    ADD CONSTRAINT "InvoiceLine_pkey" PRIMARY KEY (id);


--
-- Name: Invoice Invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY (id);


--
-- Name: Job Job_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Job"
    ADD CONSTRAINT "Job_pkey" PRIMARY KEY (id);


--
-- Name: Jwks Jwks_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Jwks"
    ADD CONSTRAINT "Jwks_pkey" PRIMARY KEY (id);


--
-- Name: Link Link_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Link"
    ADD CONSTRAINT "Link_pkey" PRIMARY KEY (id);


--
-- Name: Membership Membership_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Membership"
    ADD CONSTRAINT "Membership_pkey" PRIMARY KEY (id);


--
-- Name: Offer Offer_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Offer"
    ADD CONSTRAINT "Offer_pkey" PRIMARY KEY (id, version);


--
-- Name: PostAddress PostAddress_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."PostAddress"
    ADD CONSTRAINT "PostAddress_pkey" PRIMARY KEY (id);


--
-- Name: Profile Profile_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_pkey" PRIMARY KEY (id);


--
-- Name: PurchaseLine PurchaseLine_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."PurchaseLine"
    ADD CONSTRAINT "PurchaseLine_pkey" PRIMARY KEY (id);


--
-- Name: Purchase Purchase_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Purchase"
    ADD CONSTRAINT "Purchase_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: ShopCategoryEntry ShopCategoryEntry_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."ShopCategoryEntry"
    ADD CONSTRAINT "ShopCategoryEntry_pkey" PRIMARY KEY (id);


--
-- Name: ShopCategory ShopCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."ShopCategory"
    ADD CONSTRAINT "ShopCategory_pkey" PRIMARY KEY (id);


--
-- Name: ShopDeliveryMethod ShopDeliveryMethod_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."ShopDeliveryMethod"
    ADD CONSTRAINT "ShopDeliveryMethod_pkey" PRIMARY KEY (id);


--
-- Name: Shop Shop_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Shop"
    ADD CONSTRAINT "Shop_pkey" PRIMARY KEY (id);


--
-- Name: SurveyData SurveyData_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."SurveyData"
    ADD CONSTRAINT "SurveyData_pkey" PRIMARY KEY (id);


--
-- Name: TagType TagType_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."TagType"
    ADD CONSTRAINT "TagType_pkey" PRIMARY KEY (id);


--
-- Name: Tag Tag_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY (id);


--
-- Name: Transaction Transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionHash");


--
-- Name: UnreadEvent UnreadEvent_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."UnreadEvent"
    ADD CONSTRAINT "UnreadEvent_pkey" PRIMARY KEY (id);


--
-- Name: VerifiedSafe VerifiedSafe_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."VerifiedSafe"
    ADD CONSTRAINT "VerifiedSafe_pkey" PRIMARY KEY ("safeAddress");


--
-- Name: ChatMessage_createdAt_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "ChatMessage_createdAt_idx" ON public."ChatMessage" USING btree ("createdAt");


--
-- Name: ChatMessage_from_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "ChatMessage_from_idx" ON public."ChatMessage" USING btree ("from");


--
-- Name: ChatMessage_to_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "ChatMessage_to_idx" ON public."ChatMessage" USING btree ("to");


--
-- Name: Event_shopId_key; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE UNIQUE INDEX "Event_shopId_key" ON public."Event" USING btree ("shopId");


--
-- Name: ExternalProfiles_circlesAddress_key; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE UNIQUE INDEX "ExternalProfiles_circlesAddress_key" ON public."ExternalProfiles" USING btree ("circlesAddress");


--
-- Name: Favorites_createdAt_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Favorites_createdAt_idx" ON public."Favorites" USING btree ("createdAt");


--
-- Name: Favorites_createdByCirclesAddress_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Favorites_createdByCirclesAddress_idx" ON public."Favorites" USING btree ("createdByCirclesAddress");


--
-- Name: Favorites_favoriteCirclesAddress_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Favorites_favoriteCirclesAddress_idx" ON public."Favorites" USING btree ("favoriteCirclesAddress");


--
-- Name: HumanodeVerifications_createdAt_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "HumanodeVerifications_createdAt_idx" ON public."HumanodeVerifications" USING btree ("createdAt");


--
-- Name: HumanodeVerifications_sub_key; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE UNIQUE INDEX "HumanodeVerifications_sub_key" ON public."HumanodeVerifications" USING btree (sub);


--
-- Name: InvitationFundsEOA_address_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "InvitationFundsEOA_address_idx" ON public."InvitationFundsEOA" USING btree (address);


--
-- Name: InvitationFundsEOA_profileId_key; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE UNIQUE INDEX "InvitationFundsEOA_profileId_key" ON public."InvitationFundsEOA" USING btree ("profileId");


--
-- Name: Invitation_claimedByProfileId_claimedAt_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Invitation_claimedByProfileId_claimedAt_idx" ON public."Invitation" USING btree ("claimedByProfileId", "claimedAt");


--
-- Name: Invitation_code_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Invitation_code_idx" ON public."Invitation" USING btree (code);


--
-- Name: Invitation_createdAt_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Invitation_createdAt_idx" ON public."Invitation" USING btree ("createdAt");


--
-- Name: Invitation_createdByProfileId_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Invitation_createdByProfileId_idx" ON public."Invitation" USING btree ("createdByProfileId");


--
-- Name: Invitation_redeemedByProfileId_redeemedAt_redeemTxHash_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Invitation_redeemedByProfileId_redeemedAt_redeemTxHash_idx" ON public."Invitation" USING btree ("redeemedByProfileId", "redeemedAt", "redeemTxHash");


--
-- Name: InvoiceLine_invoiceId_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "InvoiceLine_invoiceId_idx" ON public."InvoiceLine" USING btree ("invoiceId");


--
-- Name: InvoiceLine_productId_productVersion_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "InvoiceLine_productId_productVersion_idx" ON public."InvoiceLine" USING btree ("productId", "productVersion");


--
-- Name: Invoice_cancelledByProfileId_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Invoice_cancelledByProfileId_idx" ON public."Invoice" USING btree ("cancelledByProfileId");


--
-- Name: Invoice_createdAt_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Invoice_createdAt_idx" ON public."Invoice" USING btree ("createdAt");


--
-- Name: Invoice_customerProfileId_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Invoice_customerProfileId_idx" ON public."Invoice" USING btree ("customerProfileId");


--
-- Name: Invoice_invoiceNo_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Invoice_invoiceNo_idx" ON public."Invoice" USING btree ("invoiceNo");


--
-- Name: Invoice_paymentTransactionHash_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Invoice_paymentTransactionHash_idx" ON public."Invoice" USING btree ("paymentTransactionHash");


--
-- Name: Invoice_paymentTransactionHash_key; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE UNIQUE INDEX "Invoice_paymentTransactionHash_key" ON public."Invoice" USING btree ("paymentTransactionHash");


--
-- Name: Invoice_pickupCode_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Invoice_pickupCode_idx" ON public."Invoice" USING btree ("pickupCode");


--
-- Name: Invoice_purchaseId_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Invoice_purchaseId_idx" ON public."Invoice" USING btree ("purchaseId");


--
-- Name: Invoice_sellerProfileId_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Invoice_sellerProfileId_idx" ON public."Invoice" USING btree ("sellerProfileId");


--
-- Name: Job_createdAt_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Job_createdAt_idx" ON public."Job" USING btree ("createdAt");


--
-- Name: Job_hash_key; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE UNIQUE INDEX "Job_hash_key" ON public."Job" USING btree (hash);


--
-- Name: Jwks_kid_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Jwks_kid_idx" ON public."Jwks" USING btree (kid);


--
-- Name: Membership_acceptedAt_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Membership_acceptedAt_idx" ON public."Membership" USING btree ("acceptedAt");


--
-- Name: Membership_createdAt_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Membership_createdAt_idx" ON public."Membership" USING btree ("createdAt");


--
-- Name: Membership_createdByProfileId_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Membership_createdByProfileId_idx" ON public."Membership" USING btree ("createdByProfileId");


--
-- Name: Membership_memberAddress_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Membership_memberAddress_idx" ON public."Membership" USING btree ("memberAddress");


--
-- Name: Membership_memberAtId_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Membership_memberAtId_idx" ON public."Membership" USING btree ("memberAtId");


--
-- Name: Membership_rejectedAt_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Membership_rejectedAt_idx" ON public."Membership" USING btree ("rejectedAt");


--
-- Name: Offer_createdAt_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Offer_createdAt_idx" ON public."Offer" USING btree ("createdAt");


--
-- Name: Offer_createdByProfileId_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Offer_createdByProfileId_idx" ON public."Offer" USING btree ("createdByProfileId");


--
-- Name: Profile_circlesAddress_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Profile_circlesAddress_idx" ON public."Profile" USING btree ("circlesAddress");


--
-- Name: Profile_createdAt_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Profile_createdAt_idx" ON public."Profile" USING btree ("createdAt");


--
-- Name: Profile_inviteTriggerId_key; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE UNIQUE INDEX "Profile_inviteTriggerId_key" ON public."Profile" USING btree ("inviteTriggerId");


--
-- Name: PurchaseLine_productId_productVersion_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "PurchaseLine_productId_productVersion_idx" ON public."PurchaseLine" USING btree ("productId", "productVersion");


--
-- Name: PurchaseLine_purchaseId_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "PurchaseLine_purchaseId_idx" ON public."PurchaseLine" USING btree ("purchaseId");


--
-- Name: Purchase_createdAt_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Purchase_createdAt_idx" ON public."Purchase" USING btree ("createdAt");


--
-- Name: Purchase_createdByProfileId_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Purchase_createdByProfileId_idx" ON public."Purchase" USING btree ("createdByProfileId");


--
-- Name: Session_createdAt_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Session_createdAt_idx" ON public."Session" USING btree ("createdAt");


--
-- Name: Session_profileId_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Session_profileId_idx" ON public."Session" USING btree ("profileId");


--
-- Name: Session_sessionToken_key; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");


--
-- Name: ShopCategoryEntry_productId_productVersion_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "ShopCategoryEntry_productId_productVersion_idx" ON public."ShopCategoryEntry" USING btree ("productId", "productVersion");


--
-- Name: Shop_pickupAddressId_key; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE UNIQUE INDEX "Shop_pickupAddressId_key" ON public."Shop" USING btree ("pickupAddressId");


--
-- Name: Tag_chatMessageId_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Tag_chatMessageId_idx" ON public."Tag" USING btree ("chatMessageId");


--
-- Name: Tag_createdAt_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Tag_createdAt_idx" ON public."Tag" USING btree ("createdAt");


--
-- Name: Tag_createdByProfileId_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Tag_createdByProfileId_idx" ON public."Tag" USING btree ("createdByProfileId");


--
-- Name: Tag_offerId_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Tag_offerId_idx" ON public."Tag" USING btree ("offerId");


--
-- Name: Tag_offerId_offerVersion_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Tag_offerId_offerVersion_idx" ON public."Tag" USING btree ("offerId", "offerVersion");


--
-- Name: Tag_transactionHash_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Tag_transactionHash_idx" ON public."Tag" USING btree ("transactionHash");


--
-- Name: Tag_typeId_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "Tag_typeId_idx" ON public."Tag" USING btree ("typeId");


--
-- Name: Transaction_transactionHash_key; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE UNIQUE INDEX "Transaction_transactionHash_key" ON public."Transaction" USING btree ("transactionHash");


--
-- Name: VerifiedSafe_createdAt_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "VerifiedSafe_createdAt_idx" ON public."VerifiedSafe" USING btree ("createdAt");


--
-- Name: VerifiedSafe_createdByOrganisationId_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "VerifiedSafe_createdByOrganisationId_idx" ON public."VerifiedSafe" USING btree ("createdByOrganisationId");


--
-- Name: VerifiedSafe_createdByProfileId_idx; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE INDEX "VerifiedSafe_createdByProfileId_idx" ON public."VerifiedSafe" USING btree ("createdByProfileId");


--
-- Name: VerifiedSafe_inviteeRewardTransactionHash_key; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE UNIQUE INDEX "VerifiedSafe_inviteeRewardTransactionHash_key" ON public."VerifiedSafe" USING btree ("inviteeRewardTransactionHash");


--
-- Name: VerifiedSafe_inviterRewardTransactionHash_key; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE UNIQUE INDEX "VerifiedSafe_inviterRewardTransactionHash_key" ON public."VerifiedSafe" USING btree ("inviterRewardTransactionHash");


--
-- Name: VerifiedSafe_swapFundingTransactionHash_key; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE UNIQUE INDEX "VerifiedSafe_swapFundingTransactionHash_key" ON public."VerifiedSafe" USING btree ("swapFundingTransactionHash");


--
-- Name: i18nReleases_releaseVersion_lang_key; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE UNIQUE INDEX "i18nReleases_releaseVersion_lang_key" ON public."i18nReleases" USING btree ("releaseVersion", lang);


--
-- Name: i18n_lang_key_version_key; Type: INDEX; Schema: public; Owner: doadmin
--

CREATE UNIQUE INDEX i18n_lang_key_version_key ON public.i18n USING btree (lang, key, version);


--
-- Name: Event Event_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."PostAddress"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Event Event_shopId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES public."Shop"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: InvitationFundsEOA InvitationFundsEOA_profileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."InvitationFundsEOA"
    ADD CONSTRAINT "InvitationFundsEOA_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Invitation Invitation_claimedByProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Invitation"
    ADD CONSTRAINT "Invitation_claimedByProfileId_fkey" FOREIGN KEY ("claimedByProfileId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Invitation Invitation_createdByProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Invitation"
    ADD CONSTRAINT "Invitation_createdByProfileId_fkey" FOREIGN KEY ("createdByProfileId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Invitation Invitation_redeemedByProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Invitation"
    ADD CONSTRAINT "Invitation_redeemedByProfileId_fkey" FOREIGN KEY ("redeemedByProfileId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: InvoiceLine InvoiceLine_invoiceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."InvoiceLine"
    ADD CONSTRAINT "InvoiceLine_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public."Invoice"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: InvoiceLine InvoiceLine_productId_productVersion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."InvoiceLine"
    ADD CONSTRAINT "InvoiceLine_productId_productVersion_fkey" FOREIGN KEY ("productId", "productVersion") REFERENCES public."Offer"(id, version) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: InvoiceLine InvoiceLine_shopId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."InvoiceLine"
    ADD CONSTRAINT "InvoiceLine_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES public."Shop"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Invoice Invoice_cancelledByProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_cancelledByProfileId_fkey" FOREIGN KEY ("cancelledByProfileId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Invoice Invoice_customerProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_customerProfileId_fkey" FOREIGN KEY ("customerProfileId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Invoice Invoice_deliveryAddressId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_deliveryAddressId_fkey" FOREIGN KEY ("deliveryAddressId") REFERENCES public."PostAddress"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Invoice Invoice_deliveryMethodId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_deliveryMethodId_fkey" FOREIGN KEY ("deliveryMethodId") REFERENCES public."DeliveryMethod"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Invoice Invoice_paymentTransactionHash_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_paymentTransactionHash_fkey" FOREIGN KEY ("paymentTransactionHash") REFERENCES public."Transaction"("transactionHash") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Invoice Invoice_purchaseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES public."Purchase"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Invoice Invoice_sellerProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_sellerProfileId_fkey" FOREIGN KEY ("sellerProfileId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Membership Membership_createdByProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Membership"
    ADD CONSTRAINT "Membership_createdByProfileId_fkey" FOREIGN KEY ("createdByProfileId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Membership Membership_memberAtId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Membership"
    ADD CONSTRAINT "Membership_memberAtId_fkey" FOREIGN KEY ("memberAtId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Offer Offer_createdByProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Offer"
    ADD CONSTRAINT "Offer_createdByProfileId_fkey" FOREIGN KEY ("createdByProfileId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Offer Offer_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Offer"
    ADD CONSTRAINT "Offer_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PostAddress PostAddress_shippingAddressOfProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."PostAddress"
    ADD CONSTRAINT "PostAddress_shippingAddressOfProfileId_fkey" FOREIGN KEY ("shippingAddressOfProfileId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Profile Profile_businessCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_businessCategoryId_fkey" FOREIGN KEY ("businessCategoryId") REFERENCES public."BusinessCategory"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Profile Profile_inviteTriggerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_inviteTriggerId_fkey" FOREIGN KEY ("inviteTriggerId") REFERENCES public."Job"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PurchaseLine PurchaseLine_productId_productVersion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."PurchaseLine"
    ADD CONSTRAINT "PurchaseLine_productId_productVersion_fkey" FOREIGN KEY ("productId", "productVersion") REFERENCES public."Offer"(id, version) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PurchaseLine PurchaseLine_purchaseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."PurchaseLine"
    ADD CONSTRAINT "PurchaseLine_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES public."Purchase"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PurchaseLine PurchaseLine_shopId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."PurchaseLine"
    ADD CONSTRAINT "PurchaseLine_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES public."Shop"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Purchase Purchase_createdByProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Purchase"
    ADD CONSTRAINT "Purchase_createdByProfileId_fkey" FOREIGN KEY ("createdByProfileId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Purchase Purchase_deliveryAddressId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Purchase"
    ADD CONSTRAINT "Purchase_deliveryAddressId_fkey" FOREIGN KEY ("deliveryAddressId") REFERENCES public."PostAddress"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Purchase Purchase_deliveryMethodId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Purchase"
    ADD CONSTRAINT "Purchase_deliveryMethodId_fkey" FOREIGN KEY ("deliveryMethodId") REFERENCES public."DeliveryMethod"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Session Session_profileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ShopCategoryEntry ShopCategoryEntry_productId_productVersion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."ShopCategoryEntry"
    ADD CONSTRAINT "ShopCategoryEntry_productId_productVersion_fkey" FOREIGN KEY ("productId", "productVersion") REFERENCES public."Offer"(id, version) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ShopCategoryEntry ShopCategoryEntry_shopCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."ShopCategoryEntry"
    ADD CONSTRAINT "ShopCategoryEntry_shopCategoryId_fkey" FOREIGN KEY ("shopCategoryId") REFERENCES public."ShopCategory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ShopCategory ShopCategory_shopId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."ShopCategory"
    ADD CONSTRAINT "ShopCategory_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES public."Shop"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ShopDeliveryMethod ShopDeliveryMethod_deliveryMethodId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."ShopDeliveryMethod"
    ADD CONSTRAINT "ShopDeliveryMethod_deliveryMethodId_fkey" FOREIGN KEY ("deliveryMethodId") REFERENCES public."DeliveryMethod"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ShopDeliveryMethod ShopDeliveryMethod_shopId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."ShopDeliveryMethod"
    ADD CONSTRAINT "ShopDeliveryMethod_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES public."Shop"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Shop Shop_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Shop"
    ADD CONSTRAINT "Shop_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Shop Shop_pickupAddressId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Shop"
    ADD CONSTRAINT "Shop_pickupAddressId_fkey" FOREIGN KEY ("pickupAddressId") REFERENCES public."PostAddress"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Tag Tag_chatMessageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_chatMessageId_fkey" FOREIGN KEY ("chatMessageId") REFERENCES public."ChatMessage"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Tag Tag_createdByProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_createdByProfileId_fkey" FOREIGN KEY ("createdByProfileId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Tag Tag_offerId_offerVersion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_offerId_offerVersion_fkey" FOREIGN KEY ("offerId", "offerVersion") REFERENCES public."Offer"(id, version) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Tag Tag_transactionHash_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_transactionHash_fkey" FOREIGN KEY ("transactionHash") REFERENCES public."Transaction"("transactionHash") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Tag Tag_typeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES public."TagType"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: VerifiedSafe VerifiedSafe_createdByOrganisationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."VerifiedSafe"
    ADD CONSTRAINT "VerifiedSafe_createdByOrganisationId_fkey" FOREIGN KEY ("createdByOrganisationId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: VerifiedSafe VerifiedSafe_createdByProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."VerifiedSafe"
    ADD CONSTRAINT "VerifiedSafe_createdByProfileId_fkey" FOREIGN KEY ("createdByProfileId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: VerifiedSafe VerifiedSafe_inviteeRewardTransactionHash_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."VerifiedSafe"
    ADD CONSTRAINT "VerifiedSafe_inviteeRewardTransactionHash_fkey" FOREIGN KEY ("inviteeRewardTransactionHash") REFERENCES public."Transaction"("transactionHash") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: VerifiedSafe VerifiedSafe_inviterRewardTransactionHash_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."VerifiedSafe"
    ADD CONSTRAINT "VerifiedSafe_inviterRewardTransactionHash_fkey" FOREIGN KEY ("inviterRewardTransactionHash") REFERENCES public."Transaction"("transactionHash") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: VerifiedSafe VerifiedSafe_revokedByProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."VerifiedSafe"
    ADD CONSTRAINT "VerifiedSafe_revokedByProfileId_fkey" FOREIGN KEY ("revokedByProfileId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: VerifiedSafe VerifiedSafe_swapFundingTransactionHash_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public."VerifiedSafe"
    ADD CONSTRAINT "VerifiedSafe_swapFundingTransactionHash_fkey" FOREIGN KEY ("swapFundingTransactionHash") REFERENCES public."Transaction"("transactionHash") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: i18n i18n_releaseVersion_lang_fkey; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.i18n
    ADD CONSTRAINT "i18n_releaseVersion_lang_fkey" FOREIGN KEY ("releaseVersion", lang) REFERENCES public."i18nReleases"("releaseVersion", lang) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

INSERT INTO db_version (version, comment) VALUES ('0_0.1.504.sql', 'Initial schema');

-- migrate:down
