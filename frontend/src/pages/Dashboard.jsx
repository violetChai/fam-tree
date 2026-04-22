import { useEffect, useState } from "react";
import api from "../services/api";
import FamilyTree from "../components/FamilyTree";

export default function Dashboard() {

    const [treeData, setTreeData] = useState(null);

    useEffect(() => {

        const fetchPeople = async () => {

            const res = await api.get("/people");

            const data = {
                name: "Family",
                children: res.data.map(p => ({
                    name: p.name
                }))
            };

            setTreeData(data);

        };

        fetchPeople();

    }, []);

    return (
        <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">
                Family Tree
            </h1>

            {treeData && <FamilyTree data={treeData} />}

        </div>
    );

}