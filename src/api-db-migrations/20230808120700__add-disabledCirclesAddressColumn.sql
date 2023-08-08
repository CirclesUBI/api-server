-- migrate:up
ALTER TABLE "Profile"
  ADD COLUMN "disabledCirclesAddress" TEXT;

CREATE OR REPLACE PROCEDURE sp_DisableProfileAndShop(address varchar(100))
LANGUAGE plpgsql
AS $$
BEGIN
  -- Copy circlesAddress to disabledCirclesAddress
  UPDATE
    "Profile"
  SET
    "disabledCirclesAddress" = "circlesAddress"
  WHERE
    "circlesAddress" = address;
  -- Remove circlesAddress
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
        "memberAddress" = address);
END
$$
-- migrate:down
