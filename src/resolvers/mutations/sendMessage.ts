import {ChatMessage, SendMessageResult} from "../../types";
import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";

export function sendMessage(prisma_api_rw:PrismaClient) {
    return async (parent:any, args:{toSafeAddress:string, content:string}, context:Context) => {
      const session = await context.verifySession();
      if (!session.profileId) {
        return {
          success: false,
          errorMessage: "You must have a complete profile to use this function."
        }
      }
      const profile = await prisma_api_rw.profile.findUnique({
        where: {id: session.profileId}
      });
      if (!profile)
      {
        throw new Error(`Couldn't find a profile with id ${session.profileId}`);
      }
      if (!profile.circlesAddress) {
        throw new Error(`You need a connected safe to use this feature.`);
      }
      const message = await prisma_api_rw.chatMessage.create({
        data: {
          createdAt: new Date(),
          from: profile.circlesAddress,
          to: args.toSafeAddress,
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
          payload: <ChatMessage>{
            __typename: "ChatMessage",
            id: message.id,
            from: message.from,
            to: message.to,
            text: message.text
          }
        },
        success: true
      };
    }
}