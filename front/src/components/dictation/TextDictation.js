import React, { useRef, useEffect, useState } from "react";
import "./TextDictation.css";

const TextDictation = ({ onTextChange, correctedText }) => {
  const textRef = useRef(null);
  const [showInput, setShowInput] = useState(true);

  useEffect(() => {
    if (!textRef.current) return;

    if (correctedText) {
      // Clear and show correction
      textRef.current.innerText = "";
      onTextChange("");
      setShowInput(false);
    } else {
      setShowInput(true);
      textRef.current.focus();
    }
  }, [correctedText]);

  const handleInputChange = () => {
    if (textRef.current && onTextChange) {
      // Don't trim — keep spaces so it feels natural like Monkeytype
      const value = textRef.current.innerText;
      onTextChange(value);
    }
  };

  const handleKeyDown = (e) => {
    // Only block unwanted Ctrl shortcuts
    if ((e.ctrlKey || e.metaKey) && !["a", "x", "c"].includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
  };

  return (
    <div className="text-container">
      {showInput ? (
        <div
          ref={textRef}
          className="text-display"
          contentEditable
          suppressContentEditableWarning
          onInput={handleInputChange}
          onKeyDown={handleKeyDown}
          spellCheck={false}
        />
      ) : (
        <div className="corrected-text">
          {Array.isArray(correctedText[0]) ? (
            correctedText[0].map((word, index) => (
              <span key={index} className={word.status}>
                {word.text + " "}
              </span>
            ))
          ) : (
            <span className="error-text">Invalid text data</span>
          )}
        </div>
      )}
    </div>
  );
};

export default TextDictation;
