import React, {useState} from "react";

import { postDictation } from '../../../api/routes'

const ConfirmButton = ({ actionType, buttonText, dictation, typedText, setCorrectedText }) => {
   const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    const confirmAction = window.confirm("Are you sure you want to proceed?");
    if (confirmAction) {
      switch (actionType) {
        case "sendDictation":
          sendDictation();
          break;
        case "deleteItem":
          deleteItem();
          break;
        case "updateItem":
          updateItem();
          break;
        default:
          console.log("No action specified.");
      }
    }
  };

  // Example actions
  const sendDictation = async () => {
    try {
      //console.log("Sending dictation...", dictation, typedText);
      // I will also need here the User ID when log in is ready to identify the user
      // from dic I need, ID-TITLE-TEXT, 
      // typedText
      const userID = localStorage.getItem("id")
      const response = await postDictation(userID, dictation, typedText);
      //console.log("Response from backend:", response);
      if (response?.result) {
        setCorrectedText(response.result);
        //console.log("corrected text : ", response.result)

      }
      setIsVisible(!isVisible)
      return response;
    } catch (error) {
      console.error("Error sending dictation:", error);
    }
  };


  const deleteItem = () => {
    console.log("Deleting item...");
    // Add your logic for deleting an item here
  };

  const updateItem = () => {
    console.log("Updating item...");
    // Add your logic for updating an item here
  };

  return (
    <>
    {isVisible && (
    <button onClick={handleClick} style={buttonStyle}>
      {buttonText}
    </button>
    )}
    </>
  );
};

// Example inline styles (optional)
const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#ffaa5e",
  color: "black",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ConfirmButton;
