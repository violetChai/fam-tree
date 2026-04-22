import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function FamilyTree({ data }) {
    const ref = useRef();

    useEffect(() => {
        if (!data || data.length === 0) return;

        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();

        const width = 800;
        const height = 500;

        const root = d3.stratify()
            .id((d) => d._id)
            .parentId((d) => d.parentId || null)(data);

        const treeLayout = d3.tree().size([width, height]);
        treeLayout(root);

        svg
            .selectAll("circle")
            .data(root.descendants())
            .enter()
            .append("circle")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", 5);

    }, [data]);

    return <svg ref={ref} width={800} height={500}></svg>;
}