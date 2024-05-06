// ImagePopup.js
import React from 'react';
import './index.css'; // Add styles for the popup

function ImagePopup({ imageUrl, onClose }) {
  return (
    <div className="image-pop" onClick={onClose}>
      <div className="pop-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Popup Image" />
      </div>
    </div>
  );
}

export default ImagePopup;
