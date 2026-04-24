import { addParent, addChild, addSpouse } from "../services/api";

export default function RelationshipControls({ person, people }) {

    const handleAddParent = async (parentId) => {
        await addParent(parentId, person._id);
        window.location.reload();
    };

    const handleAddChild = async (childId) => {
        await addChild(person._id, childId);
        window.location.reload();
    };

    const handleAddSpouse = async (spouseId) => {
        await addSpouse(person._id, spouseId);
        window.location.reload();
    };

    return (

        <div className="mt-6 space-y-4">

            <h2 className="text-xl font-semibold">Add Relationships</h2>

            <select onChange={(e) => handleAddParent(e.target.value)}>
                <option>Add Parent</option>
                {people.map(p => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                ))}
            </select>

            <select onChange={(e) => handleAddChild(e.target.value)}>
                <option>Add Child</option>
                {people.map(p => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                ))}
            </select>

            <select onChange={(e) => handleAddSpouse(e.target.value)}>
                <option>Add Spouse</option>
                {people.map(p => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                ))}
            </select>

        </div>
    );
}