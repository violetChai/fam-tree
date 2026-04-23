import { useState } from "react";
import api from "../services/api";
import { setToken } from "../utils/auth";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/register", {
                username,
                email,
                password,
            });

            // if backend returns token (recommended)
            if (res.data.token) {
                setToken(res.data.token);
                window.location.href = "/";
            } else {
                // fallback: send to login
                window.location.href = "/login";
            }

        } catch (err) {
            console.log(err.response?.data || err.message);
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleRegister}
                className="bg-white p-6 rounded shadow w-80 space-y-4"
            >
                <h2 className="text-xl font-bold">Register</h2>

                <input
                    className="border p-2 w-full"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className="border p-2 w-full"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="border p-2 w-full"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-blue-500 text-white px-4 py-2 w-full">
                    Create Account
                </button>
            </form>
        </div>
    );
}