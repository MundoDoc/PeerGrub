import React from "react";
import "./index.css";
import ItemListings from "../../Components/ItemListings";

export default function itemListings() {
  return (
    <div class="listing-page" style={{ alignContent: "center" }}>
      {/* Me Coping, idk what i had to do in the css to center this */}
      <div class="title" style={{ textAlign: "center" }}>
        <h1>Listings</h1>
        <h2>See what Toros have in store for you</h2>
      </div>
      <div class="listview">
        <ItemListings />
      </div>
    </div>
  );
}
