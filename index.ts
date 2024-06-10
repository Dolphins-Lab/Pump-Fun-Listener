import { PublicKey } from "@solana/web3.js";
import { Connection } from "@solana/web3.js";

const startMonitoringPumpFun = async () => {
  try {
    // PUMP FUN ADDRESS
    const publicKey = new PublicKey(
      "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
    );
    // Use default RPC but helius or other provider is recommended
    const connection = new Connection("https://api.mainnet-beta.solana.com", {
      wsEndpoint: "wss://api.mainnet-beta.solana.com",
    });

    connection.onLogs(
      publicKey,
      (logs, context) => {
        if (
          logs.logs &&
          // Look for this instruction in the logs
          logs.logs.some((log) =>
            log.includes("Program log: Instruction: InitializeMint2")
          )
        ) {
          console.log("Logs:", logs);
          console.log("Context:", context);
        }
      },
      "confirmed"
    );
  } catch (error) {
    console.log(error);
  }
};

startMonitoringPumpFun();
