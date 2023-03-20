-- migrate:up

-- Add a link to the survey data to the user profile

ALTER TABLE "SurveyData" ADD CONSTRAINT "sessionid_unique" UNIQUE ("sesssionId");

ALTER TABLE "public"."Profile"
ADD COLUMN "surveyDataSessionId" text;
ALTER TABLE "public"."Profile" ADD FOREIGN KEY ("surveyDataSessionId") REFERENCES "public"."SurveyData" ("sesssionId");

-- migrate:down
