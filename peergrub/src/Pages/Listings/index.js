import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import ItemListings from "../../Components/ItemListings";
import api from "../../api";
import { ACCESS_TOKEN } from "../../constants";

export default function Listings() {
  const [allListings, setAllListings] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const popupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getLists();
  }, []);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("Clicked Element:", event.target);

      // Check if the click is outside the popup
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setSelectedItem(null);
        console.log("Clicked outside the popup");
      } else {
        console.log("Clicked inside the popup");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getLists = () => {
    api
      .get("/api/listing/")
      .then((res) => res.data)
      .then((data) => {
        setAllListings(data.results);
        console.log(data.results);
      })
      .catch((err) => {
        alert(err);
        navigate("/profile");
      });
  };

  const addToCart = (item) => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      setCartItems((prevItems) => {
        const itemExists = prevItems.find((cartItem) => cartItem.id === item.id);
        if (itemExists) {
          const updatedItems = prevItems.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
          );
          updateLocalStorageCart(updatedItems);
          return updatedItems;
        } else {
          const newItems = [...prevItems, { ...item, quantity: 1 }];
          updateLocalStorageCart(newItems);
          return newItems;
        }
      });
      window.location.reload();
    } else {
      alert("Please login to add items to cart");
    }
  };

  const updateLocalStorageCart = (newCartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    window.dispatchEvent(new CustomEvent("onCartChange"));
  };

  const openDetailsPopup = (item) => {
    setSelectedItem(item);
  };

  const closeDetailsPopup = () => {
    setSelectedItem(null);
  };

  return (
    <div className="listing-page">
      <div className="title" style={{ textAlign: "center" }}>
        <h1>Listings</h1>
        <h2>See what Toros have in store for you</h2>
      </div>
      <div className="item-listing">
        {allListings.map((newList) => (
          <div key={newList.id}>
            <div onClick={() => openDetailsPopup(newList)}>
              <ItemListings route="listings" newList={newList} />
            </div>
          </div>
        ))}
      </div>
      {selectedItem && (
        <div className="popup">
          <div className="popup-content" ref={popupRef}>
            <img className="imgPop" src={selectedItem.Listing_Image} alt="listing" />
            <div className="inner-popup">
              <h2>{selectedItem.Listing_Title}</h2>
              <p>Details: {selectedItem.Listing_Descr}</p>
              <p>Made by: {selectedItem.madeBy}</p>
              <button onClick={() => addToCart(selectedItem)}>Add to Cart</button>
              <button onClick={closeDetailsPopup}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
