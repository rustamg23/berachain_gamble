import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Spinner = ({ players }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinKey, setSpinKey] = useState(0);
  const [showArrow, setShowArrow] = useState(false);
  const [finalDegrees, setFinalDegrees] = useState(0);
  const spin = () => {
    if (players.length > 1) {
      // Удаляем стрелку, если она уже отображается
      setShowArrow(false);
      setTimeout(() => {
        // Устанавливаем новый ключ и начинаем новую анимацию
        setIsSpinning(true);
        const newKey = spinKey + 1;
        setSpinKey(newKey);
        setShowArrow(true);

        const totalDegrees = 360 * 5;
        const randomDegrees = Math.random() * 360;
        setFinalDegrees(totalDegrees + randomDegrees);

        setTimeout(() => {
          setIsSpinning(false);
        }, 3000);
      }, 10);  // Краткая задержка для обеспечения пересоздания компонента
    }
  };

  return (
    <div className="spinner-container">
      {showArrow && (
        <motion.div
          key={spinKey}
          initial={{ rotate: 0 }}
          animate={{ rotate: finalDegrees }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="spinner-arrow"
        />
      )}
      <button onClick={spin} disabled={isSpinning || players.length < 2}>
        Spin
      </button>
    </div>
  );
};

export default Spinner;
