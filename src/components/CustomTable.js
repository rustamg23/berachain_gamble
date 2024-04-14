import React from 'react';
import { breels } from './utils';

const CustomTable = ({ columns, data, amount }) => {
    
  return (
    <div className="overflow-hidden">
      <div className="inline-block min-w-full">
        <div className="bg-gray-800">
          <div className={`text-white grid grid-cols-${amount} gap-4     px-4 py-2`}>
            {columns.map((column, index) => (
              <div key={index} className="font-bold">{column.header}</div>
            ))}
          </div>
        </div>
        <div className="bg-gray-700">
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className={`text-white grid grid-cols-${amount} px-4 py-2 border-t border-gray-600`}>
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
