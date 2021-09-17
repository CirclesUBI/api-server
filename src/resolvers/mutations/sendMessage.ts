import {ChatMessage, SendMessageResult} from "../../types";
import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";
import {profilesBySafeAddress} from "../queries/profiles";

export function sendMessage(prisma:PrismaClient) {
    return async (parent:any, args:{toSafeAddress:string, content:string}, context:Context) => {
      const session = await context.verifySession();
      if (!session.profileId) {
        return {
          success: false,
          errorMessage: "You must have a complete profile to use this function."
        }
      }
      const toSafeAddress = args.toSafeAddress.toLowerCase();
      const fromProfile = await prisma.profile.findUnique({
        where: {id: session.profileId}
      });
      if (!fromProfile)
      {
        throw new Error(`Couldn't find a profile with id ${session.profileId}`);
      }
      if (!fromProfile.circlesAddress) {
        throw new Error(`You need a connected safe to use this feature.`);
      }
      const toProfile = await prisma.profile.findFirst({
        where: {circlesAddress: toSafeAddress}
      });
      if (!toProfile) {
        throw new Error(`Couldn't find a profile for safe ${toSafeAddress}`);
      }
      const message = await prisma.chatMessage.create({
        data: {
          createdAt: new Date(),
          from: fromProfile.circlesAddress,
          to: toSafeAddress,
          text: args.content
        }
      });

      return <SendMessageResult>{
        event: {
          id: message.id,
          timestamp: message.createdAt.toJSON(),
          type: "chat_message",
          direction: "out",
          safe_address: message.from,
          safe_address_profile: fromProfile,
          payload: <ChatMessage>{
            __typename: "ChatMessage",
            id: message.id,
            from: message.from,
            from_profile: fromProfile,
            to: message.to,
            to_profile: toProfile,
            text: message.text
          }
        },
        success: true
      };
    }
}