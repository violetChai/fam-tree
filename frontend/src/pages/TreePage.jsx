import { useEffect, useState } from "react";
import api from "../services/api";
import FamilyTree from "../components/FamilyTree";
import { buildTree } from "../utils/buildTree";



export default function TreePage() {

    const [tree, setTree] = useState(null);
    const [people, setPeople] = useState([]);
    const [selectedPersonId, setSelectedPersonId] = useState(null);
    const [person, setPerson] = useState(null);

    const loadTree = async () => {
        const res = await api.get("/people");
        setPeople(res.data);
        setTree(buildTree(res.data));
    };


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

    const replaceParent = async (oldParentId, newParentId) => {
        await api.delete("/relationships", {
            data: {
                personId: selectedPersonId,
                relatedPersonId: oldParentId,
                type: "parent"
            }
        });

        await api.post("/relationships/parent", {
            parentId: newParentId,
            childId: selectedPersonId
        });

        refreshAll();
    };

    const replaceChild = async (oldChildId, newChildId) => {
        await api.delete("/relationships", {
            data: {
                personId: selectedPersonId,
                relatedPersonId: oldChildId,
                type: "child"
            }
        });

        await api.post("/relationships/child", {
            parentId: selectedPersonId,
            childId: newChildId
        });

        refreshAll();
    };

    const replaceSpouse = async (newSpouseId) => {
        if (person?.spouse) {
            await api.delete("/relationships", {
                data: {
                    personId: selectedPersonId,
                    relatedPersonId: person.spouse._id,
                    type: "spouse"
                }
            });
        }

        await api.post("/relationships/spouse", {
            personId: selectedPersonId,
            spouseId: newSpouseId
        });

        refreshAll();
    };


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
                        <h4 className="font-semibold">Replace Parent</h4>

                        <select
                            onChange={(e) => {
                                const newId = e.target.value;
                                const oldId = person.parents?.[0]?._id;
                                if (oldId && newId) {
                                    replaceParent(oldId, newId);
                                }
                            }}
                            className="border w-full"
                        >
                            <option value="">Select new parent</option>
                            {people.map(p => (
                                <option key={p._id} value={p._id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <h4 className="font-semibold">Replace Child</h4>

                        <select
                            onChange={(e) => {
                                const newId = e.target.value;
                                const oldId = person.children?.[0]?._id;
                                if (oldId && newId) {
                                    replaceChild(oldId, newId);
                                }
                            }}
                            className="border w-full"
                        >
                            <option value="">Select new child</option>
                            {people.map(p => (
                                <option key={p._id} value={p._id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <h4 className="font-semibold">Replace Spouse</h4>

                        <select
                            onChange={(e) => {
                                replaceSpouse(e.target.value);
                            }}
                            className="border w-full"
                        >
                            <option value="">Select spouse</option>
                            {people.map(p => (
                                <option key={p._id} value={p._id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
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