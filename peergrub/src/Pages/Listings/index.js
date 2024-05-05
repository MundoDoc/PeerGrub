import React from "react";
import { useEffect, useState } from "react";
import "./index.css";
import ItemListings from "../../Components/ItemListings";
import api from "../../api";

export default function Listings() {

  const [allListings, setAllListings] = useState([]);
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    getLists();
  }, []);

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Update localStorage whenever the cartItems state changes

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

// In Listings Component
const addToCart = (item) => {
  setCartItems(prevItems => {
    const itemExists = prevItems.find(cartItem => cartItem.id === item.id);
    if (itemExists) {
      const updatedItems = prevItems.map(cartItem => 
        cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
      updateLocalStorageCart(updatedItems);
      return updatedItems;
    } else {
      const newItems = [...prevItems, {...item, quantity: 1}];
      updateLocalStorageCart(newItems);
      return newItems;
    }
  });
};

const updateLocalStorageCart = (newCartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  window.dispatchEvent(new CustomEvent('onCartChange'));
};

  

  return (
    <div className="listing-page" style={{ alignContent: "center" }}>
      {/* Me Coping, idk what i had to do in the css to center this */}
      <div className="title" style={{ textAlign: "center" }}>
        <h1>Listings</h1>
        <h2>See what Toros have in store for you</h2>
      </div>
      <div className="item-listing">
        {allListings.map((newList) => (
          <div onClick={() => addToCart(newList)}>
            <ItemListings route="listings" newList={newList} key={newList.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
