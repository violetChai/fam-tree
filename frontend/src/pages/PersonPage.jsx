import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function PersonPage() {

    const { id } = useParams();

    const [person, setPerson] = useState(null);
    const [name, setName] = useState("");
    const [birthYear, setBirthYear] = useState("");

    useEffect(() => {

        const loadPerson = async () => {
            const res = await api.get(`/people/${id}`);
            const found = res.data;

            setPerson(found);
            setName(found?.name || "");
            setBirthYear(found?.birthYear || "");
        };

        loadPerson();

    }, [id]);

    const handleSave = async () => {
        try {
            const res = await api.put(`/people/${id}`, {
                name,
                birthYear
            });

            setPerson(res.data);

            alert("Saved!");

        } catch (err) {
            console.log(err);
        }
    };

    if (!person) return <div className="p-8">Loading...</div>;

    return (

        <div className="p-8 space-y-4">

            <h1 className="text-2xl font-bold">
                Person Profile
            </h1>

            <input
                className="border p-2 w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />

            <input
                className="border p-2 w-full"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                placeholder="Birth Year"
            />

            <button
                className="bg-green-500 text-white px-4 py-2"
                onClick={handleSave}
            >
                Save
            </button>

        </div>

    );
}