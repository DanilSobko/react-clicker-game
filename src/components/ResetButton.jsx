import React from 'react';
import { useGame } from "../context/GameContext";

function ResetButton() {
  const { resetGame } = useGame();

  return (
    <button onClick={resetGame}>
      Почати гру заново
    </button>
  );
}

export default ResetButton;
