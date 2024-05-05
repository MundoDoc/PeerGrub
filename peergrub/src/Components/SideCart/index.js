import * as React from 'react';
import { useState, useEffect } from 'react';
import api from '../../api';
import './index.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import IcecreamIcon from '@mui/icons-material/Icecream';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Cart from '../../Assets/Cart.png';
import { ACCESS_TOKEN } from "../../constants";

export default function SideCart() {
  const [open, setOpen] = React.useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCartItems();
  }, []);

// In SideCart Component
  useEffect(() => {
    const handleCartChange = () => {
      console.log('Cart change detected');
      loadCartItems();
    };

    window.addEventListener('onCartChange', handleCartChange);

    // Initial load
    loadCartItems();

    // Cleanup
    return () => {
      window.removeEventListener('onCartChange', handleCartChange);
    };
}, []);

  

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const updateLocalStorageCart = (newCartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    window.dispatchEvent(new CustomEvent('onCartChange'));
  };
  

  const loadCartItems = () => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const cartIds = JSON.parse(storedCartItems).map(item => item.id);
      fetchCartItemsById(cartIds);
    }
  };

  const fetchCartItemsById = async (ids) => {
    const fetchedItems = [];
  
    for (const id of ids) {
      try {
        const response = await api.get(`/api/listing/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` // Assuming the token is stored in localStorage
            }
        });
        fetchedItems.push(response.data);
      } catch (err) {
        console.error(`Failed to fetch listing with id ${id}:`, err);
      }
    }
  
    setCartItems(fetchedItems); // Set all items at once to avoid duplicates
  };
  

  const DrawerList = (
    console.log(cartItems),
    <Box className="sideBox" sx={{ width: 400 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {cartItems.map((item) => (
          <div className='eachItem'>
            <ListItem className="eachItemList" key={item.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <img className="imgDiv" src={item.Listing_Image} alt={item.Listing_Title} style={{width: '80px', height:'80px'}}/>
                </ListItemIcon>
                <ListItemText >
                  {item.Listing_Title}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </div>
        ))}
      </List>
      <Divider />
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
