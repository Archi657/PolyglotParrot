// TwemojiComponent.jsx

import React, { useEffect, useRef } from 'react';
import twemoji from 'twemoji';

const Emoji = ( {emoji, size, onClick, cursor} ) => {
    const str = twemoji.parse( 'I \u2764\uFE0F emoji!');
    // -> "<img src="<twitter cdn>" draggable="false" alt="<emoji>">"
    // gets the attributes from the img string
    const elem = str
      // splits by spaces
      .split(/ /g)
      // splits matches the attributes and value
      .map(x => x.match(/^(.+?)=”(.+?)”/))
      // removes extra that didn't match
      .filter(Boolean)
      // builds an object with 2nd and 3rd elements of the match array
      .reduce((obj, [ _, key, val ]) => ({
        ...obj,
        [key]: val
      }), {});

      const dict = 
        {
          "spanish": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1ea-1f1f8.png",
          "french": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1eb-1f1f7.png",
          "russian": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1f7-1f1fa.png",
          "english": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1fa-1f1f8.png",
          "arabic": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1e6-1f1ea.png",
          "german": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1e9-1f1ea.png",
          "italian": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1ee-1f1f9.png",
          "japanese": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1ef-1f1f5.png",
          "korean": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1f0-1f1f7.png",
          "portuguese": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1f5-1f1f9.png",
          "chinese": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f1e8-1f1f3.png"
      }

      return (
          <img
          src={dict[emoji]}
          alt="\u2764\uFE0F" 
          style={{height:size, width:size, cursor: cursor}}
          onClick={onClick}
        />
        
       );
};

export default Emoji
