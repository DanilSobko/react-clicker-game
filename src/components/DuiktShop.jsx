import React from 'react';
import { useGame } from '../context/GameContext';

const DuiktShop = () => {
  const { gameState, buyDuiktUpgrade } = useGame();
  const upgrade = gameState.duiktUpgrades.clickBoost;

  return (
    <div>
      <h2>Duikt Upgrades</h2>
      <p>Duiktcoins: {gameState.duiktcoins}</p>
      <button
        onClick={() => buyDuiktUpgrade('clickBoost')}
        disabled={gameState.duiktcoins < upgrade.cost}
      >
        Boost Click Power (Lvl {upgrade.level}) – Cost: {upgrade.cost} Duiktcoin
      </button>
    </div>
  );
};

export default DuiktShop;
