const getParsedTransaction = async () => {
  try {
    let myHeaders = new Headers();

    myHeaders.append("x-api-key", "API_KEY");

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://api.shyft.to/sol/v1/transaction/parsed?network=mainnet-beta&txn_signature=58VwAZsnHGz5Dyisi3vGUUMMWKHzVndHao3f6BSU7SaD76CD5vfipsnZDztZA9kjwNjwS6HQFRMsXAwBJUKR9W8Z",
      requestOptions as RequestInit
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.log(error);
  }
};

getParsedTransaction();
