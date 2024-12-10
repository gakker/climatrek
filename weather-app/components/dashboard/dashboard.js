import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import OpacityIcon from '@mui/icons-material/Opacity';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';

const weeklyForecast = [
  { day: 'Monday', temp: 22, condition: 'Sunny' },
  { day: 'Tuesday', temp: 18, condition: 'Cloudy' },
  { day: 'Wednesday', temp: 20, condition: 'Rainy' },
  { day: 'Thursday', temp: 25, condition: 'Sunny' },
  { day: 'Friday', temp: 19, condition: 'Windy' },
  { day: 'Saturday', temp: 23, condition: 'Partly Cloudy' },
  { day: 'Sunday', temp: 21, condition: 'Stormy' },
];

// Function to get icons based on weather conditions
const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <WbSunnyIcon sx={{ fontSize: 40, color: '#FFD700' }} />;
    case 'cloudy':
    case 'partly cloudy':
      return <CloudIcon sx={{ fontSize: 40, color: '#90A4AE' }} />;
    case 'rainy':
      return <OpacityIcon sx={{ fontSize: 40, color: '#2196F3' }} />;
    case 'stormy':
      return <ThunderstormIcon sx={{ fontSize: 40, color: '#673AB7' }} />;
    case 'windy':
      return <AcUnitIcon sx={{ fontSize: 40, color: '#00ACC1' }} />;
    default:
      return <WbSunnyIcon sx={{ fontSize: 40, color: '#FFD700' }} />;
  }
};

const Dashboard = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Weekly Forecast
      </Typography>
      <Grid container spacing={3}>
        {weeklyForecast.map((day, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <CardContent>
                {getWeatherIcon(day.condition)}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {day.day}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ mt: 1, fontWeight: 'bold', color: '#1976D2' }}
                >
                  {day.temp}°C
                </Typography>
                <Typography variant="body1" sx={{ color: '#757575' }}>
                  {day.condition}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
