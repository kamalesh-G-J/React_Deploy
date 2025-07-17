import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GetEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); 
  console.log("Stored Role:", localStorage.getItem("role"));
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("https://springboot-deploy-aajx.onrender.com/employee/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data);
      } catch (err) {
        console.error("Error fetching employees", err);
        alert("Unauthorized or Error");
      }
    };

    fetchEmployees();
  }, [token]);

  const handleDelete = async (empID) => {
    try {
      await axios.delete(`https://springboot-deploy-aajx.onrender.com/employee/del/${empID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(employees.filter((emp) => emp.empID !== empID));
      alert("Employee deleted successfully");
    } catch (err) {
      console.error("Error deleting employee", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Employee List</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by employee name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            {role === "ROLE_ADMIN" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employees
            .filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((emp) => (
              <tr key={emp.empID}>
                <td>{emp.empID}</td>
                <td>
                  <Link to={`/task-assign/${emp.empID}`}>{emp.name}</Link>
                </td>
                <td>{emp.email}</td>
                {role === "ROLE_ADMIN" && (
                  <td>
                    <button
                      onClick={() => handleDelete(emp.empID)}
                      className="btn btn-danger btn-sm me-2"
                    >
                      Delete
                    </button>
                    <button className="btn btn-primary btn-sm">Edit</button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetEmployees;