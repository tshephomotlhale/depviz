"use client";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Dependency {
  name: string;
  version: string;
}

interface DependencyGraphProps {
  dependencies: Dependency[];
}

export default function DependencyGraph({ dependencies }: DependencyGraphProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!dependencies || dependencies.length === 0 || !svgRef.current) return;

    console.log('Dependencies for D3:', dependencies);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 600;

    svg
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#000000"); // Background color for the SVG

    const simulation = d3.forceSimulation(dependencies as d3.SimulationNodeDatum[])
      .force("charge", d3.forceManyBody().strength(-50)) // Increase repulsion strength
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(60)) // Increase collision radius
      .force("x", d3.forceX().strength(0.1).x(width / 2))
      .force("y", d3.forceY().strength(0.1).y(height / 2));

    const nodes = svg.append("g")
      .selectAll("circle")
      .data(dependencies)
      .enter()
      .append("circle")
      .attr("r", 20)
      .attr("fill", "#000080"); // Circle color

    const labels = svg.append("g")
      .selectAll("text")
      .data(dependencies)
      .enter()
      .append("text")
      .text(d => d.name)
      .attr("font-size", "14px")
      .attr("text-anchor", "middle")
      .attr("fill", "#ecf0f1") // Text color
      .style("pointer-events", "none"); // Prevent text from interfering with mouse events

    simulation.on("tick", () => {
      nodes
        .attr("cx", d => Math.max(20, Math.min(width - 20, (d as any).x))) // Keep nodes within width
        .attr("cy", d => Math.max(20, Math.min(height - 20, (d as any).y))); // Keep nodes within height

      labels
        .attr("x", d => Math.max(20, Math.min(width - 20, (d as any).x))) // Keep labels within width
        .attr("y", d => Math.max(40, Math.min(height - 10, (d as any).y + 30))); // Keep labels within height
    });

  }, [dependencies]);

  return <svg ref={svgRef} width="800" height="600"></svg>;
}
