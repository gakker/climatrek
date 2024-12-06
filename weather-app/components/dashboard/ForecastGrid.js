import React from 'react';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import Image from 'next/image';

const ForecastGrid = () => {
  const forecastData = [
    { day: 'Mon', temp: '24°C', condition: 'Sunny', icon: '/images/sunny.png' },
    { day: 'Tue', temp: '22°C', condition: 'Cloudy', icon: '/images/cloudy.png' },
    { day: 'Wed', temp: '21°C', condition: 'Rainy', icon: '/images/rainy.png' },
    { day: 'Thu', temp: '23°C', condition: 'Sunny', icon: '/images/sunny.png' },
    { day: 'Fri', temp: '25°C', condition: 'Sunny', icon: '/images/sunny.png' },
  ];

  return (
    <Grid container spacing={2}>
      {forecastData.map((data, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
          <Card sx={{ textAlign: 'center', py: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                {data.day}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1,
                  mb: 1,
                }}
              >
                <Image
                  src={data.icon}
                  alt={data.condition}
                  width={48}
                  height={48}
                />
                <Typography variant="h6">{data.temp}</Typography>
              </Box>
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
