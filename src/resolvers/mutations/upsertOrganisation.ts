import {Context} from "../../context";
import {PrismaClient} from "../../api-db/client";
import {MutationUpsertOrganisationArgs, Profile} from "../../types";
import {prisma_api_ro, prisma_api_rw} from "../../apiDbClient";

export function upsertOrganisation(prisma_api_rw:PrismaClient) {
    return async (parent:any, args:MutationUpsertOrganisationArgs, context:Context) => {
      const session = await context.verifySession();
      const ownProfile = await prisma_api_ro.profile.findUnique({
        where: {
          id: session.profileId ?? undefined
        }
      });

      if (!ownProfile?.circlesAddress) {
        throw new Error(`You need a completed profile to use this feature.`);
      }

      let profile:Profile;
      if (args.organisation.id) {
        if (args.organisation.id != session.profileId) {
          throw new Error(`'${session.sessionId}' (profile id: ${session.profileId ?? "<undefined>"}) can not upsert organisation '${args.organisation.id}'.`);
        }
        profile = await prisma_api_rw.profile.update({
          where: {
            id: args.organisation.id
          },
          data: {
            id: args.organisation.id,
            firstName: args.organisation.name,
            dream: args.organisation.description,
            circlesAddress: args.organisation.circlesAddress,
            avatarUrl: args.organisation.avatarUrl,
            avatarMimeType: args.organisation.avatarMimeType,
            type: "ORGANISATION",
            cityGeonameid: args.organisation.cityGeonameid
          }
        });
      } else {
        profile = await prisma_api_rw.profile.create({
          data: {
            firstName: args.organisation.name,
            dream: args.organisation.description,
            circlesAddress: args.organisation.circlesAddress,
            avatarUrl: args.organisation.avatarUrl,
            avatarMimeType: args.organisation.avatarMimeType,
            type: "ORGANISATION",
            cityGeonameid: args.organisation.cityGeonameid
          }
        });
      }

      return {
        success: true,
        organisation: {
          ...args,
          id: profile.id,
          createdAt: new Date().toJSON(),
          name: profile.firstName,
          members: []
        }
      };
    }
}