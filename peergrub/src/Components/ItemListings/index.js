import React from "react";
import "./index.css";
import Muffins from "../../Assets/Muffins.png";

export default function ItemListings({ route, newList, onDelete }) {

  return (
      <div className="item">
        <img src={newList.Listing_Image} alt="Placeholder" />
        <div className="item-details">
          <h2>{newList.Listing_Title}</h2>
          <p>{newList.Listing_Descr}</p>
          <div className="space">
            <p className="price">${newList.Listing_Cost}</p>
            {route === "profile" && (
              <button className="delete" onClick={() => onDelete(newList.id)}>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
  );
}