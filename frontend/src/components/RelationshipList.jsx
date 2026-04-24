import { removeRelationship } from "../services/api";

export default function RelationshipList({ person }) {

    const handleRemove = async (relatedId, type) => {
        try {

            await removeRelationship(person._id, relatedId, type);

            // refresh page to update UI
            window.location.reload();

        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className="mt-6">

            <h2 className="text-xl font-semibold mb-4">Relationships</h2>

            {/* Parents */}
            <div className="mb-4">

                <h3 className="font-semibold">Parents</h3>

                {person.parents.length === 0 && <p>None</p>}

                {person.parents.map(parent => (

                    <div key={parent._id} className="flex items-center gap-4">

                        <span>{parent.name}</span>

                        <button
                            className="text-red-500"
                            onClick={() => handleRemove(parent._id, "parent")}
                        >
                            Remove
                        </button>

                    </div>

                ))}

            </div>

            {/* Children */}
            <div className="mb-4">

                <h3 className="font-semibold">Children</h3>

                {person.children.length === 0 && <p>None</p>}

                {person.children.map(child => (

                    <div key={child._id} className="flex items-center gap-4">

                        <span>{child.name}</span>

                        <button
                            className="text-red-500"
                            onClick={() => handleRemove(child._id, "child")}
                        >
                            Remove
                        </button>

                    </div>

                ))}

            </div>

            {/* Spouse */}
            <div>

                <h3 className="font-semibold">Spouse</h3>

                {!person.spouse && <p>None</p>}

                {person.spouse && (

                    <div className="flex items-center gap-4">

                        <span>{person.spouse.name}</span>

                        <button
                            className="text-red-500"
                            onClick={() => handleRemove(person.spouse._id, "spouse")}
                        >
                            Remove
                        </button>

                    </div>

                )}

            </div>

        </div>

    );
}