import {RpcGateway} from "../circles/rpcGateway";
import {crcAbi} from "../circles/abi/crcAbi";
import {Environment} from "../environment";

async function checkUBI(tokenAddress:string) {
  try {
    // Get Token contract
    const token = new (RpcGateway.get()).eth.Contract(<any>crcAbi, tokenAddress);

    // Check if UBI was already issued some days ago
    const lastTouched = await token.methods.lastTouched().call();
    const lastTouchedFromNow = Date.now() - parseInt(`${lastTouched}000`, 10);
    const days = (lastTouchedFromNow / 86400000).toFixed(2);

    // Check if contract was already stopped
    const isStopped = await token.methods.stopped().call();
    if (isStopped) {
      console.warn(`Token ${tokenAddress} is already dead.`);
    }

    // UBI can be requested
    console.log(`Found token ${tokenAddress}, not stopped and last touched ${days} ago`);
    return true;
  } catch (error) {
    console.error(`Could not check UBI for Token ${tokenAddress}: ${error}`);
  }

  return false;
}

async function requestUBI(account:any, tokenAddress:string) {
  try {
    // Get Token contract
    const token = new (RpcGateway.get()).eth.Contract(<any>crcAbi, tokenAddress);

    // Request UBI payout
    const txData = await token.methods.update().encodeABI();

    const tx = {
      from: account.address,
      to: tokenAddress,
      gas: "1000000",
      data: txData,
    };

    const txHash = await new Promise((resolve, reject) => {
      RpcGateway.get().eth.accounts.signTransaction(tx, account.privateKey)
        .then((signed) => {
          if (!signed.rawTransaction) {
            throw new Error(`!signed.rawTransaction`);
          }

        const transaction = RpcGateway.get().eth.sendSignedTransaction(signed.rawTransaction);

        transaction.on("confirmation", (confirmationNumber, { transactionHash }) => {
          resolve(transactionHash);
        });

        transaction.on("error", (error) => {
          reject(error);
        });
      });
    });

    console.log(`Requested UBI for token=${tokenAddress}, txHash=${txHash}`);
  } catch (error) {
    console.error(`Could not request UBI for Token ${tokenAddress}: ${error}`);
    throw error;
  }
}

export async function requestUbiForInactiveUsers() {
  if (!process.env.INVITE_EOA_KEY)
    throw new Error(`No INVITE_EOA_KEY`);

  const executingEoa = RpcGateway.get().eth.accounts.privateKeyToAccount(process.env.INVITE_EOA_KEY);
  const allUserSafeAddresses = await Environment.readonlyApiDb.profile.findMany({
    where: {
      circlesAddress: {
        not: null
      }
    },
    select: {
      circlesAddress: true
    }
  });

  const noUbiIn30DaysSql = `
    select m."to" as user
         , m.token
         , max(m.timestamp) as last_ubi
    from crc_minting_2 m
    where m."to" = ANY($1)
    group by m."to", m.token
    having max(m.timestamp) < now() - '30 days'::interval;
  `;

  const tokens = await Environment.indexDb.query(
      noUbiIn30DaysSql
    , [allUserSafeAddresses.map(o => o.circlesAddress)]
  );

  console.log(`Requesting the UBI of ${tokens.rowCount} inactive accounts (30 days no UBI request) ...`);

  for(let token of tokens.rows) {
    const checkResult = await checkUBI(token.token);
    if (checkResult) {
      console.log(`Getting UBI for token ${token.token} .. `);
      await requestUBI(executingEoa, token.token);
    } else {
      console.warn(`Token ${token.token} is already 'dead'.`);
    }
  }
}