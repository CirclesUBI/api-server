-- migrate:up

drop view if exists businesses;
create view businesses as
select p.id
     , p."createdAt"
     , "firstName" as name
     , dream as description
     , "phoneNumber"
     , location
     , "locationName"
     , lat
     , lon
     , "circlesAddress"
     , "businessCategoryId"
     , bc.name as "businessCategory"
     , "avatarUrl" as picture
     , "businessHoursMonday"
     , "businessHoursTuesday"
     , "businessHoursWednesday"
     , "businessHoursThursday"
     , "businessHoursFriday"
     , "businessHoursSaturday"
     , "businessHoursSunday"
     , count(f.id) as "favoriteCount"
     , to_tsvector('simple', coalesce("firstName", '') || ' ' || coalesce(dream, '')) as ts_vector
from "Profile" p
         join "BusinessCategory" bc on "businessCategoryId" = bc.id
         left join "Favorites" f on f."favoriteCirclesAddress" = p."circlesAddress"
where type = 'ORGANISATION'
group by p.id
       , p."createdAt"
       , "firstName"
       , dream
       , "phoneNumber"
       , location
       , "locationName"
       , lat
       , lon
       , "circlesAddress"
       , "businessCategoryId"
       , bc.name
       , "avatarUrl"
       , "businessHoursMonday"
       , "businessHoursTuesday"
       , "businessHoursWednesday"
       , "businessHoursThursday"
       , "businessHoursFriday"
       , "businessHoursSaturday"
       , "businessHoursSunday"
       , ts_vector;

-- migrate:down
