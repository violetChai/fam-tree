import { useEffect, useState } from "react";
import api from "../services/api";
import FamilyTree from "../components/FamilyTree";

export default function Dashboard() {

  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchPeople = async () => {

      try {

        const res = await api.get("/people");

        const data = {
          name: "Family",
          children: res.data.map(p => ({
            name: p.name
          }))
        };

        setTreeData(data);

      } catch (err) {

        console.error("Error fetching people:", err);

      } finally {

        setLoading(false);

      }

    };

    fetchPeople();

  }, []);

  if (loading) {
    return (
      <div className="p-8 text-gray-500">
        Loading family tree...
      </div>
    );
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