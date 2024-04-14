import React from 'react';


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
              key={key}
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
