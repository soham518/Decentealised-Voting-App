import { useEffect, useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";

const GetCandidateList = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
  const [candidateList, setCandidateList] = useState([]);

  useEffect(() => {
    const fetchCandidateList = async () => {
      try {
        if (contractInstance) {
          const candidates = await contractInstance.getCandidateList();
          setCandidateList(candidates);
          console.log("Candidates fetched:", candidates);
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    contractInstance && fetchCandidateList();
  }, [contractInstance]);

  return (
    <>
      <h2>Candidate List</h2>
      {candidateList.length === 0 ? (
        <p>No candidates found</p>
      ) : (
        <ul>
          {candidateList.map((candidate, index) => (
            <li key={index}>
              Name: {candidate.name} <br />
              Age: {candidate.age?.toString()} <br />
              Party: {candidate.party}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default GetCandidateList;