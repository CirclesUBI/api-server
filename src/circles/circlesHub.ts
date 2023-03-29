import Web3 from "web3";
import {Web3Contract} from "./web3Contract";
import {CIRCLES_HUB_ABI} from "./abi/circlesHubAbi";

export class CirclesHub extends Web3Contract {
  constructor(web3: Web3, hubAddress: string) {
    super(
      web3,
      hubAddress,
      new web3.eth.Contract(CIRCLES_HUB_ABI, hubAddress)
    );
  }
}
