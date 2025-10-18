import React from "react";
import "./CardDic.css";
import Emoji from "../../shared/emoji/Emoji";
const CardDic = ({ dictations }) => {
  return (
    <div className="cards-container">
      {dictations.map((dictation, idx) => (
        <a
          key={idx}
          href="#"
          className="card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="wrapper">
            <img
              src={dictation.bgImage}
              alt={dictation.title}
              className="cover-image"
            />
          </div>

          <h2 className="title"><Emoji
                key="en"
                emoji={dictation.language}
                size={24}
            /> {dictation.title}</h2>

          {dictation.image && (
            <img
              src={dictation.image}
              alt={dictation.title}
              className="character"
            />
          )}
        </a>
      ))}
    </div>
  );
};

export default CardDic;
