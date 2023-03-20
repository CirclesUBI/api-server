-- migrate:up

-- Add maintenance-functions

CREATE OR REPLACE PROCEDURE add_business_category(name text)
LANGUAGE plpgsql
AS $$
BEGIN
    if not exists (select 1 from "BusinessCategory" b where b.name = add_business_category.name) then
        INSERT INTO "BusinessCategory" (name) VALUES (add_business_category.name);
    end if;
END
$$;

CREATE OR REPLACE FUNCTION add_user(
    safe_address text
  , safe_owner_address text
  , org_safe_address text
  , org_safe_owner_address text
  , user_name text
  , org_name text
  , app_url text
  , email_address text
)
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
    invite_trigger_iob_id integer;
    payload text;
    payload_hash text;
    profile_id integer;
    org_id integer;
BEGIN
    payload = '{"id": "Invitation link for '||safe_address||'", "_kind": "perpetualTrigger", "_topic": "inviteCodeFromExternalTrigger", "_identity": "Invitation link for '||safe_address||'", "redirectUrl": "'||app_url||'", "inviterSafeAddress": "'|| safe_address ||'"}';
    payload_hash = encode(digest((payload::text||E'\n')::bytea, 'sha1'), 'hex');

    if exists(select 1 from "Profile" p where p."circlesAddress" = add_user.safe_address) then
        return -1;
    end if;

    -- Add the invitation trigger
    INSERT INTO "Job" (
        hash
      , "createdAt"
      , topic
      , payload
      , kind
      , "timeoutAt"
    )
    VALUES (
      payload_hash
      , now()
      , 'invitecodefromexternaltrigger'
      , payload
      , 'perpetualTrigger'
      , null
    ) RETURNING id INTO invite_trigger_iob_id;

    -- root user
    INSERT INTO public."Profile" (
        "emailAddress",
        status,
        "circlesAddress",
        "circlesSafeOwner",
        "firstName",
        newsletter,
        "lastUpdateAt",
        "lastAcknowledged",
        "displayTimeCircles",
        type,
        "lastInvoiceNo",
        "lastRefundNo",
        "displayCurrency",
        "createdAt",
        "emailAddressVerified",
        "askedForEmailAddress",
        "inviteTriggerId")
    VALUES (
        email_address,
        '',
        safe_address,
        safe_owner_address,
        user_name,
        true,
        now(),
        now(),
        true,
        'PERSON',
        0,
        0,
        'EURS',
        now(),
        true,
        true,
        invite_trigger_iob_id
    ) RETURNING id INTO profile_id;

    -- root organization
    INSERT INTO public."Profile" (
        "emailAddress",
        status,
        "circlesAddress",
        "circlesSafeOwner",
        "firstName",
        newsletter,
        "lastUpdateAt",
        "lastAcknowledged",
        "displayTimeCircles",
        type,
        "lastInvoiceNo",
        "lastRefundNo",
        "displayCurrency",
        "createdAt",
        "emailAddressVerified",
        "askedForEmailAddress"
    ) VALUES (
        email_address,
        '',
        org_safe_address,
        org_safe_owner_address,
        org_name,
        true,
        now(),
        now(),
        true,
        'ORGANISATION',
        0,
        0,
        'EURS',
        now(),
        true,
        true
    ) RETURNING id INTO org_id;

    INSERT INTO public."Membership" ("createdAt", "memberAtId", "isAdmin", "acceptedAt", "createdByProfileId", "memberAddress")
    VALUES (now(), org_id, true, now(), org_id, safe_address);

    INSERT INTO public."Invitation" ("createdByProfileId", "createdAt", code, "claimedByProfileId", "claimedAt", "redeemedByProfileId", "redeemedAt", key, address, name, "redeemTxHash", "fundedAt", "forSafeAddress")
    VALUES (org_id, now(), '', profile_id, now(), profile_id, now(), '0x00', '0x00', 'Root invitation', '0x00', now(), safe_address);

    INSERT INTO public."VerifiedSafe" ("safeAddress", "createdAt", "createdByProfileId", "createdByOrganisationId", "swapEoaAddress", "swapEoaKey", "inviteCount")
    VALUES (safe_address, now(), 1, 2, '0x00', '0x00', 1);

    RETURN profile_id;
END
$$;

-- migrate:down
