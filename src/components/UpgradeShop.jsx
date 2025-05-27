import React from 'react';
import { useGame } from '../context/GameContext';

const UpgradeShop = () => {
  const { gameState, buyUpgrade } = useGame();
  const upgrades = gameState.upgrades;

  if (gameState.upgradesBlocked) {
    return <p style={{ color: 'red' }}>⛔ Магазин тимчасово заблоковано!</p>;
  }

  return (
    <div>
      <h3>Магазин покращень</h3>
      {Object.keys(upgrades).map((key) => (
        <div key={key} style={{ marginBottom: '10px' }}>
          <button
            onClick={() => buyUpgrade(key)}
            disabled={gameState.credits < upgrades[key].cost}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: gameState.credits >= upgrades[key].cost ? 'pointer' : 'not-allowed',
            }}
          >
            {key} (Рівень {upgrades[key].level}) – {upgrades[key].cost} кредитів
          </button>
        </div>
      ))}
    </div>
  );
};

export default UpgradeShop;
