import { useEffect, useState } from "react";
import api from "../services/api";
import FamilyTree from "../components/FamilyTree";

export default function Dashboard() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const fetchPeople = async () => {
            const res = await api.get("/people");
            setPeople(res.data);
        };

        fetchPeople();
    }, []);

    return (
        <div>
            <h1>Family Tree</h1>

            {/* Family Tree component */}
            <FamilyTree data={people} />

            {/* Optional debug list */}
            {people.map((p) => (
                <div key={p._id}>
                    {p.name}
                </div>
            ))}
        </div>
    );
}