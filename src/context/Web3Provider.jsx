import { useState } from "react";
import { Web3Context } from "./web3Context";

const Web3Provider = ({children}) => {
  const [web3State, setWeb3State] = useState({
    contractInstance: null,
    selectedAccount: null,
    chainId: null,
  });

  return (
    <>
      <Web3Context.Provider value={web3State}>{children}</Web3Context.Provider>
      <button>Connect to Wallet</button>
    </>
  );
};

export default Web3Provider;
