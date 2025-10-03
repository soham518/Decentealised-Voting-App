import axios from "axios";
import { ethers } from "ethers";
import abi from "../constant/abi.json"; // add abi of smartcontract
export const getWeb3State = async () => {
  //check if metamask wallet exesist
  try {
    if (!window.ethereum) {
      throw new Error("Meatmask is not installed");
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const selectedAccount = accounts[0];
    const chainIdHex = await window.ethereum.request({
      method: "eth_chainId",
    });
    const chainId = parseInt(chainIdHex, 16);
    //getting provider and signer in order to access contract instance.
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractAddress = "0x3E36f99F50250Fedd9280400A627130a7885A83E"; //contract address

    const message =
      "Welcome to the Voting Dapp, please read and agree the terms and conditions";
    const signature = signer.signMessage(message);
    const dataSignature = {
      signature,
    };
    const res = await axios(
      `http://localhost:3000/api/authentication?${selectedAccount}`,
      dataSignature
    );
    console.log(res.data.token);
    // localStorage.set("token",res.data.token);
    const contractInstance = new ethers.Contract(contractAddress, abi, signer);
    console.log("selected account:", selectedAccount);
    console.log("contract instance:", contractInstance);
    console.log("chain Id:", chainId);
    return { contractInstance, selectedAccount, chainId };
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
