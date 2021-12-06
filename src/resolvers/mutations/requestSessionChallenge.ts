import {Context} from "../../context";
import {Session} from "../../session";
import {MutationRequestSessionChallengeArgs} from "../../types";
import {Environment} from "../../environment";

export const requestSessionChallenge = async (parent:any, args: MutationRequestSessionChallengeArgs, context: Context) => {
  return await Session.requestSessionFromSignature(Environment.readWriteApiDb, args.address);
}