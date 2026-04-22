import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function FamilyTree({ data }) {

  const svgRef = useRef();

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
    g.selectAll("circle")
      .data(root.descendants())
      .enter()
      .append("circle")
      .attr("cx", d => d.y)
      .attr("cy", d => d.x)
      .attr("r", 20)
      .attr("fill", "#16a34a");

    // labels
    g.selectAll("text")
      .data(root.descendants())
      .enter()
      .append("text")
      .attr("x", d => d.y)
      .attr("y", d => d.x - 30)
      .attr("text-anchor", "middle")
      .text(d => d.data.name);

  }, [data]);

  return <svg ref={svgRef}></svg>;
}