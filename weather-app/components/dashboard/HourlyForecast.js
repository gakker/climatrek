import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

const HourlyForecast = ({ hourlyData, selectedDay, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Hourly Forecast for {selectedDay}</DialogTitle>
      <DialogContent>
        {hourlyData.length > 0 ? (
          <List>
            {hourlyData.map((entry, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {new Date(entry.dt * 1000).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Typography>
                    </>
                  }
                  secondary={
                    <>
                      <Typography variant="body2">
                        Temp: {Math.round(entry.main.temp)}°C
                      </Typography>
                      <Typography variant="body2">
                        Condition: {entry.weather[0].description}
                      </Typography>
                    </>
                  }
                />
                <img
                  src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
                  alt={entry.weather[0].description}
                  style={{ width: '50px', height: '50px' }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No data available for the selected day.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HourlyForecast;
