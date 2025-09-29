import abi from "../constant/abi.json";  //pendint... add abi of smartcontract
export const getWeb3State = async () => {
  //check if metamask wallet exesist
  try {
    if (!window.ethereum) {
      throw new Error("Meatmask is not installed");
    }

    const accounts = window.ethereum.request({
      "method": "eth_requestAccounts",
    });

    const selectedAccount = accounts[0];
    const chainIdHex = window.ethereum.request({
        "method":"eth_chainId"
    })
    const chainId = parseInt(chainIdHex,16);
    //getting provider and signer in order to access contract instance.
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractAddress = ""; //peending...contract address 
    const contractInstance = new ethers.Contract(contractAddress,abi,signer);

    return {contractInstance,selectedAccount,chainId};
  } catch (error) {
    console.error(error);
  }
};
