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
  -- Set disabled status
  UPDATE
    "Profile"
  SET
    "status" = 'disabled'
  WHERE
    "circlesAddress" = address;
  -- Remove CirclesAddress
  UPDATE
    "Profile"
  SET
    "circlesAddress" = NULL
  WHERE
    "circlesAddress" = address;
  -- Disable the Shop
  UPDATE
    "Profile"
  SET
    "shopEnabled" = FALSE
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
