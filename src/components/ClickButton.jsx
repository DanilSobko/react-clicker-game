import React from 'react';
import { useGame } from '../context/GameContext';

const ClickButton = () => {
  const { gameState, incrementCredits } = useGame();

  return (
    <button
      onClick={incrementCredits}
      disabled={!gameState.canClick}
      style={{
        padding: '12px 24px',
        fontSize: '1.2rem',
        backgroundColor: gameState.canClick ? '#4CAF50' : '#aaa',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: gameState.canClick ? 'pointer' : 'not-allowed',
        marginBottom: '1rem',
      }}
    >
      {gameState.canClick ? 'Клікни!' : 'Заблоковано ⛔'}
    </button>
  );
};

export default ClickButton;
