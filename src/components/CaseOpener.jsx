import React from 'react';
import { useGame } from '../context/GameContext';

const CaseOpener = () => {
  const { gameState, openCase, caseResult, caseActive, activeBonusLabel } = useGame();

  return (
    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
      <h2>Відкрий Кейс 🎁 (200 кредитів)</h2>
      <button onClick={openCase} disabled={gameState.credits < 200 || caseActive}>
        {caseActive ? 'Відкриваємо...' : 'Відкрити кейс'}
      </button>

      {caseResult && (
        <p style={{ marginTop: '15px' }}>
          Випало: <strong>{caseResult.label}</strong>
        </p>
      )}

      {activeBonusLabel && (
        <p style={{ marginTop: '10px', color: 'green' }}>
          Активно: <strong>{activeBonusLabel}</strong>
        </p>
      )}
    </div>
  );
};

export default CaseOpener;
