import { useState } from "react";
import { getWeb3State } from "../utils/getWeb3State";
import { Web3Context } from "./web3Context";
const Web3Provider = ({ children }) => {
  const [web3State, setWeb3State] = useState({
    contractInstance: null,
    selectedAccount: null,
    chainId: null,
  });
  const handleWallet = async () => {
    const { contractInstance, selectedAccount, chainId } = await getWeb3State();
    setWeb3State({ contractInstance, selectedAccount, chainId });
  };

  return (
    <>
      <Web3Context.Provider value={web3State}>{children}</Web3Context.Provider>
      <button onClick={handleWallet}>Connect to Wallet</button>
    </>
  );
};

export default Web3Provider;
