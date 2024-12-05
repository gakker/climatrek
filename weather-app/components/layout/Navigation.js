import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navigation = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ClimaTrek
        </Typography>
        <Button color="inherit" href="/">Home</Button>
        <Button color="inherit" href="/about">About</Button>
        <Button color="inherit" href="/contact">Contact</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
