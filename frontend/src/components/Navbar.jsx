import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (

        <nav className="bg-gray-800 text-white p-4 flex justify-between">

            <h1 className="font-bold">Family Tree</h1>

            <div className="space-x-4">

                <Link to="/">Dashboard</Link>

                <Link to="/add-person">Add Person</Link>

                <Link to="/tree">Tree</Link>

                <button onClick={logout}>Logout</button>

            </div>

        </nav>

    );

}