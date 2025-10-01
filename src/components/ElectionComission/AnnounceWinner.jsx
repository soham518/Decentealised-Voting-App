import { useEffect, useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
const AnnounceWinner = () => {
  const { contractInstance } = useWeb3Context();
  const [winner, setWinner] = useState(null);
  
    const getWinner = async () => {
      try {
        if (contractInstance) {
          const winnerCandidate = await contractInstance.announceVotingResult();
          console.log(winnerCandidate);
          setWinner(winnerCandidate);
        }
      } catch (error) {
        console.error("Error fetching winner:",error);
      }
    };

  return (
    <>
      <h2>Announce Winner</h2>
      {
        winner? (
           <p><strong>Winner:</strong> {winner}</p>
        ) : (
            <button onClick={getWinner}>Announce Winner</button>
        )
      }
    </>
  );
};

export default AnnounceWinner;
