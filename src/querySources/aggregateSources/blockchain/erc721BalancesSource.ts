import {AggregateSource} from "../aggregateSource";
import {
  Erc721Tokens,
  Maybe,
  ProfileAggregate,
  ProfileAggregateFilter
} from "../../../types";
import {RpcGateway} from "../../../circles/rpcGateway";
import {erc721_abi} from "../../../circles/abi/erc721Abi";
import {ProfileLoader} from "../../profileLoader";
import {Environment} from "../../../environment";

export class Erc721BalancesSource implements AggregateSource {
  async getAggregate(forSafeAddress: string, filter?: Maybe<ProfileAggregateFilter>): Promise<ProfileAggregate[]> {

    const token_address = "0x2F42a5e50B519aA7074647969DaaDC49E6aD5eE4";
    const web3 = RpcGateway.get();
    const erc721 = new web3.eth.Contract(erc721_abi, token_address);
    const urls: { url: string, symbol: string, name: string, owner: string }[] = [];

    for(let i = 0; i < 50; i++){
      try {
        urls.push({
          url: await erc721.methods.tokenURI(i.toString()).call(),
          symbol: await erc721.methods.symbol().call(),
          name: await erc721.methods.name().call(),
          owner: await erc721.methods.ownerOf(i.toString()).call()
        });
      } catch (e) {
        console.log("Breaking iteration because: " + (<any>e).message);
        break;
      }
    }

    const lastChangeAtTs = new Date();
    const ownerProfilesPromise = new ProfileLoader().profilesBySafeAddress(Environment.readonlyApiDb, urls.map(o => o.owner.toLowerCase()));
    const ownerProfilesLookup = await ownerProfilesPromise;

    return [<ProfileAggregate>{
      safe_address: forSafeAddress.toLowerCase(),
      type: "Erc721Tokens",
      payload: <Erc721Tokens> {
        __typename: "Erc721Tokens",
        lastUpdatedAt: lastChangeAtTs.toJSON(),
        balances: urls.map((o, i) => {
          return {
            token_address,
            token_no: i.toString(),
            token_owner_address: urls[i].owner,
            token_owner_profile: ownerProfilesLookup[urls[i].owner.toLowerCase()],
            token_symbol: urls[i].symbol,
            token_name: urls[i].name,
            token_url: urls[i].url
          };
        })
      }
    }];
  }
}
