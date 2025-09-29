export const getWeb3State = async () => {
  //check if metamask wallet exesist
  try {
    if (!window.ethereum) {
      throw new Error("Meatmask is not installed");
    }

    const accounts = window.ethereum.requests({
      "method": "eth_requestAccounts",
    });
  } catch (error) {
    console.error(error);
  }
};
