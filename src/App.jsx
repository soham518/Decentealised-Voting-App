import "./App.css";
import Dummy from "./Dummy";
import Web3Provider from "./context/Web3Provider";
import RegisterCandidate from "./pages/Candidate/RegisterCandidate";
import RegisterVoter from "./pages/Voter/RegisterVoter";

function App() {
  return (
    <>
      <Web3Provider>
        <Dummy></Dummy>
        {/* <RegisterCandidate></RegisterCandidate> */}
        <RegisterVoter></RegisterVoter>
      </Web3Provider>
    </>
  );
}

export default App;
