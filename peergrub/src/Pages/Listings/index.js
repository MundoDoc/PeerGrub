import React from "react";
import { useEffect, useState } from "react";
import "./index.css";
import ItemListings from "../../Components/ItemListings";
import api from "../../api";

export default function Listings() {

  const [allListings, setAllListings] = useState([]);

  useEffect(() => {
    getLists();
  }, [])

  const getLists = () => {
    api 
      .get("/api/listing/")
      .then((res) => res.data)
      .then((data) => {
         setAllListings(data.results);
         console.log(data.results);
       })
      .catch((err) => alert(err));
  }

  return (
    <div className="listing-page" style={{ alignContent: "center" }}>
      {/* Me Coping, idk what i had to do in the css to center this */}
      <div className="title" style={{ textAlign: "center" }}>
        <h1>Listings</h1>
        <h2>See what Toros have in store for you</h2>
      </div>
      <div className="item-listing">
        {allListings.map((newList) => (
          <ItemListings newList={newList} key={newList.id} />
        ))}
      </div>
    </div>
  );
}
