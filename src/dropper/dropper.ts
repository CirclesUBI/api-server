import {Prisma, VerifiedSafe} from "../api-db/client";
import {Session} from "../session";
import {ProfileLoader} from "../profileLoader";
import InvitationCreateManyInput = Prisma.InvitationCreateManyInput;
import {Environment} from "../environment";

export class Dropper {

  static async createInvitations(verifiedSafe:VerifiedSafe, newInvitationCount:number) : Promise<InvitationCreateManyInput[]> {
    const profileResult = await new ProfileLoader().queryCirclesLandBySafeAddress(Environment.readWriteApiDb, [verifiedSafe.safeAddress]);
    const profileResultValues = Object.values(profileResult);
    if (profileResultValues.length == 0) {
      throw new Error(`Couldn't find a profile for the verified safe ${verifiedSafe.safeAddress}`);
    }

    const profile = profileResultValues[0];
    if (!profile) {
      throw new Error(`Couldn't find a profile for the verified safe ${verifiedSafe.safeAddress}`);
    }

    const now = new Date();
    const createInvitationsData:InvitationCreateManyInput[] = [];
    for(let i = 1; i < newInvitationCount + 1; i++) {
      createInvitationsData.push({
        name: `Invitation ${verifiedSafe.inviteCount + i}`,
        createdAt: now,
        createdByProfileId: profile.id,
        address: "0x", // invitationEoa.address.toLowerCase(),
        key: "0x", //invitationEoa.privateKey,
        code: Session.generateRandomHexString(16),
        forSafeAddress: verifiedSafe.safeAddress
      });
    }

    await Environment.readWriteApiDb.invitation.createMany({
      data: createInvitationsData
    });
    await Environment.readWriteApiDb.verifiedSafe.update({
      where: {
        safeAddress: verifiedSafe.safeAddress
      },
      data: {
        inviteCount: verifiedSafe.inviteCount + newInvitationCount
      }
    });

    return createInvitationsData;
  }

/*
  private _interval: NodeJS.Timeout|undefined = undefined;
  private _lastVerification:Date = new Date(0);

  async start() {
    this._interval = setInterval(async () => {
      if (process.env.REWARD_TOKEN_ADDRESS) {
        await this.checkNewVerifications();
      }
    }, 10000);
  }

  private async checkNewVerifications() {
    const now = new Date();
    await Environment.readWriteApiDb.verifiedSafe.updateMany({
      where: {
        createdAt: {
          gt: this._lastVerification
        },
        rewardProcessingStartedAt: null
      },
      data: {
        rewardProcessingStartedAt: now,
        rewardProcessingWorker: process.pid.toString()
      }
    });

    const verificationsToProcess = await Environment.readWriteApiDb.verifiedSafe.findMany({
      where: {
        rewardProcessingStartedAt: now,
        rewardProcessingWorker: process.pid.toString()
      }
    });

    for (let newVerification of verificationsToProcess) {
      try {
        this._lastVerification = new Date(newVerification.createdAt);
        console.log(`Creating invitations for new verified safe ${newVerification.safeAddress} ..`);
        await Dropper.createInvitations(newVerification, 10);
      } catch (e) {
        console.error(`An error occurred while dropping the invites and rewards for verifiedSafe ${newVerification.safeAddress}:`, e);
      }
    }
  }

 */

  /*

  async stop() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = undefined;
    }
  }

   */
}