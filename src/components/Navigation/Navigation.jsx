import { Link } from "react-router"

const Navigation = () => {
  return (
   <>
    <h2>Navbar</h2>
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register-voter">register-voter</Link></li>
        <li><Link to="/get-voter-list">get-voter-list</Link></li>
        <li><Link to="/register-candidate">register-candidate</Link></li>
        <li><Link to="/get-candidate-list">get-candidate-list</Link></li>
        <li><Link to="/election-comission">election-comission</Link></li>
    </ul>
   </>
  )
}

export default Navigation