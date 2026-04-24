import { useEffect, useState } from "react";
import api from "../services/api";
import FamilyTree from "../components/FamilyTree";
import { buildTree } from "../utils/buildTree";

export default function TreePage() {

    const [tree, setTree] = useState(null);

    const loadTree = async () => {
        const res = await api.get("/people");
        setTree(buildTree(res.data));
    };

    const [selectedPersonId, setSelectedPersonId] = useState(null);
    const [person, setPerson] = useState(null);

    useEffect(() => {
        loadTree();
    }, []);

    const refreshAll = async () => {
        const res = await api.get("/people");
        setTree(buildTree(res.data));

        if (selectedPersonId) {
            const personRes = await api.get(`/people/${selectedPersonId}`);
            setPerson(personRes.data);
        }
    };

    useEffect(() => {

        if (!selectedPersonId) return;

        const loadPerson = async () => {
            try {
                const res = await api.get(`/people/${selectedPersonId}`);
                setPerson(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        loadPerson();

    }, [selectedPersonId]);


    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Family Tree</h2>

            {tree && (
                <FamilyTree
                    data={tree}
                    onSelect={setSelectedPersonId}
                />
            )}

            {person && (
                <div className="fixed right-0 top-0 h-full w-72 bg-white border-l p-4 shadow-lg">

                    <h3 className="text-lg font-bold">{person.name}</h3>
                    <p>Birth year: {person.birthYear}</p>

                    <div className="mt-4">
                        <h4 className="font-semibold">Parents</h4>
                        {person.parents?.length === 0 && <p>None</p>}
                        {person.parents?.map(p => (
                            <p key={p._id}>{p.name}</p>
                        ))}
                    </div>

                    <div className="mt-4">
                        <h4 className="font-semibold">Children</h4>
                        {person.children?.length === 0 && <p>None</p>}
                        {person.children?.map(c => (
                            <p key={c._id}>{c.name}</p>
                        ))}
                    </div>

                    <div className="mt-4">
                        <h4 className="font-semibold">Spouse</h4>
                        {person.spouse ? <p>{person.spouse.name}</p> : <p>None</p>}
                    </div>

                    <button
                        className="mt-6 bg-gray-200 px-2 py-1"
                        onClick={() => {
                            setPerson(null);
                            setSelectedPersonId(null);
                        }}
                    >
                        Close
                    </button>

                </div>
            )}
        </div>
    );
}