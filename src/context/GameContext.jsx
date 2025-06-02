import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const GameContext = createContext();
export const useGame = () => useContext(GameContext);

const defaultState = {
  credits: 0,
  clickValue: 1,
  canClick: true,
  upgradesBlocked: false,
  upgrades: {
    clickPower: { level: 0, cost: 10, multiplier: 1 },
    autoClicker: { level: 0, cost: 50, multiplier: 1 },
    passiveIncome: { level: 0, cost: 100, multiplier: 2 },
    comboClick: { level: 0, cost: 150, multiplier: 1.5 },
    criticalClick: { level: 0, cost: 200, multiplier: 3 },
  },
  ownedSkins: [],
  activeSkin: null,
  duiktcoins: 0,
  duiktUpgrades: {
    clickBoost: { level: 0, cost: 1, multiplier: 1.2 },
  },
  achievements: {
    clicks: { count: 0, achieved: false },
    clickPowerLevel: { achieved: false },
    creditsEarned: { count: 0, achieved: false },
    skinsBought: { count: 0, achieved: false },
    bonusesUsed: { count: 0, achieved: false },
  },
};

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(() => {
    try {
      const data = localStorage.getItem('clickerGameSave');
      if (!data) return defaultState;
      const parsed = JSON.parse(data);

      // Якщо апгрейдів немає, додаємо дефолтні
      if (!parsed.upgrades) parsed.upgrades = { ...defaultState.upgrades };
      else {
        // Перевіряємо ключі в upgrades, додаємо відсутні
        Object.keys(defaultState.upgrades).forEach(key => {
          if (!parsed.upgrades[key]) parsed.upgrades[key] = { ...defaultState.upgrades[key] };
        });
      }
      if (!parsed.duiktUpgrades) parsed.duiktUpgrades = { ...defaultState.duiktUpgrades };
      if (!parsed.achievements) parsed.achievements = { ...defaultState.achievements };

      return parsed;
    } catch {
      return defaultState;
    }
  });

  const [activeBonusLabel, setActiveBonusLabel] = useState('');
  const originalClickValueRef = useRef(gameState.clickValue);

  const skins = [
    {
      id: 'bg1',
      name: 'Лісова магія',
      cost: 1000,
      style: {
        backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    },
    {
      id: 'bg2',
      name: 'Космічна ніч',
      cost: 9000,
      style: {
        backgroundImage: 'url("https://kpal.sm.ua/wp-content/uploads/2021/04/755783410765280.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    }
  ];

  useEffect(() => {
    localStorage.setItem('clickerGameSave', JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    const autoClickInterval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        credits: prev.credits + (prev.upgrades?.autoClicker?.level || 0),
      }));
    }, 1000);
    return () => clearInterval(autoClickInterval);
  }, [gameState.upgrades?.autoClicker?.level]);

  useEffect(() => {
    const passiveIncomeInterval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        credits: prev.credits + ((prev.upgrades?.passiveIncome?.level || 0) * 2),
      }));
    }, 2000);
    return () => clearInterval(passiveIncomeInterval);
  }, [gameState.upgrades?.passiveIncome?.level]);

  const incrementCredits = () => {
    if (!gameState.canClick) return;

    setGameState(prev => {
      const base = prev.clickValue || 1;
      const comboLevel = prev.upgrades?.comboClick?.level || 0;
      const criticalLevel = prev.upgrades?.criticalClick?.level || 0;

      const comboMult = 1 + comboLevel * 0.1;
      const isCrit = Math.random() < criticalLevel * 0.05;
      const critMult = isCrit ? 2 : 1;
      const gain = Math.floor(base * comboMult * critMult);

      const newClicks = (prev.achievements?.clicks?.count || 0) + 1;
      const newCredits = prev.credits + gain;
      const newCreditsEarned = (prev.achievements?.creditsEarned?.count || 0) + gain;

      return {
        ...prev,
        credits: newCredits,
        achievements: {
          ...prev.achievements,
          clicks: {
            count: newClicks,
            achieved: prev.achievements?.clicks?.achieved || newClicks >= 100,
          },
          creditsEarned: {
            count: newCreditsEarned,
            achieved: prev.achievements?.creditsEarned?.achieved || newCreditsEarned >= 10000,
          }
        }
      };
    });
  };

  const buyUpgrade = (type) => {
    if (!gameState.upgrades || !gameState.upgrades[type]) return;

    const upgrade = gameState.upgrades[type];
    if (!upgrade || gameState.credits < upgrade.cost || gameState.upgradesBlocked) return;

    setGameState(prev => {
      const prevUpgrade = prev.upgrades[type];
      if (!prevUpgrade) return prev;

      const newLevel = prevUpgrade.level + 1;
      const newCost = Math.floor(prevUpgrade.cost * 1.5);

      let newClickValue = prev.clickValue;
      if (type === 'clickPower') {
        newClickValue += prevUpgrade.multiplier;
      }

      const clickPowerAchieved = prev.achievements?.clickPowerLevel?.achieved || (type === 'clickPower' && newLevel >= 20);

      return {
        ...prev,
        credits: prev.credits - prevUpgrade.cost,
        clickValue: newClickValue,
        upgrades: {
          ...prev.upgrades,
          [type]: { ...prevUpgrade, level: newLevel, cost: newCost },
        },
        achievements: {
          ...prev.achievements,
          clickPowerLevel: { achieved: clickPowerAchieved },
        }
      };
    });
  };

  const buyDuiktUpgrade = (type) => {
    if (!gameState.duiktUpgrades || !gameState.duiktUpgrades[type]) return;

    const upgrade = gameState.duiktUpgrades[type];
    if (!upgrade || gameState.duiktcoins < upgrade.cost) return;

    const newLevel = upgrade.level + 1;
    const newCost = upgrade.cost + 1;

    setGameState(prev => ({
      ...prev,
      duiktcoins: prev.duiktcoins - upgrade.cost,
      duiktUpgrades: {
        ...prev.duiktUpgrades,
        [type]: { ...upgrade, level: newLevel, cost: newCost },
      },
      clickValue: prev.clickValue * upgrade.multiplier,
    }));
  };

  const applyCaseEffect = (effect) => {
    setGameState(prev => {
      const newState = { ...prev };

      if (effect.includes('+100 credits')) newState.credits += 100;
      else if (effect.includes('+500 credits')) newState.credits += 500;
      else if (effect.includes('+1500 credits')) newState.credits += 1500;
      else if (effect.includes('+5000 credits')) newState.credits += 5000;

      else if (effect.includes('+10% click')) newState.clickValue *= 1.1;
      else if (effect.includes('+25% click')) newState.clickValue *= 1.25;
      else if (effect.includes('+50% click')) newState.clickValue *= 1.5;

      else if (effect.includes('x2 All income')) newState.clickValue *= 2;

      else if (effect.includes('x3 income')) {
        originalClickValueRef.current = prev.clickValue;
        newState.clickValue = prev.clickValue * 3;
        setActiveBonusLabel('x3 income 30s');
        setTimeout(() => {
          setGameState(prev2 => ({ ...prev2, clickValue: originalClickValueRef.current }));
          setActiveBonusLabel('');
        }, 30000);
      }

      else if (effect.includes('-10% click')) newState.clickValue *= 0.9;
      else if (effect.includes('-20% click')) newState.clickValue *= 0.8;
      else if (effect.includes('-30% click')) newState.clickValue *= 0.7;

      else if (effect.includes('Freeze click')) {
        newState.canClick = false;
        setTimeout(() => {
          setGameState(prev2 => ({ ...prev2, canClick: true }));
        }, 10000);
      }

      else if (effect.includes('Block shop')) {
        newState.upgradesBlocked = true;
        setTimeout(() => {
          setGameState(prev2 => ({ ...prev2, upgradesBlocked: false }));
        }, 10000);
      }

      else if (effect.includes('Reset upgrade')) {
        Object.keys(newState.upgrades).forEach((key) => {
          newState.upgrades[key].level = 1;
          newState.upgrades[key].cost = 100 * (key === 'clickPower' ? 1 : 2);
        });
      }

      const newBonusesUsed = (prev.achievements?.bonusesUsed?.count || 0) + 1;
      const bonusesUsedAchieved = prev.achievements?.bonusesUsed?.achieved || newBonusesUsed >= 5;

      return {
        ...newState,
        achievements: {
          ...prev.achievements,
          bonusesUsed: {
            count: newBonusesUsed,
            achieved: bonusesUsedAchieved,
          }
        }
      };
    });
  };

  const buySkin = (skinId, cost) => {
    if (gameState.credits < cost || gameState.ownedSkins.includes(skinId)) return false;

    setGameState(prev => {
      const newOwnedSkins = [...prev.ownedSkins, skinId];
      const skinsBoughtCount = newOwnedSkins.length;
      const skinsBoughtAchieved = prev.achievements?.skinsBought?.achieved || skinsBoughtCount >= 3;

      return {
        ...prev,
        credits: prev.credits - cost,
        ownedSkins: newOwnedSkins,
        achievements: {
          ...prev.achievements,
          skinsBought: {
            count: skinsBoughtCount,
            achieved: skinsBoughtAchieved,
          }
        }
      };
    });
    return true;
  };

  const selectSkin = (skinId) => {
    if (!gameState.ownedSkins.includes(skinId)) return;
    setGameState(prev => ({
      ...prev,
      activeSkin: skinId,
    }));
  };

  const prestige = () => {
    if (gameState.credits < 10000) return;

    const duiktcoinsEarned = Math.floor(gameState.credits / 10000);

    setGameState({
      ...defaultState,
      duiktcoins: (gameState.duiktcoins || 0) + duiktcoinsEarned,
    });
  };

  const resetGame = () => {
    setGameState(defaultState);
    localStorage.removeItem('clickerGameSave');
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        incrementCredits,
        buyUpgrade,
        buyDuiktUpgrade,
        applyCaseEffect,
        activeBonusLabel,
        buySkin,
        selectSkin,
        skins,
        prestige,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
