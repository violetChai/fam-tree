import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddPerson from "./pages/AddPerson";
import TreePage from "./pages/TreePage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-person" element={<AddPerson />} />
        <Route path="/tree" element={<TreePage />} />
      </Routes>

    </div>
  );
}

export default App;