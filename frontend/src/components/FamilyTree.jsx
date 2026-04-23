import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useNavigate } from "react-router-dom";


export default function FamilyTree({ data }) {

  const svgRef = useRef();
  const [selected, setSelected] = useState(null);

  useEffect(() => {

    if (!data || !data.name) return;

    const width = 900;
    const height = 500;
    const margin = { top: 80, right: 80, bottom: 80, left: 80 };

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // clear previous render
    svg.selectAll("*").remove();

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const root = d3.hierarchy(data);

    const treeLayout = d3.tree()
      .size([
        height - margin.top - margin.bottom,
        width - margin.left - margin.right
      ]);

    treeLayout(root);

    // links
    g.selectAll("line")
      .data(root.links())
      .enter()
      .append("line")
      .attr("x1", d => d.source.y)
      .attr("y1", d => d.source.x)
      .attr("x2", d => d.target.y)
      .attr("y2", d => d.target.x)
      .attr("stroke", "#ccc");

    // nodes
    const nodes = g.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.y},${d.x})`);

    nodes.append("circle")
      .attr("r", 26)
      .attr("fill", "#16a34a");

    nodes.append("text")
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .text(d => d.data.name);

    // CLICK HANDLER
    nodes.on("click", (event, d) => {
      setSelected(d.data);
    });

  }, [data]);

  return (
    <div className="flex">

      <svg ref={svgRef}></svg>

      {selected && (
        <div className="w-64 p-4 border-l">

          <h3 className="text-lg font-bold">
            {selected.name}
          </h3>

          <p>Birth year: {selected.birthYear}</p>

          <button
            className="mt-4 bg-gray-200 px-2 py-1"
            onClick={() => setSelected(null)}
          >
            Close
          </button>

        </div>
      )}

    </div>
  );
}