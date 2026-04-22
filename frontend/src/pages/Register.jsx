import { useState } from "react";
import api from "../services/api";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await api.post("/auth/register", {
                username,
                email,
                password,
            });

            window.location.href = "/login";
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>

            <input
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Register</button>
        </form>
    );
}