import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (

        <nav className="flex justify-between items-center p-4 bg-white shadow-md">

            <Link to={token ? "/tree" : "/"} className="font-bold text-xl">
                Family Tree
            </Link>

            <div className="flex items-center gap-4">

                {token && (
                    <>
                        <Link to="/add-person">Add Person</Link>
                    </>
                )}

                {!token ? (
                    <>
                        <Link
                            to="/login"
                            className="px-3 py-1 border rounded"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="px-3 py-1 bg-blue-500 text-white rounded"
                        >
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <span className="text-gray-600">
                            Hi, {user?.username}
                        </span>

                        <button
                            onClick={logout}
                            className="px-3 py-1 bg-red-500 text-white rounded"
                        >
                            Logout
                        </button>
                    </>
                )}

            </div>

        </nav>

    );
}