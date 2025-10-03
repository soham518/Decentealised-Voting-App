import { useRef } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";

const RegisterVoter = () => {
  const { web3State } = useWeb3Context();
const { contractInstance } = web3State;
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);

  const handleRegisterVoter = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      const name = nameRef.current.value;
      const age = ageRef.current.value;
      const gender = genderRef.current.value;

      console.log(name, age, gender);

      // await contractInstance.registerVoter(name, age, gender);

      // console.log("Voter registered successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>Register Voter</div>
      <form onSubmit={handleRegisterVoter}>
        <label>
          Name: <input type="text" ref={nameRef} />
        </label>
        <br />

        <label>
          Age: <input type="number" ref={ageRef} />
        </label>
        <br />

        <label>
          Gender: <input type="text" ref={genderRef} />
        </label>
        <br />

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterVoter;