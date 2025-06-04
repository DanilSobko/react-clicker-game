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
    <div className="achievements-container">
      {achievementsList.map(({ key, label }) => {
        const achieved = achievements[key]?.achieved;
        return (
          <div
            key={key}
            className="simple-achievement"
            style={{
              borderColor: achieved ? 'limegreen' : 'gray',
              backgroundColor: achieved ? '#ddffdd' : '#f0f0f0',
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
