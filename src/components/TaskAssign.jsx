import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TaskAssign = () => {
  const { empID } = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employeeName, setEmployeeName] = useState("");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [editingStatusId, setEditingStatusId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");

  useEffect(() => {
    const fetchEmployeeName = async () => {
      try {
        const response = await axios.get("https://springboot-deploy-aajx.onrender.com/employee/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const employee = response.data.find(emp => String(emp.empID) === String(empID));
        setEmployeeName(employee ? employee.name : "");
      } catch {
        setEmployeeName("");
      }
    };
    fetchEmployeeName();
  }, [empID, token]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`https://springboot-deploy-aajx.onrender.com/todo/get/${empID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [empID, token]);

  const handleAssignTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://springboot-deploy-aajx.onrender.com/todo/assign/${empID}`, {
        title: newTaskTitle,
        status: newTaskStatus,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewTaskTitle("");
      setNewTaskStatus("");
      // Refresh tasks
      setLoading(true);
      const response = await axios.get(`https://springboot-deploy-aajx.onrender.com/todo/get/${empID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch {
      setError("Failed to assign task");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusEdit = (taskId, currentStatus) => {
    setEditingStatusId(taskId);
    setEditedStatus(currentStatus);
  };

  const handleStatusSave = async (taskId) => {
    try {
      await axios.put(`https://springboot-deploy-aajx.onrender.com/todo/update-status/${taskId}`, {
        status: editedStatus,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditingStatusId(null);
      setEditedStatus("");
      // Refresh tasks
      setLoading(true);
      const response = await axios.get(`https://springboot-deploy-aajx.onrender.com/todo/get/${empID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch {
      setError("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Tasks for {employeeName ? employeeName : `Employee ${empID}`}</h2>
      {role === "ROLE_ADMIN" && tasks.length === 0 && (
        <form onSubmit={handleAssignTask} className="mb-3">
          <div className="mb-2">
            <label className="form-label">Task</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter new task title"
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={newTaskStatus}
              onChange={e => setNewTaskStatus(e.target.value)}
              required
            >
              <option value="">Select status</option>
              <option value="Yet to start">Yet to start</option>
              <option value="In progress">In progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button className="btn btn-success" type="submit">Assign Task</button>
        </form>
      )}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            {role === "ROLE_USER" && <th>Edit Status</th>}
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr><td colSpan={role === "ROLE_USER" ? 3 : 2}>No tasks assigned.</td></tr>
          ) : (
            tasks.map((task, idx) => (
              <tr key={idx}>
                <td>{task.title}</td>
                <td>
                  {role === "ROLE_USER" && editingStatusId === task.taskId ? (
                    <>
                      <select
                        className="form-control d-inline w-auto"
                        value={editedStatus}
                        onChange={e => setEditedStatus(e.target.value)}
                      >
                        <option value="Yet to start">Yet to start</option>
                        <option value="In progress">In progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <button className="btn btn-success btn-sm ms-2" onClick={() => handleStatusSave(task.taskId)}>
                        Save
                      </button>
                      <button className="btn btn-secondary btn-sm ms-2" onClick={() => setEditingStatusId(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    task.status || 'No status'
                  )}
                </td>
                {role === "ROLE_USER" && (
                  <td>
                    {editingStatusId !== task.taskId && (
                      <button className="btn btn-primary btn-sm" onClick={() => handleStatusEdit(task.taskId, task.status)}>
                        Edit Status
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskAssign; 