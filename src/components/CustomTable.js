import React, {useEffect} from 'react';
import { breels } from './utils';
import { frame } from 'framer-motion';

const CustomTable = ({ columns, data, amount }) => {

  return (
    <div className="overflow-hidden">
      <div className="inline-block min-w-full">
        <div className="bg-gray-800">
          <div className={`text-white grid } gap-4     px-4 py-2`} style={{gridTemplateColumns: "repeat(6, minmax(0, 1fr))"}}>
            {columns.map((column, index) => (
              <div key={index} className="font-bold">{column.header}</div>
            ))}
          </div>
        </div>
        <div className="bg-gray-700">
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className={`text-white grid  px-4 py-2 border-t border-gray-600`} style={{gridTemplateColumns: "repeat(6, minmax(0, 1fr))"}}>
              {columns.map((column, colIndex) => (
                <div key={colIndex}>{row[column.accessor]}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
