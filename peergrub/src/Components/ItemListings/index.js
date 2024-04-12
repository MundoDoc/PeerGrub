import React from "react";
import "./index.css";
import Muffins from "../../Assets/Muffins.png";
import MuffinsStanding from "../../Assets/MuffinsStanding.JPG";
import Macarons from "../../Assets/Macarons.JPG";
import ChickenParm from "../../Assets/ChickenParm.JPG";
import Raviolis from "../../Assets/Raviolis.JPG";

export default function itemListings() {
  return (
    <div class="item-listing">
      <div class="item">
        <img src={Muffins} alt="Placeholder Image" />
        <div class="item-details">
          <h2>Dish 1</h2>
          <p>Description of Dish 1</p>
          <p class="price">$12</p>
        </div>
      </div>
      <div class="item">
        <img src={MuffinsStanding} alt="Placeholder Image" />
        <div class="item-details">
          <h2>Dish 2</h2>
          <p>Description of Dish 2</p>
          <p class="price">$6</p>
        </div>
      </div>
      <div class="item">
        <img src={ChickenParm} alt="Placeholder Image" />
        <div class="item-details">
          <h2>Dish 3</h2>
          <p>Description of Dish 3</p>
          <p class="price">$10</p>
        </div>
      </div>
      <div class="item">
        <img src={Macarons} alt="Placeholder Image" />
        <div class="item-details">
          <h2>Dish 4</h2>
          <p>Description of Dish 4</p>
          <p class="price">$12</p>
        </div>
      </div>
      <div class="item">
        <img src={Raviolis} alt="Placeholder Image" />
        <div class="item-details">
          <h2>Dish 5</h2>
          <p>Description of Dish 5</p>
          <p class="price">$8</p>
        </div>
      </div>
    </div>
  );
}
