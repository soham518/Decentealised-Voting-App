import { useEffect, useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";

const GetVoterList = () => {
  const { contractInstance } = useWeb3Context();
  const [voterList, setVoterList] = useState([]);
  useEffect(() => {
    const fetchVoterList = async () => {
      try {
        if (contractInstance) {
          const voters = await contractInstance.getVoterList();
          setVoterList(voters);
          console.log(voters);
        }
      } catch (error) {
        console.error(error);
      }
    };
    contractInstance && fetchVoterList();
  }, [contractInstance]);
  return (
    <>
      <h2>Voter List</h2>
      {voterList.map((voters, index) => {
        <li key={index}>{voters}</li>;
      })}
    </>
  );
};

export default GetVoterList;
