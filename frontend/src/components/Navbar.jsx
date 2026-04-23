import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">

            <h1 className="font-bold">Family Tree</h1>

            <div className="space-x-4 flex items-center">

                <Link to="/">Dashboard</Link>
                <Link to="/add-person">Add Person</Link>
                <Link to="/tree">Tree</Link>

                {/* AUTH SECTION */}
                {!token ? (
                    <>
                        <Link to="/login" className="text-blue-300">
                            Login
                        </Link>

                        <Link to="/register" className="text-green-300">
                            Register
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={logout}
                        className="text-red-300"
                    >
                        Logout
                    </button>
                )}

            </div>

        </nav>
    );
}