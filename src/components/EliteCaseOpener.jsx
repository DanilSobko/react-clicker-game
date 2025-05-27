import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

const eliteBonuses = [
  { label: '×5 Clicks (60s)', type: 'clickMultiplier', value: 5, duration: 60, color: '#FFD700' }, // золото
  { label: '+1000 Credits', type: 'instantCredits', value: 1000, color: '#FF8C00' },
  { label: '×10 Clicks (30s)', type: 'clickMultiplier', value: 10, duration: 30, color: '#FF4500' },
  { label: 'Антибонус: -50% Кліків (30с)', type: 'clickMultiplier', value: 0.5, duration: 30, color: '#8B0000' },
  { label: 'Антибонус: -500 Кредитів', type: 'instantCreditsNegative', value: -500, color: '#8B0000' },
  { label: 'Нічого 😢', type: 'none', color: '#607d8b' },
];

const EliteCaseOpener = () => {
  const { gameState, setGameState, setBonusToApply } = useGame();
  const [opening, setOpening] = useState(false);
  const [prize, setPrize] = useState(null);

  const openCase = () => {
    if (opening) return;
    if (gameState.credits < 10000) {
      alert('Недостатньо кредитів для відкриття елітного кейса!');
      return;
    }

    setOpening(true);
    setPrize(null);

    // Відняти 10000 кредитів
    setGameState((prev) => ({
      ...prev,
      credits: prev.credits - 10000,
    }));

    // Випадковий бонус/антибонус
    const randomIndex = Math.floor(Math.random() * eliteBonuses.length);
    const selected = eliteBonuses[randomIndex];

    setTimeout(() => {
      setPrize(selected);
      setBonusToApply(selected);
      setOpening(false);
    }, 2000);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Елітний кейс (10 000 кредитів)</h3>
      <button onClick={openCase} disabled={opening}>
        {opening ? 'Відкриваємо...' : 'Відкрити кейс'}
      </button>
      {prize && (
        <div style={{ marginTop: '1rem', color: prize.color }}>
          🎁 Випало: <strong>{prize.label}</strong>
        </div>
      )}
    </div>
  );
};

export default EliteCaseOpener;
