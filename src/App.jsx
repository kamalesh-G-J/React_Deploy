import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import GetEmployees from "./components/GetEmployees";
import AddEmployees from "./components/AddEmployees";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/employees" element={<GetEmployees />} />
       <Route path="/add" element={<AddEmployees />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  </Router>
);

export default App;