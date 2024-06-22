import { PublicKey } from "@solana/web3.js";
import { Connection } from "@solana/web3.js";
import { getParsedTransaction } from "./parseTransaction";

const startMonitoringPumpFun = async () => {
  try {
    // PUMP FUN ADDRESS
    const publicKey = new PublicKey(
      "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
    );
    // Use default RPC but shyft or helius or other provider is recommended
    const connection = new Connection("https://api.mainnet-beta.solana.com", {
      wsEndpoint: "wss://api.mainnet-beta.solana.com",
    });

    connection.onLogs(
      publicKey,
      async (logs, context) => {
        if (
          logs.logs &&
          // Look for this instruction in the logs
          logs.logs.some((log: any) =>
            log.includes("Program log: Instruction: InitializeMint2")
          )
        ) {
          console.log(logs.signature, " Received Signature");
          // console.log(logs, "Logs");
          console.log(context, "Context");

          const signature = logs.signature;

          if (signature) {
            const response = await getParsedTransaction(String(signature));

            if (response !== null) {
              const { data, poolInfoAddress } = response;
              console.log(data, "Parsed Transaction Details");
              console.log("Pool Info Address:", poolInfoAddress);
            }
          }
        }
      },
      "confirmed"
    );
  } catch (error) {
    console.log(error);
  }
};

startMonitoringPumpFun();
