import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, Button } from '@mui/material';

const Navigation = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    if (location.trim()) {
      onSearch(location);
      setLocation('');
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          ClimaTrek
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TextField
            label="Search Location"
            variant="outlined"
            size="small"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{
              bgcolor: 'white',
              borderRadius: 1,
              width: '300px',
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
