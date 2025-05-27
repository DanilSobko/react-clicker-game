import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import styles from './Cases.module.scss';

const CASES = [
  {
    id: 'bronze',
    name: 'Бронзовий кейс',
    cost: 500,
    color: '#cd7f32',
    rewards: ['+10% click', '+100 credits', 'Mini boost'],
    penalties: ['-10% click', 'Cooldown +5s'],
  },
  {
    id: 'silver',
    name: 'Срібний кейс',
    cost: 2000,
    color: '#c0c0c0',
    rewards: ['+25% click', '+500 credits', 'AutoClicker x2'],
    penalties: ['-20% click', 'Freeze click 10s'],
  },
  {
    id: 'gold',
    name: 'Золотий кейс',
    cost: 5000,
    color: '#ffd700',
    rewards: ['+50% click', '+1500 credits', 'x2 All income'],
    penalties: ['-30% click', 'Block shop 10s'],
  },
  {
    id: 'secret',
    name: 'Таємний кейс',
    cost: 10000,
    color: '#6a0dad',
    rewards: ['x3 income 30s', '+5000 credits', 'Unlock rare skin'],
    penalties: ['Reset upgrade level', 'Virus effect 15s'],
  },
];

export default function Cases() {
  const { gameState, setGameState } = useGame();
  const [openingCaseId, setOpeningCaseId] = useState(null);
  const [resultText, setResultText] = useState('');

  const handleOpenCase = (caseItem) => {
    if (gameState.credits < caseItem.cost || openingCaseId) return;

    setGameState((prev) => ({
      ...prev,
      credits: prev.credits - caseItem.cost,
    }));

    setOpeningCaseId(caseItem.id);
    setResultText('Відкривається...');

    setTimeout(() => {
      const isBonus = Math.random() > 0.4;
      const effect = isBonus
        ? caseItem.rewards[Math.floor(Math.random() * caseItem.rewards.length)]
        : caseItem.penalties[Math.floor(Math.random() * caseItem.penalties.length)];

      setResultText(`${isBonus ? '🎁 БОНУС' : '⚠️ АНТИБОНУС'}: ${effect}`);

      setGameState((prev) => {
        const newState = { ...prev };

        if (isBonus) {
          if (effect.includes('+100 credits')) newState.credits += 100;
          else if (effect.includes('+500 credits')) newState.credits += 500;
          else if (effect.includes('+1500 credits')) newState.credits += 1500;
          else if (effect.includes('+5000 credits')) newState.credits += 5000;
          else if (effect.includes('+10% click')) newState.clickValue *= 1.1;
          else if (effect.includes('+25% click')) newState.clickValue *= 1.25;
          else if (effect.includes('+50% click')) newState.clickValue *= 1.5;
          else if (effect.includes('x2 All income')) newState.clickValue *= 2;
          else if (effect.includes('x3 income')) newState.clickValue *= 3;
        } else {
          if (effect.includes('-10% click')) newState.clickValue *= 0.9;
          else if (effect.includes('-20% click')) newState.clickValue *= 0.8;
          else if (effect.includes('-30% click')) newState.clickValue *= 0.7;
          else if (effect.includes('Freeze click')) {
            newState.canClick = false;
            setTimeout(() => {
              setGameState(prev2 => ({ ...prev2, canClick: true }));
            }, 10000);
          } else if (effect.includes('Block shop')) {
            newState.upgradesBlocked = true;
            setTimeout(() => {
              setGameState(prev2 => ({ ...prev2, upgradesBlocked: false }));
            }, 10000);
          } else if (effect.includes('Reset upgrade')) {
            Object.keys(newState.upgrades).forEach((key) => {
              newState.upgrades[key].level = 1;
              newState.upgrades[key].cost = 100 * (key === 'clickPower' ? 1 : 2);
            });
          }
        }

        return newState;
      });

      setOpeningCaseId(null);
    }, 1000);
  };

  return (
    <div className={styles.casesContainer}>
      <h2>🎁 Відкрий кейс</h2>
      <div className={styles.caseGrid}>
        {CASES.map((c) => (
          <div
            key={c.id}
            className={`${styles.caseBox} ${openingCaseId === c.id ? styles.shake : ''}`}
            style={{ borderColor: c.color }}
          >
            <h3>{c.name}</h3>
            <p>Ціна: {c.cost}</p>
            <button
              onClick={() => handleOpenCase(c)}
              disabled={!!openingCaseId || gameState.credits < c.cost}
            >
              {openingCaseId === c.id ? 'Відкривається...' : 'Відкрити'}
            </button>
          </div>
        ))}
      </div>
      {resultText && <div className={styles.result}>{resultText}</div>}
    </div>
  );
}
