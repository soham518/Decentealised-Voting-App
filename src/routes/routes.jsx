import { createBrowserRouter } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import Wallet from "../components/Wallet/Wallet";
import GetCandidateList from "../pages/Candidate/GetCandidateList";
import RegisterCandidate from "../pages/Candidate/RegisterCandidate";
import ElectionComission from "../pages/ElectionCommission/ElectionComission";
import GetVoterList from "../pages/Voter/GetVoterList";
import RegisterVoter from "../pages/Voter/RegisterVoter";
const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        
        <Wallet />
      </div>
    ),
  }, // Home page
  {
    path: "register-voter",
    element: (
      <div>
        <Navigation></Navigation>
        <RegisterVoter />
      </div>
    ),
  },
  {
    path: "get-voter-list",
    element: (
      <div>
        <Navigation></Navigation>
        <GetVoterList />
      </div>
    ),
  },
  {
    path: "register-candidate",
    element: (
      <div>
        <Navigation></Navigation>
        <RegisterCandidate />
      </div>
    ),
  },
  {
    path: "get-candidate-list",
    element: (
      <div>
        <Navigation></Navigation>
        <GetCandidateList />
      </div>
    ),
  },
  {
    path: "election-comission",
    element: (
      <div>
        <Navigation></Navigation>
        <ElectionComission />
      </div>
    ),
  },
]);

export default routes;
