import { useRef } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";

const VotingTimePeriod = () => {
  const { web3State } = useWeb3Context();
const { contractInstance } = web3State;
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  const handleSetVotingPeriod = async (e) => {
    e.preventDefault();

    try {
      // Convert input dates into UNIX timestamps
      const startDate = new Date(startTimeRef.current.value).getTime() / 1000; // seconds
      const endDate = new Date(endTimeRef.current.value).getTime() / 1000; // seconds

      const now = Math.floor(Date.now() / 1000);

      // Contract expects delay + duration
      const _startDelay = Math.max(startDate - now, 0); // avoid negatives
      const _duration = endDate - startDate;

      console.log("startDelay:", _startDelay, "duration:", _duration);

      if (contractInstance) {
        // await contractInstance.setVotingPeriod(_startDelay, _duration);
        // console.log("Voting period set successfully");
      }
    } catch (error) {
      console.error("Error setting voting period:", error);
    }
  };

  return (
    <>
      <h2>Set Voting Time Period</h2>
      <form onSubmit={handleSetVotingPeriod}>
        <label>
          Start Time:
          <input type="datetime-local" ref={startTimeRef} />
        </label>
        <br />
        <label>
          End Time:
          <input type="datetime-local" ref={endTimeRef} />
        </label>
        <br />
        <button type="submit">Set Voting Period</button>
      </form>
    </>
  );
};

export default VotingTimePeriod;