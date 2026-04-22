import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function FamilyTree({ data }) {

  const svgRef = useRef();

  useEffect(() => {

    if (!data) return;

    const width = 900;
    const height = 500;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove();

    const root = d3.hierarchy(data);

    const treeLayout = d3.tree()
      .size([width - 100, height - 100]);

    treeLayout(root);

    svg.selectAll("line")
      .data(root.links())
      .enter()
      .append("line")
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)
      .attr("stroke", "#ccc");

    svg.selectAll("circle")
      .data(root.descendants())
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 20)
      .attr("fill", "#3b82f6");

    svg.selectAll("text")
      .data(root.descendants())
      .enter()
      .append("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y - 30)
      .text(d => d.data.name)
      .attr("text-anchor", "middle");

  }, [data]);

  return <svg ref={svgRef}></svg>;
}