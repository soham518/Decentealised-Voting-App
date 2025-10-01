import { Outlet, NavLink } from "react-router-dom";
import Web3Provider from "./context/Web3Provider";
import "./App.css";

function App() {
  return (
    <Web3Provider>
      <header style={styles.header}>
        <h1>Decentralised Voting Application</h1>
        <nav style={styles.nav}>
          <NavLink to="/" style={styles.link}>Home</NavLink>
          <NavLink to="/register-voter" style={styles.link}>Register Voter</NavLink>
          <NavLink to="/get-voter-list" style={styles.link}>Voter List</NavLink>
          <NavLink to="/register-candidate" style={styles.link}>Register Candidate</NavLink>
          <NavLink to="/get-candidate-list" style={styles.link}>Candidate List</NavLink>
          <NavLink to="/election-comission" style={styles.link}>Election Commission</NavLink>
        </nav>
      </header>

      <main style={styles.main}>
        <Outlet /> {/* Render the current route here */}
      </main>
    </Web3Provider>
  );
}

const styles = {
  header: {
    background: "#1a1a1a",
    color: "#fff",
    padding: "1rem",
  },
  nav: {
    display: "flex",
    gap: "1rem",
    marginTop: "0.5rem",
    flexWrap: "wrap",
  },
  link: {
    color: "#00bfff",
    textDecoration: "none",
  },
  main: {
    padding: "2rem",
  },
};

export default App;