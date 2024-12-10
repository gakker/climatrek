// import React, { useState } from 'react';
// import { AppBar, Toolbar, Typography, TextField,Button } from '@mui/material';

// const Navigation = ({ onSearch }) => {
//   const [location, setLocation] = useState('');

//   const handleSearch = () => {
//     if (location.trim()) {
//       onSearch(location);
//       setLocation('');
//     }
//   };

//   return (
//     <AppBar position="static" color="primary">
//       <Toolbar sx={{ justifyContent: 'space-between' }}>
//         <Typography variant="h6" component="div">
//           ClimaTrek
//         </Typography>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//           <TextField
//             label="Search Location"
//             variant="outlined"
//             size="small"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             sx={{
//               bgcolor: 'white',
//               borderRadius: 1,
//               width: '300px',
//             }}
//           />
//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={handleSearch}
//           >
//             Search
//           </Button>
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navigation;

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Navigation = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearch = () => {
    if (location.trim()) {
      onSearch(location);
      setLocation("");
    }
  };

  const handleAddFavorite = () => {
    if (location.trim() && !favorites.includes(location)) {
      setFavorites([...favorites, location]);
    }
  };

  const handleFavoriteClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFavoriteSelect = (favLocation) => {
    onSearch(favLocation);
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      {/* <Toolbar sx={{ justifyContent: 'space-between' }}>
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
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleAddFavorite}
          >
            Add to Favorites
          </Button>
          <IconButton
            color="inherit"
            onClick={handleFavoriteClick}
          >
            <FavoriteIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {favorites.length > 0 ? (
              favorites.map((fav, index) => (
                <MenuItem key={index} onClick={() => handleFavoriteSelect(fav)}>
                  {fav}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No Favorites</MenuItem>
            )}
          </Menu>
        </div>
      </Toolbar> */}
      <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
          ClimaTrek
        </Typography>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <TextField
            label="Search Location"
            variant="outlined"
            size="small"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              width: { xs: "200px", sm: "300px" },
            }}
          />
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            color="secondary"
            onClick={handleSearch}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            startIcon={<FavoriteBorderIcon />}
            color="inherit"
            onClick={handleAddFavorite}
          >
            Add to Favorites
          </Button>
          <IconButton
            color="inherit"
            onClick={handleFavoriteClick}
            sx={{ ml: 1 }}
          >
            <FavoriteIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {favorites.length > 0 ? (
              favorites.map((fav, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleFavoriteSelect(fav)}
                  sx={{
                    bgcolor: fav === location ? "primary.light" : "inherit",
                    color: fav === location ? "white" : "inherit",
                  }}
                >
                  {fav}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No Favorites</MenuItem>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
