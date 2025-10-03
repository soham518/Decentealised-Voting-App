import { useWeb3Context } from "../../context/useWeb3Context";
import { useRef, useState } from "react";
const CastVote = () => {
  const { web3State } = useWeb3Context();
const { contractInstance } = web3State;
  const [status, setStatus] = useState("");
  const voterIdRef = useRef(null);
  const candidateIdRef = useRef(null);

  const handleCastVote = async (e) => {
    e.preventDefault();
    const voterId = voterIdRef.current.value;
    const candidateId = candidateIdRef.current.value;
    try {
      if(contractInstance){
       const tx = await contractInstance.castVote(voterId, candidateId);
      await tx.wait();
      console.log("Vote Cast succesful");
      setStatus("Vote cast successfully");
      }  else {
        console.error("contract instance unavailable");
      }
      
    } catch (error) {
      console.error("Failed to cast vote", error);
    }
  };

  return (
    <>
      <div>CastVote</div>
      <form onSubmit={handleCastVote}>
        <label>
          Voter Id:
          <input type="number" ref={voterIdRef} />
        </label>
        <label>
          Candidate Id:
          <input type="number" ref={candidateIdRef} />
        </label>
        <button type="submit">Vote</button>
        <h3>Status:{status}</h3>
      </form>
    </>
  );
};

export default CastVote;
