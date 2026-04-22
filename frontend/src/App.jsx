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

      {/* Tailwind test header (optional) */}
      <h1 className="text-3xl font-bold text-blue-600 bg-yellow-200 p-4">
        fam-tree
      </h1>

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