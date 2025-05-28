import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import styles from '../styles/FortuneWheel.module.scss';

const bonuses = [
  { label: '×2 Clicks (30s)', type: 'clickMultiplier', value: 2, duration: 30, color: '#f44336' },
  { label: '+100 Credits', type: 'instantCredits', value: 100, color: '#e91e63' },
  { label: '×2 Clicks (15s)', type: 'clickMultiplier', value: 3, duration: 15, color: '#9c27b0' },
  { label: 'No Prize 😢', type: 'none', color: '#607d8b' },
];

const segmentsCount = bonuses.length;
const degreesPerSegment = 360 / segmentsCount;

const FortuneWheel = () => {
  const { gameState, setGameState } = useGame();
  const [spinning, setSpinning] = useState(false);
  const [bonusToApply, setBonusToApply] = useState(null);
  const [activeBonusLabel, setActiveBonusLabel] = useState('');
  const [originalClickValue, setOriginalClickValue] = useState(null);
  const [lastSpinTime, setLastSpinTime] = useState(null);
  const wheelRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const spin = () => {
    const now = Date.now();

    if (lastSpinTime && now - lastSpinTime < 60000) {
      const secondsLeft = Math.ceil((60000 - (now - lastSpinTime)) / 1000);
      alert(`Зачекай ${secondsLeft} секунд, перш ніж крутити знову.`);
      return;
    }

    if (spinning || bonusToApply) return;

    setSpinning(true);
    setBonusToApply(null);
    setActiveBonusLabel('');

    const randomIndex = Math.floor(Math.random() * segmentsCount);
    const stopAngle = 3600 + randomIndex * degreesPerSegment + degreesPerSegment / 2;

    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 4s ease-out';
      wheelRef.current.style.transform = `rotate(${stopAngle}deg)`;
    }

    setTimeout(() => {
      if (wheelRef.current) {
        wheelRef.current.style.transition = 'none';
        wheelRef.current.style.transform = `rotate(${randomIndex * degreesPerSegment + degreesPerSegment / 2}deg)`;
      }
      setBonusToApply(bonuses[randomIndex]);
      setSpinning(false);
      setLastSpinTime(Date.now());
    }, 4000);
  };

  const applyBonus = () => {
    if (!bonusToApply || bonusToApply.type === 'none') {
      setBonusToApply(null);
      return;
    }

    if (bonusToApply.type === 'instantCredits') {
      setGameState((prev) => ({
        ...prev,
        credits: prev.credits + bonusToApply.value,
      }));
      setActiveBonusLabel(bonusToApply.label);
      setBonusToApply(null);
    }

    if (bonusToApply.type === 'clickMultiplier') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (originalClickValue === null) {
        setOriginalClickValue(gameState.clickValue);
      }

      setGameState((prev) => ({
        ...prev,
        clickValue: prev.clickValue * bonusToApply.value,
      }));

      setActiveBonusLabel(bonusToApply.label);
      setBonusToApply(null);

      timeoutRef.current = setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          clickValue: originalClickValue !== null ? originalClickValue : 1,
        }));
        setActiveBonusLabel('');
        setOriginalClickValue(null);
      }, bonusToApply.duration * 1000);
    }
  };

  return (
    <div className={styles.wheelContainer}>
      {/* Музика - вкажи свій шлях до файлу у public */}
      <audio src="/path-to-your-music.mp3" autoPlay loop />

      <h2>Колесо фортуни 🎡</h2>

      <div className={styles.wheelWrapper} style={{ position: 'relative', width: 320, height: 320, margin: 'auto' }}>
        <div className={styles.wheelArrow} />

        <div
          ref={wheelRef}
          className={styles.wheel}
          style={{
            background: `conic-gradient(${bonuses
              .map((b, i) => `${b.color} ${i * degreesPerSegment}deg ${(i + 1) * degreesPerSegment}deg`)
              .join(', ')})`,
          }}
        >
          {bonuses.map((bonus, i) => {
            const rotation = i * degreesPerSegment;
            const textRotation = rotation + degreesPerSegment / 2;
            const radius = 120;
            const rad = (textRotation * Math.PI) / 180;
            const x = 160 + radius * Math.cos(rad);
            const y = 160 + radius * Math.sin(rad);

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  transform: `translate(-50%, -50%) rotate(${textRotation + 90}deg)`,
                  color: '#fff',
                  backgroundColor: bonus.color,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 0 3px rgba(0,0,0,0.5)',
                  userSelect: 'none',
                }}
              >
                {bonus.label}
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={spin} disabled={spinning || bonusToApply !== null} style={{ marginTop: '20px' }}>
        {spinning ? 'Обертання...' : 'Обертай!'}
      </button>

      {bonusToApply && bonusToApply.type !== 'none' && (
        <div style={{ marginTop: '15px' }}>
          <p>🎁 Випало: <strong>{bonusToApply.label}</strong></p>
          <button onClick={applyBonus}>Застосувати бонус</button>
        </div>
      )}

      {bonusToApply && bonusToApply.type === 'none' && (
        <p style={{ marginTop: '15px' }}>😢 Нічого не випало. Спробуйте ще!</p>
      )}

      {activeBonusLabel && (
        <p style={{ marginTop: '20px', color: 'green' }}>
          ✅ Активно: <strong>{activeBonusLabel}</strong>
        </p>
      )}
    </div>
  );
};

export default FortuneWheel;
