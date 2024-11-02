import { Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 1000 }} className="bg-gray-800">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" component="div" className="font-bold text-white">
          Reservi
        </Typography>
        <div className="space-x-4 text-white">
          <Link to="/home">
            <Button color="inherit">Home</Button>
          </Link>
          <Link to="/about">
            <Button color="inherit">About</Button>
          </Link>
          <Link to="/login">
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/signup">
            <Button color="success" variant="contained">Sign Up</Button>
          </Link>
        </div>
      </Toolbar>
    </nav>
  );
}

export default NavBar;
