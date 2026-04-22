import { useEffect, useState } from "react";
import api from "../services/api";
import FamilyTree from "../components/FamilyTree";
import { buildTree } from "../utils/buildTree";

export default function Dashboard() {

  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchPeople = async () => {

      try {

        const res = await api.get("/people");

        console.log("RAW API DATA:", res.data);

        const tree = buildTree(res.data);

        console.log("TREE DATA:", tree);

        setTreeData(tree);

      } catch (err) {

        console.error(err);
        setError("Failed to load family tree");

      } finally {

        setLoading(false);

      }

    };

    fetchPeople();

  }, []);

  if (loading) {
    return <div className="p-8">Loading family tree...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Family Tree
      </h1>

      {treeData && <FamilyTree data={treeData} />}

    </div>
  );
}