import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddPerson() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            await api.post("/people", { name });
            navigate("/");
        } catch (err) {
            console.log(err.response?.data || err.message);
            alert("You must be logged in to add a person");
        }
    };

    return (

        <div className="p-8">

            <h2 className="text-2xl font-bold mb-4">Add Person</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    placeholder="Name"
                    className="border p-2 w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button className="bg-blue-500 text-white px-4 py-2">
                    Add
                </button>

            </form>

        </div>

    );

}