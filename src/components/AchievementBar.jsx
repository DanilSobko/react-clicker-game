import React from 'react';
import { useGame } from '../context/GameContext';

const AchievementBar = () => {
  const { gameState } = useGame();
  const achievements = gameState.achievements || {};

  const achievementsList = [
    { key: 'clicks', label: '100 кліків' },
    { key: 'clickPowerLevel', label: 'Прокачати кнопку 20 разів' },
    { key: 'creditsEarned', label: 'Заробити 10 000 кредитів' },
    { key: 'skinsBought', label: 'Купити 2 скіни' },
    { key: 'bonusesUsed', label: 'Використати 3 бонуси' },
  ];

  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
      {achievementsList.map(({ key, label }) => {
        const achieved = achievements[key]?.achieved;  // безпечний доступ
        return (
          <div
            key={key}
            style={{
              width: 100,
              height: 100,
              border: '2px solid',
              borderColor: achieved ? 'limegreenид' : 'gray',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              textAlign: 'center',
              backgroundColor: achieved ? '#ddffdd' : '#f0f0f0',
              userSelect: 'none',
              color: '#000',
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default AchievementBar;
