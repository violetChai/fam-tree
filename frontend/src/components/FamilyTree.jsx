import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function FamilyTree({ data, onSelect }) {

  const svgRef = useRef();

  useEffect(() => {

    if (!data) return;

    const width = 900;
    const height = 500;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg.attr("width", width).attr("height", height);

    const root = d3.hierarchy(data);

    const treeLayout = d3.tree().size([height - 100, width - 200]);
    treeLayout(root);

    const g = svg.append("g").attr("transform", "translate(100,50)");

    // LINKS
    g.selectAll("line")
      .data(root.links())
      .enter()
      .append("line")
      .attr("x1", d => d.source.y)
      .attr("y1", d => d.source.x)
      .attr("x2", d => d.target.y)
      .attr("y2", d => d.target.x)
      .attr("stroke", "#ccc");

    // NODES
    const nodes = g.selectAll("g")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.y},${d.x})`)
      .style("cursor", "pointer");

    nodes.append("circle")
      .attr("r", 24)
      .attr("fill", "#16a34a");

    nodes.append("text")
      .attr("text-anchor", "middle")
      .attr("y", 40)
      .text(d => d.data.name);

    // CLICK HANDLER (THIS IS THE CRITICAL PART)
    nodes.on("click", function (event, d) {
      if (onSelect) {
        onSelect(d.data._id);
      }
    });

  }, [data, onSelect]);

  return <svg ref={svgRef}></svg>;
}