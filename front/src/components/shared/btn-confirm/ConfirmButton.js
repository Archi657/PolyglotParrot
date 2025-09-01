import React from "react";
import { postDictation } from '../../../api/routes'

const ConfirmButton = ({ actionType, buttonText, dictation, typedText, setCorrectedText }) => {
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
      console.log("Sending dictation...", dictation, typedText);
      // I will also need here the User ID when log in is ready to identify the user
      // from dic I need, ID-TITLE-TEXT, 
      // typedText
      const userID = '6653456534e0a674a097bc17'
      const response = await postDictation(userID, dictation, typedText);
      console.log("Response from backend:", response);
      if (response?.comparison_result?.result) {
        setCorrectedText(response.comparison_result.result);
      }
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
    <button onClick={handleClick} style={buttonStyle}>
      {buttonText}
    </button>
  );
};

// Example inline styles (optional)
const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ConfirmButton;
