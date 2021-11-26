import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";
import {prisma_api_ro, prisma_api_rw} from "../../apiDbClient";
import {RpcGateway} from "../../rpcGateway";
import {Session} from "../../session";
import {CreateInvitationResult} from "../../types";
import {fundEoa} from "./createTestInvitation";

const TestOrga = "0xc5a786eafefcf703c114558c443e4f17969d9573";

export function createInvitations(prisma_api_rw:PrismaClient) {
    return async (parent:any, args:{for:string[]}, context:Context) => {
      const callerInfo = await context.callerInfo;

      if (!callerInfo?.profile?.circlesAddress) {
        throw new Error(`You need a completed profile to use this feature.`);
      }

      const homoCirculus = prisma_api_ro.profile.findFirst({
        where: {
          circlesAddress: TestOrga,
          members: {
            some: {
              memberAddress: callerInfo.profile.circlesAddress
            }
          }
        }
      });

      if (!homoCirculus) {
        throw new Error(`You are not a member of organisation ${TestOrga}. Only members of this organisation can create invitations at the moment.`);
      }

      // Creates as many invitations as there are recipients in the arguments
      const createdInvitations = await Promise.all(args.for.map(async invitationFor => {
        const invitationEoa = RpcGateway.get().eth.accounts.create();
        const invitationData = {
          name: invitationFor,
          createdAt: new Date(),
          createdByProfileId: callerInfo.profile?.id ?? -1,
          address: invitationEoa.address,
          key: invitationEoa.privateKey,
          code: Session.generateRandomBase64String(16)
        };

        const createdInvitation = (await fundEoa(RpcGateway.get(), invitationData)).createdInviteEoas[0];
        const invitation = await prisma_api_rw.invitation.create({
          data: {
            ...invitationData
          }
        });

        return createdInvitation;
      }));

      return <CreateInvitationResult>{
        success: true,
        createdInviteEoas: createdInvitations.map(o => {
          return {
            createdBy: callerInfo.profile,
            createdByProfileId: callerInfo.profile?.id,
            createdAt: o.createdAt,
            name: o.name,
            address: o.address,
            balance: "0",
            code: o.code,
          }
        })
      }
    }
}