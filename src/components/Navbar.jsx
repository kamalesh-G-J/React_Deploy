import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">EMS</Link>
      <ul className="navbar-nav">
        <li className="nav-item"><Link className="nav-link" to="/employees">Employees</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/add">Add</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/">Login</Link></li>
        {/* <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li> */}
      </ul>
    </div>
  </nav>
);

export default Navbar;