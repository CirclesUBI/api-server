ALTER TABLE "SurveyData" ADD CONSTRAINT "sessionid_unique" UNIQUE ("sesssionId");

ALTER TABLE "public"."Profile"
ADD COLUMN "surveyDataSessionId" text;
ALTER TABLE "public"."Profile" ADD FOREIGN KEY ("surveyDataSessionId") REFERENCES "public"."SurveyData" ("sesssionId");

INSERT INTO db_version (version, comment) VALUES ('4_0.1.514-add-SurveyDataSessionId.sql', 'Add a link to the survey data to the user profile');
