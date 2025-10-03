import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dummy from "../Dummy";
import RegisterVoter from "../pages/Voter/RegisterVoter";
import GetVoterList from "../pages/Voter/GetVoterList";
import RegisterCandidate from "../pages/Candidate/RegisterCandidate";
import GetCandidateList from "../pages/Candidate/GetCandidateList";
import ElectionComission from "../pages/ElectionCommission/ElectionComission";
import Wallet from "../components/Wallet/Wallet";

const routes = createBrowserRouter([
  
      
      { path: "/", element: <Wallet /> }, // Home page
      { path: "register-voter", element: <RegisterVoter /> },
      { path: "get-voter-list", element: <GetVoterList /> },
      { path: "register-candidate", element: <RegisterCandidate /> },
      { path: "get-candidate-list", element: <GetCandidateList /> },
      { path: "election-comission", element: <ElectionComission /> },
    
 
]);

export default routes;