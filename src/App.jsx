// src/App.jsx
import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import SkinShop from './components/SkinShop';
import FortuneWheel from './components/FortuneWheel';
import Cases from './components/Cases';
import DuiktShop from './components/DuiktShop';
import AchievementBar from './components/AchievementBar';
import ResetButton from './components/ResetButton';
import MusicPlayer from './components/MusicPlayer';
import './App.css';

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

  const activeSkinObj = skins.find((skin) => skin.id === gameState.activeSkin);
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
      <div className="yellowBox">
        <MusicPlayer />

        <div className="main-wrapper">
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
        </div>

        <hr />

        <h2>Upgrades</h2>
        <div className="upgrades">
          {Object.entries(gameState.upgrades).map(([key, { level, cost }]) => (
            <button
              key={key}
              onClick={() => buyUpgrade(key)}
              disabled={gameState.credits < cost}
            >
              {key} (Level {level}) – Cost: {cost}
            </button>
          ))}
        </div>

        {/* Центрований блок з Duikt Upgrades */}
        <div
          className="duikt-section"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: '2rem',
            marginBottom: '1rem',
          }}
        >
          <h2>Duikt Upgrades</h2>
          <p>Duiktcoins: {gameState.duiktcoins}</p>
        </div>

        <PrestigeButton />
        <ResetButton />

        <div className="components-wrapper">
          <SkinShop />
          <FortuneWheel />
          <Cases />
          <DuiktShop />
        </div>

        <AchievementBar />
      </div>
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
