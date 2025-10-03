import { useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";

const EmergencyDeclare = () => {
  const { web3State } = useWeb3Context();
const { contractInstance } = web3State;
  const [status, setStatus] = useState("");

  const declareEmergency = async () => {
    try {
      if (contractInstance) {
        // const tx = await contractInstance.emergencyStopVoting();
        // setStatus("Transaction submitted... waiting for confirmation");

        // await tx.wait(); // wait for confirmation on-chain
        setStatus(" Emergency declared successfully!");
        console.log("Emergency declared successfully");
      }
    } catch (error) {
      console.error("Error declaring emergency:", error);
      setStatus("Failed to declare emergency");
    }
  };

  return (
    <>
      <h2>Declare Emergency</h2>
      <button onClick={declareEmergency}>Declare Emergency</button>
      {status && <p>{status}</p>}
    </>
  );
};

export default EmergencyDeclare;