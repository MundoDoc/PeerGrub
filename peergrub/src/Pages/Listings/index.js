import React from "react";
import "./index.css";
import ItemListings from "../../Components/ItemListings";

export default function Listings() {

  const dynamicListings = Array.from({length: 10}, (_, index) =>(
    <ItemListings key={index} />
  ))

  return (
    <div className="listing-page" style={{ alignContent: "center" }}>
      {/* Me Coping, idk what i had to do in the css to center this */}
      <div className="title" style={{ textAlign: "center" }}>
        <h1>Listings</h1>
        <h2>See what Toros have in store for you</h2>
      </div>
      <div className="item-listing">
        {dynamicListings}
      </div>
    </div>
  );
}
