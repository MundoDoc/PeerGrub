import * as React from 'react';
import { useState, useEffect } from 'react';
import api from '../../api';
import './index.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Cart from '../../Assets/Cart.png';
import { ACCESS_TOKEN } from "../../constants";

export default function SideCart() {
  const [open, setOpen] = React.useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCartItems();
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

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

  const DrawerList = (
    <Box className="sideBox" sx={{ width: 400 }} role="presentation" onClick={toggleDrawer(false)}>
      <h1 className='header'>Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty">
          Your cart is empty
        </div>
      ) : (
        <List>
          {cartItems.map((item) => (
            <div className='eachItem'>
              <ListItem className="eachItemList" key={item.id} disablePadding>
                <ListItemIcon>
                  <img className='imgDiv' src={item.Listing_Image} alt={item.Listing_Title} style={{width: '80px', height:'80px'}}/>
                </ListItemIcon>
                <ListItemText primary={item.Listing_Title} secondary={`Quantity: ${item.quantity}`} />
                <IconButton onClick={() => addToCart(item)}><AddCircleOutlineIcon /></IconButton>
                <IconButton onClick={() => removeFromCart(item.id)}><RemoveCircleOutlineIcon /></IconButton>
                <IconButton onClick={() => deleteFromCart(item.id)}><DeleteIcon /></IconButton>
              </ListItem>
            </div>
          ))}
        </List>
      )}
      <a className="cartPage" href="/shoppingcart">Go to Shopping Cart</a>
    </Box>
  );

  return (
    <div>
      <button className="nav-side" onClick={toggleDrawer(true)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <img src={Cart} alt="Cart" style={{ width: '60px' }} />
      </button>
      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
