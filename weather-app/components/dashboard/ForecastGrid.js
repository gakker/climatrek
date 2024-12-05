import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';

const ForecastGrid = () => {
  const forecastData = [
    { day: 'Mon', temp: '24°C', condition: 'Sunny' },
    { day: 'Tue', temp: '22°C', condition: 'Cloudy' },
    { day: 'Wed', temp: '21°C', condition: 'Rainy' },
    { day: 'Thu', temp: '23°C', condition: 'Sunny' },
    { day: 'Fri', temp: '25°C', condition: 'Sunny' },
  ];

  return (
    <Grid container spacing={2}>
      {forecastData.map((data, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                {data.day}
              </Typography>
              <Typography variant="h6">{data.temp}</Typography>
              <Typography variant="body2" color="text.secondary">
                {data.condition}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ForecastGrid;
