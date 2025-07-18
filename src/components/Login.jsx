import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_HOSTING_URL;

  const token = localStorage.getItem("token");

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const request = await axios.post(
        `${BACKEND_URL}/api/auth/login`,
        {
          userName,
          password,
        }
      );
      const token = request.data.token;
      const role = request.data.role;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      console.log(request.data.userName);
      console.log(request.data.role);
      console.log(token);
      alert("Login Successful");
      navigate("/employees");
    } catch (e) {
      console.log("Login Error", e);
      alert("Invalid Cred");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Login Page</h2>
            </div>
            <div className="card-body">
              {!token ? (
                <>
                  <form>
                    <div className="row mb-3">
                      <label className="col-md-3 control-label">Username</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter username"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-md-3 control-label">Password</label>
                      <div className="col-md-9">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <button className="btn btn-primary" onClick={handleLogin}>
                        Submit
                      </button>
                    </div>
                  </form>
                  <p>
                    Create an account? <Link to="/register">Register</Link>
                  </p>
                </>
              ) : (
                <div className="text-center">
                  <h5>You are already logged in</h5>
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
