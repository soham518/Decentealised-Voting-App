import { useEffect, useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";

const GetVoterList = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
  const [voterList, setVoterList] = useState([]);

  useEffect(() => {
    const fetchVoterList = async () => {
      try {
        if (contractInstance) {
          const voters = await contractInstance.getVoterList();
          setVoterList(voters);
          console.log("Fetched Voters:", voters);
        }
      } catch (error) {
        console.error("Error fetching voter list:", error);
      }
    };

    contractInstance && fetchVoterList();
  }, [contractInstance]);

  return (
    <>
      <h2>Voter List</h2>
      <ul>
        {voterList.map((voter, index) => (
          <li key={index}>
            <strong>ID:</strong> {voter.id?.toString()} <br />
            <strong>Name:</strong> {voter.name} <br />
            <strong>Age:</strong> {voter.age?.toString()} <br />
            <strong>Address:</strong> {voter.voterAddress} <br />
            <strong>Has Voted:</strong> {voter.hasVoted ? "Yes" : "No"}
          </li>
        ))}
      </ul>
    </>
  );
};

export default GetVoterList;