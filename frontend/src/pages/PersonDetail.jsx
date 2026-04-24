import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

import RelationshipControls from "../components/RelationshipControls";
import RelationshipList from "../components/RelationshipList";

export default function PersonDetail() {

    const { id } = useParams();

    const [person, setPerson] = useState(null);
    const [people, setPeople] = useState([]);

    useEffect(() => {

        const fetchData = async () => {

            const personRes = await api.get(`/people/${id}`);
            const peopleRes = await api.get("/people");

            setPerson(personRes.data);
            setPeople(peopleRes.data);

        };

        fetchData();

    }, [id]);

    if (!person) return <div>Loading...</div>;

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold">{person.name}</h1>

            <RelationshipList person={person} />

            <RelationshipControls person={person} people={people} />

        </div>
    );
}