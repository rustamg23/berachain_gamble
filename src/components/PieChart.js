import React, { useEffect, useState } from 'react';
import { VictoryPie, VictoryTooltip } from 'victory';

const DynamicPieChart = ({ initialData, onPlayerHover, highlightedId }) => {
  const [data, setData] = useState([]);
  const [angle, setAngle] = useState(0); // Угол поворота стрелки
  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setData(initialData.map(item => ({
        id: item.id, // убедитесь, что каждый элемент имеет уникальный идентификатор
        x: item.name,
        y: parseInt(item.wager),
        label: `${item.name}: ${item.wager}`
      })));
    }
  }, [initialData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (data.length >= 2) {
        const newAngle = Math.random() * 360;
        setAngle(newAngle); // Новый угол для стрелки
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [data]);

  const handleMouseOver = (id) => {
    onPlayerHover(id);
  };

  const handleMouseOut = () => {
    onPlayerHover(null);
  };

  return (
    <div className=' z-50' style={{ position: 'relative', width: 'fit-content', margin: 'auto' }}>
      {data.length > 0 && (
        <>
        <VictoryPie
          className="z-50"
          data={data}
          colorScale="heatmap"
          labelComponent={<VictoryTooltip />}
          labels={({ datum }) => `# ${datum.y}`}
          innerRadius={120}
          radius={({ datum }) => datum.id === highlightedId ? 160 : 150}
          // radius = {150}
          style={{
            labels: { fontSize: 20, fill: "white" },
            data: {
              fillOpacity: 0.9, stroke: "white", strokeWidth: ({ datum }) => datum.id === highlightedId ? 3 : 1
            }
          }}
          animate={{
            duration: 500,
            onLoad: { duration: 500 },
          }}
          events={[{
            target: "data",
            eventHandlers: {
              onMouseOver: (_, { datum }) => {
                handleMouseOver(datum.id); // Передаем ID в функцию обработки
                return [{
                  mutation: (props) => ({
                    style: { ...props.style, strokeWidth: 3 },
                    // radius: props.radius + 10
                  })
                }];
              },
              onMouseOut: () => {
                handleMouseOut(); // Сброс подсветки
                return [{
                  mutation: (props) => ({
                    style: { ...props.style, strokeWidth: 1 }
                  })
                }];
              }
            }
          }]}
          
          
        />
        <svg style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -50%) rotate(${angle}deg)`, width: '30px', height: '30px', overflow: 'visible', zIndex: 1 }}>
            <polygon points="-5,0 5,0 0,-20" fill="red" />
          </svg>
          </>
      )}
    </div>
  );
};

export default DynamicPieChart;
