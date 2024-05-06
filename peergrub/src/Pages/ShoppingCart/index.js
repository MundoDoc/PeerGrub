import React, { useState, useEffect } from 'react';
import api from '../../api';
import './index.css';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { ACCESS_TOKEN } from "../../constants";

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCartItems();
  }, []);

  const updateCart = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
    setCartItems(items);
    window.dispatchEvent(new CustomEvent('onCartChange'));
  };

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      const updatedItems = cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      updateCart(updatedItems);
    } else {
      updateCart([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const updatedItems = cartItems.reduce((result, item) => {
      if (item.id === id) {
        const newQuantity = item.quantity - 1;
        if (newQuantity > 0) {
          result.push({ ...item, quantity: newQuantity });
        }
      } else {
        result.push(item);
      }
      return result;
    }, []);
    updateCart(updatedItems);
  };

  const deleteFromCart = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    updateCart(updatedItems);
  };

  const loadCartItems = () => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

const totalCost = cartItems.reduce((total, item) => {
    const itemCost = parseFloat(item.Listing_Cost);
  
    if (isNaN(itemCost)) {
      console.error(`Invalid price for item with ID ${item.id}`);
      return total;
    }
  
    return total + (item.quantity * itemCost);
  }, 0);
  

  return (
    <Box className="shopping-cart" sx={{ width: "100%" }}>
      <h1 className='header'>Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty">
          Your cart is empty
        </div>
      ) : (
        <div className='wrapper'>
            <div className='firstSide'>
            {cartItems.map((item) => (
                <div className="eachItem" key={item.id}>
                    <div className='itemDetail'>
                        <ListItem className="eachItemList" disablePadding>
                            <ListItemIcon>
                            <img className='imgDiv' src={item.Listing_Image} alt={item.Listing_Title} style={{ width: '80px', height: '80px' }} />
                            </ListItemIcon>
                            <ListItemText primary={item.Listing_Title} secondary={`Quantity: ${item.quantity}`} />
                            <IconButton onClick={() => addToCart(item)}><AddCircleOutlineIcon /></IconButton>
                            <IconButton onClick={() => removeFromCart(item.id)}><RemoveCircleOutlineIcon /></IconButton>
                            <IconButton onClick={() => deleteFromCart(item.id)}><DeleteIcon /></IconButton>
                        </ListItem>
                    </div>
                </div>
            ))}
            </div>
            <div className='secondSide'>
                <h1 className='checkOut'>Order</h1>
                <h4>Total items: {totalItems}</h4>
                <h4>Total cost: ${totalCost.toFixed(2)}</h4>
            </div>
        </div>
      )}
    </Box>
  );
}

export default ShoppingCart;
