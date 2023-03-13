ALTER TABLE "SurveyData" ADD COLUMN "villageId" INT;


ALTER TABLE "SurveyData" DROP COLUMN "userType";

ALTER TABLE "SurveyData" ADD CONSTRAINT "fk_villageId" FOREIGN KEY ("villageId") REFERENCES "BaliVillage" (id);

ALTER TABLE "SurveyData" OWNER TO "${POSTGRES_USER}";
