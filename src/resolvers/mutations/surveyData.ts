import { SurveyDataInput } from "../../types";
import { Context } from "../../context";
import { Environment } from "../../environment";

export function surveyData() {
  return async (parent: any, args: { data: SurveyDataInput }, context: Context) => {
    const newSurvey = await Environment.readWriteApiDb.surveyData.create({
      data: {
        sesssionId: args.data.sessionId,
        allConsentsGiven: args.data.allConsentsGiven,
        villageId: args.data.villageId,
        gender: args.data.gender,
        dateOfBirth: args.data.dateOfBirth,
      },
    });

    return {
      success: true,
      data: newSurvey,
    };
  };
}
