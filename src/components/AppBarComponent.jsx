// AppBarComponent.js
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button, Typography } from '@mui/material';

function AppBarComponent() {
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="bg-gray-800 shadow-md">
      <Toolbar className="flex justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="path_to_logo.png"
            alt="Logo"
            className="h-8 w-auto mr-2"
          />
          <Typography variant="h6" className="text-white">
            Reservi
          </Typography>
        </div>

        {/* Avatar with Menu */}
        <IconButton onClick={handleMenuOpen} className="focus:outline-none">
          <Avatar alt="User Avatar" src="path_to_avatar.jpg" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          className="mt-2"
        >
          <MenuItem onClick={handleMenuClose}>
          <Button variant="text"  >Profile</Button>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
          <Button variant="text" color='warning'>Logout</Button>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;
