import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

function PieChart({ data }) {
  const ref = useRef();
  const [tooltip, setTooltip] = useState("");

  useEffect(() => {
    const svgElement = d3.select(ref.current);
    svgElement.selectAll('*').remove();
    const svg = svgElement
      .attr('width', 200)
      .attr('height', 200)
      .append('g')
      .attr('transform', 'translate(100, 100)');

    const arcGenerator = d3.arc()
      .innerRadius(85)
      .outerRadius(100);

    const pieGenerator = d3.pie()
      .value(d => d.value)
      .sort(null);

    const arcs = svg.selectAll('path')
      .data(pieGenerator(data))
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', d => d.data.color)
      .on('mouseover', (event, d) => {
        setTooltip(`${d.data.name}: ${d.data.value}%`);
        d3.select(event.currentTarget)
          .attr('stroke', '#fff')
          .attr('stroke-width', '2px');
      })
      .on('mouseout', (event, d) => {
        setTooltip("");
        d3.select(event.currentTarget)
          .attr('stroke', 'none');
      });

    console.log(arcs); 
  }, [data]);

  return (
    <div>
      <svg ref={ref}></svg>
      <div className="tooltip" style={{  opacity: tooltip ? 1 : 0 }}>
        {tooltip}
      </div>
    </div>
  );
}

export default PieChart;
