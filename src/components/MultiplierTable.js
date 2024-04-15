import React from 'react';

export const LegendButton = ({multiplierTable, breel, setButtonRef, showTable, handleToggleTable}) => {
    
    console.log( showTable, handleToggleTable)
    return (
        <>
        {showTable && (
            <MultiplierTableModal multipliers={multiplierTable} images={breel} onClose={handleToggleTable}/>
          )}
           <button onClick={handleToggleTable} ref={setButtonRef} className="bg-white text-black px-4 py-2">
            {showTable ? 'Hide Table' : 'Show Table'}
          </button>
        </>
    )
}


export const MultiplierTableModal = ({ multipliers, images, position, onClose }) => {
    const style = {
      ...position,
      position: 'absolute',
      zIndex: 50
    };
  
    return (
      <div style={style} className="p-4 rounded-md shadow-lg bg-black bg-opacity-90" onClick={onClose}>

        <MultiplierTable multipliers={multipliers} images={images}/>
      </div>
    );
  };

export const MultiplierTable = ({ multipliers, images }) => {
  const rows = Object.entries(multipliers).map(([combination, multiplier]) => {
    const imageKeys = combination.split(',');
    return (
      <tr key={combination}>
        <td>
          {imageKeys.map(key => (
            <img
              key={Math.floor(Math.random() * 3000)}
              src={images[key]}
              alt=""
              className="inline-block h-10 w-10 mr-1" 
            />
          ))}
        </td>
        <td className='text-md'>{multiplier}x</td>
        <td className='text-md'>{combination}</td>
      </tr>
    );
  });

  return (
    <table className="text-white">
      <thead>
        <tr>
          <th>Outcome</th>
          <th>Multiplier</th>
          <th>Combination</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
