
import "./header.css";
import React from 'react';
 const LetterThumbnail = ({ text, backgroundColor }) => {
    const initial = text ? text.charAt(0).toUpperCase() : "Hi";
  
    return (
      <div
        className="letter-thumbnail-container"
        style={{ backgroundColor: backgroundColor }}
      >
        <span className="letter-thumbnail-text">{initial}</span>
      </div>
    );
  };
  export default LetterThumbnail;