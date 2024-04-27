import React from "react";
import "./index.css";
import Muffins from "../../Assets/Muffins.png";

export default function ItemListings() {
  return (
      <div className="item">
        <img src={Muffins} alt="Placeholder" />
        <div className="item-details">
          <h2>Dish 11</h2>
          <p>Description of Dish 1</p>
          <p className="price">$12</p>
        </div>
      </div>
  );
}