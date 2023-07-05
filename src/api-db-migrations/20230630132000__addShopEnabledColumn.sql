-- migrate:up
DROP VIEW IF EXISTS businesses;

CREATE VIEW businesses AS
SELECT
  p.id,
  p."createdAt",
  "firstName" AS name,
  dream AS description,
  "phoneNumber",
  location,
  "locationName",
  lat,
  lon,
  "circlesAddress",
  "businessCategoryId",
  bc.name AS "businessCategory",
  "avatarUrl" AS picture,
  "businessHoursMonday",
  "businessHoursTuesday",
  "businessHoursWednesday",
  "businessHoursThursday",
  "businessHoursFriday",
  "businessHoursSaturday",
  "businessHoursSunday",
  "shopEnabled",
  count(f.id) AS "favoriteCount",
  to_tsvector('simple', coalesce("firstName", '') || ' ' || coalesce(dream, '')) AS ts_vector
FROM
  "Profile" p
  LEFT JOIN "BusinessCategory" bc ON "businessCategoryId" = bc.id
  LEFT JOIN "Favorites" f ON f."favoriteCirclesAddress" = p."circlesAddress"
WHERE
  type = 'ORGANISATION'
GROUP BY
  p.id,
  p."createdAt",
  "firstName",
  dream,
  "phoneNumber",
  location,
  "locationName",
  lat,
  lon,
  "circlesAddress",
  "businessCategoryId",
  bc.name,
  "avatarUrl",
  "businessHoursMonday",
  "businessHoursTuesday",
  "businessHoursWednesday",
  "businessHoursThursday",
  "businessHoursFriday",
  "businessHoursSaturday",
  "businessHoursSunday",
  "shopEnabled",
  ts_vector;

-- migrate:down
