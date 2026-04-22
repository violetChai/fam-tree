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
        <form onSubmit={handleLogin}>
            <h2>Login</h2>

            <input
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
        </form>
    );
}