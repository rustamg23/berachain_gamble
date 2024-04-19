// import React, { useState } from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
// import AnimateGroup from 'react-smooth';

// const CustomPieChart = ({ data }) => {
//   const [activeIndex, setActiveIndex] = useState(-1);

//   const renderActiveShape = (props) => {
//     const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
//     return (
//       <AnimateGroup
//         component="g"
//         appear={{
//           animation: 'zoom-in',
//           duration: 400
//         }}
//         enter={{
//           animation: 'zoom-in',
//           duration: 400,
//           delay: 0
//         }}
//         leave={{
//           animation: 'zoom-out',
//           duration: 400,
//           delay: 0
//         }}
//       >
//         <Sector
//           cx={cx}
//           cy={cy}
//           innerRadius={innerRadius + 10}
//           outerRadius={outerRadius + 10} // увеличение outerRadius на 10 при наведении
//           startAngle={startAngle}
//           endAngle={endAngle}
//           fill={fill}
//         />
//         <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
//           {payload.name}
//         </text>
//         <text x={cx} y={cy} dy={22} textAnchor="middle" fill="#333">
//           {`Value: ${value}`}
//         </text>
//       </AnimateGroup>
//     );
//   };
  
  

//   const onPieEnter = (_, index) => {
//     setActiveIndex(index);
//   };

//   const onPieLeave = () => {
//     setActiveIndex(-1);
//   };

//   return (
//     <ResponsiveContainer width="100%" height={500}>
//       <PieChart>
//         {data.length > 0 ? (
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             label={(entry) => entry.name}
//             outerRadius={200}
//             innerRadius={160}
//             fill="#8884d8"
//             dataKey="share"
//             onMouseEnter={onPieEnter}
//             onMouseLeave={onPieLeave}
//             activeShape={renderActiveShape}
//           >
//             {data.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={entry.color}
//                 stroke={index === activeIndex ? 'black' : 'none'}
//                 strokeWidth={index === activeIndex ? 4 : 1}

//               />
//             ))}
//           </Pie>
//         ) : (
//           <Pie
//             data={[{ name: "None", value: 100 }]}
//             cx="50%"
//             cy="50%"
//             outerRadius={150}
//             fill="#ccc"
//             dataKey="value"
//           >
//             <Cell fill="#ddd" />
//           </Pie>
//         )}
//         <Tooltip />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// };

// export default CustomPieChart;
