// https://docs.shyft.to/solana-apis/transactions/transaction-apis#parsed-transaction

export const getParsedTransaction = async (txnId: string) => {
  try {
    const url = `https://api.shyft.to/sol/v1/transaction/parsed?network=mainnet-beta&txn_signature=${txnId}`;

    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "SHYFT_API_KEY");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    if (data.success) {
      console.log("Parsed transaction details:", data.result);
      const firstAction = data.result.actions[0];
      let poolInfoAddress = "";

      if (
        firstAction &&
        firstAction.info &&
        firstAction.info.receiver_address
      ) {
        poolInfoAddress = firstAction.info.receiver_address;
      }

      console.log("Actions:");
      data.result.actions.forEach((action: any, index: number) => {
        console.log(`Action ${index + 1}:`, action);
      });
      console.log("Events:");
      data.result.events.forEach((event: any, index: number) => {
        console.log(`Event ${index + 1}:`, event);
      });

      return { data, poolInfoAddress };
    } else {
      console.log("Failed to fetch transaction details:", data.message);
      return { data, poolInfoAddress: "" };
    }
  } catch (error) {
    console.log("Error fetching parsed transaction:", error);
    return null;
  }
};
