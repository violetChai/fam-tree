import { useState } from "react";
import api from "../services/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            window.location.href = "/";

        } catch (err) {

            setError("Invalid email or password");

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded shadow w-80 space-y-4"
            >
                <h2 className="text-xl font-bold">Login</h2>

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <input
                    className="border p-2 w-full"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="relative">

                    <input
                        className="border p-2 w-full"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2 text-sm"
                    >
                        {showPassword ? "🙈" : "👁"}
                    </button>

                </div>

                <button
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 w-full rounded
               hover:bg-blue-600
               active:scale-95
               transition
               disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>
        </div>
    );
}