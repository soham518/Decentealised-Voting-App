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
          console.log(candidates);
        }
      } catch (error) {
        console.error(error);
      }
    };
    contractInstance && fetchCandidateList();
  }, [contractInstance]);
  return (
    <>
      <h2>Candidate List</h2>

      {candidateList.map((candidates, index) => {
        <li key={index}> {candidates}</li>
      })}
    </>
  );
};

export default GetCandidateList;
