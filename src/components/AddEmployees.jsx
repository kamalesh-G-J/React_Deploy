import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployees= () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUsername] = useState("");
  const [roleName, setRoles] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  useEffect(() => {
    if (!token || role !== "ROLE_ADMIN") {
      navigate("/");
    }
  }, []);
  async function addNewEmployee(e) {
  e.preventDefault();
  const roleArray = roleName.split(",").map((role) => role.trim());
  try {
    const req = await axios.post(
      "https://springboot-deploy-aajx.onrender.com/employee/add",
      {
        name,
        email,
        password,
        userName,
        roleName: roleArray,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert(req.data || "Employee added successfully!");
  } catch (error) {
    console.error("Error adding employee:", error);
    alert("Error during adding the employee");
  }
}


  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <h3 className="text-center mb-4"> Form</h3>
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
              ADD Employee
            </button>
          </form>
        
        </div>
      </div>
    </div>
  );
};

export default AddEmployees;
