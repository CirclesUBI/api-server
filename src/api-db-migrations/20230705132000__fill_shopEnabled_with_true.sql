-- migrate:up
UPDATE
  "Profile"
SET
  "shopEnabled" = TRUE;

-- migrate:down
