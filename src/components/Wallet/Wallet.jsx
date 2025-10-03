import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useWeb3Context } from "../../context/useWeb3Context";
const Wallet = () => {
  const { handleWallet, web3State } = useWeb3Context();
  const { selectedAccount } = web3State;
  const navigateTo = useNavigate();
  useEffect(() => {
    if (selectedAccount) {
      navigateTo("/register-voter");
    }
  },[selectedAccount]);
  return (
    <>
      <div>Wallet Component</div>
      <button onClick={handleWallet}>Connect Waller</button>
    </>
  );
};

export default Wallet;
