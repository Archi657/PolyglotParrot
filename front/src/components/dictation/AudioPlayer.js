// AudioPlayerCircle.jsx
import React, { useRef, useState } from "react";
import "./AudioPlayerCircle.css";

const AudioPlayer = ({ audioFile }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio-circle" onClick={togglePlay}>
      <div className={`triangle ${isPlaying ? "pause" : ""}`}></div>
      <audio ref={audioRef} src={audioFile} preload="auto" />
    </div>
  );
};

export default AudioPlayer;
