import * as React from 'react';
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

export default function SideCart() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box className="sideBox" sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['First Restaurant', 'Second Restaurant'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <RestaurantIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Mock Item 1', 'Mock Item 2'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <FastfoodIcon /> : <IcecreamIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <a className="cartPage" href="/shoppingcart">Go to Shopping Cart</a>
    </Box>
  );

  return (
    <div>
        <a className="nav-link" onClick={toggleDrawer(true)}><img src={Cart} alt="Cart" style={{ width: '60px' }} /></a>
        <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
    </div>
  );
}