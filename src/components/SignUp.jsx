import axios from "axios";
import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUsername] = useState("");
  const [roleName, setRoles] = useState("");
  const navigate = useNavigate();
  async function addNewEmployee(e) {
    e.preventDefault();
    const roleArray = roleName.split(",").map((role) => role.trim());
    try {
      const req = await axios.post("https://springboot-deploy-aajx.onrender.com/api/auth/register", {
        name,
        email,
        password,
        userName,
        roleName: roleArray,
      });
      alert(req.data || "Registered successfully!");
      navigate("/login");
    } catch (error) {
      alert("Error during Sign up",error);
    }
  }

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Sign Up Form</h3>
          <form onSubmit={addNewEmployee}>
            <div className="mb-3">
              <label className="form-label">Employee Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Roles</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter roles (comma-separated)"
                value={roleName}
                onChange={(e) => setRoles(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Sign Up
            </button>
          </form>
          <p className="mt-3 text-center">
            Already an user?? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
