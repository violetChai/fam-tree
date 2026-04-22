import { useEffect, useState } from "react";
import api from "../services/api";

import FamilyTree from "../components/FamilyTree";
import { buildTree } from "../utils/buildTree";

export default function TreePage() {

    const [tree, setTree] = useState(null);

    useEffect(() => {

        const load = async () => {

            const res = await api.get("/people");

            const data = buildTree(res.data);

            setTree(data);

        };

        load();

    }, []);

    return (

        <div className="p-8">

            <h2 className="text-2xl font-bold mb-4">
                Family Tree
            </h2>

            {tree && <FamilyTree data={tree} />}

        </div>

    );

}