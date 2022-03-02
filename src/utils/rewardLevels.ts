import BN from "bn.js";
import {RpcGateway} from "../circles/rpcGateway";

export type RewardLevel = { threshold: number, invitee: number, inviter: number, seedbomber: number };
export type RewardLevelWei = { threshold: number, invitee: BN, inviter: BN, seedbomber: BN };

export class RewardLevels {
  private static _levels:RewardLevel[] = [
      {threshold: 1, invitee: 10120, inviter: 2024, seedbomber: 1012}
    , {threshold: 2, invitee: 8096, inviter: 1619.2, seedbomber: 809.6}
    , {threshold: 4, invitee: 6476.8, inviter: 1295.36, seedbomber: 647.68}
    , {threshold: 7, invitee: 5181.44, inviter: 1036.29, seedbomber: 518.14}
    , {threshold: 12, invitee: 4145.15, inviter: 829.03, seedbomber: 414.52}
    , {threshold: 20, invitee: 3316.12, inviter: 663.22, seedbomber: 331.61}
    , {threshold: 33, invitee: 2652.9, inviter: 530.58, seedbomber: 265.29}
    , {threshold: 54, invitee: 2122.32, inviter: 424.46, seedbomber: 212.23}
    , {threshold: 88, invitee: 1697.85, inviter: 339.57, seedbomber: 169.79}
    , {threshold: 143, invitee: 1358.28, inviter: 271.66, seedbomber: 135.83}
    , {threshold: 232, invitee: 1086.63, inviter: 217.33, seedbomber: 108.66}
    , {threshold: 376, invitee: 869.3, inviter: 173.86, seedbomber: 86.93}
    , {threshold: 609, invitee: 695.44, inviter: 139.09, seedbomber: 69.54}
    , {threshold: 986, invitee: 556.35, inviter: 111.27, seedbomber: 55.64}
    , {threshold: 1596, invitee: 445.08, inviter: 89.02, seedbomber: 44.51}
    , {threshold: 2583, invitee: 356.07, inviter: 71.21, seedbomber: 35.61}
    , {threshold: 4180, invitee: 284.85, inviter: 56.97, seedbomber: 28.49}
    , {threshold: 6764, invitee: 227.88, inviter: 45.58, seedbomber: 22.79}
    , {threshold: 10945, invitee: 182.31, inviter: 36.46, seedbomber: 18.23}
    , {threshold: 17710, invitee: 102.09, inviter: 29.17, seedbomber: 14.58}
    , {threshold: 28656, invitee: 81.67, inviter: 23.34, seedbomber: 11.67}
    , {threshold: 46367, invitee: 65.34, inviter: 18.67, seedbomber: 9.33}
    , {threshold: 75024, invitee: 52.27, inviter: 14.93, seedbomber: 7.47}
    , {threshold: 121392, invitee: 41.82, inviter: 11.95, seedbomber: 5.97}
    , {threshold: 196417, invitee: 33.45, inviter: 9.56, seedbomber: 4.78}
    , {threshold: 317810, invitee: 26.76, inviter: 7.65, seedbomber: 3.82}
    , {threshold: 514228, invitee: 21.41, inviter: 6.12, seedbomber: 3.06}
    , {threshold: 832039, invitee: 17.13, inviter: 4.89, seedbomber: 2.45}
    , {threshold: 1346268, invitee: 13.7, inviter: 3.91, seedbomber: 1.96}
    , {threshold: 2178308, invitee: 10.96, inviter: 3.13, seedbomber: 1.57}
    , {threshold: 3524577, invitee: 8.77, inviter: 2.51, seedbomber: 1.25}
    , {threshold: 5702886, invitee: 7.02, inviter: 2, seedbomber: 1}
    , {threshold: 9227465, invitee: 5.61, inviter: 1.6, seedbomber: 0.8}
    , {threshold: 14930353, invitee: 4.49, inviter: 1.28, seedbomber: 0.64}
    , {threshold: 24157820, invitee: 3.59, inviter: 1.03, seedbomber: 0.51}
    , {threshold: 39088176, invitee: 2.87, inviter: 0.82, seedbomber: 0.41}
    , {threshold: 63245999, invitee: 2.3, inviter: 0.66, seedbomber: 0.33}
    , {threshold: 102334178, invitee: 1.84, inviter: 0.53, seedbomber: 0.26}
    , {threshold: 165580181, invitee: 1.47, inviter: 0.42, seedbomber: 0.21}
    , {threshold: 267914364, invitee: 1.18, inviter: 0.34, seedbomber: 0.17}
    , {threshold: 433494552, invitee: 0.94, inviter: 0.27, seedbomber: 0.13}
    , {threshold: 701408926, invitee: 0.75, inviter: 0.22, seedbomber: 0.11}
    , {threshold: 1134903493, invitee: 0.6, inviter: 0.17, seedbomber: 0.09}
    , {threshold: 1836312441, invitee: 0.48, inviter: 0.14, seedbomber: 0.07}
    , {threshold: 2971215966, invitee: 0.39, inviter: 0.11, seedbomber: 0.06}
    , {threshold: 4807528456, invitee: 0.31, inviter: 0.09, seedbomber: 0.04}
    , {threshold: 7778744500, invitee: 0.25, inviter: 0.07, seedbomber: 0.04}
    , {threshold: 11000000000, invitee: 0.2, inviter: 0.06, seedbomber: 0.03}
  ];

  static getRewardLevel(verifiedUserCount: number): RewardLevel & { level: number } {
    const foundLevel = this._levels.find((o) => o.threshold >= verifiedUserCount);
    if (!foundLevel) {
      throw new Error(`Couldn't find a matching RewardLevel for threshold ${verifiedUserCount}`);
    }
    return {
      ...foundLevel,
      level: this._levels.indexOf(foundLevel) + 1
    };
  }

  static getRewardLevelWei(verifiedUserCount: number): RewardLevelWei & { level: number } {
    const foundLevel = this._levels.find(o => o.threshold >= verifiedUserCount);
    if (!foundLevel) {
      throw new Error(`Couldn't find a matching RewardLevel for threshold ${verifiedUserCount}`);
    }
    return {
      level: this._levels.indexOf(foundLevel) + 1,
      threshold: foundLevel.threshold,
      invitee: new BN(RpcGateway.get().utils.toWei(foundLevel.invitee.toString(), "ether")),
      inviter: new BN(RpcGateway.get().utils.toWei(foundLevel.inviter.toString(), "ether")),
      seedbomber: new BN(RpcGateway.get().utils.toWei(foundLevel.seedbomber.toString(), "ether"))
    };
  }
}