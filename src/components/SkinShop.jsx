import React from 'react';
import { useGame } from '../context/GameContext';

const SkinShop = () => {
  const { gameState, buySkin, selectSkin, skins } = useGame();

  return (
    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
      <h3>Магазин скінів</h3>
      <p>Кредити: {gameState.credits}</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        {skins.map((skin) => {
          const owned = gameState.ownedSkins.includes(skin.id);
          const active = gameState.activeSkin === skin.id;

          return (
            <div
              key={skin.id}
              style={{
                border: active ? '3px solid gold' : '1px solid #ccc',
                padding: '1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                ...skin.style,
                width: 150,
                userSelect: 'none',
              }}
            >
              <p>{skin.name}</p>
              <p>Вартість: {skin.cost}</p>
              {owned ? (
                <button onClick={() => selectSkin(skin.id)} disabled={active}>
                  {active ? 'Обрано' : 'Вибрати'}
                </button>
              ) : (
                <button
                  onClick={() => {
                    const bought = buySkin(skin.id, skin.cost);
                    if (!bought) alert('Недостатньо кредитів або скин вже куплено');
                  }}
                >
                  Купити
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkinShop;
