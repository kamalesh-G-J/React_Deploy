import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import GetEmployees from "./components/GetEmployees";
import AddEmployees from "./components/AddEmployees";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import TaskAssign from "./components/TaskAssign";
const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/employees" element={<GetEmployees />} />
       <Route path="/add" element={<AddEmployees />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/task-assign/:empID" element={<TaskAssign />} />
    </Routes>
  </Router>
);

export default App;