import React from "react";
import Emoji from "../shared/emoji/Emoji";
import { useTranslation } from 'react-i18next';

const HeaderDictation = ({ title, language, image, difficulty }) => {
  const { t } = useTranslation();
  const { Diclanguage, Dicdiff, Dichard, Dicmedium, Diceasy } = t("Dictation Header");

  const difficultyLabel =
    difficulty === "easy"
      ? Diceasy
      : difficulty === "medium"
      ? Dicmedium
      : difficulty === "hard"
      ? Dichard
      : difficulty;
// TODO Fix difficulty stuff and display of the emoji of diff
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "1rem" // space between image and text
    }}>
      {image && (
        <img
          src={image}
          alt={title}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
      )}

      <div>
        <h2>{title}</h2>
        <p>
          {Diclanguage} :{" "}
          <Emoji key="en" emoji={language} size={24} />
        </p>
        <div style={{  display: "inline-flex", padding: "5px"}}>
        <p>{Dicdiff} : {difficultyLabel} </p>
        <Emoji key="en" emoji={difficulty} size={24} />
        </div>
      </div>
    </div>
  );
};

export default HeaderDictation;
