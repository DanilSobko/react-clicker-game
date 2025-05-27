// src/App.jsx
import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import SkinShop from './components/SkinShop';
import FortuneWheel from './components/FortuneWheel';
import Cases from './components/Cases';
import DuiktShop from './components/DuiktShop';
import AchievementBar from './components/AchievementBar';
import ResetButton from './components/ResetButton';

const PrestigeButton = () => {
  const { gameState, prestige } = useGame();

  return (
    <button
      onClick={prestige}
      disabled={gameState.credits < 10000}
      style={{ padding: '8px 16px', fontSize: '1rem', marginTop: '1rem' }}
    >
      Скинути прогрес (отримати Duiktcoins)
    </button>
  );
};

const GameUI = () => {
  const { gameState, incrementCredits, buyUpgrade, skins } = useGame();

  const activeSkinObj = skins.find(skin => skin.id === gameState.activeSkin);
  const skinStyle = activeSkinObj ? activeSkinObj.style : {};

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: '1rem',
        boxSizing: 'border-box',
        fontFamily: 'Arial, sans-serif',
        ...skinStyle,
      }}
    >
      <h1>Clicker Game</h1>
      <p>Credits: {gameState.credits}</p>
      <p>Click Value: {gameState.clickValue}</p>
      <p>Duiktcoins: {gameState.duiktcoins}</p>

      <button
        onClick={incrementCredits}
        disabled={!gameState.canClick}
        style={{ padding: '10px 20px', fontSize: '1.1rem', cursor: 'pointer' }}
      >
        Click me!
      </button>

      <hr />

      <h2>Upgrades</h2>
      {Object.entries(gameState.upgrades).map(([key, { level, cost }]) => (
        <button
          key={key}
          onClick={() => buyUpgrade(key)}
          disabled={gameState.credits < cost}
          style={{ padding: '8px', margin: '5px' }}
        >
          {key} (Level {level}) – Cost: {cost}
        </button>
      ))}

      <PrestigeButton />
      <ResetButton />

      <hr />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '2rem' }}>
        <SkinShop />
        <FortuneWheel />
        <Cases />
        <DuiktShop />
      </div>

      <AchievementBar />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <GameUI />
    </GameProvider>
  );
}
