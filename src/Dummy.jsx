import { createContext } from "react";
import { Web3Context } from "./context/web3Context";
const Dummy = () => {
  const { contractInstance, selectedAccount, chainId } =
    createContext(Web3Context);
  
 console.log(contractInstance, selectedAccount, chainId);
  return (
    <>
      <div>Dummy component</div>
    </>
  );
};

export default Dummy;
