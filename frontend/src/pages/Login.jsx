import { useState } from "react";
import api from "../services/api";
import { setToken } from "../utils/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });

            setToken(res.data.token);
            window.location.href = "/";
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded shadow w-80 space-y-4"
            >
                <h2 className="text-xl font-bold">Login</h2>

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
                    Login
                </button>
            </form>
        </div>
    );
}