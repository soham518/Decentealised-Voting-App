import { useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context"
const DisplayWinner = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
  const [winner,setWinner] = useState(null);

  const getWinner = async() => {
    try{
    if(contractInstance) {
    const winnerCandidateAddress = await contractInstance.winner();
    if(winnerCandidateAddress!="0x0000000000000000000000000000000000000000"){
      setWinner(winnerCandidateAddress);
    console.log("Winner fetched successfully");
    } else{
      console.log("no winner yet!");
    }
   
    } else {
      console.error("contract Instance not available");
    }
    } catch(error) {
      console.error("failed to get winner",error);
    }
  }

  return (
   <>
    <h2>Display Winner</h2>
   <button onClick={getWinner}>Get Winner</button>
   {winner && <h3>winner: {winner}</h3>}
   </>
  )
}

export default DisplayWinner