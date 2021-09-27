import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";
import {prisma_api_ro, prisma_api_rw} from "../../apiDbClient";
import {RpcGateway} from "../../rpcGateway";
import {Session} from "../../session";
import {CreateInvitationResult} from "../../types";

export function createInvitations(prisma_api_rw:PrismaClient) {
    return async (parent:any, args:{for:string[]}, context:Context) => {
      const session = await context.verifySession();
      const profile = await prisma_api_ro.profile.findUnique({
        where: {
          id: session.profileId ?? undefined
        }
      });

      if (!profile?.circlesAddress) {
        throw new Error(`You need a completed profile to use this feature.`);
      }

      // Creates as many invitations as there are recipients in the arguments
      const createdInvitations = await Promise.all(args.for.map(async invitationFor => {
        const invitationEoa = RpcGateway.get().eth.accounts.create();

        const invitation = await prisma_api_rw.invitation.create({
          data: {
            name: invitationFor,
            createdAt: new Date(),
            createdByProfileId: profile.id,
            address: invitationEoa.address,
            key: invitationEoa.privateKey,
            code: Session.generateRandomBase64String(16)
          }
        });

        return invitation;
      }));

      return <CreateInvitationResult>{
        success: true,
        createdInviteEoas: createdInvitations.map(o => {
          return {
            createdBy: profile,
            createdByProfileId: profile.id,
            createdAt: o.createdAt.toJSON(),
            name: o.name,
            address: o.address,
            balance: "0",
            code: o.code,
          }
        })
      }
    }
}