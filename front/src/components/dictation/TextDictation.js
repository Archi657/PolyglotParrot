import React, { useRef, useEffect, useState } from "react";
import "./TextDictation.css";

const TextDictation = ({ onTextChange, correctedText }) => {
  const textRef = useRef(null);
  const [showInput, setShowInput] = useState(true); // Controls input visibility

  useEffect(() => {
    if (textRef.current) {
      if (correctedText) {
        // Clear the actual content inside the contentEditable div
        textRef.current.innerText = '';
        onTextChange('');
        setShowInput(false);
      } else {
        setShowInput(true);
        textRef.current.focus();
      }
    }
  }, [correctedText]);
  

  const handleInputChange = () => {
    if (textRef.current && onTextChange) {
      const value = textRef.current.innerText.trim(); // Normalize text input
      onTextChange(value);
      console.log('w')
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && !["a", "x", "c", "v"].includes(e.key.toLowerCase())) {
      e.preventDefault(); // Allow only common shortcuts
    }else{
      console.log("meow")
    }
  };

  return (
    <div className="text-container">
      {showInput ? (
        <div
          ref={textRef}
          className="text-display"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={handleInputChange}
          onKeyDown={handleKeyDown}
          spellCheck={false} 
        ></div>
      ) : (
        <div className="corrected-text">
          {Array.isArray(correctedText) ? (
            correctedText.map((word, index) => (
              <span key={index} className={word.status}>
                {word.text + " "}
              </span>
            ))
          ) : (
            <span className="error-text">Invalid text data</span> // Fallback for safety
          )}
        </div>
      )}
    </div>
  );
};

export default TextDictation;
