import React, { useState, useEffect } from 'react';
import { VictoryPie, VictoryTooltip } from 'victory';
import { motion } from 'framer-motion';
import HistoryToggle from './CustomTable';

const DynamicPieChart = ({ initialData, highlightedId, setHighlightedId }) => {
  const [data, setData] = useState([]);
  const [finalDegrees, setFinalDegrees] = useState(0);
  const [spinHistory, setSpinHistory] = useState([{ wager: null,  payout: null, participants: null, time: null, winner:null }]);
  const [total, setTotal] = useState(0);
  const [spinKey, setSpinKey] = useState(0); // ключ для реинициализации анимации
  const [arrowClass, setArrowClass] = useState("spinner-blunt");
  const columns = [
    { header: 'Winner', accessor: 'winner' },
    { header: 'Time (UTC)', accessor: 'time' },
    { header: 'Wager', accessor: 'wager' },
    { header: 'Participants', accessor: 'participants' },
    { header: 'Payout', accessor: 'payout' },
  ];

  useEffect(() => {
    
    if (initialData && initialData.length > 0) {
      setData(initialData.map(item => ({
        id: item.id,
        x: item.name,
        y: parseInt(item.wager, 10),
        label: `${item.name}: ${item.wager}`,
      })));
      setTotal(initialData[0].total)
    }
  }, [initialData]);

  const determineWinner = (finalAngle) => {
    let accumulatedAngle = 0;
    const totalWager = data.reduce((acc, curr) => acc + curr.y, 0);

    for (const player of data) {
      const playerAngle = (player.y / totalWager) * 360;
      if (finalAngle >= accumulatedAngle && finalAngle < accumulatedAngle + playerAngle) {
        console.log("Winner is: ", player.x);
        console.log("totasl", total)
        console.log( player.y, total, data.length, new Date().toLocaleString(), player.x )
        setSpinHistory(prevHistory => [{ wager: player.y, payout: total, participants: data.length, time: new Date().toLocaleString(), winner: player.x }, ...prevHistory]);
        return player.x; // Возвращаем имя победителя
      }
      accumulatedAngle += playerAngle;
    }
  };

  const spin = () => {
    const classes = ['blunt', 'honeyspoon', 'beerbootle'];
    const randomIndex = Math.floor(Math.random() * classes.length);
    setArrowClass(`spinner-${classes[randomIndex]}`);
    const totalDegrees = 360 * 5; // Поворот на 5 полных кругов для драматизма
    const randomDegrees = Math.random() * 360; // Случайный угол остановки
    console.log(randomDegrees)
    const finalAngle = totalDegrees + randomDegrees;
    setFinalDegrees(finalAngle);
    setSpinKey(prevKey => prevKey + 1); // Обновляем ключ для реинициализации анимации

    setTimeout(() => {
      determineWinner(finalAngle % 360);
    }, 3000); // Длительность анимации
  };

  return (
    <div className="flex flex-col w-2/3">
    <div className='chart-container ' style={{ position: 'relative',  margin: 'auto', width: 'fit-content', height: 'fit-content' }} >
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
            width={450}
            height={450}
            labels={({ datum }) => `# ${datum.y}`}
            innerRadius={180}
            radius={({ datum }) => datum.id === highlightedId ? 220 : 210}
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
          <motion.div
            key={spinKey}
            initial={{ rotate: 0 }}
            animate={{ rotate: finalDegrees }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className={arrowClass}
          />
          <button onClick={spin} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Spin
          </button>
        </>
      ) : <p>No data available</p>}
      
    </div>
    <HistoryToggle data={spinHistory} columns={columns} amount={5}/>
    </div>
  );
};

export default DynamicPieChart;
