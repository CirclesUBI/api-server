-- migrate:up
CREATE OR REPLACE PROCEDURE sp_DisableProfileAndShop(address varchar(100))
LANGUAGE plpgsql
AS $$
BEGIN
  -- Remove Session
  DELETE FROM "Session"
  WHERE "Session"."profileId" IN(
      SELECT
        "id"
      FROM
        "Profile"
      WHERE
        "circlesAddress" = address);
  -- Copy circlesAddress to disabledCirclesAddress
  UPDATE
    "Profile"
  SET
    "disabledCirclesAddress" = "circlesAddress"
  WHERE
    "circlesAddress" = address;
  -- Copy circlesSafeOwner to disabledCirclesSafeOwner
  UPDATE
    "Profile"
  SET
    "disabledCirclesSafeOwner" = "circlesSafeOwner"
  WHERE
    "circlesAddress" = address;
  -- Set disabled status
  UPDATE
    "Profile"
  SET
    "status" = 'disabled'
  WHERE
    "circlesAddress" = address;
  -- Disable the Shop for the Person Entry
  UPDATE
    "Profile"
  SET
    "shopEnabled" = FALSE
  WHERE
    "circlesAddress" = address;
  -- Remove circlesSafeOwner
  UPDATE
    "Profile"
  SET
    "circlesSafeOwner" = NULL
  WHERE
    "circlesAddress" = address;
  -- Remove CirclesAddress
  UPDATE
    "Profile"
  SET
    "circlesAddress" = NULL
  WHERE
    "circlesAddress" = address;
  -- Disable the Shop for the Orga Entry
  UPDATE
    "Profile"
  SET
    "shopEnabled" = FALSE
  WHERE
    id IN(
      SELECT
        "createdByProfileId"
      FROM
        "Membership"
      WHERE
        "memberAddress" = address
        AND "isAdmin" = TRUE);
  -- copy circlesAddress for the Orga Entry
  UPDATE
    "Profile"
  SET
    "disabledCirclesAddress" = "circlesAddress"
  WHERE
    id IN(
      SELECT
        "memberAtId"
      FROM
        "Membership"
      WHERE
        "memberAddress" = address
        AND "isAdmin" = TRUE);
  -- Remove circlesAddress for Orga Entry
  UPDATE
    "Profile"
  SET
    "circlesAddress" = NULL
  WHERE
    id IN(
      SELECT
        "memberAtId"
      FROM
        "Membership"
      WHERE
        "memberAddress" = address
        AND "isAdmin" = TRUE);
  -- set status for Orga Entry to disabled
  UPDATE
    "Profile"
  SET
    "status" = 'disabled'
  WHERE
    id IN(
      SELECT
        "memberAtId"
      FROM
        "Membership"
      WHERE
        "memberAddress" = address
        AND "isAdmin" = TRUE);
END
$$
-- migrate:down
