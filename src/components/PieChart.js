import React from 'react';
import { VictoryPie, VictoryTooltip } from 'victory';

const DynamicPieChart = ({ initialData, highlightedId, setHighlightedId }) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (initialData && initialData.length > 0) {
      setData(initialData.map(item => ({
        id: item.id,
        x: item.name,
        y: parseInt(item.wager, 10),
        label: `${item.name}: ${item.wager}`,
        
      })));
    }
  }, [initialData]);

  return (
    <div className='w-1/3 z-50' style={{ position: 'relative', width: 'fit-content', margin: 'auto' }}>
      {data.length > 0 ? (
        <>
          <VictoryPie
            data={data}
            colorScale={[
              "#ff1d58", "#f75990", "#fff685", "#00DDFF", "#0049B7",
              "#FF5733", "#C70039", "#900C3F", "#581845", "#FFC300",
              "#DAF7A6", "#FFC0CB", "#9FE2BF", "#40E0D0", "#6495ED",
              "#B03060", "#FF4500", "#7FFF00", "#9966CC", "#8A2BE2"
            ]}
            labelComponent={<VictoryTooltip />}
            labels={({ datum }) => `# ${datum.y}`}
            innerRadius={120}
            radius={({ datum }) => datum.id === highlightedId ? 160 : 150}
            style={{
              labels: { fontSize: 20, fill: "white" },
              data: {
                fillOpacity: 0.9, stroke: "white", strokeWidth: ({ datum }) => datum.id === highlightedId ? 3 : 1
              }
            }}
            animate={{
              duration: 500,
              onLoad: { duration: 500 }
            }}
            events={[{
              target: "data",
              eventHandlers: {
                onMouseOver: () => ({
                  mutation: (props) => {
                    setHighlightedId(props.datum.id);
                    return {
                      style: { ...props.style, stroke: "white", strokeWidth: 3 }
                    };
                  }
                }),
                onMouseOut: () => ({
                  mutation: (props) => {
                    setHighlightedId(null);
                    return {style: { ...props.style, stroke: "white", strokeWidth: 1 }};
                  }
                })
              }
            }]}
          />
        </>
      ) : <p>No data available</p>}
    </div>
  );
};

export default DynamicPieChart;
