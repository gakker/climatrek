import React from 'react';
import { List, ListItem, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFavorites } from '../context/FavoritesContext';

const FavoritesList = ({ onLocationSelect }) => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div style={{ marginTop: '16px' }}>
      <Typography variant="h6">Favorites</Typography>
      <List>
        {favorites.map((location, index) => (
          <ListItem
            key={index}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography
              variant="body1"
              onClick={() => onLocationSelect(location)}
              sx={{ cursor: 'pointer', color: 'blue' }}
            >
              {location}
            </Typography>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => removeFavorite(location)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FavoritesList;
