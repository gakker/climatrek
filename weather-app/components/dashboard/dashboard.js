import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import OpacityIcon from '@mui/icons-material/Opacity';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import axios from 'axios';

const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <WbSunnyIcon sx={{ fontSize: 40, color: '#FFD700' }} />;
    case 'clouds':
      return <CloudIcon sx={{ fontSize: 40, color: '#90A4AE' }} />;
    case 'rain':
      return <OpacityIcon sx={{ fontSize: 40, color: '#2196F3' }} />;
    case 'thunderstorm':
      return <ThunderstormIcon sx={{ fontSize: 40, color: '#673AB7' }} />;
    case 'snow':
      return <AcUnitIcon sx={{ fontSize: 40, color: '#00ACC1' }} />;
    default:
      return <WbSunnyIcon sx={{ fontSize: 40, color: '#FFD700' }} />;
  }
};

const Dashboard = () => {
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(false);

        // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast/daily?q=New York&cnt=7&units=metric&appid=6a1135adf8e1bb1844a8b6d56812b69e`
        );

        const formattedData = response.data.list.map((day) => ({
          day: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
          temp: Math.round(day.temp.day),
          condition: day.weather[0].main,
        }));

        setWeeklyForecast(formattedData);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Weekly Forecast
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error" sx={{ textAlign: 'center' }}>
          Failed to load weather data. Please try again later.
        </Typography>
      ) : (
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
      )}
    </Box>
  );
};

export default Dashboard;
