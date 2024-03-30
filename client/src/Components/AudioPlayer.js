import React, { useState } from 'react';

const MusicPlayer = () => {
  const [audioSrc, setAudioSrc] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setAudioSrc(url);
  };

  return (
    <div>
      <h1>Music Player</h1>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      {audioSrc && (
        <audio controls>
          <source src={audioSrc} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default MusicPlayer;
