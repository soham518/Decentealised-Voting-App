import { useWeb3Context } from "../../context/useWeb3Context";
const Wallet = () => {
  const {handleWallet} = useWeb3Context();
  return (
    <>
      <div>Wallet Component</div>
      {web3State.selectedAccount ? (
        <h2>Wallet Connected: {web3State.selectedAccount}</h2>
      ) : (
        <>
          <button onClick={handleWallet}>Connect Wallet</button>
          <h2>Wallet Not Connected</h2>
        </>
      )}
    </>
  );
};

export default Wallet;
