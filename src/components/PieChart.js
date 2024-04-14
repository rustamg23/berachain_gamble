import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

function PieChart({ data }) {
  const ref = useRef();
  const [tooltip, setTooltip] = useState("");
  const dimensions = { width: 500, height: 500 }; // Вы можете сделать эти значения динамическими в зависимости от родительского элемента

  useEffect(() => {
    if (!data.length) return; // Если данных нет, не выполнять код ниже

    const radius = Math.min(dimensions.width, dimensions.height) / 2;
    const svgElement = d3.select(ref.current);
    svgElement.selectAll('*').remove(); // Очищаем SVG перед рендерингом

    const svg = svgElement
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .append('g')
      .attr('transform', `translate(${dimensions.width / 2}, ${dimensions.height / 2})`);

      const arcGenerator = d3.arc()
      .innerRadius(radius * 0.7) // Настраиваемые размеры для кольцевой диаграммы
      .outerRadius(radius);
    
    const pieGenerator = d3.pie()
      .value(d => d.value)
      .sort(null);
    
    const arcs = svg.selectAll('.arc')
      .data(pieGenerator(data), d => d.index);
    
    arcs.enter()
      .append('path')
      .attr('class', 'arc')
      .attr('fill', d => d.data.color)
      .attr('d', arcGenerator)
      .attr('stroke', '#fff')
      .attr('stroke-width', '2px')
      .attr('stroke-opacity', 0) // Изначально граница прозрачная
      .on('mouseover', (event, d) => {
        setTooltip(`${d.data.name}: ${d.data.value}%`);
        d3.select(event.currentTarget)
          .attr('stroke-opacity', 1); // Делаем границу видимой при наведении
      })
      .on('mouseout', (event, d) => {
        setTooltip("");
        d3.select(event.currentTarget)
          .attr('stroke-opacity', 0); // Снова делаем границу прозрачной
      })
      .transition()
      .duration(500)
      .attrTween('d', function(d) {
        const i = d3.interpolate(d.startAngle+0.1, d.endAngle);
        return function(t) {
          d.endAngle = i(t);
          return arcGenerator(d);
        };
      });
    
    arcs.exit()
      .transition()
      .duration(500)
      .attrTween('d', function(d) {
        const i = d3.interpolate(d.startAngle, d.endAngle);
        return function(t) {
          d.startAngle = i(t);
          return arcGenerator(d);
        };
      })
      .remove();
    

  }, [data, dimensions.width, dimensions.height]);

  return (
    <div>
      <svg ref={ref}></svg>
      <div className="tooltip" style={{ opacity: tooltip ? 1 : 0 }}>
        {tooltip}
      </div>
    </div>
  );
}

export default PieChart;
