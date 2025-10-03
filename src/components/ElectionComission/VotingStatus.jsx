import { useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";

const VotingStatus = () => {
  const { web3State } = useWeb3Context();
const { contractInstance } = web3State;
  const [status, setStatus] = useState(null);

  const getVotingStatus = async () => {
    try {
      if (contractInstance) {
        const result = await contractInstance.getVotingStatus(); 
        // result will be a BigNumber (0,1,2)
        const statusIndex = Number(result);

        // map enum values
        const statuses = ["Not Started", "In Progress", "Ended"];
        setStatus(statuses[statusIndex]);
      } else {
        console.error("Contract instance missing");
      }
    } catch (error) {
      console.error("Error getting voting status", error);
    }
  };

  return (
    <>
      <h2>Voting Status</h2>
      <button onClick={getVotingStatus}>Get voting status</button>
      {status && <p>Current status: {status}</p>}
    </>
  );
};

export default VotingStatus;