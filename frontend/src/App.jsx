import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddPerson from "./pages/AddPerson";
import TreePage from "./pages/TreePage";
import ProtectedRoute from "./components/ProtectedRoute";
import PersonDetail from "./pages/PersonDetail";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-person" element={<ProtectedRoute> <AddPerson /> </ProtectedRoute>} />
        <Route path="/tree" element={<ProtectedRoute> <TreePage /> </ProtectedRoute>} />
        <Route path="/person/:id" element={<PersonDetail />} />
      </Routes>

    </div>
  );
}

export default App;