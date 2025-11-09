// TwemojiComponent.jsx

import React from 'react';

const dict = {
  spanish: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1ea-1f1f8.png",
  french: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1eb-1f1f7.png",
  russian: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1f7-1f1fa.png",
  english: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1fa-1f1f8.png",
  arabic: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1e6-1f1ea.png",
  german: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1e9-1f1ea.png",
  italian: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1ee-1f1f9.png",
  japanese: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1ef-1f1f5.png",
  korean: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1f0-1f1f7.png",
  portuguese: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1f5-1f1f9.png",
  chinese: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1e8-1f1f3.png",
  bird: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f426.svg",
  heart: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2764.svg",
  hand_heart: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1faf6.svg",
  cat: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f63c.svg",
  audio: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f50a.svg",
  easy: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f60b.svg",
  write: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/270d.svg"
};

const Emoji = ({ emoji, size, onClick, cursor }) => {
  const src = dict[emoji] || "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2753.png"; // ❓ fallback

  return (
    <img
      src={src}
      alt={emoji}
      style={{ height: size, width: size, cursor }}
      onClick={onClick}
    />
  );
};

export default Emoji;
