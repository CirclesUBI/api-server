import {RpcGateway} from "./rpcGateway";
import {prisma_api_ro} from "./apiDbClient";
import {getPool} from "./resolvers/resolvers";
import {crcabi} from "./crcabi";

async function checkUBI(tokenAddress:string) {
  try {
    // Get Token contract
    const token = new (RpcGateway.get()).eth.Contract(<any>crcabi, tokenAddress);

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
    const token = new (RpcGateway.get()).eth.Contract(<any>crcabi, tokenAddress);

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

export async function ninetyDaysLater() {
  if (!process.env.INVITE_EOA_KEY)
    throw new Error(`No INVITE_EOA_KEY`);

  const executingEoa = RpcGateway.get().eth.accounts.privateKeyToAccount(process.env.INVITE_EOA_KEY);
  const profiles = await prisma_api_ro.profile.findMany({
    where: {
      circlesAddress: {
        not: null
      }
    }
  });

  const tokens = await getPool().query(
    `
    select * 
    from crc_signup_2
    where "user" = ANY($1::text[])`,
    [profiles.map(o => o.circlesAddress)]
  );

  for(let token of tokens.rows) {
    const checkResult = await checkUBI(token.token);
    if (checkResult) {
      await requestUBI(executingEoa, token.token);
    }
  }
}