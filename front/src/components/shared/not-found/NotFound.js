// NotFound.js
import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // Optional: Add styling for the component

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="back-home-link">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
