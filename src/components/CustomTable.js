import React, {useState} from 'react';
import { breels } from './utils';
import { frame } from 'framer-motion';

const HistoryToggle = ({ columns, data, amount}) => {

    
    const [showHistory, setShowHistory] = useState(false);
  
    return (
      <div className="p-4">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-32 mb-5"
        >
          {showHistory ? 'Hide History' : 'Show History'}
        </button>
        {showHistory && (
          <CustomTable columns={columns} data={data} amount={amount} />
        )}
      </div>
    );
  };
  
  export default HistoryToggle;

const CustomTable = ({ columns, data, amount }) => {

  return (
    <div className="sm:overflow-hidden overflow-x-auto">
      <div className="inline-block min-w-full">
        <div className="bg-gray-800">
          <div className={`text-white grid } gap-4     px-4 py-2`} style={{gridTemplateColumns: `repeat(${amount}, minmax(0, 1fr))`}}>
            {columns.map((column, index) => (
              <div key={index} className="font-bold">{column.header}</div>
            ))}
          </div>
        </div>
        <div className="bg-gray-700">
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className={`text-white grid  px-4 py-2 border-t border-gray-600`} style={{gridTemplateColumns: `repeat(${amount}, minmax(0, 1fr))`}}>
              {columns.map((column, colIndex) => (
                <div key={colIndex} className={row["payout"] > 0 ? "text-green-500" : "text-red-500"}>{row[column.accessor]}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

