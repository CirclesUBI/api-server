import {Context} from "../../context";
import {
  Maybe,
  ProfileEvent,
  QueryEventByTransactionHashArgs,
  QueryEventsArgs,
  RequireFields
} from "../../types";
import {loadAllProfilesBySafeAddress} from "./profiles";
import {Pool} from "pg";
import {PrismaClient} from "../../api-db/client";

export function events(pool:Pool, prisma:PrismaClient) {
  return async (
    parent: any,
    args: RequireFields<QueryEventsArgs, "safeAddress">
        | RequireFields<QueryEventByTransactionHashArgs, "safeAddress" | "transactionHash">,
    context: Context) => {

    //const maxPageSizeInBlocks = 518400; // ~ 30 days
    const maxPageSizeInBlocks = 518400 * 12; // ~ 30 days
    const safeAddress:string = args.safeAddress.toLowerCase();
    const transactionHash:Maybe<string> = (<any>args).transactionHash ?? null;
    const types:Maybe<string[]> = args.types ?? null;

    const validTypes: { [x: string]: boolean } = {
      "crc_signup": true,
      "crc_hub_transfer": true,
      "crc_trust": true,
      "crc_minting": true,
      "eth_transfer": true,
      "gnosis_safe_eth_transfer": true
    };

    let selectedTypes: string[];
    if (!types) {
      selectedTypes = Object.keys(validTypes);
    } else {
      selectedTypes = types.filter((o:any) => validTypes[o]);
    }

    if (!safeAddress && !transactionHash) {
      throw new Error(`One of the two parameters have to be specified: 'safeAddress', transactionHash`);
    }

    let whereBlock = ``;
    if ((<any>args).fromBlock || (<any>args).toBlock) {
      const queryEventsArgs:RequireFields<QueryEventsArgs, "safeAddress"> = args;
      let fromBlockInt: number|null = null;
      let toBlockInt: number|null = null;
      if (queryEventsArgs.fromBlock) {
        fromBlockInt = parseInt(queryEventsArgs.fromBlock.toString());
      }
      if (queryEventsArgs.toBlock) {
        toBlockInt = parseInt(queryEventsArgs.toBlock.toString());
      }
      if (fromBlockInt && !toBlockInt) {
        toBlockInt = fromBlockInt + maxPageSizeInBlocks;
      }
      if (!fromBlockInt && toBlockInt) {
        toBlockInt = toBlockInt - maxPageSizeInBlocks;
      }
      whereBlock = ` and block_number >= ${fromBlockInt} and block_number <= ${toBlockInt}`;
    } else {
      whereBlock = ` and block_number > (select max(number) from block) - ${maxPageSizeInBlocks} /* approx. one month */ `;
    }

    const transactionsQuery = `select transaction_id
                      , timestamp
                      , block_number
                      , transaction_index
                      , transaction_hash
                      , type
                      , safe_address
                      , direction
                      , value
                      , obj as payload
                   from crc_safe_timeline
                   where ((safe_address != '' and safe_address = lower($1)) or $1 = '')
                     and type=ANY($2)
                     and (($3 != '' and transaction_hash = $3) or ($3 = ''))
                     ${whereBlock}
                   order by timestamp desc;`;

    const transactionsQueryParameters = [safeAddress?.toLowerCase() ?? "", selectedTypes, transactionHash ?? ""];
    const timeline = await pool.query(transactionsQuery, transactionsQueryParameters);
    const classify = (row: any) => {
      switch (row.type) {
        case "crc_hub_transfer":
          row.payload.__typename = "CrcHubTransfer";
          return "CrcHubTransfer";
        case "crc_organisation_signup":
          row.payload.__typename = "CrcTrust";
          return "CrcTrust";
        case "crc_signup":
          row.payload.__typename = "CrcSignup";
          return "CrcSignup";
        case "crc_trust":
          row.payload.__typename = "CrcTrust";
          return "CrcTrust";
        case "crc_minting":
          row.payload.__typename = "CrcMinting";
          return "CrcMinting";
        case "eth_transfer":
          row.payload.__typename = "EthTransfer";
          return "EthTransfer";
        case "gnosis_safe_eth_transfer":
          row.payload.__typename = "GnosisSafeEthTransfer";
          return "GnosisSafeEthTransfer";
        default:
          return null;
      }
    };

    const allSafeAddressesDict: { [safeAddress: string]: any } = {};
    timeline.rows
      .filter((o: ProfileEvent) => classify(o) != null)
      .forEach((o: ProfileEvent) => {
        const payload = o.payload;
        if (!payload || !payload.__typename) {
          return;
        }
        switch (payload.__typename) {
          case "CrcSignup":
            allSafeAddressesDict[payload.user] = null;
            break;
          case "CrcTrust":
            allSafeAddressesDict[payload.address] = null;
            allSafeAddressesDict[payload.can_send_to] = null;
            break;
          case "CrcTokenTransfer":
            allSafeAddressesDict[payload.from] = null;
            allSafeAddressesDict[payload.to] = null;
            break;
          case "CrcHubTransfer":
            allSafeAddressesDict[payload.from] = null;
            allSafeAddressesDict[payload.to] = null;
            payload.transfers.forEach(t => {
              allSafeAddressesDict[t.from] = null;
              allSafeAddressesDict[t.to] = null;
            });
            break;
          case "CrcMinting":
            allSafeAddressesDict[payload.from] = null;
            allSafeAddressesDict[payload.to] = null;
            break;
          case "EthTransfer":
            allSafeAddressesDict[payload.from] = null;
            allSafeAddressesDict[payload.to] = null;
            break;
          case "GnosisSafeEthTransfer":
            allSafeAddressesDict[payload.from] = null;
            allSafeAddressesDict[payload.to] = null;
            break;
        }
      });

    const allSafeAddressesArr = Object.keys(allSafeAddressesDict)
      .map(o => o.toLowerCase());

    const profilesBySafeAddress = await loadAllProfilesBySafeAddress(context, prisma, allSafeAddressesArr);

    timeline.rows
      .filter((o: ProfileEvent) => classify(o) != null)
      .forEach((o: ProfileEvent) => {
        const payload = o.payload;
        if (!payload || !payload.__typename) {
          return;
        }
        switch (payload.__typename) {
          case "CrcSignup":
            payload.user_profile = profilesBySafeAddress[payload.user];
            break;
          case "CrcTrust":
            payload.address_profile = profilesBySafeAddress[payload.address];
            payload.can_send_to_profile = profilesBySafeAddress[payload.can_send_to];
            break;
          case "CrcTokenTransfer":
            payload.from_profile = profilesBySafeAddress[payload.from];
            payload.to_profile = profilesBySafeAddress[payload.to];
            break;
          case "CrcHubTransfer":
            payload.from_profile = profilesBySafeAddress[payload.from];
            payload.to_profile = profilesBySafeAddress[payload.to];
            payload.transfers.forEach(t => {
              t.from_profile = profilesBySafeAddress[t.from];
              t.to_profile = profilesBySafeAddress[t.to];
            });
            break;
          case "CrcMinting":
            payload.from_profile = profilesBySafeAddress[payload.from];
            payload.to_profile = profilesBySafeAddress[payload.to];
            break;
          case "EthTransfer":
            payload.from_profile = profilesBySafeAddress[payload.from];
            payload.to_profile = profilesBySafeAddress[payload.to];
            break;
          case "GnosisSafeEthTransfer":
            payload.from_profile = profilesBySafeAddress[payload.from];
            payload.to_profile = profilesBySafeAddress[payload.to];
            break;
        }
      });

    return timeline.rows
      .filter((o: any) => classify(o) != null)
      .map((o: any) => {
        return <ProfileEvent>{
          __typename: "ProfileEvent",
          id: o.id,
          safe_address: o.safe_address,
          safe_address_profile: profilesBySafeAddress[o.safe_address],
          type: o.type,
          block_number: o.block_number,
          direction: o.direction,
          timestamp: o.timestamp,
          value: o.value,
          transaction_hash: o.transaction_hash,
          transaction_index: o.transaction_index,
          payload: {
            __typename: classify(o),
            ...o.payload
          }
        }
      });
  }
}