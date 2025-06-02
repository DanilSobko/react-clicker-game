import React, { useRef, useState, useEffect } from 'react';

const MusicPlayer = () => {
  const tracks = [
    { title: 'James Brown - I Got You (I Feel Good)', src: 'James Brown - I Got You (I Feel Good).mp3' },
    { title: 'Sayfalse & Yb Wasgood & Ariis - Los Voltaje (Slowed)', src: 'Sayfalse & Yb Wasgood & Ariis - Los Voltaje (Slowed).mp3' },
    { title: 'Single Ladies', src: 'Single Ladies.mp3' },
  ];

  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.log('Autoplay failed:', err);
      });
    }
    setPlaying(!playing);
  };

  const changeVolume = (e) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIndex);
    setPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.volume = volume;
      if (playing) {
        audioRef.current.play().catch((err) => {
          console.log('Autoplay failed:', err);
        });
      }
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div style={{ margin: '1rem 0' }}>
      <audio ref={audioRef} loop>
        <source src={tracks[currentTrackIndex].src} type="audio/mpeg" />
        Ваш браузер не підтримує аудіо.
      </audio>

      <div style={{ marginBottom: '0.5rem' }}>
        🎵 Зараз грає: <strong>{tracks[currentTrackIndex].title}</strong>
      </div>

      <button onClick={togglePlay} style={{ marginRight: '1rem' }}>
        {playing ? '⏸️ Пауза' : '▶️ Відтворити'}
      </button>

      <button onClick={nextTrack} style={{ marginRight: '1rem' }}>
        ⏭️ Наступний трек
      </button>

      <label>
        Гучність:
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={changeVolume}
          style={{ marginLeft: '0.5rem' }}
        />
      </label>
    </div>
  );
};

export default MusicPlayer;
