import React from "react";
import "./CardDic.css";
import Emoji from "../../shared/emoji/Emoji";
import { Link } from "react-router-dom";
const CardDic = ({ dictations }) => {
  return (
    <div className="cards-container">
      {dictations.map((dictation) => (
        <Link key={0}
          to={`/dictation/${dictation.id}`}
          state={{ dictation: dictation }}
          className="card">
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
        </Link>
      ))}
    </div>
  );
};

export default CardDic;
